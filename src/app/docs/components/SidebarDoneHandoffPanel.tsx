"use client";

/**
 * SidebarDoneHandoffPanel
 * Panel de especificaciones y código de handoff para SidebarDone.
 * Mismo patrón que FooterDoneHandoffPanel.
 */

import { useState } from "react";
import type { JSX } from "react";
import { CodeBlock, SectionHeading, SourceSection } from "./ComponentHandoffShared";
import type { CopyKey } from "./ComponentHandoffShared";

// ---------------------------------------------------------------------------
// Data — importación / uso
// ---------------------------------------------------------------------------

const IMPORT_A = `import SidebarDone from "@/features/Sidebar/SidebarDone";`;
const IMPORT_B = `import { SidebarDone } from "@/features/Sidebar";`;
const USAGE    = `// Sin props requeridas — contenido canónico hardcodeado\n<SidebarDone />`;
const LAYOUT_CODE = `// app/(main)/layout.tsx
import type { ReactNode } from "react";
import SidebarDone from "@/features/Sidebar/SidebarDone";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarDone />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* <Header /> */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}`;

// ---------------------------------------------------------------------------
// Data — árbol HTML semántico
// ---------------------------------------------------------------------------

const HTML_TREE = `<aside aria-label="Navegación principal">      bg: --vmc-color-background-brand
│                                               width: 256px · height: auto
│
├─ <style>                                      .sidebar-done-link (hover/focus)
│
├─ <div>                                        Brand area · height: 64px
│   ├─ <svg aria-label="Menú">                  Hamburger 18×12 · rgba(255,255,255,0.80)
│   └─ <div>                                    Brand text column
│       ├─ <span>                               "VMC Subastas" · 14px/700 · uppercase
│       └─ <span>                               "powered by SUBASTOP.Co" · 8px · 40% white
│
└─ <nav aria-label="Menú principal">            paddingTop/Bottom: 20px · px: 12px
    │
    ├─ <div role="list">                        Main nav group · gap: 4px
    │   ├─ <div role="listitem">                "Hoy" — ACTIVE
    │   │   │                                   bg: rgba(255,255,255,0.10)
    │   │   │                                   border-left: 3px solid --vmc-color-status-negotiable
    │   │   ├─ <svg>                            Calendar icon 18×18
    │   │   ├─ <span>                           "Hoy" · 12px/600
    │   │   └─ <svg>                            Chevron right 7×12 · 25% white
    │   ├─ <div role="listitem">                "Tipo de oferta"
    │   ├─ <div role="listitem">                "Categorías"
    │   └─ <div role="listitem">                "Empresas"
    │
    └─ <div>                                    Soporte section · marginTop: 20px
        ├─ <span>                               "Soporte" label · 12px/700 · 40% white
        └─ <div role="list">
            └─ <div role="listitem">            "Centro de ayuda"`;

// ---------------------------------------------------------------------------
// Data — contenido canónico
// ---------------------------------------------------------------------------

interface NavItem { section: string; label: string; active?: boolean; }

const NAV_ITEMS: NavItem[] = [
  { section: "Principal", label: "Hoy",             active: true },
  { section: "Principal", label: "Tipo de oferta" },
  { section: "Principal", label: "Categorías" },
  { section: "Principal", label: "Empresas" },
  { section: "Soporte",   label: "Centro de ayuda" },
];

// ---------------------------------------------------------------------------
// Data — tokens / dimensiones / QA
// ---------------------------------------------------------------------------

const COLOR_TOKENS = [
  { zone: "Fondo aside",           token: "var(--vmc-color-background-brand)" },
  { zone: "Item activo — fondo",   token: "rgba(255,255,255,0.10)" },
  { zone: "Item activo — borde",   token: "var(--vmc-color-status-negotiable, #00cace) · 3px left" },
  { zone: "Item hover",            token: "rgba(255,255,255,0.05)" },
  { zone: "Texto item",            token: "var(--vmc-color-text-inverse)" },
  { zone: "Ícono item",            token: "rgba(255,255,255,0.80)" },
  { zone: "Chevron",               token: "rgba(255,255,255,0.25)" },
  { zone: "Label sección",         token: "var(--vmc-color-text-on-dark-subtle)" },
  { zone: "Brand subtitle",        token: "var(--vmc-color-text-on-dark-subtle)" },
  { zone: "Focus ring",            token: "var(--vmc-color-border-focus)" },
];

const DIMS = [
  { prop: "width",             value: "256px" },
  { prop: "brand-area height", value: "64px" },
  { prop: "nav item height",   value: "40px" },
  { prop: "nav item gap",      value: "4px" },
  { prop: "section gap",       value: "20px (Soporte)" },
  { prop: "padding x (nav)",   value: "12px (container) + 20px (items)" },
  { prop: "active border",     value: "3px left · negotiable cyan" },
  { prop: "font size items",   value: "12px / weight 600" },
  { prop: "font family",       value: "Plus Jakarta Sans" },
  { prop: "icon size",         value: "18×18px · strokeWidth 1.8" },
];

const QA = [
  "Fondo vault #22005C visible (var(--vmc-color-background-brand))",
  'Item "Hoy" tiene border-left 3px cyan + fondo rgba(255,255,255,0.10)',
  "Hover en items cambia fondo a rgba(255,255,255,0.05)",
  "Focus ring visible al navegar con teclado",
  "Label «Soporte» separada del grupo principal con 20px de margen",
  "Font Plus Jakarta Sans SemiBold 12px en todos los items",
  "Iconos 18×18px con opacidad 80% blanco",
  "Chevrones 25% blanco alineados a la derecha",
  "Sin HEX hardcodeados en el código (solo var(--token))",
  "Width fijo 256px — no se estira",
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function SidebarDoneHandoffPanel(): JSX.Element {
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
      <button
        type="button"
        onClick={handleToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", gap: 8 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "var(--vmc-color-text-primary)" }}>Spec & Handoff — SidebarDone</span>
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
                <CodeBlock id="sb-import-a" code={IMPORT_A} copyKey="sb-import-a" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>Opción B — barrel</p>
                <CodeBlock id="sb-import-b" code={IMPORT_B} copyKey="sb-import-b" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
            </div>
          </div>

          {/* 2. Uso */}
          <div>
            <SectionHeading>Uso</SectionHeading>
            <CodeBlock id="sb-usage" code={USAGE} copyKey="sb-usage" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 3. Contexto de layout */}
          <div>
            <SectionHeading>Contexto de layout</SectionHeading>
            <CodeBlock id="sb-layout" code={LAYOUT_CODE} copyKey="sb-layout" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 4. Código fuente completo */}
          <SourceSection
            component="sidebar"
            filename="SidebarDone.tsx"
            destPath="src/features/Sidebar/SidebarDone.tsx"
          />

          {/* 5. Árbol HTML semántico */}
          <div>
            <SectionHeading>Árbol HTML semántico</SectionHeading>
            <CodeBlock id="sb-html-tree" code={HTML_TREE} copyKey="sb-html-tree" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 6. Contenido canónico */}
          <div>
            <SectionHeading>Contenido canónico — nav items</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Sección", "Label", "Estado"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {NAV_ITEMS.map(function renderItem(r) {
                  return (
                    <tr key={r.label}>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" as const }}>{r.section}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-primary)", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.label}</td>
                      <td style={{ padding: "4px 8px", color: r.active ? "oklch(0.40 0.18 145)" : "var(--vmc-color-text-tertiary)", fontSize: 10, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>
                        {r.active ? "✓ activo" : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 7. Tokens de color */}
          <div>
            <SectionHeading>Tokens de color</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Zona", "Token"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COLOR_TOKENS.map(function renderToken(r) {
                  return (
                    <tr key={r.zone}>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-secondary)", borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" as const }}>{r.zone}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", wordBreak: "break-all" as const }}>{r.token}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 8. Dimensiones */}
          <div>
            <SectionHeading>Dimensiones & espaciado</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Propiedad", "Valor"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {DIMS.map(function renderDim(r) {
                  return (
                    <tr key={r.prop}>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, fontFamily: "monospace", borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" as const }}>{r.prop}</td>
                      <td style={{ padding: "4px 8px", color: "var(--vmc-color-text-primary)", borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 9. QA checklist */}
          <div>
            <SectionHeading>QA checklist</SectionHeading>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {QA.map(function renderQA(item) {
                return (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11, color: "var(--vmc-color-text-secondary)" }}>
                    <span style={{ color: "oklch(0.55 0.18 145)", flexShrink: 0, marginTop: 1 }}>□</span>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
