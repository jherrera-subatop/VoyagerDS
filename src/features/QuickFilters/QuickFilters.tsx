/**
 * @figma-spec
 * @component    QuickFilters | 766x152 | Page:Stitch
 *
 * @tokens
 *   surfaceSection : --vmc-color-background-secondary : rgb(94.9% 95.69% 95.29%)  [light neutral bg]
 *   brand          : --vmc-color-background-brand      : #22005C                  [vault-900, text/icons]
 *   borderSubtle   : --vmc-color-border-subtle         : vault-utility-divider    [container border]
 *   shadowSm       : --vmc-shadow-sm                   : 0 8px 16px 0 rgb(13.33% 0% 36.08% / 0.06)
 *
 * @typography
 *   section-label : Plus Jakarta Sans | Bold | 12px | lh:16px | uppercase | color:brand
 *   tab-label     : [ver OfferTypeTile @figma-spec]
 *   ver-todas     : [ver OfferTypeTile @figma-spec]
 *   cat-label     : [ver CategoryTile @figma-spec]
 *
 * @layers
 *   root          : COMPONENT  : 766x152 : x:0,   y:0  : fill:surfaceSection, border:1px borderSubtle, radius:8px, padding:20
 *   inner         : Frame      : 726x112 : x:20,  y:20 : fill:none, flex:row, justify:space-between
 *   left-col      : Frame      : 33%x112 : x:0,   y:0  : fill:none
 *   section-hdr-L : Frame      : autoXauto:x:0,y:0 : fill:none, relative (CornerTL + CornerBR)
 *   offer-grid    : Frame      : 100%x64 : x:0,  y:32 : fill:none, grid:2cols, gap:20
 *   right-col     : Frame      : 58%x112 : x:var, y:0  : fill:none
 *   section-hdr-R : Frame      : autoXauto:x:0,y:0 : fill:none, relative (CornerTL + CornerBR)
 *   cat-row       : Frame      : 100%x64 : x:0,  y:32 : fill:none, grid:4cols, gap:10
 *
 * @subcomponents
 *   OfferTypeTile : @/features/OfferTypeTile/OfferTypeTile
 *     @variants   negociable | en-vivo
 *     @layers     card:Frame:autoX64:fill:surfaceCard,radius:4px,shadow:shadowSm
 *   CategoryTile  : @/features/CategoryTile/CategoryTile
 *     @variants   vehicular | maquinaria | equipos-diversos | articulos-diversos
 *     @layers     card:Frame:1frXauto:fill:surfaceCard,radius:10px,border,shadow:shadowSm
 *   SectionHeader : inline
 *     @tokens     txt:brand | corners:brand
 *     @layers     hdr:Frame:autoXauto:x:0,y:0:padding:8 12:fill:none:relative
 *   CornerTL      : inline
 *     @tokens     fill:brand
 *     @layers     bracket:SVG:8x8:x:0,y:0:absolute:fill:currentColor
 *   CornerBR      : inline
 *     @tokens     fill:brand
 *     @layers     bracket:SVG:8x8:bottom:0,right:0:absolute:fill:currentColor
 *
 * @variants
 *   (ninguna — un único estado)
 *
 * @states
 *   [x] default  : fondo claro (surfaceSection), 2 columnas: Tipo de oferta (2 tiles) + Categorías (4 tiles)
 *   [ ] hover    : (futuro — delegado a OfferTypeTile y CategoryTile)
 *   [ ] focus    : (futuro — delegado a OfferTypeTile y CategoryTile)
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

/**
 * QuickFilters — UI Upgrade
 * 766×152px · Tipo de oferta + Categorías · VOYAGER v2.1.0
 *
 * Token map (--vmc-* · Terrazzo-generated):
 *   container bg  → --vmc-color-background-secondary  (light neutral section)
 *   border        → --vmc-color-border-subtle
 *   brand/icons   → --vmc-color-background-brand      (vault-900 dark, used as fg color)
 *   radius        → 8px
 */

import type { JSX } from "react";
import CategoryTile from "@/features/CategoryTile/CategoryTile";
import OfferTypeTile from "@/features/OfferTypeTile/OfferTypeTile";

const V = {
  container: "var(--vmc-color-background-secondary)",
  border:    "var(--vmc-color-border-subtle)",
  brand:     "var(--vmc-color-background-brand)",
} as const;

const fontDisplay = "var(--vmc-font-display)";

/* ── Corner bracket — top-left ──────────────────────────────── */
function CornerTL(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10" height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{ position: "absolute", top: 0, left: 0, width: 8, height: 8,
               fill: "currentColor", color: V.brand }}
    >
      <path d="M0 0H3.3V3.3H3.3V6.7H0V3.3H0V0ZM3.3 0H6.7 6.7 10V3.3H6.7 6.7 3.3V0ZM3.3 6.7H0V10H3.3V6.7Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Corner bracket — bottom-right ─────────────────────────── */
function CornerBR(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10" height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8,
               fill: "currentColor", color: V.brand }}
    >
      <path d="M10 10L6.7 10 6.7 6.7 6.7 6.7 6.7 3.3 10 3.3 10 6.7 10 6.7 10 10ZM6.7 10L3.3 10 3.3 10 0 10 0 6.7 3.3 6.7 3.3 6.7 6.7 6.7 6.7 10ZM6.7 3.3L10 3.3 10 0 6.7 0 6.7 3.3Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Section header with corner brackets ────────────────────── */
function SectionHeader({ title }: { title: string }): JSX.Element {
  return (
    <div>
      <div style={{ position: "relative", display: "inline-block", padding: "8px 12px" }}>
        <CornerTL />
        <h3 style={{
          fontFamily:    fontDisplay,
          fontSize:      12,
          fontWeight:    700,
          lineHeight:    "16px",
          color:         V.brand,
          textTransform: "uppercase",
          margin:        0,
        }}>
          {title}
        </h3>
        <CornerBR />
      </div>
    </div>
  );
}

/* ── Root component ──────────────────────────────────────────── */
export default function QuickFilters(): JSX.Element {
  return (
    <div style={{
      width:        "100%",
      maxWidth:     766,
      paddingLeft:  20,    /* px-5 */
      paddingRight: 20,
      paddingTop:   20,    /* py-5 */
      paddingBottom:20,
      marginTop:    12,    /* mt-3 */
      background:   V.container,
      border:       `1px solid ${V.border}`,
      borderRadius: 8,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

        {/* LEFT — Tipo de oferta (w-4/12 ≈ 33%) */}
        <div style={{ width: "33.33%" }}>
          <SectionHeader title="Tipo de oferta" />

          {/* 2-col grid of offer type cards */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop:           16,
            gap:                 20,    /* gap-x-5 */
          }}>
            <OfferTypeTile href="/negociable" variant="negociable" />
            <OfferTypeTile href="/en-vivo"   variant="en-vivo"    />
          </div>
        </div>

        {/* RIGHT — Categorías (w-7/12 ≈ 58%) */}
        <div style={{ width: "58.33%" }}>
          <SectionHeader title="Categorías" />

          <div style={{ marginTop: 16 }}>
            {/* SSR data div — preserved, display:none */}
            <div
              id="ssr-categories-data"
              data-categories='[{"name":"Vehicular","icon":"vehicle","url":"https://www.vmcsubastas.com/subastas/vehicular.html"},{"name":"Maquinaria","icon":"transport","url":"https://www.vmcsubastas.com/subastas/maquinaria.html"},{"name":"Equipos diversos","icon":"box","url":"https://www.vmcsubastas.com/subastas/equiposdiversos.html"},{"name":"Artículos diversos","icon":"category","url":"https://www.vmcsubastas.com/subastas/articulosdiversos.html"}]'
              style={{ display: "none" }}
            />

            {/* Category cards row — grid 4 cols fills exactly the right column */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:                 10,
            }}>
              <CategoryTile href="https://www.vmcsubastas.com/subastas/vehicular.html"      variant="vehicular" />
              <CategoryTile href="https://www.vmcsubastas.com/subastas/maquinaria.html"      variant="maquinaria" />
              <CategoryTile href="https://www.vmcsubastas.com/subastas/equiposdiversos.html" variant="equipos-diversos" />
              <CategoryTile href="https://www.vmcsubastas.com/subastas/articulosdiversos.html" variant="articulos-diversos" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
/ /   p r u e b a   c o d e r a b b i t  
 