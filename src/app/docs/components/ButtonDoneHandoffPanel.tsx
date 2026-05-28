"use client";

/**
 * ButtonDoneHandoffPanel
 * Panel de especificaciones y código de handoff para ButtonDone.
 * Generado por Concorde · source: /preview/components/pase1
 *
 * Cubre los 5 variantes del sistema: primary · secondary · ghost · sm-guest · sm-logged-in
 * El código fuente se carga via /api/source/button — no embebido en el bundle.
 */

import { useState } from "react";
import type { JSX } from "react";
import { CodeBlock, SectionHeading, SourceSection } from "./ComponentHandoffShared";
import type { CopyKey } from "./ComponentHandoffShared";

// ---------------------------------------------------------------------------
// Data — importación / uso
// ---------------------------------------------------------------------------

const IMPORT_A = `import ButtonDone from "@/features/Button/ButtonDone";`;
const IMPORT_B = `import { ButtonDone } from "@/features/Button";`;

const USAGE = `// Primary (default MD)
<ButtonDone variant="primary" onClick={handleClick}>
  Crear cuenta
</ButtonDone>

// Secondary MD
<ButtonDone variant="secondary" onClick={handleClick}>
  Ver más
</ButtonDone>

// Ghost — SIEMPRE sobre fondos oscuros/gradiente
<ButtonDone variant="ghost" onClick={handleClick}>
  Saber más
</ButtonDone>

// SM — guest (sin sesión)
<ButtonDone size="sm" icon={<UserIcon />} onClick={handleClick}>
  Ingresar
</ButtonDone>

// SM — logged-in (con sesión activa)
<ButtonDone size="sm" authState="logged-in" icon={<AvatarImg />} onClick={handleClick}>
  jherrera
</ButtonDone>

// Disabled
<ButtonDone variant="primary" disabled>
  No disponible
</ButtonDone>`;

const SWAP = `// ─── ANTES — Button legacy (src/components/ui/Button) ───────────────
import { Button } from "@/components/ui/Button";

<Button variant="primary" onClick={handleAction}>Crear cuenta</Button>
<Button variant="secondary" onClick={handleAction}>Ver más</Button>

// ─── DESPUÉS — ButtonDone (Concorde · src/features/Button/ButtonDone) ─
import ButtonDone from "@/features/Button/ButtonDone";

<ButtonDone variant="primary" onClick={handleAction}>Crear cuenta</ButtonDone>
<ButtonDone variant="secondary" onClick={handleAction}>Ver más</ButtonDone>

// ⚠️  Cambios de API al migrar:
// · "loading"           → no existe en ButtonDone (eliminar prop)
// · "variant=destructive"     → no existe en ButtonDone
// · "variant=secondary-live"  → no existe en ButtonDone
// · onClick es requerido en modo interactivo (no prop opcional en sm)`;

// ---------------------------------------------------------------------------
// Data — árbol HTML
// ---------------------------------------------------------------------------

const HTML_TREE = `/* ── Primary MD — .ccb-pvbtn ─────────────────────────────────────────── */
<button class="ccb-pvbtn" type="button">
│  height: 48px · padding: 0 56px · border-radius: 9999px
│  font: Plus Jakarta Sans 15px/600 · color: white
│  background-image: gradient(--vbtn-angle, stop-a, stop-b) [fill]
│                  + gradient(...) [border via background-clip]
│  transition: --vbtn-angle 0.4s · --vbtn-stop-a/b 0.35s · transform 0.2s
│
│  [::before] — shimmer overlay, rgba(white,17%) → transparent, z-index 1
│  [::after]  — glow layer, blur 14px, opacity 0→0.45 on hover, z-index -1
│
└─ {children}

/* ── Secondary MD — .ccb-psec ───────────────────────────────────────── */
<button class="ccb-psec" type="button">
│  Idéntica estructura a .ccb-pvbtn
│  Gradiente: vault-500 → vault-700 (purple range)
└─ {children}

/* ── Ghost MD — .ccb-pghost ─────────────────────────────────────────── */
<button class="ccb-pghost" type="button">
│  height: 48px · padding: 0 28px · background: transparent
│  border: 2px solid rgba(255,255,255,0.75)
│  hover: background white → text orange-600
└─ {children}

/* ── SM Guest — .ccb-pvbtn-sm ────────────────────────────────────────── */
<button class="ccb-pvbtn-sm" type="button">
│  height: 40px · padding: 0 16px 0 4px · gap: 8px
│  Mismo gradiente orange/vault que primary
├─ <span class="ccb-icon-slot-guest">   32×32px · bg rgba(white,20%) · border-radius 50%
│   └─ {icon}
└─ {children}                           label 14px/600

/* ── SM Logged-in — .ccb-pvbtn-auth ─────────────────────────────────── */
<button class="ccb-pvbtn-auth" type="button">
│  height: 40px · padding: 0 16px 0 4px · gap: 8px
│  Mismo gradiente orange/vault que primary
├─ <span class="ccb-icon-slot-auth">    32×32px · bg rgba(0,0,0,18%) · border-radius 50%
│   └─ {icon}
└─ <span class="ccb-username">          font-weight: 700
    {children}`;

// ---------------------------------------------------------------------------
// Data — variantes
// ---------------------------------------------------------------------------

interface VariantRow {
  prop: string;
  size: string;
  cssClass: string;
  height: string;
  padding: string;
  font: string;
  note: string;
}

const VARIANTS: VariantRow[] = [
  { prop: 'variant="primary"',             size: "md", cssClass: ".ccb-pvbtn",       height: "48px", padding: "0 56px",          font: "PJS 15/600", note: "Default. Gradiente orange→purple. Usar en CTA principal." },
  { prop: 'variant="secondary"',           size: "md", cssClass: ".ccb-psec",        height: "48px", padding: "0 56px",          font: "PJS 15/600", note: "Gradiente vault-500→vault-700. CTA secundario." },
  { prop: 'variant="ghost"',              size: "md", cssClass: ".ccb-pghost",      height: "48px", padding: "0 28px",          font: "PJS 14/600", note: "⚠️ Solo sobre fondos oscuros/gradiente. Hover → fondo blanco + texto orange." },
  { prop: 'size="sm"',                    size: "sm", cssClass: ".ccb-pvbtn-sm",    height: "40px", padding: "0 16px 0 4px",   font: "PJS 14/600", note: "Guest state. Icon slot semitransparente." },
  { prop: 'size="sm" authState="logged-in"', size: "sm", cssClass: ".ccb-pvbtn-auth", height: "40px", padding: "0 16px 0 4px", font: "PJS 14/600 (username: 700)", note: "Logged-in. Icon slot oscuro. Username en bold." },
];

// ---------------------------------------------------------------------------
// Data — estados
// ---------------------------------------------------------------------------

interface StateRow {
  state: string;
  selector: string;
  transform: string;
  other: string;
}

const STATES: StateRow[] = [
  { state: "default",         selector: ".ccb-pvbtn",               transform: "—",                            other: "—" },
  { state: "hover",           selector: ".ccb-pvbtn:hover",         transform: "translateY(-2px) scale(1.02)", other: "gradient angle 220°, colores más claros, glow visible" },
  { state: "active/pressed",  selector: ".ccb-pvbtn:active",        transform: "scale(0.97) translateY(1px)",  other: "gradient angle 135°, colores más oscuros, sombra inset" },
  { state: "focus-visible",   selector: ".ccb-pvbtn:focus-visible", transform: "—",                            other: "outline 2px vault-400, offset 3px" },
  { state: "disabled",        selector: ".ccb-pvbtn:disabled",      transform: "none",                         other: "sin gradiente · bg disabled #E1E3E2 · texto muted · cursor not-allowed" },
];

// ---------------------------------------------------------------------------
// Data — tokens de color
// ---------------------------------------------------------------------------

interface TokenRow { zone: string; token: string; }

const COLOR_TOKENS: TokenRow[] = [
  { zone: "Primary stop-a (default)",    token: "var(--vmc-color-orange-600, #ED8936)" },
  { zone: "Primary stop-b (default)",    token: "var(--vmc-color-vault-500, #8460E5)" },
  { zone: "Primary stop-a (hover)",      token: "var(--vmc-color-orange-400, #FBC47D)" },
  { zone: "Primary stop-b (hover)",      token: "var(--vmc-color-vault-400, #AE8EFF)" },
  { zone: "Primary stop-a (active)",     token: "var(--vmc-color-orange-700, #D46E20)" },
  { zone: "Primary stop-b (active)",     token: "var(--vmc-color-vault-600, #5A35C2)" },
  { zone: "Secondary stop-a (default)",  token: "var(--vmc-color-vault-500, #8460E5)" },
  { zone: "Secondary stop-b (default)",  token: "var(--vmc-color-vault-700, #3B178A)" },
  { zone: "Ghost border",                token: "rgba(255, 255, 255, 0.75)" },
  { zone: "Ghost hover text",            token: "var(--vmc-color-orange-600, #ED8936)" },
  { zone: "Text color (todos)",          token: "var(--vmc-color-base-white, #fff)" },
  { zone: "Focus ring",                  token: "var(--vmc-color-vault-400, #AE8EFF)" },
  { zone: "Disabled background",         token: "var(--vmc-color-background-disabled, #E1E3E2)" },
  { zone: "Disabled text",              token: "var(--vmc-color-neutral-700, #99A1AF)" },
  { zone: "Font family",                 token: "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)" },
];

// ---------------------------------------------------------------------------
// Data — CSS custom properties (animación)
// ---------------------------------------------------------------------------

const ANIMATION_NOTE = `/**
 * Técnica: CSS custom properties animadas + background-clip dual
 *
 * El gradiente se define con 3 custom properties:
 *   --vbtn-angle   → ángulo (135deg default, 220deg en hover)
 *   --vbtn-stop-a  → color inicial (orange-600 → orange-400 en hover)
 *   --vbtn-stop-b  → color final   (vault-500  → vault-400  en hover)
 *
 * El browser interpola los valores al hacer transition de custom props.
 * Esto permite animar el gradiente sin keyframes.
 *
 * El borde degradado se logra con background dual:
 *   background-image:
 *     [fill]   linear-gradient(--vbtn-angle, stop-a, stop-b)   → padding-box
 *     [border] linear-gradient(white → gold → purple → white)  → border-box
 *   background-clip: padding-box, border-box;
 *   border: 2.5px solid transparent;
 *
 * NOTA: Algunos navegadores no interpolan custom props en gradientes.
 * Safari 17+ y Chrome 111+ soportan @property para solución completa.
 * Fallback graceful: el gradiente cambia instantáneamente en browsers viejos.
 */`;

// ---------------------------------------------------------------------------
// Data — tokens CSS mínimos
// ---------------------------------------------------------------------------

const TOKENS_SETUP = `/* globals.css — mínimo requerido si Terrazzo no está integrado aún */
:root {
  --vmc-color-orange-400:            #FBC47D;
  --vmc-color-orange-600:            #ED8936;
  --vmc-color-orange-700:            #D46E20;
  --vmc-color-vault-400:             #AE8EFF;
  --vmc-color-vault-500:             #8460E5;
  --vmc-color-vault-600:             #5A35C2;
  --vmc-color-vault-700:             #3B178A;
  --vmc-color-vault-900:             #1a0a4a;
  --vmc-color-base-white:            #ffffff;
  --vmc-color-background-disabled:   #E1E3E2;
  --vmc-color-neutral-700:           #99A1AF;
  --vmc-font-display:                "Plus Jakarta Sans", sans-serif;
}
/* En producción provienen de tokens.css generado por Terrazzo. NO copiar a mano. */`;

// ---------------------------------------------------------------------------
// Data — QA
// ---------------------------------------------------------------------------

const QA: string[] = [
  "Primary renderiza gradiente naranja → purple (no fondo plano)",
  "Hover Primary: translateY(-2px) scale(1.02) + glow naranja/purple visible",
  "Active Primary: scale(0.97) translateY(1px) + sombra inset (pressed feel)",
  "Secondary renderiza gradiente purple range (vault-500 → vault-700)",
  "Ghost renderiza transparente con borde blanco semitransparente",
  "Ghost hover: fondo blanco + texto naranja-600 (colores invertidos)",
  "SM-guest: icon slot circular 32×32 semitransparente (rgba white 20%)",
  "SM-logged-in: icon slot 32×32 oscuro (rgba 0,0,0 18%) + label bold",
  "Disabled (primary): sin gradiente, bg gris, texto muted, cursor not-allowed",
  "Focus ring visible al navegar con Tab (outline 2px vault-400 offset 3px)",
  "prefers-reduced-motion: transition: none en todos los selectores",
  "Sin FOUC — estilos presentes en SSR via <style dangerouslySetInnerHTML>",
  "Múltiples instancias en la misma página: sin duplicación de <style>",
  "Sin HEX hardcodeados en la lógica React — todos via var(--vmc-*) o BUTTON_STYLES",
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ButtonDoneHandoffPanel(): JSX.Element {
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
          <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "monospace", color: "var(--vmc-color-text-primary)" }}>Spec & Handoff — ButtonDone</span>
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", padding: "1px 7px", borderRadius: 4, background: "oklch(0.55 0.18 145 / 15%)", color: "oklch(0.40 0.18 145)" }}>✓ done</span>
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "monospace", padding: "1px 7px", borderRadius: 4, background: "oklch(0.60 0.20 60 / 12%)", color: "oklch(0.45 0.18 60)" }}>Concorde</span>
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
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>Opción A — import directo (default export)</p>
                <CodeBlock id="import-a" code={IMPORT_A} copyKey="import-a" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", margin: "0 0 4px", fontFamily: "monospace" }}>Opción B — barrel (named export)</p>
                <CodeBlock id="import-b" code={IMPORT_B} copyKey="import-b" onCopy={handleCopy} copiedKey={copiedKey} />
              </div>
            </div>
          </div>

          {/* 2. Uso */}
          <div>
            <SectionHeading>Uso</SectionHeading>
            <CodeBlock id="usage" code={USAGE} copyKey="usage" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 3. Código fuente completo — via API */}
          <SourceSection
            component="button"
            filename="ButtonDone.tsx"
            destPath="src/features/Button/ButtonDone.tsx"
          />

          {/* 4. Árbol HTML */}
          <div>
            <SectionHeading>Árbol HTML semántico</SectionHeading>
            <CodeBlock id="html-tree" code={HTML_TREE} copyKey="html-tree" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 5. Variantes */}
          <div>
            <SectionHeading>Variantes</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Prop", "Size", "CSS Class", "Height", "Padding", "Font", "Nota"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map(function renderRow(r) {
                  return (
                    <tr key={r.cssClass}>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.prop}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.size}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.cssClass}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.height}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.padding}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.font}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 6. Estados interactivos */}
          <div>
            <SectionHeading>Estados interactivos (primary · aplica a todas las variantes)</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Estado", "CSS selector", "Transform", "Otros efectos"].map(function renderTh(h) {
                    return (
                      <th key={h} style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid var(--vmc-color-border-subtle)", color: "var(--vmc-color-text-tertiary)", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {STATES.map(function renderRow(r) {
                  return (
                    <tr key={r.state}>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-primary)", fontWeight: 600, fontSize: 11, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.state}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.selector}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-secondary)", fontFamily: "monospace", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)", whiteSpace: "nowrap" }}>{r.transform}</td>
                      <td style={{ padding: "5px 8px", color: "var(--vmc-color-text-tertiary)", fontSize: 10, borderBottom: "1px solid var(--vmc-color-border-subtle)" }}>{r.other}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 7. Swap legacy */}
          <div>
            <SectionHeading>Reemplazar Button legacy en producción</SectionHeading>
            <CodeBlock id="swap" code={SWAP} copyKey="swap" onCopy={handleCopy} copiedKey={copiedKey} />
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", fontStyle: "italic" }}>
              Las variantes <code style={{ fontFamily: "monospace" }}>loading</code>, <code style={{ fontFamily: "monospace" }}>destructive</code> y <code style={{ fontFamily: "monospace" }}>secondary-live</code> del Button legacy no existen en ButtonDone — revisar caso a caso.
            </p>
          </div>

          {/* 8. Tokens de color */}
          <div>
            <SectionHeading>Tokens de color</SectionHeading>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Zona / Estado", "Token DS (con fallback)"].map(function renderTh(h) {
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

          {/* 9. Animación — CSS custom properties */}
          <div>
            <SectionHeading>Animación — CSS custom properties (cómo funciona)</SectionHeading>
            <CodeBlock id="animation" code={ANIMATION_NOTE} copyKey="animation" onCopy={handleCopy} copiedKey={copiedKey} />
          </div>

          {/* 10. Tokens CSS mínimos */}
          <div>
            <SectionHeading>Tokens CSS mínimos (si Terrazzo aún no está integrado)</SectionHeading>
            <CodeBlock id="tokens" code={TOKENS_SETUP} copyKey="tokens" onCopy={handleCopy} copiedKey={copiedKey} />
            <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "6px 0 0", lineHeight: "18px" }}>
              El componente incluye fallbacks HEX en cada <code style={{ fontFamily: "monospace", fontSize: 11 }}>var()</code> — funciona sin tokens si es necesario, pero los tokens son obligatorios en producción.
            </p>
          </div>

          {/* 11. QA Checklist */}
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
              Generado por{" "}
              <span style={{ color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>Concorde</span>
              {" · "}
              source: <span style={{ color: "var(--vmc-color-text-brand, oklch(0.30 0.20 285))" }}>src/features/Button/ButtonDone.tsx</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
