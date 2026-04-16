"use client";

/**
 * ComponentWireframe — bocetos extraídos del Frame: Detalle VMC.
 *
 * REGLA: cada sketch refleja cómo el componente aparece visualmente
 * en vmcsubastas.com/oferta/61204 (audit 13-abr-2026).
 * La referencia SubasCars es SOLO taxonómica/variantes — no visual.
 *
 * Paleta y átomos de contenido importados de wf-detalle-atoms.tsx
 * para garantizar pixel-perfect con DetallePageFrame.
 *
 * Escalado: cada Sketch renderiza el componente a su ancho natural en el frame
 * (ATOM_W importado de wf-detalle-atoms.tsx — fuente de verdad única de anchos) y usa
 * transform:scale para ajustar al ancho del acordeón — igual que DetallePageFrame.
 */

import { useEffect, useRef, useState } from "react";
import { useWireMode } from "./WireModeContext";
import type { WireMode } from "./WireModeContext";
import FooterDone from "../../../../features/Footer/FooterDone";
import {
  ATOM_W,
  W,
  AtomMetrics_Content,
  AtomHeader_Content,
  AtomSidebar_Content,
  AtomTitleBar_Content,
  AtomBidWidgetHeader_Content,
  AtomPromoBanner_Content,
  AtomButton_Content,
  AtomPriceDisplay_Content,
  AtomOptionTags_Content,
  AtomSubascoins_Content,
  AtomAuctionCards_Content,
  AtomImageGallery_Content,
  AtomVehicleSpecs_Content,
  AtomDescriptionBlock_Content,
  AtomDocumentDownloads_Content,
  AtomConditionsAccordion_Content,
  AtomHelpBanner_Content,
  AtomFooter_Content,
} from "./wf-detalle-atoms";

const lbl = {
  fontSize: "8px" as const,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: W.label,
  fontFamily: "monospace",
};

// NW eliminado — usar ATOM_W importado de wf-detalle-atoms.tsx (fuente de verdad única)

// ─── Contenedor base del boceto — escala desde tamaño natural del frame ───────
// · Escala: Math.min(1, containerW / naturalWidth) — nunca zoom-in, igual que DetallePageFrame
// · Centrado: translateX((containerW - naturalWidth*scale)/2) — siempre centrado
// · Nota: fuera del fondo del componente, como anotación bajo el borde
function Sketch({
  children,
  note,
  naturalWidth = ATOM_W.frame,
}: {
  children: React.ReactNode;
  note?: string;
  naturalWidth?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerH, setInnerH] = useState(0);
  const [containerW, setContainerW] = useState(naturalWidth);

  useEffect(() => {
    function update() {
      if (!outerRef.current || !innerRef.current) return;
      const w = outerRef.current.offsetWidth;
      if (w === 0) return;
      const s = Math.min(1, w / naturalWidth);
      setScale(s);
      setContainerW(w);
      setInnerH(innerRef.current.scrollHeight);
    }
    update();
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [naturalWidth]);

  // Offset para centrar el contenido escalado dentro del contenedor
  const offsetX = (containerW - naturalWidth * scale) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      {/* ── Zona del componente — borde punteado delimita el área visual ── */}
      <div
        ref={outerRef}
        style={{
          border: `1.5px dashed ${W.border}`,
          borderRadius: 6,
          background: W.bg,
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
          height: innerH > 0 ? innerH * scale : 48,
          flexShrink: 0,
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: naturalWidth,
            transformOrigin: "top left",
            transform: `translateX(${offsetX}px) scale(${scale})`,
            padding: "20px 0",
          }}
        >
          {children}
        </div>
      </div>
      {/* ── Nota de anotación — completamente fuera del área del componente ── */}
      {note && (
        <p style={{ ...lbl, margin: 0, paddingLeft: 2 }}>
          {note}
        </p>
      )}
    </div>
  );
}

// ─── Bocetos independientes (no en DetallePageFrame) ─────────────────────────

/** Icon — sprite SVG en tamaños sm/md/lg */
function WireIcon() {
  const sizes = [{ s: 16, n: "sm" }, { s: 20, n: "md" }, { s: 24, n: "lg" }];
  return (
    <Sketch naturalWidth={ATOM_W.demo} note="svg sprite · sm 16 · md 20 · lg 24 · color via token">
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", padding: "6px 0" }}>
        {sizes.map(({ s, n }) => (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: s, height: s, border: `1.5px solid ${W.border}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width={s - 4} height={s - 4} fill="none" stroke={W.border} strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
            </div>
            <span style={{ ...lbl, fontSize: "7px" }}>{n}</span>
          </div>
        ))}
        <div style={{ marginLeft: 6, display: "flex", flexDirection: "column", gap: 3 }}>
          {["Bell", "Check", "Car", "Clock"].map((n) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 14, height: 14, border: `1px dashed ${W.border}`, borderRadius: 2 }} />
              <span style={lbl}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </Sketch>
  );
}

/** Button — CTA "PARTICIPA" del widget + variante ghost */
function WireButton() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="h 52px CTA principal · h 44px secundario / ghost · 7 estados · VMC Detalle widget">
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* CTA primario — wrapper idéntico al HoverZone del frame */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, height: 52, background: W.accentCta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AtomButton_Content />
          </div>
          <span style={lbl}>primario</span>
        </div>
        {/* Ghost / secundario */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, height: 36, border: `1.5px solid ${W.accentHigh}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: W.accentHigh, fontFamily: "sans-serif", fontWeight: 600 }}>Acción secundaria</span>
          </div>
          <span style={lbl}>ghost</span>
        </div>
        {/* Disabled */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, height: 36, background: W.zone, borderRadius: 6, opacity: 0.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10, color: W.label, fontFamily: "sans-serif" }}>Disabled</span>
          </div>
          <span style={lbl}>disabled</span>
        </div>
      </div>
    </Sketch>
  );
}

/** Input — campo de texto con label uppercase y helper */
function WireInput() {
  return (
    <Sketch naturalWidth={ATOM_W.demo} note="h 48px · fill sin borde en reposo · label uppercase · helper / error">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ ...lbl, letterSpacing: "0.9px" }}>NOMBRE DEL CAMPO</span>
        <div style={{ height: 48, borderRadius: 4, background: W.zone, display: "flex", alignItems: "center", padding: "0 12px" }}>
          <div style={{ width: "45%", height: 8, background: W.border, borderRadius: 2 }} />
        </div>
        <div style={{ width: "55%", height: 6, background: W.zone, borderRadius: 2 }} />
        {/* Error */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
          <div style={{ height: 48, flex: 1, borderRadius: 4, background: W.zone, border: `1px solid rgba(186,26,26,0.35)`, display: "flex", alignItems: "center", padding: "0 12px" }}>
            <div style={{ width: "35%", height: 8, background: W.border, borderRadius: 2 }} />
          </div>
          <span style={lbl}>error</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(186,26,26,0.3)" }} />
          <div style={{ width: "50%", height: 6, background: W.zone, borderRadius: 2 }} />
        </div>
      </div>
    </Sketch>
  );
}

/** DataQualityIndicator — "CALIDAD DE INFORMACIÓN" con dots de nivel */
function WireDataQualityIndicator() {
  return (
    <Sketch naturalWidth={ATOM_W.demo} note="3 niveles: alto / parcial / básico · dots + label · VMC Detalle tabla specs">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 0" }}>
        {[
          { label: "Alta calidad", dots: 3, active: 3 },
          { label: "Datos parciales", dots: 3, active: 2 },
          { label: "Datos básicos", dots: 3, active: 1 },
        ].map(({ label, dots, active }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 8, color: W.label, fontFamily: "sans-serif", width: 80 }}>{label}</span>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: dots }).map((_, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < active ? W.accentHigh : W.border }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sketch>
  );
}

// ─── Bocetos extraídos del DetallePageFrame ───────────────────────────────────

/** Header — barra superior VMC: h 64px, fondo oscuro, logo izq + "Ingresa" der */
function WireHeader() {
  return (
    <Sketch naturalWidth={ATOM_W.content} note="h 64px · 768px (content area, sidebar excluido) · botón Ingresa der · fondo oscuro · VMC Detalle">
      <div style={{ height: 64, background: W.dark, borderBottom: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
        <AtomHeader_Content />
      </div>
    </Sketch>
  );
}

/** Navbar — sidebar vertical: 256px, fondo oscuro, ítem activo con borde izquierdo */
function WireNavbar() {
  return (
    <Sketch naturalWidth={ATOM_W.sidebar} note="256px · sidebar vertical · icon + label · ítem activo borde-L · fondo oscuro · VMC Detalle">
      <div style={{ width: 256, background: W.darkMid, borderRight: `1px solid ${W.borderDark}`, display: "flex", flexDirection: "column", flexShrink: 0, minHeight: 600 }}>
        <AtomSidebar_Content />
      </div>
    </Sketch>
  );
}

/** Footer baseline — 768px (content area, sidebar excluido) */
function WireFooter() {
  return (
    <Sketch naturalWidth={ATOM_W.content} note="768px (content area, sidebar excluido) · fondo oscuro · logo + 2 cols · redes sociales · copyright · VMC Detalle">
      <div style={{ background: W.dark, padding: "24px 24px", flexShrink: 0 }}>
        <AtomFooter_Content />
      </div>
    </Sketch>
  );
}

/** Footer upgrade — wireframe 1024px full-width: abarca sidebar + content, contenido distribuido */
function WireFooterUpgrade() {
  return (
    <Sketch naturalWidth={ATOM_W.frame} note="1024px (full width · sidebar + content) · upgrade · contenido distribuido equitativamente · VMC Detalle">
      <div style={{ background: W.dark, padding: "24px 32px", flexShrink: 0 }}>
        <AtomFooter_Content />
      </div>
    </Sketch>
  );
}

/** Sidebar — mismo que Navbar en el frame Detalle */
function WireSidebar() {
  return (
    <Sketch naturalWidth={ATOM_W.sidebar} note="256px · nav lateral · fondo vault oscuro · solo-vmc · VMC Detalle">
      <div style={{ width: 256, background: W.darkMid, borderRight: `1px solid ${W.borderDark}`, display: "flex", flexDirection: "column", flexShrink: 0, minHeight: 600 }}>
        <AtomSidebar_Content />
      </div>
    </Sketch>
  );
}

/** TitleBar — barra de contexto oscura h56: título vehículo + vendedor + métricas */
function WireTitleBar() {
  return (
    <Sketch naturalWidth={ATOM_W.content} note="h 56px · fondo vault-mid · título + vendedor · métricas der · VMC Detalle">
      <div style={{ height: 56, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: W.darkMid, flexShrink: 0, gap: 12 }}>
        <AtomTitleBar_Content />
      </div>
    </Sketch>
  );
}

/** BidWidgetHeader — cabecera del widget de puja: fecha/hora/corazón/métricas */
function WireBidWidgetHeader() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="fondo oscuro · fecha HOY | hora 02:05pm · corazón · métricas · VMC Detalle widget">
      <div style={{ background: W.dark, padding: "10px 12px 8px" }}>
        <AtomBidWidgetHeader_Content />
      </div>
    </Sketch>
  );
}

/** PromoBanner — "¡Oportunidad para el que sabe!" — franja sobre CTA */
function WirePromoBanner() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="franja sutil · texto italics promo · fondo gris claro · VMC Detalle widget">
      <div style={{ background: W.zone, padding: "5px 12px", borderBottom: `1px solid ${W.border}` }}>
        <AtomPromoBanner_Content />
      </div>
    </Sketch>
  );
}

/** PriceDisplay — precio base con ícono $, label y comisión — extraído del widget */
function WirePriceDisplay() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="ícono $ · Precio Base: US$ 14,999 · comisión 7.5% · VMC Detalle widget">
      <div style={{ marginBottom: 4 }}>
        <AtomPriceDisplay_Content />
      </div>
    </Sketch>
  );
}

/** OptionTags — grid 2×2 + 1 centrado de condiciones del lote */
function WireOptionTags() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="grid 2×2 + 1 centrado · estado activo/inactivo · VMC Detalle widget">
      <div style={{ padding: "0 12px 12px" }}>
        <AtomOptionTags_Content />
      </div>
    </Sketch>
  );
}

/** SubasCoins Banner — ícono moneda + CTA "ADQUIERE SUBASCOINS" + flecha */
function WireSubascoins() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="ícono moneda S · ADQUIERE SUBASCOINS · flecha der · VMC Detalle widget">
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, background: W.white }}>
        <AtomSubascoins_Content />
      </div>
    </Sketch>
  );
}

/** AuctionCard — "Ofertas Relacionadas" en el widget: grid 2×2 con imagen y badge */
function WireAuctionCard() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="grid 2×2 · img + badge precio + corazón · signature border 4px · VMC Detalle widget">
      <div style={{ background: W.white, padding: "12px 12px 4px" }}>
        <AtomAuctionCards_Content />
      </div>
    </Sketch>
  );
}

/** ImageGallery — imagen hero + fila de 4 thumbnails */
function WireImageGallery() {
  return (
    <Sketch naturalWidth={ATOM_W.main} note="hero 220px · 4 thumbnails 72×50 · flechas nav overlay · VMC Detalle columna principal">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AtomImageGallery_Content />
      </div>
    </Sketch>
  );
}

/** VehicleSpecs — tabla "Información general" con filas de atributos */
function WireVehicleSpecs() {
  return (
    <Sketch naturalWidth={ATOM_W.main} note="tabla Información general · fila header + N filas h40 · VMC Detalle columna principal">
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}>
        <AtomVehicleSpecs_Content />
      </div>
    </Sketch>
  );
}

/** DescriptionBlock — bloque de texto libre del vehículo */
function WireDescriptionBlock() {
  return (
    <Sketch naturalWidth={ATOM_W.main} note="texto libre · líneas de cuerpo · VMC Detalle columna principal">
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 4, padding: 12 }}>
        <AtomDescriptionBlock_Content />
      </div>
    </Sketch>
  );
}

/** DocumentDownloads — filas de PDF / DOC con botón "↓ Descarga" */
function WireDocumentDownloads() {
  return (
    <Sketch naturalWidth={ATOM_W.main} note="sección PDF + sección DOC · botón descarga der · VMC Detalle columna principal">
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}>
        <AtomDocumentDownloads_Content />
      </div>
    </Sketch>
  );
}

/** ConditionsAccordion — fila colapsable h44 con chevron */
function WireConditionsAccordion() {
  return (
    <Sketch naturalWidth={ATOM_W.main} note="fila h 44px · texto condiciones + chevron der · colapsable · VMC Detalle columna principal">
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 4, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <AtomConditionsAccordion_Content />
      </div>
    </Sketch>
  );
}

/** HelpCenterBanner — franja horizontal h80 con avatar, texto y CTA */
function WireHelpCenterBanner() {
  return (
    <Sketch naturalWidth={ATOM_W.content} note="h 80px · avatar circular izq · título + desc · botón CTA der · VMC Detalle">
      <div style={{ height: 80, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}`, background: W.zone, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}>
        <AtomHelpBanner_Content />
      </div>
    </Sketch>
  );
}

/** Metrics — fila de contadores: vistas · pujas · participantes · fondo oscuro widget */
function WireMetrics() {
  return (
    <Sketch naturalWidth={ATOM_W.widget} note="vistas · pujas · participantes · fondo oscuro · VMC Detalle widget">
      <AtomMetrics_Content />
    </Sketch>
  );
}

// ─── Mapa NORMAL: componentId → boceto as-is VMC ─────────────────────────────
// WireMode importado de WireModeContext — NORMAL = as-is VMC · UPGRADE = propuesta pipeline

const WIREFRAME_MAP: Record<string, () => React.JSX.Element> = {
  "icon":                    WireIcon,
  "button":                  WireButton,
  "btn":                     WireButton,
  "input":                   WireInput,
  "header":                  WireHeader,
  "header-primary":          WireHeader,
  "navbar":                  WireNavbar,
  "nav-primary":             WireNavbar,
  "footer":                  WireFooter,
  "footer-primary":          WireFooter,
  "sidebar":                 WireSidebar,
  "price-display":           WirePriceDisplay,
  "display-price":           WirePriceDisplay,
  "auction-card":            WireAuctionCard,
  "card-auction":            WireAuctionCard,
  "data-quality-indicator":  WireDataQualityIndicator,
  "indicator-data-quality":  WireDataQualityIndicator,
  "title-bar":               WireTitleBar,
  "bid-widget-header":       WireBidWidgetHeader,
  "display-metrics":         WireMetrics,
  "promo-banner":            WirePromoBanner,
  "option-tags":             WireOptionTags,
  "subascoin-banner":        WireSubascoins,
  "subascoins-promo":        WireSubascoins,
  "image-gallery":           WireImageGallery,
  "table-specs":             WireVehicleSpecs,
  "vehicle-specs":           WireVehicleSpecs,
  "description-block":       WireDescriptionBlock,
  "document-downloads":      WireDocumentDownloads,
  "conditions-accordion":    WireConditionsAccordion,
  "help-center-banner":      WireHelpCenterBanner,
};

// ─── Mapa UPGRADE: componentId → boceto con cambios propuestos ───────────────
// Se puebla conforme los agentes del pipeline proponen modificaciones.
// Si no existe entrada → el componente no tiene upgrade aún (pill oculta).

const WIREFRAME_UPGRADE_MAP: Partial<Record<string, () => React.JSX.Element>> = {
  "footer-primary": WireFooterUpgrade,
};

// ─── Mapa DONE: componentId → componente real implementado ────────────────────
// Se agrega un entry cuando el componente ya está construido (FooterDone, etc.).
// En modo "done" el acordeón muestra el componente real renderizado y escalado.

function WireFooterDone() {
  return (
    <Sketch naturalWidth={ATOM_W.frame} note="footer-primary · DONE · componente real implementado">
      <FooterDone />
    </Sketch>
  );
}

const WIREFRAME_DONE_MAP: Partial<Record<string, () => React.JSX.Element>> = {
  "footer-primary": WireFooterDone,
};

// ─── Helper de resolución ────────────────────────────────────────────────────

function resolveActiveFn(
  mode: WireMode,
  normalFn: () => React.JSX.Element,
  upgradeFn: (() => React.JSX.Element) | undefined,
  doneFn: (() => React.JSX.Element) | undefined,
): () => React.JSX.Element {
  if (mode === "done" && doneFn !== undefined) return doneFn;
  if (mode === "upgrade" && upgradeFn !== undefined) return upgradeFn;
  return normalFn;
}

// ─── Componente público ───────────────────────────────────────────────────────

interface ComponentWireframeProps {
  componentId: string;
}

export function ComponentWireframe({ componentId }: ComponentWireframeProps) {
  const { mode } = useWireMode();
  const normalFn  = WIREFRAME_MAP[componentId];
  const upgradeFn = WIREFRAME_UPGRADE_MAP[componentId];
  const doneFn    = WIREFRAME_DONE_MAP[componentId];

  if (!normalFn) {
    return (
      <div
        style={{
          border: `1.5px dashed ${W.border}`,
          borderRadius: 6,
          background: W.bg,
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 60,
        }}
      >
        <span style={{ ...lbl, color: W.accent }}>wireframe pendiente · {componentId}</span>
      </div>
    );
  }

  const ActiveFn = resolveActiveFn(mode, normalFn, upgradeFn, doneFn);
  return <ActiveFn />;
}
