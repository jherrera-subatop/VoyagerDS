"use client";

/**
 * ComponentShowcase
 * Wrapper estándar para todos los componentes en /docs/componentes.
 *
 * Modos (via ComponentModeContext):
 * · NORMAL = output directo del pipeline Stitch
 * · DONE   = versión refinada en Figma → traída via Figma MCP → tokens DS
 *
 * Botones:
 * · "Ver en Stitch" → abre stitch.google.com (dashboard del usuario)
 * · "Copiar Screen ID" → copia el screenId al portapapeles
 * · "Exportar a Figma" → tooltip con las instrucciones del flujo Export → Figma
 *
 * Uso:
 * <ComponentShowcase
 *   id="footer-primary"
 *   title="Footer"
 *   description="..."
 *   stitchProjectId="14182036405227000116"
 *   stitchScreenId="721499f3bb8045628248df64e7bbcb2d"
 *   importPath='import Footer from "@/features/Footer/Footer";'
 *   doneChildren={<FooterDone />}
 * >
 *   <Footer />
 * </ComponentShowcase>
 */

import { useState } from "react";
import type { JSX, ReactNode } from "react";
import { useComponentMode } from "./ComponentModeContext";

const STITCH_DASHBOARD = "https://stitch.google.com";

interface ComponentShowcaseProps {
  id: string;
  title: string;
  description?: string;
  stitchProjectId: string;
  stitchScreenId: string;
  importPath: string;
  children: ReactNode;
  doneChildren?: ReactNode;
  fullWidth?: boolean;
}

type CopyState = "idle" | "copied";
type Viewport = "mobile" | "tablet" | "desktop";

interface ViewportOption {
  id: Viewport;
  label: string;
  width: number | "100%";
  icon: string;
}

const VIEWPORT_OPTIONS: ViewportOption[] = [
  { id: "mobile",  label: "420",  width: 420,   icon: "📱" },
  { id: "tablet",  label: "640",  width: 640,   icon: "📟" },
  { id: "desktop", label: "1024", width: 1024,   icon: "🖥" },
];

function FigmaTooltip({ visible }: { visible: boolean }): JSX.Element {
  if (!visible) return <></>;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        right: 0,
        background: "var(--vmc-color-background-brand)",
        color: "var(--vmc-color-text-inverse)",
        fontSize: 11,
        lineHeight: "18px",
        padding: "10px 14px",
        borderRadius: 4,
        zIndex: 20,
        boxShadow: "0 4px 16px rgba(34,0,92,0.30)",
        fontFamily: "var(--font-body, sans-serif)",
        width: 240,
      }}
    >
      <p style={{ fontWeight: 700, margin: "0 0 6px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Flujo Export → Figma
      </p>
      <ol style={{ margin: 0, paddingLeft: 16 }}>
        <li>Abre Stitch y busca el proyecto</li>
        <li>Clic en la pantalla del componente</li>
        <li>Clic en <strong>Export</strong> → <strong>Figma</strong></li>
        <li>Clic en <strong>Copy link</strong></li>
        <li>En Figma: <strong>Ctrl+V / ⌘V</strong></li>
      </ol>
    </div>
  );
}

function DonePendingPlaceholder(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "48px 24px",
        background: "var(--vmc-color-background-secondary)",
        borderRadius: 8,
        minHeight: 120,
      }}
    >
      <span style={{ fontSize: 20 }}>🎨</span>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--vmc-color-text-secondary)", margin: 0 }}>
        Versión Done pendiente
      </p>
      <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: 0, textAlign: "center", maxWidth: 280 }}>
        Refina en Figma → trae via Figma MCP → reconstruye con tokens DS
      </p>
    </div>
  );
}

export function ComponentShowcase({
  id,
  title,
  description,
  stitchProjectId,
  stitchScreenId,
  importPath,
  children,
  doneChildren,
  fullWidth = false,
}: ComponentShowcaseProps): JSX.Element {
  const { mode } = useComponentMode();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [figmaTooltip, setFigmaTooltip] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const isDoneMode = mode === "done";
  const hasDone = doneChildren !== undefined;

  function handleCopyScreenId(): void {
    void navigator.clipboard.writeText(stitchScreenId).then(function onCopied() {
      setCopyState("copied");
      setTimeout(function resetCopy() {
        setCopyState("idle");
      }, 2000);
    });
  }

  function handleFigmaEnter(): void {
    setFigmaTooltip(true);
  }

  function handleFigmaLeave(): void {
    setFigmaTooltip(false);
  }

  function handleViewport(v: Viewport): void {
    setViewport(v);
  }

  return (
    <div className="mt-12">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--vmc-color-text-primary)", margin: 0, fontFamily: "var(--font-display, sans-serif)" }}>
              {title}
            </h2>
            <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", color: "var(--vmc-color-text-brand)", background: "var(--vmc-color-background-interactive)", padding: "2px 8px", borderRadius: 4 }}>
              {id}
            </span>

            {/* ── Mode badge ──────────────────────────────────────────── */}
            {isDoneMode && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: hasDone ? "oklch(0.55 0.18 145)" : "oklch(0.65 0.04 220)",
                  color: "oklch(1 0 0)",
                }}
              >
                {hasDone ? "✓ done" : "pendiente"}
              </span>
            )}
          </div>
          {description && (
            <p style={{ fontSize: 13, color: "var(--vmc-color-text-secondary)", margin: 0, lineHeight: "20px" }}>
              {description}
            </p>
          )}
        </div>

        {/* ── Actions ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>

          {/* Ver en Stitch */}
          <a
            href={STITCH_DASHBOARD}
            target="_blank"
            rel="noopener noreferrer"
            title={`Proyecto: ${stitchProjectId}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--vmc-color-text-brand)", textDecoration: "none", padding: "6px 12px", borderRadius: 4, background: "var(--vmc-color-background-interactive)", whiteSpace: "nowrap" }}
            className="sc-btn"
          >
            <StitchIcon />
            Ver en Stitch
          </a>

          {/* Copiar Screen ID */}
          <button
            type="button"
            onClick={handleCopyScreenId}
            title="Copiar Screen ID para buscar en Stitch"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--vmc-color-text-secondary)", padding: "6px 12px", borderRadius: 4, background: "var(--vmc-color-background-secondary)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            className="sc-btn"
          >
            <CopyIcon />
            {copyState === "copied" ? "¡Copiado!" : "Copiar Screen ID"}
          </button>

          {/* Exportar a Figma */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onMouseEnter={handleFigmaEnter}
              onMouseLeave={handleFigmaLeave}
              onFocus={handleFigmaEnter}
              onBlur={handleFigmaLeave}
              onClick={handleFigmaEnter}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--vmc-color-text-inverse)", padding: "6px 12px", borderRadius: 4, background: "var(--vmc-color-background-brand)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
              className="sc-btn-primary"
            >
              <FigmaIcon />
              Exportar a Figma
            </button>
            <FigmaTooltip visible={figmaTooltip} />
          </div>
        </div>
      </div>

      {/* ── Project / Screen IDs ──────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--vmc-color-text-tertiary)" }}>
          project: <span style={{ color: "var(--vmc-color-text-secondary)" }}>{stitchProjectId}</span>
        </span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--vmc-color-text-tertiary)" }}>
          screen: <span style={{ color: "var(--vmc-color-text-secondary)" }}>{stitchScreenId}</span>
        </span>
      </div>

      {/* ── Mode label ───────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            padding: "3px 8px",
            borderRadius: 4,
            background: isDoneMode
              ? "oklch(0.55 0.18 145 / 15%)"
              : "oklch(0.22 0.18 285 / 10%)",
            color: isDoneMode
              ? "oklch(0.40 0.18 145)"
              : "oklch(0.22 0.18 285)",
          }}
        >
          {isDoneMode ? "✓ Figma MCP · tokens DS" : "Stitch pipeline"}
        </span>
      </div>

      {/* ── Viewport switcher ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--vmc-color-text-tertiary)", marginRight: 4 }}>
          viewport
        </span>
        {VIEWPORT_OPTIONS.map(function renderPill(opt) {
          const active = viewport === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={function handleClick() { handleViewport(opt.id); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 10px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                fontFamily: "monospace",
                background: active
                  ? "var(--vmc-color-background-brand)"
                  : "var(--vmc-color-background-secondary)",
                color: active
                  ? "var(--vmc-color-text-inverse)"
                  : "var(--vmc-color-text-secondary)",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              <span aria-hidden="true">{opt.icon}</span>
              {opt.label}
              {opt.id !== "desktop" && (
                <span style={{ opacity: 0.6, fontSize: 10 }}>px</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Component preview ─────────────────────────────────────────── */}
      <div
        style={{
          borderRadius: 8,
          border: "1px solid var(--vmc-color-border-default)",
          overflow: "hidden",
          background: "var(--vmc-color-background-primary)",
          /* scroll horizontal si el contenedor supera el panel de docs */
          overflowX: "auto",
        }}
      >
        {/* inner frame constrained to selected viewport */}
        <div
          style={{
            width: viewport === "desktop" ? 1024 : viewport === "tablet" ? 640 : 420,
            minWidth: viewport === "desktop" ? 1024 : viewport === "tablet" ? 640 : 420,
            margin: "0 auto",
            transition: "width 200ms ease",
          }}
        >
          {isDoneMode && hasDone ? doneChildren : null}
          {isDoneMode && !hasDone ? <DonePendingPlaceholder /> : null}
          {!isDoneMode ? children : null}
        </div>
      </div>

      {/* ── Import path ───────────────────────────────────────────────── */}
      <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--vmc-color-text-tertiary)", marginTop: 8, marginBottom: 0 }}>
        {importPath}
      </p>

      <style>{`
        .sc-btn:hover { opacity: 0.85; }
        .sc-btn-primary:hover { background: color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(1 0 0)) !important; }
        .sc-btn:focus-visible, .sc-btn-primary:focus-visible { outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
    </div>
  );
}

function StitchIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  );
}

function CopyIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function FigmaIcon(): JSX.Element {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z"/>
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z"/>
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z"/>
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"/>
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
    </svg>
  );
}
