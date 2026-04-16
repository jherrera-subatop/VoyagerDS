/**
 * frame-dimensions.ts
 * Fuente de verdad única para anchos canónicos del sistema Detalle VMC.
 *
 * REGLA: NUNCA duplicar estos valores en otro archivo.
 * Importar ATOM_W desde aquí en:
 *   - components/wf-detalle-atoms.tsx   (renderizado del wireframe)
 *   - _data/frame-measure-spec.ts        (especificación de medidas)
 *
 * Si el ancho del frame cambia → cambiar aquí → propaga a wireframe Y spec.
 */

export const ATOM_W = {
  /** Ancho total del frame Detalle (sidebar + content) */
  frame: 1024,
  /** Sidebar de navegación — nav-primary */
  sidebar: 256,
  /** Content area = frame − sidebar. Abarca header, footer, title-bar, help-banner */
  content: 768,
  /** Columna del widget de puja */
  widget: 276,
  /** Interior del widget de puja (widget − pad 12px c/lado) */
  widgetInner: 252,
  /** Columna principal = content − pad(2×16) − gap(16) − widget */
  main: 444,
  /** Ancho de bocetos standalone sin contexto de frame */
  demo: 280,
} as const;

export type AtomWidths = typeof ATOM_W;
