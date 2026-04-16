/**
 * frame-measure-spec.ts
 * Especificación pixel-perfect de medidas por zona para cada frame de VMC Subastas.
 * Fuente: audit de screenshots + DOM VMC producción (13-abr-2026).
 *
 * REGLA: los anchos (wPx) deben referenciar ATOM_W — NUNCA números hardcodeados.
 * Si el frame cambia → cambiar en _data/frame-dimensions.ts → propaga aquí automáticamente.
 */
import { ATOM_W } from "./frame-dimensions";

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
  maxWidth: ATOM_W.frame,
  layoutNotes:
    `sidebar:${ATOM_W.sidebar}px · content:${ATOM_W.content}px · pad-inner:16px → 736px · widget:${ATOM_W.widget}px · gap:16px · main-col:${ATOM_W.main}px · widget-inner:${ATOM_W.widgetInner}px`,
  zones: [
    { name: "Header Primary",          wPx: ATOM_W.content,     hPx: 64 },
    { name: "Navbar Primary",          wPx: ATOM_W.sidebar,     hPx: "variable", notes: "Cada ítem: h:48px. Altura total = altura del viewport." },
    { name: "Title Bar — Detalle",     wPx: ATOM_W.content,     hPx: 56 },
    { name: "Image Gallery — Hero",    wPx: ATOM_W.main,        hPx: 220 },
    { name: "Thumbnail Strip",         wPx: ATOM_W.main,        hPx: 50,  notes: "Thumb individual: 72×50px" },
    { name: "Specs Accordion",         wPx: ATOM_W.main,        hPx: 268, notes: "Header 38px + code row 28px + 5 filas × 40px" },
    { name: "Description Block",       wPx: ATOM_W.main,        hPx: 96 },
    { name: "Document Downloads",      wPx: ATOM_W.main,        hPx: 220, notes: "Header + 2 PDF rows (44px) + subheader + 2 DOC rows (44px)" },
    { name: "Conditions Accordion",    wPx: ATOM_W.main,        hPx: 44 },
    { name: "Bid Widget Header",       wPx: ATOM_W.widget,      hPx: 96,  notes: "fecha/hora + heart circle + métricas (vistas·pujas·participantes)" },
    { name: "Promo Banner",            wPx: ATOM_W.widget,      hPx: 28 },
    { name: "CTA Primary — PARTICIPA", wPx: ATOM_W.widgetInner, hPx: 52 },
    { name: "Display Price",           wPx: ATOM_W.widgetInner, hPx: 46 },
    { name: "Option Tags",             wPx: ATOM_W.widgetInner, hPx: 52,  notes: "Grid 2col. 4 ítems × 52px + 1 centrado × 52px." },
    { name: "SubasCoins Promo",        wPx: ATOM_W.widget,      hPx: 56 },
    { name: "Ofertas Relacionadas",    wPx: ATOM_W.widget,      hPx: 420, notes: "Card: 127×168px · img: 127×110px · Signature Finish: 4px bottom stripe" },
    { name: "Help Center Banner",      wPx: ATOM_W.content,     hPx: 80 },
    { name: "Footer Primary",          wPx: ATOM_W.frame,       hPx: "variable", notes: "upgrade: full width 1024px · sidebar + content · base ≥ 160px" },
  ],
};

/** Registro global de specs por frameId */
export const ALL_FRAME_SPECS: Record<string, FrameMeasureSpec> = {
  detalle: DETALLE_MEASURE_SPEC,
};
