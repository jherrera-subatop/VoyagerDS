#!/usr/bin/env node
/**
 * Merges `icon` (glyph dimensions) from tokens.json into dist/tokens.figma.json
 * with dimension aliases resolved to literal { value, unit } for Figma/Tokens Studio.
 *
 * Run after editing icon.size.* in tokens.json:
 *   node scripts/sync-tokens-figma-json.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const srcPath = resolve(root, "tokens.json");
const distPath = resolve(root, "dist/tokens.figma.json");

const src = JSON.parse(readFileSync(srcPath, "utf-8"));
const figma = JSON.parse(readFileSync(distPath, "utf-8"));

function resolveDimensionValue(val) {
  if (val && typeof val === "object" && "value" in val && "unit" in val) {
    return val;
  }
  if (typeof val === "string" && val.startsWith("{") && val.endsWith("}")) {
    const parts = val.slice(1, -1).split(".");
    let cur = src;
    for (const p of parts) {
      if (cur === undefined || cur[p] === undefined) {
        throw new Error(`sync-tokens-figma-json: cannot resolve alias ${val} (missing ${p})`);
      }
      cur = cur[p];
    }
    if (cur && typeof cur === "object" && "$value" in cur) {
      return resolveDimensionValue(cur.$value);
    }
    throw new Error(`sync-tokens-figma-json: ${val} did not resolve to a dimension`);
  }
  throw new Error(`sync-tokens-figma-json: unsupported dimension value ${JSON.stringify(val)}`);
}

function buildIconExport() {
  if (!src.icon || !src.icon.size) {
    throw new Error("sync-tokens-figma-json: tokens.json missing icon.size");
  }
  const out = {
    $description: src.icon.$description,
    size: { $description: src.icon.size.$description },
  };
  for (const [key, node] of Object.entries(src.icon.size)) {
    if (key.startsWith("$")) continue;
    if (!node || typeof node !== "object" || !("$value" in node)) continue;
    out.size[key] = {
      $type: "dimension",
      $value: resolveDimensionValue(node.$value),
      $description: node.$description,
    };
  }
  return out;
}

figma.icon = buildIconExport();
writeFileSync(distPath, JSON.stringify(figma, null, 2) + "\n");
console.log("✓ dist/tokens.figma.json — icon.* synced from tokens.json\n");
