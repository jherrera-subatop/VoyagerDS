/**
 * Page Upgrade — Desktop Homepage Composition
 * Figma ref: node 816-12594 (7bjDwC20BX1AFrv9Q8BOIb) — 1424px desktop frame
 *
 * Component status:
 *   ✅ Sidebar        — vault bg, nav, cinematic
 *   ✅ Header         — vault bg, orange login pill
 *   ✅ QuickFilters   — cinematic OfferType + CategoryCard
 *   ✅ ListingArea    — cinematic cards
 *   ✅ Footer         — vault bg, full-width
 *   🆕 HeroBanner    — UPGRADE PROPOSAL — cinematic vault gradient
 *   🆕 SubassBanner  — UPGRADE PROPOSAL — secondary promo
 */

"use client";

import type { JSX } from "react";
import Sidebar from "@/features/Sidebar/Sidebar";
import Header from "@/features/Header/Header";
import QuickFilters from "@/features/QuickFilters/QuickFilters";
import ListingArea from "@/features/ListingArea/ListingArea";
import Footer from "@/features/Footer/Footer";

/* ─── tokens (swap for var(--token) when primitives done) ─────────────────── */
const C = {
  vault:      "oklch(0.22 0.18 285)",
  vaultLight: "oklch(0.30 0.20 285)",
  vault500:   "oklch(0.42 0.22 285)",
  orange:     "oklch(0.72 0.16 55)",
  orangeMid:  "oklch(0.65 0.20 55)",
  teal:       "oklch(0.78 0.14 195)",
  white:      "oklch(1 0 0)",
  white60:    "oklch(1 0 0 / 0.60)",
  white30:    "oklch(1 0 0 / 0.30)",
  white10:    "oklch(1 0 0 / 0.10)",
  text:       "oklch(0.15 0.008 200)",
  textMuted:  "oklch(0.38 0.04 280 / 0.60)",
  surface:    "oklch(0.96 0.004 160)",
  card:       "oklch(1 0 0)",
} as const;

const FD = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const FM = "var(--font-mono,    'Roboto Mono', monospace)";

/* ─── Hero Banner — UPGRADE PROPOSAL ───────────────────────────────────────── */
function HeroBanner(): JSX.Element {
  return (
    <section style={{
      position: "relative", width: "100%", height: 320,
      overflow: "hidden", borderRadius: 0, flexShrink: 0,
    }}>
      {/* Vault gradient bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(158deg, ${C.vault} 0%, ${C.vaultLight} 55%, ${C.vault500} 100%)`,
      }} />

      {/* Orange glow accent — top-right */}
      <div style={{
        position: "absolute", top: -80, right: 80, width: 400, height: 500,
        background: `radial-gradient(ellipse at center, ${C.orange} 0%, transparent 60%)`,
        opacity: 0.15, transform: "rotate(-15deg)",
      }} />

      {/* Teal accent — bottom-left */}
      <div style={{
        position: "absolute", bottom: -60, left: 120, width: 280, height: 280,
        background: `radial-gradient(ellipse at center, ${C.teal} 0%, transparent 65%)`,
        opacity: 0.10,
      }} />

      {/* Car silhouette — right side */}
      <div style={{
        position: "absolute", bottom: 20, right: 60,
        width: 380, height: 190, opacity: 0.14,
      }}>
        <svg viewBox="0 0 380 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="190" cy="168" rx="165" ry="13" fill="white" opacity="0.4"/>
          <path d="M 30 140 L 50 88 Q 80 48 148 40 L 248 38 Q 312 38 338 72 L 354 102 L 362 126 L 362 140 Z"
            fill="white" />
          <path d="M 95 40 L 112 82 L 268 82 L 254 40 Z" fill="white" opacity="0.5"/>
          <circle cx="100" cy="140" r="24" fill="white" />
          <circle cx="100" cy="140" r="14" fill="white" opacity="0.3"/>
          <circle cx="284" cy="140" r="24" fill="white" />
          <circle cx="284" cy="140" r="14" fill="white" opacity="0.3"/>
        </svg>
      </div>

      {/* Bottom fade to surface */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 64,
        background: `linear-gradient(to bottom, transparent, ${C.surface})`,
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        padding: "0 48px",
        gap: 0,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>

          {/* Live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              height: 24, padding: "0 12px", borderRadius: 9999,
              background: C.orange,
            }}>
              <span style={{
                display: "inline-block", width: 7, height: 7, borderRadius: 9999,
                background: C.white, animation: "hero-pulse 1.5s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: FD, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.10em", color: C.white, textTransform: "uppercase" }}>
                En Vivo
              </span>
            </div>
            <span style={{ fontFamily: FD, fontSize: 11, fontWeight: 500,
              color: C.white60, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Subasta #4821 · 3 lotes activos
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ margin: 0, fontFamily: FD, fontSize: 12, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", color: C.white60 }}>
              Lote destacado
            </p>
            <h2 style={{ margin: 0, fontFamily: FD, fontSize: 40, fontWeight: 800,
              lineHeight: 1.05, color: C.white, letterSpacing: "-0.03em" }}>
              BMW X5<br/>xDrive 2023
            </h2>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.10em", textTransform: "uppercase", color: C.orange }}>
              Precio base
            </span>
            <span style={{ fontFamily: FM, fontSize: 28, fontWeight: 700,
              color: C.white, letterSpacing: "-0.02em" }}>
              US$ 48,500
            </span>
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            {/* pvbtn-style orange→vault CTA */}
            <button type="button" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              height: 48, padding: "0 28px", borderRadius: 9999,
              border: "2.5px solid transparent", cursor: "pointer",
              fontFamily: FD, fontSize: 15, fontWeight: 700,
              color: C.white, letterSpacing: "0.02em",
              textShadow: "0 1px 3px rgb(0 0 0 / 0.25)",
              backgroundImage: `
                linear-gradient(135deg, ${C.orange} 0%, ${C.orange} 40%, ${C.vault500} 100%),
                linear-gradient(135deg, ${C.white} 0%, ${C.orangeMid} 25%, ${C.vault500} 75%, ${C.white} 100%)
              `,
              backgroundOrigin: "padding-box, border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: `0 6px 24px ${C.orange}55`,
            }}>
              Ver Subasta →
            </button>

            {/* Ghost CTA */}
            <button type="button" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              height: 48, padding: "0 24px", borderRadius: 9999,
              border: `1.5px solid ${C.white30}`, cursor: "pointer",
              background: "transparent",
              fontFamily: FD, fontSize: 14, fontWeight: 600,
              color: C.white, letterSpacing: "0.01em",
            }}>
              Ver todas las subastas
            </button>

            {/* Timer pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: C.white10, borderRadius: 8, padding: "8px 14px",
              border: `1px solid ${C.white10}`,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={C.white60}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
              </svg>
              <span style={{ fontFamily: FM, fontSize: 15, fontWeight: 600, color: C.white }}>
                02:14:37
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}

/* ─── SubasPass banner ──────────────────────────────────────────────────────── */
function SubassBanner(): JSX.Element {
  return (
    <div style={{
      margin: "0 24px",
      height: 80, borderRadius: 12, overflow: "hidden", position: "relative",
      background: `linear-gradient(120deg, ${C.vault500} 0%, ${C.teal} 100%)`,
      display: "flex", alignItems: "center", padding: "0 24px", gap: 16,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 9999, background: C.white10,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill={C.white}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div>
        <p style={{ margin: 0, fontFamily: FD, fontSize: 14, fontWeight: 700,
          color: C.white, letterSpacing: "0.02em" }}>
          SubasPass Premium
        </p>
        <p style={{ margin: 0, fontFamily: FD, fontSize: 12, fontWeight: 400,
          color: C.white60 }}>
          Acceso anticipado a todas las subastas del mes
        </p>
      </div>
      <button type="button" style={{
        marginLeft: "auto", flexShrink: 0,
        height: 32, padding: "0 16px", borderRadius: 9999,
        border: `1.5px solid ${C.white}`, background: "transparent",
        cursor: "pointer", fontFamily: FD, fontSize: 11, fontWeight: 700,
        color: C.white, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Ver más
      </button>
    </div>
  );
}

/* ─── Upgrade badge ─────────────────────────────────────────────────────────── */
interface UpgradeBadgeProps { label: string; done: boolean }
function UpgradeBadge({ label, done }: UpgradeBadgeProps): JSX.Element {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      height: 18, padding: "0 8px", borderRadius: 4,
      background: done ? `${C.teal}18` : `${C.orange}18`,
      fontFamily: FD, fontSize: 8, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: done ? C.teal : C.orange,
    }}>
      {done ? "✅" : "🆕"} {label}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function PageUpgradePage(): JSX.Element {
  return (
    <div style={{ minHeight: "100vh", background: C.surface }}>

      {/* ── Page annotation bar ─────────────────────────────────────────────── */}
      <div style={{
        background: C.vault, borderBottom: `1px solid ${C.white10}`,
        padding: "8px 24px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: FD, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: C.orange }}>
            PAGE 2 — DESKTOP HOMEPAGE UPGRADE
          </span>
          <span style={{ fontFamily: FD, fontSize: 9, color: C.white30 }}>
            Figma node 816-12594 · 1424px desktop frame
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { label: "Sidebar", done: true },
            { label: "Header", done: true },
            { label: "Hero", done: false },
            { label: "QuickFilters", done: true },
            { label: "ListingArea", done: true },
            { label: "Footer", done: true },
          ].map(function renderBadge(b) {
            return <UpgradeBadge key={b.label} label={b.label} done={b.done} />;
          })}
        </div>
      </div>

      {/* ── Desktop shell — 1024px max ──────────────────────────────────────── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 36px)",
        maxWidth: 1024, margin: "0 auto", width: "100%",
        boxShadow: "0 0 0 1px oklch(0.22 0.18 285 / 0.10)" }}>

        {/* Sidebar ✅ */}
        <div style={{ width: 256, flexShrink: 0, position: "sticky", top: 36,
          height: "calc(100vh - 36px)", overflowY: "auto" }}>
          <Sidebar />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

          {/* Header ✅ */}
          <Header />

          {/* Scrollable content */}
          <div style={{ flex: 1, background: C.surface, display: "flex",
            flexDirection: "column", gap: 0 }}>

            {/* Hero banner 🆕 */}
            <HeroBanner />

            {/* Content sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24,
              padding: "24px 0" }}>

              {/* SubasPass banner 🆕 */}
              <SubassBanner />

              {/* QuickFilters ✅ */}
              <div style={{ padding: "0 24px" }}>
                <QuickFilters />
              </div>

              {/* ListingArea ✅ */}
              <div style={{ padding: "0 24px" }}>
                <ListingArea />
              </div>

              {/* Help center placeholder */}
              <div style={{ margin: "0 24px", height: 120, borderRadius: 12,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${C.text} 0%, oklch(0.26 0.19 285) 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 16, padding: "0 32px",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill={C.white60}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                <div>
                  <p style={{ margin: 0, fontFamily: FD, fontSize: 16, fontWeight: 700,
                    color: C.white, letterSpacing: "0.01em" }}>
                    ¿Necesitas ayuda?
                  </p>
                  <p style={{ margin: 0, fontFamily: FD, fontSize: 13, fontWeight: 400,
                    color: C.white60 }}>
                    Centro de soporte VMC Subastas
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer ✅ */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
