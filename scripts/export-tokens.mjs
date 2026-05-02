#!/usr/bin/env node
/**
 * export-tokens.mjs
 *
 * Two-target export from tokens.json (W3C DTCG · SRGB objects):
 *
 *   dist/tokens.figma.json  → HEX / rgba() strings
 *                             Upload via Tokens Studio plugin or Figma Variables import.
 *                             Figma does NOT support oklch — this is the compatible form.
 *
 *   dist/tokens.code.json   → oklch() strings
 *                             Terrazzo source, modern CSS, color-mix() derivations.
 *                             Aligns with DESIGN.md architecture (§2.0 Dual-Token).
 *
 * Run: pnpm tokens:export
 *
 * Both files keep the full W3C DTCG structure (all $type / $description / aliases intact).
 * Only primitive color $value objects are converted — aliases like "{color.vault-900}"
 * pass through unchanged so semantic tokens stay composable in both targets.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT   = resolve(__dir, '..')

// ─── Color math ──────────────────────────────────────────────────────────────

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

/** SRGB [0–1] → "#RRGGBB" or "rgba(r, g, b, a)" */
function toHex(r, g, b, a = 1) {
  const h = (v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0')
  if (a < 1) {
    return `rgba(${Math.round(clamp01(r) * 255)}, ${Math.round(clamp01(g) * 255)}, ${Math.round(clamp01(b) * 255)}, ${+a.toFixed(4)})`
  }
  return `#${h(r)}${h(g)}${h(b)}`
}

/** sRGB gamma expand (IEC 61966-2-1) */
function gammaExpand(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/**
 * SRGB [0–1] → "oklch(L C H)" or "oklch(L C H / a)"
 * Pipeline: sRGB → linear sRGB → XYZ D65 → Oklab (Ottosson 2020) → OKLCH
 */
function toOklch(r, g, b, a = 1) {
  const rl = gammaExpand(clamp01(r))
  const gl = gammaExpand(clamp01(g))
  const bl = gammaExpand(clamp01(b))

  // linear sRGB → XYZ D65
  const X = rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375
  const Y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750
  const Z = rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041

  // XYZ → Oklab via LMS (Björn Ottosson 2020)
  const l_ = Math.cbrt(0.8189330101 * X + 0.3618667424 * Y - 0.1288597137 * Z)
  const m_ = Math.cbrt(0.0329845436 * X + 0.9293118715 * Y + 0.0361456387 * Z)
  const s_ = Math.cbrt(0.0482003018 * X + 0.2643662691 * Y + 0.6338517070 * Z)

  const L  =  0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const ab =  1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const bb =  0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  // Oklab → OKLCH polar
  const C  = Math.sqrt(ab * ab + bb * bb)
  let   H  = Math.atan2(bb, ab) * (180 / Math.PI)
  if (H < 0) H += 360

  const Lf = +L.toFixed(4)
  const Cf = +C.toFixed(4)
  const Hf = +H.toFixed(2)

  return a < 1
    ? `oklch(${Lf} ${Cf} ${Hf} / ${+a.toFixed(4)})`
    : `oklch(${Lf} ${Cf} ${Hf})`
}

// ─── SRGB object detector ────────────────────────────────────────────────────

function isSrgbObj(v) {
  return (
    v !== null &&
    typeof v === 'object' &&
    v.colorSpace === 'srgb' &&
    Array.isArray(v.components) &&
    v.components.length >= 3
  )
}

function convertSrgb(v, colorFn) {
  const [r, g, b] = v.components
  return colorFn(r, g, b, v.alpha ?? 1)
}

// ─── Token tree walker ───────────────────────────────────────────────────────

/**
 * Recursively transform SRGB color objects → string (via colorFn).
 * Handles:
 *   - $type === "color"  → $value is SRGB object or alias string
 *   - $type === "shadow" → $value.color may be SRGB object
 * All other $types and aliases pass through untouched.
 *
 * @param {boolean} embedOklch — when true, adds $extensions["vmc.auth.oklch"]
 *   with the mathematically exact OKLCH string alongside the HEX $value.
 *   Allows Tokens Studio / future Figma engines to recover the perceptual value
 *   without a lossy round-trip through HEX.
 */
function walkTokens(node, colorFn, embedOklch = false) {
  if (typeof node !== 'object' || node === null) return node

  // Leaf node: has $type
  if ('$type' in node) {
    const out = { ...node }

    if (node.$type === 'color') {
      const v = node.$value
      // Alias string "{color.vault-900}" — keep as-is
      if (typeof v === 'string') return out
      if (isSrgbObj(v)) {
        out.$value = convertSrgb(v, colorFn)
        if (embedOklch) {
          const oklchStr = convertSrgb(v, toOklch)
          out.$extensions = {
            ...(out.$extensions ?? {}),
            'vmc.auth.oklch': oklchStr,
          }
        }
      }
      return out
    }

    if (node.$type === 'shadow') {
      const v = node.$value
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        const shadow = { ...v }
        if (isSrgbObj(shadow.color)) {
          shadow.color = convertSrgb(shadow.color, colorFn)
        }
        out.$value = shadow
      }
      return out
    }

    return out
  }

  // Group node — recurse into children
  const result = {}
  for (const [key, val] of Object.entries(node)) {
    result[key] = walkTokens(val, colorFn, embedOklch)
  }
  return result
}

// ─── Main ────────────────────────────────────────────────────────────────────

const src = JSON.parse(readFileSync(resolve(ROOT, 'tokens.json'), 'utf8'))

// Figma: HEX values + OKLCH embedded in $extensions for round-trip safety
const figmaTokens = walkTokens(src, toHex, true)
// Code: pure OKLCH strings — Terrazzo compiles these literally with legacyHex:false
const codeTokens  = walkTokens(src, toOklch, false)

mkdirSync(resolve(ROOT, 'dist'), { recursive: true })

function write(relPath, data) {
  const abs = resolve(ROOT, relPath)
  writeFileSync(abs, JSON.stringify(data, null, 2) + '\n', 'utf8')
  const count = JSON.stringify(data).match(/"\$type"/g)?.length ?? 0
  console.log(`  ✓  ${relPath}  (${count} tokens)`)
}

console.log('\nVoyager Token Export\n')
write('dist/tokens.figma.json', figmaTokens)
write('dist/tokens.code.json',  codeTokens)
console.log('\nFigma  →  dist/tokens.figma.json  — upload via Tokens Studio or Figma Variables import')
console.log('Code   →  dist/tokens.code.json   — OKLCH source for Terrazzo / CSS color-mix()')
console.log()
