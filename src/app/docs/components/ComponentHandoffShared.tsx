"use client";

/**
 * ComponentHandoffShared
 *
 * Componentes reutilizables para HandoffPanels.
 * Importar desde aquí en vez de duplicar en cada panel.
 *
 * Exports:
 *   CodeBlock       — bloque de código copiable
 *   SectionHeading  — encabezado de sección uppercase monospace
 *   SourceSection   — fetcha el source del componente via /api/source/[component]
 *                     Evita embeber cientos de líneas como string en cada panel.
 */

import { useEffect, useState } from "react";
import type { JSX } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CopyKey = string;

// ---------------------------------------------------------------------------
// CodeBlock
// ---------------------------------------------------------------------------

export function CodeBlock({ id, code, copyKey, onCopy, copiedKey }: {
  id: string;
  code: string;
  copyKey: CopyKey;
  onCopy: (key: CopyKey, text: string) => void;
  copiedKey: CopyKey | null;
}): JSX.Element {
  const copied = copiedKey === copyKey;
  return (
    <div style={{ position: "relative" }}>
      <pre
        id={id}
        style={{
          margin: 0,
          padding: "12px 14px",
          paddingRight: 72,
          borderRadius: 6,
          background: "var(--vmc-color-background-brand)",
          color: "var(--vmc-color-text-on-dark-muted)",
          fontSize: 12,
          lineHeight: "20px",
          fontFamily: "monospace",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {code}
      </pre>
      <button
        type="button"
        onClick={function handleClick() { onCopy(copyKey, code); }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "monospace",
          padding: "3px 10px",
          borderRadius: 4,
          border: "none",
          cursor: "pointer",
          background: copied ? "oklch(0.55 0.18 145)" : "var(--vmc-color-text-inverse)",
          color: copied ? "var(--vmc-color-text-inverse)" : "var(--vmc-color-background-brand)",
          transition: "background 150ms ease",
        }}
      >
        {copied ? "✓ copiado" : "copiar"}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionHeading
// ---------------------------------------------------------------------------

export function SectionHeading({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontSize: 10,
      fontWeight: 700,
      fontFamily: "monospace",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--vmc-color-text-tertiary)",
      margin: "0 0 8px",
    }}>
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// SourceSection
// Fetcha el código fuente via /api/source/[component] en lugar de embeber
// cientos de líneas como string en el bundle del panel.
// ---------------------------------------------------------------------------

type SourceState = "idle" | "loading" | "ready" | "error";

interface SourceSectionProps {
  /** ID del componente — debe estar en el COMPONENT_MAP de /api/source/[component]/route.ts */
  component: string;
  /** Nombre de archivo para mostrar en el encabezado, ej: "FooterDone.tsx" */
  filename: string;
  /** Ruta de destino para el frontend, ej: "src/features/Footer/FooterDone.tsx" */
  destPath: string;
}

export function SourceSection({ component, filename, destPath }: SourceSectionProps): JSX.Element {
  const [state, setState] = useState<SourceState>("idle");
  const [source, setSource] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(function fetchSource() {
    setState("loading");
    void fetch(`/api/source/${component}`)
      .then(function checkOk(r: Response) {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(function setReady(text: string) {
        setSource(text);
        setState("ready");
      })
      .catch(function setErr() {
        setState("error");
      });
  }, [component]);

  function handleCopy(): void {
    void navigator.clipboard.writeText(source).then(function onCopied() {
      setCopied(true);
      setTimeout(function reset() { setCopied(false); }, 2000);
    });
  }

  return (
    <div>
      <SectionHeading>{`Código fuente completo — ${filename}`}</SectionHeading>
      <p style={{ fontSize: 11, color: "var(--vmc-color-text-secondary)", margin: "0 0 8px", lineHeight: "18px" }}>
        Copia el archivo a{" "}
        <code style={{ fontFamily: "monospace", fontSize: 11, color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>
          {destPath}
        </code>{" "}
        en tu repo. Sin dependencias externas — solo{" "}
        <code style={{ fontFamily: "monospace", fontSize: 11 }}>next/image</code> y{" "}
        <code style={{ fontFamily: "monospace", fontSize: 11 }}>next/link</code>.
      </p>

      {state === "idle" && null}

      {state === "loading" && (
        <div style={{
          padding: "16px 14px",
          borderRadius: 6,
          background: "var(--vmc-color-background-brand)",
          color: "var(--vmc-color-text-on-dark-muted)",
          fontSize: 12,
          fontFamily: "monospace",
        }}>
          Cargando fuente…
        </div>
      )}

      {state === "error" && (
        <div style={{
          padding: "12px 14px",
          borderRadius: 6,
          background: "oklch(0.42 0.20 20 / 10%)",
          color: "oklch(0.42 0.20 20)",
          fontSize: 12,
          fontFamily: "monospace",
        }}>
          Error al cargar el fuente. Verifica que el servidor esté corriendo.
        </div>
      )}

      {state === "ready" && (
        <div style={{ position: "relative" }}>
          <pre style={{
            margin: 0,
            padding: "12px 14px",
            paddingRight: 72,
            borderRadius: 6,
            background: "var(--vmc-color-background-brand)",
            color: "var(--vmc-color-text-on-dark-muted)",
            fontSize: 11,
            lineHeight: "18px",
            fontFamily: "monospace",
            overflowX: "auto",
            whiteSpace: "pre",
            maxHeight: 400,
            overflowY: "auto",
          }}>
            {source}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "monospace",
              padding: "3px 10px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              background: copied ? "oklch(0.55 0.18 145)" : "var(--vmc-color-text-inverse)",
              color: copied ? "var(--vmc-color-text-inverse)" : "var(--vmc-color-background-brand)",
              transition: "background 150ms ease",
            }}
          >
            {copied ? "✓ copiado" : "copiar todo"}
          </button>
        </div>
      )}
    </div>
  );
}
