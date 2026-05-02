"use client";
import type { JSX } from "react";
import DetalleOfertaBar from "@/features/DetalleOfertaBar/DetalleOfertaBar";
import { ComponentShowcase } from "./ComponentShowcase";
const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "detalle-oferta-bar-pending";

const DETALLE_OFERTA_BAR_FIGMA_SPEC = `@figma-spec
@component    DetalleOfertaBar | 325x64 | Page:Stitch

@tokens
  vault  : --voyager-color-vault    : #22005C
  onDark : --voyager-text-on-dark   : #FFFFFF

@typography
  label    : Plus Jakarta Sans | Regular | 12px | lh:1.25 | "Detalle de la oferta"
  descarga : Plus Jakarta Sans | Regular | 12px | lh:1.25 | "Descarga"

@layers
  root       : COMPONENT : 325x64  : x:0,  y:0  : fill:transparent, border:1px solid vault, borderRight:8px solid vault, radius:16px, minH:64
  left-col   : Frame     : 233xAuto: x:12, y:12 : fill:none, flex:row, gap:8
  file-icon  : SVG       : 24x24   : x:12, y:20 : fill:currentColor (vault)
  label-txt  : Text      : autoXauto:x:44,y:20 : style:label, fill:vault
  divider    : Frame     : 1xAuto  : x:245,y:12 : fill:vault (1px borderLeft)
  right-col  : Frame     : 80xAuto : x:245,y:12 : fill:none, flex:col, gap:4
  dl-icon    : SVG       : 20x20   : x:30, y:12 : fill:currentColor (vault)
  dl-txt     : Text      : autoXauto:x:20,y:36: style:descarga, fill:vault

@subcomponents
  (ninguno — componente autónomo)

@variants
  (ninguna — un único estado; el label es prop)

@states
  [x] default  : borde vault, texto vault, fondo transparente
  [x] hover    : fondo vault, texto blanco, divider blanco
  [ ] focus    : (futuro) outline 2px vault-mid
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function DetalleOfertaBarStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="detalle-oferta-bar"
      title="DetalleOfertaBar"
      description="325x65px"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import DetalleOfertaBar from "@/features/DetalleOfertaBar/DetalleOfertaBar";'
      figmaSpec={DETALLE_OFERTA_BAR_FIGMA_SPEC}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--vmc-color-background-secondary)" }}>
        <DetalleOfertaBar />
      </div>
    </ComponentShowcase>
  );
}
