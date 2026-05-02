"use client";
import { useState } from "react";
import type { JSX } from "react";
import InfoGeneral, { type InfoGeneralVariant } from "@/features/InfoGeneral/InfoGeneral";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "info-general-pending";

const INFO_GENERAL_FIGMA_SPEC = `@figma-spec
@component    InfoGeneral | 437x2197 | Page:Stitch

@tokens
  vault    : --color-vault     : #22005C
  vaultMid : --color-vault-mid : #3B1782
  live     : --color-live      : #ED8936
  success  : --color-status-success: #22C55E
  skeleton : --color-skeleton  : #C8CACC
  surface  : --color-surface-card: #FFFFFF

@typography
  heading  : Plus Jakarta Sans | Bold   | 14px | lh:auto | "Información general" | "Condiciones del ofrecimiento"
  label    : Plus Jakarta Sans | Bold   | 14px | lh:auto | "Placa:" etc.
  value    : Plus Jakarta Sans | Light  | 14px | lh:auto | "AZF829" etc.
  body     : Roboto            | Light  | 14px | lh:1.6  | descripción HTML
  caption  : Plus Jakarta Sans | Light  | 12px | lh:auto | "Código: 61483"
  h3       : Plus Jakarta Sans | Bold   | 16px | lh:auto | "Descarga toda la información:"
  overline : Plus Jakarta Sans | Light  | 10px | lh:auto | "CALIDAD DE INFORMACIÓN" (uppercase)

@layers
  root       : COMPONENT  : 437xAuto: x:0,  y:0  : fill:surface, radius:4px, shadow:0 8px 16px oklch(0.22 0.18 285/6%)
  header-row : Frame      : 437x64  : x:0,  y:0  : fill:surface, cursor:pointer
  corner-TL  : SVG        : 12x12   : x:32, y:32 : stroke:live
  corner-BR  : SVG        : 12x12   : x:32, y:32 : stroke:live
  heading-txt: Text       : autoXauto:x:56,y:20 : style:heading, fill:vault
  chevron    : SVG        : 24x24   : x:389,y:20 : stroke:live
  body       : Frame      : 437xAuto: x:0,  y:64 : fill:surface, paddingX:32, paddingB:32
  spec-list  : Frame      : 373xAuto: x:32, y:96 : fill:none, flex:col, divider:vault/5%
  desc-txt   : Text       : 373xAuto: x:32, y:var: style:body, fill:vault
  dl-section : Frame      : 373xAuto: x:32, y:var: fill:none

@subcomponents
  CornerTL      : inline
    @tokens   stroke:live
    @layers   bracket:SVG:12x12:x:0,y:0:stroke:currentColor
  CornerBR      : inline
    @tokens   stroke:live
    @layers   bracket:SVG:12x12:x:0,y:0:stroke:currentColor
  ChevronDown   : inline
    @tokens   stroke:live
    @layers   chevron:SVG:24x24:x:0,y:0:stroke:currentColor
  SpecRow       : inline
    @tokens   fill:vault
    @layers   row:Frame:autoXauto:x:0,y:0:fill:none
  DetalleOfertaBar : @/features/DetalleOfertaBar/DetalleOfertaBar
    @tokens   border:vault | bg:vault (hover)
    @layers   bar:Frame:autoX64:x:0,y:0:border:1px vault

@variants
  prop: variant
    [x] info-general : datos técnicos del vehículo + descripción + documentos
    [x] condiciones  : texto legal HTML con tipografía enriquecida + complejidad dot

@states
  [x] default  : abierto (open=true), muestra el cuerpo de la variante activa
  [ ] hover    : (futuro) header row fondo sutil
  [ ] focus    : (futuro)
  [x] active   : toggle — onClick cambia open state, chevron rota 180deg
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

const VARIANTS: { id: InfoGeneralVariant; label: string }[] = [
  { id: "info-general", label: "Información general" },
  { id: "condiciones",  label: "Condiciones" },
];

interface VariantTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function VariantTab({ label, active, onClick }: VariantTabProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           6,
        padding:       "5px 14px",
        borderRadius:  6,
        border:        "none",
        cursor:        "pointer",
        fontFamily:    "monospace",
        fontSize:      11,
        fontWeight:    active ? 700 : 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background:    active
          ? "oklch(0.22 0.18 285)"
          : "color-mix(in oklch, oklch(0.22 0.18 285) 8%, white)",
        color:         active ? "oklch(1 0 0)" : "oklch(0.22 0.18 285)",
        boxShadow:     active ? "0 2px 8px oklch(0.22 0.18 285 / 35%)" : "none",
        transition:    "background 140ms ease, box-shadow 140ms ease, color 140ms ease",
      }}
    >
      <span
        style={{
          width:        6,
          height:       6,
          borderRadius: 9999,
          background:   active ? "oklch(1 0 0 / 80%)" : "oklch(0.22 0.18 285)",
          flexShrink:   0,
          display:      "inline-block",
        }}
      />
      {label}
    </button>
  );
}

export function InfoGeneralStitchShowcaseSection(): JSX.Element {
  const [active, setActive] = useState<InfoGeneralVariant>("info-general");

  function handleSelect(v: InfoGeneralVariant): void {
    setActive(v);
  }

  const variantSwitcher = (
    <>
      {VARIANTS.map(function renderTab(v) {
        return (
          <VariantTab
            key={v.id}
            label={v.label}
            active={active === v.id}
            onClick={function handleClick() { handleSelect(v.id); }}
          />
        );
      })}
    </>
  );

  return (
    <ComponentShowcase
      id="info-general"
      title="InfoGeneral"
      description="437×2197px · 2 variantes"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import InfoGeneral from "@/features/InfoGeneral/InfoGeneral";'
      variantSwitcher={variantSwitcher}
      figmaSpec={INFO_GENERAL_FIGMA_SPEC}
    >
      <div
        style={{
          display:         "flex",
          justifyContent:  "center",
          padding:         "32px 24px",
          background:      "var(--color-surface-section, #F2F4F3)",
        }}
      >
        <div style={{ width: "437px" }}>
          <InfoGeneral key={active} variant={active} />
        </div>
      </div>
    </ComponentShowcase>
  );
}
