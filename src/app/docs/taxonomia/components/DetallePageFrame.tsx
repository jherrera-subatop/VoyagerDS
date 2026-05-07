"use client";

/**
 * DetallePageFrame
 * Wireframe 100% escala de grises — sin tokens de producto.
 * · Hover sobre cada zona → tooltip con nombre, categoría y medidas.
 * · Auto-escala al ancho del contenedor (ResizeObserver).
 * Referencia: vmcsubastas.com/oferta/61204 (audit 13-abr-2026). Max-width: 1024px.
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { TAXONOMY_COMPONENTS } from "../_data/taxonomy-components";
import type { TaxonomyMeasurements } from "../_data/taxonomy-components";
import { useWireMode } from "./WireModeContext";
import type { WireMode } from "./WireModeContext";
import {
  W,
  ATOM_W,
  ImgBlock,
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
  AtomVehicleSpecs_Content,
  AtomDescriptionBlock_Content,
  AtomDocumentDownloads_Content,
  AtomConditionsAccordion_Content,
  AtomHelpBanner_Content,
  AtomFooter_Content,
} from "./wf-detalle-atoms";

// ─── Lookup taxonomía por ID ──────────────────────────────────────────────────
const TC_MAP = new Map(TAXONOMY_COMPONENTS.map((c) => [c.id, c]));

function measurementLines(m: TaxonomyMeasurements): string[] {
  const lines: string[] = [];
  if (m.height) lines.push(`h: ${m.height}`);
  if (m.width) lines.push(`w: ${m.width}`);
  if (m.padding) lines.push(`pad: ${m.padding}`);
  if (m.extra) {
    for (const [k, v] of Object.entries(m.extra)) {
      lines.push(`${k}: ${v}`);
    }
  }
  return lines;
}

/** Construye ZoneInfo desde taxonomy-components.ts por ID de componente */
function zi(id: string): ZoneInfo {
  const c = TC_MAP.get(id);
  if (!c) return { name: id, category: "—", measurements: [] };
  return {
    name: c.name,
    category: c.domain,
    measurements: c.measurements ? measurementLines(c.measurements) : [],
  };
}

/** Resuelve ZoneInfo con medidas correctas según el modo activo */
function resolveZoneInfo(
  base: ZoneInfo,
  componentId: string | undefined,
  mode: WireMode,
): ZoneInfo {
  if (componentId === undefined) return base;
  const c = TC_MAP.get(componentId);
  if (c === undefined) return base;
  const isActiveMode = mode === "upgrade" || mode === "done";
  if (isActiveMode && c.upgradeMeasurements !== undefined) {
    return { name: base.name, category: base.category, measurements: measurementLines(c.upgradeMeasurements) };
  }
  if (c.measurements !== undefined) {
    return { name: base.name, category: base.category, measurements: measurementLines(c.measurements) };
  }
  return base;
}

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
  componentId,
  isChrome = false,
  children,
  style,
  as: Tag = "div",
}: {
  info: ZoneInfo;
  componentId?: string;
  isChrome?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ctx = useContext(HoverCtx);
  const { mode } = useWireMode();
  const [hovered, setHovered] = useState(false);
  const resolvedInfo = resolveZoneInfo(info, componentId, mode);

  return (
    <Tag
      data-component-id={componentId}
      data-is-chrome={isChrome ? "true" : undefined}
      style={{
        ...style,
        outline: hovered ? `2px solid rgba(82,82,91,0.5)` : "2px solid transparent",
        outlineOffset: -2,
        transition: "outline 80ms ease",
        cursor: "default",
      }}
      onMouseMove={(e: React.MouseEvent) => {
        ctx?.show(resolvedInfo, e.clientX, e.clientY);
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        setHovered(true);
        ctx?.show(resolvedInfo, e.clientX, e.clientY);
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

// ─── HEADER ───────────────────────────────────────────────────────────────────
function WfHeader() {
  return (
    <HoverZone
      info={zi("header-primary")}
      componentId="header-primary"
      isChrome
      style={{ height: 64, background: W.dark, borderBottom: `1px solid ${W.borderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}
    >
      <AtomHeader_Content />
    </HoverZone>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function WfSidebar() {
  return (
    <HoverZone
      info={zi("nav-primary")}
      componentId="nav-primary"
      isChrome
      style={{ width: ATOM_W.sidebar, background: W.darkMid, borderRight: `1px solid ${W.borderDark}`, display: "flex", flexDirection: "column", flexShrink: 0, minHeight: 600 }}
    >
      <AtomSidebar_Content />
    </HoverZone>
  );
}

// ─── TITLE BAR ────────────────────────────────────────────────────────────────
function WfTitleBar() {
  return (
    <HoverZone
      info={zi("title-bar")}
      componentId="title-bar"
      style={{ height: 56, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: W.darkMid, flexShrink: 0, gap: 12 }}
    >
      <AtomTitleBar_Content />
    </HoverZone>
  );
}

// ─── WIDGET DE PUJA ───────────────────────────────────────────────────────────
function WfBidWidget() {
  return (
    <div style={{ width: WIDGET_W, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>

      {/* ── Card principal de puja ── */}
      <div style={{ border: `1px solid ${W.border}`, borderRadius: 6, overflow: "hidden", background: W.white }}>

        {/* Header del widget — fecha / corazón / hora / métricas */}
        <HoverZone
          info={zi("bid-widget-header")}
          componentId="bid-widget-header"
          style={{ background: W.dark, padding: "10px 12px 8px" }}
        >
          <AtomBidWidgetHeader_Content />
        </HoverZone>

        {/* Banner ¡Oportunidad! */}
        <HoverZone
          info={zi("promo-banner")}
          componentId="promo-banner"
          style={{ background: W.zone, padding: "5px 12px", borderBottom: `1px solid ${W.border}` }}
        >
          <AtomPromoBanner_Content />
        </HoverZone>

        <div style={{ padding: "10px 12px 8px" }}>
          {/* CTA PARTICIPA */}
          <HoverZone
            info={zi("btn")}
            componentId="btn"
            style={{ height: 52, background: W.accentCta, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}
          >
            <AtomButton_Content />
          </HoverZone>

          {/* Precio Base */}
          <HoverZone
            info={zi("display-price")}
            componentId="display-price"
            style={{ marginBottom: 4 }}
          >
            <AtomPriceDisplay_Content />
          </HoverZone>
        </div>

        {/* Option Tags — grid 2×2 + 1 centrado */}
        <HoverZone
          info={zi("option-tags")}
          componentId="option-tags"
          style={{ padding: "0 12px 12px" }}
        >
          <AtomOptionTags_Content />
        </HoverZone>
      </div>

      {/* ── SubasCoins ── */}
      <HoverZone
        info={zi("subascoins-promo")}
        componentId="subascoins-promo"
        style={{ border: `1px solid ${W.border}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, background: W.white }}
      >
        <AtomSubascoins_Content />
      </HoverZone>

      {/* ── Ofertas Relacionadas ── */}
      <HoverZone
        info={zi("card-auction")}
        componentId="card-auction"
        style={{ background: W.white, padding: "12px 12px 4px" }}
      >
        <AtomAuctionCards_Content />
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
        info={zi("image-gallery")}
        componentId="image-gallery"
      >
        <ImgBlock w="100%" h={220} />
      </HoverZone>

      {/* Thumbnails */}
      <HoverZone
        info={zi("image-gallery")}
        componentId="image-gallery-thumbs"
        style={{ display: "flex", gap: 6 }}
      >
        {[0, 1, 2, 3].map((i) => <ImgBlock key={i} w={72} h={50} />)}
      </HoverZone>

      {/* Información general */}
      <HoverZone
        info={zi("table-specs")}
        componentId="table-specs"
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}
      >
        <AtomVehicleSpecs_Content />
      </HoverZone>

      {/* Descripción */}
      <HoverZone
        info={zi("description-block")}
        componentId="description-block"
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, padding: 12 }}
      >
        <AtomDescriptionBlock_Content />
      </HoverZone>

      {/* Descargas */}
      <HoverZone
        info={zi("document-downloads")}
        componentId="document-downloads"
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, overflow: "hidden" }}
      >
        <AtomDocumentDownloads_Content />
      </HoverZone>

      {/* Condiciones del ofrecimiento */}
      <HoverZone
        info={zi("conditions-accordion")}
        componentId="conditions-accordion"
        style={{ border: `1px solid ${W.border}`, borderRadius: 4, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}
      >
        <AtomConditionsAccordion_Content />
      </HoverZone>
    </div>
  );
}

// ─── HELP BANNER ──────────────────────────────────────────────────────────────
function WfHelpBanner() {
  return (
    <HoverZone
      info={zi("help-center-banner")}
      componentId="help-center-banner"
      style={{ height: 80, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}`, background: W.zone, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}
    >
      <AtomHelpBanner_Content />
    </HoverZone>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function WfFooter() {
  return (
    <HoverZone
      info={zi("footer-primary")}
      componentId="footer-primary"
      isChrome
      style={{ background: W.dark, padding: "24px 24px", flexShrink: 0 }}
    >
      <AtomFooter_Content />
    </HoverZone>
  );
}

/** Footer upgrade — full width 1024px: sidebar + content */
function WfFooterUpgrade() {
  return (
    <HoverZone
      info={zi("footer-primary")}
      componentId="footer-primary"
      isChrome
      style={{ background: W.dark, padding: "24px 32px", flexShrink: 0 }}
    >
      <AtomFooter_Content />
    </HoverZone>
  );
}

// ─── REGISTRY DE UPGRADES DEL FRAME ──────────────────────────────────────────
// Para agregar un componente con upgrade:
//   1. Crear WfXxxUpgrade() debajo de WfXxx()
//   2. Registrar aquí con upgradeLayout:
//        "content"   → mismo lugar en el content column, solo visual cambia
//        "fullWidth" → se mueve al nivel raíz del frame (spans sidebar + content)
//
// El frame itera este registry automáticamente.
// NUNCA hardcodear mode === "normal" / mode === "upgrade" en el JSX del frame.

type UpgradeLayout = "content" | "fullWidth";

interface FrameComponentDef {
  normal: () => JSX.Element;
  upgrade?: () => JSX.Element;
  upgradeLayout?: UpgradeLayout;
}

const DETALLE_FRAME_REGISTRY: Record<string, FrameComponentDef> = {
  "footer-primary": {
    normal:        WfFooter,
    upgrade:       WfFooterUpgrade,
    upgradeLayout: "fullWidth",
  },
  // Próximos ejemplos:
  // "header-primary": { normal: WfHeader, upgrade: WfHeaderUpgrade, upgradeLayout: "content" },
  // "help-center-banner": { normal: WfHelpBanner, upgrade: WfHelpBannerUpgrade, upgradeLayout: "fullWidth" },
};

// ─── Helpers del registry ─────────────────────────────────────────────────────

function resolveFrameRender(id: string, mode: WireMode): (() => JSX.Element) | undefined {
  const def = DETALLE_FRAME_REGISTRY[id];
  if (!def) return undefined;
  if (mode === "upgrade" && def.upgrade !== undefined) return def.upgrade;
  return def.normal;
}

/** ¿El componente vive en el content column para este modo? */
function isInContentCol(id: string, mode: WireMode): boolean {
  const def = DETALLE_FRAME_REGISTRY[id];
  if (!def) return true;
  if (mode === "upgrade" && def.upgradeLayout === "fullWidth") return false;
  return true;
}

/** Renderiza un componente del registry si le corresponde estar en el content column */
function renderContentSlot(id: string, mode: WireMode): JSX.Element | null {
  if (!isInContentCol(id, mode)) return null;
  const Fn = resolveFrameRender(id, mode);
  if (Fn === undefined) return null;
  return <Fn />;
}

/** Renderiza todos los componentes del registry que en upgrade mode se mueven a full-width */
function renderFullWidthSlots(mode: WireMode): JSX.Element[] {
  if (mode !== "upgrade") return [];
  const slots: JSX.Element[] = [];
  for (const [id, def] of Object.entries(DETALLE_FRAME_REGISTRY)) {
    if (def.upgradeLayout === "fullWidth" && def.upgrade !== undefined) {
      const Fn = def.upgrade;
      slots.push(<Fn key={id} />);
    }
  }
  return slots;
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
      const newScale = Math.min(1, containerW / ATOM_W.frame);
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

  const { mode } = useWireMode();
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
            width: ATOM_W.frame,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            display: "flex",
            flexDirection: "column",
            background: W.white,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", flex: 1 }}>
            <WfSidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: W.bg }}>
              <WfHeader />
              <WfTitleBar />
              <div style={{ display: "flex", gap: 16, padding: "16px 16px 0", alignItems: "flex-start" }}>
                <WfMainCol />
                <WfBidWidget />
              </div>
              <div style={{ padding: "16px 0" }}>
                <WfHelpBanner />
              </div>
              {renderContentSlot("footer-primary", mode)}
            </div>
          </div>
          {renderFullWidthSlots(mode)}
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
