"use client";
import type { JSX } from "react";
import AuctionConditions from "@/features/AuctionConditions/AuctionConditions";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "conditions-pending";

const AUCTION_CONDITIONS_FIGMA_SPEC = `@figma-spec
@component    AuctionConditions | 317x190 | Page:Stitch

@tokens
  vault    : --color-vault         : #22005C
  skeleton : --color-skeleton      : #C8CACC
  onDark   : --color-text-on-dark  : #FFFFFF
  surface  : --color-surface-card  : #FFFFFF

@typography
  chip-label : Plus Jakarta Sans | Medium | 12px | lh:tight | "Con Precio Reserva" etc.

@layers
  root         : COMPONENT : 317x190 : x:0,  y:0  : fill:surface, radius:0 0 16 16, shadow:0 8px 16px oklch(0.22 0.18 285/6%), padding:8
  chip-active  : Frame     : 145x42  : x:8,  y:var: fill:vault, radius:4px
  chip-inactive: Frame     : 145x42  : x:var,y:var: fill:skeleton, radius:4px
  chip-txt     : Text      : autoXauto:x:8,y:14  : style:chip-label, fill:onDark

@subcomponents
  ConditionChip : inline
    @tokens   bg:vault (active) | bg:skeleton (inactive) | txt:onDark
    @layers   chip:Frame:145x42:x:0,y:0:fill:var

@variants
  prop: variant (per ConditionChip)
    [x] active   : fondo vault, texto blanco
    [x] inactive : fondo skeleton gris, texto blanco

@states
  [x] default  : 5 chips distribuidos en 2 columnas: 3 activos (vault), 2 inactivos (skeleton)
  [ ] hover    : (futuro)
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function AuctionConditionsStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="conditions"
      title="AuctionConditions"
      description="317x190px"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import AuctionConditions from "@/features/AuctionConditions/AuctionConditions";'
      figmaSpec={AUCTION_CONDITIONS_FIGMA_SPEC}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px", background: "var(--color-surface-section, #F2F4F3)" }}>
        <AuctionConditions />
      </div>
    </ComponentShowcase>
  );
}
