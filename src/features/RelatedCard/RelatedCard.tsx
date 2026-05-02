/**
 * @figma-spec
 * @component    RelatedCard | 317x464 | Page:Stitch
 *
 * @tokens
 *   vault       : --voyager-color-vault     : #22005C
 *   vaultMid    : --voyager-color-vault-mid : #3B1782
 *   live        : --voyager-color-live      : #ED8936
 *   negotiable  : --voyager-color-negotiable: #00CACE
 *   surfaceCard : --voyager-surface-card    : #FFFFFF
 *   textPrimary : --voyager-text-primary    : #191C1C
 *   textOnDark  : --voyager-text-on-dark    : #FFFFFF
 *   shadowSm    : 0 8px 16px rgba(34,0,92,0.06)
 *   shadowMd    : 0 8px 16px rgba(0,0,0,0.10)
 *
 * @typography
 *   heading   : Plus Jakarta Sans | Bold    | 20px | lh:28px | "Ofertas Relacionadas"
 *   name      : Plus Jakarta Sans | SemiBold| 13px | lh:18px | "BMW X1"
 *   year      : Plus Jakarta Sans | Medium  | 10px | lh:14px | "2025" (uppercase, tracking 0.06em)
 *   price     : Roboto Mono       | Bold    | 11px | lh:1    | "US$ 14,999" (tabular-nums)
 *
 * @layers
 *   root        : COMPONENT : 317x464 : x:0,  y:0  : fill:surfaceCard, shadow:shadowSm, radius:4px, padding:24
 *   accent-bar  : Rect      : 3x28    : x:24, y:24 : fill:vaultGrad, radius:9999
 *   heading-txt : Text      : autoXauto:x:37,y:24 : style:heading, fill:vaultMid
 *   grid        : Frame     : 269x400 : x:24, y:64 : fill:none, grid:2cols, gap:8
 *   card        : Frame     : 130xAuto: x:var,y:var: fill:surfaceCard, borderBottom:8px solid live, radius:4px, overflow:hidden
 *   card-img    : Image     : 130x112 : x:0,  y:0  : fill:cover
 *   price-chip  : Frame     : autoXauto:x:8,y:8 : fill:vaultGrad, radius:9999, shadow:0 2px 8px rgba(34,0,92,0.30)
 *   coin-icon   : SVG       : 14x14   : x:8,  y:4  : fill:#FFFFFF
 *   price-txt   : Text      : autoXauto:x:28,y:4 : style:price, fill:textOnDark
 *   heart-btn   : INSTANCE  : 28x28   : x:94, y:80 : fill:surfaceCard, shadow:shadowMd
 *   name-txt    : Text      : autoXauto:x:12,y:120: style:name, fill:textPrimary
 *   year-txt    : Text      : autoXauto:x:12,y:142: style:year, fill:vaultMid
 *
 * @subcomponents
 *   Card     : inline
 *     @tokens   bg:surfaceCard | border:live | shadow:shadowSm
 *     @layers   card:Frame:130xAuto:x:0,y:0:fill:surfaceCard
 *   CoinIcon : inline
 *     @tokens   fill:#FFFFFF (on vault gradient)
 *     @layers   coin:SVG:14x14:x:0,y:0:fill:white
 *   HeartIcon: inline
 *     @tokens   fill:vaultMid (currentColor)
 *     @layers   heart:SVG:14x14:x:0,y:0:fill:currentColor
 *
 * @variants
 *   (ninguna — un único estado)
 *
 * @states
 *   [x] default  : panel blanco con grid 2×2 de mini-cards, border-b live, price chip vault gradient
 *   [ ] hover    : (futuro)
 *   [ ] focus    : (futuro)
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

/**
 * RelatedCard — UI Upgrade v2
 * Estructura 100% preservada · 317×464px · VOYAGER v2.1.0
 *
 * Fixes:
 *   - maxWidth: 317 → contiene el bloque en cualquier viewport
 *   - Price chip: vault bg + white text (más contraste, más premium)
 *   - Texto cards: name 13/600, year 11/500 uppercase vaultMid (overline)
 *   - Heading: acento vault izq + single line
 *
 * Token map:
 *   text-purple-100   → --voyager-color-vault-mid   (h3 heading)
 *   text-purple-900   → --voyager-text-primary       (nombres)
 *   text-purple-300   → --voyager-color-vault-mid    (heart icon, year)
 *   border-yellow-500 → --voyager-color-live          (8px bottom accent)
 *   bg-yellow-100     → vault gradient chip (price badge)
 *   text-turquoise-900→ white on vault chip
 *   SVG #9AFCF4       → --voyager-color-negotiable @ 55%
 *   SVG #367976       → --voyager-color-negotiable
 */

import type { JSX } from "react";

const V = {
  vault:       "var(--vmc-color-background-brand)",
  vaultMid:    "var(--vmc-color-vault-700)",
  vaultGrad:   "linear-gradient(135deg, var(--vmc-color-background-brand) 0%, var(--vmc-color-vault-700) 100%)",
  live:        "var(--vmc-color-card-border-live)",
  negotiable:  "var(--vmc-color-status-negotiable)",
  surfaceCard: "var(--vmc-color-background-card)",
  textPrimary: "var(--vmc-color-text-primary)",
  textOnDark:  "var(--vmc-color-text-inverse)",
  textMuted:   "var(--vmc-color-text-secondary)",
  shadowSm:    "var(--vmc-shadow-sm)",
  shadowMd:    "var(--vmc-shadow-md)",
} as const;

const fontDisplay = "var(--vmc-font-display)";
const fontMono    = "var(--vmc-font-mono)";

interface CardItem {
  href:  string;
  img:   string;
  price: string;
  name:  string;
  year:  string;
}

const CARDS: CardItem[] = [
  { href: "/oferta/61484", img: "/demo/bronco.jpg", price: "US$ 14,999", name: "BMW X1",       year: "2025" },
  { href: "/oferta/61487", img: "/demo/bronco.jpg", price: "US$ 1,499",  name: "Ford Ranger",  year: "2001" },
  { href: "/oferta/61486", img: "/demo/bronco.jpg", price: "US$ 2,499",  name: "Nissan Versa", year: "2021" },
  { href: "/oferta/61488", img: "/demo/bronco.jpg", price: "US$ 2,999",  name: "BMW X5",       year: "2008" },
];

/* ── Coin SVG ───────────────────────────────────────────────── */
function CoinIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      style={{ flexShrink: 0 }}>
      <path d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z"
        fill="white" fillOpacity="0.6" />
      <path d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23ZM12 12.4C11.8 12.4 11.7 12.5 11.6 12.5L2.8 16.2C2.3 16.4 2.1 16.8 2.1 17.2 2.1 17.6 2.3 18 2.8 18.2L11.6 21.9C11.8 22 12.2 22 12.4 21.9L21.2 18.2C21.7 18 21.9 17.6 21.9 17.2 21.9 16.8 21.7 16.4 21.2 16.2L12.4 12.5C12.3 12.5 12.2 12.4 12 12.4Z"
        fill="white" />
      <path d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z"
        fill="white" fillOpacity="0.9" />
      <path d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5L12.4 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10 11.7 10 11.7 10 11.8 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.3C11.3 8.1 10.9 7.9 10.9 7.4ZM12.4 11.7V10.2C12.9 10.4 13.2 10.6 13.2 11 13.2 11.4 12.9 11.7 12.4 11.7Z"
        fill="var(--vmc-color-background-brand)" />
    </svg>
  );
}

/* ── Heart SVG ──────────────────────────────────────────────── */
function HeartIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      style={{ fill: "currentColor" }}>
      <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Single card ─────────────────────────────────────────────── */
function Card({ card }: { card: CardItem }): JSX.Element {
  return (
    <div style={{
      position:     "relative",
      width:        "100%",
      background:   V.surfaceCard,
      borderBottom: `8px solid ${V.live}`,
      borderRadius: 4,
      boxShadow:    V.shadowSm,
      overflow:     "hidden",
    }}>

      {/* Image area */}
      <div style={{ position: "relative", width: "100%", height: 112 }}>

        {/* Price chip — vault gradient pill */}
        <div style={{
          position:        "absolute",
          top:             8,
          left:            8,
          display:         "inline-flex",
          alignItems:      "center",
          gap:             4,
          paddingLeft:     8,
          paddingRight:    8,
          paddingTop:      4,
          paddingBottom:   4,
          background:      V.vaultGrad,
          borderRadius:    9999,
          boxShadow:       "0 2px 8px rgba(34,0,92,0.30)",
          zIndex:          2,
        }}>
          <CoinIcon />
          <span style={{
            fontFamily:         fontMono,
            fontSize:           11,
            fontWeight:         700,
            lineHeight:         1,
            letterSpacing:      "0.02em",
            fontVariantNumeric: "tabular-nums",
            color:              V.textOnDark,
          }}>
            {card.price}
          </span>
        </div>

        {/* Image link */}
        <a href={card.href} style={{ display: "block", width: "100%", height: "100%" }}>
          <img
            loading="lazy"
            src={card.img}
            alt={card.name}
            style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
          />
        </a>

        {/* Badge row placeholder */}
        <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 8, bottom: 8, left: 8, zIndex: 2 }} />

        {/* Heart button */}
        <div style={{ position: "absolute", bottom: 8, right: 8, zIndex: 2 }}>
          <button
            aria-label="me interesa"
            type="button"
            style={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           28,
              height:          28,
              background:      V.surfaceCard,
              borderRadius:    9999,
              boxShadow:       V.shadowMd,
              border:          "none",
              cursor:          "pointer",
              color:           V.vaultMid,
              outline:         "none",
              transition:      "color 120ms ease, transform 120ms ease",
            }}
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* Text area */}
      <div style={{
        paddingLeft:   12,
        paddingRight:  12,
        paddingTop:    10,
        paddingBottom: 12,
      }}>
        <a href={card.href} style={{ display: "block", textDecoration: "none" }}>
          {/* Vehicle name */}
          <h4 style={{
            fontFamily:   fontDisplay,
            fontSize:     13,
            fontWeight:   600,
            lineHeight:   "18px",
            color:        V.textPrimary,
            overflow:     "hidden",
            whiteSpace:   "nowrap",
            textOverflow: "ellipsis",
            margin:       0,
          }}>
            {card.name}
          </h4>
          {/* Year — overline style */}
          <p style={{
            fontFamily:    fontDisplay,
            fontSize:      10,
            fontWeight:    500,
            lineHeight:    "14px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color:         V.vaultMid,
            margin:        0,
            marginTop:     2,
          }}>
            {card.year}
          </p>
        </a>
      </div>
    </div>
  );
}

/* ── Root ────────────────────────────────────────────────────── */
export default function RelatedCard(): JSX.Element {
  return (
    <div style={{
      width:         "100%",
      maxWidth:      317,          /* ← contiene el bloque; no expande en 1024+ */
      paddingLeft:   24,
      paddingRight:  24,
      paddingTop:    24,
      paddingBottom: 24,
      marginTop:     16,
      background:    V.surfaceCard,
      borderRadius:  4,
      boxShadow:     V.shadowSm,
    }}>

      {/* Heading con acento vault izquierdo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 3, height: 28, background: V.vaultGrad, borderRadius: 9999, flexShrink: 0 }} />
        <h3 style={{
          fontFamily: fontDisplay,
          fontSize:   20,
          fontWeight: 700,
          lineHeight: "28px",
          color:      V.vaultMid,
          margin:     0,
        }}>
          Ofertas Relacionadas
        </h3>
      </div>

      {/* Grid 2 cols */}
      <div id="related-offers" style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 8,
        marginTop:           16,
      }}>
        {CARDS.map(function renderCard(card) {
          return <Card key={card.href} card={card} />;
        })}
      </div>
    </div>
  );
}
