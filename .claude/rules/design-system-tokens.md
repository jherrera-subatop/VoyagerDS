# Design System — Arquitectura de Tokens y Gobernanza
**Fuente:** Gemini Deep Research (MD3, Apple HIG, Atlassian, IBM Carbon, Shopify Polaris, Radix, Bloomberg, Refinitiv Halo)
**Aplica a:** Toda decisión de tokens, nomenclatura, spacing, tipografía, color y gobernanza de Voyager
**Estas reglas son LAW — no son sugerencias.**

---

## 1. Arquitectura de Capas

```
CAPA 1 — PRIMITIVOS   : inventario absoluto de valores, agnóstico de uso
CAPA 2 — SEMÁNTICOS   : propósito funcional ("para qué se usa")
CAPA 3 — COMPONENTE   : decisiones semánticas aplicadas a un elemento específico

3 capas. No 2, no 4. Una 4a capa solo si Voyager se convierte en white-label multimarca.
```

---

## 2. Naming — Reglas Absolutas

### Primitivos: SIEMPRE numérica
```
✅  blue-100, blue-200 ... blue-900
❌  blue-subtle, blue-muted, blue-lighter   ← antipatrón — rompe predictibilidad AI
```

### Semánticos: Dot Notation con namespace funcional
```
color.background.*     ← NUNCA asignar a color / text / border
color.text.*           ← NUNCA asignar a background / border
color.border.*         ← NUNCA asignar a background / text
color.icon.*
```

### Estados: sufijo terminal en JSON
```
✅  color-button-primary-background-hover
❌  hover:bg-primary    ← rompe AST parsers de Terrazzo/Style Dictionary
```

### AI-first naming: hiper-explícito
```
Estructura: {namespace}-{categoría}-{elemento}-{propiedad}-{estado}
Ejemplo:    voyager-color-button-primary-background-hover

Críptico = alucinaciones en LLMs. Hiper-explícito = contratos inequívocos.
```

### $description: OBLIGATORIO en cada token
```json
{
  "$type": "color",
  "$value": "oklch(60% 0.15 250)",
  "$description": "Color primario de marca. Anchor en paso 9. Usar en CTAs y acciones principales."
}
```

---

## 3. Color — Escala de 12 Pasos (OKLCH)

Modelo Radix. Distribución funcional fija:

| Pasos | Uso |
|---|---|
| 1-2 | Fondos de contenedores y superficies |
| 3-5 | Estados interactivos (default, hover, active) |
| 6-8 | Bordes y separadores |
| **9** | **Anchor del color de marca — "default" de brand** |
| 10 | Fondos primarios de alta prominencia |
| 11-12 | Textos de alto contraste |

**Reglas:**
- Generar escala alfa paralela (a1-a12) para composiciones sobre fondos superpuestos
- Fondo default: gray-1 (casi blanco) o gray-950 (casi negro) — fondos neutros puros, reduce fatiga ocular
- NO usar fondos coloreados para separar contenido — usar border.subtle de 1px

### Tokens semánticos de color mínimos para Voyager

**Universales:**
- color.background.primary / secondary / tertiary
- color.text.primary / secondary / disabled / inverse
- color.border.subtle / strong / interactive / selected / focus-ring
- color.feedback.success / warning / error / info

**Transaccionales — OBLIGATORIOS, no existen en design systems consumer:**
- `color.text.market.bullish` — alza en oferta (≠ success)
- `color.text.market.bearish` — baja en estimaciones (≠ error)
- `color.background.urgency.low/high/critical` — countdown timers por fase
- `color.timer.standard` — tiempo normal de subasta
- `color.timer.imminent` — últimos segundos / prórroga ("Going, going, gone")
- `color.surface.processing` — retención de fondos asíncrona (clearing & settlement)
- `color.border.verified` — lote verificado / documentación completa
- `color.action.execute.bid` — PROTEGIDO: jamás confundible con botón de navegación
- `color.action.execute.withdraw` — recesión de oferta, color disonante preventivo

---

## 4. Spacing

**Base:** 4px y 8px — múltiplos exactos. NUNCA múltiplos de 5 (anti-aliasing blurring en monitores).

**Naming:** multiplicador en cientos estilo Atlassian
```
space.025 = 2px
space.050 = 4px
space.100 = 8px
space.150 = 12px
space.200 = 16px
space.300 = 24px
space.400 = 32px
space.500 = 40px
space.600 = 48px
space.800 = 64px
space.1000 = 80px
space.1200 = 96px
```
12-14 pasos. Suficiente. No crear más sin aprobación.

**Separación cognitiva:**
```
Micro (space.025–space.300 → 2px–24px)  : paddings internos, gaps, celdas de tabla
Macro (space.400–space.1200 → 32px–96px+): separación de módulos, márgenes de sección
```

**Tokens semánticos de spacing:** SOLO para micro-estructuras ultra-repetitivas
```
table.cell.padding    ← sí, cambia si se activa modo compacto
form.input.gap        ← sí, consistencia en todos los forms
button.padding.sm/md  ← sí, propagación global instantánea
```

---

## 5. Tipografía

**Escala:** 10-12 niveles productivos. NO los 15 de Material Design 3 (sobreingeniería).

**Naming:** combinado rol + tamaño
```
text-display-xl / text-display-lg
text-heading-xl / text-heading-lg / text-heading-md / text-heading-sm
text-body-lg / text-body-md / text-body-sm
text-label-md / text-label-sm
text-caption
```

**Composite Tokens — OBLIGATORIO:** cada token tipográfico incluye:
```json
{
  "$type": "typography",
  "$value": {
    "fontFamily": "{typography.family.base}",
    "fontSize": "14px",
    "lineHeight": "1.5",
    "fontWeight": 400,
    "letterSpacing": "0"
  }
}
```

**tabular-nums — CRÍTICO para Voyager:**
Todo token tipográfico que renderice precios, timers, bids o cualquier valor numérico cambiante DEBE incluir:
```css
font-variant-numeric: tabular-nums;
```
Sin esto, los dígitos tienen anchos variables y el texto "jitters" (salta) durante actualizaciones de WebSocket. En una subasta en tiempo real esto es inaceptable.

**Responsive:** breakpoints fijos — NUNCA `clamp()`.
DTCG + agentes AI necesitan valores enteros predecibles para pruebas de accesibilidad y regresiones visuales.

---

## 6. Border-Radius

4-5 pasos. Cerrado. Inmutable salvo decisión de brand.

```
radius-none  → 0px     : tablas estructurales, divisores internos
radius-sm    → 2-4px   : celdas de subasta, labels, checkboxes, tags
radius-md    → 6-8px   : botones primarios, inputs, cards
radius-lg    → 12-16px : modales, popovers, agrupaciones superiores
radius-full  → 9999px  : avatares, status dots de conectividad
```

**Regla de brand para Voyager:**
radius-sm y radius-md dominan. Plataforma financiera = bordes agudos = rigor técnico + confianza.
Radius amplio = "consumer app" — evitar en componentes transaccionales críticos.

---

## 7. Elevación (Shadows)

3 niveles únicamente. Diseño quasi-plano. Sin skeuomorfismo.

```
elevation-1  : sombra sutil en hover de tarjetas accionables
elevation-2  : dropdowns, tooltips, menus flotantes
elevation-3  : modals de confirmación crítica (+ token overlay-backdrop)
```

---

## 8. Estados Interactivos

9 estados mínimos para componentes transaccionales:

| Estado | Cuándo |
|---|---|
| default | reposo |
| hover | interactividad latente |
| active/pressed | confirmación de ejecución (clic de puja) |
| focus/focus-visible | navegación por teclado / accesibilidad |
| selected | selección persistente (filtros anclados, flotas) |
| disabled | regla de negocio invalida la acción (sin margen de crédito) |
| loading/processing | intervalo entre clic y confirmación de DB |
| error/invalid | rechazo de transacción / sobrepuja detectada |
| success/winning | adjudicación de lote confirmada |

---

## 9. Focus Ring — WCAG 2.2

```css
/* CORRECTO — outline no se amputa con overflow:hidden */
outline: 2px solid var(--color-border-focus-ring);
outline-offset: 2px;

/* INCORRECTO — box-shadow se amputa con overflow:hidden */
box-shadow: 0 0 0 2px var(--color-border-focus-ring);
```

Token dedicado: `color.border.focus-ring`
- Alta luminancia APCA (azul o violeta prominente)
- Contraste mínimo 3:1 vs estado sin foco y vs fondo adyacente (WCAG 2.2 — 2.4.11 + 2.4.13)

---

## 10. Motion

4 niveles. Minimalismo cinético = mandato de negocio. Latencia percibida = pérdida de confianza.

```
motion-duration-instant  → 0ms      : actualizaciones WebSocket de precio/volumen
                                       SIN fade-in — el valor debe ser visible INMEDIATAMENTE
motion-duration-fast     → 100ms    : hover, press, micro-feedback
motion-duration-moderate → 200-250ms: overlays, dialogs de confirmación
motion-easing-standard   → Bezier para transiciones de estado
motion-easing-entrance   → Bezier para elementos que entran al viewport
```

---

## 11. Gobernanza

### Versionado Semántico (SemVer)
```
PATCH : ajuste de valor sin renombrar (recalibrar oklch de gray-500)
MINOR : nuevo token sin breaking change
MAJOR : renombrar o eliminar token
        → deprecation period obligatorio antes de eliminar
        → warnings en IDE + pipeline CI/CD durante deprecation
```

### Regla anti-sprawl
```
Nuevo token primitivo SOLO si su cambio debe propagarse al 100% de la app.
Variaciones aisladas → Component Tokens bajo flujo formal de revisión.
```

### Modo Compacto (Density Mode)
Cuando el negocio requiera más lotes por pantalla:
- Activar multiplicador global que reduce todos los tokens de spacing en un factor fijo
- NO reescribir componentes — el spacing cambia desde los tokens

### MCP Readiness
- `$description` en cada token — contratos legibles por agentes AI
- Nomenclatura hiper-explícita — los LLMs usan los tokens correctos sin ambigüedad
- Un agente que lee el token sabe: qué es, para qué se usa, dónde NO usarlo

---

## Quick Reference — Antipatrones Prohibidos

| Antipatrón | Por qué |
|---|---|
| Naming semántico en primitivos (gray-subtle) | Rompe predictibilidad — no se puede interpolar |
| Pseudo-clases en clave JSON (hover:bg-primary) | Rompe AST parsers de Terrazzo |
| box-shadow para focus ring | Se amputa con overflow:hidden |
| clamp() en tokens tipográficos | Valores no predecibles para AI + tests de accesibilidad |
| Escalas de spacing impares (múltiplos de 5) | Anti-aliasing blurring en subpíxeles |
| Fondos coloreados para separar contenido | Fatiga ocular, usar border.subtle 1px |
| Token sin $description | No consumible por MCP / agentes |
| Variable global de Redux Store | Filtración de estado entre sesiones SSR |
| create() global de Zustand en App Router | Hydration mismatch |
