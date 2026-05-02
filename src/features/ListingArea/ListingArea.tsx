/**
 * @figma-spec
 * @component    ListingArea | 766x302 | Page:Stitch
 * @description  Área de listado de ofertas. Header empresa + grid 4×OfferCard.
 *
 * @tokens
 *   brand   : --vmc-color-vault-700      : #3B1782
 *   primary : --vmc-color-text-primary
 *
 * @subcomponents
 *   OfferCard : @/features/OfferCard/OfferCard
 *
 * @layers
 *   root        : section : 100%×auto : maxWidth:766
 *   header-row  : div     : flex, space-between
 *   cards-grid  : div     : grid repeat(4,176px) gap:12 mt:20
 */

import type { JSX } from "react";
import OfferCard from "@/features/OfferCard/OfferCard";
import type { OfferCardVariant, OfferCardState } from "@/features/OfferCard/OfferCard";

const V = {
  vaultMid:    "var(--vmc-color-vault-700)",
  textPrimary: "var(--vmc-color-text-primary)",
} as const;

const fontDisplay = "var(--vmc-font-display)";

/* ── Corner bracket — top-left ──────────────────────────────── */
function CornerTL(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, width: 10, height: 10, fill: V.vaultMid }}
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
      style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, fill: V.vaultMid }}
    >
      <path d="M18.25 2C16.1789 2 14.5 3.67893 14.5 5.75V14.5L5.75 14.5C3.67893 14.5 2 16.1789 2 18.25C2 20.3211 3.67893 22 5.75 22H17C19.7614 22 22 19.7614 22 17V5.75C22 3.67893 20.3211 2 18.25 2Z" />
    </svg>
  );
}

/* ── Chevron right ──────────────────────────────────────────── */
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

/* ── Card data ───────────────────────────────────────────────── */
interface CardItem {
  href:     string;
  name:     string;
  year:     string;
  price:    string;
  imageSrc: string;
  variant:  OfferCardVariant;
  state:    OfferCardState;
}

const CARDS: CardItem[] = [
  { href: "/oferta/61511", name: "Chevrolet Joy Sedan", year: "2021", price: "US$ 5,699",  imageSrc: "/demo/bronco.jpg", variant: "en-vivo",    state: "live"      },
  { href: "/oferta/61510", name: "Chery Tiggo 2",       year: "2023", price: "US$ 6,699",  imageSrc: "/demo/bronco.jpg", variant: "en-vivo",    state: "proximo"   },
  { href: "/oferta/61460", name: "Peugeot New 2008",    year: "2022", price: "US$ 7,999",  imageSrc: "/demo/bronco.jpg", variant: "en-vivo",    state: "publicada" },
  { href: "/oferta/61506", name: "Nissan Xtrail",       year: "2022", price: "US$ 20,999", imageSrc: "/demo/bronco.jpg", variant: "negociable", state: "publicada" },
];

/* ── Root ────────────────────────────────────────────────────── */
export default function ListingArea(): JSX.Element {
  return (
    <div style={{
      width:        "100%",
      maxWidth:     766,
      paddingTop:   24,
      paddingBottom:24,
      paddingLeft:  13,
      paddingRight: 13,
      margin:       "0 auto",
      background:   "var(--vmc-color-background-secondary)",
    }}>
    <section style={{ width: "100%", maxWidth: 740, margin: "0 auto" }}>

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

      {/* Cards grid — 4×176px + 3×12gap = 740px */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(4, 176px)",
        gap:                 12,
        marginTop:           20,
      }}>
        {CARDS.map(function renderCard(card) {
          return (
            <OfferCard
              key={card.href}
              href={card.href}
              name={card.name}
              year={card.year}
              price={card.price}
              imageSrc={card.imageSrc}
              variant={card.variant}
              state={card.state}
            />
          );
        })}
      </div>

    </section>
    </div>
  );
}
