"use client";
import type { JSX } from "react";
import { useState } from "react";
import OfferTypeTile from "@/features/OfferTypeTile/OfferTypeTile";
import type { OfferTypeTileVariant, OfferTypeTileState } from "@/features/OfferTypeTile/OfferTypeTile";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "offer-type-tile-pending";

const FIGMA_SPEC = `@figma-spec
@component    OfferTypeTile | 1fr×80 | Page:Stitch
@description  Tile de tipo de oferta para QuickFilters.
              minHeight 80px (= CategoryTile). 2 variantes × 2 estados.

@tokens
  negotiable-color : --vmc-color-badge-negotiable-bg : #00CACE
  live-color       : --vmc-color-badge-live-bg       : #ED8936
  surface          : --vmc-color-background-card     : #FFFFFF
  text-inverse     : --vmc-color-text-inverse        : #FFFFFF
  border           : --vmc-color-vault-200
  shadow-default   : 0 2px 10px rgba(34,0,92,0.10)
  shadow-neg-press : 0 4px 20px rgba(0,202,206,0.35)
  shadow-live-press: 0 4px 20px rgba(237,137,54,0.35)

@variants
  [x] negociable · [x] default · [x] pressed
  [x] en-vivo    · [x] default · [x] pressed

@states
  [x] default : top=variant-color · bot=blanco · bot-label=variant-color
  [x] pressed : top=variant-color · bot=variant-color · bot-label=blanco`;

const VARIANTS: { id: OfferTypeTileVariant; label: string }[] = [
  { id: "negociable", label: "Negociable" },
  { id: "en-vivo",    label: "En Vivo"    },
];

const STATES: { id: OfferTypeTileState; label: string }[] = [
  { id: "default", label: "Default"    },
  { id: "pressed", label: "Presionado" },
];

const ACCENT = "oklch(0.22 0.18 285)";

interface TabProps { label: string; active: boolean; onClick: () => void; small?: boolean }

function Tab({ label, active, onClick, small }: TabProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:       small ? "4px 10px" : "5px 14px",
        borderRadius:  6,
        border:        "none",
        cursor:        "pointer",
        fontFamily:    "monospace",
        fontSize:      small ? 10 : 11,
        fontWeight:    active ? 700 : 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background:    active ? ACCENT : "color-mix(in oklch, oklch(0.22 0.18 285) 8%, white)",
        color:         active ? "#FFFFFF" : "oklch(0.22 0.18 285)",
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function OfferTypeTileStitchShowcaseSection(): JSX.Element {
  const [variant,    setVariant]    = useState<OfferTypeTileVariant>("negociable");
  const [tileState,  setTileState]  = useState<OfferTypeTileState>("default");

  const controls = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--vmc-color-text-price-label)",
        }}>variante</span>
        <div style={{ display: "flex", gap: 5 }}>
          {VARIANTS.map(function(v) {
            return (
              <Tab key={v.id} label={v.label} active={variant === v.id} small
                onClick={function() { setVariant(v.id); }} />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--vmc-color-text-price-label)",
        }}>estado</span>
        <div style={{ display: "flex", gap: 5 }}>
          {STATES.map(function(s) {
            return (
              <Tab key={s.id} label={s.label} active={tileState === s.id}
                onClick={function() { setTileState(s.id); }} />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <ComponentShowcase
      id="offer-type-tile"
      title="offer-type-tile"
      description="1fr×80px · negociable | en-vivo · default | pressed"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import OfferTypeTile from "@/features/OfferTypeTile/OfferTypeTile";'
      variantSwitcher={controls}
      figmaSpec={FIGMA_SPEC}
    >
      <div style={{
        padding:        "48px 32px",
        background:     "var(--vmc-color-background-secondary)",
        border:         "1px solid var(--vmc-color-border-subtle)",
        borderRadius:   8,
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
      }}>
        <div style={{ width: 120 }}>
          <OfferTypeTile
            key={`${variant}-${tileState}`}
            href="#"
            variant={variant}
            state={tileState}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
