/**
 * @figma-spec
 * @component    HeroBanner | 766x272 | Page:Stitch
 *
 * @tokens
 *   vault      : --voyager-color-vault        : #22005C
 *   vaultMid   : --voyager-color-vault-mid    : #3B1782
 *   live       : --voyager-color-live         : #ED8936
 *   negotiable : --voyager-color-negotiable   : #00CACE
 *   onDark     : --voyager-text-on-dark       : #FFFFFF
 *
 * @typography
 *   badge    : Plus Jakarta Sans | Bold    | 11px | lh:auto | "EN VIVO"
 *   titulo   : Plus Jakarta Sans | Bold    | 24px | lh:30px | "Pacífico"
 *   rating   : Plus Jakarta Sans | SemiBold| 13px | lh:auto | "4.3"
 *   modelo   : Plus Jakarta Sans | SemiBold| 14px | lh:auto | "BMW X1"
 *   precio   : Roboto Mono       | Bold    | 26px | lh:32px | "US$ 14,999"
 *   fecha    : Roboto            | Regular | 12px | lh:auto | "FRI 01/05"
 *   cta      : Plus Jakarta Sans | Bold    | 13px | lh:18px | "Ver más"
 *   ref      : Roboto            | Italic  | 10px | lh:auto | "*Imagen referencial"
 *
 * @layers
 *   root       : COMPONENT : 766x272 : x:0,   y:0  : fill:linear-gradient(135deg,live 0%,#D4631A 30%,vaultMid 60%,vault 100%)
 *   coins      : Group     : 766x272 : x:0,   y:0  : fill:rgba(255,255,255,0.12) stroke:rgba(255,255,255,0.40)
 *   contenido  : Frame     : 340xAuto: x:28,  y:50%: fill:none
 *   badge-pill : Frame     : autoXauto:x:0,  y:0  : fill:vault
 *   titulo-txt : Text      : autoXauto:x:0, y:32 : fill:onDark
 *   precio-txt : Text      : autoXauto:x:0, y:114: fill:onDark
 *   cta-btn    : Frame     : autoXauto:x:0, y:144: fill:negotiable
 *   mini-cards : Group     : 474x272 : x:292, y:0  : fill:none
 *
 * @subcomponents
 *   MiniCard : inline
 *     @tokens   bg:#FFFFFF | border:live
 *     @layers   card-root:Frame:142xAuto:x:var,y:var:fill:#FFFFFF,borderBottom:4px live
 *   Coin     : inline
 *     @tokens   fill:rgba(255,255,255,0.12) | stroke:rgba(255,255,255,0.40)
 *     @layers   coin-circle:Ellipse:40x40:x:var,y:var:fill:rgba(255,255,255,0.12)
 *
 * @variants
 *   (ninguna — un único estado)
 *
 * @states
 *   [x] default  : banner gradiente vault/live, fan de 3 mini-cards a la derecha, monedas decorativas
 *   [ ] hover    : (futuro)
 *   [ ] focus    : (futuro)
 *   [ ] active   : (futuro)
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

/**
 * HeroBanner — UI Redesign v4
 * 766×272px · todo dentro del banner · contraste corregido · VOYAGER v2.1.0
 *
 * TODO: reemplazar <a> CTA por <Button variant="primary"> cuando llegue al DS.
 */

import type { JSX } from "react";

const CSS = {
  vault:        "var(--vmc-color-background-brand)",
  vaultMid:     "var(--vmc-color-vault-700)",
  live:         "var(--vmc-color-badge-live-bg)",
  negotiable:   "var(--vmc-color-status-negotiable)",
  onDark:       "var(--vmc-color-text-inverse)",
} as const;

const HEX = {
  vault: "var(--vmc-color-background-brand)",
  live:  "var(--vmc-color-badge-live-bg)",
} as const;

const fontDisplay = "var(--vmc-font-display)";
const fontMono    = "var(--vmc-font-mono)";
const fontBody    = "var(--vmc-font-body)";

/* ── Coin decorativo ─────────────────────────────────────────── */
function Coin({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }): JSX.Element {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: size, height: size, opacity, pointerEvents: "none" }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.40)" strokeWidth="2" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <text x="20" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="rgba(255,255,255,0.70)" fontFamily="sans-serif">$</text>
      </svg>
    </div>
  );
}

/* ── Mini OfferCard (dentro del banner) ──────────────────────── */
interface MiniCardProps {
  rotate:  number;
  zIndex:  number;
  right:   number;
  top:     number;
}
function MiniCard({ rotate, zIndex, right, top }: MiniCardProps): JSX.Element {
  return (
    <div
      style={{
        position:        "absolute",
        right,
        top,
        width:           142,
        zIndex,
        transformOrigin: "bottom center",
        transform:       `rotate(${rotate}deg)`,
        borderRadius:    8,
        overflow:        "hidden",
        background:      "#FFFFFF",
        borderBottom:    `4px solid ${CSS.live}`,
        boxShadow:       "0 12px 28px rgba(0,0,0,0.30), 0 3px 8px rgba(0,0,0,0.18)",
      }}
    >
      <img
        src="/demo/bronco.jpg"
        alt=""
        style={{ width: "100%", height: 82, objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "8px 10px 10px" }}>
        <p style={{ fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, color: HEX.vault, margin: "0 0 1px", lineHeight: "16px" }}>
          Kia Soluto
        </p>
        <p style={{ fontFamily: fontBody, fontSize: 10, color: "rgba(34,0,92,0.50)", margin: "0 0 7px", lineHeight: "14px" }}>
          2022
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: fontMono, fontSize: 12, fontWeight: 700, color: HEX.vault, fontVariantNumeric: "tabular-nums" }}>
            US$ 4,399
          </span>
          <svg width={14} height={14} viewBox="0 0 24 24" style={{ opacity: 0.35, flexShrink: 0 }}>
            <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z" fill={HEX.vault} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────── */
function StarIcon(): JSX.Element {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={CSS.onDark} />
    </svg>
  );
}
function CarIcon(): JSX.Element {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill={CSS.onDark} />
    </svg>
  );
}
function CalendarIcon(): JSX.Element {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill={CSS.onDark} />
    </svg>
  );
}
function ChevronIcon(): JSX.Element {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────────── */
export default function HeroBanner(): JSX.Element {
  return (
    <div
      style={{
        position:     "relative",
        width:        766,
        height:       272,
        borderRadius: 16,
        overflow:     "hidden",   /* todo queda dentro */
        background:   `linear-gradient(135deg,
          ${CSS.live}     0%,
          #D4631A         30%,
          ${CSS.vaultMid} 60%,
          ${CSS.vault}    100%
        )`,
      }}
    >
      {/* ── Coins decorativos — tiradas al aire por todo el banner ── */}
      <Coin x={22}  y={8}   size={40} opacity={0.50} />
      <Coin x={88}  y={175} size={28} opacity={0.45} />
      <Coin x={155} y={22}  size={32} opacity={0.52} />
      <Coin x={230} y={190} size={44} opacity={0.38} />
      <Coin x={295} y={10}  size={24} opacity={0.48} />
      <Coin x={360} y={160} size={36} opacity={0.42} />
      <Coin x={415} y={40}  size={28} opacity={0.45} />
      <Coin x={465} y={200} size={20} opacity={0.40} />
      <Coin x={510} y={15}  size={34} opacity={0.32} />
      <Coin x={568} y={170} size={26} opacity={0.28} />
      <Coin x={620} y={55}  size={22} opacity={0.25} />
      <Coin x={680} y={205} size={30} opacity={0.22} />

      {/* sparkles */}
      {([
        { x: 120, y: 88 }, { x: 272, y: 118 }, { x: 390, y: 62 },
        { x: 445, y: 215 }, { x: 540, y: 100 }, { x: 700, y: 130 },
      ] as const).map(function renderSpark(s, i) {
        return (
          <div key={i} style={{ position: "absolute", left: s.x, top: s.y, pointerEvents: "none", opacity: 0.35 }}>
            <svg width={10} height={10} viewBox="0 0 12 12">
              <path d="M6 0L7 5L12 6L7 7L6 12L5 7L0 6L5 5Z" fill="white" />
            </svg>
          </div>
        );
      })}

      {/* ── Contenido (izquierda) — texto blanco sobre gradiente ── */}
      <div
        style={{
          position:      "absolute",
          top:           "50%",
          left:          28,
          transform:     "translateY(-50%)",
          width:         340,
          display:       "flex",
          flexDirection: "column",
          gap:           6,
        }}
      >
        {/* badge EN VIVO — vault pill, máximo contraste */}
        <span
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           6,
            alignSelf:     "flex-start",
            paddingLeft:   10,
            paddingRight:  12,
            paddingTop:    4,
            paddingBottom: 4,
            borderRadius:  9999,
            background:    CSS.vault,
            fontFamily:    fontDisplay,
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: "0.06em",
            color:         CSS.onDark,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 9999, background: CSS.live, flexShrink: 0, display: "inline-block" }} />
          EN VIVO
        </span>

        {/* título */}
        <p style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 700, lineHeight: "30px", color: CSS.onDark, margin: 0 }}>
          Pacífico
        </p>

        {/* rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <StarIcon />
          <span style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: CSS.onDark }}>4.3</span>
          <span style={{ fontFamily: fontBody, fontSize: 12, color: "rgba(255,255,255,0.80)" }}>Muy bueno · 1,624 opiniones</span>
        </div>

        {/* modelo */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CarIcon />
          <span style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 600, color: CSS.onDark }}>BMW X1</span>
        </div>

        {/* precio */}
        <span style={{ fontFamily: fontMono, fontSize: 26, fontWeight: 700, color: CSS.onDark, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.5px", lineHeight: "32px" }}>
          US$ 14,999
        </span>

        {/* fecha */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CalendarIcon />
          <span style={{ fontFamily: fontBody, fontSize: 12, color: "rgba(255,255,255,0.78)" }}>FRI 01/05</span>
        </div>

        {/* CTA */}
        <a
          href="#"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            4,
            marginTop:      4,
            paddingLeft:    18,
            paddingRight:   14,
            paddingTop:     10,
            paddingBottom:  10,
            borderRadius:   9999,
            background:     CSS.negotiable,
            color:          CSS.vault,
            fontFamily:     fontDisplay,
            fontSize:       13,
            fontWeight:     700,
            textDecoration: "none",
            alignSelf:      "flex-start",
            boxShadow:      "0 4px 14px rgba(0,202,206,0.45)",
            lineHeight:     "18px",
          }}
        >
          Ver más
          <ChevronIcon />
        </a>

        {/* referencial */}
        <span style={{ fontFamily: fontBody, fontSize: 10, color: "rgba(255,255,255,0.40)", fontStyle: "italic" }}>
          *Imagen referencial
        </span>
      </div>

      {/* ── Fan de cards (dentro del banner, ajustado al alto 272px) ── */}
      {/* card 1: fondo, más inclinada */}
      <MiniCard rotate={-14} zIndex={1} right={192} top={28} />
      {/* card 2: medio */}
      <MiniCard rotate={-5}  zIndex={2} right={106} top={24} />
      {/* card 3: frente, casi recta */}
      <MiniCard rotate={4}   zIndex={3} right={22}  top={20} />
    </div>
  );
}
