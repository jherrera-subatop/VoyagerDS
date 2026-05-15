import type { JSX } from "react";

const STYLES = `
  .vmc-offer-card {
    transition: transform 150ms cubic-bezier(0.3,0,0,1),
                box-shadow 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
  }
  .vmc-offer-card:focus-visible {
    outline: 2px solid var(--vmc-color-background-brand);
    outline-offset: 2px;
  }
  .vmc-offer-tab {
    transition: filter 150ms cubic-bezier(0.3,0,0,1);
  }
  .vmc-offer-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px oklch(0.22 0.18 285 / 16%); }
  .vmc-offer-card:hover .vmc-offer-tab { filter: brightness(0.92); }
  .vmc-offer-card:active { transform: scale(0.97); box-shadow: inset 0 2px 4px oklch(0.22 0.18 285 / 12%), 0 1px 3px oklch(0.22 0.18 285 / 8%); }
  .vmc-offer-card:active .vmc-offer-tab { filter: brightness(0.80); }
  .vmc-category-card {
    transition: transform 150ms cubic-bezier(0.3,0,0,1),
                box-shadow 150ms cubic-bezier(0.3,0,0,1),
                background 150ms cubic-bezier(0.3,0,0,1);
    cursor: pointer;
  }
  .vmc-category-card:focus-visible { outline: 2px solid var(--vmc-color-background-brand); outline-offset: 2px; }
  .vmc-category-card:hover { background: color-mix(in oklch, var(--vmc-color-background-card) 94%, var(--vmc-color-background-brand)) !important; transform: translateY(-2px); box-shadow: 0 8px 20px oklch(0.22 0.18 285 / 12%); }
  .vmc-category-card:active { transform: scale(0.97); box-shadow: 0 2px 6px oklch(0.22 0.18 285 / 8%); }
  @media (prefers-reduced-motion: reduce) {
    .vmc-offer-card, .vmc-offer-tab, .vmc-category-card { transition: none; }
  }
  .vmc-qf-root { container-type: inline-size; }
  @container (max-width: 480px) {
    .vmc-qf-main { flex-direction: column !important; gap: 16px; }
    .vmc-qf-offer-section { width: 100% !important; }
    .vmc-qf-cat-section { margin-left: 0 !important; }
    .vmc-offer-card { flex: 1 !important; width: auto !important; }
    .vmc-qf-cat-cards { gap: 8px !important; }
    .vmc-category-card { min-width: 0 !important; padding: 8px 4px !important; }
  }
`;

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

const V = {
  bgSecondary:  "var(--vmc-color-background-secondary)",
  bgCard:       "var(--vmc-color-background-card)",
  bgBrand:      "var(--vmc-color-background-brand)",
  textBrand:    "var(--vmc-color-text-brand)",
  textInverse:  "var(--vmc-color-text-inverse)",
  orange:       "var(--vmc-color-orange-600)",
  cyan:         "var(--vmc-color-cyan-600)",
  gradientLive: "linear-gradient(123.7deg, var(--vmc-color-orange-500) 0%, var(--vmc-color-orange-600) 50%, var(--vmc-color-orange-700) 100%)",
  gradientNeg:  "linear-gradient(180deg,   var(--vmc-color-cyan-500)   0%, var(--vmc-color-cyan-600)   50%, var(--vmc-color-cyan-700)   100%)",
  iconColor:    "var(--vmc-color-text-brand)",
} as const; // v3

/* ── Corner brackets ────────────────────────────────────────── */
function CornerTL(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, width: 8, height: 8 }}>
      <path d="M0 0H3.3V3.3H3.3V6.7H0V3.3H0V0ZM3.3 0H6.7 6.7 10V3.3H6.7 6.7 3.3V0ZM3.3 6.7H0V10H3.3V6.7Z"
        fill={V.textBrand} />
    </svg>
  );
}

function CornerBR(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
      style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8 }}>
      <path d="M10 10L6.7 10 6.7 6.7 6.7 6.7 6.7 3.3 10 3.3 10 6.7 10 6.7 10 10ZM6.7 10L3.3 10 3.3 10 0 10 0 6.7 3.3 6.7 3.3 6.7 6.7 6.7 6.7 10ZM6.7 3.3L10 3.3 10 0 6.7 0 6.7 3.3Z"
        fill={V.textBrand} />
    </svg>
  );
}

/* ── Section header ─────────────────────────────────────────── */
function SectionHeader({ title }: { title: string }): JSX.Element {
  return (
    <div style={{ position: "relative", display: "inline-block", padding: "8px 12px" }}>
      <CornerTL />
      <h3 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, lineHeight: "16px",
        color: V.textBrand, textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>
        {title}
      </h3>
      <CornerBR />
    </div>
  );
}

/* ── Offer type card ────────────────────────────────────────── */
interface OfferCardProps {
  href: string; label: string; gradient: string; verTodasColor: string;
}

function OfferCard({ href, label, gradient, verTodasColor }: OfferCardProps): JSX.Element {
  return (
    <a href={href} className="vmc-offer-card"
      style={{ display: "flex", flexDirection: "column", width: 110, height: 92,
        borderRadius: 8, boxShadow: "0 0 16px rgba(0,0,0,0.14)", textDecoration: "none", overflow: "hidden" }}>
      <div className="vmc-offer-tab"
        style={{ display: "flex", alignItems: "center", justifyContent: "center",
          flex: "0 0 53px", background: gradient }}>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, lineHeight: "16px",
          color: V.textInverse, textTransform: "uppercase", textShadow: "0 1px 1.5px rgba(0,0,0,0.25)" }}>
          {label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
        flex: "0 0 39px", background: V.bgCard }}>
        <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, lineHeight: "14px",
          color: verTodasColor, textTransform: "uppercase" }}>
          VER TODAS
        </span>
      </div>
    </a>
  );
}

/* ── Category icons ─────────────────────────────────────────── */
function VehicleIcon(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ color: V.iconColor }}>
      <path d="M5.5 12.9c-.5 0-.9.2-1.4.4-.4.3-.7.7-.9 1.1-.2.5-.2 1-.1 1.5s.3.9.7 1.2c.3.4.8.6 1.2.7.5.1 1 .1 1.5-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.3-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.3.3.5.5.1.1.2.4.2.6 0 .3-.2.6-.4.8-.2.2-.5.3-.8.3ZM19.2 12.9c-.5 0-.9.2-1.3.4-.4.3-.8.7-.9 1.1-.2.5-.3 1-.2 1.5.1.5.3.9.7 1.2.3.4.8.6 1.3.7.4.1.9.1 1.4-.1.4-.2.8-.5 1.1-.9.3-.4.4-.9.4-1.4 0-.7-.2-1.3-.7-1.8-.5-.4-1.1-.7-1.8-.7Zm0 3.6c-.2 0-.4 0-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6.1-.3.2-.5.3-.6.2-.2.4-.3.6-.3.2-.1.5 0 .7 0 .2.1.4.3.5.5.1.1.2.4.2.6 0 .3-.1.6-.4.8-.2.2-.5.3-.8.3Z" fill="currentColor" />
      <path d="m22.5 10.9-4.4-.8-3.8-3.2c-.4-.3-.8-.5-1.3-.5H7.4c-.3 0-.6.1-.9.2-.3.2-.5.4-.7.6l-2.5 2.9H1.7c-.4 0-.9.1-1.2.5-.3.3-.5.7-.5 1.2v2.1c0 .5.2 1.1.6 1.5.4.3.9.6 1.5.6h.4c-.1-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h7.7c0-.5 0-.9.1-1.4.1-.4.3-.8.6-1.1.3-.4.6-.7 1-.9.4-.2.9-.3 1.3-.3.5 0 .9.1 1.3.3.4.2.8.5 1.1.9.3.3.5.7.6 1.1.1.5.1.9 0 1.4h.1c.4 0 .9-.2 1.2-.5.3-.4.5-.8.5-1.2v-1.7c0-.4-.1-.8-.4-1.2-.3-.3-.7-.5-1.1-.5ZM8.4 9.5c0 .1-.1.3-.2.4-.1.1-.2.2-.4.2H5.3c-.1 0-.1-.1-.2-.1 0 0 0-.1-.1-.1v-.2s0-.1.1-.1l1.6-2c.1 0 .2-.1.2-.1.1 0 .2-.1.3-.1h.6c.2 0 .3.1.4.2.1.1.2.3.2.4v1.5Zm2.8 2.7h-.7c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4 0-.2.1-.3.2-.4.1-.1.2-.2.4-.2h.7c.2 0 .3.1.4.2.1.1.2.2.2.4 0 .1-.1.3-.2.4-.1.1-.2.2-.4.2Zm4.5-2.1h-5.4c-.2 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.4V8c0-.1.1-.3.2-.4.1-.1.2-.2.4-.2H13c.2 0 .3.1.4.2l2.5 2c.1 0 .1.1.1.1v.2s0 .1-.1.1c0 .1-.1.1-.2.1Z" fill="currentColor" />
    </svg>
  );
}

function MachineryIcon(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ color: V.iconColor }}>
      <path d="M20 7.3C19.9 7.1 19.6 7 19.4 7H16.3C16 7 15.7 7.2 15.6 7.5L13.5 12.6H11.7L10.9 5.3C10.8 4.9 10.5 4.6 10.1 4.6H1.8C1.4 4.6 1 5 1 5.4 1 5.9 1.4 6.2 1.8 6.2H2.1V12.7C2 12.6 1.9 12.6 1.8 12.6 1.4 12.6 1 13 1 13.4V15.1C1 15.5 1.2 15.7 1.5 15.8 1.9 15.4 2.6 15.1 3.3 15.1H11.9L11.8 14.2H14.1C14.4 14.2 14.7 14 14.8 13.7L16.9 8.6H19L19.5 9.3H21.4L20 7.3ZM4.7 11H3.7V6.2H4.7V11ZM6.2 11V6.2H9.4L9.9 11H6.2V11Z" fill="currentColor" />
      <path d="M19.6 10.1V10.1 12.1C21.1 12.8 22.3 13.9 23 15.3V10.1H19.6Z" fill="currentColor" />
      <path d="M16.7 15.9H3.3C2.2 15.9 1.4 16.8 1.4 17.8 1.4 18.8 2.2 19.7 3.3 19.7H16.7C17.8 19.7 18.6 18.8 18.6 17.8 18.6 16.8 17.8 15.9 16.7 15.9ZM3.5 18.6C3 18.6 2.7 18.2 2.7 17.8 2.7 17.4 3 17 3.5 17 3.9 17 4.2 17.4 4.2 17.8 4.2 18.2 3.9 18.6 3.5 18.6ZM16.6 18.6C16.2 18.6 15.9 18.2 15.9 17.8 15.9 17.4 16.2 17 16.6 17 17.1 17 17.4 17.4 17.4 17.8 17.4 18.2 17.1 18.6 16.6 18.6Z" fill="currentColor" />
    </svg>
  );
}

function BoxIcon({ size = 24 }: { size?: number }): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ color: V.iconColor }}>
      <path d="M21 8.5V5.8C21 5.5 20.8 5.3 20.5 5.3H3.6C3.3 5.3 3.1 5.5 3.1 5.8V8.5H21Z" fill="currentColor" />
      <path d="M11 12.7H13.1C13.4 12.7 13.6 12.5 13.6 12.2 13.6 11.9 13.4 11.6 13.1 11.6H11C10.7 11.6 10.4 11.9 10.4 12.2 10.4 12.5 10.7 12.7 11 12.7Z" fill="currentColor" />
      <path d="M4.1 9.5V18.5C4.1 18.8 4.3 19 4.6 19H19.4C19.7 19 19.9 18.8 19.9 18.5V9.5H4.1ZM11 10.6H13.1C14 10.6 14.7 11.3 14.7 12.2 14.7 13 14 13.8 13.1 13.8H11C10.1 13.8 9.4 13 9.4 12.2 9.4 11.3 10.1 10.6 11 10.6Z" fill="currentColor" />
    </svg>
  );
}

/* ── Artículos Diversos: box inside orange circle ───────────── */
function ArticulosIcon(): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
      width: 24, height: 24, borderRadius: "9999px", background: V.bgBrand, flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 8.5V5.8C21 5.5 20.8 5.3 20.5 5.3H3.6C3.3 5.3 3.1 5.5 3.1 5.8V8.5H21Z" fill="white" />
        <path d="M11 12.7H13.1C13.4 12.7 13.6 12.5 13.6 12.2 13.6 11.9 13.4 11.6 13.1 11.6H11C10.7 11.6 10.4 11.9 10.4 12.2 10.4 12.5 10.7 12.7 11 12.7Z" fill="white" />
        <path d="M4.1 9.5V18.5C4.1 18.8 4.3 19 4.6 19H19.4C19.7 19 19.9 18.8 19.9 18.5V9.5H4.1ZM11 10.6H13.1C14 10.6 14.7 11.3 14.7 12.2 14.7 13 14 13.8 13.1 13.8H11C10.1 13.8 9.4 13 9.4 12.2 9.4 11.3 10.1 10.6 11 10.6Z" fill="white" />
      </svg>
    </div>
  );
}

/* ── Category card ──────────────────────────────────────────── */
interface CategoryCardProps {
  href: string; icon: JSX.Element; label: string;
}

function CategoryCard({ href, icon, label }: CategoryCardProps): JSX.Element {
  return (
    <a href={href} className="vmc-category-card"
      style={{ boxSizing: "border-box", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", flex: 1, minWidth: 80, height: 92,
        padding: "8px 12px", gap: 8, background: V.bgCard, borderRadius: 8,
        boxShadow: "0 0 8px rgba(0,0,0,0.14)", textDecoration: "none" }}>
      {icon}
      <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, lineHeight: "14px",
        textAlign: "center", color: V.textBrand, textTransform: "uppercase" }}>
        {label}
      </span>
    </a>
  );
}

/* ── Root ───────────────────────────────────────────────────── */
export default function QuickFilters(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="vmc-qf-root" style={{ width: "100%", maxWidth: 766, padding: "20px 24px",
        background: V.bgSecondary, borderRadius: 8 }}>
        <div className="vmc-qf-main" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

          {/* Tipo de oferta */}
          <div className="vmc-qf-offer-section" style={{ display: "flex", flexDirection: "column", gap: 16, width: 236 }}>
            <SectionHeader title="Tipo de oferta" />
            <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
              <OfferCard href="/en-vivo"    label="En Vivo"    gradient={V.gradientLive} verTodasColor={V.orange} />
              <OfferCard href="/negociable" label="Negociable" gradient={V.gradientNeg}  verTodasColor={V.cyan} />
            </div>
          </div>

          {/* Categorías */}
          <div className="vmc-qf-cat-section" style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, marginLeft: 24 }}>
            <SectionHeader title="Categorías" />
            <div className="vmc-qf-cat-cards" style={{ display: "flex", flexDirection: "row", gap: 16 }}>
              <CategoryCard href="/subastas/vehicular"       icon={<VehicleIcon />}  label="Vehicular" />
              <CategoryCard href="/subastas/maquinaria"      icon={<MachineryIcon />} label="Maquinaria" />
              <CategoryCard href="/subastas/equiposdiversos" icon={<BoxIcon />}      label="Equipos Diversos" />
              <CategoryCard href="/subastas/articulosdiversos" icon={<ArticulosIcon />} label="Artículos Diversos" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
