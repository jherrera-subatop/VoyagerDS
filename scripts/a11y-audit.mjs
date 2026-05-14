#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  AGENTE W — Auditor de Accesibilidad · VMC Subastas             ║
 * ║  WCAG 2.2 (SC 1.4.3, 1.4.6, 1.4.11, 2.4.11) + APCA (WCAG 3.0) ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Deps: colorjs.io (parsing + OKLCH→sRGB) · apca-w3 (APCA oficial)
 *
 * Uso:
 *   node scripts/a11y-audit.mjs              → reporte terminal
 *   node scripts/a11y-audit.mjs --json       → output JSON (CI)
 *   node scripts/a11y-audit.mjs --patch      → DTCG patch para tokens.json
 *   node scripts/a11y-audit.mjs \
 *     --fg "#FFFFFF" --bg "oklch(0.72 0.16 55)" --size 18 --weight 700
 */

import Color  from 'colorjs.io';
import { APCAcontrast, sRGBtoY, alphaBlend } from 'apca-w3';

const IS_JSON  = process.argv.includes('--json');
const IS_PATCH = process.argv.includes('--patch');

/* ── 1. WCAG 2.x — Luminancia relativa ───────────────────────────── */

function toLinear(v8) {
  const c = v8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r, g, b) {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(l1, l2) {
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

/* ── 2. Parsing — cualquier formato CSS → { r, g, b, a } (0-255/0-1) */

function parseColor(str) {
  try {
    const c = new Color(str).to('srgb');
    return {
      r: Math.max(0, Math.min(255, Math.round(c.coords[0] * 255))),
      g: Math.max(0, Math.min(255, Math.round(c.coords[1] * 255))),
      b: Math.max(0, Math.min(255, Math.round(c.coords[2] * 255))),
      a: c.alpha ?? 1,
    };
  } catch {
    throw new Error(`Color no reconocido: "${str}"`);
  }
}

/* ── 3. Alpha compositing (Porter-Duff OVER) ─────────────────────── */

function composite(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: Math.round(fg.r * fg.a + bg.r * (1 - fg.a)),
    g: Math.round(fg.g * fg.a + bg.g * (1 - fg.a)),
    b: Math.round(fg.b * fg.a + bg.b * (1 - fg.a)),
    a: 1,
  };
}

/* ── 4. Umbrales WCAG 2.x según tamaño y peso ────────────────────── */

function wcagThresholds(fontSize, fontWeight) {
  const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
  return {
    isLarge,
    aa:  isLarge ? 3.0 : 4.5,
    aaa: isLarge ? 4.5 : 7.0,
  };
}

/* ── 5. Umbrales APCA por tamaño/peso/contexto financiero ─────────── */
/*
  Tabla derivada de la investigación Gemini (APCA Bridge-PCA):
  Lc ≥ 90 → mínimo 14px/400 ó 12px/700   (cuerpo principal)
  Lc ≥ 75 → mínimo 18px/400 ó 14px/700   (UI labels, datos financieros)
  Lc ≥ 60 → mínimo 24px/400 ó 16px/700   (botones, nav)
  Lc ≥ 45 → mínimo 36px/400 ó 24px/700   (headings)
*/
function apcaMinLc(fontSize, fontWeight, isFinancial) {
  let base;
  if (fontWeight >= 700) {
    if      (fontSize >= 24) base = 45;
    else if (fontSize >= 16) base = 60;
    else if (fontSize >= 14) base = 75;
    else                     base = 90; /* 13px/700 ó menor */
  } else {
    if      (fontSize >= 36) base = 45;
    else if (fontSize >= 24) base = 60;
    else if (fontSize >= 18) base = 75;
    else                     base = 90; /* 14px/400 ó menor */
  }
  return isFinancial ? Math.max(base, 75) : base;
}

/* ── 6. Sugerencia de corrección (ajusta L en OKLCH mismo hue) ─────── */

function suggestFix(fgStr, bgStr, targetRatio) {
  try {
    const bgRGB = parseColor(bgStr);
    const bgL   = relativeLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
    const fgOklch = new Color(fgStr).to('oklch');
    const step  = bgL > 0.5 ? -0.01 : 0.01; // oscurecer sobre fondo claro, aclarar sobre oscuro

    for (let l = fgOklch.coords[0]; l >= 0 && l <= 1; l += step) {
      const candidate = new Color('oklch', [Math.max(0, Math.min(1, l)), fgOklch.coords[1], fgOklch.coords[2] ?? 0]);
      const rgb  = candidate.to('srgb');
      const r = Math.round(rgb.coords[0] * 255);
      const g = Math.round(rgb.coords[1] * 255);
      const b = Math.round(rgb.coords[2] * 255);
      if (contrastRatio(relativeLuminance(r, g, b), bgL) >= targetRatio) {
        const lPct = (Math.max(0, Math.min(1, l)) * 100).toFixed(0);
        const c    = fgOklch.coords[1].toFixed(3);
        const h    = (fgOklch.coords[2] ?? 0).toFixed(1);
        return `oklch(${lPct}% ${c} ${h})`;
      }
    }
  } catch { /* ignore */ }
  return null;
}

/* ── 7. Auditoría de un par individual ───────────────────────────── */

function auditPair({ label, fg, bg, fontSize, fontWeight, context, isFinancial, component }) {
  const fgRaw = parseColor(fg);
  const bgRaw = parseColor(bg);
  const fgComp = composite(fgRaw, bgRaw);
  const composited = fgRaw.a < 1;

  const fgL = relativeLuminance(fgComp.r, fgComp.g, fgComp.b);
  const bgL = relativeLuminance(bgRaw.r, bgRaw.g, bgRaw.b);
  const ratio = contrastRatio(fgL, bgL);

  const { isLarge, aa, aaa } = wcagThresholds(fontSize, fontWeight);
  const passAA  = ratio >= aa  - 0.001; // tolerancia de float
  const passAAA = ratio >= aaa - 0.001;

  const fgY  = sRGBtoY([fgComp.r, fgComp.g, fgComp.b]);
  const bgY  = sRGBtoY([bgRaw.r,  bgRaw.g,  bgRaw.b]);
  const lc   = Math.abs(APCAcontrast(fgY, bgY));
  const lcMin = apcaMinLc(fontSize, fontWeight, isFinancial ?? false);
  const passAPCA = lc >= lcMin - 0.1;

  const pass = passAA && passAPCA;

  const suggestion = (!passAA || !passAPCA)
    ? suggestFix(fg, bg, aa)
    : null;

  return {
    label,
    component:   component ?? '—',
    context:     context ?? '',
    fg,
    bg,
    composited,
    fontSize,
    fontWeight,
    isLarge,
    isFinancial: isFinancial ?? false,
    isGradient:  false,
    wcag: {
      ratio:    +ratio.toFixed(4),
      aa:  { threshold: aa,  pass: passAA  },
      aaa: { threshold: aaa, pass: passAAA },
    },
    apca: { lc: +lc.toFixed(2), threshold: lcMin, pass: passAPCA },
    pass,
    suggestion,
  };
}

/* ── 8. Auditoría de gradiente (worst-case de los 2 extremos) ──────── */

function auditGradient({ label, fg, stopA, stopB, fontSize, fontWeight, context, isFinancial, component }) {
  const rA = auditPair({ label, fg, bg: stopA, fontSize, fontWeight, context, isFinancial, component });
  const rB = auditPair({ label, fg, bg: stopB, fontSize, fontWeight, context, isFinancial, component });
  const worst = rA.wcag.ratio <= rB.wcag.ratio ? rA : rB;
  return {
    ...worst,
    label,
    isGradient: true,
    gradient:   { stopA, stopB },
    worstStop:  rA.wcag.ratio <= rB.wcag.ratio ? stopA : stopB,
    bestStop:   rA.wcag.ratio <= rB.wcag.ratio ? stopB : stopA,
  };
}

/* ── 9. Suite de tokens VMC Subastas ─────────────────────────────── */

const SUITE = [

  /* ── Header morado ── */
  auditGradient({
    label:      'Header · texto principal sobre gradiente morado',
    component:  'Header / Participa',
    fg:         '#FFFFFF',
    stopA:      '#160038',
    stopB:      '#4A2090',
    fontSize:   16, fontWeight: 700,
    context:    '"LUNES 04", "12:30 pm" — texto UI sobre header',
  }),
  auditPair({
    label:      'Header · texto muted (white 60%) sobre morado oscuro',
    component:  'Header / Participa',
    fg:         'rgba(255,255,255,0.60)',
    bg:         '#160038',
    fontSize:   14, fontWeight: 400,
    context:    '"Inicia" — texto secundario sobre header',
  }),

  /* ── Botón PARTICIPA · texto oscuro cálido · gradiente live→liveLight ── */
  auditGradient({
    label:      'Botón PARTICIPA · texto oscuro sobre gradiente naranja',
    component:  'Participa',
    fg:         'oklch(12% 0.02 55)',
    stopA:      '#ED8936',  /* T.live */
    stopB:      '#F5A558',  /* T.liveLight */
    fontSize:   18, fontWeight: 700,
    context:    'CTA principal — acción de puja',
    isFinancial: false,
  }),

  /* ── Tagline · text.label-md 14px/500 · oklch(50%) naranja ── */
  auditPair({
    label:      'Tagline naranja sobre blanco',
    component:  'Participa',
    fg:         'oklch(50% 0.153 56.1)',  /* T.tagline */
    bg:         '#FFFFFF',
    fontSize:   14, fontWeight: 500,
    context:    '"¡Oportunidad para el que sabe!" — text.label-md',
  }),

  /* ── Precio base · text.heading-sm 18px · T.priceCyan · dato financiero ── */
  auditPair({
    label:      'Precio base · cyan accesible sobre blanco',
    component:  'Participa',
    fg:         'oklch(50% 0.130 197.3)',  /* T.priceCyan */
    bg:         '#FFFFFF',
    fontSize:   18, fontWeight: 700,
    context:    '"Precio Base: US$ 62,999" — dato financiero',
    isFinancial: true,
  }),

  /* ── Comisión · text.caption 12px/400 · color-text-body ── */
  auditPair({
    label:      'Comisión · body text sobre blanco',
    component:  'Participa',
    fg:         'oklch(38% 0.04 280)',  /* T.commissionText = color-text-body */
    bg:         '#FFFFFF',
    fontSize:   12, fontWeight: 400,
    context:    '"Comisión: 7.5% del valor de compra..." — text.caption',
    isFinancial: false,
  }),

  /* ── Tokens de marca base ── */
  auditPair({
    label:      'Vault sobre blanco — texto general de marca',
    component:  'Global',
    fg:         '#22005C',
    bg:         '#FFFFFF',
    fontSize:   16, fontWeight: 500,
    context:    'Labels, navegación, texto sobre superficie clara',
  }),
  auditPair({
    label:      'Blanco sobre vault — sidebar / header',
    component:  'Sidebar / Header',
    fg:         '#FFFFFF',
    bg:         '#22005C',
    fontSize:   14, fontWeight: 500,
    context:    'Texto en sidebar, labels de navegación',
  }),

  /* ── Header pill — V3 (brand orange + dark text) ── */
  auditGradient({
    label:      'Header pill V3 · texto oscuro sobre gradiente naranja',
    component:  'Header V3',
    fg:         'oklch(12% 0.02 55)',
    stopA:      'oklch(72% 0.16 55)',
    stopB:      'oklch(65% 0.18 55)',
    fontSize:   13, fontWeight: 700,
    context:    '"Ingresa" / "Bienvenido, ZAEX5G" — pill de login',
  }),
];

/* ── 10. Reporter terminal ───────────────────────────────────────── */

const CLR = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  white:  '\x1b[97m',
};

function badge(pass, text) {
  return pass
    ? `${CLR.green}✓ ${text}${CLR.reset}`
    : `${CLR.red}✗ ${text}${CLR.reset}`;
}

function printReport(results) {
  const fails  = results.filter(r => !r.pass);
  const passes = results.filter(r =>  r.pass);

  console.log(`\n${CLR.bold}${CLR.white}════════════════════════════════════════════════════${CLR.reset}`);
  console.log(`${CLR.bold}  AGENTE W · VMC Subastas — Auditoría de Accesibilidad${CLR.reset}`);
  console.log(`${CLR.dim}  WCAG 2.2 + APCA · ${new Date().toISOString().slice(0,10)}${CLR.reset}`);
  console.log(`${CLR.bold}${CLR.white}════════════════════════════════════════════════════${CLR.reset}\n`);

  for (const r of results) {
    const statusLine = r.pass
      ? `${CLR.green}${CLR.bold}  ✓ PASA${CLR.reset}`
      : `${CLR.red}${CLR.bold}  ✗ FALLA${CLR.reset}`;

    console.log(`${statusLine}  ${CLR.bold}${r.label}${CLR.reset}`);
    console.log(`  ${CLR.dim}[${r.component}]  ${r.context}${CLR.reset}`);

    if (r.isGradient) {
      console.log(`  ${CLR.dim}Gradiente: ${r.gradient.stopA} → ${r.gradient.stopB}${CLR.reset}`);
      console.log(`  ${CLR.dim}Peor caso: ${r.worstStop}${CLR.reset}`);
    }

    const typeInfo = `${r.fontSize}px / w${r.fontWeight}${r.isLarge ? ' (texto grande)' : ''}${r.isFinancial ? `  ${CLR.cyan}⚡ financiero${CLR.reset}` : ''}`;
    console.log(`  ${typeInfo}`);

    const wcagLine = `  WCAG  ratio ${r.wcag.ratio}:1   ${badge(r.wcag.aa.pass, `AA ≥${r.wcag.aa.threshold}`)}   ${badge(r.wcag.aaa.pass, `AAA ≥${r.wcag.aaa.threshold}`)}`;
    const apcaLine = `  APCA  Lc ${r.apca.lc}   ${badge(r.apca.pass, `Lc ≥${r.apca.threshold}`)}`;
    console.log(wcagLine);
    console.log(apcaLine);

    if (r.composited) {
      console.log(`  ${CLR.dim}Alpha compositing aplicado: ${r.fg}${CLR.reset}`);
    }
    if (r.suggestion) {
      console.log(`  ${CLR.yellow}→ Fix sugerido (mismo hue): ${r.suggestion}${CLR.reset}`);
    }
    console.log();
  }

  console.log(`${CLR.bold}────────────────────────────────────────────────────${CLR.reset}`);
  console.log(`  ${CLR.green}✓ Pasan: ${passes.length}${CLR.reset}   ${fails.length > 0 ? CLR.red : CLR.green}✗ Fallan: ${fails.length}${CLR.reset}`);

  if (fails.length > 0) {
    console.log(`\n${CLR.red}${CLR.bold}  Pares con fallo:${CLR.reset}`);
    for (const r of fails) {
      console.log(`  ${CLR.red}•${CLR.reset} ${r.label}`);
      if (r.suggestion) console.log(`    ${CLR.yellow}→ ${r.suggestion}${CLR.reset}`);
    }
  }

  console.log();
  if (fails.length > 0) process.exitCode = 1;
}

/* ── 11. Generador de patch DTCG para tokens.json ───────────────── */
/*
  Para cada par que falla y tiene sugerencia, emite un objeto DTCG listo
  para pegar / mergear en tokens.json.

  Convención de clave: {component}_{label_slug}
  Ejemplo:
    "participa_tagline-naranja-sobre-blanco": {
      "$value": "oklch(48% 0.153 56.1)",
      "$type": "color",
      "$description": "Agente W fix · WCAG AA ✓ · Lc 92 ≥90 (14px/w500)"
    }
*/

function slugify(str) {
  return str.toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildPatch(results) {
  const failing = results.filter(r => !r.pass && r.suggestion);
  if (failing.length === 0) return null;

  const patch = { _agente_w: { generated: new Date().toISOString(), note: 'Mergear en tokens.json — verificar con pnpm audit:a11y tras aplicar' } };

  for (const r of failing) {
    const key = `${slugify(r.component)}__${slugify(r.label)}`;
    const why = [];
    if (!r.wcag.aa.pass)  why.push(`WCAG AA falla (${r.wcag.ratio}:1 < ${r.wcag.aa.threshold})`);
    if (!r.apca.pass)     why.push(`APCA Lc ${r.apca.lc} < ${r.apca.threshold}`);

    patch[key] = {
      '$value':       r.suggestion,
      '$type':        'color',
      '$description': `Agente W fix · ${why.join(' · ')} · ${r.fontSize}px/w${r.fontWeight} · original: ${r.fg}`,
    };
  }

  return patch;
}

function printPatch(results) {
  const patch = buildPatch(results);
  if (!patch) {
    console.log(JSON.stringify({ _agente_w: { note: 'Sin fallos — tokens.json no requiere cambios' } }, null, 2));
    return;
  }
  console.log(JSON.stringify(patch, null, 2));
  if (results.some(r => !r.pass)) process.exitCode = 1;
}

/* ── 12. CLI ad-hoc (--fg --bg --size --weight) ─────────────────── */

function runCliPair() {
  const args = process.argv.slice(2);
  const get  = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const fg   = get('--fg');
  const bg   = get('--bg');
  if (!fg || !bg) return false;
  const size   = parseFloat(get('--size')   ?? '16');
  const weight = parseInt(get('--weight')   ?? '400', 10);
  const fin    = args.includes('--financial');
  const result = auditPair({ label: `${fg} / ${bg}`, fg, bg, fontSize: size, fontWeight: weight, isFinancial: fin });
  printReport([result]);
  return true;
}

/* ── 13. Main ─────────────────────────────────────────────────────── */

if (!runCliPair()) {
  if (IS_PATCH) {
    printPatch(SUITE);
  } else if (IS_JSON) {
    console.log(JSON.stringify(SUITE, null, 2));
    if (SUITE.some(r => !r.pass)) process.exitCode = 1;
  } else {
    printReport(SUITE);
  }
}
