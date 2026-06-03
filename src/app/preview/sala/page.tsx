"use client";
import type { JSX } from "react";

/* ─── Sala de Subasta — Frame Preview ─────────────────────────────
   Ref: /preview/components/button-primary (DS tokens + patterns)
   Max width: 1024px · 3 columns: sidebar(175) + main(570) + right(279)
──────────────────────────────────────────────────────────────────── */

const F  = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";
const FM = "var(--vmc-font-mono, 'Roboto Mono', monospace)";

const SALA_CSS = `
  /* ══ SALA — Auction Room Frame Styles ══ */

  /* @property declarations for animatable custom properties */
  @property --bid-angle {
    syntax: '<angle>'; inherits: false; initial-value: 135deg;
  }

  /* ── Bid button — mismo sistema pvbtn ── */
  .sala-bid-btn {
    --bid-stop-a: var(--vmc-color-orange-600, oklch(0.65 0.18 55));
    --bid-stop-b: var(--vmc-color-vault-500, oklch(0.45 0.22 285));
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; height: 56px;
    padding: 0 20px;
    border-radius: var(--vmc-radius-full, 9999px);
    border: 2.5px solid transparent;
    cursor: pointer; position: relative; overflow: hidden;
    font-family: var(--vmc-font-display); font-size: 16px; font-weight: 700;
    color: oklch(1 0 0);
    text-shadow: 0 1px 3px oklch(0 0 0 / 0.25);
    background-image:
      linear-gradient(var(--bid-angle), var(--bid-stop-a) 0%, var(--bid-stop-a) 40%, var(--bid-stop-b) 100%),
      linear-gradient(135deg,
        oklch(1 0 0) 0%,
        var(--vmc-color-orange-400, oklch(0.78 0.15 55)) 25%,
        var(--vmc-color-vault-400, oklch(0.52 0.22 285)) 75%,
        oklch(1 0 0) 100%
      );
    background-origin: padding-box, border-box;
    background-clip:   padding-box, border-box;
    box-shadow:
      inset 0 1px 0 oklch(1 0 0 / 0.28),
      0 4px 16px oklch(0.65 0.18 55 / 0.35);
    transition: transform 0.2s ease, box-shadow 0.25s ease;
  }
  .sala-bid-btn::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.17) 0%, transparent 55%);
    pointer-events: none; z-index: 1;
  }
  .sala-bid-btn:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      inset 0 1px 0 oklch(1 0 0 / 0.22),
      0 8px 24px oklch(0.52 0.22 285 / 0.35),
      0 4px 10px oklch(0.65 0.18 55 / 0.40);
  }
  .sala-bid-btn:active { transform: scale(0.97) translateY(1px); }
  .sala-bid-btn-label { position: relative; z-index: 2; letter-spacing: 0.04em; }
  .sala-bid-btn-amount {
    position: relative; z-index: 2;
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 18px; font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  /* ── Live badge ── */
  .sala-live-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 8px; border-radius: 9999px;
    background: var(--vmc-color-orange-500, oklch(0.72 0.16 55));
    font-family: var(--vmc-font-display); font-size: 9px; font-weight: 700;
    color: oklch(1 0 0); text-transform: uppercase; letter-spacing: 0.10em;
  }
  .sala-live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: oklch(1 0 0);
    animation: sala-pulse 1.2s ease-in-out infinite;
  }
  @keyframes sala-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(0.75); }
  }

  /* ── Bid history item ── */
  .sala-bid-item {
    display: flex; flex-direction: column; gap: 3px;
    padding: 8px 12px;
    border-radius: var(--vmc-radius-sm, 4px);
    background: oklch(0.22 0.18 285 / 0.04);
    border: 1px solid oklch(0.22 0.18 285 / 0.08);
  }
  .sala-bid-item-row {
    display: flex; align-items: center; justify-content: space-between;
  }
  .sala-bid-item-user {
    font-family: var(--vmc-font-display); font-size: 11px; font-weight: 700;
    color: oklch(0.22 0.18 285); letter-spacing: 0.04em;
  }
  .sala-bid-item-amount {
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 12px; font-weight: 600;
    color: oklch(0.22 0.18 285); font-variant-numeric: tabular-nums;
  }
  .sala-bid-item-close {
    font-family: var(--vmc-font-display); font-size: 10px; font-weight: 400;
    color: oklch(0.55 0.03 220);
  }
  .sala-vmcbadge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 2px 6px; border-radius: 9999px;
    background: var(--vmc-color-vault-500, oklch(0.45 0.22 285));
    font-family: var(--vmc-font-display); font-size: 8px; font-weight: 700;
    color: oklch(1 0 0); letter-spacing: 0.06em;
  }

  /* ── Timer ── */
  .sala-timer {
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 22px; font-weight: 700;
    color: oklch(1 0 0); font-variant-numeric: tabular-nums;
    letter-spacing: -0.5px;
    text-shadow: 0 0 20px oklch(0.72 0.16 55 / 0.60);
  }

  /* ── Leaderboard row ── */
  .sala-lb-row {
    display: grid; grid-template-columns: 32px 1fr 48px;
    align-items: center; padding: 6px 8px;
    border-radius: 4px; gap: 4px;
  }
  .sala-lb-row--winner {
    background: linear-gradient(135deg,
      var(--vmc-color-orange-500, oklch(0.72 0.16 55)) 0%,
      var(--vmc-color-vault-500, oklch(0.45 0.22 285)) 100%
    );
  }

  /* ── Promo card (left sidebar) ── */
  .sala-promo {
    position: relative; overflow: hidden;
    border-radius: 12px; padding: 16px;
    background: linear-gradient(160deg,
      var(--vmc-color-orange-500, oklch(0.72 0.16 55)) 0%,
      var(--vmc-color-vault-500, oklch(0.45 0.22 285)) 100%
    );
    box-shadow: 0 8px 24px oklch(0.72 0.16 55 / 0.30);
  }
  .sala-promo::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, oklch(1 0 0 / 0.12) 0%, transparent 50%);
    pointer-events: none;
  }
  .sala-promo-cta {
    display: flex; align-items: center; justify-content: center;
    height: 36px; width: 100%;
    border-radius: 9999px; border: 2px solid oklch(1 0 0 / 0.80);
    background: oklch(1 0 0 / 0.10);
    font-family: var(--vmc-font-display); font-size: 13px; font-weight: 700;
    color: oklch(1 0 0); cursor: pointer;
    transition: background 0.15s ease;
  }
  .sala-promo-cta:hover { background: oklch(1 0 0 / 0.20); }

  /* ── Top header bar ── */
  .sala-header {
    height: 48px;
    background: var(--vmc-color-vault, oklch(0.22 0.18 285));
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; border-radius: 8px 8px 0 0;
  }

  /* ── Image nav arrow ── */
  .sala-arrow {
    width: 32px; height: 32px; border-radius: 50%;
    background: oklch(0 0 0 / 0.35);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: oklch(1 0 0);
    border: none;
    transition: background 0.15s ease;
  }
  .sala-arrow:hover { background: oklch(0 0 0 / 0.55); }

  /* ── Conectivity indicator ── */
  .sala-signal { display: flex; align-items: flex-end; gap: 2px; }
  .sala-signal-bar {
    width: 4px; border-radius: 2px;
    background: oklch(0.72 0.16 55);
  }

  /* ── Pill status (EN VIVO, PLACA) ── */
  .sala-status-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px;
    background: var(--vmc-color-vault, oklch(0.22 0.18 285));
    border-bottom: 1px solid oklch(1 0 0 / 0.08);
  }
  .sala-placa {
    padding: 2px 8px; border-radius: 4px;
    background: oklch(1 0 0 / 0.10);
    font-family: var(--vmc-font-mono, 'Roboto Mono', monospace);
    font-size: 10px; font-weight: 600; color: oklch(1 0 0 / 0.75);
    letter-spacing: 0.08em;
  }

  /* ── Price chip (scrolling row) ── */
  .sala-price-chip {
    display: flex; flex-direction: column; gap: 1px;
    flex-shrink: 0;
    border-right: 1px solid oklch(0.22 0.18 285 / 0.08);
    padding: 6px 12px;
  }

  /* ── Avatar stack ── */
  .sala-avatar-stack { display: flex; align-items: center; }
  .sala-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    border: 2px solid oklch(1 0 0);
    background: var(--vmc-color-vault-500, oklch(0.45 0.22 285));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--vmc-font-display); font-size: 8px; font-weight: 700;
    color: oklch(1 0 0);
    margin-left: -8px;
  }
  .sala-avatar:first-child { margin-left: 0; }
`;

/* ── Icons ── */
function ChevronLeft(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10,3 5,8 10,13" />
    </svg>
  );
}
function ChevronRight(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,3 11,8 6,13" />
    </svg>
  );
}
function UserIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="5" r="2.5" />
      <path d="M2 12 C2 9.2 4.2 7 7 7 C9.8 7 12 9.2 12 12" />
    </svg>
  );
}
function CoinsIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5" cy="7" r="3.5" />
      <path d="M8.5 4.5 C10.4 4.5 12 5.8 12 7.5 C12 9.2 10.4 10.5 8.5 10.5" />
    </svg>
  );
}
function PeopleIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5" cy="5" r="2" />
      <circle cx="9.5" cy="5" r="2" />
      <path d="M1 12 C1 9.8 2.8 8 5 8 C7.2 8 9 9.8 9 12" />
      <path d="M9 8.5 C10.6 8.5 12 9.7 12 11" />
    </svg>
  );
}
function ClockIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="5.5" />
      <polyline points="7,4 7,7 9,9" />
    </svg>
  );
}
function TrophyIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 8.5C4.07 8.5 2.5 6.93 2.5 5V1.5h7V5C9.5 6.93 7.93 8.5 6 8.5Z" />
      <path d="M2.5 2.5H1a1 1 0 000 2h1.5M9.5 2.5H11a1 1 0 010 2H9.5" />
      <path d="M4.5 8.5V10M7.5 8.5V10M3.5 10h5" strokeWidth="1" stroke="currentColor" fill="none" />
    </svg>
  );
}

/* ── Bid History Item ── */
interface BidItemProps {
  user: string;
  amount: string;
  closeAt: string;
  isVmc?: boolean;
  isHighlight?: boolean;
}
function BidItem({ user, amount, closeAt, isVmc = false, isHighlight = false }: BidItemProps): JSX.Element {
  return (
    <div className="sala-bid-item" style={isHighlight ? { borderColor: "oklch(0.72 0.16 55 / 0.30)", background: "oklch(0.72 0.16 55 / 0.05)" } : {}}>
      <div className="sala-bid-item-row">
        <span className="sala-bid-item-user" style={{ color: isHighlight ? "oklch(0.62 0.18 55)" : undefined }}>
          {user} {isHighlight && "★"}
        </span>
        <span className="sala-bid-item-amount">ha propuesto US$ {amount}</span>
      </div>
      <div className="sala-bid-item-row">
        <span className="sala-bid-item-close">Cierra en US$ {closeAt}</span>
        {isVmc && <span className="sala-vmcbadge">VMCSUBASTAS</span>}
        {!isVmc && <span style={{ fontFamily: F, fontSize: 9, color: "oklch(0.65 0.03 220)" }}>A la una</span>}
      </div>
    </div>
  );
}

/* ── Signal bars ── */
function SignalBars(): JSX.Element {
  return (
    <div className="sala-signal">
      {[5, 8, 11, 14].map(function renderBar(h, i) {
        return (
          <div key={i} className="sala-signal-bar"
            style={{ height: h, opacity: i < 3 ? 1 : 0.3 }}
          />
        );
      })}
    </div>
  );
}

/* ── Leaderboard row ── */
interface LbRowProps { pos: number; cuu: string; bids: number; isWinner: boolean; }
function LbRow({ pos, cuu, bids, isWinner }: LbRowProps): JSX.Element {
  return (
    <div className={`sala-lb-row${isWinner ? " sala-lb-row--winner" : ""}`}>
      <span style={{
        fontFamily: F, fontSize: 11, fontWeight: 700,
        color: isWinner ? "oklch(1 0 0)" : "oklch(0.55 0.03 220)",
      }}>{pos}°</span>
      <span style={{
        fontFamily: FM, fontSize: 11, fontWeight: 600,
        color: isWinner ? "oklch(1 0 0)" : "oklch(0.22 0.18 285)",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {cuu} {isWinner && <TrophyIcon />}
      </span>
      <span style={{
        fontFamily: F, fontSize: 11, fontWeight: 700, textAlign: "center",
        color: isWinner ? "oklch(1 0 0)" : "oklch(0.22 0.18 285)",
      }}>{bids}</span>
    </div>
  );
}

/* ══ MAIN PAGE ══ */
export default function SalaPage(): JSX.Element {
  return (
    <main style={{
      minHeight: "100vh",
      background: "oklch(0.96 0.004 160)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "32px 16px",
    }}>
      <style dangerouslySetInnerHTML={{ __html: SALA_CSS }} />

      <div style={{ width: "100%", maxWidth: 1024, display: "flex", flexDirection: "column", gap: 0 }}>

        {/* ── Header bar ── */}
        <div className="sala-header">
          {/* Left: user chip + bids */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 10px 4px 6px", borderRadius: 9999,
              background: "oklch(1 0 0 / 0.10)", border: "1px solid oklch(1 0 0 / 0.15)",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "linear-gradient(135deg, oklch(0.72 0.16 55), oklch(0.45 0.22 285))",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "oklch(1 0 0)",
              }}>
                <UserIcon />
              </div>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "oklch(1 0 0)", letterSpacing: "0.04em" }}>MICUU</span>
              <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 700, color: "oklch(0.72 0.16 55)", letterSpacing: "0.06em" }}>JA8NEE</span>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 9999,
              background: "oklch(0.72 0.16 55 / 0.15)", border: "1px solid oklch(0.72 0.16 55 / 0.30)",
            }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "oklch(0.72 0.16 55)" }}>Mis Bids:</span>
              <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 700, color: "oklch(1 0 0)" }}>1</span>
            </div>
          </div>

          {/* Right: fondos + oferta + conectividad */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: "oklch(1 0 0 / 0.50)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Fondos</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CoinsIcon />
                <span style={{ fontFamily: FM, fontSize: 12, fontWeight: 700, color: "oklch(1 0 0)", fontVariantNumeric: "tabular-nums" }}>$100</span>
              </div>
            </div>
            <div style={{ width: 1, height: 24, background: "oklch(1 0 0 / 0.12)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: "oklch(1 0 0 / 0.50)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Oferta</span>
              <span style={{ fontFamily: FM, fontSize: 12, fontWeight: 700, color: "oklch(0.72 0.16 55)", fontVariantNumeric: "tabular-nums" }}>47,292</span>
            </div>
            <div style={{ width: 1, height: 24, background: "oklch(1 0 0 / 0.12)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: "oklch(1 0 0 / 0.50)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Conectividad</span>
              <SignalBars />
            </div>
          </div>
        </div>

        {/* ── Main 3-column layout ── */}
        <div style={{ display: "flex", background: "oklch(1 0 0)", borderRadius: "0 0 8px 8px", overflow: "hidden", boxShadow: "0 8px 32px oklch(0.22 0.18 285 / 0.12)" }}>

          {/* ── LEFT SIDEBAR (175px) ── */}
          <div style={{
            width: 175, flexShrink: 0,
            background: "linear-gradient(160deg, oklch(0.22 0.18 285) 0%, oklch(0.30 0.20 285) 100%)",
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            {/* Avatar placeholder */}
            <div style={{
              height: 140, margin: 12, borderRadius: 8,
              background: "oklch(1 0 0 / 0.08)", border: "1px solid oklch(1 0 0 / 0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "oklch(1 0 0 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "oklch(1 0 0 / 0.50)" }}>
                <UserIcon />
              </div>
            </div>

            {/* Promo card */}
            <div style={{ padding: "0 12px 12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="sala-promo">
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(1 0 0 / 0.80)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ¡Dile bye al riesgo alto!
                  </p>
                  <p style={{ fontFamily: F, fontSize: 18, fontWeight: 800, color: "oklch(1 0 0)", margin: "0 0 6px", lineHeight: 1.1 }}>
                    Compra<br />Subaspass
                  </p>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 400, color: "oklch(1 0 0 / 0.75)", margin: "0 0 12px", lineHeight: 1.5 }}>
                    Y participa en las subastas sin consignar y sin restricciones.
                  </p>
                  <button className="sala-promo-cta" type="button">
                    Comprar ahora →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTER MAIN (flex: 1) ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

            {/* Status bar */}
            <div className="sala-status-bar">
              <div className="sala-live-badge"><div className="sala-live-dot" />EN VIVO</div>
              <span style={{ fontFamily: FM, fontSize: 13, fontWeight: 700, color: "oklch(1 0 0)", letterSpacing: "0.02em" }}>Toyota Etios 2021</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 500, color: "oklch(1 0 0 / 0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Placa</span>
              <span className="sala-placa">P3U448</span>
            </div>

            {/* Price scroll row */}
            <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid oklch(0.22 0.18 285 / 0.07)", background: "oklch(0.98 0.002 220)" }}>
              {["Precio Base: US$ 2,000", "Precio Base: US$ 2,000", "Precio Base: US$ 2,000"].map(function renderPrice(p, i) {
                return (
                  <div key={i} className="sala-price-chip">
                    <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: "oklch(0.60 0.02 220)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Precio Base</span>
                    <span style={{ fontFamily: FM, fontSize: 13, fontWeight: 700, color: "oklch(0.22 0.18 285)", fontVariantNumeric: "tabular-nums" }}>US$ 2,000</span>
                  </div>
                );
              })}
            </div>

            {/* Image area */}
            <div style={{ position: "relative", flex: 1, minHeight: 200, background: "oklch(0.18 0.10 285)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {/* Placeholder vehicle image */}
              <div style={{
                width: "100%", height: 240,
                background: "linear-gradient(135deg, oklch(0.18 0.10 285) 0%, oklch(0.25 0.15 285) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "oklch(1 0 0 / 0.30)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Imagen del Vehículo
                </span>
              </div>

              {/* Nav arrows */}
              <button className="sala-arrow" type="button" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                <ChevronLeft />
              </button>
              <button className="sala-arrow" type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
                <ChevronRight />
              </button>

              {/* Counter */}
              <div style={{ position: "absolute", bottom: 10, right: 12, padding: "3px 8px", borderRadius: 4, background: "oklch(0 0 0 / 0.55)" }}>
                <span style={{ fontFamily: FM, fontSize: 10, color: "oklch(1 0 0 / 0.80)" }}>1 / 18</span>
              </div>
            </div>

            {/* Bottom bar: conectados + timer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px",
              background: "var(--vmc-color-vault, oklch(0.22 0.18 285))",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PeopleIcon />
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "oklch(1 0 0)", letterSpacing: "0.02em" }}>18</span>
                <span style={{ fontFamily: F, fontSize: 9, fontWeight: 500, color: "oklch(1 0 0 / 0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Conectados</span>
                <div className="sala-avatar-stack" style={{ marginLeft: 4 }}>
                  {["JH", "KC", "AB"].map(function renderAv(a) {
                    return <div key={a} className="sala-avatar">{a}</div>;
                  })}
                  <div className="sala-avatar" style={{ background: "oklch(1 0 0 / 0.15)", fontSize: 7 }}>+15</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "oklch(0.72 0.16 55)" }}>
                  <ClockIcon />
                  <span className="sala-timer">00:00:10</span>
                </div>
                <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: "oklch(1 0 0 / 0.40)", textTransform: "uppercase", letterSpacing: "0.10em" }}>Inicio hace</span>
              </div>
            </div>

            {/* Banner placeholder */}
            <div style={{
              height: 64, margin: "8px",
              borderRadius: 6, border: "1px dashed oklch(0.22 0.18 285 / 0.15)",
              background: "oklch(0.96 0.004 160)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: "oklch(0.70 0.02 220)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Banner</span>
            </div>
          </div>

          {/* ── RIGHT PANEL (279px) ── */}
          <div style={{
            width: 279, flexShrink: 0,
            display: "flex", flexDirection: "column",
            borderLeft: "1px solid oklch(0.22 0.18 285 / 0.07)",
          }}>
            {/* Header */}
            <div style={{
              padding: "10px 14px",
              background: "var(--vmc-color-vault, oklch(0.22 0.18 285))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "oklch(1 0 0 / 0.60)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Propuesta · Bid Actual
              </span>
            </div>

            {/* Current bid display */}
            <div style={{
              padding: "16px 14px 12px",
              background: "linear-gradient(180deg, oklch(0.22 0.18 285 / 0.04) 0%, transparent 100%)",
              borderBottom: "1px solid oklch(0.22 0.18 285 / 0.08)",
              textAlign: "center",
            }}>
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: "oklch(0.60 0.02 220)", textTransform: "uppercase", letterSpacing: "0.10em" }}>US$</span>
              <div style={{ fontFamily: FM, fontSize: 36, fontWeight: 800, color: "oklch(0.22 0.18 285)", fontVariantNumeric: "tabular-nums", lineHeight: 1.1, letterSpacing: "-1px" }}>
                5,079
              </div>
            </div>

            {/* Bid history */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, padding: "10px 12px", overflowY: "auto" }}>
              <BidItem user="KAHTH4" amount="5,079" closeAt="5,079" isVmc={false} />
              <BidItem user="VMCSUBASTAS" amount="5,079" closeAt="5,079" isVmc={true} />
              <BidItem user="JA8NEE" amount="5,179" closeAt="5,179" isHighlight={true} />
              <BidItem user="VMCSUBASTAS" amount="5,179" closeAt="5,179" isVmc={true} />
            </div>

            {/* BIDEAR CTA */}
            <div style={{ padding: "12px" }}>
              <button className="sala-bid-btn" type="button">
                <span className="sala-bid-btn-label">BIDEAR</span>
                <span className="sala-bid-btn-amount">US$ 6,559</span>
              </button>
            </div>

            {/* Leaderboard */}
            <div style={{ borderTop: "1px solid oklch(0.22 0.18 285 / 0.08)", padding: "0 8px 12px" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 48px", padding: "8px 8px 6px" }}>
                {["Puesto", "C.U.U", "Bids"].map(function renderLbH(h) {
                  return (
                    <span key={h} style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: "oklch(0.60 0.02 220)", textTransform: "uppercase", letterSpacing: "0.10em", textAlign: h === "Bids" ? "center" : "left" }}>
                      {h}
                    </span>
                  );
                })}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <LbRow pos={1} cuu="JA8NEE" bids={2} isWinner={true} />
                <LbRow pos={2} cuu="BEKVS1" bids={1} isWinner={false} />
                <LbRow pos={3} cuu="KAHTH4" bids={1} isWinner={false} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
