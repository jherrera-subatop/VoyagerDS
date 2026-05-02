"use client";
import type { JSX } from "react";
import { useState } from "react";
import CategoryTile from "@/features/CategoryTile/CategoryTile";
import type { CategoryTileVariant, CategoryTileState } from "@/features/CategoryTile/CategoryTile";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "category-tile-pending";

const CATEGORY_TILE_FIGMA_SPEC = `@figma-spec
@component    CategoryTile | 1fr×80 | Page:Stitch
@description  Tile de categoría para QuickFilters. Ancho flexible (grid 1fr).
              Blanco default · vault-900 pressed · texto completo.
              4 variantes × 2 estados = 8 combinaciones.

@tokens
  surface        : --vmc-color-background-card  : #FFFFFF
  border         : --vmc-color-vault-200         : rgb(90.98% 87.06% 100%)
  icon-color     : --vmc-color-background-brand  : #22005C
  label-color    : --vmc-color-background-brand  : #22005C
  shadow-default : 0 2px 10px rgba(34,0,92,0.10)
  pressed-surface: --vmc-color-background-brand  : #22005C
  pressed-content: --vmc-color-text-inverse      : #FFFFFF
  shadow-pressed : 0 4px 20px rgba(34,0,92,0.30)

@typography
  label : Plus Jakarta Sans | Bold | 9px | lh:11px | ls:0.05em | uppercase · wrap · center

@layers
  root      : COMPONENT : 1fr×80 : fill:surface|pressed-surface, radius:10, border, shadow
  icon-wrap : Frame     : 24x24  : flex:center, color:icon-color|pressed-content
  icon      : SVG       : 24x24  : fill:currentColor
  label-txt : Text      : 100%×auto : style:label, fill:label-color|pressed-content, wrap

@variants
  [x] vehicular          · [x] default  · [x] pressed
  [x] maquinaria         · [x] default  · [x] pressed
  [x] equipos-diversos   · [x] default  · [x] pressed
  [x] articulos-diversos · [x] default  · [x] pressed

@states
  [x] default : blanco · borde vault-200 · icon+label vault-900
  [x] pressed : vault-900 bg · sin borde · icon+label blanco`;

const VARIANTS: { id: CategoryTileVariant; label: string }[] = [
  { id: "vehicular",           label: "Vehicular"          },
  { id: "maquinaria",          label: "Maquinaria"         },
  { id: "equipos-diversos",    label: "Equipos div."       },
  { id: "articulos-diversos",  label: "Artículos div."     },
];

const STATES: { id: CategoryTileState; label: string }[] = [
  { id: "default", label: "Default"  },
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

export function CategoryTileStitchShowcaseSection(): JSX.Element {
  const [variant, setVariant] = useState<CategoryTileVariant>("vehicular");
  const [tileState, setTileState] = useState<CategoryTileState>("default");

  const controls = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Variant switcher */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--vmc-color-text-price-label)",
        }}>variante</span>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {VARIANTS.map(function(v) {
            return (
              <Tab key={v.id} label={v.label} active={variant === v.id} small
                onClick={function() { setVariant(v.id); }} />
            );
          })}
        </div>
      </div>

      {/* State switcher */}
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
      id="category-tile"
      title="category-tile"
      description="1fr×80px · 4 variantes × 2 estados · texto completo"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import CategoryTile from "@/features/CategoryTile/CategoryTile";'
      variantSwitcher={controls}
      figmaSpec={CATEGORY_TILE_FIGMA_SPEC}
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
        {/* Single tile — variant + state seleccionados */}
        <div style={{ width: 96 }}>
          <CategoryTile
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
