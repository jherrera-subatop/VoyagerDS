/**
 * Participa — UI Upgrade
 * ─────────────────────────────────────────────────────────────────
 * Estructura 100% preservada del outerHTML legacy VMC Subastas.
 * Solo tokenización VOYAGER v2.1.0 — sin cambios estructurales.
 * 317×422px · is-live state
 *
 * Token map:
 *   bg-casablanca   → --voyager-color-live
 *   text-damask     → --voyager-color-live
 *   text-oracle     → --voyager-color-negotiable
 *   cp-header bg    → vault gradient (linear-gradient 135deg)
 *   cp-content bg   → --voyager-surface-card
 *   shadow-md       → shadow.md
 *   shadow-lg       → shadow.md (único shadow permitido raised)
 * ─────────────────────────────────────────────────────────────────
 */

import type { JSX } from "react";

/* ── Token aliases ───────────────────────────────────────────── */
const T = {
  vault:           "var(--voyager-color-vault,            #22005C)",
  vaultMid:        "var(--voyager-color-vault-mid,        #3B1782)",
  live:            "var(--voyager-color-live,              #ED8936)",
  negotiable:      "var(--voyager-color-negotiable,        #00CACE)",
  surfaceCard:     "var(--voyager-surface-card,            #FFFFFF)",
  textOnDark:      "var(--voyager-text-on-dark,            #FFFFFF)",
  textOnDarkMuted: "var(--voyager-text-on-dark-muted,      rgba(255,255,255,0.60))",
  textTertiary:    "var(--voyager-text-tertiary,           #99A1AF)",
  borderGhost:     "var(--voyager-border-ghost,            rgba(34,0,92,0.10))",
  shadowSm:        "0 8px 16px rgba(34,0,92,0.06)",
  shadowMd:        "0 8px 16px rgba(0,0,0,0.10)",
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fontMono    = "var(--font-mono,    'Roboto Mono', monospace)";

/* ── Indicator icon wrapper (circular border) ────────────────── */
function IndicatorIcon({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div style={{ position: "relative", zIndex: 10, cursor: "pointer", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.30)",
          borderRadius: 9999,       /* radius.full */
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          color: T.textOnDark,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Participa(): JSX.Element {
  return (
    /* .wrap-process.is-web */
    <div style={{ width: 317 }}>
      {/* .vmc-detail-relative */}
      <div style={{ position: "relative" }}>
        {/* .card-process.is-live.is-web */}
        <div style={{ position: "relative", userSelect: "none" }}>

          {/* ── .cp-header ──────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              paddingLeft: 20,    /* px-5 */
              paddingRight: 20,
              width: "100%",
              boxSizing: "border-box",
              background: `linear-gradient(135deg, ${T.vault} 0%, ${T.vaultMid} 100%)`,
            }}
          >
            {/* .cp-header-date — border-b row */}
            <div
              style={{
                display: "flex",
                paddingTop: 12,   /* py-3 */
                paddingBottom: 12,
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {/* .cp-header-top-left — w-1/2 */}
              <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
                <div style={{ position: "relative", zIndex: 9 }}>
                  {/* "Inicia" — font-display, text-sm, font-normal */}
                  <span
                    style={{
                      fontFamily: fontDisplay,
                      display: "block",
                      lineHeight: 1.25,
                      fontSize: 14,       /* label-md */
                      fontWeight: 400,
                      color: T.textOnDarkMuted,
                    }}
                  >
                    Inicia
                  </span>
                  {/* "lunes 04" — font-display, text-base, font-bold, uppercase */}
                  <span
                    style={{
                      fontFamily: fontDisplay,
                      display: "block",
                      lineHeight: 1,
                      fontWeight: 700,
                      fontSize: 16,       /* label-lg */
                      textTransform: "uppercase",
                      color: T.textOnDark,
                    }}
                  >
                    lunes 04
                  </span>
                </div>
              </div>

              {/* .cp-header-top-right — w-1/2, border-l, pl-6 */}
              <div
                style={{
                  width: "50%",
                  borderLeft: "1px solid rgba(255,255,255,0.20)",
                  paddingLeft: 24,  /* pl-6 → space.300 */
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ position: "relative", zIndex: 9 }}>
                  {/* "12:30 pm" — font-display, font-bold, text-xl */}
                  <span
                    style={{
                      fontFamily: fontDisplay,
                      fontWeight: 700,
                      fontSize: 20,       /* heading-md */
                      lineHeight: 1,
                      color: T.textOnDark,
                    }}
                  >
                    12:30 pm
                  </span>
                </div>
              </div>
            </div>

            {/* Indicators row (flex) */}
            <div style={{ display: "flex" }}>

              {/* flex-1 justify-end — left indicator: 93 + eye */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* "93" — number → Roboto Mono */}
                  <span
                    style={{
                      marginRight: 8,   /* mr-2 → space.100 */
                      fontFamily: fontMono,
                      fontSize: 14,     /* numeric-sm */
                      fontVariantNumeric: "tabular-nums",
                      color: T.textOnDark,
                    }}
                  >
                    93
                  </span>
                  <IndicatorIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none" style={{ fill: "currentColor" }}>
                      <path d="M6.5 0C3.5 0 1 1.9 0 4.5 1 7.1 3.5 9 6.5 9 9.5 9 12 7.1 13 4.5 12 1.9 9.5 0 6.5 0ZM6.5 7.5C4.9 7.5 3.5 6.2 3.5 4.5 3.5 2.8 4.9 1.5 6.5 1.5 8.1 1.5 9.5 2.8 9.5 4.5 9.5 6.2 8.1 7.5 6.5 7.5ZM6.5 2.7C5.5 2.7 4.7 3.5 4.7 4.5 4.7 5.5 5.5 6.3 6.5 6.3 7.5 6.3 8.3 5.5 8.3 4.5 8.3 3.5 7.5 2.7 6.5 2.7Z" />
                    </svg>
                  </IndicatorIcon>
                </div>
              </div>

              {/* flex-shrink — center: like button (floats -mt-8) */}
              <div style={{ flexShrink: 0 }}>
                {/* .wrap-like-button.py-3.-mt-8 */}
                <div style={{ paddingTop: 12, paddingBottom: 12, marginTop: -32 /* -mt-8 */ }}>
                  {/* .wrap-like-button.px-5.mb-2 */}
                  <div style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 8 }}>
                    {/* div.rounded-full.shadow-md */}
                    <div style={{ borderRadius: 9999, boxShadow: T.shadowMd }}>
                      <div style={{ position: "relative", zIndex: 10, cursor: "pointer", display: "flex", justifyContent: "center" }}>
                        {/* .cta-like-button.rounded-full.border.is-guest */}
                        <button
                          type="button"
                          style={{
                            position: "relative",
                            borderRadius: 9999,     /* radius.full */
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `1px solid ${T.borderGhost}`,
                            background: T.surfaceCard,
                            cursor: "pointer",
                            width: 48,
                            height: 48,
                            outline: "none",
                            color: T.textTertiary,
                            transition: "colors 200ms",
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", fill: "currentColor", width: 24, height: 24 }}>
                            <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* .content-like-button.text-center */}
                  <div style={{ textAlign: "center", lineHeight: 1 }}>
                    {/* "0" — number → Roboto Mono */}
                    <span
                      style={{
                        fontFamily: fontMono,
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                        color: T.textOnDark,
                      }}
                    >
                      0
                    </span>
                  </div>
                </div>
              </div>

              {/* flex-1 justify-start — right indicator: people + 0 */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IndicatorIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none" style={{ fill: "currentColor" }}>
                      <path d="M11.1 5.9H10.1C10.2 6.2 10.3 6.5 10.3 6.8V10.6C10.3 10.8 10.3 10.9 10.2 11H11.9C12.5 11 13 10.5 13 9.9V7.8C13 6.8 12.2 5.9 11.1 5.9Z" fill="currentColor"/>
                      <path d="M2.7 6.8C2.7 6.5 2.8 6.2 2.9 5.9H1.9C0.8 5.9 0 6.8 0 7.8V9.9C0 10.5 0.5 11 1.1 11H2.8C2.7 10.9 2.7 10.8 2.7 10.6V6.8Z" fill="currentColor"/>
                      <path d="M7.6 5H5.4C4.3 5 3.5 5.8 3.5 6.8V10.6C3.5 10.8 3.6 11 3.8 11H9.2C9.4 11 9.5 10.8 9.5 10.6V6.8C9.5 5.8 8.7 5 7.6 5Z" fill="currentColor"/>
                      <path d="M6.5 0C5.3 0 4.2 1 4.2 2.3 4.2 3.1 4.7 3.8 5.4 4.2 5.7 4.4 6.1 4.5 6.5 4.5 6.9 4.5 7.3 4.4 7.6 4.2 8.3 3.8 8.8 3.1 8.8 2.3 8.8 1 7.7 0 6.5 0Z" fill="currentColor"/>
                      <path d="M2.5 2.1C1.6 2.1 0.8 2.9 0.8 3.8 0.8 4.7 1.6 5.5 2.5 5.5 2.8 5.5 3 5.4 3.2 5.3 3.6 5.2 3.8 4.9 4 4.6 4.2 4.3 4.2 4.1 4.2 3.8 4.2 2.9 3.5 2.1 2.5 2.1Z" fill="currentColor"/>
                      <path d="M10.5 2.1C9.5 2.1 8.8 2.9 8.8 3.8 8.8 4.1 8.8 4.3 9 4.6 9.2 4.9 9.4 5.2 9.8 5.3 10 5.4 10.2 5.5 10.5 5.5 11.4 5.5 12.2 4.7 12.2 3.8 12.2 2.9 11.4 2.1 10.5 2.1Z" fill="currentColor"/>
                    </svg>
                  </IndicatorIcon>
                  {/* "0" — Roboto Mono */}
                  <span
                    style={{
                      marginLeft: 8,   /* ml-2 → space.100 */
                      fontFamily: fontMono,
                      fontSize: 14,
                      fontVariantNumeric: "tabular-nums",
                      color: T.textOnDark,
                    }}
                  >
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── .cp-content.bg-white ─────────────────────────────── */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              background: T.surfaceCard,
            }}
          >
            {/* .cta-contains.has-button-gy.px-5.flex.flex-col.justify-center */}
            <div
              style={{
                paddingLeft: 20,   /* px-5 */
                paddingRight: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* .w-full */}
              <div style={{ width: "100%" }}>
                <div>
                  {/* "¡Oportunidad para el que sabe!" — text-damask → live */}
                  <p
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 14,      /* body-sm */
                      color: T.live,
                      lineHeight: 1.2,
                      textAlign: "center",
                      marginBottom: 8,   /* mb-2 → space.100 */
                      marginTop: 24,     /* mt-5 → snap a space.300 */
                    }}
                  >
                    ¡Oportunidad para el que sabe!
                  </p>

                  {/* PARTICIPA button — .rounded.shadow-lg.bg-casablanca → live */}
                  <div
                    style={{
                      borderRadius: 4,        /* radius.sm */
                      boxShadow: T.shadowMd,  /* shadow-lg → shadow.md */
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        border: "none",
                        background: T.live,          /* bg-casablanca → live */
                        color: T.textOnDark,
                        paddingLeft: 32,   /* px-8 → space.400 */
                        paddingRight: 32,
                        paddingTop: 24,    /* py-5 (20px) → snap a space.300 */
                        paddingBottom: 24,
                        borderRadius: 4,   /* radius.sm */
                        cursor: "pointer",
                        outline: "none",
                        lineHeight: 2,
                      }}
                    >
                      {/* "Participa" — font-display, text-lg, uppercase, font-bold */}
                      <span
                        style={{
                          fontFamily: fontDisplay,
                          color: T.textOnDark,
                          fontSize: 18,             /* heading-sm */
                          textTransform: "uppercase",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        Participa
                      </span>
                    </button>
                  </div>

                  {/* Price block — mt-4 */}
                  <div style={{ marginTop: 16 /* mt-4 → space.200 */ }}>
                    {/* flex items-center justify-center */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                      {/* Dollar coin SVG — fills mapped to negotiable */}
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 23" fill="none" style={{ width: "auto" }}>
                          <path d="M11.3 21.8L1.9 17.8C0.4 17.1 0.4 15.1 1.9 14.5L11.3 10.4C11.8 10.2 12.3 10.2 12.8 10.4L22.2 14.5C23.7 15.1 23.7 17.1 22.2 17.8L12.8 21.8C12.3 22 11.8 22 11.3 21.8Z" fill="var(--voyager-color-negotiable, #00CACE)" fillOpacity="0.55"/>
                          <path d="M12 23C11.7 23 11.3 22.9 11 22.8L1.5 18.6C0.6 18.2 0 17.4 0 16.4 0 15.4 0.6 14.5 1.5 14.2L11 10C11.7 9.7 12.4 9.7 13 10L22.6 14.2C23.4 14.5 24 15.4 24 16.4 24 17.4 23.4 18.2 22.6 18.6L13 22.8C12.7 22.9 12.3 23 12 23ZM12 11C11.8 11 11.7 11 11.5 11.1L1.9 15.3C1.5 15.5 1.2 15.9 1.2 16.4 1.2 16.9 1.5 17.3 1.9 17.5L11.5 21.7C11.8 21.8 12.2 21.8 12.5 21.7L22.1 17.5C22.5 17.3 22.8 16.9 22.8 16.4 22.8 15.9 22.5 15.5 22.1 15.3L12.5 11.1C12.3 11 12.2 11 12 11Z" fill="var(--voyager-color-negotiable, #00CACE)"/>
                          <path d="M12 0C7.1 0 3 4 3 8.8 3 13.6 7.1 17.7 12 17.7 17 17.7 21 13.6 21 8.8 21 4 17 0 12 0Z" fill="var(--voyager-color-negotiable, #00CACE)"/>
                          <path d="M14.9 10.6C14.9 9 13.6 8.6 12.5 8.3L12.5 8.3V6.5C12.9 6.6 13.4 6.8 13.7 7.2L14.8 6C14.2 5.3 13.3 4.9 12.5 4.8V3.5H11.8V4.8C10.4 5 9.2 5.9 9.2 7.4 9.2 9 10.5 9.5 11.6 9.8 11.7 9.8 11.7 9.8 11.8 9.8V11.5C11.2 11.4 10.6 11.1 10.2 10.6L9.1 11.8C9.8 12.7 10.8 13.1 11.8 13.2V14.5H12.5V13.2C13.8 13 14.9 12.2 14.9 10.6ZM11 7.2C11 6.8 11.3 6.5 11.8 6.5V8.1C11.3 7.9 11 7.7 11 7.2ZM12.5 11.5V10C12.9 10.2 13.2 10.4 13.2 10.8 13.2 11.2 12.9 11.5 12.5 11.5Z" fill="white"/>
                        </svg>
                      </span>

                      {/* "Precio Base: US$ 62,999" — text-oracle → negotiable */}
                      <span
                        style={{
                          fontFamily: fontDisplay,
                          fontSize: 18,       /* text-lg → heading-sm */
                          marginLeft: 12,     /* ml-3 → space.150 */
                          lineHeight: 1,
                          color: T.negotiable,
                        }}
                      >
                        {/* "Precio Base:" — font-light */}
                        <span style={{ fontWeight: 300 }}>Precio Base:</span>
                        {" "}
                        {/* "US$ 62,999" — price → Roboto Mono + tabular-nums */}
                        <span
                          style={{
                            fontFamily: fontMono,
                            fontWeight: 700,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          US$ 62,999
                        </span>
                      </span>
                    </div>

                    {/* .cp-base-price-info — text-oracle, text-xxs → caption (12px) */}
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: fontDisplay,
                        color: T.negotiable,
                        fontWeight: 400,
                        lineHeight: 1.3,
                        fontSize: 10,      /* text-xxs → overline size (10px) */
                        marginTop: 8,      /* mt-2 → space.100 */
                        paddingBottom: 24, /* espacio inferior */
                      }}
                    >
                      Comisión: 7.5% del valor de compra o mínimo &gt;S&lt; 50
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
