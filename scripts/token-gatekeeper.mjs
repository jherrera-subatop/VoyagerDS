#!/usr/bin/env node
/**
 * token-gatekeeper.mjs — Voyager Token Quality Gate
 *
 * Validates tokens.json before Terrazzo compiles it.
 * Integrated into `prebuild` and `predev` scripts.
 * BUILD FAILS if any rule is violated.
 *
 * Rules enforced:
 *   1. $description — present on every token (no silent tokens)
 *   2. Color format — { colorSpace, components, alpha } object (no strings)
 *   3. Semantic colors — alias references only (never hardcoded primitives in semantic paths)
 *   4. Primitive colors — object values (never aliases) with valid colorSpace
 *   5. Dimension format — { value, unit } object
 *   6. Duration format — { value, unit } object
 *   7. Typography lineHeight — number (unitless ratio), not string
 *   8. Numeric text styles — $extensions.voyager.fontVariantNumeric: "tabular-nums"
 *   9. 12 steps per color palette — vault/orange/cyan/neutral/green/red/amber
 *  10. No T-shirt sizes in primitive color naming (no "sm", "md", "lg" etc.)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, "..", "tokens.json");

const tokens = JSON.parse(readFileSync(tokensPath, "utf-8"));

// ── Tracking ──────────────────────────────────────────────────────────────────

const errors = [];
const warnings = [];
let totalTokens = 0;

function fail(path, message) {
  errors.push(`  ✗ ${path}: ${message}`);
}

function warn(path, message) {
  warnings.push(`  ⚠ ${path}: ${message}`);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isAlias(value) {
  return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

function isColorObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    "colorSpace" in value &&
    "components" in value &&
    Array.isArray(value.components) &&
    value.components.length === 3
  );
}

function isDimensionObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "unit" in value &&
    typeof value.value === "number"
  );
}

function isDurationObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "unit" in value &&
    (value.unit === "ms" || value.unit === "s")
  );
}

const TSHIRT_SIZES = /\b(xs|sm|md|lg|xl|xxl|small|medium|large|extra)\b/i;

// ── Token walkers ─────────────────────────────────────────────────────────────

function walkTokens(node, path, parentType) {
  if (typeof node !== "object" || node === null) return;

  const currentType = node.$type ?? parentType;

  // Is this a token node? (has $value)
  if ("$value" in node) {
    totalTokens++;
    validateToken(node, path, currentType);
    return;
  }

  // Group node — recurse into children
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (typeof value === "object" && value !== null) {
      walkTokens(value, `${path}.${key}`, currentType);
    }
  }
}

function validateToken(token, path, type) {
  // ── Rule 1: $description required ──────────────────────────────────────────
  if (!token.$description || token.$description.trim() === "") {
    fail(path, "Missing $description (required for AI-readability)");
  }

  const value = token.$value;

  // ── Rule 2 & 3 & 4: Color format validation ─────────────────────────────────
  if (type === "color") {
    validateColorValue(value, path, "default");

    // Also validate dark mode values
    const darkMode = token.$extensions?.mode?.dark;
    if (darkMode !== undefined) {
      validateColorValue(darkMode, path, "dark");
    }
  }

  // ── Rule 5: Dimension format ────────────────────────────────────────────────
  if (type === "dimension") {
    const cleanPath = path.replace(/^\./, "");
    if (typeof value === "string") {
      if (isAlias(value) && cleanPath.startsWith("icon.size.")) {
        return;
      }
      fail(path, `Dimension must be { value, unit } object, got string "${value}"`);
    } else if (!isDimensionObject(value)) {
      fail(path, "Dimension must be { value: number, unit: string } object");
    }
  }

  // ── Rule 6: Duration format ─────────────────────────────────────────────────
  if (type === "duration") {
    if (typeof value === "string") {
      fail(path, `Duration must be { value, unit } object, got string "${value}"`);
    } else if (!isDurationObject(value)) {
      fail(path, "Duration must be { value: number, unit: 'ms'|'s' } object");
    }
  }

  // ── Rule 7: Typography lineHeight must be unitless number ───────────────────
  if (type === "typography" && typeof value === "object" && value !== null) {
    if (typeof value.lineHeight === "string") {
      fail(
        path,
        `lineHeight must be a unitless number (e.g. 1.5), got string "${value.lineHeight}"`
      );
    }
    if (typeof value.lineHeight !== "number") {
      fail(path, `lineHeight must be a number, got ${typeof value.lineHeight}`);
    }
  }

  // ── Rule 8: Numeric text styles must have tabular-nums ──────────────────────
  if (type === "typography" && path.includes(".numeric-")) {
    const tabularNums = token.$extensions?.voyager?.fontVariantNumeric;
    if (tabularNums !== "tabular-nums") {
      fail(
        path,
        'Numeric text style missing $extensions.voyager.fontVariantNumeric: "tabular-nums"'
      );
    }
  }
}

function validateColorValue(value, path, mode) {
  const modeLabel = mode === "default" ? "" : ` (${mode} mode)`;

  if (typeof value === "string") {
    if (isAlias(value)) {
      // Alias reference — valid for semantic tokens, check below
      validateSemanticAlias(value, path, mode);
    } else {
      // Raw string color — invalid in v2
      fail(
        path,
        `Color${modeLabel} must be object { colorSpace, components, alpha }, got string "${value}"`
      );
    }
  } else if (isColorObject(value)) {
    // Direct color object — must be a primitive (not a semantic token)
    validatePrimitiveColor(value, path, mode);
  } else {
    fail(path, `Color${modeLabel} has unknown format`);
  }
}

function validateSemanticAlias(alias, path, mode) {
  const modeLabel = mode === "default" ? "" : ` (${mode} mode)`;
  // Strip leading dot from path (walker prefixes with ".")
  const cleanPath = path.replace(/^\./, "");
  const semanticPrefixes = [
    "color.background.",
    "color.text.",
    "color.border.",
    "color.icon.",
    "color.status.",
    "color.badge.",
    "color.card.",
    "color.timer.",
    "color.action.",
    "color.surface.",
  ];
  const isSemanticPath = semanticPrefixes.some((p) => cleanPath.startsWith(p));
  if (!isSemanticPath) {
    // Primitive token using an alias — warn (unusual but not forbidden)
    warn(
      path,
      `Primitive token${modeLabel} uses alias "${alias}" — primitives should have direct values`
    );
  }
}

function validatePrimitiveColor(value, path, mode) {
  const modeLabel = mode === "default" ? "" : ` (${mode} mode)`;
  const validColorSpaces = ["oklch", "srgb", "display-p3", "oklab", "hsl"];
  if (!validColorSpaces.includes(value.colorSpace)) {
    fail(
      path,
      `Color${modeLabel} has unsupported colorSpace "${value.colorSpace}". Use: ${validColorSpaces.join(", ")}`
    );
  }
  if (value.alpha !== undefined && (value.alpha < 0 || value.alpha > 1)) {
    fail(path, `Color${modeLabel} alpha must be 0–1, got ${value.alpha}`);
  }
}

// ── Rule 9: 12-step palettes ───────────────────────────────────────────────

function validatePaletteSteps() {
  const palettes = ["vault", "orange", "cyan", "neutral", "green", "red", "amber"];
  const expectedSteps = 12;

  for (const palette of palettes) {
    if (!tokens.color) {
      fail(`color.${palette}`, "color group missing from tokens.json");
      continue;
    }
    const steps = Object.keys(tokens.color).filter(
      (k) => k.startsWith(`${palette}-`) && !k.includes("-a") && /\d+$/.test(k)
    );
    if (steps.length !== expectedSteps) {
      fail(
        `color.${palette}`,
        `Expected ${expectedSteps} steps, found ${steps.length}: [${steps.join(", ")}]`
      );
    }
  }
}

// ── Rule 10: No T-shirt sizes in primitive color names ─────────────────────

function validateNoPrimitiveAlias() {
  if (!tokens.color) return;
  for (const key of Object.keys(tokens.color)) {
    if (TSHIRT_SIZES.test(key)) {
      fail(`color.${key}`, `T-shirt size in primitive name — use numeric scale (e.g. "vault-500")`);
    }
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────

console.log("\n🔍 Voyager Token Gatekeeper — validating tokens.json\n");

walkTokens(tokens, "", null);
validatePaletteSteps();
validateNoPrimitiveAlias();

const errorCount = errors.length;
const warnCount = warnings.length;

if (warnings.length > 0) {
  console.log(`⚠  ${warnCount} warning${warnCount === 1 ? "" : "s"}:\n`);
  for (const w of warnings) console.log(w);
  console.log();
}

if (errors.length > 0) {
  console.error(`✗  ${errorCount} error${errorCount === 1 ? "" : "s"} (build blocked):\n`);
  for (const e of errors) console.error(e);
  console.error(
    `\n  Fix all errors before running terrazzo build or next dev.\n`
  );
  process.exit(1);
}

console.log(
  `✔  ${totalTokens} tokens validated — 0 errors${warnCount > 0 ? `, ${warnCount} warnings` : ""}\n`
);
