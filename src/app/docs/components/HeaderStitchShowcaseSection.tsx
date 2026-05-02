"use client";
import { useState } from "react";
import type { JSX } from "react";
import Header from "@/features/Header/Header";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "header-pending";

const HEADER_FIGMA_SPEC = `@figma-spec
@component    Header | 790x66 | Page:Stitch

@tokens
  bg     : --vmc-color-background-brand  : #22005C
  pad    : --vmc-space-300               : 24px
  radius : --vmc-radius-full (LoginButton)

@variants
  prop: user
  [x] guest         : LoginButton guest (pill naranja + "INGRESA")
  [x] authenticated : LoginButton auth  (glass naranja + iniciales + "Bienvenido, NICK")

@states
  [x] default
  [ ] hover  : (futuro) LoginButton hover
  [ ] focus  : (futuro) outline vault-mid`;

type Variant = "guest" | "auth";

const ACCENT = "oklch(0.22 0.18 285)";

interface TabProps { label: string; active: boolean; onClick: () => void }

function Tab({ label, active, onClick }: TabProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:       "5px 14px",
        borderRadius:  6,
        border:        "none",
        cursor:        "pointer",
        fontFamily:    "monospace",
        fontSize:      11,
        fontWeight:    active ? 700 : 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background:    active ? ACCENT : "color-mix(in oklch, oklch(0.22 0.18 285) 8%, white)",
        color:         active ? "#FFFFFF" : ACCENT,
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function HeaderStitchShowcaseSection(): JSX.Element {
  const [variant, setVariant] = useState<Variant>("guest");

  const variantSwitcher = (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{
        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--vmc-color-text-price-label)",
      }}>
        variante
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <Tab label="Guest"        active={variant === "guest"} onClick={() => setVariant("guest")} />
        <Tab label="Autenticado"  active={variant === "auth"}  onClick={() => setVariant("auth")}  />
      </div>
    </div>
  );

  return (
    <ComponentShowcase
      id="header"
      title="Header"
      description="790×66px · sticky · LoginButton guest y autenticado"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Header from "@/features/Header/Header";'
      variantSwitcher={variantSwitcher}
      figmaSpec={HEADER_FIGMA_SPEC}
    >
      <Header user={variant === "auth" ? { nickname: "ZAEX5G" } : undefined} />
    </ComponentShowcase>
  );
}
