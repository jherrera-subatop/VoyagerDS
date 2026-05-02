"use client";
import type { JSX } from "react";
import QuickFilters from "@/features/QuickFilters/QuickFilters";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "quick-filters-pending";

const QUICK_FILTERS_FIGMA_SPEC = `@figma-spec
@component    QuickFilters | 766x152 | Page:Stitch

@tokens
  vaultMid    : --voyager-color-vault-mid  : #3B1782
  negotiable  : --voyager-color-negotiable : #00CACE
  live        : --voyager-color-live       : #ED8936
  surfaceCard : --voyager-surface-card     : #FFFFFF
  textOnDark  : --voyager-text-on-dark     : #FFFFFF
  shadowLg    : 0 10px 15px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)

@typography
  section-label : Plus Jakarta Sans | Bold     | 12px | lh:16px | "TIPO DE OFERTA" (uppercase)
  tab-label     : Plus Jakarta Sans | Bold     | 12px | lh:auto | "NEGOCIABLE" | "EN VIVO" (uppercase)
  ver-todas     : Plus Jakarta Sans | Bold     | 10px | lh:auto | "VER TODAS" (uppercase)
  cat-label     : Plus Jakarta Sans | SemiBold | 9px  | lh:12px | "VEHICULAR" (uppercase)

@layers
  root          : COMPONENT  : 766x152 : x:0,   y:0  : fill:vaultMid, radius:4px, padding:20
  left-col      : Frame      : 253x112 : x:20,  y:20 : fill:none
  section-hdr-L : Frame      : autoXauto:x:0,y:0    : fill:none (corner brackets)
  offer-grid    : Frame      : 253x64  : x:0,  y:32 : fill:none, grid:2cols, gap:20
  neg-card      : Frame      : autoXauto:x:0,y:0 : fill:surfaceCard, radius:4px, shadow:shadowLg
  live-card     : Frame      : autoXauto:x:0,y:0 : fill:surfaceCard, radius:4px, shadow:shadowLg
  right-col     : Frame      : 447x112 : x:299, y:20 : fill:none
  section-hdr-R : Frame      : autoXauto:x:0,y:0    : fill:none (corner brackets)
  cat-row       : Frame      : 447x64  : x:0,  y:32 : fill:none, flex:row, gap:12
  cat-card      : Frame      : 64x64   : x:var, y:0 : fill:surfaceCard, radius:4px, padding:8
  cat-icon      : SVG        : 32x32   : x:16, y:8  : fill:vaultMid
  cat-label-txt : Text       : autoXauto:x:4,y:44 : style:cat-label, fill:vaultMid@75%white

@subcomponents
  OfferCard     : inline
    @tokens   bg:surfaceCard | tabColor:negotiable|live | shadow:shadowLg
    @layers   card:Frame:autoX64:x:0,y:0:fill:surfaceCard
  CategoryCard  : inline
    @tokens   bg:surfaceCard | icon:vaultMid
    @layers   card:Frame:64x64:x:0,y:0:fill:surfaceCard
  SectionHeader : inline
    @tokens   txt:textOnDark | corners:textOnDark
    @layers   hdr:Frame:autoXauto:x:0,y:0:fill:none
  CornerTL      : inline
    @tokens   fill:textOnDark
    @layers   bracket:SVG:8x8:x:0,y:0:fill:currentColor
  CornerBR      : inline
    @tokens   fill:textOnDark
    @layers   bracket:SVG:8x8:x:0,y:0:fill:currentColor

@variants
  (ninguna — un único estado)

@states
  [x] default  : fondo vaultMid, 2 secciones Tipo de oferta y Categorías con sus cards
  [ ] hover    : (futuro)
  [ ] focus    : (futuro)
  [ ] active   : (futuro)
  [ ] disabled : n/a
  [ ] loading  : n/a
  [ ] error    : n/a`;

export function QuickFiltersStitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase
      id="quick-filters"
      title="quick-filters"
      description="766×152px · Tipo de oferta + Categorías · corner brackets · vault-mid bg"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import QuickFilters from "@/features/QuickFilters/QuickFilters";'
      figmaSpec={QUICK_FILTERS_FIGMA_SPEC}
    >
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          padding:        "32px 24px",
          background:     "var(--vmc-color-background-secondary)",
        }}
      >
        <QuickFilters />
      </div>
    </ComponentShowcase>
  );
}
