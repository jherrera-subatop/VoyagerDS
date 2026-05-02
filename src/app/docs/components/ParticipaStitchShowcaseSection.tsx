"use client";

/**
 * ParticipaStitchShowcaseSection
 * Showcase del widget Participa en /docs/componentes.
 * NORMAL : token upgrade aplicado sobre outerHTML legacy (317×422px)
 * DONE   : pendiente (pipeline Figma MCP)
 */

import type { JSX } from "react";
import Participa from "@/features/Participa/Participa";
import { ComponentShowcase } from "./ComponentShowcase";

/* Stitch IDs — placeholder hasta que se suba el screen */
const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "participa-pending-00000000";

const CENTERED: React.CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  alignItems:     "flex-start",
  padding:        "32px 24px",
  background:     "var(--vmc-color-background-secondary, #F2F4F3)",
};

const PARTICIPA_FIGMA_SPEC = `@figma-spec
@component    Participa | 317x422 | Page:Stitch

@tokens
  vault           : --voyager-color-vault            : #22005C
  vaultMid        : --voyager-color-vault-mid        : #3B1782
  live            : --voyager-color-live             : #ED8936
  negotiable      : --voyager-color-negotiable       : #00CACE
  surfaceCard     : --voyager-surface-card           : #FFFFFF
  textOnDark      : --voyager-text-on-dark           : #FFFFFF
  textOnDarkMuted : --voyager-text-on-dark-muted     : rgba(255,255,255,0.60)
  shadowMd        : 0 8px 16px rgba(0,0,0,0.10)

@typography
  inicia-label : Plus Jakarta Sans | Regular | 14px | lh:1.25 | "Inicia"
  inicia-date  : Plus Jakarta Sans | Bold    | 16px | lh:1    | "lunes 04" (uppercase)
  time         : Plus Jakarta Sans | Bold    | 20px | lh:1    | "12:30 pm"
  indicator-n  : Roboto Mono       | Regular | 14px | lh:auto | "93" / "0" (tabular-nums)
  cta-msg      : Plus Jakarta Sans | Regular | 14px | lh:1.2  | "¡Oportunidad para el que sabe!"
  btn-label    : Plus Jakarta Sans | Bold    | 18px | lh:1    | "PARTICIPA" (uppercase)
  price-label  : Plus Jakarta Sans | Light   | 18px | lh:1    | "Precio Base:"
  price-value  : Roboto Mono       | Bold    | 18px | lh:1    | "US$ 62,999" (tabular-nums)
  commission   : Plus Jakarta Sans | Regular | 10px | lh:1.3  | "Comisión: 7.5% del valor..."

@layers
  root         : COMPONENT : 317x422 : x:0,  y:0   : fill:none
  cp-header    : Frame     : 317x110 : x:0,  y:0   : fill:vaultGrad, paddingX:20
  date-row     : Frame     : 277x48  : x:20, y:0   : fill:none, borderBottom:1px rgba(255,255,255,0.15), paddingY:12
  left-date    : Frame     : 138x48  : x:0,  y:0   : fill:none
  right-time   : Frame     : 138x48  : x:138,y:0   : fill:none, borderLeft:1px rgba(255,255,255,0.20), paddingLeft:24
  indicator-row: Frame     : 277x62  : x:20, y:48  : fill:none, flex:row
  eye-grp      : Frame     : 80xauto : x:0,  y:10  : fill:none, flex:row, alignRight
  like-btn     : Frame     : 88xauto : x:104,y:-20 : fill:surfaceCard, radius:9999, shadow:shadowMd
  people-grp   : Frame     : 80xauto : x:196,y:10  : fill:none, flex:row, alignLeft
  cp-content   : Frame     : 317x312 : x:0,  y:110 : fill:surfaceCard, paddingX:20
  cta-msg-txt  : Text      : 277xauto: x:20, y:134 : style:cta-msg, fill:live, align:center
  participa-btn: Frame     : 277x68  : x:20, y:158 : fill:live, radius:4px, shadow:shadowMd
  participa-txt: Text      : autoXauto:x:auto,y:24 : style:btn-label, fill:textOnDark
  price-row    : Frame     : 277xauto: x:20, y:242 : fill:none, flex:row, align:center, justify:center
  coin-svg     : SVG       : 28x28   : x:0,  y:0   : fill:negotiable
  price-grp    : Frame     : autoXauto:x:40,y:4 : fill:none

@subcomponents
  IndicatorIcon : inline
    @tokens   border:rgba(255,255,255,0.30) | fill:textOnDark
    @layers   circle:Frame:32x32:x:0,y:0:border:1px rgba(255,255,255,0.30),radius:9999

@variants
  (ninguna — un único estado: is-live)

@states
  [x] default  : header vault gradient con fecha/hora, indicadores (93 vistas, 0 likes, 0 participantes), botón PARTICIPA naranja, precio base negotiable
  [ ] hover    : (futuro) botón PARTICIPA color-mix(live 85%, black)
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function ParticipaStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="detail-card"
      title="detail-card"
      description="Widget de participación en subasta · 317×422px · columna derecha · header vault gradient · precio Roboto Mono tabular-nums · VOYAGER v2.1.0"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Participa from "@/features/Participa/Participa";'
      figmaSpec={PARTICIPA_FIGMA_SPEC}
    >
      <div style={CENTERED}>
        <Participa />
      </div>
    </ComponentShowcase>
  );
}
