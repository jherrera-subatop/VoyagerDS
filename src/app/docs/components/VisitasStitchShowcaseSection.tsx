"use client";
import type { JSX } from "react";
import Visitas from "@/features/Visitas/Visitas";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "visitas-pending";

const VISITAS_FIGMA_SPEC = `@figma-spec
@component    Visitas | 317x429 | Page:Stitch

@tokens
  vault       : --voyager-color-vault          : #22005C
  vaultMid    : --voyager-color-vault-mid       : #3B1782
  live        : --voyager-color-live            : #ED8936
  success     : --voyager-color-status-success  : #22C55E
  surfaceCard : --voyager-surface-card          : #FFFFFF
  textOnDark  : --voyager-text-on-dark          : #FFFFFF
  shadowSm    : 0 1px 3px rgba(34,0,92,0.10), 0 1px 2px rgba(34,0,92,0.06)

@typography
  heading  : Plus Jakarta Sans | Bold    | 14px | lh:20px | "Visitas"
  avail    : Plus Jakarta Sans | Regular | 12px | lh:1    | "Disponible"
  body     : Plus Jakarta Sans | Light   | 14px | lh:24px | "Las visitas son previa cita..."
  cta-lbl  : Plus Jakarta Sans | Light   | 14px | lh:1    | "Para agendar tu visita:"
  btn-lbl  : Plus Jakarta Sans | Bold    | 14px | lh:24px | "Ingresa"

@layers
  root        : COMPONENT : 317x429 : x:0,  y:0  : fill:surfaceCard, radius:4px, shadow:shadowSm
  header-row  : Frame     : 317x88  : x:0,  y:0  : fill:none, padding:32
  bracket-TL  : SVG       : 12x12   : x:32, y:32 : fill:live
  bracket-BR  : SVG       : 12x12   : x:32, y:32 : fill:live
  heading-txt : Text      : autoXauto:x:56,y:40 : style:heading, fill:vault
  dot-success : Ellipse   : 8x8     : x:56, y:64 : fill:success
  avail-txt   : Text      : autoXauto:x:72,y:62 : style:avail, fill:vault
  chevron     : SVG       : 24x24   : x:261,y:44 : fill:vaultMid@30%white
  body-area   : Frame     : 253xAuto: x:32, y:88 : fill:none, paddingBottom:32
  body-txt    : Text      : 253xAuto: x:0,  y:0  : style:body, fill:vaultMid@70%white
  skeleton-row: Frame     : 253x36  : x:0,  y:var: fill:none, flex:col, gap:8
  skel-1      : Rect      : 84x8    : x:0,  y:0  : fill:vault@6%white
  skel-2      : Rect      : 190x8   : x:0,  y:16 : fill:vault@6%white
  divider     : Rect      : 253x1   : x:0,  y:var: fill:vault@8%white
  cta-lbl-txt : Text      : 253xauto: x:0,  y:var: style:cta-lbl, fill:vaultMid@70%white, align:center
  btn         : Frame     : 221x48  : x:16, y:var: fill:vaultGrad, radius:4px
  btn-txt     : Text      : autoXauto:x:auto,y:12: style:btn-lbl, fill:textOnDark

@subcomponents
  CornerTL  : inline
    @tokens   fill:live
    @layers   bracket:SVG:12x12:x:0,y:0:fill:currentColor
  CornerBR  : inline
    @tokens   fill:live
    @layers   bracket:SVG:12x12:x:0,y:0:fill:currentColor
  ChevronDown : inline
    @tokens   fill:vaultMid@30%white
    @layers   chevron:SVG:24x24:x:0,y:0:fill:currentColor

@variants
  (ninguna — un único estado)

@states
  [x] default  : acordeón abierto, dot verde "Disponible", skeleton de fechas, CTA "Ingresa"
  [ ] hover    : (futuro)
  [ ] focus    : (futuro)
  [ ] active   : (futuro) toggle acordeón
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function VisitasStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="visitas"
      title="visitas"
      description="317×429px · accordion card · corner brackets · skeleton placeholders · CTA"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import Visitas from "@/features/Visitas/Visitas";'
      figmaSpec={VISITAS_FIGMA_SPEC}
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--vmc-color-background-secondary)",
        }}
      >
        <Visitas />
      </div>
    </ComponentShowcase>
  );
}
