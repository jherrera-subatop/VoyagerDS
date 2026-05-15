/**
 * ListingArea — Voyager DS
 * Figma node: 252-2215 · file: 7bjDwC20BX1AFrv9Q8BOIb
 */

import type { JSX } from "react";

const STYLES = `
  .vmc-profile-link {
    border-radius: 4px; padding: 6px 10px;
    transition: background 150ms cubic-bezier(0.3,0,0,1),
                transform  150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-profile-link svg { transition: transform 150ms cubic-bezier(0.3,0,0,1); }
  .vmc-profile-link:hover { background: var(--vmc-color-background-secondary); }
  .vmc-profile-link:hover svg { transform: translateX(3px); }
  .vmc-profile-link:active {
    background: color-mix(in srgb, var(--vmc-color-text-brand) 22%, white);
    transform: scale(0.97);
  }
  .vmc-profile-link:focus-visible {
    outline: 2px solid var(--vmc-color-text-brand); outline-offset: 2px;
  }
  .vmc-like-btn {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 9999px; border: none; cursor: pointer;
    background: var(--vmc-color-background-card);
    color: var(--vmc-color-text-brand);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    flex-shrink: 0;
    transition: background 120ms cubic-bezier(0.3,0,0,1), transform 120ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-like-btn:hover { background: color-mix(in oklch, var(--vmc-color-background-card) 88%, var(--vmc-color-text-brand)); }
  .vmc-like-btn:active { transform: scale(0.92); }
  .vmc-like-btn:focus-visible { outline: 2px solid var(--vmc-color-text-brand); outline-offset: 2px; }
  .vmc-listing-root { container-type: inline-size; }
  .vmc-listing-cards { display: flex; gap: 12px; }
  @container (max-width: 480px) {
    .vmc-listing-cards {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .vmc-listing-cards > * { width: auto !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .vmc-profile-link, .vmc-profile-link svg, .vmc-like-btn { transition: none; }
  }
`;

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const M = "var(--font-mono, 'Roboto Mono', monospace)";

const V = {
  brand:      "var(--vmc-color-text-brand)",
  textPri:    "var(--vmc-color-text-primary)",
  bgCard:     "var(--vmc-color-background-card)",
  priceColor: "var(--vmc-color-cyan-700)",
  gradLive:   "linear-gradient(171.67deg, var(--vmc-color-orange-500) 0%, var(--vmc-color-orange-600) 50%, var(--vmc-color-orange-700) 100%)",
  gradNeg:    "linear-gradient(180deg, var(--vmc-color-cyan-500) 0%, var(--vmc-color-cyan-600) 50%, var(--vmc-color-cyan-700) 100%)",
  shadow:     "0 0 16px rgba(0,0,0,0.14)",
  liveBadge:  "color-mix(in oklch, var(--vmc-color-orange-600) 75%, oklch(0 0 0))",
} as const;

/* ── Corner brackets ── */
function CornerTL(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0 }}>
      <path d="M0 0H3.3V3.3H3.3V6.7H0V3.3H0V0ZM3.3 0H6.7 6.7 10V3.3H6.7 6.7 3.3V0ZM3.3 6.7H0V10H3.3V6.7Z" fill={V.brand} />
    </svg>
  );
}

function CornerBR(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", bottom: 0, right: 0 }}>
      <path d="M10 10L6.7 10 6.7 6.7 6.7 3.3 10 3.3 10 6.7 10 10ZM6.7 10L3.3 10 0 10 0 6.7 3.3 6.7 6.7 6.7 6.7 10ZM6.7 3.3L10 3.3 10 0 6.7 0 6.7 3.3Z" fill={V.brand} />
    </svg>
  );
}

/* ── Chevron right ── */
function ChevronRight(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
      style={{ width: 12, height: 12, marginLeft: 8 }}>
      <path d="M6.437 2.894C5.276 4.054 5.276 5.936 6.437 7.097L11.34 12 6.437 16.904C5.276 18.065 5.276 19.946 6.437 21.107 7.598 22.268 9.479 22.268 10.64 21.107L17.505 14.242C18.089 13.658 18.398 12.903 18.431 12.138 18.468 11.282 18.159 10.413 17.505 9.759L10.64 2.894C9.479 1.733 7.598 1.733 6.437 2.894Z" />
    </svg>
  );
}

/* ── Coin icon ── */
function CoinIcon(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z"
        fill="var(--vmc-color-cyan-600)" fillOpacity={0.55} />
      <path d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23Z"
        fill="var(--vmc-color-cyan-600)" />
      <path d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z"
        fill="var(--vmc-color-cyan-600)" />
      <path d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10 11.7 10 11.7 10 11.8 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.3C11.3 8.1 10.9 7.9 10.9 7.4ZM12.4 11.7V10.2C12.9 10.4 13.2 10.6 13.2 11 13.2 11.4 12.9 11.7 12.4 11.7Z"
        fill="white" />
    </svg>
  );
}

/* ── Heart icon ── */
function HeartIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z" />
    </svg>
  );
}

/* ── Status badges ── */
function LiveBadge(): JSX.Element {
  return (
    <div style={{ position: "absolute", top: 13, right: 12, width: 16, height: 16,
      background: "var(--vmc-color-orange-600)", borderRadius: 9999,
      boxShadow: "0 2px 4px rgba(0,0,0,0.25)", zIndex: 2 }} aria-hidden="true" />
  );
}

function UpcomingBadge(): JSX.Element {
  return (
    <div style={{ position: "absolute", top: 13, right: 12, display: "flex",
      alignItems: "center", justifyContent: "center",
      width: 16, height: 16, background: V.liveBadge, borderRadius: 9999,
      boxShadow: "0 2px 4px rgba(0,0,0,0.25)", zIndex: 2 }} aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
        <path d="M14 14.1C14.1 14 14.3 13.9 14.3 13.7V7.7C14.3 7.5 14.1 7.4 13.9 7.4H12.3C12.2 7.4 12 7.5 12 7.7V12.7L8.5 15C8.4 15.1 8.3 15.4 8.4 15.5L9.3 16.8C9.4 17 9.6 17 9.8 16.9L14 14.1Z" />
        <path d="M12 2C7.6 2 4 5.6 4 10S7.6 18 12 18 20 14.4 20 10 16.4 2 12 2Z" />
      </svg>
    </div>
  );
}

/* ── Card types ── */
type CardType = "live-publicada" | "live-live" | "negotiable" | "live-upcoming";

interface CardItem {
  href:  string;
  name:  string;
  year:  string;
  price: string;
  type:  CardType;
}

const CARDS: CardItem[] = [
  { href: "/oferta/61511", name: "Chevrolet Joy Sedan", year: "2021", price: "US$ 5,699",  type: "live-publicada" },
  { href: "/oferta/61510", name: "Chery Tiggo 2",       year: "2023", price: "US$ 6,699",  type: "live-live"      },
  { href: "/oferta/61460", name: "Peugeot New 2008",    year: "2022", price: "US$ 7,999",  type: "negotiable"     },
  { href: "/oferta/61506", name: "Nissan Xtrail",       year: "2022", price: "US$ 20,999", type: "live-upcoming"  },
  { href: "/oferta/61512", name: "Toyota Corolla",      year: "2023", price: "US$ 12,499", type: "live-live"      },
  { href: "/oferta/61513", name: "Hyundai Tucson",      year: "2021", price: "US$ 15,900", type: "negotiable"     },
];

function bottomGradient(type: CardType): string {
  if (type === "negotiable") { return V.gradNeg; }
  return V.gradLive;
}

function isEnVivo(type: CardType): boolean {
  return type !== "negotiable";
}

/* ── Single card ── */
function ListingCard({ card }: { card: CardItem }): JSX.Element {
  const envivo = isEnVivo(card.type);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 170, flexShrink: 0,
      background: V.bgCard, borderRadius: 8, boxShadow: V.shadow, overflow: "hidden" }}>

      {/* Image — 112px */}
      <div style={{ position: "relative", height: 112, overflow: "hidden" }}>
        {card.type === "live-live"     && <LiveBadge />}
        {card.type === "live-upcoming" && <UpcomingBadge />}
        <a href={card.href} style={{ display: "block", height: "100%" }}>
          <img loading="lazy" src="/demo/bronco.jpg" alt={card.name} width={170} height={112}
            style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        </a>
      </div>

      {/* Content — px-10 py-12 gap-20 */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1,
        padding: "12px 10px", gap: 20 }}>

        {/* Title group */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <a href={card.href} style={{ textDecoration: "none" }}>
            <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, lineHeight: "20px",
              color: V.brand, margin: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {card.name}
            </p>
          </a>
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 400, lineHeight: "16px",
            color: V.brand, margin: 0 }}>
            {card.year}
          </p>
        </div>

        {/* Second group: price (EN VIVO only) + like */}
        <div style={{ display: "flex", alignItems: "center",
          justifyContent: envivo ? "space-between" : "flex-end" }}>
          {envivo && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CoinIcon />
              <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700,
                fontVariantNumeric: "tabular-nums", color: V.priceColor }}>
                {card.price}
              </span>
            </div>
          )}
          <button type="button" className="vmc-like-btn" aria-label="Me interesa">
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* Bottom gradient — 8px */}
      <div style={{ height: 8, flexShrink: 0, background: bottomGradient(card.type) }} aria-hidden="true" />
    </div>
  );
}

/* ── Cards grid only (no section wrapper) ── */
export function ListingCardsGrid(): JSX.Element {
  return (
    <div className="vmc-listing-root" style={{ width: "100%" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="vmc-listing-cards">
        {CARDS.map(function renderCard(card) {
          return <ListingCard key={card.href} card={card} />;
        })}
      </div>
    </div>
  );
}

/* ── Root ── */
export default function ListingArea(): JSX.Element {
  return (
    <section className="vmc-listing-root" style={{ width: "100%", maxWidth: 718,
      background: "var(--vmc-color-background-secondary)", borderRadius: 8,
      padding: "16px 24px 20px" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block", padding: "6px 8px" }}>
          <CornerTL />
          <h2 style={{ fontFamily: F, fontSize: 16, fontWeight: 700, lineHeight: "20px",
            color: V.brand, textTransform: "uppercase", margin: 0 }}>
            Santander Consumer
          </h2>
          <p style={{ fontFamily: F, fontSize: 14, fontWeight: 400, lineHeight: "20px",
            color: V.textPri, margin: 0 }}>
            10 Ofertas
          </p>
          <CornerBR />
        </div>

        <a href="/santander" className="vmc-profile-link"
          style={{ display: "inline-flex", alignItems: "center", fontFamily: F,
            fontSize: 16, fontWeight: 700, color: V.brand, textDecoration: "none",
            whiteSpace: "nowrap", flexShrink: 0 }}>
          Ir al perfil
          <ChevronRight />
        </a>
      </div>

      {/* Cards — horizontal scroll en mobile */}
      <div className="vmc-listing-cards" style={{ marginTop: 20, paddingBottom: 4 }}>
        {CARDS.map(function renderCard(card) {
          return <ListingCard key={card.href} card={card} />;
        })}
      </div>
    </section>
  );
}
