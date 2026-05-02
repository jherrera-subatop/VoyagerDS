# Brief para Gemini Deep Research — Mejora de Agentes Figma Push
**Proyecto:** VOYAGER Design System — VMC Subastas  
**Fecha:** 2026-04-29  
**Objetivo:** Diseñar subagentes Claude que empujen componentes React a Figma con fidelidad pixel-perfect, cero errores de tokens, y cero errores de fuentes.

---

## 1. Stack Técnico

```
React / Next.js 15 (App Router) · TypeScript estricto
Tailwind CSS v4 (CSS-first, sin tailwind.config.js)
Tokens: var(--token, #fallback-hex) en cada componente
Figma MCP: mcp_use_figma (Figma Plugin API via JavaScript)
```

### Fuentes del Design System
```
Plus Jakarta Sans  → headings, labels, CTAs, badges (Bold / SemiBold / Regular)
Roboto             → body copy, metadata (Regular)
Roboto Mono        → precios, timers, valores numéricos (Bold)
Inter              → PROHIBIDO — no existe en el DS, solo default interno de Figma
```

### Tokens de color (HEX fallbacks en cada componente TSX)
```
--voyager-color-vault        #22005C   nav, CTAs primarios
--voyager-color-vault-mid    #3B1782   gradients, hover
--voyager-color-live         #ED8936   urgencia, badges EN VIVO
--voyager-color-negotiable   #00CACE   estado negociable, CTA cyan
--voyager-text-on-dark       #FFFFFF   texto en superficies oscuras
--voyager-surface-card       #FFFFFF   fondo cards
--voyager-surface-section    #F2F4F3   fondo secciones
```

---

## 2. Arquitectura actual del Figma Push (v4)

### Flujo recomendado (bajo tokens)
```
Usuario pide push
  → (padre) pnpm figma:extract-spec -- src/features/<Comp>/<Comp>.tsx   # opcional pero recomendado
  → Padre copia el JSON + adjunta .claude/figma-push-subagent.md al subagente
  → Subagente: SOLO genera el script JS del Plugin API (no lee TSX ni figma-push-ref.md)
  → UNA llamada use_figma → Figma crea COMPONENT / COMPONENT_SET + doc + validación inline
```

### Archivos de protocolo en repo
| Archivo | Uso |
|---------|-----|
| `.claude/figma-push-subagent.md` | **Handoff al subagente:** reglas mínimas + prompt fijo para el padre |
| `.claude/figma-push-ref.md` | Referencia larga (templates, legacy v3, tablas) — humanos o depuración puntual |
| `scripts/figma/extract-figma-spec.mjs` | Extractor determinista del bloque `@figma-spec` → JSON en stdout |

### Anti-patrón (alto consumo de tokens — evitar)
```
Subagente lee el .tsx completo + figma-push-ref.md completo
  → ToolSearch / get_metadata / exploración
  → use_figma (a veces más de una vez)
```

### Reglas v4 (resumen)
- Fuente de verdad del subagente: bloque `@figma-spec` en el TSX (o JSON del extractor).
- Página destino: node id `3:4` (nombre en archivo: **Context**; no buscar con MCP).
- `get_metadata` / búsqueda de página: **no** para este flujo.
- **Una** llamada `use_figma` por componente.

### Herramienta usada: `use_figma`
```javascript
// Ejecuta JavaScript en el contexto del Figma Plugin API
// Tiene acceso a: figma.currentPage, figma.createFrame(), figma.createText(), etc.
// NO tiene acceso a: filesystem, fetch externo, módulos Node
// Las imágenes solo via: figma.createImage(Uint8Array) con bytes raw
```

---

## 3. Bugs Encontrados en Producción

### Bug Crítico #1 — Inter como fuente default
**Síntoma:** Todos los textos de QuickFilters y Sidebar en Figma usan "Inter" en lugar de Plus Jakarta Sans / Roboto.

**Causa raíz:** En el Plugin API de Figma, `figma.createText()` crea un nodo con fuente "Inter Regular" como default. Si el subagente asigna `.characters` ANTES de `.fontName`, la fuente queda como Inter aunque luego se cambie el fontName.

```javascript
// ❌ Lo que hacían los subagentes Haiku (BUG)
const t = figma.createText();
t.characters = "Ingresa";           // aplica Inter (default) al string
t.fontName = { family: "Plus Jakarta Sans", style: "Bold" };  // cambia font pero ya hay inconsistencia

// ✅ Correcto
const t = figma.createText();
t.fontName = { family: "Plus Jakarta Sans", style: "Bold" };  // font ANTES de characters
t.characters = "Ingresa";
```

**Además:** Figma lanza error si se intenta escribir characters cuando la fuente default (Inter) no está cargada. Solución: siempre hacer `await figma.loadFontAsync({ family: "Inter", style: "Regular" })` al inicio del script aunque Inter no se vaya a usar.

### Bug Crítico #2 — Frames no pixel-perfect
**Síntoma:** Los frames en Figma son aproximaciones visuales del componente, no representaciones exactas.

**Causa raíz:** Los subagentes Haiku no leen el TSX con suficiente profundidad. Cuando generan el código `use_figma`, estiman o inventan valores en lugar de extraer los valores exactos del archivo.

**Ejemplo concreto — Header:**
- TSX real: `height: 66, paddingLeft: 24, paddingRight: 24, logo width: 117px`
- Haiku generó: frame de `143×66` y otro de `343×66` (ambos incorrectos)
- Correcto: `1010×66`

### Bug Crítico #3 — Tokens con HEX hardcodeados en Figma
**Síntoma:** En el script `use_figma`, los subagentes a veces usan valores HEX aproximados en lugar de los que vienen del TSX.

**Ejemplo:**
- TSX: `background: "var(--voyager-color-vault, #22005C)"` → correcto es `{ r: 0.133, g: 0, b: 0.361 }` 
- Haiku a veces usa `{ r: 0.13, g: 0.0, b: 0.36 }` (redondeado)

**Conversión exacta HEX → Figma RGB:**
```
#22005C → r = 0x22/0xFF = 34/255 = 0.13333...  ← subagentes redondean mal
         g = 0x00/0xFF = 0/255  = 0.0
         b = 0x5C/0xFF = 92/255 = 0.36078...
```

---

## 4. El TSX Como Fuente de Verdad

Cada componente tiene TODOS los valores exactos en su TSX. Ejemplo Header:

```typescript
// src/features/Header/Header.tsx
const V = {
  vault:       "var(--voyager-color-vault,      #22005C)",  // ← HEX exacto aquí
  surfaceCard: "var(--voyager-surface-card,     #FFFFFF)",
  textOnDark:  "var(--voyager-text-on-dark,     #FFFFFF)",
  shadowLg:    "0 8px 16px rgba(0,0,0,0.10)",
} as const;

// Dimensiones exactas en el JSX:
// height: 66
// paddingLeft: 24, paddingRight: 24
// Logo: width={117}, height={64}
// UserIcon circle: width=32, height=32, borderRadius=9999
// "Ingresa": fontSize=14, fontWeight=700
```

El subagente DEBE extraer estas líneas exactas y usarlas — nunca estimar ni inventar.

---

## 5. Constraints del Plugin API de Figma

```javascript
// Lo que SÍ puede hacer use_figma:
figma.createFrame()          // crear frame
figma.createText()           // crear texto
figma.createRectangle()      // crear rectángulo
figma.createEllipse()        // crear elipse
frame.fills = [{ type: 'SOLID', color: {r,g,b}, opacity }]
frame.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[a,b,c],[d,e,f]], gradientStops: [...] }]
frame.cornerRadius = 16
frame.rotation = -14         // grados, clockwise positivo
text.fontName = { family: "...", style: "..." }
text.characters = "..."
text.fontSize = 14
figma.loadFontAsync({ family, style })   // OBLIGATORIO antes de usar la fuente

// Gradiente lineal — gradientTransform para 135°:
// [[-1, 0, 1], [1, 0, 0]]  → de arriba-derecha hacia abajo-izquierda

// Lo que NO puede hacer:
// - fetch() externo
// - leer filesystem
// - importar SVG paths (sin figma.createNodeFromSvg si está disponible)
// - acceder a localStorage o cookies
```

---

## 6. Componentes que necesitan push correcto

Todos en `src/features/<Nombre>/<Nombre>.tsx`. Dimensiones exactas del TSX:

| Componente | Dimensiones | Tokens clave |
|---|---|---|
| Header | 1010×66 | vault bg, white text, white circle |
| HeroBanner | 766×272 | gradient live→vault 135°, borderRadius 16 |
| FavoriteButton | 32×32 | variant default (outline) / pressed (vault 10% bg) |
| OfferCard | 176×232 (en-vivo) / 176×232 (negociable) | live/negotiable bottom border 4px |
| QuickFilters | 766×152 | vault bg, negotiable + live chips |
| Sidebar | 256×800 | vault bg, Plus Jakarta Sans nav items |
| Footer | 1024×280 | vault bg, columnas con Roboto body |

---

## 7. Preguntas para Gemini Deep Research

### Pregunta 1 — Arquitectura del agente
¿Cuál es la mejor arquitectura para un subagente Claude que:
- Lee un archivo TSX de ~150 líneas
- Extrae TODOS los valores exactos (px, colores HEX, fuentes, pesos, opacidades)
- Genera código JavaScript para Figma Plugin API
- Garantiza cero errores de fonts (Inter bug) y cero errores de tokens?

¿Debería ser un único agente con un prompt muy específico, o un pipeline de 2 agentes (1 extractor + 1 generador)?

### Pregunta 2 — Extracción de valores
¿Cuál es el mejor prompt para instruir a un LLM que extraiga valores exactos de un TSX de componente React?

Específicamente:
- ¿Cómo evitar que el modelo "aproxime" valores en lugar de copiarlos exactamente?
- ¿Cómo hacer que identifique correctamente el HEX fallback dentro de `"var(--token, #HEXVALUE)"`?
- ¿Cómo hace que convierta HEX → Figma RGB `{r, g, b}` con precisión de 5 decimales?

### Pregunta 3 — Font loading protocol
¿Cuál es el protocolo óptimo para manejar fuentes en Figma Plugin API para un agente automatizado?

Considerando:
- El bug de Inter default
- La necesidad de `loadFontAsync` antes de usar cualquier fuente
- La regla de `fontName` ANTES de `characters`

¿Hay mejores patterns o una abstracción que elimine el riesgo de este bug?

### Pregunta 4 — Gradientes en Figma Plugin API
¿Cómo calcular `gradientTransform` correctamente para cualquier ángulo en grados?

El caso concreto:
- HeroBanner: `linear-gradient(135deg, #ED8936 0%, #D4631A 30%, #3B1782 60%, #22005C 100%)`
- Frame: 766×272px
- ¿Cuál es la fórmula general para convertir cualquier ángulo CSS a la matriz `gradientTransform` de Figma?

### Pregunta 5 — Imágenes y SVGs
Los componentes tienen:
- SVG logos externos (`src` de `<img>`)
- Imágenes de vehículos dinámicas

¿Cuál es el mejor approach para representar estos assets en Figma cuando el agente no puede hacer fetch externo desde el Plugin API?

¿Placeholder inteligente vs. intentar importar via `figma.createNodeFromSvg()`?

### Pregunta 6 — Verificación / QA del frame generado
¿Cómo puede un agente Claude verificar que el frame Figma que acaba de crear es correcto, antes de reportar éxito?

¿Qué métricas/checks son posibles con el Plugin API para comparar contra el spec del TSX?

---

## 8. Resultado esperado del research

**Nota de implementación en repo (v4):** la etapa de extracción literal del spec puede hacerse sin LLM con `pnpm figma:extract-spec -- <ruta.tsx>`; el subagente recibe el JSON y solo genera el JS de `use_figma` (ver §2).

Un documento con:
1. **Prompt template optimizado** para el subagente extractor de valores TSX
2. **Prompt template optimizado** para el subagente generador de código Figma
3. **Función utilitaria `hexToFigmaRgb(hex)`** con precisión exacta
4. **Función utilitaria `cssAngleToGradientTransform(degrees, width, height)`**
5. **Protocolo de fonts** como función reutilizable
6. **Checklist de QA** que el agente puede ejecutar post-creación
7. **Arquitectura recomendada**: agente único vs. pipeline de agentes

---

## 9. Archivos de referencia del proyecto

```
.claude/figma-push-subagent.md         ← handoff mínimo al subagente + prompt del padre (v4)
.claude/figma-push-ref.md              ← protocolo completo / depuración
scripts/figma/extract-figma-spec.mjs    ← extractor @figma-spec → JSON (pnpm figma:extract-spec)
.claude/skills/pipeline-component-builder/SKILL.md  ← pipeline de construcción de componentes
.claude/rules/design-system.md         ← tokens y governance
.claude/rules/agents-governance.md     ← reglas del agente
src/features/Header/Header.tsx         ← ejemplo de componente con valores exactos
src/features/HeroBanner/HeroBanner.tsx ← ejemplo con gradiente y coins
src/features/FavoriteButton/FavoriteButton.tsx  ← ejemplo con variantes
```

---

## 10. Contexto adicional importante

- El Design System NO tiene tokens "hover" separados — se derivan con `color-mix(in oklch, var(--token) 85%, oklch(1 0 0))`
- Los componentes usan `var(--token, #fallback)` — el HEX fallback en el TSX es siempre el valor correcto para Figma
- El archivo Figma es `7bjDwC20BX1AFrv9Q8BOIb` (VOYAGER Design System)
- Los componentes de documentación van en la página **Context** (node `3:4`; nombre histórico "Stitch" en conversaciones antiguas)
- El objetivo del push a Figma es documentación del DS — los diseñadores leen estos frames como referencia, no los usan como producción
