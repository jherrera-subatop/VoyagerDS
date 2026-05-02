"use client";
import type { JSX } from "react";
import HeroBanner from "@/features/HeroBanner/HeroBanner";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "hero-banner-pending";

const HERO_BANNER_FIGMA_SPEC = `@figma-spec
@component    HeroBanner | 766x272 | Page:Stitch

@tokens
  vault      : --voyager-color-vault        : #22005C
  vaultMid   : --voyager-color-vault-mid    : #3B1782
  live       : --voyager-color-live         : #ED8936
  negotiable : --voyager-color-negotiable   : #00CACE
  onDark     : --voyager-text-on-dark       : #FFFFFF

@typography
  badge    : Plus Jakarta Sans | Bold     | 11px | lh:auto | "EN VIVO"
  titulo   : Plus Jakarta Sans | Bold     | 24px | lh:30px | "Pacífico"
  rating   : Plus Jakarta Sans | SemiBold | 13px | lh:auto | "4.3"
  modelo   : Plus Jakarta Sans | SemiBold | 14px | lh:auto | "BMW X1"
  precio   : Roboto Mono       | Bold     | 26px | lh:32px | "US$ 14,999"
  fecha    : Roboto            | Regular  | 12px | lh:auto | "FRI 01/05"
  cta      : Plus Jakarta Sans | Bold     | 13px | lh:18px | "Ver más"
  ref      : Roboto            | Italic   | 10px | lh:auto | "*Imagen referencial"

@layers
  root       : COMPONENT : 766x272 : x:0,   y:0  : fill:linear-gradient(135deg,live 0%,#D4631A 30%,vaultMid 60%,vault 100%)
  coins      : Group     : 766x272 : x:0,   y:0  : fill:rgba(255,255,255,0.12) stroke:rgba(255,255,255,0.40)
  contenido  : Frame     : 340xAuto: x:28,  y:50%: fill:none
  badge-pill : Frame     : autoXauto:x:0,  y:0  : fill:vault
  titulo-txt : Text      : autoXauto:x:0,  y:32 : fill:onDark
  precio-txt : Text      : autoXauto:x:0,  y:114: fill:onDark
  cta-btn    : Frame     : autoXauto:x:0,  y:144: fill:negotiable
  mini-cards : Group     : 474x272 : x:292, y:0  : fill:none

@subcomponents
  MiniCard : inline
    @tokens   bg:#FFFFFF | border:live
    @layers   card-root:Frame:142xAuto:x:var,y:var:fill:#FFFFFF,borderBottom:4px live
  Coin     : inline
    @tokens   fill:rgba(255,255,255,0.12) | stroke:rgba(255,255,255,0.40)
    @layers   coin-circle:Ellipse:40x40:x:var,y:var:fill:rgba(255,255,255,0.12)

@variants
  (ninguna — un único estado)

@states
  [x] default  : banner gradiente vault/live, fan de 3 mini-cards a la derecha, monedas decorativas
  [ ] hover    : (futuro)
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function HeroBannerStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="hero-banner"
      title="hero-banner"
      description="766×272px · vault gradient · auto + contenido · CTA live"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import HeroBanner from "@/features/HeroBanner/HeroBanner";'
      figmaSpec={HERO_BANNER_FIGMA_SPEC}
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--vmc-color-background-secondary)",
        }}
      >
        <HeroBanner />
      </div>
    </ComponentShowcase>
  );
}
