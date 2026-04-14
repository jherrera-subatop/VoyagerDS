"use client";

/**
 * DetallePageFrame
 * Wireframe 100% escala de grises — sin tokens de producto.
 * · Hover sobre cada zona → tooltip con nombre, categoría y medidas.
 * · Auto-escala al ancho del contenedor (ResizeObserver).
 * Referencia: vmcsubastas.com/oferta/61204 (audit 13-abr-2026). Max-width: 1024px.
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// ─── Paleta wireframe — 100% escala de grises ────────────────────────────────
const W = {
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

const FRAME_W = 1024;
const SIDEBAR_W = 256;
const WIDGET_W = 276;

// ─── Sistema de tooltip hover ─────────────────────────────────────────────────
interface ZoneInfo {
  name: string;
  category: string;
  measurements: string[];
}
interface TooltipState {
  info: ZoneInfo;
  x: number;
  y: number;
}
const HoverCtx = createContext<{
  show: (info: ZoneInfo, x: number, y: number) => void;
  hide: () => void;
} | null>(null);

function WfTooltip({ tooltip }: { tooltip: TooltipState }) {
  // Evitar que se salga por la derecha
  const left = Math.min(tooltip.x + 14, typeof window !== "undefined" ? window.innerWidth - 240 : tooltip.x + 14);
  const top = tooltip.y - 10;
  return (
    <div
      style={{
        position: "fixed",
        left,
        top,
        zIndex: 9999,
        background: W.dark,
        border: `1px solid ${W.borderDark}`,
        borderRadius: 6,
        padding: "8px 10px",
        minWidth: 190,
        maxWidth: 240,
        pointerEvents: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
      }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, color: W.textLight, fontFamily: "sans-serif", margin: 0, lineHeight: 1.3 }}>
        {tooltip.info.name}
      </p>
      <p style={{ fontSize: 9, color: W.accent, fontFamily: "monospace", margin: "2px 0 5px" }}>
        {tooltip.info.category}
      </p>
      <div style={{ borderTop: `1px solid ${W.borderDark}`, paddingTop: 5, display: "flex", flexDirection: "column", gap: 2 }}>
        {tooltip.info.measurements.map((m) => (
          <p key={m} style={{ fontSize: 9, color: W.labelBright, fontFamily: "monospace", margin: 0 }}>
            {m}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Envuelve una zona del wireframe y activa el tooltip al hacer hover */
function HoverZone({
  info,
  children,
  style,
  as: Tag = "div",
}: {
  info: ZoneInfo;
  children: React.ReactNode;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ctx = useContext(HoverCtx);
  const [hovered, setHovered] = useState(false);

  return (
    // @ts-expect-error dynamic tag
    <Tag
      style={{
        ...style,
        outline: hovered ? `2px solid rgba(82,82,91,0.5)` : "2px solid transparent",
        outlineOffset: -2,
        transition: "outline 80ms ease",
        cursor: "default",
      }}
      onMouseMove={(e: React.MouseEvent) => {
        ctx?.show(info, e.clientX, e.clientY);
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        setHovered(true);
        ctx?.show(info, e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
        setHovered(false);
        ctx?.hide();
      }}
    >
      {children}
    </Tag>
  );
}

// ─── Helpers visuales ─────────────────────────────────────────────────────────
function ImgBlock({ w, h, dark = false }: { w: number | string; h: number; dark?: boolean }) {
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

function TextLine({ w = "100%", h = 8, mt = 4 }: { w?: string | number; h?: number; mt?: number }) {
  return <div style={{ width: w, height: h, background: W.zone, borderRadius: 2, marginTop: mt }} />;
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function WfHeader() {
  return (
    <HoverZone
      info={{ name: "Header Primary", category: "layout", measurements: ["w: 1024px", "h: 64px"] }}
      style={{ height: 64, background: W.dark, borderBottom: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: W.textLight, fontFamily: "sans-serif", letterSpacing: -0.5 }}>›vmc‹</span>
          <span style={{ fontSize: 7, color: W.labelDark, fontFamily: "sans-serif" }}>Subastas</span>
          <span style={{ fontSize: 6, color: W.labelDark, fontFamily: "sans-serif" }}>powered by SUBASTOP.Co</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ height: 32, padding: "0 14px", background: W.accentHigh, borderRadius: 4, opacity: 0.7, display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: W.white, fontFamily: "sans-serif", fontWeight: 600 }}>Ingresa</span>
        </div>
      </div>
    </HoverZone>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function WfSidebar() {
  const navItems = ["Hoy", "Tipo de oferta", "Categorías", "Empresas", "Centro de ayuda"];
  return (
    <HoverZone
      info={{ name: "Navbar Primary", category: "navigation", measurements: ["w: 256px", "h: 48px (por ítem)"] }}
      style={{ width: SIDEBAR_W, background: W.darkMid, borderRight: `1px solid ${W.borderDark}`, display: "flex", flexDirection: "column", flexShrink: 0, minHeight: 600 }}
    >
      <div style={{ height: 56, borderBottom: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
        <div style={{ width: 28, height: 28, background: W.accentHigh, borderRadius: 4, opacity: 0.5 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: W.labelBright, fontFamily: "sans-serif" }}>Navbar</span>
          <span style={{ fontSize: 9, color: W.label, fontFamily: "monospace" }}>nav-primary</span>
        </div>
      </div>
      <div style={{ padding: "8px 0", flex: 1 }}>
        {navItems.map((item, i) => (
          <div key={item} style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, background: i === 0 ? "rgba(82,82,91,0.25)" : "transparent", borderLeft: i === 0 ? `3px solid ${W.labelBright}` : "3px solid transparent" }}>
            <div style={{ width: 18, height: 18, background: W.accent, borderRadius: 2, opacity: 0.5 }} />
            <span style={{ fontSize: 11, color: i === 0 ? W.labelBright : W.labelDark, fontFamily: "sans-serif" }}>{item}</span>
          </div>
        ))}
      </div>
    </HoverZone>
  );
}

// ─── TITLE BAR ────────────────────────────────────────────────────────────────
function WfTitleBar() {
  return (
    <HoverZone
      info={{ name: "Title Bar — Detalle", category: "layout", measurements: ["w: 768px", "h: 56px"] }}
      style={{ height: 56, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: W.darkMid, flexShrink: 0, gap: 12 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>‹</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: W.white, fontFamily: "sans-serif" }}>Suzuki Celerio 2019</span>
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}>Vendedor: Mapfre</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {[["244", "pujas"], ["13", ""], ["7", ""]].map(([val, lbl]) => (
            <div key={val + lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: W.white }}>{val}</div>
              {lbl && <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)" }}>{lbl}</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, background: "rgba(0,0,0,0.2)", borderRadius: 4, padding: "4px 10px" }}>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.7)" }}>Inicia HOY</span>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: W.white }}>02:05 pm</span>
        </div>
      </div>
    </HoverZone>
  );
}

// ─── WIDGET DE PUJA ───────────────────────────────────────────────────────────
function WfBidWidget() {
  const optionButtons = [
    { label: "Con Precio Reserva", active: true },
    { label: "Sin Opción a Visitas", active: false },
    { label: "Con Comisión", active: true },
    { label: "Cuota mínima de\nparticipantes: 2", active: true },
    { label: "Sin Opción a\nFinanciamiento", active: false },
  ];

  const relatedCards = [
    { title: "Kia Sportage", year: "2011" },
    { title: "Toyota Corolla", year: "2012" },
    { title: "Yuejin NJ1063D...", year: "2011" },
    { title: "Nissan Navara", year: "2012" },
  ];

  return (
    <div style={{ width: WIDGET_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>

      {/* ── Card principal de puja ── */}
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 6, overflow: "hidden", background: W.white }}>

        {/* Header del widget — fecha / corazón / hora / métricas */}
        <HoverZone
          info={{ name: "Bid Widget Header", category: "auction-core", measurements: ["w: 276px", "h: 96px"] }}
          style={{ background: W.dark, padding: "10px 12px 8px" }}
        >
          {/* Fila 1: fecha | divider | hora */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif" }}>Inicia</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: W.textLight, fontFamily: "sans-serif" }}>VIERNES 17</div>
            </div>
            {/* Divider vertical */}
            <div style={{ width: 1, height: 28, background: W.borderDark, alignSelf: "center" }} />
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "monospace", color: W.textLight, lineHeight: 1 }}>01:00 pm</div>
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
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>518</span>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                </svg>
              </div>
            </div>
            {/* Pujas (centro — coincide con el corazón) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>2</span>
            </div>
            {/* Participantes */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={W.labelDark} strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: W.textLight }}>0</span>
            </div>
          </div>
        </HoverZone>

        {/* Banner ¡Oportunidad! */}
        <HoverZone
          info={{ name: "Promo Banner", category: "feedback", measurements: ["w: 276px", "h: 28px"] }}
          style={{ background: W.zone, padding: "5px 12px", borderBottom: `1px solid ${W.border}` }}
        >
          <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif", fontStyle: "italic" }}>¡Oportunidad para el que sabe!</span>
        </HoverZone>

        <div style={{ padding: "10px 12px 8px" }}>
          {/* CTA PARTICIPA */}
          <HoverZone
            info={{ name: "CTA Primary — PARTICIPA", category: "interaction", measurements: ["w: 252px", "h: 52px"] }}
            style={{ height: 52, background: W.accentCta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}
          >
            <span style={{ fontSize: 12, fontWeight: 800, color: W.white, fontFamily: "sans-serif", letterSpacing: 2 }}>PARTICIPA</span>
          </HoverZone>

          {/* Precio Base */}
          <HoverZone
            info={{ name: "Display Price", category: "content", measurements: ["w: 252px", "h: 46px"] }}
            style={{ marginBottom: 4 }}
          >
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
                  Comisión: 7.5% del valor de compra o mínimo &gt;S&lt; 50
                </span>
              </div>
            </div>
          </HoverZone>
        </div>

        {/* Option Tags — grid 2×2 + 1 centrado */}
        <HoverZone
          info={{ name: "Option Tags", category: "interaction", measurements: ["w: 252px", "h: 52px (c/u · 5 ítems · grid 2col)"] }}
          style={{ padding: "0 12px 12px" }}
        >
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
              <span style={{ fontSize: 9, color: W.label, fontFamily: "sans-serif", lineHeight: 1.3, whiteSpace: "pre-line" }}>{optionButtons[4].label}</span>
            </div>
          </div>
        </HoverZone>
      </div>

      {/* ── SubasCoins ── */}
      <HoverZone
        info={{ name: "SubasCoins Promo", category: "interaction", measurements: ["w: 276px", "h: 56px"] }}
        style={{ border: `1px solid ${W.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, background: W.white }}
      >
        {/* Ícono moneda SubasCoins */}
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${W.accentHigh}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: W.accentHigh, fontFamily: "monospace" }}>S</span>
          {/* Detalle de borde dentado — simulado con puntos */}
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1px dashed ${W.border}` }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif", letterSpacing: 0.5 }}>ADQUIERE SUBASCOINS</span>
        <span style={{ fontSize: 14, color: W.accentHigh, marginLeft: "auto", fontWeight: 700 }}>›</span>
      </HoverZone>

      {/* ── Ofertas Relacionadas ── */}
      <HoverZone
        info={{ name: "Ofertas Relacionadas", category: "content", measurements: ["w: 276px", "h: 420px", "card: 127×168px", "img: 127×110px"] }}
        style={{ background: W.white, padding: "12px 12px 4px" }}
      >
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
      </HoverZone>
    </div>
  );
}

// ─── COLUMNA PRINCIPAL ────────────────────────────────────────────────────────
function WfMainCol() {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Hero image */}
      <HoverZone
        info={{ name: "Image Gallery — Hero", category: "media", measurements: ["w: 444px", "h: 220px"] }}
      >
        <ImgBlock w="100%" h={220} />
      </HoverZone>

      {/* Thumbnails */}
      <HoverZone
        info={{ name: "Thumbnail Strip", category: "media", measurements: ["w: 444px", "h: 50px", "thumb: 72×50px"] }}
        style={{ display: "flex", gap: 6 }}
      >
        {[0, 1, 2, 3].map((i) => <ImgBlock key={i} w={72} h={50} />)}
      </HoverZone>

      {/* Información general */}
      <HoverZone
        info={{ name: "Specs Accordion", category: "content", measurements: ["w: 444px", "h: 268px", "fila: 444×40px"] }}
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}
      >
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
          <span style={{ fontSize: 9, color: W.label, fontFamily: "monospace" }}>CÓDIGO: 4172</span>
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
      </HoverZone>

      {/* Descripción */}
      <HoverZone
        info={{ name: "Description Block", category: "content", measurements: ["w: 444px", "h: 96px"] }}
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, padding: 12 }}
      >
        <span style={{ fontSize: 9, color: W.text, fontFamily: "sans-serif" }}>Vehículo siniestrado por choque...</span>
        {[1, 0.9, 1, 0.7, 0.95, 0.85, 1, 0.6].map((w, i) => (
          <TextLine key={i} w={`${w * 100}%`} h={7} mt={5} />
        ))}
      </HoverZone>

      {/* Descargas */}
      <HoverZone
        info={{ name: "Document Downloads", category: "content", measurements: ["w: 444px", "h: 220px", "fila: 444×44px"] }}
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}
      >
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
        {["Ficha de lavado de activos PN", "Ficha Lavado de Activos PJ"].map((doc) => (
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
      </HoverZone>

      {/* Condiciones del ofrecimiento */}
      <HoverZone
        info={{ name: "Conditions Accordion", category: "content", measurements: ["w: 444px", "h: 44px"] }}
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: W.text, fontFamily: "sans-serif" }}>Condiciones del ofrecimiento</span>
        <span style={{ fontSize: 12, color: W.label }}>⌄</span>
      </HoverZone>
    </div>
  );
}

// ─── HELP BANNER ──────────────────────────────────────────────────────────────
function WfHelpBanner() {
  return (
    <HoverZone
      info={{ name: "Help Center Banner", category: "support", measurements: ["w: 768px", "h: 80px"] }}
      style={{ height: 80, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}`, background: W.zone, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}
    >
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
    </HoverZone>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function WfFooter() {
  const col1 = ["SubasCars", "SubaBlog", "¿Quiénes somos?", "¿Cómo vender?", "Subaspas", "Blacksheep Nation"];
  const col2 = ["Condiciones y Términos", "Contáctanos", "Política de Protección de Datos Personales", "Política de Privacidad General", "Testimonios"];
  return (
    <HoverZone
      info={{ name: "Footer Primary", category: "layout", measurements: ["w: 1024px", "h: 148px"] }}
      style={{ background: W.dark, padding: "24px 24px", flexShrink: 0 }}
    >
      <div style={{ display: "flex", gap: 32, marginBottom: 16 }}>
        <div style={{ minWidth: 120 }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: W.textLight, fontFamily: "sans-serif" }}>›vmc‹</span>
          <div style={{ fontSize: 8, color: W.labelDark, fontFamily: "sans-serif", marginTop: 1 }}>Subastas</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
          {col1.map((item) => (
            <span key={item} style={{ fontSize: 9, color: W.labelDark, fontFamily: "sans-serif" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
          {col2.map((item) => (
            <span key={item} style={{ fontSize: 9, color: W.labelDark, fontFamily: "sans-serif" }}>{item}</span>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${W.borderDark}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ width: 22, height: 22, background: W.accent, borderRadius: "50%", opacity: 0.4 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {["APESO", "Libro Reclamaciones"].map((lbl) => (
            <div key={lbl} style={{ padding: "3px 8px", background: W.accent, borderRadius: 3, opacity: 0.4 }}>
              <span style={{ fontSize: 8, color: W.white, fontFamily: "sans-serif" }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <span style={{ fontSize: 8, color: W.label, fontFamily: "sans-serif" }}>© VMC Subastas es una marca registrada de Subastop S.A.C. · Todos los derechos reservados 2025</span>
      </div>
    </HoverZone>
  );
}

// ─── FRAME COMPLETO ───────────────────────────────────────────────────────────
export function DetallePageFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [frameH, setFrameH] = useState(1600);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const newScale = Math.min(1, containerW / FRAME_W);
      setScale(newScale);
      if (innerRef.current) {
        setFrameH(innerRef.current.scrollHeight);
      }
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  const show = useCallback((info: ZoneInfo, x: number, y: number) => {
    setTooltip({ info, x, y });
  }, []);
  const hide = useCallback(() => setTooltip(null), []);

  const scaledH = frameH * scale;

  return (
    <HoverCtx.Provider value={{ show, hide }}>
      {/* Leyenda de zonas */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 8, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--vmc-color-text-primary)", fontFamily: "var(--font-display, sans-serif)", margin: 0 }}>
            Frame: Detalle VMC
          </h3>
          <p style={{ fontSize: 11, color: "var(--vmc-color-text-tertiary)", margin: "2px 0 0", fontFamily: "monospace" }}>
            max-width: 1024px · hover sobre cada zona para ver medidas
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { color: W.dark, label: "Header / Footer / Navbar" },
            { color: W.darkMid, label: "Title bar" },
            { color: W.zone, label: "Zonas de contenido" },
            { color: W.accentCta, label: "CTA principal" },
            { color: W.img, label: "Imágenes" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, background: color, borderRadius: 2, border: `1px solid ${W.border}` }} />
              <span style={{ fontSize: 9, color: "var(--vmc-color-text-tertiary)", fontFamily: "sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor de escala */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          borderRadius: 6,
          border: `2px solid var(--vmc-color-border-default)`,
          overflow: "hidden",
          height: scaledH,
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: FRAME_W,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            display: "flex",
            flexDirection: "column",
            background: W.white,
            fontFamily: "sans-serif",
          }}
        >
          <WfHeader />
          <div style={{ display: "flex", flex: 1 }}>
            <WfSidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: W.bg }}>
              <WfTitleBar />
              <div style={{ display: "flex", gap: 16, padding: "16px 16px 0", alignItems: "flex-start" }}>
                <WfMainCol />
                <WfBidWidget />
              </div>
              <div style={{ padding: "16px 0" }}>
                <WfHelpBanner />
              </div>
            </div>
          </div>
          <WfFooter />
        </div>
      </div>

      <p style={{ fontSize: 10, color: "var(--vmc-color-text-tertiary)", marginTop: 6, fontFamily: "monospace" }}>
        Escala automática · hover sobre cada zona para ver nombre, categoría y medidas
      </p>

      {/* Tooltip global */}
      {tooltip && <WfTooltip tooltip={tooltip} />}
    </HoverCtx.Provider>
  );
}
