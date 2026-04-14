/**
 * Converts tokens.json to Terrazzo v2 strict object notation:
 * - color strings → { colorSpace, components, alpha }
 * - dimension strings "Xpx" / "Xem" → { value, unit }
 * - duration strings "Xms" → { value, unit }
 * - shadow.color string → same as color object
 * - shadow offset/blur/spread → { value, unit }
 * - typography lineHeight "Xpx" → unitless ratio (lh/fs)
 * - typography fontSize/letterSpacing → { value, unit }
 *
 * Run: node scripts/convert-tokens.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const tokensPath = resolve(root, "tokens.json");

const raw = readFileSync(tokensPath, "utf-8");
const tokens = JSON.parse(raw);

// ── Parsers ──────────────────────────────────────────────────────────────────

/** "oklch(L% C H)" or "oklch(L% C H / A%)" → { colorSpace, components, alpha } */
function parseOklch(str) {
  const inner = str.replace(/^oklch\(/, "").replace(/\)$/, "").trim();
  const [colorPart, alphaPart] = inner.split("/").map((s) => s.trim());
  const parts = colorPart.split(/\s+/);
  const L = parseFloat(parts[0]) / 100;
  const C = parseFloat(parts[1]);
  const H = parseFloat(parts[2]);
  const alpha = alphaPart ? parseFloat(alphaPart) / 100 : 1;
  return {
    colorSpace: "oklch",
    components: [round(L), round(C), round(H)],
    alpha: round(alpha),
  };
}

/** "10px" / "0.08em" / "0em" → { value, unit } */
function parseDimension(str) {
  if (typeof str === "object") return str; // already converted
  const match = String(str).match(/^(-?[\d.]+)(px|em|rem|%|vw|vh)$/);
  if (match) return { value: parseFloat(match[1]), unit: match[2] };
  if (str === "0") return { value: 0, unit: "px" };
  return str; // leave unknown unchanged
}

/** "100ms" / "0ms" → { value, unit } */
function parseDuration(str) {
  if (typeof str === "object") return str;
  const match = String(str).match(/^(-?[\d.]+)(ms|s)$/);
  if (match) return { value: parseFloat(match[1]), unit: match[2] };
  return str;
}

function round(n) {
  return Math.round(n * 100000) / 100000;
}

// ── Transformer ──────────────────────────────────────────────────────────────

function transformNode(node, parentType) {
  if (typeof node !== "object" || node === null) return node;

  const result = {};
  const currentType = node.$type ?? parentType;

  for (const [key, value] of Object.entries(node)) {
    if (key === "$value") {
      result[key] = transformValue(value, currentType, node);
    } else if (key === "$extensions" && typeof value === "object" && value.mode) {
      const transformedMode = {};
      for (const [mode, modeVal] of Object.entries(value.mode)) {
        transformedMode[mode] = transformValue(modeVal, currentType, node);
      }
      result[key] = { ...value, mode: transformedMode };
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      !key.startsWith("$")
    ) {
      result[key] = transformNode(value, currentType);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function transformValue(value, type, tokenNode) {
  // ── Color ──────────────────────────────────────────────────────────────────
  if (type === "color") {
    if (typeof value === "string" && value.startsWith("{")) return value; // alias
    if (typeof value === "string" && value.startsWith("oklch(")) {
      return parseOklch(value);
    }
    return value;
  }

  // ── Dimension ─────────────────────────────────────────────────────────────
  if (type === "dimension") {
    return parseDimension(value);
  }

  // ── Duration ──────────────────────────────────────────────────────────────
  if (type === "duration") {
    return parseDuration(value);
  }

  // ── Shadow ────────────────────────────────────────────────────────────────
  if (type === "shadow" && typeof value === "object" && !Array.isArray(value)) {
    return {
      ...value,
      color:
        typeof value.color === "string" && value.color.startsWith("oklch(")
          ? parseOklch(value.color)
          : value.color,
      offsetX: parseDimension(value.offsetX),
      offsetY: parseDimension(value.offsetY),
      blur: parseDimension(value.blur),
      spread: parseDimension(value.spread),
    };
  }

  // ── Typography ────────────────────────────────────────────────────────────
  if (type === "typography" && typeof value === "object" && !Array.isArray(value)) {
    const tv = { ...value };

    // fontSize: "48px" → { value: 48, unit: "px" }
    if (typeof tv.fontSize === "string") {
      tv.fontSize = parseDimension(tv.fontSize);
    }

    // lineHeight: "56px" → unitless ratio
    if (typeof tv.lineHeight === "string" && tv.lineHeight.endsWith("px")) {
      const lhPx = parseFloat(tv.lineHeight);
      const fsPx =
        typeof tv.fontSize === "object"
          ? tv.fontSize.value
          : parseFloat(tv.fontSize ?? "16");
      tv.lineHeight = fsPx ? round(lhPx / fsPx) : lhPx;
    }

    // letterSpacing: "0em" / "0.08em" → { value, unit }
    if (typeof tv.letterSpacing === "string") {
      tv.letterSpacing = parseDimension(tv.letterSpacing);
    }

    return tv;
  }

  return value;
}

// ── Run ───────────────────────────────────────────────────────────────────────

// Reset to original source before re-converting (idempotent)
const converted = transformNode(tokens, null);

writeFileSync(tokensPath, JSON.stringify(converted, null, 2) + "\n", "utf-8");
console.log("✓ tokens.json converted to Terrazzo v2 strict object format");
