#!/usr/bin/env node
/**
 * Extrae el bloque de comentario JSDoc que contiene @figma-spec de un .tsx/.ts.
 * Salida JSON por stdout para handoff al subagente (sin leer el TSX entero en el LLM).
 *
 * Uso:
 *   node scripts/figma/extract-figma-spec.mjs src/features/OfferCard/OfferCard.tsx
 *   pnpm figma:extract-spec -- src/features/Header/Header.tsx
 *
 * Flags:
 *   --text-only   imprime solo el bloque del spec (sin JSON)
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const raw = process.argv.slice(2);
const textOnly = raw.includes("--text-only");
const fileArg = raw.find((a) => a !== "--" && !a.startsWith("--"));

function usage() {
  console.error(
    "Uso: node scripts/figma/extract-figma-spec.mjs [--text-only] <ruta-al-tsx>",
  );
  process.exit(1);
}

if (!fileArg) {
  usage();
}

const abs = path.isAbsolute(fileArg)
  ? fileArg
  : path.resolve(process.cwd(), fileArg);

if (!fs.existsSync(abs)) {
  console.error(`No existe el archivo: ${abs}`);
  process.exit(1);
}

const content = fs.readFileSync(abs, "utf8");
const tag = "@figma-spec";
const tagIdx = content.indexOf(tag);

if (tagIdx === -1) {
  console.error(`No se encontró ${tag} en ${abs}`);
  process.exit(1);
}

const blockStart = content.lastIndexOf("/**", tagIdx);
if (blockStart === -1) {
  console.error(`No se encontró inicio /** antes de ${tag} en ${abs}`);
  process.exit(1);
}

const blockEnd = content.indexOf("*/", tagIdx);
if (blockEnd === -1) {
  console.error(`No se encontró cierre */ después de ${tag} en ${abs}`);
  process.exit(1);
}

const specBlock = content.slice(blockStart, blockEnd + 2).trim();

if (textOnly) {
  process.stdout.write(specBlock + "\n");
  process.exit(0);
}

const payload = {
  sourceFile: path.relative(process.cwd(), abs).replace(/\\/g, "/"),
  specText: specBlock,
  charCount: specBlock.length,
};

process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
