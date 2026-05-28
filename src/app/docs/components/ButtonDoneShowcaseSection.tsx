"use client";

/**
 * ButtonDoneShowcaseSection
 * Showcase del Button (Concorde DONE) en /docs/componentes.
 * Muestra los 5 variantes: primary · secondary · ghost · sm-guest · sm-logged-in
 */

import type { JSX, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import ButtonDone from "@/features/Button/ButtonDone";
import { ComponentShowcase } from "./ComponentShowcase";
import { ButtonDoneHandoffPanel } from "./ButtonDoneHandoffPanel";
import { useComponentMode } from "./ComponentModeContext";

// Stitch IDs — placeholder hasta tener screen exportado
const STITCH_PROJECT_ID = "14182036405227000116";
const STITCH_SCREEN_ID  = "concorde-button-pase1";

// ---------------------------------------------------------------------------
// Icon helpers — nominales, sin SVG externo
// ---------------------------------------------------------------------------

function UserIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function AvatarIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4" opacity="0.9" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" opacity="0.9" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Preview — done mode
// ---------------------------------------------------------------------------

interface VariantGroupProps {
  label: string;
  children: ReactNode;
  dark?: boolean;
}

function VariantGroup({ label, children, dark = false }: VariantGroupProps): JSX.Element {
  return (
    <div>
      <p style={{
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "monospace",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: dark ? "oklch(1 0 0 / 50%)" : "var(--vmc-color-text-tertiary)",
        margin: "0 0 12px",
      }}>
        {label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

function ButtonDonePreview(): JSX.Element {
  function handleNoop(): void {}

  return (
    <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 32 }}>

      {/* MD Primary + Secondary */}
      <VariantGroup label="MD — Primary · Secondary">
        <ButtonDone variant="primary" onClick={handleNoop}>
          Crear cuenta
        </ButtonDone>
        <ButtonDone variant="secondary" onClick={handleNoop}>
          Ver más
        </ButtonDone>
      </VariantGroup>

      {/* Ghost — necesita fondo oscuro */}
      <VariantGroup label="MD — Ghost (sobre fondo oscuro)">
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 32px",
          borderRadius: 16,
          background: "linear-gradient(135deg, var(--vmc-color-orange-600, #ED8936) 0%, var(--vmc-color-vault-500, #8460E5) 100%)",
          gap: 16,
        }}>
          <ButtonDone variant="ghost" onClick={handleNoop}>
            Saber más
          </ButtonDone>
          <ButtonDone variant="ghost" onClick={handleNoop}>
            Ver subastas
          </ButtonDone>
        </div>
      </VariantGroup>

      {/* SM variants */}
      <VariantGroup label="SM — Guest · Logged-in">
        <ButtonDone size="sm" icon={<UserIcon />} onClick={handleNoop}>
          Ingresar
        </ButtonDone>
        <ButtonDone size="sm" authState="logged-in" icon={<AvatarIcon />} onClick={handleNoop}>
          jherrera
        </ButtonDone>
        <ButtonDone size="sm" authState="logged-in" icon={<AvatarIcon />} onClick={handleNoop}>
          carlosm
        </ButtonDone>
      </VariantGroup>

      {/* Disabled */}
      <VariantGroup label="Disabled">
        <ButtonDone variant="primary" disabled>
          No disponible
        </ButtonDone>
        <ButtonDone variant="secondary" disabled>
          No disponible
        </ButtonDone>
      </VariantGroup>

    </div>
  );
}

// ---------------------------------------------------------------------------
// Legacy preview — modo normal (Stitch pipeline)
// ---------------------------------------------------------------------------

function ButtonLegacyPreview(): JSX.Element {
  return (
    <div style={{ padding: "40px 32px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button variant="primary" type="button">Primario</Button>
      <Button variant="secondary" type="button">Secundario</Button>
      <Button variant="ghost" type="button">Ghost</Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export function ButtonDoneShowcaseSection(): JSX.Element {
  const { mode } = useComponentMode();

  return (
    <>
      <ComponentShowcase
        id="button-concorde"
        title="Button (Concorde)"
        description="Botón principal VMC · 5 variantes · gradiente animado orange→purple · SM con icon slot · DONE vía Concorde"
        stitchProjectId={STITCH_PROJECT_ID}
        stitchScreenId={STITCH_SCREEN_ID}
        importPath='import ButtonDone from "@/features/Button/ButtonDone";'
        doneChildren={<ButtonDonePreview />}
      >
        <ButtonLegacyPreview />
      </ComponentShowcase>
      {mode === "done" && <ButtonDoneHandoffPanel />}
    </>
  );
}
