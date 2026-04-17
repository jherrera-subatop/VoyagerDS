"use client";

/**
 * FooterDoneHandoffPanel
 * Panel de especificaciones y código de handoff para FooterDone.
 * Visible siempre en /docs/componentes — referencia para el equipo frontend.
 */

import { useRef, useState } from "react";
import type { ChangeEvent, JSX } from "react";
import { useFooterImages } from "./FooterImageContext";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CopyKey = string;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const IMPORT_A = `import FooterDone from "@/features/Footer/FooterDone";`;
const IMPORT_B = `import { FooterDone } from "@/features/Footer";`;
const USAGE    = `// Sin props — contenido canónico hardcodeado\n<FooterDone />`;
const SWAP     = `// Antes\nimport Footer from "@/features/Footer/Footer";\n<Footer />\n\n// Después\nimport FooterDone from "@/features/Footer/FooterDone";\n<FooterDone />`;

// Código de integración completo en layout de Next.js
const LAYOUT_CODE = `// app/(main)/layout.tsx  — o donde viva tu layout principal
import type { ReactNode } from "react";
import FooterDone from "@/features/Footer/FooterDone";
// import Header from "@/features/Header/Header"; // cuando esté listo

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* <Header /> */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <FooterDone />
    </div>
  );
}`;

// Código del componente completo (para copiar al repo de producción)
const COMPONENT_CODE = `/**
 * FooterDone.tsx — copiar a src/features/Footer/FooterDone.tsx
 * Requiere: next/image, next/link
 * Requiere: tokens CSS  → ver sección "Tokens de color"
 * Requiere: imágenes    → ver sección "Imágenes requeridas"
 */

// ↓ Copiar el archivo completo desde:
// src/features/Footer/FooterDone.tsx  (este repo — VoyagerDS)`;

const TOKENS_SETUP = `/* globals.css o tokens.css — el equipo de DS provee este archivo */
/* Tokens mínimos que FooterDone consume:                           */

:root {
  --vmc-color-background-brand:       oklch(0.22 0.18 285);
  --vmc-color-text-on-dark-muted:     oklch(1 0 0 / 60%);
  --vmc-color-text-on-dark-subtle:    oklch(1 0 0 / 30%);
  --vmc-color-text-inverse:           oklch(1 0 0);
  --vmc-color-border-focus:           oklch(0.78 0.14 195);
}

/* En producción estos tokens provienen de Terrazzo (tokens.css compilado). */
/* NO copiarlos a mano — usar el archivo tokens.css del DS.                 */`;

const COLOR_TOKENS = [
  { zone: "Fondo principal",      token: "var(--vmc-color-background-brand)" },
  { zone: "Fondo bottom bar",     token: "color-mix(in oklch, …brand 85%, oklch(0 0 0))" },
  { zone: "Texto links",          token: "var(--vmc-color-text-on-dark-muted) (60%)" },
  { zone: "Headings de columna",  token: "var(--vmc-color-text-inverse) + opacity: 0.8" },
  { zone: "Copyright",            token: "var(--vmc-color-text-on-dark-subtle) + opacity: 0.75" },
  { zone: "Bullets separadores",  token: "var(--vmc-color-text-on-dark-subtle) + opacity: 0.5" },
  { zone: "Texto reclamaciones",  token: "var(--vmc-color-text-inverse)" },
  { zone: "Focus ring",           token: "var(--vmc-color-border-focus)" },
];

const BREAKPOINTS = [
  { bp: "mobile (420px)",   brand: "full width",    cols: "1 columna (stacked)" },
  { bp: "sm (640px)",       brand: "full width",    cols: "2 columnas" },
  { bp: "lg (1024px)",      brand: "192px fijo",    cols: "3 columnas lado a lado" },
];

const IMAGES = [
  { path: "/public/images/vmc-logo-white.svg",       dims: "120 × 32",  desc: "Logo VMC blanco" },
  { path: "/public/images/libro-reclamaciones.png",  dims: "86 × 35",   desc: "Ícono libro (req. legal Perú)" },
];

const QA = [
  "Render correcto en mobile (<640px) — columna única",
  "Render correcto en tablet (640–1023px) — 2 cols nav",
  "Render correcto en desktop (≥1024px) — 4 cols (brand + 3 nav)",
  "Logo visible (imagen carga desde /public/images/vmc-logo-white.svg)",
  "Imagen Libro de Reclamaciones visible",
  "Hover en links cambia opacidad",
  "Focus ring visible al navegar con teclado",
  "Bottom bar más oscuro que el fondo principal",
  "Sin HEX hardcodeados en el código",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function CodeBlock({ id, code, copyKey, onCopy, copiedKey }: {
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
          background: copied
            ? "oklch(0.55 0.18 145)"
            : "var(--vmc-color-text-inverse)",
          color: copied
            ? "var(--vmc-color-text-inverse)"
            : "var(--vmc-color-background-brand)",
          transition: "background 150ms ease",
        }}
      >
        {copied ? "✓ copiado" : "copiar"}
      </button>
    </div>
  );
}

function SectionHeading({ children }: { children: string }): JSX.Element {
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
// Image asset upload/download row
// ---------------------------------------------------------------------------

interface ImageAssetRowProps {
  label:     string;
  path:      string;
  dims:      string;
  filename:  string;
  current:   string | undefined;
  onUpload:  (dataUrl: string) => void;
  onClear:   () => void;
}

function ImageAssetRow({ label, path, dims, filename, current, onUpload, onClear }: ImageAssetRowProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasUpload = current !== undefined;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function onLoad(ev) {
      const result = ev.target?.result;
      if (typeof result === "string") onUpload(result);
    };
    reader.readAsDataURL(file);
    // reset input so same file can be re-uploaded
    e.target.value = "";
  }

  function handleUploadClick(): void {
    inputRef.current?.click();
  }

  function handleDownload(): void {
    if (!current) return;
    const a = document.createElement("a");
    a.href = current;
    a.download = filename;
    a.click();
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: 6,
        background: hasUpload
          ? "oklch(0.55 0.18 145 / 8%)"
          : "var(--vmc-color-background-primary)",
        border: hasUpload
          ? "1px solid oklch(0.55 0.18 145 / 30%)"
          : "1px solid var(--vmc-color-border-subtle)",
        flexWrap: "wrap",
      }}
    >
      {/* Preview thumbnail */}
      {hasUpload && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={label}
          style={{ height: 28, width: "auto", objectFit: "contain", flexShrink: 0, borderRadius: 2 }}
        />
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <code style={{ fontSize: 11, color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", wordBreak: "break-all" }}>
            {path}
          </code>
          <span style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", whiteSpace: "nowrap" }}>
            {dims}
          </span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--vmc-color-text-secondary)" }}>
          {label}
          {hasUpload && (
            <span style={{ marginLeft: 6, color: "oklch(0.40 0.18 145)", fontSize: 10, fontWeight: 700 }}>
              ✓ subida
            </span>
          )}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.svg"
          style={{ display: "none" }}
          onChange={handleFileChange}
          aria-label={`Subir ${label}`}
        />
        <button
          type="button"
          onClick={handleUploadClick}
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "monospace",
            padding: "3px 10px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            background: "var(--vmc-color-background-brand)",
            color: "var(--vmc-color-text-inverse)",
          }}
        >
          {hasUpload ? "↑ reemplazar" : "↑ subir"}
        </button>
        {hasUpload && (
          <>
            <button
              type="button"
              onClick={handleDownload}
              title={`Descargar como ${filename}`}
              style={{
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "monospace",
                padding: "3px 10px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: "var(--vmc-color-background-secondary)",
                color: "var(--vmc-color-text-secondary)",
              }}
            >
              ↓ descargar
            </button>
            <button
              type="button"
              onClick={onClear}
              title="Eliminar imagen subida"
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                padding: "3px 8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: "transparent",
                color: "var(--vmc-color-text-tertiary)",
              }}
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ImageAssetsSection(): JSX.Element {
  const { logoSrc, reclamacionesSrc, setLogoSrc, setReclamacionesSrc, clearLogoSrc, clearReclamacionesSrc } = useFooterImages();

  return (
    <div>
      <SectionHeading>Imágenes requeridas (public/)</SectionHeading>
      <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "0 0 8px", lineHeight: "18px" }}>
        Sube la imagen → el preview de DONE se actualiza al instante. Descárgala con el nombre canónico para copiarla a <code style={{ fontFamily: "monospace", fontSize: 11 }}>public/images/</code> en tu repo.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <ImageAssetRow
          label="Logo VMC blanco"
          path="/public/images/vmc-logo-white.svg"
          dims="120 × 32"
          filename="vmc-logo-white.svg"
          current={logoSrc}
          onUpload={setLogoSrc}
          onClear={clearLogoSrc}
        />
        <ImageAssetRow
          label="Ícono libro (req. legal Perú)"
          path="/public/images/libro-reclamaciones.png"
          dims="86 × 35"
          filename="libro-reclamaciones.png"
          current={reclamacionesSrc}
          onUpload={setReclamacionesSrc}
          onClear={clearReclamacionesSrc}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function FooterDoneHandoffPanel(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);

  function handleCopy(key: CopyKey, text: string): void {
    void navigator.clipboard.writeText(text).then(function onCopied() {
      setCopiedKey(key);
      setTimeout(function reset() { setCopiedKey(null); }, 2000);
    });
  }

  function handleToggle(): void {
    setOpen(function prev(p) { return !p; });
  }

  return (
    <div
      style={{
        marginTop: 8,
        borderRadius: 8,
        border: "1px solid var(--vmc-color-border-default)",
        background: "var(--vmc-color-background-secondary)",
        overflow: "hidden",
      }}
    >
      {/* ── Toggle header ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "monospace",
            color: "var(--vmc-color-text-primary)",
          }}>
            Spec & Handoff — FooterDone
          </span>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            fontFamily: "monospace",
            padding: "1px 7px",
            borderRadius: 4,
            background: "oklch(0.55 0.18 145 / 15%)",
            color: "oklch(0.40 0.18 145)",
          }}>
            ✓ done
          </span>
        </div>
        <span style={{
          fontSize: 11,
          color: "var(--vmc-color-text-tertiary)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 150ms ease",
          display: "inline-block",
        }}>
          ▼
        </span>
      </button>

      {/* ── Panel body ────────────────────────────────────────────────── */}
      {open && (
        <div style={{ padding: "0 16px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Divider */}
          <div style={{ height: 1, background: "var(--vmc-color-border-subtle)" }} />

          {/* ── Import ──────────────────────────────────────────────── */}
          <div>
            <SectionHeading>Importación</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>
                  Opción A — import directo
                </p>
                <CodeBlock id="import-a" code={IMPORT_A} copyKey="import-a" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>
                  Opción B — barrel
                </p>
                <CodeBlock id="import-b" code={IMPORT_B} copyKey="import-b" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
            </div>
          </div>

          {/* ── Uso ─────────────────────────────────────────────────── */}
          <div>
            <SectionHeading>Uso</SectionHeading>
            <CodeBlock id="usage" code={USAGE} copyKey="usage" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* ── Swap legacy ─────────────────────────────────────────── */}
          <div>
            <SectionHeading>Reemplazar Footer legacy en producción</SectionHeading>
            <CodeBlock id="swap" code={SWAP} copyKey="swap" onCopy={handleCopy} copiedKey={copiedKey} />
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", fontStyle: "italic" }}>
              Sin cambios en el layout padre — swap directo.
            </p>
          </div>

          {/* ── Layout responsivo ───────────────────────────────────── */}
          <div>
            <SectionHeading>Layout responsivo</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Breakpoint", "Brand", "Columnas nav"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {BREAKPOINTS.map(function renderRow(r) {
                  return (
                    <tr key={r.bp}>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-primary)", fontFamily: "monospace", fontSize: 11, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.bp}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontSize: 11, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.brand}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontSize: 11, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.cols}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Tokens de color ─────────────────────────────────────── */}
          <div>
            <SectionHeading>Tokens de color</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Zona", "Token DS"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COLOR_TOKENS.map(function renderRow(r) {
                  return (
                    <tr key={r.zone}>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontSize: 11, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.zone}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontSize: 11, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.token}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Imágenes requeridas ──────────────────────────────────── */}
          <ImageAssetsSection />

          {/* ── Integración en layout ───────────────────────────────── */}
          <div>
            <SectionHeading>Integración en layout (Next.js App Router)</SectionHeading>
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-secondary)", margin: "0 0 8px", lineHeight: "18px" }}>
              Agrega <code style={{ fontFamily: "monospace", fontSize: 11 }}>{`<FooterDone />`}</code> al final del layout que envuelve todas las páginas.
              El componente ocupa el ancho completo solo; no necesita wrapper extra.
            </p>
            <CodeBlock id="layout" code={LAYOUT_CODE} copyKey="layout" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* ── Código del componente ────────────────────────────────── */}
          <div>
            <SectionHeading>Dónde está el código fuente</SectionHeading>
            <CodeBlock id="component" code={COMPONENT_CODE} copyKey="component" onCopy={handleCopy} copiedKey={copiedKey} />
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", lineHeight: "18px" }}>
              Copiar el archivo completo{" "}
              <code style={{ fontFamily: "monospace", fontSize: 11, color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>
                src/features/Footer/FooterDone.tsx
              </code>{" "}
              de este repo al mismo path en el repo de producción. Sin dependencias externas — solo <code style={{ fontFamily: "monospace", fontSize: 11 }}>next/image</code> y <code style={{ fontFamily: "monospace", fontSize: 11 }}>next/link</code>.
            </p>
          </div>

          {/* ── Tokens CSS requeridos ────────────────────────────────── */}
          <div>
            <SectionHeading>Tokens CSS requeridos</SectionHeading>
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-secondary)", margin: "0 0 8px", lineHeight: "18px" }}>
              El componente consume tokens <code style={{ fontFamily: "monospace", fontSize: 11 }}>--vmc-color-*</code>.
              En producción provienen del archivo <code style={{ fontFamily: "monospace", fontSize: 11 }}>tokens.css</code> compilado por Terrazzo.
              Si aún no está integrado, usar estos valores mínimos:
            </p>
            <CodeBlock id="tokens" code={TOKENS_SETUP} copyKey="tokens" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* ── QA Checklist ────────────────────────────────────────── */}
          <div>
            <SectionHeading>QA checklist antes de merge</SectionHeading>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {QA.map(function renderItem(item) {
                return (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11, color: "var(--vmc-color-text-secondary)", lineHeight: "18px" }}>
                    <span style={{ color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", flexShrink: 0 }}>☐</span>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Spec file reference ─────────────────────────────────── */}
          <div style={{ paddingTop: 4, borderTop: "1px solid var(--vmc-color-border-subtle)" }}>
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: 0, fontFamily: "monospace" }}>
              Spec completa:{" "}
              <span style={{ color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>
                src/features/Footer/FOOTER_DONE_SPEC.md
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
