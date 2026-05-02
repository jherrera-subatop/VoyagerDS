"use client";
import type { JSX } from "react";
import RelatedCard from "@/features/RelatedCard/RelatedCard";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "related-card-pending";

const RELATED_CARD_FIGMA_SPEC = `@figma-spec
@component    RelatedCard | 317x464 | Page:Stitch

@tokens
  vault       : --voyager-color-vault     : #22005C
  vaultMid    : --voyager-color-vault-mid : #3B1782
  live        : --voyager-color-live      : #ED8936
  negotiable  : --voyager-color-negotiable: #00CACE
  surfaceCard : --voyager-surface-card    : #FFFFFF
  textPrimary : --voyager-text-primary    : #191C1C
  textOnDark  : --voyager-text-on-dark    : #FFFFFF
  shadowSm    : 0 8px 16px rgba(34,0,92,0.06)
  shadowMd    : 0 8px 16px rgba(0,0,0,0.10)

@typography
  heading   : Plus Jakarta Sans | Bold     | 20px | lh:28px | "Ofertas Relacionadas"
  name      : Plus Jakarta Sans | SemiBold | 13px | lh:18px | "BMW X1"
  year      : Plus Jakarta Sans | Medium   | 10px | lh:14px | "2025" (uppercase, tracking 0.06em)
  price     : Roboto Mono       | Bold     | 11px | lh:1    | "US$ 14,999" (tabular-nums)

@layers
  root        : COMPONENT : 317x464 : x:0,  y:0  : fill:surfaceCard, shadow:shadowSm, radius:4px, padding:24
  accent-bar  : Rect      : 3x28    : x:24, y:24 : fill:vaultGrad, radius:9999
  heading-txt : Text      : autoXauto:x:37,y:24 : style:heading, fill:vaultMid
  grid        : Frame     : 269x400 : x:24, y:64 : fill:none, grid:2cols, gap:8
  card        : Frame     : 130xAuto: x:var,y:var: fill:surfaceCard, borderBottom:8px solid live, radius:4px, overflow:hidden
  card-img    : Image     : 130x112 : x:0,  y:0  : fill:cover
  price-chip  : Frame     : autoXauto:x:8,y:8 : fill:vaultGrad, radius:9999, shadow:0 2px 8px rgba(34,0,92,0.30)
  coin-icon   : SVG       : 14x14   : x:8,  y:4  : fill:#FFFFFF
  price-txt   : Text      : autoXauto:x:28,y:4 : style:price, fill:textOnDark
  heart-btn   : INSTANCE  : 28x28   : x:94, y:80 : fill:surfaceCard, shadow:shadowMd
  name-txt    : Text      : autoXauto:x:12,y:120: style:name, fill:textPrimary
  year-txt    : Text      : autoXauto:x:12,y:142: style:year, fill:vaultMid

@subcomponents
  Card     : inline
    @tokens   bg:surfaceCard | border:live | shadow:shadowSm
    @layers   card:Frame:130xAuto:x:0,y:0:fill:surfaceCard
  CoinIcon : inline
    @tokens   fill:#FFFFFF (on vault gradient)
    @layers   coin:SVG:14x14:x:0,y:0:fill:white
  HeartIcon: inline
    @tokens   fill:vaultMid (currentColor)
    @layers   heart:SVG:14x14:x:0,y:0:fill:currentColor

@variants
  (ninguna — un único estado)

@states
  [x] default  : panel blanco con grid 2×2 de mini-cards, border-b live, price chip vault gradient
  [ ] hover    : (futuro)
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function RelatedCardStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="related-card"
      title="related-card"
      description="317×464px · Ofertas Relacionadas · grid 2 cols · border-b-8 live accent"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import RelatedCard from "@/features/RelatedCard/RelatedCard";'
      figmaSpec={RELATED_CARD_FIGMA_SPEC}
    >
      <div
        style={{
          display:         "flex",
          justifyContent:  "center",
          padding:         "32px 24px",
          background:      "var(--vmc-color-background-secondary)",
        }}
      >
        <RelatedCard />
      </div>
    </ComponentShowcase>
  );
}
