/**
 * OfferCard — UI Upgrade · VOYAGER v2.3.0
 *
 * @figma-spec
 * @component    OfferCard | 176x232 | Page:Stitch
 * @description  Tarjeta de oferta de vehículo. Dos variantes, estados por variante.
 *               Estructura: image-area 176×112 + content-area 176×112 + border-bottom 8px = 232px total.
 *
 * @tokens
 *   surface      : --vmc-color-background-card          : #FFFFFF
 *   border-live  : --vmc-color-card-border-live         : #ED8936
 *   border-neg   : --vmc-color-card-border-negotiable   : #00CACE
 *   border-closed: --vmc-color-card-border-closed       : #D1D5DC
 *   text-normal  : --vmc-color-vault-700                : #3B1782
 *   text-muted   : --vmc-color-text-price-label         : #99A1AF
 *   price-color  : --vmc-color-cyan-800                 : #008688
 *   live-dot     : --vmc-color-badge-live-bg            : #ED8936
 *   skeleton-bg  : --vmc-color-background-disabled      : #E1E3E2
 *
 * @typography
 *   name  : Plus Jakarta Sans | Bold    | 16px | lh:20px | "Kia Soluto"
 *   year  : Plus Jakarta Sans | Medium  | 11px | lh:16px | uppercase tracking:0.06em | "2022"
 *   price : Roboto Mono       | Bold    | 12px | lh:20px | tabular-nums | "US$ 4,399"
 *             — 12px soporta hasta 6 cifras (US$ 100,000) sin colisión con heart-btn
 *
 * @layers
 *   root         : COMPONENT  : 176x232 : x:0,   y:0   : fill:surface
 *   image-area   : Frame      : 176x112 : x:0,   y:0   : overflow:hidden, radius-top:8
 *     img        : Image      : 176x112 : x:0,   y:0   : object-fit:cover
 *     dot        : Frame      : 14x14   : x:154, y:8   : fill:live-dot, radius:9999 — solo state=live/proximo
 *   content-area : Frame      : 176x112 : x:0,   y:112 : padding:16 12, position:relative
 *     name       : Text       : 152x20  : x:12,  y:128 : fill:text-normal — truncate
 *     year       : Text       : 152x16  : x:12,  y:150 : fill:text-normal — uppercase
 *     price-row  : Frame      : 152x24  : x:12,  y:196 : flex:row,align:center — SOLO variant=en-vivo
 *       coin-icon: SVG        : 24x24   : x:0,   y:0   : fill:price-color
 *       price    : Text       : auto×20 : x:28,  y:2   : fill:price-color, flex:1 — max ~108px antes de heart
 *     heart-btn  : Ellipse    : 32x32   : x:132, y:188 : position:absolute, fill:surface + shadow:shadow-md
 *                                                         color:text-normal (publicada/live/proximo) |
 *                                                         color:text-muted  (expirado)               |
 *                                                         fill:skeleton-bg, sin sombra (skeleton)
 *
 * @variants
 *   prop: variant
 *     [x] en-vivo    : border-bottom 8px border-live (#ED8936) · con price-row
 *     [x] negociable : border-bottom 8px border-neg  (#00CACE) · sin price-row
 *   prop: state
 *     [x] publicada  : card normal · imagen color · texto text-normal
 *     [x] live       : igual publicada + dot naranja pulsante top-right imagen (solo en-vivo)
 *     [x] proximo    : igual publicada + dot naranja con ícono reloj (solo en-vivo)
 *     [x] expirado   : imagen grayscale(1) opacity(0.55) · border border-closed (#D1D5DC) · texto text-muted
 *     [x] skeleton   : barras skeleton-bg · border border-closed · sin texto ni imagen real (idéntico ambas variantes)
 *
 * @combinations
 *   [x] variant=en-vivo,    state=publicada
 *   [x] variant=en-vivo,    state=live
 *   [x] variant=en-vivo,    state=proximo
 *   [x] variant=en-vivo,    state=expirado
 *   [x] variant=en-vivo,    state=skeleton
 *   [x] variant=negociable, state=publicada
 *   [x] variant=negociable, state=expirado
 *   [x] variant=negociable, state=skeleton
 *
 * @states-interactive
 *   [ ] hover   : futuro
 *   [ ] focus   : futuro
 *   [ ] active  : futuro
 *   [ ] disabled: n/a
 */

"use client";

import type { CSSProperties, JSX } from "react";
import PriceIcon from "@/features/PriceIcon/PriceIcon";
import type { PriceIconState } from "@/features/PriceIcon/PriceIcon";

export type OfferCardVariant = "en-vivo" | "negociable";
export type OfferCardState   = "publicada" | "live" | "proximo" | "expirado" | "skeleton";

interface OfferCardProps {
  variant?:  OfferCardVariant;
  state?:    OfferCardState;
  name?:     string;
  year?:     string;
  price?:    string;
  imageSrc?: string;
  href?:     string;
}

const V = {
  vaultMid:       "var(--vmc-color-vault-700)",
  live:           "var(--vmc-color-card-border-live)",
  negotiable:     "var(--vmc-color-card-border-negotiable)",
  closed:         "var(--vmc-color-card-border-closed)",
  surfaceCard:    "var(--vmc-color-background-card)",
  textMuted:      "var(--vmc-color-text-price-label)",
  negotiableText: "var(--vmc-color-cyan-800)",
  liveDot:        "var(--vmc-color-badge-live-bg)",
  skeletonBg:     "var(--vmc-color-background-disabled)",
  shadowSm:       "var(--vmc-shadow-sm)",
  shadowMd:       "var(--vmc-shadow-md)",
} as const;

const CARD_W   = 176;
const IMG_H    = 112;
const CONT_H   = 112;

const fontDisplay = "var(--vmc-font-display)";
const fontMono    = "var(--vmc-font-mono)";


/* ── Heart icon ─────────────────────────────────────────────── */
function HeartIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ width: 20, height: 20, fill: "currentColor" }}>
      <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Indicator dot (live + proximo) ─────────────────────────── */
function IndicatorDot({ icon }: { icon: "live" | "clock" }): JSX.Element {
  return (
    <div style={{ position: "absolute", top: 8, right: 8, width: 14, height: 14, zIndex: 2 }}>
      <span className="animate-ping" style={{
        position: "absolute", inset: 0, borderRadius: 9999,
        background: V.liveDot, opacity: 0.5, display: "block",
      }} />
      <span style={{
        position:        "absolute",
        inset:           0,
        borderRadius:    9999,
        background:      V.liveDot,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
      }}>
        {icon === "clock" && (
          <svg viewBox="0 0 12 12" fill="none" style={{ width: 11, height: 11 }}>
            <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.2" />
            <path d="M6 3.5v2.5l1.5 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </div>
  );
}

/* ── Heart button ───────────────────────────────────────────── */
function HeartButton({ color }: { color: string }): JSX.Element {
  return (
    <div style={{ position: "absolute", bottom: 12, right: 12 }}>
      <button aria-label="me interesa" type="button" style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          32,
        height:         32,
        background:     V.surfaceCard,
        borderRadius:   9999,
        boxShadow:      V.shadowMd,
        border:         "none",
        cursor:         "pointer",
        color,
        outline:        "none",
      }}>
        <HeartIcon />
      </button>
    </div>
  );
}

/* ── Price row ──────────────────────────────────────────────── */
function PriceRow({ iconState, price, textColor }: { iconState: PriceIconState; price: string; textColor: string }): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <PriceIcon state={iconState} />
      <span style={{
        paddingLeft:        4,
        fontFamily:         fontMono,
        fontSize:           12,
        fontWeight:         700,
        lineHeight:         "20px",
        fontVariantNumeric: "tabular-nums",
        color:              textColor,
      }}>
        {price}
      </span>
    </div>
  );
}

/* ── Skeleton card ──────────────────────────────────────────── */
function SkeletonCard(): JSX.Element {
  function Bar({ w, h, radius = 4, style }: { w: number; h: number; radius?: number; style?: CSSProperties }): JSX.Element {
    return (
      <div style={{ width: w, height: h, borderRadius: radius, background: V.skeletonBg, flexShrink: 0, ...style }} />
    );
  }

  return (
    <div data-state="skeleton" style={{
      width:        CARD_W,
      flexShrink:   0,
      background:   V.surfaceCard,
      borderBottom: `8px solid ${V.closed}`,
      borderRadius: 8,
      boxShadow:    V.shadowMd,
    }}>
      {/* image placeholder — mismo alto que img real */}
      <div style={{ height: IMG_H, borderRadius: "8px 8px 0 0", background: V.skeletonBg }} />

      {/* content — mismo alto que contenido real */}
      <div style={{ position: "relative", padding: "16px 12px", height: CONT_H, display: "flex", flexDirection: "column" }}>
        {/* nombre */}
        <Bar w={110} h={12} />
        {/* año */}
        <Bar w={48} h={8} style={{ marginTop: 8 }} />
        <div style={{ flex: 1 }} />
        {/* fila precio */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Bar w={20} h={20} radius={9999} />
          <Bar w={72} h={10} />
        </div>
        {/* corazón */}
        <div style={{ position: "absolute", bottom: 12, right: 12 }}>
          <Bar w={32} h={32} radius={9999} />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function OfferCard({
  variant  = "en-vivo",
  state    = "publicada",
  name     = "Kia Soluto",
  year     = "2022",
  price    = "US$ 4,399",
  imageSrc = "/demo/bronco.jpg",
  href     = "/oferta/61495",
}: OfferCardProps): JSX.Element {

  if (state === "skeleton") {
    return <SkeletonCard />;
  }

  const isNegociable = variant === "negociable";
  const isExpirado   = state === "expirado";

  const borderColor  = isExpirado ? V.closed : isNegociable ? V.negotiable : V.live;
  const textColor    = isExpirado ? V.textMuted : V.vaultMid;
  const priceColor   = isExpirado ? V.textMuted : V.negotiableText;
  const heartColor   = isExpirado ? V.textMuted : V.vaultMid;

  const imgStyle: CSSProperties = {
    objectFit:    "cover",
    width:        "100%",
    height:       "100%",
    borderRadius: "8px 8px 0 0",
    ...(isExpirado ? { filter: "grayscale(1) opacity(0.55)" } : {}),
  };

  return (
    <div
      data-variant={variant}
      data-state={state}
      style={{ width: CARD_W, flexShrink: 0, background: V.surfaceCard, borderBottom: `8px solid ${borderColor}`, borderRadius: 8, boxShadow: V.shadowMd }}
    >
      {/* Image area */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "8px 8px 0 0", height: IMG_H }}>
        <a href={href} style={{ display: "block", width: "100%", height: "100%", zIndex: 1 }}>
          <img loading="lazy" src={imageSrc} width={CARD_W} height={IMG_H} alt="" style={imgStyle} />
          <span className="sr-only">{name} {year}</span>
        </a>
        {state === "live"    && <IndicatorDot icon="live" />}
        {state === "proximo" && <IndicatorDot icon="clock" />}
      </div>

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "16px 12px", height: CONT_H }}>

        {/* Name + year */}
        <div style={{ flex: 1 }}>
          <a href={href} style={{ display: "block", outline: "none", textDecoration: "none" }}>
            <h3 style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, lineHeight: "20px", color: textColor, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", margin: 0 }}>
              {name}
            </h3>
            <p style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 500, lineHeight: "16px", letterSpacing: "0.06em", textTransform: "uppercase", color: textColor, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", margin: "2px 0 0" }}>
              {year}
            </p>
          </a>
        </div>

        {/* Price — en-vivo en todos sus estados (incluyendo expirado, en gris) */}
        {!isNegociable && (
          <PriceRow
            iconState={isExpirado ? "expirado" : "default"}
            textColor={priceColor}
            price={price}
          />
        )}

        <HeartButton color={heartColor} />
      </div>
    </div>
  );
}
