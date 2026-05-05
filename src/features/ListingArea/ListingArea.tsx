/**
 * ListingArea — UI Upgrade
 * 718×302px · header empresa + grid 4 cards · VOYAGER v2.1.0
 *
 * Token map:
 *   fill-purple-500 / text-purple-500 → --voyager-color-vault-mid  (corners, h2, "Ir al perfil")
 *   text-purple-900                   → --voyager-text-primary      (card names/years)
 *   text-turquoise-900                → --voyager-color-negotiable  (prices) + Roboto Mono
 *   text-purple-300                   → --voyager-color-vault-mid   (heart icons)
 *   border-yellow-500                 → --voyager-color-live         (8px card bottom)
 *   bg-yellow-700                     → live @ 75% dark              (clock badge)
 *   SVG #9AFCF4                       → negotiable @ fillOpacity 0.55
 *   SVG #367976                       → negotiable
 *   bg-white / shadow-lg              → surface-card / shadowLg
 *   rounded-lg / rounded-full         → 8px / 9999px
 */

import type { JSX } from "react";

const STYLES = `
  .vmc-profile-link {
    border-radius: 4px;
    padding: 6px 10px;
    transition: background-color 150ms cubic-bezier(0.3,0,0,1),
                transform 150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-profile-link svg {
    transition: transform 150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-profile-link:hover {
    background-color: #E4E6E5;
  }
  .vmc-profile-link:hover svg {
    transform: translateX(3px);
  }
  .vmc-profile-link:active {
    background-color: color-mix(in srgb, #3B1782 22%, #FFFFFF);
    transform: scale(0.97);
  }
  .vmc-profile-link:focus-visible {
    outline: 2px solid #3B1782;
    outline-offset: 2px;
  }
`;

const V = {
  vaultMid:    "var(--voyager-color-vault-mid, #3B1782)",
  live:        "var(--voyager-color-live,       #ED8936)",
  liveDark:    "color-mix(in oklch, var(--voyager-color-live, #ED8936) 75%, oklch(0 0 0))",
  negotiable:  "var(--voyager-color-negotiable, #00CACE)",
  surfaceCard: "var(--voyager-surface-card,     #FFFFFF)",
  textPrimary: "var(--voyager-text-primary,     #191C1C)",
  textOnDark:  "var(--voyager-text-on-dark,     #FFFFFF)",
  shadowSm:    "0 8px 16px rgba(34,0,92,0.06)",
  shadowLg:    "0 16px 24px rgba(0,0,0,0.14)",
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fontMono    = "var(--font-mono,    'Roboto Mono', monospace)";

/* ── Corner bracket — top-left (w-2.5 h-2.5 = 10px) ────────── */
function CornerTL(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, width: 10, height: 10,
               fill: V.vaultMid }}
    >
      <path d="M5.75 22C7.82107 22 9.5 20.3211 9.5 18.25L9.5 9.5H18.25C20.3211 9.5 22 7.82107 22 5.75C22 3.67893 20.3211 2 18.25 2L7 2C4.23858 2 2 4.23858 2 7L2 18.25C2 20.3211 3.67893 22 5.75 22Z" />
    </svg>
  );
}

/* ── Corner bracket — bottom-right ─────────────────────────── */
function CornerBR(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10,
               fill: V.vaultMid }}
    >
      <path d="M18.25 2C16.1789 2 14.5 3.67893 14.5 5.75V14.5L5.75 14.5C3.67893 14.5 2 16.1789 2 18.25C2 20.3211 3.67893 22 5.75 22H17C19.7614 22 22 19.7614 22 17V5.75C22 3.67893 20.3211 2 18.25 2Z" />
    </svg>
  );
}

/* ── Chevron right — "Ir al perfil" (w-3 h-3 = 12px) ───────── */
function ChevronRight(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ width: 12, height: 12, marginLeft: 8, fill: "currentColor" }}
    >
      <path d="M6.4369 2.89369C5.27624 4.05435 5.27624 5.93616 6.4369 7.09682L11.3405 12.0004L6.43691 16.9039C5.27625 18.0646 5.27625 19.9464 6.43691 21.107C7.59758 22.2677 9.47938 22.2677 10.64 21.107L17.5052 14.2422C18.0891 13.6582 18.3977 12.903 18.4307 12.1382C18.4678 11.2815 18.1593 10.4127 17.5052 9.75858L10.64 2.89369C9.47937 1.73303 7.59757 1.73303 6.4369 2.89369Z" />
    </svg>
  );
}

/* ── Coin SVG ────────────────────────────────────────────────── */
function CoinIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, width: 24, height: 24 }}
    >
      <path d="M11.4 22L2.7 18.4C1.4 17.9 1.4 16.1 2.7 15.6L11.4 12C11.8 11.8 12.2 11.8 12.7 12L21.3 15.6C22.6 16.1 22.6 17.9 21.3 18.4L12.7 22C12.2 22.2 11.8 22.2 11.4 22Z"
        fill="var(--voyager-color-negotiable, #00CACE)" fillOpacity={0.55} />
      <path d="M12 23C11.7 23 11.4 22.9 11.1 22.8L2.3 19.1C1.5 18.8 1 18.1 1 17.2 1 16.3 1.5 15.6 2.3 15.2L11.1 11.6C11.7 11.3 12.3 11.3 12.9 11.6L21.7 15.2C22.5 15.6 23 16.3 23 17.2 23 18.1 22.5 18.8 21.7 19.1L12.9 22.8C12.6 22.9 12.3 23 12 23ZM12 12.4C11.8 12.4 11.7 12.5 11.6 12.5L2.8 16.2C2.3 16.4 2.1 16.8 2.1 17.2 2.1 17.6 2.3 18 2.8 18.2L11.6 21.9C11.8 22 12.2 22 12.4 21.9L21.2 18.2C21.7 18 21.9 17.6 21.9 17.2 21.9 16.8 21.7 16.4 21.2 16.2L12.4 12.5C12.3 12.5 12.2 12.4 12 12.4Z"
        fill="var(--voyager-color-negotiable, #00CACE)" />
      <path d="M12 1C7.5 1 3.7 4.6 3.7 9.1 3.7 13.6 7.5 17.4 12 17.4 16.6 17.4 20.2 13.6 20.2 9.1 20.2 4.6 16.5 1 12 1Z"
        fill="var(--voyager-color-negotiable, #00CACE)" />
      <path d="M14.9 10.8C14.9 9.2 13.6 8.8 12.5 8.5L12.4 8.5V6.7C12.9 6.8 13.4 7 13.7 7.4L14.8 6.3C14.2 5.5 13.3 5.1 12.4 5V3.7H11.8V5C10.4 5.2 9.2 6.1 9.2 7.6 9.2 9.2 10.5 9.7 11.6 10 11.7 10 11.7 10 11.8 10V11.7C11.2 11.6 10.6 11.3 10.2 10.8L9.1 12C9.8 12.9 10.8 13.3 11.8 13.4V14.7H12.4V13.4C13.8 13.2 14.9 12.3 14.9 10.8ZM10.9 7.4C10.9 7 11.3 6.7 11.8 6.7V8.3C11.3 8.1 10.9 7.9 10.9 7.4ZM12.4 11.7V10.2C12.9 10.4 13.2 10.6 13.2 11 13.2 11.4 12.9 11.7 12.4 11.7Z"
        fill="white" />
    </svg>
  );
}

/* ── Heart SVG ───────────────────────────────────────────────── */
function HeartIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ width: 20, height: 20, fill: "currentColor" }}
    >
      <path d="M16.5 3C14.8 3 13.1 3.8 12 5.1 10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.4 2 12.1 5.4 15.1 10.6 19.7L12 21 13.5 19.7C18.6 15.1 22 12.1 22 8.4 22 5.4 19.6 3 16.5 3ZM12.1 18.3L12 18.4 11.9 18.3C7.1 14 4 11.2 4 8.4 4 6.4 5.5 5 7.5 5 9 5 10.5 5.9 11.1 7.3H12.9C13.5 5.9 15 5 16.5 5 18.5 5 20 6.4 20 8.4 20 11.2 16.9 14 12.1 18.3Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Clock badge SVG (card 4 only) ──────────────────────────── */
function ClockBadge(): JSX.Element {
  return (
    <div style={{
      position:      "absolute",
      top:           0,
      right:         0,
      display:       "flex",
      alignItems:    "center",
      justifyContent:"center",
      width:         24,
      height:        24,
      marginTop:     12,
      marginRight:   12,
      background:    V.liveDark,
      borderRadius:  9999,
      boxShadow:     V.shadowLg,
      pointerEvents: "none",
      zIndex:        2,
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="25"
        viewBox="0 0 24 25"
        fill="none"
        style={{ width: 16, height: 16, fill: "currentColor", color: V.textOnDark }}
      >
        <path d="M2.7 7.2C2.8 7 3.1 6.8 3.3 6.9L4.4 7.4C4.6 7.5 4.7 7.8 4.6 8L3.9 9.7C3.8 9.9 3.5 10 3.3 9.9L2.2 9.4C2 9.3 1.9 9.1 2 8.8L2.7 7.2Z" fill="currentColor" />
        <path d="M1.5 12C1.5 11.8 1.7 11.6 1.9 11.6L3.2 11.6C3.4 11.6 3.6 11.8 3.6 12L3.6 13.8C3.7 14.1 3.5 14.3 3.2 14.3L2 14.3C1.7 14.3 1.5 14.1 1.5 13.9L1.5 12Z" fill="currentColor" />
        <path d="M2.7 17.2C2.5 17 2.6 16.7 2.8 16.6L3.8 15.9C4 15.8 4.3 15.8 4.4 16L5.5 17.5C5.6 17.7 5.6 18 5.4 18.1L4.3 18.8C4.1 19 3.9 18.9 3.7 18.7L2.7 17.2Z" fill="currentColor" />
        <path d="M6.1 21C5.9 20.8 5.8 20.6 5.9 20.4L6.5 19.3C6.7 19.1 6.9 19 7.1 19.1L8.7 20C9 20.1 9 20.4 8.9 20.6L8.3 21.7C8.2 21.9 7.9 22 7.7 21.8L6.1 21Z" fill="currentColor" />
        <path d="M10.9 22.7C10.6 22.7 10.4 22.5 10.4 22.2V21C10.4 20.8 10.6 20.6 10.9 20.6H12.7C12.9 20.6 13.1 20.8 13.1 21V22.2C13.1 22.5 12.9 22.7 12.7 22.7H10.9Z" fill="currentColor" />
        <path d="M15.9 21.9C15.7 22 15.4 22 15.3 21.7L14.8 20.6C14.6 20.4 14.7 20.2 15 20.1L16.6 19.2C16.8 19.1 17.1 19.2 17.2 19.4L17.7 20.5C17.9 20.7 17.8 21 17.5 21.1L15.9 21.9Z" fill="currentColor" />
        <path d="M20.1 18.9C20 19.1 19.7 19.1 19.5 19L18.5 18.2C18.3 18.1 18.2 17.8 18.4 17.6L19.4 16.1C19.6 15.9 19.9 15.9 20.1 16L21.1 16.8C21.3 16.9 21.3 17.2 21.2 17.4L20.1 18.9Z" fill="currentColor" />
        <path d="M22.4 14.2C22.4 14.4 22.2 14.6 21.9 14.6L20.7 14.5C20.5 14.5 20.3 14.3 20.3 14L20.4 12.2C20.4 12 20.6 11.8 20.8 11.8L22.1 11.9C22.3 11.9 22.5 12.1 22.5 12.3L22.4 14.2Z" fill="currentColor" />
        <path d="M14 14.1C14.1 14 14.3 13.9 14.3 13.7L14.3 7.7C14.3 7.5 14.1 7.4 13.9 7.4H12.3C12.2 7.4 12 7.5 12 7.7L12 12.7 8.5 15C8.4 15.1 8.3 15.4 8.4 15.5L9.3 16.8C9.4 17 9.6 17 9.8 16.9L14 14.1Z" fill="currentColor" />
        <path d="M12 1.7C14.5 1.7 16.8 2.5 18.6 4H18.6L19 4.4C19.1 4.4 19.1 4.4 19.1 4.5L20.5 3.4C20.8 3.2 21.2 3.3 21.2 3.7L22 9C22 9.3 21.7 9.6 21.3 9.4L16.4 7.4C16.1 7.3 16 6.9 16.3 6.7L17.4 5.8 16.8 5.4H16.8V5.4C15.4 4.4 13.8 3.8 11.9 3.8 10.1 3.8 8.5 4.3 7.1 5.3L7.1 5.3 6.3 6C6.1 6.2 5.8 6.2 5.7 6L4.9 5.1C4.7 4.9 4.7 4.6 4.9 4.4L5.3 4.1 5.3 4.1C7.1 2.6 9.4 1.7 12 1.7Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ── Card data ───────────────────────────────────────────────── */
interface CardItem {
  href:     string;
  name:     string;
  year:     string;
  price:    string;
  sr:       string;
  hasBadge: boolean;
}

const CARDS: CardItem[] = [
  { href: "/oferta/61511", name: "Chevrolet Joy Sedan", year: "2021", price: "US$ 5,699",  sr: "Chevrolet Joy Sedan 2021", hasBadge: false },
  { href: "/oferta/61510", name: "Chery Tiggo 2",       year: "2023", price: "US$ 6,699",  sr: "Chery Tiggo 2 2023",       hasBadge: false },
  { href: "/oferta/61460", name: "Peugeot New 2008",    year: "2022", price: "US$ 7,999",  sr: "Peugeot New 2008 2022",    hasBadge: false },
  { href: "/oferta/61506", name: "Nissan Xtrail",       year: "2022", price: "US$ 20,999", sr: "Nissan Xtrail 2022",       hasBadge: true  },
];

/* ── Single listing card ─────────────────────────────────────── */
function ListingCard({ card }: { card: CardItem }): JSX.Element {
  return (
    <div style={{
      background:   V.surfaceCard,
      borderBottom: `8px solid ${V.live}`,
      borderRadius: 8,
      boxShadow:    V.shadowLg,
      overflow:     "hidden",
    }}>

      {/* Image area — h-28 = 112px */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "8px 8px 0 0", height: 112 }}>
        {card.hasBadge && <ClockBadge />}
        <a
          href={card.href}
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
          <span className="sr-only">{card.sr}</span>
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
          <a href={card.href} style={{ display: "block", outline: "none", textDecoration: "none" }}>
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
              {card.name}
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
              {card.year}
            </p>
          </a>
        </div>

        {/* Price row */}
        <div style={{ display: "grid", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
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
              {card.price}
            </span>
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

/* ── Root ────────────────────────────────────────────────────── */
export default function ListingArea(): JSX.Element {
  return (
    <section style={{ width: "100%", maxWidth: 718 }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Left — bracket + title + count */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12, marginRight: "auto" }}>
          <div style={{ position: "relative", display: "inline-block", padding: "8px 12px" }}>
            <CornerTL />
            <h2 style={{
              fontFamily:    fontDisplay,
              fontSize:      16,
              fontWeight:    700,
              lineHeight:    "20px",
              color:         V.vaultMid,
              textTransform: "uppercase",
              margin:        0,
            }}>
              santander consumer
            </h2>
            <p style={{
              fontFamily: fontDisplay,
              fontSize:   14,
              fontWeight: 300,
              lineHeight: 1,
              color:      V.textPrimary,
              margin:     0,
            }}>
              9 Ofertas
            </p>
            <CornerBR />
          </div>
        </div>

        {/* Right — "Ir al perfil" link */}
        <a
          href="https://www.vmcsubastas.com/santander.html"
          className="vmc-profile-link"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            fontFamily:     fontDisplay,
            fontSize:       16,
            fontWeight:     700,
            color:          V.vaultMid,
            textDecoration: "none",
          }}
        >
          Ir al perfil
          <ChevronRight />
        </a>
      </div>

      {/* Cards grid — md:grid-cols-4 md:gap-3 */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:                 12,
        marginTop:           20,
      }}>
        {CARDS.map(function renderCard(card) {
          return <ListingCard key={card.href} card={card} />;
        })}
      </div>

    </section>
  );
}
