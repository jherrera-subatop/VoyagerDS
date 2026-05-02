import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";

/**
 * Terrazzo pipeline — 3 separate CSS outputs.
 *
 * Variable naming: vmc-{token-path-with-dashes}
 * Tailwind v4 maps --color-* → var(--vmc-color-*) in globals.css @theme block.
 * This avoids circular references between Terrazzo output and Tailwind-generated properties.
 *
 * Outputs:
 *   src/styles/tokens/tokens-primitives.css      — raw color scales, fonts, space, radius, shadow, motion
 *   src/styles/tokens/tokens-semantics-light.css — semantic + transactional tokens, light mode (:root)
 *   src/styles/tokens/tokens-semantics-dark.css  — semantic + transactional tokens, dark mode
 */

/** @param {{ id: string }} token — full token object passed by Terrazzo v2 */
const vmcVar = (token) => "--vmc-" + token.id.replace(/\./g, "-").toLowerCase();

// Token ID patterns for filtering
const PRIMITIVE_PATTERNS = [
  "color.base-*",
  "color.vault-*",
  "color.vault-utility-*",
  "color.orange-*",
  "color.cyan-*",
  "color.neutral-*",
  "color.neutral-utility-*",
  "color.green-*",
  "color.red-*",
  "color.red-utility-*",
  "color.amber-*",
  "font.*",
  "text.*",
  "space.*",
  "radius.*",
  "shadow.*",
  "motion.duration.*",
  "motion.easing.*",
];

const SEMANTIC_PATTERNS = [
  "color.background.*",
  "color.background.urgency.*",
  "color.text.*",
  "color.text.market.*",
  "color.border.*",
  "color.icon.*",
  "color.status.*",
  "color.badge.**",
  "color.card.**",
  "color.timer.*",
  "color.action.*",
  "color.surface.*",
];

export default defineConfig({
  tokens: "./tokens.json",
  outDir: "./src/styles/tokens/",
  plugins: [
    // OUTPUT 1: Primitive tokens — absolute values, no modes
    // legacyHex: false → emit oklch() literals so CSS color-mix() and
    // oklch(from var(--token) ...) relative-color syntax work natively.
    css({
      filename: "tokens-primitives.css",
      include: PRIMITIVE_PATTERNS,
      variableName: vmcVar,
      legacyHex: false,
    }),

    // OUTPUT 2: Semantic tokens — light mode (default values in :root)
    css({
      filename: "tokens-semantics-light.css",
      include: SEMANTIC_PATTERNS,
      variableName: vmcVar,
      legacyHex: false,
      modeSelectors: [
        { mode: ".", selectors: [":root", "[data-theme='light']"] },
      ],
    }),

    // OUTPUT 3: Semantic tokens — dark mode
    css({
      filename: "tokens-semantics-dark.css",
      include: SEMANTIC_PATTERNS,
      variableName: vmcVar,
      legacyHex: false,
      modeSelectors: [
        {
          mode: "dark",
          selectors: [
            "@media (prefers-color-scheme: dark)",
            "[data-theme='dark']",
          ],
        },
      ],
    }),
  ],
});
