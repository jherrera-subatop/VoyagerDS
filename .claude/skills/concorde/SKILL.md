# Skill: concorde
**Maquetador de componentes — Figma + Preview → código production-ready**
**Autónomo · Portable · Sin dependencias externas al repo**

---

## Activación
```
/concorde <NombreComponente>
/concorde Button
/concorde LikeButton --variant sm-guest
/concorde Button --all-variants
```

---

## Arquitectura de agentes

```
concorde-manifest.json  +  concorde-config.json
         ↓
Agent 1 — Extractor       → ComponentSpec JSON
         ↓ (paralelo)
    Preview (Chrome MCP)  +  Figma MCP (si hay node_id)
         ↓
Agent 2 — Layout Coder    → Component.tsx (estructura + estilos)
         ↓
Agent 3 — Interaction Coder → Component.tsx v2 (estados + animaciones)
         ↓
Agent 4 — Token Mapper    → actualiza .claude/concorde/token-map.json
         ↓
Agent 5 — File Writer     → escribe archivos en el repo
```

---

## PASO 0 — Inicialización (SIEMPRE primero)

### 0.1 Leer manifest
Leer `concorde-manifest.json` en la raíz del repo.
Si no existe → ERROR: "Ejecuta el setup del preview primero".

Extraer del manifest para el componente solicitado:
- `preview_base_url` + `preview_anchor` → URL de navegación
- `variants` → lista de variantes a procesar
- `states` → estados por variante
- `has_interactive_demo` → si hay demo clickeable
- `figma_node_id` → si está vacío, skip Figma (solo preview)

### 0.2 Leer config de código
Leer `concorde-config.json` en la raíz del repo.
Si no existe → CREAR con defaults (ver estructura abajo) y avisar al usuario.

### 0.3 Leer token map acumulado
Leer `.claude/concorde/token-map.json`.
Si no existe → inicializar vacío `{ "version": "1", "tokens": {}, "typography": {}, "spacing": {} }`.

---

## PASO 1 — Agent 1: Extractor

### Fuente A — Preview (SIEMPRE)

Navegar con `mcp__Claude_in_Chrome__navigate` a:
```
{preview_base_url}{preview_anchor}
```

Para cada estado del componente:
1. Hacer screenshot del estado `data-concorde-state="default"`
2. Inspeccionar CSS con `mcp__Claude_in_Chrome__javascript_tool`:
```javascript
// Ejecutar en el browser para extraer estilos computados
const el = document.querySelector('[data-concorde-component="{Nombre}"][data-concorde-variant="{variant}"]');
const states = {};
el.querySelectorAll('[data-concorde-state]').forEach(s => {
  const computed = window.getComputedStyle(s.querySelector('button, a, [role]') || s);
  states[s.dataset.concordeState] = {
    backgroundColor: computed.backgroundColor,
    color: computed.color,
    borderRadius: computed.borderRadius,
    padding: computed.padding,
    fontSize: computed.fontSize,
    fontFamily: computed.fontFamily,
    fontWeight: computed.fontWeight,
    transition: computed.transition,
    transform: computed.transform,
    opacity: computed.opacity,
    boxShadow: computed.boxShadow,
    border: computed.border,
    width: computed.width,
    height: computed.height,
    gap: computed.gap,
  };
});
return JSON.stringify(states, null, 2);
```
3. Si `has_interactive_demo: true` → navegar al demo, hover + click para capturar animaciones reales

### Fuente B — Figma MCP (solo si figma_node_id no vacío)

```
mcp__f3f807ad__get_design_context(node_id)
```

Extraer:
- Auto-layout: direction, gap, padding, alignment
- Border radius exacto
- Variantes y sus propiedades expuestas
- Prototype interactions (trigger, action, animation type + duration)
- Tipografía: family, size, weight, line-height, letter-spacing

**Figma manda sobre preview en caso de conflicto visual.**
Preview manda sobre Figma en caso de conflicto de comportamiento/animación.

### Output del Extractor: ComponentSpec JSON

```json
{
  "component": "Button",
  "variant": "md-primary",
  "dimensions": { "width": "auto", "height": "40px", "minWidth": "120px" },
  "spacing": { "paddingX": "24px", "paddingY": "0", "gap": "8px" },
  "typography": { "family": "Plus Jakarta Sans", "size": "14px", "weight": "600", "lineHeight": "1" },
  "borderRadius": "9999px",
  "states": {
    "default": { "background": "#F97316", "color": "#FFFFFF", "border": "none" },
    "hover": { "background": "#EA6C0A", "transform": "none", "transition": "background 150ms ease" },
    "pressed": { "background": "#C45C07", "transform": "scale(0.98)" },
    "disabled": { "background": "#D1D5DB", "color": "#9CA3AF", "cursor": "not-allowed" }
  },
  "animations": {
    "hover_transition": "background-color 150ms ease-in-out",
    "press_scale": "transform 80ms ease"
  },
  "existing_token_matches": []
}
```

El Extractor también busca en `token-map.json` si algún valor ya tiene token mapeado
y lo registra en `existing_token_matches`.

---

## PASO 2 — Agent 2: Layout Coder

**Input:** ComponentSpec JSON + concorde-config.json + token-map.json

**Reglas de código (leer de concorde-config.json — NO hardcodear):**
Las reglas vienen del config del repo. Si hay contradicción entre el config y estas instrucciones,
el config del repo GANA siempre.

**Patrón de estructura:**

```tsx
// {ComponentName}.tsx
// Generado por Concorde — editar libremente después
// Fuentes: Preview {preview_url} + Figma node {figma_node_id}
// Generado: {fecha}

"use client"; // solo si tiene interactividad

import type { JSX } from "react";
// imports según config del repo

// Variantes como union type — NUNCA enum
type {Nombre}Variant = "primary" | "secondary" | "ghost";
type {Nombre}Size = "md" | "sm";

export interface {Nombre}Props {
  variant?: {Nombre}Variant;
  size?: {Nombre}Size;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void; // solo si interactivo
  className?: string;
}

export default function {Nombre}({ variant = "primary", size = "md", children, disabled = false, onClick, className }: {Nombre}Props): JSX.Element {
  // lógica aquí
}
```

**Regla de estados hover/pressed:**
Si el repo tiene sistema de tokens → usar `color-mix()` o `var(--token)` según config.
Si el repo NO tiene sistema de tokens → usar valores exactos del ComponentSpec con CSS inline o className.

**NO inventar clases que no existan en el repo.**
**NO agregar dependencias no listadas en concorde-config.json.**

---

## PASO 3 — Agent 3: Interaction Coder

**Input:** Component.tsx del paso 2 + `animations` del ComponentSpec

Agregar estados interactivos exactos del preview:

```tsx
// Animaciones deben replicar exactamente lo que está en el preview
// Usar transition/transform CSS nativo primero
// Framer Motion solo si está en concorde-config.json como dependencia permitida

const TRANSITIONS = {
  hover: "background-color 150ms ease-in-out",
  press: "transform 80ms ease, background-color 80ms ease",
} as const;
```

Para `prefers-reduced-motion`:
```tsx
// SIEMPRE agregar — sin excepción
const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;
```

Agregar todos los estados del ComponentSpec:
- `onMouseEnter` / `onMouseLeave` para hover si no es CSS puro
- `onMouseDown` / `onMouseUp` para pressed
- `disabled` → no interacción, estilos desactivados
- `focus-visible` → focus ring (accesibilidad mínima siempre)

---

## PASO 4 — Agent 4: Token Mapper (post-generación)

**Input:** ComponentSpec JSON + `.claude/concorde/token-map.json` actual

Para cada valor de color, tipografía y spacing en el ComponentSpec:
1. Buscar si ya existe en token-map.json
2. Si existe → anotar en el comentario del archivo generado: `/* mapped: --var-name */`
3. Si no existe → agregar al map con el valor y el primer componente donde apareció

```json
// token-map.json — crece con cada componente
{
  "version": "1",
  "generated_by": "concorde",
  "tokens": {
    "#F97316": { "suggested_name": "--color-brand-orange", "first_seen": "Button/primary/default", "components": ["Button"] },
    "#22005C": { "suggested_name": "--color-brand-purple", "first_seen": "Button/secondary/default", "components": ["Button"] }
  },
  "typography": {
    "Plus Jakarta Sans / 14px / 600": { "suggested_name": "--text-label-md", "first_seen": "Button/md", "components": ["Button"] }
  },
  "spacing": {
    "24px": { "suggested_name": "--space-6", "first_seen": "Button/md/paddingX", "components": ["Button"] }
  }
}
```

El token map NO modifica el componente generado. Es referencia para el equipo de diseño
y para futuros componentes (reutilizar valores ya identificados).

---

## PASO 5 — Agent 5: File Writer

Escribir los archivos en la estructura del repo según `concorde-config.json`:

```
src/                          ← output_dir del config
  {output_dir}/
    {ComponentName}/
      {ComponentName}.tsx     ← componente generado
      index.ts                ← export barrel
      README.md               ← spec legible por humanos (qué se extrajo, de dónde)
```

El README.md incluye:
- Fuentes usadas (preview URL + Figma node si aplica)
- ComponentSpec resumido (dimensiones, estados, animaciones)
- Lista de valores en token-map pendientes de tokenizar
- Instrucciones para editar el componente

---

## concorde-config.json — estructura

```json
{
  "version": "1",
  "project": "nombre-del-proyecto",
  "stack": {
    "framework": "nextjs",
    "typescript": true,
    "styling": "tailwind-v4",
    "animation": "css-native",
    "component_library": null
  },
  "code_rules": {
    "no_any": true,
    "no_ternaries": false,
    "no_anonymous_functions": false,
    "no_hardcoded_hex": false,
    "spacing_grid": 8,
    "use_container_queries": false
  },
  "output_dir": "src/components",
  "token_system": false,
  "allowed_dependencies": ["react", "next"],
  "typescript_strict": true
}
```

Para Voyager específicamente, el config DEBE tener:
```json
{
  "code_rules": {
    "no_any": true,
    "no_ternaries": true,
    "no_anonymous_functions": true,
    "no_hardcoded_hex": true,
    "spacing_grid": 8,
    "use_container_queries": true
  },
  "output_dir": "src/features",
  "token_system": true,
  "allowed_dependencies": ["react", "next", "clsx", "tailwind-merge"]
}
```

---

## Límites de autonomía

Concorde actúa solo dentro de `output_dir` definido en el config.
NUNCA modifica:
- Archivos de configuración del repo (package.json, tsconfig, etc.)
- Archivos fuera de output_dir
- El manifest o el config — solo token-map.json

---

## Puntos de intervención humana

1. **Antes de escribir** — si la extracción del preview falla o el componente no tiene `data-concorde-*` attributes → STOP, avisar al usuario
2. **Después de generar** — presentar preview del código antes de escribir a disco (preguntar confirmación)
3. **Token map** — nunca auto-aplica tokens al código. Solo registra. El dev decide cuándo tokenizar.

---

## Flujo de ejemplo completo

```
Usuario: /concorde Button

Concorde:
  0. Lee manifest → Button tiene md/sm-guest/sm-logged-in, preview en localhost:3420/preview/components/pase1#button-md
  0. Lee config → Voyager rules (no HEX, no ternarios, container queries)
  0. Lee token-map → vacío (primer componente)

  1. Extractor:
     → navega #button-md → screenshot default/hover/pressed/disabled
     → ejecuta JS → extrae estilos computados de cada estado
     → navega demo interactivo → observa animaciones reales
     → Figma node_id vacío → skip Figma
     → produce ButtonSpec.json

  2. Layout Coder:
     → genera Button.tsx con estructura base (variantes primary/secondary/ghost)
     → aplica dimensiones exactas del spec
     → respeta config: no ternarios → if/else, no HEX → var(--) si token_system=true

  3. Interaction Coder:
     → agrega transiciones exactas del preview (150ms ease)
     → agrega pressed scale(0.98) con 80ms
     → agrega prefers-reduced-motion

  4. Token Mapper:
     → registra #F97316 como --color-brand-orange en token-map.json
     → registra Plus Jakarta Sans/14px/600 como --text-label-md

  5. File Writer:
     → muestra código al usuario para confirmación
     → escribe src/features/Button/Button.tsx
     → escribe src/features/Button/index.ts
     → escribe src/features/Button/README.md (spec legible)
     → actualiza token-map.json
```

---

## Red flags — STOP si ocurre

- Preview URL no carga → avisar, no generar código inventado
- `data-concorde-component` no encontrado en el DOM → el componente no está marcado, no adivinar
- Figma node_id presente pero MCP falla → continuar solo con preview, anotar en README
- Config dice `no_hardcoded_hex: true` pero no hay token system → avisar al usuario del conflicto antes de generar
