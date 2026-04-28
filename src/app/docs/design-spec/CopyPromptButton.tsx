"use client";

const STITCH_PROMPT = `You are performing a UI upgrade for VMC Subastas using the VOYAGER design system.
You have four inputs: DESIGN.md, a screenshot, the outerHTML, and the component dimensions below.

COMPONENT DIMENSIONS (exact — do not override these):
[FILL BEFORE SENDING]
Example:
  Root: 276×320px · padding 12px · gap 8px · radius 4px
  Image area: 276×132px
  Content area: 276×188px · padding 12px

STRUCTURAL CONTRACT (outerHTML):
The outerHTML is the hard contract for structure, dimensions, and text.
You MUST NOT add, remove, reorder, or rename any element from the outerHTML.
You MUST NOT change any text content — copy it exactly as written, including casing.
Do NOT apply uppercase, lowercase, or any text-transform unless the original text is already in that case.
Do NOT resize any element — use the exact dimensions provided above.
If an element is not in the outerHTML, do not create it.

VISUAL UPGRADE (DESIGN.md):
Apply VOYAGER visual language to every element in the outerHTML:
- Colors → identify the role of each color in the original (is it a brand color? primary text? muted text? accent? status?) and map it to the --voyager- token that serves the same role. If the original uses a colored/branded text, keep it colored using the equivalent --voyager- token — do not flatten it to a neutral.
- Typography → typeface decision rule from Section 3
- Spacing → token scale from Section 4 (snap to grid)
- Radius, shadows, borders → Section 5 and Section 6
- Respect the exact dimensions provided above — do not resize elements

DECORATIVE VISUAL PRESERVATION (critical):
Every decorative visual property in the outerHTML MUST be preserved — do not drop it, even if it comes from a utility class rather than an inline style.
- Bottom accent border (e.g. border-b-*, border-turquoise-*, border-cyan-*) → preserve it; map its color to --voyager-color-negotiable or the nearest role-equivalent --voyager- token. This is the VOYAGER signature finish defined in Section 5 of DESIGN.md — it is mandatory.
- Circular or shaped backgrounds on buttons (e.g. rounded-full with a background color) → preserve the shape and background; map the color to the nearest --voyager- token.
- Box shadows → preserve; use the shadow token from Section 6.
- Any border, background, or shadow present in the outerHTML must appear in the output. If you are unsure of the exact token, use the closest role-equivalent --voyager- token. Never remove a decorative element.

SCREENSHOT:
Visual reference for current state only. Do not infer structure from it — outerHTML is the structural truth.

ABSOLUTE CONSTRAINTS:
- Do not invent any element, pattern, button, label, or data not in the outerHTML
- Do not import patterns from Material Design, Radix UI, shadcn/ui, or any external system
- Do not resize any element — dimensions above are the contract
- Every color must use a --voyager- token
- Every decorative visual property from the outerHTML must be preserved (see above)
- This is a UI upgrade only: same component, new visual language`;

interface CopyPromptButtonProps {
  className?: string;
}

export default function CopyPromptButton({ className }: CopyPromptButtonProps) {
  function handleCopy(): void {
    void navigator.clipboard.writeText(STITCH_PROMPT);
    const btn = document.getElementById("copy-btn");
    if (btn) {
      btn.textContent = "Copiado";
      setTimeout(function resetLabel() {
        btn.textContent = "Copiar prompt";
      }, 2000);
    }
  }

  return (
    <div className={className}>
      <div
        className="rounded"
        style={{
          background: "var(--vmc-color-surface-card, #fff)",
          border: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "var(--vmc-color-surface-section, #F2F4F3)",
            borderBottom: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))",
          }}
        >
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--vmc-color-text-brand, #22005C)" }}
            >
              Prompt — Stitch / Claude Design
            </span>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--vmc-color-text-tertiary, #49455080)" }}
            >
              1. Copia · 2. Llena [FILL BEFORE SENDING] con las medidas · 3. Adjunta DESIGN.md + screenshot + outerHTML
            </p>
          </div>
          <button
            id="copy-btn"
            onClick={handleCopy}
            className="text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            style={{
              background: "var(--vmc-color-vault, #22005C)",
              color: "#fff",
              fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Copiar prompt
          </button>
        </div>
        <pre
          className="text-xs leading-relaxed p-4 whitespace-pre-wrap overflow-x-auto"
          style={{
            color: "var(--vmc-color-text-secondary, #494550)",
            fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
          }}
        >
          {STITCH_PROMPT}
        </pre>
      </div>
    </div>
  );
}
