/**
 * Referencias de wireframe ib-taxonomía — alineado a TAXONOMY.md (Storybook SubasCars + audit VMC).
 * No se incrustan iframes: enlaces externos + texto de contexto.
 */

export const VMC_AUDIT_DETALLE_LABEL =
  "Audit VMC producción (DOM + capturas): pantalla Detalle de oferta — ej. ruta tipo /oferta/:id.";

/** Storybook SubasCars por id de componente (solo donde TAXONOMY.md documenta URL). */
export const SUBASCARS_STORYBOOK_BY_COMPONENT_ID: Record<string, string> = {
  icon: "https://subascars-storybook-gcp.web.app/?path=/story/icons--alert-circle",
  "header-primary":
    "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-header--group-checkout-2",
  "nav-primary":
    "https://subascars-storybook-gcp.web.app/?path=/story/basic-control-icon-navigation--navigation",
  "footer-primary":
    "https://subascars-storybook-gcp.web.app/?path=/story/main-single-general-footer--footer-desktop",
  "display-metrics":
    "https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-metrics--metrics",
  // card-auction: pendiente — buscar en SubasCars Storybook la historia de AuctionCard
  // Patrón esperado: ?path=/story/main-single-publication-auction-card--auction-card
};

export interface DetalleZoneWireframe {
  id: string;
  title: string;
  summary: string;
  componentIds: string[];
}

export const DETALLE_ZONES: DetalleZoneWireframe[] = [
  {
    id: "hdr",
    title: "Cabecera y navegación global",
    summary: "Logo, navegación principal, iconografía de cuenta y utilidades.",
    componentIds: ["header-primary", "nav-primary", "icon"],
  },
  {
    id: "gal",
    title: "Galería / hero del lote",
    summary: "Media principal, controles, iconos de acción sobre el lote.",
    componentIds: ["icon", "btn"],
  },
  {
    id: "spec",
    title: "Datos del vehículo",
    summary: "Tabla de especificaciones e indicadores de calidad de datos.",
    componentIds: ["table-specs", "indicator-data-quality"],
  },
  {
    id: "bid",
    title: "Panel de subasta y puja",
    summary: "Precio en vivo, métricas, inputs y CTAs de la oferta.",
    componentIds: ["display-price", "display-metrics", "input", "btn"],
  },
  {
    id: "rel",
    title: "Relacionados / cards",
    summary: "Cards de otros lotes en contexto listing.",
    componentIds: ["card-auction", "icon"],
  },
  {
    id: "ftr",
    title: "Pie global",
    summary: "Footer legal y enlaces institucionales.",
    componentIds: ["footer-primary", "icon"],
  },
];
