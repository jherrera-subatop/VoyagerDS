"use client";
import type { JSX } from "react";
import { useState } from "react";
import FavoriteIcon from "@/features/FavoriteIcon/FavoriteIcon";
import type { FavoriteIconState } from "@/features/FavoriteIcon/FavoriteIcon";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "favorite-icon-pending";

const FAVORITE_ICON_FIGMA_SPEC = `@figma-spec
@component    FavoriteIcon | 32x32 | Page:Stitch
@description  Botón de favorito. Un componente, 4 estados.

@tokens
  vault      : --vmc-color-background-brand   : #22005C
  surface    : --vmc-color-background-card    : #FFFFFF
  text-muted : --vmc-color-text-price-label   : #99A1AF
  skeleton   : --vmc-color-background-disabled: #E1E3E2
  shadow-md  : --vmc-shadow-md                : 0 8px 16px 0 rgba(0,0,0,0.10)

@layers
  root  : COMPONENT : 32x32 : x:0, y:0 : fill según estado
  heart : SVG       : 20x20 : x:6, y:6 : fill según estado

@states
  [x] default  : fill:surface + shadow:shadow-md · HeartOutline · color:vault (#22005C)
  [x] pressed  : fill:rgba(34,0,92,0.10) + sin sombra · HeartFilled · color:vault
  [x] expirado : fill:surface + shadow:shadow-md · HeartOutline · color:text-muted (#99A1AF)
  [x] skeleton : fill:skeleton-bg (#E1E3E2) · sin ícono · radius:9999 · sin sombra
  [ ] hover    : (futuro) color-mix(vault 92%, white) bg
  [ ] focus    : (futuro) outline 2px vault-mid, offset 2px
  [ ] active   : (futuro)`;

const STATES: { id: FavoriteIconState; label: string }[] = [
  { id: "default",  label: "Default"    },
  { id: "pressed",  label: "Presionado" },
  { id: "expirado", label: "Expirado"   },
  { id: "skeleton", label: "Skeleton"   },
];

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
        color:         active ? "#FFFFFF" : "oklch(0.22 0.18 285)",
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function FavoriteIconStitchShowcaseSection(): JSX.Element {
  const [state, setState] = useState<FavoriteIconState>("default");

  const stateSwitcher = (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{
        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--vmc-color-text-price-label)",
      }}>
        estado
      </span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
      id="favorite-icon"
      title="favorite-icon"
      description="32×32px · ícono de favorito · 4 estados"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import FavoriteIcon from "@/features/FavoriteIcon/FavoriteIcon";'
      variantSwitcher={stateSwitcher}
      figmaSpec={FAVORITE_ICON_FIGMA_SPEC}
    >
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "48px 24px",
        background: "var(--vmc-color-background-secondary)",
      }}>
        <FavoriteIcon key={state} state={state} />
      </div>
    </ComponentShowcase>
  );
}
