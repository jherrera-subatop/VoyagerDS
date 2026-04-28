"use client";

import { useState, type ChangeEvent } from "react";

/**
 * Strips Vue noise + known outer wrappers from outerHTML.
 * Removes: HTML comments, data-v-* attrs, v-portal divs, v-* directives,
 * and single-level app/layout wrappers that are not part of the component.
 */
function cleanHtml(raw: string): string {
  let html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+data-v-[a-z0-9]+(?:="[^"]*")?/g, "")
    .replace(/<div[^>]*data-v-app[^>]*>[\s\S]*?<\/div>/g, "")
    .replace(/\s+v-(?:if|else|show|for|bind|on|model|slot|pre|cloak|once)(?:="[^"]*")?/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Strip known outer wrapper patterns (app root, layout shells, router views)
  const WRAPPER_PATTERNS = [
    /^<div[^>]*\bid=["']app["'][^>]*>([\s\S]*)<\/div>$/,
    /^<div[^>]*\bdata-v-app\b[^>]*>([\s\S]*)<\/div>$/,
    /^<div[^>]*\bclass=["'][^"']*v-application[^"']*["'][^>]*>([\s\S]*)<\/div>$/,
    /^<div[^>]*\bclass=["'][^"']*router-view[^"']*["'][^>]*>([\s\S]*)<\/div>$/,
    /^<div[^>]*\bclass=["'][^"']*layout[^"']*["'][^>]*>([\s\S]*)<\/div>$/,
  ];

  for (const pattern of WRAPPER_PATTERNS) {
    const match = html.match(pattern);
    if (match && match[1]) {
      html = match[1].trim();
      break;
    }
  }

  return html;
}

// Minimal instructions — the full protocol lives in the voyager-ui-upgrade skill and .claude/rules/.
// Only structural contracts not already covered by the skill go here.
const STATIC_INSTRUCTIONS = `TASK: UI upgrade — apply VOYAGER tokens to the outerHTML above (voyager-ui-upgrade protocol).
DOM structure, text content, and decorative properties (borders, shadows, shapes) are frozen — preserve exactly.
Every color → --voyager- token with HEX fallback. Screenshot is visual reference only, outerHTML is the contract.`;

function buildPrompt(html: string, width: string, height: string): string {
  const dimsBlock = (width || height)
    ? `${width || "?"}×${height || "?"}px`
    : "[sin medidas — agregar antes de enviar]";

  return `You are performing a UI upgrade for VMC Subastas using the VOYAGER design system.
You have four inputs: DESIGN.md, a screenshot, the outerHTML, and the component dimensions below.

COMPONENT DIMENSIONS (exact — do not override these):
${dimsBlock}

STRUCTURAL CONTRACT (outerHTML):
The outerHTML is the hard contract for structure, dimensions, and text.
You MUST NOT add, remove, reorder, or rename any element from the outerHTML.
You MUST NOT change any text content — copy it exactly as written, including casing.
Do NOT apply uppercase, lowercase, or any text-transform unless the original text is already in that case.
Do NOT resize any element — use the exact dimensions provided above.
If an element is not in the outerHTML, do not create it.

${STATIC_INSTRUCTIONS}

--- outerHTML START ---
${html.trim()}
--- outerHTML END ---`;
}

type CopyState = "idle" | "copied";

export default function PromptBuilder() {
  const [html, setHtml] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");

  function handleHtmlChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setHtml(e.target.value);
  }

  function handleWidthChange(e: ChangeEvent<HTMLInputElement>): void {
    setWidth(e.target.value);
  }

  function handleHeightChange(e: ChangeEvent<HTMLInputElement>): void {
    setHeight(e.target.value);
  }

  function handleCopy(): void {
    if (!html.trim()) return;
    const cleaned = cleanHtml(html);
    const prompt = buildPrompt(cleaned, width, height);
    void navigator.clipboard.writeText(prompt).then(function onCopied() {
      setCopyState("copied");
      setTimeout(function reset() {
        setCopyState("idle");
      }, 2000);
    });
  }

  const isReady = html.trim().length > 0;
  const cleaned = isReady ? cleanHtml(html) : "";
  const generated = isReady ? buildPrompt(cleaned, width, height) : "";
  const estimatedTokens = isReady ? Math.round(generated.length / 4) : 0;

  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
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
            Generador de Prompt
          </span>
          <p className="text-xs mt-0.5" style={{ color: "var(--vmc-color-text-tertiary, #49455080)" }}>
            Pega el HTML → agrega medidas → copia el prompt completo
            {isReady && cleaned.length < html.trim().length && (
              <span
                className="ml-2 font-semibold"
                style={{ color: "var(--vmc-color-negotiable, #00CACE)" }}
              >
                ✓ {html.trim().length - cleaned.length} chars removidos
              </span>
            )}
            {isReady && (
              <span
                className="ml-2 font-semibold"
                style={{
                  color: estimatedTokens > 2500
                    ? "var(--vmc-color-live, #ED8936)"
                    : "var(--vmc-color-status-success, #22C55E)",
                }}
              >
                ~{estimatedTokens.toLocaleString()} tokens
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleCopy}
          disabled={!isReady}
          className="text-xs font-semibold px-3 py-1.5 rounded transition-opacity"
          style={{
            background: isReady
              ? "var(--vmc-color-vault, #22005C)"
              : "var(--vmc-color-skeleton, #D1D5DC)",
            color: "#fff",
            cursor: isReady ? "pointer" : "not-allowed",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          {copyState === "copied" ? "Copiado ✓" : "Copiar prompt completo"}
        </button>
      </div>

      <div className="grid grid-cols-2" style={{ minHeight: "240px" }}>

        {/* Left — inputs */}
        <div
          className="flex flex-col"
          style={{ borderRight: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
        >
          {/* HTML input */}
          <div
            className="px-3 pt-3 pb-1 flex flex-col flex-1"
            style={{ borderBottom: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
          >
            <label
              className="text-xs font-semibold mb-1.5 block"
              style={{ color: "var(--vmc-color-text-primary, #191C1C)" }}
            >
              outerHTML / Copy Element
            </label>
            <textarea
              value={html}
              onChange={handleHtmlChange}
              placeholder="Pega aquí el HTML del componente..."
              className="flex-1 text-xs resize-none outline-none rounded p-2"
              style={{
                minHeight: "120px",
                background: "var(--vmc-color-input-bg, #E1E3E2)",
                color: "var(--vmc-color-text-primary, #191C1C)",
                fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
                border: "none",
              }}
            />
          </div>

          {/* Dimensions input */}
          <div className="px-3 pt-3 pb-3">
            <label
              className="text-xs font-semibold mb-2 block"
              style={{ color: "var(--vmc-color-text-primary, #191C1C)" }}
            >
              Medidas del componente
            </label>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary, #49455080)" }}>Ancho (px)</span>
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  placeholder="276"
                  className="text-xs outline-none rounded p-2 w-full"
                  style={{
                    background: "var(--vmc-color-input-bg, #E1E3E2)",
                    color: "var(--vmc-color-text-primary, #191C1C)",
                    fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
                    border: "none",
                  }}
                />
              </div>
              <span className="text-sm font-bold mt-4" style={{ color: "var(--vmc-color-text-tertiary)" }}>×</span>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs" style={{ color: "var(--vmc-color-text-tertiary, #49455080)" }}>Alto (px)</span>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  placeholder="224"
                  className="text-xs outline-none rounded p-2 w-full"
                  style={{
                    background: "var(--vmc-color-input-bg, #E1E3E2)",
                    color: "var(--vmc-color-text-primary, #191C1C)",
                    fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right — preview */}
        <div className="flex flex-col">
          <div className="px-3 pt-3 pb-1">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--vmc-color-text-primary, #191C1C)" }}
            >
              Vista previa del prompt
            </span>
          </div>
          <pre
            className="text-xs leading-relaxed p-3 overflow-auto flex-1 whitespace-pre-wrap"
            style={{
              color: isReady
                ? "var(--vmc-color-text-secondary, #494550)"
                : "var(--vmc-color-text-tertiary, #49455080)",
              fontFamily: "var(--font-mono, 'Roboto Mono', monospace)",
              minHeight: "200px",
            }}
          >
            {isReady ? generated : "El prompt aparecerá aquí una vez que pegues el HTML..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
