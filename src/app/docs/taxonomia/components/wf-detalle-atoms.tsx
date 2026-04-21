"use client";

/**
 * wf-detalle-atoms.tsx
 * Átomos compartidos entre DetallePageFrame y ComponentWireframe.
 * Fuente de verdad visual: vmcsubastas.com/oferta/61204 (audit 13-abr-2026).
 *
 * EXPORTS:
 *   W           — paleta wireframe 100% escala de grises
 *   ImgBlock    — placeholder de imagen con diagonales SVG
 *   TextLine    — línea de texto simulada
 *   AtomXxx_Content — contenido interno de cada HoverZone del frame Detalle
 */

import type { JSX } from "react";

// ─── Anchos naturales canónicos — importar desde frame-dimensions ─────────────
// Fuente de verdad: _data/frame-dimensions.ts
// Re-exportado aquí para compatibilidad con imports existentes en ComponentWireframe y DetallePageFrame.
export { ATOM_W } from "../_data/frame-dimensions";

// ─── Paleta wireframe — 100% escala de grises ────────────────────────────────
export const W = {
  bg: "#F4F4F5",
  zone: "#E4E4E7",
  dark: "#27272A",
  darkMid: "#3F3F46",
  border: "#D4D4D8",
  borderDark: "#52525B",
  label: "#71717A",
  labelDark: "#A1A1AA",
  labelBright: "#D4D4D8",
  accent: "#A1A1AA",
  accentHigh: "#52525B",
  accentCta: "#3F3F46",
  accentPos: "#A1A1AA",
  text: "#27272A",
  textLight: "#F4F4F5",
  img: "#D4D4D8",
  imgDark: "#52525B",
  white: "#FFFFFF",
};

// ─── Helpers visuales ─────────────────────────────────────────────────────────
export function ImgBlock({ w, h, dark = false }: { w: number | string; h: number; dark?: boolean }) {
  return (
    <div style={{ width: w, height: h, background: dark ? W.imgDark : W.img, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={40} height={30} viewBox="0 0 40 30" style={{ opacity: 0.4 }}>
        <line x1="0" y1="0" x2="40" y2="30" stroke={dark ? W.bg : W.label} strokeWidth="1" />
        <line x1="40" y1="0" x2="0" y2="30" stroke={dark ? W.bg : W.label} strokeWidth="1" />
        <rect x="0" y="0" width="40" height="30" fill="none" stroke={dark ? W.bg : W.label} strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function TextLine({ w = "100%", h = 8, mt = 4 }: { w?: string | number; h?: number; mt?: number }) {
  return <div style={{ width: w, height: h, background: W.zone, borderRadius: 2, marginTop: mt }} />;
}

// ─── Atom: Header ─────────────────────────────────────────────────────────────
// children del HoverZone de zi("header-primary")
// style del HoverZone: { height: 64, background: W.dark, borderBottom: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }
export function AtomHeader_Content(): JSX.Element {
  // VMC real: barra mínima — logo NO vive aquí (vive en brand area del Sidebar)
  // Solo "Ingresa" alineado a la derecha. Ref: vmcsubastas.com/oferta/61272
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
      <div style={{ height: 28, padding: "0 14px", background: W.accentHigh, borderRadius: 4, opacity: 0.7, display: "flex", alignItems: "center", gap: 6 }}>
        {/* Avatar icon */}
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={W.textLight} strokeWidth="2">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <span style={{ fontSize: 10, color: W.white, fontFamily: "sans-serif", fontWeight: 600 }}>Ingresa</span>
      </div>
    </div>
  );
}

// ─── Atom: Sidebar ────────────────────────────────────────────────────────────
// children del HoverZone de zi("nav-primary")
// style del HoverZone: { width: SIDEBAR_W, background: W.darkMid, borderRight: `1px solid ${W.borderDark}`, display: "flex", flexDirection: "column", flexShrink: 0, minHeight: 600 }
export function AtomSidebar_Content(): JSX.Element {
  // VMC real: logo en brand area (top) + 5 items icono-círculo + texto + flecha
  // Audit 17-abr-2026: "Próximas" (no "Mañana"), iconos circulares
  const navItems: Array<{ label: string; path: string }> = [
    {
      label: "Próximas",
      path: "M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    },
    {
      label: "Tipo de oferta",
      path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
    },
    {
      label: "Categorías",
      path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    },
    {
      label: "Empresas",
      path: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    },
    {
      label: "Centro de ayuda",
      path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
    },
  ];

  return (
    <>
      {/* Brand area — logo VMC con "powered by SUBASTOP.Co" */}
      <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${W.borderDark}` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: W.textLight, fontFamily: "sans-serif", letterSpacing: -0.5 }}>
            <span style={{ opacity: 0.7 }}>›</span>vmc<span style={{ opacity: 0.7 }}>‹</span>
            {" "}<span style={{ fontWeight: 400 }}>Subastas</span>
          </span>
          <span style={{ fontSize: 7, color: W.labelDark, fontFamily: "sans-serif" }}>powered by SUBASTOP.Co</span>
        </div>
      </div>

      {/* Nav items: icono-círculo + label + flecha derecha */}
      <div style={{ padding: "6px 0", flex: 1 }}>
        {navItems.map(function renderNavItem({ label, path }) {
          return (
            <div
              key={label}
              style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Ícono circular — borde + SVG interior */}
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${W.labelDark}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={W.labelBright} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: W.labelBright, fontFamily: "sans-serif" }}>{label}</span>
              </div>
              <span style={{ fontSize: 10, color: W.labelDark, fontFamily: "sans-serif" }}>›</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Atom: TitleBar ───────────────────────────────────────────────────────────
// children del HoverZone de zi("title-bar")
// style del HoverZone: { height: 56, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: W.darkMid, flexShrink: 0, gap: 12 }
export function AtomTitleBar_Content(): JSX.Element {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>‹</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: W.white, fontFamily: "sans-serif" }}>Suzuki Celerio 2019</span>
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}>Vendedor: Mapfre</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {(
            [
              ["244", "pujas"],
              ["13", ""],
              ["7", ""],
            ] as const
          ).map(([val, lbl]) => (
            <div key={val + lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: W.white }}>{val}</div>
              {lbl.length > 0 && <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)" }}>{lbl}</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, background: "rgba(0,0,0,0.2)", borderRadius: 4, padding: "4px 10px" }}>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.7)" }}>Inicia HOY</span>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: W.white }}>02:05 pm</span>
        </div>
      </div>
    </>
  );
}

// ─── Atom: BidWidgetHeader ────────────────────────────────────────────────────
// children del HoverZone de zi("bid-widget-header")
// style del HoverZone: { background: W.dark, padding: "10px 12px 8px" }
export function AtomBidWidgetHeader_Content(): JSX.Element {
  return (
    <>
      {/* Fila 1: fecha | divider | hora */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif" }}>Inicia</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: W.textLight, fontFamily: "sans-serif" }}>HOY</div>
        </div>
        {/* Divider vertical */}
        <div style={{ width: 1, height: 28, background: W.borderDark, alignSelf: "center" }} />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "monospace", color: W.textLight, lineHeight: 1 }}>02:05 pm</div>
        </div>
      </div>

      {/* Fila 2: corazón centrado */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: W.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={W.label} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      </div>

      {/* Fila 3: métricas — vistas | pujas | participantes */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Vistas */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>244</span>
          <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
            </svg>
          </div>
        </div>
        {/* Pujas (centro — coincide con el corazón) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>13</span>
        </div>
        {/* Participantes */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>7</span>
        </div>
      </div>
    </>
  );
}

// ─── Atom: PromoBanner ────────────────────────────────────────────────────────
// children del HoverZone de zi("promo-banner")
// style del HoverZone: { background: W.zone, padding: "5px 12px", borderBottom: `1px solid ${W.border}` }
export function AtomPromoBanner_Content(): JSX.Element {
  return (
    <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif", fontStyle: "italic" }}>¡Oportunidad para el que sabe!</span>
  );
}

// ─── Atom: Button ─────────────────────────────────────────────────────────────
// children del HoverZone de zi("btn")
// style del HoverZone: { height: 52, background: W.accentCta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }
export function AtomButton_Content(): JSX.Element {
  return (
    <span style={{ fontSize: 12, fontWeight: 800, color: W.white, fontFamily: "sans-serif", letterSpacing: 2 }}>PARTICIPA</span>
  );
}

// ─── Atom: PriceDisplay ───────────────────────────────────────────────────────
// children del HoverZone de zi("display-price")
// style del HoverZone: { marginBottom: 4 }
export function AtomPriceDisplay_Content(): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* Ícono de moneda (círculo con $) */}
      <div style={{ width: 22, height: 22, borderRadius: "50%", background: W.accent, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 10, color: W.white, fontFamily: "monospace", fontWeight: 700 }}>$</span>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif" }}>Precio Base:</span>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: W.text }}>US$ 14,999</span>
        </div>
        <span style={{ fontSize: 8, color: W.label, fontFamily: "sans-serif", display: "block" }}>
          Comisión: 7.5% del valor de compra y mínimo s/. 90
        </span>
      </div>
    </div>
  );
}

// ─── Atom: OptionTags ─────────────────────────────────────────────────────────
// children del HoverZone de zi("option-tags")
// style del HoverZone: { padding: "0 12px 12px" }
export function AtomOptionTags_Content(): JSX.Element {
  const optionButtons = [
    { label: "Con Precio Reserva", active: true },
    { label: "Sin Opción a Visitas", active: false },
    { label: "Con Comisión", active: true },
    { label: "Cuota mínima de\nparticipantes: 2", active: true },
    { label: "Sin Opción a\nFinanciamiento", active: false },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {optionButtons.slice(0, 4).map(({ label, active }) => (
          <div
            key={label}
            style={{
              minHeight: 52,
              border: `1px solid ${active ? W.accentHigh : W.border}`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 8px",
              background: active ? W.accentHigh : W.bg,
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 9, color: active ? W.white : W.label, fontFamily: "sans-serif", lineHeight: 1.3, whiteSpace: "pre-line" }}>{label}</span>
          </div>
        ))}
      </div>
      {/* 5to botón centrado */}
      <div style={{ marginTop: 6 }}>
        <div
          style={{
            minHeight: 52,
            border: `1px solid ${W.border}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 8px",
            background: W.bg,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif", lineHeight: 1.3, whiteSpace: "pre-line" }}>
            {optionButtons[4]?.label ?? ""}
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Atom: Subascoins ─────────────────────────────────────────────────────────
// children del HoverZone de zi("subascoins-promo")
// style del HoverZone: { border: `1px solid ${W.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, background: W.white }
export function AtomSubascoins_Content(): JSX.Element {
  return (
    <>
      {/* Ícono moneda SubasCoins */}
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${W.accentHigh}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: W.accentHigh, fontFamily: "monospace" }}>S</span>
        {/* Detalle de borde dentado — simulado con puntos */}
        <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1px dashed ${W.border}` }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif", letterSpacing: 0.5 }}>ADQUIERE SUBASCOINS</span>
      <span style={{ fontSize: 14, color: W.accentHigh, marginLeft: "auto", fontWeight: 700 }}>›</span>
    </>
  );
}

// ─── Atom: AuctionCards ───────────────────────────────────────────────────────
// children del HoverZone de zi("card-auction")
// style del HoverZone: { background: W.white, padding: "12px 12px 4px" }
export function AtomAuctionCards_Content(): JSX.Element {
  const relatedCards = [
    { title: "Toyota Yaris", year: "2017" },
    { title: "Haval M6", year: "2019" },
    { title: "Italika 125Z Eur...", year: "2017" },
    { title: "Great Wall Poer", year: "2024" },
  ];
  return (
    <>
      {/* Título de sección — sin header bar, directo */}
      <p style={{ fontSize: 16, fontWeight: 700, color: W.text, fontFamily: "sans-serif", margin: "0 0 10px", lineHeight: 1.2 }}>
        Ofertas<br />Relacionadas
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {relatedCards.map(({ title, year }) => (
          <div
            key={title}
            style={{
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid ${W.border}`,
              background: W.white,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Imagen con overlays */}
            <div style={{ position: "relative" }}>
              <ImgBlock w="100%" h={110} />
              {/* Badge precio (top-left) */}
              <div style={{
                position: "absolute", top: 5, left: 5,
                background: W.white, borderRadius: 10,
                padding: "2px 5px", display: "flex", alignItems: "center", gap: 3,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: W.accent }} />
                <span style={{ fontSize: 7, fontWeight: 700, fontFamily: "monospace", color: W.text }}>US$ —,———</span>
              </div>
              {/* Corazón (bottom-right) */}
              <div style={{
                position: "absolute", bottom: 5, right: 5,
                width: 20, height: 20, borderRadius: "50%",
                background: W.white, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={W.label} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            </div>

            {/* Info card */}
            <div style={{ padding: "6px 8px 0", flex: 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: W.text, fontFamily: "sans-serif", display: "block" }}>{title}</span>
              <span style={{ fontSize: 8, color: W.label, fontFamily: "sans-serif" }}>{year}</span>
            </div>

            {/* Signature Finish — borde inferior naranja (en wireframe: franja oscura) */}
            <div style={{ height: 4, background: W.accentCta, marginTop: 6 }} />
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Atom: ImageGallery ───────────────────────────────────────────────────────
// Bloque COMPLETO hero + thumbnails (ambas HoverZones de image-gallery juntas)
// Usado directamente en WireImageGallery sin wrapper adicional de layout
export function AtomImageGallery_Content(): JSX.Element {
  return (
    <>
      <ImgBlock w="100%" h={220} />
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2, 3].map((i) => <ImgBlock key={i} w={72} h={50} />)}
      </div>
    </>
  );
}

// ─── Atom: VehicleSpecs ───────────────────────────────────────────────────────
// children del HoverZone de zi("table-specs")
// style del HoverZone: { border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }
export function AtomVehicleSpecs_Content(): JSX.Element {
  return (
    <>
      <div style={{ padding: "8px 12px", background: W.zone, borderBottom: `1px solid ${W.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Información general</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif" }}>CALIDAD DE INFORMACIÓN</span>
          {[W.accent, W.accent, W.accent].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "4px 12px", borderBottom: `1px solid ${W.border}` }}>
        <span style={{ fontSize: 9, color: W.label, fontFamily: "monospace" }}>CÓDIGO: 61172</span>
      </div>
      {[
        ["Transmisión", "Automática"],
        ["Tracción", "Delantera"],
        ["Combustible", "Gasolina"],
        ["Tipo de siniestro", "Choque"],
        ["Ubicación", "Cañete, CHILCA"],
      ].map(([lbl, val]) => (
        <div key={lbl} style={{ height: 40, display: "flex", alignItems: "center", borderBottom: `1px solid ${W.border}`, padding: "0 12px", gap: 16 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: W.text, fontFamily: "sans-serif", width: 130, flexShrink: 0 }}>{lbl}:</span>
          <span style={{ fontSize: 10, color: W.label, fontFamily: "sans-serif" }}>{val}</span>
        </div>
      ))}
    </>
  );
}

// ─── Atom: DescriptionBlock ───────────────────────────────────────────────────
// children del HoverZone de zi("description-block")
// style del HoverZone: { border: `1px solid ${W.border}`, borderRadius: 4, padding: 12 }
export function AtomDescriptionBlock_Content(): JSX.Element {
  return (
    <>
      <span style={{ fontSize: 9, color: W.text, fontFamily: "sans-serif" }}>Vehículo siniestrado por choque...</span>
      {[1, 0.9, 1, 0.7, 0.95, 0.85, 1, 0.6].map((w, i) => (
        <TextLine key={i} w={`${w * 100}%`} h={7} mt={5} />
      ))}
    </>
  );
}

// ─── Atom: DocumentDownloads ──────────────────────────────────────────────────
// children del HoverZone de zi("document-downloads")
// style del HoverZone: { border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }
export function AtomDocumentDownloads_Content(): JSX.Element {
  return (
    <>
      <div style={{ padding: "8px 12px", background: W.zone, borderBottom: `1px solid ${W.border}` }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Descarga toda la información:</span>
      </div>
      {["Detalle de la oferta", "Ficha SUNARP"].map((doc) => (
        <div key={doc} style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", borderBottom: `1px solid ${W.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 28, background: W.accentHigh, borderRadius: 2, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 6, color: W.white, fontFamily: "sans-serif" }}>PDF</span>
            </div>
            <span style={{ fontSize: 10, color: W.text, fontFamily: "sans-serif" }}>{doc}</span>
          </div>
          <div style={{ height: 28, padding: "0 12px", border: `1px solid ${W.border}`, borderRadius: 4, display: "flex", alignItems: "center", background: W.bg }}>
            <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif" }}>↓ Descarga</span>
          </div>
        </div>
      ))}
      <div style={{ padding: "6px 12px", borderBottom: `1px solid ${W.border}` }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Documentos requeridos:</span>
      </div>
      {["Ficha de lavado de activos PN", "Ficha Lavados de Activos PJ"].map((doc) => (
        <div key={doc} style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", borderBottom: `1px solid ${W.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 28, background: W.accentHigh, borderRadius: 2, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 6, color: W.white, fontFamily: "sans-serif" }}>DOC</span>
            </div>
            <span style={{ fontSize: 10, color: W.text, fontFamily: "sans-serif" }}>{doc}</span>
          </div>
          <div style={{ height: 28, padding: "0 12px", border: `1px solid ${W.border}`, borderRadius: 4, display: "flex", alignItems: "center", background: W.bg }}>
            <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif" }}>↓ Descarga</span>
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Atom: ConditionsAccordion ────────────────────────────────────────────────
// children del HoverZone de zi("conditions-accordion")
// style del HoverZone: { border: `1px solid ${W.border}`, borderRadius: 4, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }
export function AtomConditionsAccordion_Content(): JSX.Element {
  return (
    <>
      <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Condiciones del ofrecimiento</span>
      <span style={{ fontSize: 12, color: W.label }}>⌄</span>
    </>
  );
}

// ─── Atom: HelpBanner ─────────────────────────────────────────────────────────
// children del HoverZone de zi("help-center-banner")
// style del HoverZone: { height: 80, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}`, background: W.zone, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }
export function AtomHelpBanner_Content(): JSX.Element {
  return (
    <>
      <div style={{ width: 48, height: 48, background: W.accent, borderRadius: "50%", opacity: 0.4, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Visita nuestro</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Centro de ayuda</div>
        <div style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif" }}>Respuestas rápidas a todas tus dudas</div>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <div style={{ height: 36, padding: "0 16px", background: W.accentHigh, borderRadius: 4, display: "flex", alignItems: "center", opacity: 0.7 }}>
          <span style={{ fontSize: 10, color: W.white, fontFamily: "sans-serif", fontWeight: 600 }}>Ir al Centro de Ayuda</span>
        </div>
      </div>
    </>
  );
}

// ─── Atom: Footer ─────────────────────────────────────────────────────────────
// children del HoverZone de zi("footer-primary")
// style del HoverZone: { background: W.dark, padding: "24px 24px", flexShrink: 0 }
export function AtomFooter_Content(): JSX.Element {
  // VMC real: logo + 2 cols links + "Encuéntranos en:" + redes + Norton/APESO/Libro + copyright
  // Ref: vmcsubastas.com/oferta/61272
  const col1 = ["SubasCars", "SubasBlog", "¿Quiénes somos?", "¿Cómo vender?", "Subaspass", "Blacksheep Nation"];
  const col2 = ["Condiciones y Términos  •  Contáctanos", "Política de Protección de Datos Personales", "Política de Privacidad General", "Testimonios"];
  return (
    <>
      {/* Top: logo + 2 columnas de links */}
      <div style={{ display: "flex", gap: 32, marginBottom: 20 }}>
        <div style={{ minWidth: 110 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: W.textLight, fontFamily: "sans-serif" }}>›vmc‹ Subastas</span>
            <span style={{ fontSize: 7, color: W.labelDark, fontFamily: "sans-serif" }}>powered by SUBASTOP.Co</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {col1.map((item) => (
            <span key={item} style={{ fontSize: 9, color: W.labelDark, fontFamily: "sans-serif" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {col2.map((item) => (
            <span key={item} style={{ fontSize: 9, color: W.labelDark, fontFamily: "sans-serif" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Mid: "Encuéntranos en:" + íconos redes sociales */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 9, color: W.labelDark, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>Encuéntranos en:</span>
        <div style={{ display: "flex", gap: 8 }}>
          {/* Facebook, YouTube, Twitter, Instagram */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ width: 26, height: 26, background: W.accent, borderRadius: "50%", opacity: 0.45 }} />
          ))}
        </div>
      </div>

      {/* Bottom bar: Norton + APESO + Libro Reclamaciones + copyright */}
      <div style={{ borderTop: `1px solid ${W.borderDark}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 8, color: W.label, fontFamily: "sans-serif", maxWidth: 280 }}>
          © VMC Subastas es una marca registrada de Subastop S.A.C.<br />Todos los derechos reservados 2025
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          {/* Norton badge */}
          <div style={{ width: 48, height: 28, background: W.accentHigh, borderRadius: 3, opacity: 0.4 }} />
          {/* APESO */}
          <div style={{ padding: "3px 8px", background: W.accent, borderRadius: 3, opacity: 0.4 }}>
            <span style={{ fontSize: 8, color: W.white, fontFamily: "sans-serif", fontWeight: 700 }}>APESO</span>
          </div>
          {/* Libro de Reclamaciones */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 28, height: 28, background: W.accent, borderRadius: 2, opacity: 0.4 }} />
            <span style={{ fontSize: 6, color: W.labelDark, fontFamily: "sans-serif", textAlign: "center", lineHeight: 1.2 }}>Libro<br />Reclamaciones</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Atom: Metrics ────────────────────────────────────────────────────────────
// Componente display-metrics: contador de pujas · vistas · participantes
// Aparece en la fila inferior del BidWidgetHeader (fondo oscuro del widget)
// naturalWidth = NW.widget = 276 — mismo contexto de ancho que el widget
export function AtomMetrics_Content(): JSX.Element {
  return (
    <div style={{ background: W.dark, padding: "10px 12px" }}>
      {/* Fila métricas: vistas | pujas | participantes */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Vistas */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>244</span>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
              <circle cx="12" cy="12" r="3" /><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            </svg>
          </div>
          <span style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif" }}>vistas</span>
        </div>
        {/* Separador */}
        <div style={{ width: 1, height: 24, background: W.borderDark }} />
        {/* Pujas */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>13</span>
          <span style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif" }}>pujas</span>
        </div>
        {/* Separador */}
        <div style={{ width: 1, height: 24, background: W.borderDark }} />
        {/* Participantes */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>7</span>
          <span style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif" }}>part.</span>
        </div>
      </div>
    </div>
  );
}
