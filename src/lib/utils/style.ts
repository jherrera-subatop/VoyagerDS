import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Extended tailwind-merge that recognizes Voyager semantic color tokens
 * so class conflict resolution works correctly for bg-bg-primary, text-text-brand, etc.
 *
 * Without this extension, tailwind-merge doesn't know that bg-bg-primary and
 * bg-bg-secondary are the same property and would incorrectly keep both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Background semantic tokens
      "bg-color": [
        "bg-bg-primary",
        "bg-bg-secondary",
        "bg-bg-tertiary",
        "bg-bg-inverse",
        "bg-bg-brand",
        "bg-bg-interactive",
        "bg-bg-interactive-hover",
        "bg-bg-interactive-active",
        "bg-bg-interactive-selected",
        "bg-bg-disabled",
        "bg-bg-overlay",
        "bg-bg-card",
        "bg-bg-urgency-low",
        "bg-bg-urgency-high",
        "bg-bg-urgency-critical",
        "bg-surface-processing",
      ],
      // Text semantic tokens
      "text-color": [
        "text-text-primary",
        "text-text-secondary",
        "text-text-tertiary",
        "text-text-inverse",
        "text-text-brand",
        "text-text-brand-hover",
        "text-text-disabled",
        "text-text-placeholder",
        "text-text-market-bullish",
        "text-text-market-bearish",
        "text-text-price-label",
        "text-text-on-dark-muted",
        "text-text-on-dark-subtle",
        "text-timer-standard",
        "text-timer-imminent",
      ],
      // Border semantic tokens
      "border-color": [
        "border-border-default",
        "border-border-subtle",
        "border-border-strong",
        "border-border-brand",
        "border-border-focus",
        "border-border-error",
        "border-border-verified",
      ],
    },
  },
});

/**
 * cn() — the single point of conditional style logic in Voyager.
 *
 * Combines clsx (conditional class logic) with extended tailwind-merge
 * (conflict resolution for both Tailwind primitives and Voyager semantic tokens).
 *
 * Usage:
 *   cn("bg-bg-primary text-text-primary", isSelected && "bg-bg-interactive-selected")
 *   cn("px-spacing-200 py-spacing-100", className)
 *
 * Rules:
 *   - Only cn() may contain conditional class logic (no ternaries in JSX className)
 *   - Import from @/lib/utils/style — never inline clsx or twMerge directly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
