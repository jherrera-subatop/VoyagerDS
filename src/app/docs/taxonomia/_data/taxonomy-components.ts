export type TaxonomyDecision = "referencia-subascars" | "solo-vmc" | "pendiente-audit";

export interface TaxonomyMeasurements {
  /** Altura fija o rango, ej. "64px" | "44px (touch target)" */
  height?: string;
  /** Ancho fijo o regla, ej. "256px" | "100%" | "flex-1" */
  width?: string;
  /** Padding interno, ej. "0 20px" | "12px 16px" */
  padding?: string;
  /** Otras propiedades clave, ej. { "border-radius": "4px", "font-size": "30px" } */
  extra?: Record<string, string>;
}

export interface TaxonomyComponent {
  id: string;
  name: string;
  domain: string;
  origin: string;
  decision: TaxonomyDecision;
  description: string;
  instances?: number;
  variants?: number;
  /** Medidas de referencia sacadas de DESIGN.md + audit VMC Detalle */
  measurements?: TaxonomyMeasurements;
  /** En qué marcos/frames de VMC aparece */
  frames?: string[];
  /** Nombre del componente en Subascars que se relaciona (fuzzy match por nombre o propósito) */
  subascarsMatch?: string;
  /** Story IDs o variantes encontradas en el Storybook de Subascars */
  subascarsVariants?: string[];
  /** URL directa al story en el Storybook de Subascars */
  storybookUrl?: string;
}

/** Frames de VMC mapeados */
export const VMC_FRAMES = ["detalle", "listing", "home"] as const;
export type VmcFrame = (typeof VMC_FRAMES)[number];

/** Inventario curado — scope actual VMC DETALLE (oferta). Fuente alineada a TAXONOMY.md Ruta B. */
export const TAXONOMY_COMPONENTS: TaxonomyComponent[] = [
  {
    id: "icon",
    name: "Icon",
    domain: "primitivos-tokens",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Elemento visual atómico. Comunica acciones, estados y conceptos sin texto.",
    instances: 46,
    variants: 66,
    frames: ["detalle"],
    measurements: {
      height: "16px (sm) / 20px (md) / 24px (lg)",
      width: "igual a height",
      extra: { "color": "var(--token) — nunca HEX", "viewBox": "0 0 24 24" },
    },
    subascarsMatch: "Icons",
    subascarsVariants: ["Back", "Bids", "Car", "Clock", "Download", "Fuel", "Like", "Live", "Transmission", "Traction", "View", "Group"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/icons--base",
  },
  {
    id: "btn",
    name: "Button",
    domain: "ui-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Dispara una acción. Variantes: primario, secundario, ghost, destructivo.",
    instances: 17,
    frames: ["detalle"],
    measurements: {
      height: "44px (touch target mínimo)",
      width: "auto (min 120px)",
      padding: "0 20px",
      extra: { "border-radius": "4px", "font-size": "14px", "font-weight": "600" },
    },
    subascarsMatch: "Basic/Control/Button/Clickable2",
    subascarsVariants: ["bidding", "cta", "cta2"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-control-button-clickable2--bidding",
  },
  {
    id: "input",
    name: "Input",
    domain: "ui-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Captura datos del usuario. Siempre con label visible y manejo de error explícito.",
    measurements: {
      height: "48px",
      width: "100%",
      padding: "0 16px",
      extra: { "border-radius": "4px", "font-size": "14px", "fill": "sin borde visible (No-Line rule)" },
    },
    subascarsMatch: "Basic/Inputs/Content field/Text Box2",
    subascarsVariants: ["text-box", "pad-value"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-inputs-content-field-text-box2--text-box",
  },
  {
    id: "header-primary",
    name: "Header",
    domain: "layout",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Barra superior global. Logo VMC (izquierda), botón Ingreso (derecha). Fondo oscuro.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "64px",
      width: "100% (max-width: 1024px)",
      padding: "0 24px",
      extra: { "background": "var(--vmc-color-background-inverse)", "position": "sticky top-0" },
    },
    subascarsMatch: "Main/Single/General/Header",
    subascarsVariants: ["header"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-general-header--header",
  },
  {
    id: "nav-primary",
    name: "Navbar",
    domain: "layout",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Panel lateral izquierdo de navegación. Logo + items con icono y etiqueta. Fondo oscuro.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "100vh (sticky, scroll independiente)",
      width: "256px",
      extra: { "item-height": "48px", "item-padding": "0 16px", "background": "var(--vmc-color-background-inverse)" },
    },
    subascarsMatch: "Main/Single/General/Navbar V2",
    subascarsVariants: ["navbar-v-2"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-general-navbar-v2--navbar-v-2",
  },
  {
    id: "footer-primary",
    name: "Footer",
    domain: "layout",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Pie de página global. Links legales, redes sociales, logos de asociaciones.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "auto (≥ 160px)",
      width: "100% (max-width: 1024px)",
      padding: "32px 24px",
      extra: { "background": "var(--vmc-color-background-inverse)" },
    },
    subascarsMatch: "Main/Single/General/Footer",
    subascarsVariants: ["footer-desktop", "footer"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-general-footer--footer-desktop",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    domain: "layout",
    origin: "VMC",
    decision: "solo-vmc",
    description: "Panel lateral de filtros para exploración de ofertas (listings). No aparece en Detalle.",
    instances: 1,
    measurements: {
      height: "100% (scroll interno)",
      width: "256px",
      padding: "16px",
      extra: { "frame": "listing / búsqueda — no en Detalle" },
    },
    subascarsMatch: "No se encontró ninguna relación con alguno de Subascars",
  },
  {
    id: "display-price",
    name: "PriceDisplay",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Precio activo de subasta con moneda. Roboto Mono tabular-nums. Actualiza vía WebSocket.",
    instances: 3,
    frames: ["detalle"],
    measurements: {
      height: "auto",
      width: "auto",
      extra: {
        "font-size (hero)": "30px",
        "font-size (card)": "16px",
        "font-size (compact)": "12px",
        "font-family": "Roboto Mono, tabular-nums",
        "update": "WebSocket — animación flash en cambio",
      },
    },
    subascarsMatch: "Basic/Outputs/Data label/Model Value",
    subascarsVariants: ["model-value"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-model-value--model-value",
  },
  {
    id: "card-auction",
    name: "AuctionCard",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Card de lote. Imagen + precio + countdown + estado + CTA de puja. Listing y Ofertas relacionadas.",
    instances: 12,
    frames: ["detalle"],
    measurements: {
      height: "auto",
      width: "100% del slot de grid",
      extra: {
        "image-height": "132px (standard) / 200px (featured)",
        "border-radius": "4px",
        "padding": "12px",
        "gap (interna)": "8px",
      },
    },
    subascarsMatch: "Main/Single/Publication/Card",
    subascarsVariants: ["opportunity", "display", "cta", "mini"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-card-opportunity--opportunity",
  },
  {
    id: "display-metrics",
    name: "Metrics",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Contador de pujas, participantes y tiempo restante. Widget compacto en Detalle.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "auto",
      width: "100% del widget de puja",
      extra: { "font-size": "12–14px", "gap": "8px", "layout": "row con separadores" },
    },
    subascarsMatch: "Basic/Outputs/Data label/Metrics",
    subascarsVariants: ["metrics"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-metrics--metrics",
  },
  {
    id: "table-specs",
    name: "VehicleSpecs",
    domain: "vehicle-data",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Sección 'Información general'. Specs del vehículo en pares key–value. Datos densos.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "auto (≥ 4 filas × 40px = 160px)",
      width: "100%",
      extra: {
        "row-height": "40px mínimo",
        "font-size": "13px",
        "columns": "2 (label | value)",
        "padding": "12px 0",
      },
    },
    subascarsMatch: "Main/Single/Publication/Accordion — Vehicle",
    subascarsVariants: ["vehicle"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-accordion--vehicle",
  },
  {
    id: "indicator-data-quality",
    name: "DataQualityIndicator",
    domain: "vehicle-data",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Indicador visual de calidad/completitud del dato. Dots de color + tooltip.",
    instances: 4,
    frames: ["detalle"],
    measurements: {
      height: "22px",
      width: "auto",
      extra: { "dot-size": "8px", "gap": "4px", "border-radius": "100px (pill)" },
    },
    subascarsMatch: "Basic/Outputs/Data label/Bullet Drops",
    subascarsVariants: ["bullet-drops"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-bullet-drops--bullet-drops",
  },

  // ─── COMPONENTES AÑADIDOS — alineados al frame Detalle (audit 13-abr-2026) ───

  {
    id: "title-bar",
    name: "Title Bar",
    domain: "layout",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Barra de contexto del lote. Nombre, vendedor, métricas (pujas/vistas/participantes) y countdown de inicio.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "56px",
      width: "768px (content area)",
      padding: "0 16px",
      extra: { "background": "var(--vmc-color-background-inverse-mid)", "font-title": "12px 700" },
    },
    subascarsMatch: "Main/Single/Publication/Header — Group Header 2",
    subascarsVariants: ["group-header-2"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-header--group-header-2",
  },
  {
    id: "bid-widget-header",
    name: "Bid Widget Header",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Cabecera del widget de puja. Fecha de inicio, hora (grande), corazón/favorito centrado y fila de métricas: vistas · pujas · participantes.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "96px",
      width: "276px",
      padding: "10px 12px",
      extra: { "background": "var(--vmc-color-background-inverse)", "heart-icon": "32px circle" },
    },
    subascarsMatch: "Main/Single/Publication/Header — Group Opportunity 2",
    subascarsVariants: ["group-opportunity-2"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-header--group-opportunity-2",
  },
  {
    id: "promo-banner",
    name: "Promo Banner",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Franja de texto promocional sobre el CTA de puja. '¡Oportunidad para el que sabe!' Aparece cuando el lote tiene condición especial.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "28px",
      width: "276px",
      padding: "5px 12px",
    },
    subascarsMatch: "Widgets/Single/Informative — Information",
    subascarsVariants: ["information"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/widgets-single-informative--information",
  },
  {
    id: "option-tags",
    name: "Option Tags",
    domain: "auction-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Etiquetas de condiciones del lote (Con Precio Reserva, Sin Opción a Visitas, etc.). Grid 2×2 + 1 centrado. Estado activo/inactivo.",
    instances: 5,
    frames: ["detalle"],
    measurements: {
      height: "52px (c/u)",
      width: "252px (interior widget)",
      extra: { "layout": "grid 2col + 1 centrado", "radius": "6px" },
    },
    subascarsMatch: "Basic/Outputs/Data label/Tags",
    subascarsVariants: ["tags"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-tags--tags",
  },
  {
    id: "subascoins-promo",
    name: "SubasCoins Banner",
    domain: "ui-core",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Banner de conversión hacia SubasCoins. Ícono moneda + texto + chevron. Aparece debajo del widget de puja.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "56px",
      width: "276px",
      padding: "10px 14px",
    },
    subascarsMatch: "Main/Single/User/Wallet",
    subascarsVariants: ["wallet"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-user-wallet--wallet",
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    domain: "media",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Imagen hero del lote + strip de thumbnails. Controles de navegación lateral. Primera imagen a tamaño completo.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "220px (hero) + 50px (thumbnails)",
      width: "444px",
      extra: { "thumb-w": "72px", "thumb-h": "50px", "thumb-count": "4 visible" },
    },
    subascarsMatch: "Main/Multicomponent/Filmstrip/Gallery",
    subascarsVariants: ["gallery"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-multicomponent-filmstrip-gallery--gallery",
  },
  {
    id: "description-block",
    name: "Description Block",
    domain: "content",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Bloque de texto libre con la descripción del vehículo siniestrado. Soporte para párrafos largos con scroll implícito.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "96px (min)",
      width: "444px",
      padding: "12px",
    },
    subascarsMatch: "Main/Single/Publication/Accordion — Description",
    subascarsVariants: ["description"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-accordion--description",
  },
  {
    id: "document-downloads",
    name: "Document Downloads",
    domain: "content",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Sección de descarga de documentos del lote. Dos grupos: 'Descarga toda la información' (PDF) y 'Documentos requeridos' (DOC).",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "220px",
      width: "444px",
      extra: { "row-height": "44px", "icon": "24×28px", "btn": "ghost h:28px" },
    },
    subascarsMatch: "Main/Single/Publication/Accordion — Run ODC With Documents",
    subascarsVariants: ["run-odc-with-documents", "asset-holder"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-accordion--run-odc-with-documents",
  },
  {
    id: "conditions-accordion",
    name: "Conditions Accordion",
    domain: "content",
    origin: "VMC + SubasCars",
    decision: "referencia-subascars",
    description: "Acordeón colapsado con las condiciones del ofrecimiento. Estado default: cerrado.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "44px (cerrado)",
      width: "444px",
      extra: { "chevron": "12px", "state-default": "cerrado" },
    },
    subascarsMatch: "Main/Single/Publication/Accordion — Cy T",
    subascarsVariants: ["cy-t", "opportunity", "vehicle", "description", "location", "participation"],
    storybookUrl: "https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-accordion--cy-t",
  },
  {
    id: "help-center-banner",
    name: "Help Center Banner",
    domain: "support",
    origin: "VMC",
    decision: "solo-vmc",
    description: "Banner de ayuda antes del footer. 'Visita nuestro Centro de ayuda · Respuestas rápidas a todas tus dudas' + CTA.",
    instances: 1,
    frames: ["detalle"],
    measurements: {
      height: "80px",
      width: "768px",
      padding: "0 16px",
      extra: { "icon": "48px circle", "btn-h": "36px" },
    },
    subascarsMatch: "No se encontró ninguna relación con alguno de Subascars",
  },
];

export const TAXONOMY_DOMAIN_ORDER: string[] = [
  "primitivos-tokens",
  "ui-core",
  "layout",
  "auction-core",
  "vehicle-data",
  "media",
  "content",
  "support",
];

export const TAXONOMY_DOMAIN_LABEL: Record<string, string> = {
  "primitivos-tokens": "Primitivos y tokens",
  "ui-core": "UI core",
  layout: "Layout y navegación de página",
  "auction-core": "Subasta y oferta",
  "vehicle-data": "Datos del vehículo",
  media: "Media e imágenes",
  content: "Contenido y documentos",
  support: "Soporte y ayuda",
};

export const DECISION_META: Record<
  TaxonomyDecision,
  { label: string; bg: string; color: string; dot: string }
> = {
  "referencia-subascars": {
    label: "referencia SubasCars",
    bg: "var(--vmc-color-vault-100)",
    color: "var(--vmc-color-vault-900)",
    dot: "var(--vmc-color-vault-500)",
  },
  "solo-vmc": {
    label: "solo VMC",
    bg: "var(--vmc-color-background-tertiary)",
    color: "var(--vmc-color-text-secondary)",
    dot: "var(--vmc-color-neutral-500)",
  },
  "pendiente-audit": {
    label: "pendiente audit",
    bg: "var(--vmc-color-background-urgency-low)",
    color: "var(--vmc-color-amber-900)",
    dot: "var(--vmc-color-amber-500)",
  },
};

export const DOMAIN_COLORS: Record<string, string> = {
  "primitivos-tokens": "var(--vmc-color-neutral-500)",
  "ui-core": "var(--vmc-color-vault-700)",
  layout: "var(--vmc-color-green-700)",
  "auction-core": "var(--vmc-color-red-700)",
  "vehicle-data": "var(--vmc-color-amber-800)",
  media: "var(--vmc-color-neutral-600)",
  content: "var(--vmc-color-neutral-600)",
  support: "var(--vmc-color-neutral-600)",
};

/** Filtra componentes que aparecen en un frame concreto */
export function filterByFrame(frame: VmcFrame): TaxonomyComponent[] {
  return TAXONOMY_COMPONENTS.filter((c) => c.frames?.includes(frame));
}

export function groupTaxonomyByDomain(components: TaxonomyComponent[]): Map<string, TaxonomyComponent[]> {
  const map = new Map<string, TaxonomyComponent[]>();
  for (const c of components) {
    const list = map.get(c.domain);
    if (list) {
      list.push(c);
    }
    if (!list) {
      map.set(c.domain, [c]);
    }
  }
  return map;
}

