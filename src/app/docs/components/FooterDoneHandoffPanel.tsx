"use client";

/**
 * FooterDoneHandoffPanel
 * Panel de especificaciones y código de handoff para FooterDone.
 * Contiene TODO lo necesario para maquetar desde cero sin acceso al repo.
 *
 * El código fuente del componente se carga via /api/source/footer (no embebido).
 * Esto mantiene este archivo liviano y la fuente siempre actualizada.
 */

import { useRef, useState } from "react";
import type { ChangeEvent, JSX } from "react";
import { useFooterImages } from "./FooterImageContext";
import { CodeBlock, SectionHeading, SourceSection } from "./ComponentHandoffShared";
import type { CopyKey } from "./ComponentHandoffShared";

// ---------------------------------------------------------------------------
// Data — importación / uso
// ---------------------------------------------------------------------------

const IMPORT_A = `import FooterDone from "@/features/Footer/FooterDone";`;
const IMPORT_B = `import { FooterDone } from "@/features/Footer";`;
const USAGE    = `// Sin props — contenido canónico hardcodeado\n<FooterDone />`;
const SWAP     = `// Antes\nimport Footer from "@/features/Footer/Footer";\n<Footer />\n\n// Después\nimport FooterDone from "@/features/Footer/FooterDone";\n<FooterDone />`;

const LAYOUT_CODE = `// app/(main)/layout.tsx  — o donde viva tu layout principal
import type { ReactNode } from "react";
import FooterDone from "@/features/Footer/FooterDone";

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

const TOKENS_SETUP = `/* globals.css o tokens.css — el equipo de DS provee este archivo */
:root {
  --vmc-color-background-brand:       oklch(0.22 0.18 285);
  --vmc-color-text-on-dark-muted:     oklch(1 0 0 / 60%);
  --vmc-color-text-on-dark-subtle:    oklch(1 0 0 / 30%);
  --vmc-color-text-inverse:           oklch(1 0 0);
  --vmc-color-text-primary:           oklch(0.15 0.008 200);
  --vmc-color-border-focus:           oklch(0.78 0.14 195);
}
/* En producción provienen de tokens.css (Terrazzo). NO copiar a mano. */`;

// ---------------------------------------------------------------------------
// Data — árbol HTML semántico
// ---------------------------------------------------------------------------

const HTML_TREE = `<footer>                              bg: --vmc-color-background-brand
│                                      container-type: inline-size (fd)
├─ <style>                             .fd-link .fd-social .fd-reclamaciones
│                                      @container fd (640px | 1024px)
│
├─ <div>                               maxWidth: 1024px — top section
│   └─ <div class="fd-top-inner">      flex-col → flex-row @ ≥1024px
│       │
│       ├─ <div class="fd-brand-col">  w-100% → w-192px @ ≥1024px
│       │   ├─ <img>                   alt="VMC Subastas" 120×32
│       │   │                          src="/images/vmc-logo-white.png"
│       │   └─ <p>                     "Ecosistema digital de subastas…"
│       │
│       └─ <div class="fd-nav-grid">   1 col → 2 cols @640 → 3 cols @1024
│           │
│           ├─ <nav aria-label="Plataforma">
│           │   ├─ <p>                 "Plataforma" (heading)
│           │   └─ <ul>               6 × <li><Link href="…">…</Link></li>
│           │
│           ├─ <nav aria-label="Legal & Compliance">
│           │   ├─ <p>                 "Legal & Compliance" (heading)
│           │   └─ <ul>               4 × <li><Link href="…">…</Link></li>
│           │
│           └─ <div>                   ContactoColumn
│               ├─ <div>              — Contacto
│               │   ├─ <p>            "Contacto" (heading)
│               │   └─ <Link>         href="/contacto" "Contáctanos"
│               │
│               ├─ <div>              — Redes sociales
│               │   ├─ <p>            "Encuéntranos en" (heading)
│               │   └─ <nav aria-label="Redes sociales">
│               │       └─ <ul>       4 × <li>
│               │           └─ <a target="_blank" aria-label="Síguenos en …">
│               │               └─ <SocialIcon>  SVG inline 20×20
│               │              Facebook · Instagram · YouTube · X
│               │
│               └─ <a>                href="vmcsubastas.com/libro-de-reclamaciones"
│                   ├─ <img>          alt="Libro de Reclamaciones" 86×35
│                   └─ <span>         "Libros de reclamaciones"
│
└─ <div>                               BottomBar
    │                                  bg: color-mix(brand 85%, --vmc-color-text-primary)
    └─ <div class="fd-bottom-inner">   flex-col → flex-row @640 · maxWidth 1024px
        ├─ <p>                         "© 2026 VMC Subastas…" (copyright)
        └─ <nav aria-label="Links de pie de página">
            └─ <ul>                    3 × <li>
                ├─ <span aria-hidden>  "•" separator
                └─ <Link>             Política de Cookies · Mapa del Sitio · Accesibilidad`;

// ---------------------------------------------------------------------------
// Data — contenido canónico
// ---------------------------------------------------------------------------

interface ContentLink { section: string; label: string; href: string; note?: string; }
interface ContentText { key: string; value: string; }

const CONTENT_LINKS: ContentLink[] = [
  { section: "Plataforma", label: "SubasCars",                                        href: "https://subascars.com",                              note: "externo" },
  { section: "Plataforma", label: "SubasBlog",                                        href: "/blog" },
  { section: "Plataforma", label: "¿Quiénes somos?",                                  href: "/quienes-somos" },
  { section: "Plataforma", label: "¿Cómo vender?",                                    href: "/como-vender" },
  { section: "Plataforma", label: "¿Cómo obtener acceso ilimitado a las subastas?",   href: "/subaspass" },
  { section: "Plataforma", label: "BlackSheep Nation",                                href: "/blacksheep-nation" },
  { section: "Legal",      label: "Condiciones y Términos",                           href: "/condiciones" },
  { section: "Legal",      label: "Política de Protección de Datos Personales",       href: "/politica-proteccion-datos" },
  { section: "Legal",      label: "Política de privacidad General",                   href: "/politica-privacidad" },
  { section: "Legal",      label: "Testimonios",                                      href: "/testimonios" },
  { section: "Contacto",   label: "Contáctanos",                                      href: "/contacto" },
  { section: "Social",     label: "Facebook",  href: "https://facebook.com/vmcsubastas",  note: "externo" },
  { section: "Social",     label: "Instagram", href: "https://instagram.com/vmcsubastas", note: "externo" },
  { section: "Social",     label: "YouTube",   href: "https://youtube.com/vmcsubastas",   note: "externo" },
  { section: "Social",     label: "X",         href: "https://x.com/vmcsubastas",         note: "externo" },
  { section: "Legal",      label: "Libro de Reclamaciones", href: "https://www.vmcsubastas.com/libro-de-reclamaciones", note: "externo · req. legal Perú" },
  { section: "Bottom",     label: "Política de Cookies",    href: "/politica-cookies" },
  { section: "Bottom",     label: "Mapa del Sitio",         href: "/mapa-del-sitio" },
  { section: "Bottom",     label: "Accesibilidad",          href: "/accesibilidad" },
];

const CONTENT_TEXTS: ContentText[] = [
  { key: "Brand description", value: "Ecosistema digital de subastas de autos basado en comunidad y tecnología." },
  { key: "Copyright",         value: "© 2026 VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos reservados." },
  { key: "Col heading 1",     value: "Plataforma" },
  { key: "Col heading 2",     value: "Legal & Compliance" },
  { key: "Col heading 3",     value: "Contacto" },
  { key: "Col heading 4",     value: "Encuéntranos en" },
  { key: "Reclamaciones",     value: "Libros de reclamaciones" },
  { key: "Logo alt",          value: "VMC Subastas" },
  { key: "Libro alt",         value: "Libro de Reclamaciones" },
];

// ---------------------------------------------------------------------------
// Data — tokens / breakpoints / QA
// ---------------------------------------------------------------------------

const COLOR_TOKENS = [
  { zone: "Fondo principal",      token: "var(--vmc-color-background-brand)" },
  { zone: "Fondo bottom bar",     token: "color-mix(in oklch, …brand 85%, --vmc-color-text-primary)" },
  { zone: "Texto links",          token: "var(--vmc-color-text-on-dark-muted) (60%)" },
  { zone: "Headings de columna",  token: "var(--vmc-color-text-inverse) + opacity: 0.8" },
  { zone: "Copyright",            token: "var(--vmc-color-text-on-dark-subtle) + opacity: 0.75" },
  { zone: "Bullets separadores",  token: "var(--vmc-color-text-on-dark-subtle) + opacity: 0.5" },
  { zone: "Texto reclamaciones",  token: "var(--vmc-color-text-inverse)" },
  { zone: "Focus ring",           token: "var(--vmc-color-border-focus)" },
];

const BREAKPOINTS = [
  { bp: "mobile (420px)",  brand: "full width",    cols: "1 columna (stacked)" },
  { bp: "sm (640px)",      brand: "full width",    cols: "2 columnas" },
  { bp: "lg (1024px)",     brand: "192px fijo",    cols: "3 columnas lado a lado" },
];

const QA = [
  "Render correcto en mobile (<640px) — columna única",
  "Render correcto en tablet (640–1023px) — 2 cols nav",
  "Render correcto en desktop (≥1024px) — 4 cols (brand + 3 nav)",
  "Logo visible (imagen carga desde /images/vmc-logo-white.png)",
  "Imagen Libro de Reclamaciones visible",
  "Hover en links cambia opacidad",
  "Focus ring visible al navegar con teclado",
  "Bottom bar más oscuro que el fondo principal",
  "Sin HEX hardcodeados en el código",
];

// ---------------------------------------------------------------------------
// Image asset upload/download row
// ---------------------------------------------------------------------------

interface ImageAssetRowProps {
  label:        string;
  publicPath:   string;
  repoPath:     string;
  dims:         string;
  filename:     string;
  current:      string | undefined;
  onUpload:     (dataUrl: string) => void;
  onClear:      () => void;
}

function ImageAssetRow({ label, publicPath, repoPath, dims, filename, current, onUpload, onClear }: ImageAssetRowProps): JSX.Element {
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
    e.target.value = "";
  }

  function handleUploadClick(): void { inputRef.current?.click(); }

  function handleDownloadUploaded(): void {
    if (!current) return;
    const a = document.createElement("a");
    a.href = current;
    a.download = filename;
    a.click();
  }

  function handleDownloadFromRepo(): void {
    void fetch(publicPath)
      .then(function onFetched(r: Response) { return r.blob(); })
      .then(function onBlob(blob: Blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  return (
    <div style={{
      borderRadius: 6,
      background: hasUpload ? "oklch(0.55 0.18 145 / 8%)" : "var(--vmc-color-background-primary)",
      border: hasUpload ? "1px solid oklch(0.55 0.18 145 / 30%)" : "1px solid var(--vmc-color-border-subtle)",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", flexWrap: "wrap" }}>
        {hasUpload && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt={label} style={{ height: 28, width: "auto", objectFit: "contain", flexShrink: 0, borderRadius: 2 }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <code style={{ fontSize: 11, color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", wordBreak: "break-all" }}>{repoPath}</code>
            <span style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", whiteSpace: "nowrap" }}>{dims}</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--vmc-color-text-secondary)" }}>
            {label}
            {hasUpload && <span style={{ marginLeft: 6, color: "oklch(0.40 0.18 145)", fontSize: 10, fontWeight: 700 }}>✓ subida</span>}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <input ref={inputRef} type="file" accept="image/*,.svg" style={{ display: "none" }} onChange={handleFileChange} aria-label={`Subir ${label}`} />
          <button type="button" onClick={handleUploadClick} style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 4, border: "none", cursor: "pointer", background: "var(--vmc-color-background-brand)", color: "var(--vmc-color-text-inverse)" }}>
            {hasUpload ? "↑ reemplazar" : "↑ subir"}
          </button>
          {hasUpload && (
            <>
              <button type="button" onClick={handleDownloadUploaded} title={`Descargar como ${filename}`} style={{ fontSize: 11, fontWeight: 600, fontFamily: "monospace", padding: "3px 10px", borderRadius: 4, border: "none", cursor: "pointer", background: "var(--vmc-color-background-secondary)", color: "var(--vmc-color-text-secondary)" }}>
                ↓ subida
              </button>
              <button type="button" onClick={onClear} style={{ fontSize: 11, fontFamily: "monospace", padding: "3px 8px", borderRadius: 4, border: "none", cursor: "pointer", background: "transparent", color: "var(--vmc-color-text-tertiary)" }}>✕</button>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "6px 12px", background: "var(--vmc-color-background-secondary, oklch(0.97 0.002 285))", borderTop: "1px solid var(--vmc-color-border-subtle)" }}>
        <span style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace" }}>
          del repo → <code style={{ color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>{publicPath}</code>
        </span>
        <button type="button" onClick={handleDownloadFromRepo} style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", padding: "2px 10px", borderRadius: 4, border: "none", cursor: "pointer", background: "oklch(0.30 0.20 285)", color: "var(--vmc-color-text-inverse)", whiteSpace: "nowrap", flexShrink: 0 }}>
          ↓ descargar del repo
        </button>
      </div>
    </div>
  );
}

function ImageAssetsSection(): JSX.Element {
  const { logoSrc, reclamacionesSrc, setLogoSrc, setReclamacionesSrc, clearLogoSrc, clearReclamacionesSrc } = useFooterImages();
  return (
    <div>
      <SectionHeading>Imágenes requeridas (public/images/)</SectionHeading>
      <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "0 0 8px", lineHeight: "18px" }}>
        Botón azul → descarga del repo. Botón morado → sube para preview.
        Copiar a <code style={{ fontFamily: "monospace", fontSize: 11 }}>public/images/</code> en producción.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <ImageAssetRow label="Logo VMC blanco" publicPath="/images/vmc-logo-white.png" repoPath="public/images/vmc-logo-white.png" dims="120 × 32" filename="vmc-logo-white.png" current={logoSrc} onUpload={setLogoSrc} onClear={clearLogoSrc} />
        <ImageAssetRow label="Ícono libro (req. legal Perú)" publicPath="/images/libro-reclamaciones.png" repoPath="public/images/libro-reclamaciones.png" dims="86 × 35" filename="libro-reclamaciones.png" current={reclamacionesSrc} onUpload={setReclamacionesSrc} onClear={clearReclamacionesSrc} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function FooterDoneHandoffPanel(): JSX.Element {
  const [open, setOpen] = useState(true);
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
    <div style={{ marginTop: 8, borderRadius: 8, border: "1px solid var(--vmc-color-border-default)", background: "var(--vmc-color-background-secondary)", overflow: "hidden" }}>
      {/* ── Toggle header ─────────────────────────────────────────────── */}
      <button type="button" onClick={handleToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "var(--vmc-color-text-primary)" }}>Spec & Handoff — FooterDone</span>
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", padding: "1px 7px", borderRadius: 4, background: "oklch(0.55 0.18 145 / 15%)", color: "oklch(0.40 0.18 145)" }}>✓ done</span>
        </div>
        <span style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease", display: "inline-block" }}>▼</span>
      </button>

      {/* ── Panel body ────────────────────────────────────────────────── */}
      {open && (
        <div style={{ padding: "0 16px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ height: 1, background: "var(--vmc-color-border-subtle)" }} />

          {/* 1. Import */}
          <div>
            <SectionHeading>Importación</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>Opción A — import directo</p>
                <CodeBlock id="import-a" code={IMPORT_A} copyKey="import-a" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>Opción B — barrel</p>
                <CodeBlock id="import-b" code={IMPORT_B} copyKey="import-b" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
            </div>
          </div>

          {/* 2. Uso */}
          <div>
            <SectionHeading>Uso</SectionHeading>
            <CodeBlock id="usage" code={USAGE} copyKey="usage" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 3. Código fuente completo — via API, no embebido */}
          <SourceSection
            component="footer"
            filename="FooterDone.tsx"
            destPath="src/features/Footer/FooterDone.tsx"
          />

          {/* 4. Árbol HTML semántico */}
          <div>
            <SectionHeading>Árbol HTML semántico</SectionHeading>
            <CodeBlock id="html-tree" code={HTML_TREE} copyKey="html-tree" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 5. Contenido canónico */}
          <div>
            <SectionHeading>Contenido canónico — links</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Sección", "Label", "URL / href", "Nota"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {CONTENT_LINKS.map(function renderLink(r) {
                  return (
                    <tr key={`${r.section}-${r.label}`}>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.section}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-primary)", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.label}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", wordBreak: "break-all" }}>{r.href}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.note ?? ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--vmc-color-text-tertiary)", margin: "16px 0 8px" }}>Contenido canónico — textos</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Campo", "Valor"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {CONTENT_TEXTS.map(function renderText(r) {
                  return (
                    <tr key={r.key}>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.key}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-primary)", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 6. Swap legacy */}
          <div>
            <SectionHeading>Reemplazar Footer legacy en producción</SectionHeading>
            <CodeBlock id="swap" code={SWAP} copyKey="swap" onCopy={handleCopy} copiedKey={copiedKey} />
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", fontStyle: "italic" }}>Sin cambios en el layout padre — swap directo.</p>
          </div>

          {/* 7. Layout responsivo */}
          <div>
            <SectionHeading>Layout responsivo</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Breakpoint", "Brand", "Columnas nav"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>;
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
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", lineHeight: "18px" }}>
              Container queries (<code style={{ fontFamily: "monospace", fontSize: 11 }}>@container fd</code>) — responden al ancho del contenedor, no del viewport.
            </p>
          </div>

          {/* 8. Tokens de color */}
          <div>
            <SectionHeading>Tokens de color</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Zona", "Token DS"].map(function renderTh(h) {
                    return <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>;
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

          {/* 9. Imágenes requeridas */}
          <ImageAssetsSection />

          {/* 10. Integración en layout */}
          <div>
            <SectionHeading>Integración en layout (Next.js App Router)</SectionHeading>
            <CodeBlock id="layout" code={LAYOUT_CODE} copyKey="layout" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 11. Tokens CSS mínimos */}
          <div>
            <SectionHeading>Tokens CSS mínimos (si Terrazzo aún no está integrado)</SectionHeading>
            <CodeBlock id="tokens" code={TOKENS_SETUP} copyKey="tokens" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 12. QA Checklist */}
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

          {/* Footer */}
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
