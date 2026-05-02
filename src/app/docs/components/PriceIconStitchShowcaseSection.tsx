"use client";
import type { JSX } from "react";
import { useState } from "react";
import PriceIcon from "@/features/PriceIcon/PriceIcon";
import type { PriceIconState } from "@/features/PriceIcon/PriceIcon";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "price-icon-pending";

const PRICE_ICON_FIGMA_SPEC = `@figma-spec
@component    PriceIcon | 24x24 | Page:Stitch
@description  Ícono de moneda/precio. Usado en OfferCard y cualquier componente con precio.

@tokens
  price-color : --vmc-color-cyan-800              : #008688
  text-muted  : --vmc-color-text-price-label      : #99A1AF
  skeleton-bg : --vmc-color-background-disabled   : #E1E3E2

@layers
  root : COMPONENT : 24x24 : x:0, y:0 : SVG coin o círculo skeleton

@states
  [x] default  : SVG coin 24x24 · fill:price-color (#008688)
  [x] expirado : SVG coin 24x24 · fill:text-muted  (#99A1AF)
  [x] skeleton : círculo sólido 24x24 · fill:skeleton-bg (#E1E3E2) · radius:9999`;

const STATES: { id: PriceIconState; label: string }[] = [
  { id: "default",  label: "Default"  },
  { id: "expirado", label: "Expirado" },
  { id: "skeleton", label: "Skeleton" },
];

const ACCENT = "var(--vmc-color-cyan-800)";

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
        background:    active ? ACCENT : "color-mix(in oklch, var(--vmc-color-vault-700) 8%, white)",
        color:         active ? "#FFFFFF" : "var(--vmc-color-vault-700)",
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function PriceIconStitchShowcaseSection(): JSX.Element {
  const [state, setState] = useState<PriceIconState>("default");

  const stateSwitcher = (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{
        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--vmc-color-text-price-label)",
      }}>
        estado
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        {STATES.map(function renderState(s) {
          return (
            <Tab key={s.id} label={s.label} active={state === s.id}
              onClick={function () { setState(s.id); }} />
          );
        })}
      </div>
    </div>
  );

  return (
    <ComponentShowcase
      id="price-icon"
      title="price-icon"
      description="24×24px · ícono de precio · 3 estados"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import PriceIcon from "@/features/PriceIcon/PriceIcon";'
      variantSwitcher={stateSwitcher}
      figmaSpec={PRICE_ICON_FIGMA_SPEC}
    >
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "48px 24px",
        background: "var(--vmc-color-background-secondary)",
      }}>
        <PriceIcon key={state} state={state} />
      </div>
    </ComponentShowcase>
  );
}
