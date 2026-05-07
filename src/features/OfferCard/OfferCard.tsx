/**
 * OfferCard — UI Upgrade
 * 176×232px · single auction listing card · VOYAGER v2.1.0
 *
 * Variants:
 *   en-vivo     → border-b live (orange) · CoinIcon + price row
 *   negociable  → border-b negotiable (teal) · empty price row
 *
 * Token map:
 *   bg-white           → --voyager-surface-card
 *   border-yellow-500  → --voyager-color-live (8px bottom)
 *   border-turquoise-500 → --voyager-color-negotiable (8px bottom)
 *   shadow-lg          → shadowLg
 *   text-purple-900    → --voyager-text-primary
 *   text-purple-300    → --voyager-color-vault-mid (heart, year)
 *   SVG fills          → --voyager-color-negotiable
 */

import type { JSX } from "react";

export type OfferCardVariant = "en-vivo" | "negociable";

interface OfferCardProps {
  variant?: OfferCardVariant;
}

const V = {
  vaultMid:    "var(--voyager-color-vault-mid, #3B1782)",
  live:        "var(--voyager-color-live,       #ED8936)",
  negotiable:  "var(--voyager-color-negotiable, #00CACE)",
  surfaceCard: "var(--voyager-surface-card,     #FFFFFF)",
  textPrimary: "var(--voyager-text-primary,     #191C1C)",
  shadowSm:    "0 8px 16px rgba(34,0,92,0.06)",
  shadowLg:    "0 16px 24px rgba(0,0,0,0.14)",
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fontMono    = "var(--font-mono,    'Roboto Mono', monospace)";

/* ── Coin SVG — fills mapped to negotiable token ───────────── */
function CoinIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 size-icon-sm"
      aria-hidden
    >
      <path
        d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z"
        fill="var(--voyager-color-negotiable, #00CACE)"
        fillOpacity={0.55}
      />
      <path
        d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23ZM12 12.4C11.8 12.4 11.7 12.5 11.6 12.5L2.8 16.2C2.3 16.4 2.1 16.8 2.1 17.2 2.1 17.6 2.3 18 2.8 18.2L11.6 21.9C11.8 22 12.2 22 12.4 21.9L21.2 18.2C21.7 18 21.9 17.6 21.9 17.2 21.9 16.8 21.7 16.4 21.2 16.2L12.4 12.5C12.3 12.5 12.2 12.4 12 12.4Z"
        fill="var(--voyager-color-negotiable, #00CACE)"
      />
      <path
        d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z"
        fill="var(--voyager-color-negotiable, #00CACE)"
      />
      <path
        d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5L12.4 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10 11.7 10 11.7 10 11.8 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.3C11.3 8.1 10.9 7.9 10.9 7.4ZM12.4 11.7V10.2C12.9 10.4 13.2 10.6 13.2 11 13.2 11.4 12.9 11.7 12.4 11.7Z"
        fill="white"
      />
    </svg>
  );
}

/* ── Heart SVG ──────────────────────────────────────────────── */
function HeartIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-icon-md fill-current"
      aria-hidden
    >
      <path
        d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────── */
export default function OfferCard({ variant = "en-vivo" }: OfferCardProps): JSX.Element {
  const isLive = variant === "en-vivo";

  const borderColor  = isLive ? V.live : V.negotiable;
  const vehicleName  = isLive ? "Kia Soluto" : "Honda HR-V";
  const vehicleYear  = isLive ? "2022" : "2016";
  const ofertaHref   = isLive ? "/oferta/61495" : "/oferta/59105";
  const srLabel      = isLive ? "Kia Soluto 2022" : "Honda HR-V 2016";

  return (
    <div style={{
      width:        "100%",
      maxWidth:     176,
      background:   V.surfaceCard,
      borderBottom: `8px solid ${borderColor}`,
      borderRadius: 8,
      boxShadow:    V.shadowLg,
    }}>

      {/* Image area — h-28 = 112px */}
      <div style={{
        position:     "relative",
        overflow:     "hidden",
        borderRadius: "8px 8px 0 0",
        height:       112,
      }}>
        <a
          href={ofertaHref}
          style={{ position: "relative", display: "block", width: "100%", height: "100%", zIndex: 1 }}
        >
          <img
            loading="lazy"
            src="/demo/bronco.jpg"
            width={170}
            height={112}
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "8px 8px 0 0" }}
          />
          <span className="sr-only">{srLabel}</span>
        </a>
      </div>

      {/* Content area — flex flex-col px-3 py-4 h-28 */}
      <div style={{
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
        paddingLeft:   12,
        paddingRight:  12,
        paddingTop:    16,
        paddingBottom: 16,
        height:        112,
      }}>

        {/* flex-1 — name + year */}
        <div style={{ flex: 1 }}>
          <a href={ofertaHref} style={{ display: "block", outline: "none", textDecoration: "none" }}>
            <h3 style={{
              fontFamily:   fontDisplay,
              fontSize:     16,
              fontWeight:   700,
              lineHeight:   "20px",
              color:        V.textPrimary,
              overflow:     "hidden",
              whiteSpace:   "nowrap",
              textOverflow: "ellipsis",
              margin:       0,
            }}>
              {vehicleName}
            </h3>
            <p style={{
              fontFamily:    fontDisplay,
              fontSize:      11,
              fontWeight:    500,
              lineHeight:    "16px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:         V.vaultMid,
              overflow:      "hidden",
              whiteSpace:    "nowrap",
              textOverflow:  "ellipsis",
              margin:        0,
              marginTop:     2,
            }}>
              {vehicleYear}
            </p>
          </a>
        </div>

        {/* Price row */}
        <div style={{ display: "grid", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {isLive && (
              <>
                <CoinIcon />
                <span style={{
                  paddingLeft:        4,
                  fontFamily:         fontMono,
                  fontSize:           14,
                  fontWeight:         700,
                  lineHeight:         "20px",
                  fontVariantNumeric: "tabular-nums",
                  color:              V.negotiable,
                }}>
                  US$ 4,399
                </span>
              </>
            )}
          </div>
        </div>

        {/* Heart — absolute bottom-right */}
        <div style={{
          position:     "absolute",
          bottom:       0,
          right:        0,
          marginBottom: 12,
          marginRight:  12,
          borderRadius: 9999,
          boxShadow:    V.shadowLg,
        }}>
          <button
            aria-label="me interesa"
            type="button"
            style={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           32,
              height:          32,
              background:      V.surfaceCard,
              borderRadius:    9999,
              boxShadow:       V.shadowSm,
              border:          "none",
              cursor:          "pointer",
              color:           V.vaultMid,
              outline:         "none",
            }}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
