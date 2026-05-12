"use client";
import { useState } from "react";
import type { JSX } from "react";
import AuctionConditions from "@/features/AuctionConditions/AuctionConditions";
import GalleryMain from "@/features/GalleryMain/GalleryMain";

const T = {
  /* ── Gradients · DS variables · EXC-001 documented ── */
  gradientVault:   "linear-gradient(135deg, var(--color-vault-900) 0%, var(--color-vault-700) 100%)",
  gradientLive:    "linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 50%, var(--color-orange-700) 100%)",
  gradientLiveHov: "linear-gradient(135deg, var(--color-orange-600) 0%, var(--color-orange-700) 50%, var(--color-orange-800) 100%)",
  gradientLivePrs: "linear-gradient(135deg, var(--color-orange-800) 0%, var(--color-orange-900) 100%)",
  /* ── Text on live gradient · EXC-001 · white + shadow ── */
  participaText:   "#FFFFFF",
  participaShadow: "0px 1px 3px rgba(0,0,0,0.45)",
  /* ── Fixes WCAG/APCA · tokens DS confirmados ── */
  tagline:         "oklch(15% 0.008 200)",    /* color-text-on-surface · WCAG 17:1                */
  priceCyan:       "oklch(50% 0.130 197.3)", /* cyan accesible · WCAG 5.57:1 · Lc 77.3 ≥75 fin. */
  commissionText:  "oklch(38% 0.04 280)",    /* text.caption · WCAG 10.1:1 · Lc 93.4             */
  negotiable:      "#00CACE",
  surface:         "#FFFFFF",
  onDark:          "#FFFFFF",
  onDarkMuted:     "rgba(255,255,255,0.60)",
  tertiary:        "#99A1AF",
  ghost:           "rgba(34,0,92,0.10)",
  shadowSm:        "0 4px 12px rgba(34,0,92,0.10)",
  shadowMd:        "0 8px 16px rgba(0,0,0,0.10)",
  shadowLg:        "0 12px 32px rgba(0,0,0,0.18)",
} as const;

const fd = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fm = "var(--font-mono, 'Roboto Mono', monospace)";

/* ── Dimensiones exactas ── */
const W       = 311;
const H       = 422;
const VH      = 429; /* visitas card height */
const HDR_H   = 130; /* header morado */
/*
  Divider line (borde entre fila fecha e indicadores) ≈ 59px desde card top.
  Heart center = sobre esa línea → HEART_Y = 59 - 24 = 35px.
*/
const DIVIDER_Y = 59;
const HEART_Y   = DIVIDER_Y - 24;

function IndicatorCircle({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.30)", borderRadius: 9999,
      width: 32, height: 32, display: "flex", alignItems: "center",
      justifyContent: "center", color: T.onDark, flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function HeartIcon(): JSX.Element {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function EyeIcon(): JSX.Element {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor" aria-hidden>
      <path d="M6.5 0C3.5 0 1 1.9 0 4.5 1 7.1 3.5 9 6.5 9 9.5 9 12 7.1 13 4.5 12 1.9 9.5 0 6.5 0ZM6.5 7.5C4.9 7.5 3.5 6.2 3.5 4.5 3.5 2.8 4.9 1.5 6.5 1.5 8.1 1.5 9.5 2.8 9.5 4.5 9.5 6.2 8.1 7.5 6.5 7.5ZM6.5 2.7C5.5 2.7 4.7 3.5 4.7 4.5 4.7 5.5 5.5 6.3 6.5 6.3 7.5 6.3 8.3 5.5 8.3 4.5 8.3 3.5 7.5 2.7 6.5 2.7Z"/>
    </svg>
  );
}

function PeopleIcon(): JSX.Element {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor" aria-hidden>
      <path d="M11.1 5.9H10.1C10.2 6.2 10.3 6.5 10.3 6.8V10.6C10.3 10.8 10.3 10.9 10.2 11H11.9C12.5 11 13 10.5 13 9.9V7.8C13 6.8 12.2 5.9 11.1 5.9Z"/>
      <path d="M2.7 6.8C2.7 6.5 2.8 6.2 2.9 5.9H1.9C0.8 5.9 0 6.8 0 7.8V9.9C0 10.5 0.5 11 1.1 11H2.8C2.7 10.9 2.7 10.8 2.7 10.6V6.8Z"/>
      <path d="M7.6 5H5.4C4.3 5 3.5 5.8 3.5 6.8V10.6C3.5 10.8 3.6 11 3.8 11H9.2C9.4 11 9.5 10.8 9.5 10.6V6.8C9.5 5.8 8.7 5 7.6 5Z"/>
      <path d="M6.5 0C5.3 0 4.2 1 4.2 2.3 4.2 3.1 4.7 3.8 5.4 4.2 5.7 4.4 6.1 4.5 6.5 4.5 6.9 4.5 7.3 4.4 7.6 4.2 8.3 3.8 8.8 3.1 8.8 2.3 8.8 1 7.7 0 6.5 0Z"/>
      <path d="M2.5 2.1C1.6 2.1 0.8 2.9 0.8 3.8 0.8 4.7 1.6 5.5 2.5 5.5 2.8 5.5 3 5.4 3.2 5.3 3.6 5.2 3.8 4.9 4 4.6 4.2 4.3 4.2 4.1 4.2 3.8 4.2 2.9 3.5 2.1 2.5 2.1Z"/>
      <path d="M10.5 2.1C9.5 2.1 8.8 2.9 8.8 3.8 8.8 4.1 8.8 4.3 9 4.6 9.2 4.9 9.4 5.2 9.8 5.3 10 5.4 10.2 5.5 10.5 5.5 11.4 5.5 12.2 4.7 12.2 3.8 12.2 2.9 11.4 2.1 10.5 2.1Z"/>
    </svg>
  );
}

function CoinIcon(): JSX.Element {
  return (
    <svg width="40" height="40" viewBox="0 0 24 23" fill="none" aria-hidden>
      <path d="M11.3 21.8L1.9 17.8C0.4 17.1 0.4 15.1 1.9 14.5L11.3 10.4C11.8 10.2 12.3 10.2 12.8 10.4L22.2 14.5C23.7 15.1 23.7 17.1 22.2 17.8L12.8 21.8C12.3 22 11.8 22 11.3 21.8Z" fill={T.priceCyan} fillOpacity=".55"/>
      <path d="M12 23C11.7 23 11.3 22.9 11 22.8L1.5 18.6C0.6 18.2 0 17.4 0 16.4 0 15.4 0.6 14.5 1.5 14.2L11 10C11.7 9.7 12.4 9.7 13 10L22.6 14.2C23.4 14.5 24 15.4 24 16.4 24 17.4 23.4 18.2 22.6 18.6L13 22.8C12.7 22.9 12.3 23 12 23Z" fill={T.priceCyan}/>
      <path d="M12 0C7.1 0 3 4 3 8.8 3 13.6 7.1 17.7 12 17.7 17 17.7 21 13.6 21 8.8 21 4 17 0 12 0Z" fill={T.priceCyan}/>
      <path d="M14.9 10.6C14.9 9 13.6 8.6 12.5 8.3V6.5C12.9 6.6 13.4 6.8 13.7 7.2L14.8 6C14.2 5.3 13.3 4.9 12.5 4.8V3.5H11.8V4.8C10.4 5 9.2 5.9 9.2 7.4 9.2 9 10.5 9.5 11.6 9.8 11.7 9.8 11.7 9.8 11.8 9.8V11.5C11.2 11.4 10.6 11.1 10.2 10.6L9.1 11.8C9.8 12.7 10.8 13.1 11.8 13.2V14.5H12.5V13.2C13.8 13 14.9 12.2 14.9 10.6ZM11 7.2C11 6.8 11.3 6.5 11.8 6.5V8.1C11.3 7.9 11 7.7 11 7.2ZM12.5 11.5V10C12.9 10.2 13.2 10.4 13.2 10.8 13.2 11.2 12.9 11.5 12.5 11.5Z" fill="white"/>
    </svg>
  );
}

function DetailCardV2(): JSX.Element {
  return (
    <div style={{
      width:    W,
      height:   H,
      position: "relative",
      boxShadow: T.shadowLg,
      borderRadius: "0 0 8px 8px",
      userSelect: "none",
    }}>

      {/* ── HEADER MORADO ── absolute, top 0, height HDR_H ── */}
      <div style={{
        position:     "absolute",
        top: 0, left: 0, right: 0,
        height:       HDR_H,
        background:   T.gradientVault,
        borderRadius: "8px 8px 0 0",
        zIndex:       2,
        boxSizing:    "border-box",
        paddingLeft:  20,
        paddingRight: 20,
        display:      "flex",
        flexDirection:"column",
      }}>

        {/* Línea vertical central — 8px desde el borde superior, para 8px antes del borde del corazón */}
        <div style={{
          position: "absolute", top: 8, left: "50%",
          transform: "translateX(-50%)",
          width: 1, height: HEART_Y - 8 - 8,
          background: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }} />

        {/* Divider horizontal split — 12px de margen desde el borde del corazón (radio 24 + 12 = 36px desde centro) */}
        <div style={{
          position: "absolute", top: DIVIDER_Y - 1,
          left: 20, right: "calc(50% + 36px)",
          height: 1, background: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: DIVIDER_Y - 1,
          left: "calc(50% + 36px)", right: 20,
          height: 1, background: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }} />

        {/* Fila fecha */}
        <div style={{
          display: "flex", flexShrink: 0,
          paddingTop: 12, paddingBottom: 12,
        }}>
          <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: fd, display: "block", fontSize: 14, fontWeight: 400, lineHeight: 1.25, color: T.onDarkMuted }}>Inicia</span>
              <span style={{ fontFamily: fd, display: "block", fontSize: 16, fontWeight: 700, lineHeight: 1, textTransform: "uppercase", color: T.onDark }}>LUNES 04</span>
            </div>
          </div>
          <div style={{ width: "50%", paddingLeft: 24, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 20, lineHeight: 1, color: T.onDark }}>12:30 pm</span>
          </div>
        </div>

        {/*
          Fila indicadores — flex: 1 para llenar el resto del header.
          Solo izquierda y derecha. El corazón va posicionado absolutamente
          en el card (ver más abajo).
        */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
        }}>
          {/* Izquierda: 93 + ojo */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <span style={{ fontFamily: fm, fontSize: 14, fontVariantNumeric: "tabular-nums", color: T.onDark }}>93</span>
            <IndicatorCircle><EyeIcon /></IndicatorCircle>
          </div>

          {/* Centro: contador de likes — el corazón flota encima vía absolute */}
          <div style={{ width: 88, flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: T.onDark }}>0</span>
          </div>

          {/* Derecha: personas + 0 */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <IndicatorCircle><PeopleIcon /></IndicatorCircle>
            <span style={{ fontFamily: fm, fontSize: 14, fontVariantNumeric: "tabular-nums", color: T.onDark }}>0</span>
          </div>
        </div>

      </div>

      {/* ── CORAZÓN — absolute, centro sobre la línea divisoria del header ── */}
      <div style={{
        position:  "absolute",
        top:       HEART_Y,   /* 35px: centro del botón queda en DIVIDER_Y=59px */
        left:      "50%",
        transform: "translateX(-50%)",
        zIndex:    10,
      }}>
        <div style={{ borderRadius: 9999, boxShadow: T.shadowMd }}>
          <button
            type="button"
            aria-label="me interesa"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 48, height: 48,
              background: T.surface, borderRadius: 9999,
              border: `1px solid ${T.ghost}`,
              cursor: "pointer", color: "var(--color-vault, #22005C)", outline: "none",
              boxShadow: T.shadowSm,
            }}
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* ── CONTENIDO BLANCO — absolute, top HDR_H, bottom 0 ── */}
      <div style={{
        position:     "absolute",
        top:          HDR_H,
        left:         0, right: 0, bottom: 0,
        background:   T.surface,
        borderRadius: "0 0 8px 8px",
        zIndex:       1,
        boxSizing:    "border-box",
        paddingLeft:  20,
        paddingRight: 20,
        display:      "flex",
        flexDirection:"column",
        paddingTop:     24,
        paddingBottom:  24,
        justifyContent: "center",
      }}>

        {/* Tagline — caption · 12px/400 · color-text-body */}
        <p style={{
          fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText,
          lineHeight: 1.3, textAlign: "center",
          marginTop: 0, marginBottom: 8,
        }}>
          ¡Oportunidad para el que sabe!
        </p>

        {/* PARTICIPA — live→liveLight · texto oscuro · WCAG 7.98:1 AAA */}
        <div style={{ borderRadius: 4, boxShadow: T.shadowMd }}>
          <button
            type="button"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", border: "none",
              background: T.gradientLive,
              paddingTop: 16, paddingBottom: 16,
              paddingLeft: 32, paddingRight: 32,
              borderRadius: 4, cursor: "pointer", outline: "none",
            }}
          >
            <span style={{ fontFamily: fd, color: T.participaText, fontSize: 18, fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em", textShadow: T.participaShadow }}>
              Participa
            </span>
          </button>
        </div>

        {/* Precio — text.heading-sm equiv · oklch(50%) cyan · WCAG 5.57:1 · Lc 77.3 */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CoinIcon />
            <span style={{ fontFamily: fd, fontSize: 18, lineHeight: 1, color: T.priceCyan, marginLeft: 12 }}>
              <span style={{ fontWeight: 300 }}>Precio Base:</span>
              {" "}
              <span style={{ fontFamily: fm, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>US$ 62,999</span>
            </span>
          </div>
          {/* Comisión — text.caption: 12px/400 · color-text-body · WCAG 10.1:1 · Lc 93.4 */}
          <p style={{
            fontFamily: fd, color: T.commissionText, fontSize: 12, fontWeight: 400,
            lineHeight: 1.3, textAlign: "center",
            marginTop: 8, marginBottom: 0, paddingBottom: 8,
          }}>
            Comisión: 7.5% del valor de compra o mínimo &gt;S&lt; 50
          </p>
        </div>

      </div>
    </div>
  );
}

function DetailCardV2Small(): JSX.Element {
  return (
    <div style={{
      width: W, height: H, position: "relative",
      boxShadow: T.shadowLg, borderRadius: "0 0 8px 8px", userSelect: "none",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: HDR_H,
        background: T.gradientVault, borderRadius: "8px 8px 0 0", zIndex: 2,
        boxSizing: "border-box", paddingLeft: 20, paddingRight: 20,
        display: "flex", flexDirection: "column",
      }}>
        {/* Línea vertical central */}
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 1, height: HEART_Y - 8 - 8, background: "rgba(255,255,255,0.22)", pointerEvents: "none" }} />
        {/* Divider horizontal split */}
        <div style={{ position: "absolute", top: DIVIDER_Y - 1, left: 20, right: "calc(50% + 36px)", height: 1, background: "rgba(255,255,255,0.22)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: DIVIDER_Y - 1, left: "calc(50% + 36px)", right: 20, height: 1, background: "rgba(255,255,255,0.22)", pointerEvents: "none" }} />
        <div style={{ display: "flex", flexShrink: 0, paddingTop: 12, paddingBottom: 12 }}>
          <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: fd, display: "block", fontSize: 14, fontWeight: 400, lineHeight: 1.25, color: T.onDarkMuted }}>Inicia</span>
              <span style={{ fontFamily: fd, display: "block", fontSize: 16, fontWeight: 700, lineHeight: 1, textTransform: "uppercase", color: T.onDark }}>LUNES 04</span>
            </div>
          </div>
          <div style={{ width: "50%", paddingLeft: 24, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 20, lineHeight: 1, color: T.onDark }}>12:30 pm</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <span style={{ fontFamily: fm, fontSize: 14, fontVariantNumeric: "tabular-nums", color: T.onDark }}>93</span>
            <IndicatorCircle><EyeIcon /></IndicatorCircle>
          </div>
          <div style={{ width: 88, flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: T.onDark }}>0</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8 }}>
            <IndicatorCircle><PeopleIcon /></IndicatorCircle>
            <span style={{ fontFamily: fm, fontSize: 14, fontVariantNumeric: "tabular-nums", color: T.onDark }}>0</span>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: HEART_Y, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button type="button" aria-label="me interesa" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: T.surface, borderRadius: 9999, border: `1px solid ${T.ghost}`, cursor: "pointer", color: "var(--color-vault, #22005C)", outline: "none", boxShadow: T.shadowSm }}>
          <HeartIcon />
        </button>
      </div>
      <div style={{ position: "absolute", top: HDR_H, left: 0, right: 0, bottom: 0, background: T.surface, borderRadius: "0 0 8px 8px", zIndex: 1, boxSizing: "border-box", paddingLeft: 20, paddingRight: 20, display: "flex", flexDirection: "column", paddingTop: 24, paddingBottom: 24, justifyContent: "center" }}>
        <p style={{ fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText, lineHeight: 1.3, textAlign: "center", marginTop: 0, marginBottom: 8 }}>
          ¡Oportunidad para el que sabe!
        </p>
        {/* Participa reducido */}
        <div style={{ borderRadius: 4, boxShadow: T.shadowMd }}>
          <button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none", background: T.gradientLive, paddingTop: 10, paddingBottom: 10, paddingLeft: 24, paddingRight: 24, borderRadius: 4, cursor: "pointer", outline: "none" }}>
            <span style={{ fontFamily: fd, color: T.participaText, fontSize: 15, fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em", textShadow: T.participaShadow }}>
              Participa
            </span>
          </button>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CoinIcon />
            <span style={{ fontFamily: fd, fontSize: 18, lineHeight: 1, color: T.priceCyan, marginLeft: 12 }}>
              <span style={{ fontWeight: 300 }}>Precio Base:</span>
              {" "}
              <span style={{ fontFamily: fm, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>US$ 62,999</span>
            </span>
          </div>
          <p style={{ fontFamily: fd, color: T.commissionText, fontSize: 12, fontWeight: 400, lineHeight: 1.3, textAlign: "center", marginTop: 8, marginBottom: 0, paddingBottom: 8 }}>
            Comisión: 7.5% del valor de compra o mínimo &gt;S&lt; 50
          </p>
        </div>
      </div>
    </div>
  );
}

function VisitasCardP3(): JSX.Element {
  return (
    <div style={{ width: W, height: VH, background: T.surface, borderRadius: 8, boxShadow: T.shadowLg, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 20px 16px 28px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: `1px solid ${T.ghost}` }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ position: "absolute", top: -8, left: -16 }}><CornerBracket position="tl" /></div>
          <div style={{ position: "absolute", bottom: -8, right: -8 }}><CornerBracket position="br" /></div>
          <span style={{ fontFamily: fd, fontSize: 20, fontWeight: 700, color: "oklch(15% 0.008 200)", lineHeight: 1 }}>Visitas</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--color-status-success, #4CAF50)", flexShrink: 0 }} />
            <span style={{ fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText }}>Disponible</span>
          </div>
        </div>
        <ChevronDown />
      </div>
      <div style={{ padding: "20px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div>
          <p style={{ fontFamily: fd, fontSize: 16, fontWeight: 400, color: "var(--color-vault-700, #3b1782)", lineHeight: 1.6, margin: "0 0 16px" }}>
            Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ height: 10, width: "55%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
            <div style={{ height: 10, width: "75%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
          </div>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <div style={{ height: 1, background: T.ghost, marginBottom: 20 }} />
          <p style={{ fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText, textAlign: "center", margin: "0 0 12px" }}>
            Para agendar tu visita:
          </p>
          {/* Ingresa — naranja ghost: mismo tono que Participa pero secundario */}
          <button type="button" style={{ width: "100%", cursor: "pointer", outline: "none", borderRadius: 4, paddingTop: 15, paddingBottom: 15, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "1.5px solid oklch(0.62 0.18 46)" }}>
            <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 700, color: "oklch(0.62 0.18 46)", lineHeight: 1 }}>
              Ingresa
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

const LABEL_STYLE = {
  fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const,
  letterSpacing: "0.1em", color: "#22005C", opacity: 0.4, margin: 0,
};

const orange = "var(--color-orange-600)";

function ChevronDown(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 7.5L10 12.5L15 7.5" style={{ stroke: orange }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CornerBracket({ position }: { position: "tl" | "br" }): JSX.Element {
  const isTL = position === "tl";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      {isTL
        ? <path d="M1 9V1H9" style={{ stroke: orange }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M15 7V15H7" style={{ stroke: orange }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );
}

function VisitasCardP2(): JSX.Element {
  return (
    <div style={{
      width: W, height: VH, background: T.surface, borderRadius: 8,
      boxShadow: T.shadowLg, display: "flex", flexDirection: "column",
    }}>

      {/* Header acordeón */}
      <div style={{
        padding: "20px 20px 16px 28px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        borderBottom: `1px solid ${T.ghost}`,
      }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ position: "absolute", top: -8, left: -16 }}>
            <CornerBracket position="tl" />
          </div>
          <div style={{ position: "absolute", bottom: -8, right: -8 }}>
            <CornerBracket position="br" />
          </div>
          <span style={{ fontFamily: fd, fontSize: 20, fontWeight: 700, color: "oklch(15% 0.008 200)", lineHeight: 1 }}>
            Visitas
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--color-status-success, #4CAF50)", flexShrink: 0 }} />
            <span style={{ fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText }}>
              Disponible
            </span>
          </div>
        </div>
        <ChevronDown />
      </div>

      {/* Cuerpo */}
      <div style={{ padding: "20px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div>
          <p style={{
            fontFamily: fd, fontSize: 16, fontWeight: 400,
            color: "var(--color-vault-700, #3b1782)",
            lineHeight: 1.6, margin: "0 0 16px",
          }}>
            Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ height: 10, width: "55%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
            <div style={{ height: 10, width: "75%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <div style={{ height: 1, background: T.ghost, marginBottom: 20 }} />
          <p style={{
            fontFamily: fd, fontSize: 12, fontWeight: 400,
            color: T.commissionText, textAlign: "center",
            margin: "0 0 12px",
          }}>
            Para agendar tu visita:
          </p>
          <button type="button" style={{
            width: "100%", cursor: "pointer", outline: "none", borderRadius: 4,
            paddingTop: 15, paddingBottom: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent",
            border: "1.5px solid var(--color-vault, #22005C)",
          }}>
            <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 700, color: "var(--color-vault, #22005C)", lineHeight: 1 }}>
              Ingresa
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}

function VisitasCard(): JSX.Element {
  return (
    <div style={{
      width: W, height: VH, background: T.surface, borderRadius: 8,
      boxShadow: T.shadowLg, display: "flex", flexDirection: "column",
    }}>

      {/* Header acordeón */}
      <div style={{
        padding: "20px 20px 16px 28px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        borderBottom: `1px solid ${T.ghost}`,
      }}>
        {/* Bloque de texto — brackets encuadran solo este bloque */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
          {/* TL — esquina superior-izquierda del bloque (apunta a esquina de la card) */}
          <div style={{ position: "absolute", top: -8, left: -16 }}>
            <CornerBracket position="tl" />
          </div>
          {/* BR — esquina inferior-derecha del bloque de texto */}
          <div style={{ position: "absolute", bottom: -8, right: -8 }}>
            <CornerBracket position="br" />
          </div>

          <span style={{ fontFamily: fd, fontSize: 20, fontWeight: 700, color: "oklch(15% 0.008 200)", lineHeight: 1 }}>
            Visitas
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--color-status-success, #4CAF50)", flexShrink: 0 }} />
            <span style={{ fontFamily: fd, fontSize: 12, fontWeight: 400, color: T.commissionText }}>
              Disponible
            </span>
          </div>
        </div>
        <ChevronDown />
      </div>

      {/* Cuerpo — dos grupos: contenido arriba / CTA abajo */}
      <div style={{ padding: "20px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Grupo superior */}
        <div>
          <p style={{
            fontFamily: fd, fontSize: 16, fontWeight: 400,
            color: "var(--color-vault-700, #3b1782)",
            lineHeight: 1.6, margin: "0 0 16px",
          }}>
            Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ height: 10, width: "55%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
            <div style={{ height: 10, width: "75%", borderRadius: 4, background: "oklch(88% 0.01 220)" }} />
          </div>
        </div>

        {/* Grupo inferior */}
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <div style={{ height: 1, background: T.ghost, marginBottom: 20, marginTop: 0 }} />
          <p style={{
            fontFamily: fd, fontSize: 12, fontWeight: 400,
            color: T.commissionText, textAlign: "center",
            margin: "0 0 12px",
          }}>
            Para agendar tu visita:
          </p>
          <div style={{ borderRadius: 4, boxShadow: T.shadowMd }}>
            <button type="button" style={{
              width: "100%", border: "none", cursor: "pointer", outline: "none",
              background: T.gradientVault, borderRadius: 4,
              paddingTop: 16, paddingBottom: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: fd, fontSize: 16, fontWeight: 700,
                color: T.onDark, lineHeight: 1,
              }}>
                Ingresa
              </span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

const DEMO_IMAGES = [
  "/demo/bronco.jpg",
  "/demo/bronco2.jpg",
  "/demo/bronco.jpg",
  "/demo/bronco2.jpg",
];

type Page = 1 | 2 | 3;

function PageToggle({ current, onChange }: { current: Page; onChange: (p: Page) => void }): JSX.Element {
  function handleP1(): void { onChange(1); }
  function handleP2(): void { onChange(2); }
  function handleP3(): void { onChange(3); }

  const base: React.CSSProperties = {
    fontFamily: fd, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
    padding: "6px 20px", borderRadius: 4, border: "none", cursor: "pointer",
    transition: "all 150ms",
  };
  const activeStyle: React.CSSProperties = {
    ...base,
    background: "linear-gradient(135deg, var(--color-vault, #22005C) 0%, var(--color-vault-mid, #3B1782) 100%)",
    color: "#fff",
    boxShadow: "0 2px 8px oklch(0.22 0.18 285 / 25%)",
  };
  const inactiveStyle: React.CSSProperties = {
    ...base,
    background: "#fff",
    color: "var(--color-vault, #22005C)",
    border: "1px solid color-mix(in oklch, var(--color-vault, #22005C) 20%, white)",
  };

  return (
    <div style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
      display: "flex", gap: 4, background: "#F2F4F3",
      padding: 4, borderRadius: 6,
      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
      zIndex: 100,
    }}>
      <button type="button" style={current === 1 ? activeStyle : inactiveStyle} onClick={handleP1}>Página 1</button>
      <button type="button" style={current === 2 ? activeStyle : inactiveStyle} onClick={handleP2}>Página 2</button>
      <button type="button" style={current === 3 ? activeStyle : inactiveStyle} onClick={handleP3}>Página 3</button>
    </div>
  );
}

export default function DetailCardV2Page(): JSX.Element {
  const [page, setPage] = useState<Page>(1);

  return (
    <div style={{ minHeight: "100vh", background: "#F2F4F3", fontFamily: fd }}>

      <PageToggle current={page} onChange={setPage} />

      {page === 2 && (
        <div style={{
          minHeight: "100vh", background: "#F2F4F3",
          display: "flex", alignItems: "flex-start",
          padding: "64px 80px", gap: 24,
          fontFamily: fd,
        }}>

          {/* Columna izquierda — igual que página 1 */}
          <div style={{ width: 443, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{
              background: T.gradientLive, borderRadius: 0,
              padding: "14px 20px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <button type="button" style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                color: "#FFFFFF", display: "flex", alignItems: "center", flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div>
                <p style={{ fontFamily: fd, fontSize: 18, fontWeight: 700, lineHeight: 1.2, color: "#FFFFFF", margin: 0, textShadow: T.participaShadow }}>
                  Volkswagen Gol 2015
                </p>
                <p style={{ fontFamily: fd, fontSize: 13, fontWeight: 400, lineHeight: 1.3, color: "rgba(255,255,255,0.85)", margin: "2px 0 0" }}>
                  Vendedor: SubasCars
                </p>
              </div>
            </div>
            <div style={{ width: 443, height: 380, borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
              <GalleryMain images={DEMO_IMAGES} />
            </div>
          </div>

          {/* Columna derecha — chips vault A + ghost Ingresa */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}>
            <DetailCardV2 />
            <AuctionConditions chipStyle="outlined" />
            <VisitasCardP2 />
          </div>

        </div>
      )}

      {page === 3 && (
        <div style={{
          minHeight: "100vh", background: "#F2F4F3",
          display: "flex", alignItems: "flex-start",
          padding: "64px 80px", gap: 24,
          fontFamily: fd,
        }}>

          {/* Columna izquierda — orange header + gallery */}
          <div style={{ width: 443, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{
              background: "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.62 0.18 46) 100%)",
              borderRadius: 0,
              padding: "14px 20px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <button type="button" style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                color: "#FFFFFF", display: "flex", alignItems: "center", flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div>
                <p style={{ fontFamily: fd, fontSize: 18, fontWeight: 700, lineHeight: 1.2, color: "#FFFFFF", margin: 0, textShadow: T.participaShadow }}>
                  Volkswagen Gol 2015
                </p>
                <p style={{ fontFamily: fd, fontSize: 13, fontWeight: 400, lineHeight: 1.3, color: "rgba(255,255,255,0.85)", margin: "2px 0 0" }}>
                  Vendedor: SubasCars
                </p>
              </div>
            </div>
            <div style={{ width: 443, height: 380, borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
              <GalleryMain images={DEMO_IMAGES} />
            </div>
          </div>

          {/* Columna derecha — orange chips + pequeño Participa + orange ghost Ingresa */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}>
            <DetailCardV2Small />
            <AuctionConditions chipStyle="orange" />
            <VisitasCardP3 />
          </div>

        </div>
      )}

      {page === 1 && (
    <div style={{
      minHeight: "100vh", background: "#F2F4F3",
      display: "flex", alignItems: "flex-start",
      padding: "64px 80px", gap: 24,
      fontFamily: fd,
    }}>

      {/* ── Columna izquierda: Header + Gallery — 443px ── */}
      <div style={{ width: 443, flexShrink: 0, display: "flex", flexDirection: "column" }}>

        {/* Detail page header */}
        <div style={{
          background: T.gradientLive,
          borderRadius: 0,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          {/* Back arrow */}
          <button type="button" style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            color: "#FFFFFF", display: "flex", alignItems: "center", flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Title block */}
          <div>
            <p style={{
              fontFamily: fd, fontSize: 18, fontWeight: 700, lineHeight: 1.2,
              color: "#FFFFFF", margin: 0,
              textShadow: T.participaShadow,
            }}>
              Volkswagen Gol 2015
            </p>
            <p style={{
              fontFamily: fd, fontSize: 13, fontWeight: 400, lineHeight: 1.3,
              color: "rgba(255,255,255,0.85)", margin: "2px 0 0",
            }}>
              Vendedor: SubasCars
            </p>
          </div>
        </div>

        {/* Gallery — sin border-radius superior porque el header lo cubre */}
        <div style={{ width: 443, height: 380, borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
          <GalleryMain images={DEMO_IMAGES} />
        </div>

      </div>

      {/* ── Columna derecha: Detail card + Conditions + Visitas ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}>
        <DetailCardV2 />
        <AuctionConditions />
        <VisitasCard />
      </div>

    </div>
      )}

    </div>
  );
}
