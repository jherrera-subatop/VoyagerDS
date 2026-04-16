#!/usr/bin/env node
/**
 * wireframe-parity-check.mjs
 *
 * Valida que los anchos en el sistema de wireframes sean consistentes.
 *
 * Regla: UN SOLO origen de anchos → _data/frame-dimensions.ts → ATOM_W
 *
 * Checks:
 *   1. wf-detalle-atoms.tsx re-exporta ATOM_W (desde frame-dimensions)
 *   2. ComponentWireframe.tsx usa ATOM_W, sin NW propio ni naturalWidth hardcodeado
 *   3. DetallePageFrame.tsx usa ATOM_W, sin constantes propias duplicadas
 *   4. frame-measure-spec.ts importa ATOM_W y NO tiene wPx numéricos hardcodeados
 *      (excepto alturas hPx que pueden ser números fijos)
 *
 * Uso: node scripts/wireframe-parity-check.mjs
 *      (o pnpm run wireframe:parity)
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const COMP_ROOT = resolve(process.cwd(), "src/app/docs/taxonomia/components");
const DATA_ROOT = resolve(process.cwd(), "src/app/docs/taxonomia/_data");

const FILES = {
  dimensions:   resolve(DATA_ROOT, "frame-dimensions.ts"),
  atoms:        resolve(COMP_ROOT, "wf-detalle-atoms.tsx"),
  wireframe:    resolve(COMP_ROOT, "ComponentWireframe.tsx"),
  frame:        resolve(COMP_ROOT, "DetallePageFrame.tsx"),
  measureSpec:  resolve(DATA_ROOT, "frame-measure-spec.ts"),
  taxComponents: resolve(DATA_ROOT, "taxonomy-components.ts"),
};

let errors = 0;
let warnings = 0;

function err(msg) { console.error(`  [ERROR] ${msg}`); errors++; }
function warn(msg) { console.warn(`  [WARN]  ${msg}`); warnings++; }
function ok(msg)  { console.log(`  [ok]    ${msg}`); }
function section(title) { console.log(`\n── ${title}`); }

console.log("\nVoyager — Wireframe Parity Check");
console.log("=".repeat(52));

// ── 1. frame-dimensions.ts es la fuente de verdad ───────────────────────────
section("1. frame-dimensions.ts");
const dimSrc = readFileSync(FILES.dimensions, "utf-8");

if (dimSrc.includes("export const ATOM_W")) {
  ok("frame-dimensions.ts exporta ATOM_W");
} else {
  err("frame-dimensions.ts NO exporta ATOM_W — fuente de verdad rota");
}

// ── 2. wf-detalle-atoms.tsx re-exporta desde frame-dimensions ───────────────
section("2. wf-detalle-atoms.tsx");
const atomsSrc = readFileSync(FILES.atoms, "utf-8");

if (atomsSrc.includes("ATOM_W") && atomsSrc.includes("frame-dimensions")) {
  ok("wf-detalle-atoms.tsx re-exporta ATOM_W desde frame-dimensions");
} else if (atomsSrc.includes("export const ATOM_W")) {
  err("wf-detalle-atoms.tsx define ATOM_W localmente — debe importar desde _data/frame-dimensions");
} else {
  err("wf-detalle-atoms.tsx no referencia ATOM_W ni frame-dimensions");
}

// ── 3. ComponentWireframe.tsx usa ATOM_W, sin NW propio ─────────────────────
section("3. ComponentWireframe.tsx");
const wireSrc = readFileSync(FILES.wireframe, "utf-8");

if (wireSrc.includes("ATOM_W")) {
  ok("ComponentWireframe.tsx importa ATOM_W");
} else {
  err("ComponentWireframe.tsx NO importa ATOM_W");
}

if (/const NW\s*=/.test(wireSrc)) {
  err("ComponentWireframe.tsx define su propio objeto NW — viola fuente única");
}

const hardcodedNaturalWidths = [...wireSrc.matchAll(/naturalWidth=\{(\d+)\}/g)];
if (hardcodedNaturalWidths.length > 0) {
  hardcodedNaturalWidths.forEach(([, n]) =>
    err(`ComponentWireframe.tsx: naturalWidth={${n}} hardcodeado — usar ATOM_W.*`)
  );
} else {
  ok("ComponentWireframe.tsx sin naturalWidth numéricos hardcodeados");
}

const residualNW = [...wireSrc.matchAll(/\bNW\.(frame|sidebar|content|widget|main|demo)\b/g)];
if (residualNW.length > 0) {
  residualNW.forEach(([match]) =>
    err(`ComponentWireframe.tsx: referencia residual "${match}" — reemplazar con ATOM_W.*`)
  );
} else {
  ok("ComponentWireframe.tsx sin referencias NW.* residuales");
}

// ── 4. DetallePageFrame.tsx usa ATOM_W ──────────────────────────────────────
section("4. DetallePageFrame.tsx");
const frameSrc = readFileSync(FILES.frame, "utf-8");

if (frameSrc.includes("ATOM_W")) {
  ok("DetallePageFrame.tsx usa ATOM_W");
} else {
  warn("DetallePageFrame.tsx no referencia ATOM_W — verificar si tiene constantes propias");
}

const hasFrameW   = /const FRAME_W\s*=\s*\d+/.test(frameSrc);
const hasSidebarW = /const SIDEBAR_W\s*=\s*\d+/.test(frameSrc);
if (hasFrameW || hasSidebarW) {
  err("DetallePageFrame.tsx define FRAME_W/SIDEBAR_W propios — migrar a ATOM_W.*");
} else {
  ok("DetallePageFrame.tsx sin constantes de ancho duplicadas");
}

// ── 5. frame-measure-spec.ts importa ATOM_W y no tiene wPx hardcodeados ─────
section("5. frame-measure-spec.ts");
const specSrc = readFileSync(FILES.measureSpec, "utf-8");

if (specSrc.includes("import") && specSrc.includes("ATOM_W")) {
  ok("frame-measure-spec.ts importa ATOM_W");
} else {
  err("frame-measure-spec.ts NO importa ATOM_W — los wPx son números hardcodeados sin contrato");
}

// Detectar wPx: <número> que no sea un cálculo ATOM_W.*
// Buscamos `wPx: <dígitos>` fuera de comentarios — indicador de hardcodeo
const hardcodedWpx = [...specSrc.matchAll(/wPx:\s*(\d{3,4})\b/g)];
if (hardcodedWpx.length > 0) {
  hardcodedWpx.forEach(([, n]) =>
    err(`frame-measure-spec.ts: wPx: ${n} hardcodeado — usar ATOM_W.* (ej: ATOM_W.content)`)
  );
} else {
  ok("frame-measure-spec.ts sin wPx numéricos hardcodeados");
}

// ── 6. taxonomy-components.ts — widthPx/heightPx vinculados a ATOM_W ─────────
section("6. taxonomy-components.ts — widthPx/heightPx");
const taxSrc = readFileSync(FILES.taxComponents, "utf-8");

if (taxSrc.includes("ATOM_W") && taxSrc.includes("frame-dimensions")) {
  ok("taxonomy-components.ts importa ATOM_W desde frame-dimensions");
} else if (/widthPx|heightPx/.test(taxSrc)) {
  err("taxonomy-components.ts tiene widthPx/heightPx pero NO importa ATOM_W — hardcodeo sin contrato");
} else {
  warn("taxonomy-components.ts no importa ATOM_W (sin widthPx aún — ok si es migración parcial)");
}

// Detectar widthPx o heightPx con número hardcodeado (no via ATOM_W)
const hardcodedWidthPx = [...taxSrc.matchAll(/widthPx:\s*(\d{2,4})\b/g)];
if (hardcodedWidthPx.length > 0) {
  hardcodedWidthPx.forEach(([, n]) =>
    err(`taxonomy-components.ts: widthPx: ${n} hardcodeado — usar ATOM_W.* (ej: ATOM_W.content)`)
  );
} else {
  ok("taxonomy-components.ts sin widthPx numéricos hardcodeados");
}

const hardcodedHeightPx = [...taxSrc.matchAll(/heightPx:\s*(\d{2,4})\b/g)];
if (hardcodedHeightPx.length > 0) {
  hardcodedHeightPx.forEach(([, n]) =>
    warn(`taxonomy-components.ts: heightPx: ${n} — altura fija ok, pero verificar si debe venir de un token`)
  );
} else {
  ok("taxonomy-components.ts sin heightPx numéricos hardcodeados");
}

// ── Resumen ──────────────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(52));
if (errors === 0 && warnings === 0) {
  console.log("✓  Paridad OK — sin errores ni advertencias\n");
  process.exit(0);
} else if (errors === 0) {
  console.log(`⚠  ${warnings} advertencia(s) — revisar antes de cerrar la tarea\n`);
  process.exit(0);
} else {
  console.log(`✗  ${errors} error(es) · ${warnings} advertencia(s) — CORREGIR antes de continuar\n`);
  process.exit(1);
}
