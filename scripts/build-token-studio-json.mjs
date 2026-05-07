#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Grupos bajo `color` que son semánticos (no paleta) — no van en Primitivos */
const SEMANTIC_UNDER_COLOR = new Set([
  "background",
  "text",
  "border",
  "icon",
  "status",
  "badge",
  "card",
  "timer",
  "action",
  "surface",
  "feedback",
]);

function isDimensionObj(o) {
  return (
    typeof o === "object" &&
    o !== null &&
    typeof o.value === "number" &&
    typeof o.unit === "string" &&
    Object.keys(o).length === 2
  );
}

function normalizeForStudio(node) {
  if (isDimensionObj(node)) {
    return `${node.value}${node.unit}`;
  }
  if (typeof node !== "object" || node === null) return node;
  if (Array.isArray(node)) return node.map(normalizeForStudio);

  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === "$schema" || k === "$extensions") continue;
    out[k] = normalizeForStudio(v);
  }
  return out;
}

function stripSemanticColorBranches(figma) {
  const colorIn = figma.color;
  if (!colorIn || typeof colorIn !== "object") return figma;

  const colorOut = {};
  for (const [k, v] of Object.entries(colorIn)) {
    if (SEMANTIC_UNDER_COLOR.has(k)) continue;
    colorOut[k] = v;
  }

  const out = { ...figma, color: colorOut };
  return out;
}

const figmaPath = resolve(root, "dist/tokens.figma.json");
const raw = JSON.parse(readFileSync(figmaPath, "utf8"));
const rawPrim = stripSemanticColorBranches(raw);
const primOut = normalizeForStudio(rawPrim);
writeFileSync(resolve(root, "tokens/PRIMITIVOS.json"), JSON.stringify(primOut, null, 2) + "\n");

const tokens = JSON.parse(readFileSync(resolve(root, "tokens.json"), "utf8"));
const iconFrag = JSON.parse(readFileSync(resolve(root, "tokens/studio-semantics-icon-root.json"), "utf8"));

const ORDER = [
  "background",
  "text",
  "border",
  "icon",
  "status",
  "badge",
  "card",
  "timer",
  "action",
  "surface",
];

const color = {};
for (const k of ORDER) {
  if (tokens.color[k]) color[k] = tokens.color[k];
}
color.$description = {
  $type: "other",
  $value: "Semantic color tokens — alias layer referencing Primitives",
};

const semOut = { color, ...iconFrag };
writeFileSync(resolve(root, "tokens/SEMANTICOS.json"), JSON.stringify(semOut, null, 2) + "\n");

console.log("OK: tokens/PRIMITIVOS.json (solo paleta + font/text/icon medidas/space/…) + tokens/SEMANTICOS.json\n");
