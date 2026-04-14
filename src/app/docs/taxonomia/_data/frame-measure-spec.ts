/**
 * frame-measure-spec.ts
 * Especificación pixel-perfect de medidas por zona para cada frame de VMC Subastas.
 * Fuente: audit de screenshots + DOM VMC producción (13-abr-2026).
 * Max-width del sistema: 1024px.
 *
 * Usado por el skill /wf-measure-audit para auditar que los HoverZone
 * de los wireframes declaren medidas coherentes con la referencia real.
 */

export interface ZoneMeasureSpec {
  /** Nombre del componente — debe coincidir con HoverZone info.name */
  name: string;
  /** Ancho en px. "variable" = no fijo por diseño (flex-1, %, etc.) */
  wPx: number | "variable";
  /** Alto en px. "variable" = altura dinámica por contenido */
  hPx: number | "variable";
  /** Notas de contexto para el auditor */
  notes?: string;
}

export interface FrameMeasureSpec {
  frameId: string;
  /** Max-width del frame en px */
  maxWidth: number;
  /** Descripción del layout para contextualizar las medidas */
  layoutNotes: string;
  zones: ZoneMeasureSpec[];
}

// ─── FRAME: DETALLE VMC (/oferta/:id) ────────────────────────────────────────
// Layout: sidebar 256px | content 768px
//   content inner (pad 16px c/lado): 736px
//   widget 276px | gap 16px | main col 444px
//   widget interior (pad 12px c/lado): 252px
export const DETALLE_MEASURE_SPEC: FrameMeasureSpec = {
  frameId: "detalle",
  maxWidth: 1024,
  layoutNotes:
    "sidebar:256px · content:768px · pad-inner:16px → 736px · widget:276px · gap:16px · main-col:444px · widget-inner:252px",
  zones: [
    { name: "Header Primary",          wPx: 1024, hPx: 64 },
    { name: "Navbar Primary",          wPx: 256,  hPx: "variable", notes: "Cada ítem: h:48px. Altura total = altura del viewport." },
    { name: "Title Bar — Detalle",     wPx: 768,  hPx: 56 },
    { name: "Image Gallery — Hero",    wPx: 444,  hPx: 220 },
    { name: "Thumbnail Strip",         wPx: 444,  hPx: 50,  notes: "Thumb individual: 72×50px" },
    { name: "Specs Accordion",         wPx: 444,  hPx: 268, notes: "Header 38px + code row 28px + 5 filas × 40px" },
    { name: "Description Block",       wPx: 444,  hPx: 96 },
    { name: "Document Downloads",      wPx: 444,  hPx: 220, notes: "Header + 2 PDF rows (44px) + subheader + 2 DOC rows (44px)" },
    { name: "Conditions Accordion",    wPx: 444,  hPx: 44 },
    { name: "Bid Widget Header",        wPx: 276,  hPx: 96,  notes: "fecha/hora + heart circle + métricas (vistas·pujas·participantes)" },
    { name: "Promo Banner",            wPx: 276,  hPx: 28 },
    { name: "CTA Primary — PARTICIPA", wPx: 252,  hPx: 52 },
    { name: "Display Price",           wPx: 252,  hPx: 46 },
    { name: "Option Tags",             wPx: 252,  hPx: 52,  notes: "Grid 2col. 4 ítems × 52px + 1 centrado × 52px." },
    { name: "SubasCoins Promo",        wPx: 276,  hPx: 56 },
    { name: "Ofertas Relacionadas",    wPx: 276,  hPx: 420, notes: "Card: 127×168px · img: 127×110px · Signature Finish: 4px bottom stripe" },
    { name: "Help Center Banner",      wPx: 768,  hPx: 80 },
    { name: "Footer Primary",          wPx: 1024, hPx: 148 },
  ],
};

/** Registro global de specs por frameId */
export const ALL_FRAME_SPECS: Record<string, FrameMeasureSpec> = {
  detalle: DETALLE_MEASURE_SPEC,
};
