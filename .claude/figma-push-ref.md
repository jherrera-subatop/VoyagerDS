# Figma Push — Protocolo Completo v4.0
**Basado en Gemini Deep Research · 2026-04-30 · Optimizado token-efficiency**

**Subagentes / handoff bajo tokens:** usar [figma-push-subagent.md](./figma-push-subagent.md) (reglas mínimas + prompt del padre). Extraer spec con `pnpm figma:extract-spec -- <ruta.tsx>`; no adjuntar este archivo completo al subagente salvo depuración.

## Destino
- **Archivo Figma:** `7bjDwC20BX1AFrv9Q8BOIb`
- **Page:** Context (node `3:4`) ← nombre real, NO "Stitch"
- **Tipo de nodo:** SIEMPRE `figma.createComponent()` — nunca `createFrame()`
- **Variantes:** `figma.combineAsVariants([comp1, comp2], figma.currentPage)` → COMPONENT_SET

---

## ⚡ Reglas de eficiencia — OBLIGATORIAS

```
1. UNA sola llamada use_figma por componente — crea + posiciona + doc frame + valida
2. NUNCA llamar get_metadata para buscar páginas — Context = "3:4" hardcodeado
3. NUNCA llamar use_figma extra para inspeccionar/corregir posiciones
4. combineAsVariants NO auto-posiciona → bake el grid en el script de creación
5. NUNCA tomar screenshot salvo que el usuario lo pida explícitamente
6. Validación inline al final del script — retorna { ok, errs } mínimo
7. Variables JS de una letra donde sea claro (rgb→h, solid→sol, etc.)
```

## Estructura del script único (template obligatorio)

```javascript
// 1. PAGE — hardcodeado, sin búsqueda
const pg = figma.root.children.find(p => p.id === '3:4');
await figma.setCurrentPageAsync(pg);

// 2. FONTS
await Promise.all([...]);

// 3. HELPERS (compactos, una línea c/u)
const rgb = h => { h=h.replace('#',''); return {r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}; };
const sol = h => [{type:'SOLID',color:rgb(h)}];
function mkTxt(chars,family,style,size,hex,opts={}) { ... }

// 4. TOKENS (objeto T compacto)
const T = { ... };

// 5. CREAR VARIANTES (función makeCard/makeComp)
function makeCard(variant, state) { ... }

// 6. COMBINAR + POSICIONAR GRID (todo junto, sin llamada extra)
const combos = [...];
const comps = combos.map(([v,s]) => makeCard(v,s));
const set = figma.combineAsVariants(comps, figma.currentPage);
set.name = 'ComponentName';
// Grid manual — SIEMPRE inline aquí
const GAP = 20;
set.children.forEach((child, i) => {
  child.x = (i % COLS) * (CW + GAP) + PAD;
  child.y = Math.floor(i / COLS) * (CH + GAP) + PAD;
});
set.resizeWithoutConstraints(COLS*(CW+GAP)-GAP+PAD*2, ROWS*(CH+GAP)-GAP+PAD*2);
set.x = 180; set.y = 200;

// 7. DOC FRAME + LABELS (mismo script)
// header: título + versión + badge Stable
// column headers encima de cada variante
// row labels rotados a la izquierda

// 8. VALIDACIÓN inline
const errs = [];
if (set.type !== 'COMPONENT_SET') errs.push('TYPE');
if (set.children.length !== N) errs.push(`VARIANTS ${set.children.length}≠${N}`);
return { ok: !errs.length, variants: set.children.length, errs };
```

---

## Componentes disponibles

| Componente     | Path                                           | @figma-spec | Subcomps              | Status  |
|----------------|------------------------------------------------|-------------|-----------------------|---------|
| Header         | src/features/Header/Header.tsx                 | ✅ done     | —                     | stitch  |
| HeroBanner     | src/features/HeroBanner/HeroBanner.tsx         | pendiente   | —                     | stitch  |
| FavoriteButton | src/features/FavoriteButton/FavoriteButton.tsx | pendiente   | —                     | stitch  |
| OfferCard      | src/features/OfferCard/OfferCard.tsx           | ✅ done     | FavoriteButton(inline)| stitch  |
| QuickFilters   | src/features/QuickFilters/QuickFilters.tsx     | pendiente   | OfferCard(inline)     | stitch  |
| Sidebar        | src/features/Sidebar/Sidebar.tsx               | pendiente   | —                     | stitch  |
| Footer         | src/features/Footer/Footer.tsx                 | pendiente   | —                     | stitch  |

---

## Formato @figma-spec (fuente de verdad del subagente)

Bloque de comentario estructurado al inicio de cada TSX.
El agente extractor lee SOLO este bloque — no el resto del archivo.

### Spec completa (todas las secciones)

```
/**
 * @figma-spec
 * @component    NombreComponente | WxH | Page:Stitch
 *
 * @tokens
 *   bg   : --voyager-color-vault        : #22005C
 *   txt  : --voyager-text-on-dark       : #FFFFFF
 *   live : --voyager-color-live         : #ED8936
 *   neg  : --voyager-color-negotiable   : #00CACE
 *   mid  : --voyager-color-vault-mid    : #3B1782
 *   card : --voyager-surface-card       : #FFFFFF
 *   sec  : --voyager-surface-section    : #F2F4F3
 *
 * @typography
 *   [id] : [Familia] | [Estilo] | [tamaño]px | lh:[n]px | "[contenido o descripción]"
 *
 * @layers
 *   [nombre] : [Tipo]    : [W]x[H] : x:[n], y:[n] : fill:[hex o token-key]
 *   [nombre] : INSTANCE  : [W]x[H] : x:[n], y:[n] : ref:[SubComponentName]
 *
 * @subcomponents
 *   [NombreSubComp] : [ruta relativa o "inline"]
 *     @tokens   bg:[hex] | border:[hex]
 *     @layers   [nombre]:[Tipo]:[W]x[H]:x:[n],y:[n]:fill:[hex]
 *
 * @variants
 *   prop: [PropName]
 *     [x] [Value]   : [descripción breve — qué cambia visualmente]
 *     [ ] [Value]   : (futuro)
 *   prop: [PropName2]
 *     [x] [Value]   : [descripción]
 *     [ ] [Value]   : (futuro)
 *
 * @states
 *   [x] default    : [descripción visual]
 *   [x] hover      : [qué cambia — ej: bg color-mix(vault 85%, white)]
 *   [x] focus      : [ej: outline 2px vault-mid, offset 2px]
 *   [x] active     : [ej: scale(0.97) o oklch(l-0.08)]
 *   [ ] disabled   : (futuro — opacity 72% + grayscale)
 *   [ ] loading    : (futuro — pulse animation)
 *   [ ] error      : (futuro — bg status-error)
 */
```

### Reglas de cada sección

**@layers — tipo INSTANCE:**
Cuando una capa es un sub-componente (otro componente Figma importado), usar `INSTANCE` como tipo y `ref:NombreComponente` para identificarlo. El generador usará `figma.createComponent()` para ese sub-componente y lo instanciará.

**@subcomponents:**
Solo presente si el componente contiene otros componentes React/Figma propios del DS (no primitivos HTML). Cada entrada describe la anatomía del sub-componente tal como se renderiza dentro del padre. La clave `"inline"` indica que está definido en el mismo archivo TSX.

**@variants — multi-prop:**
Cada `prop:` es una Figma Component Property. El generador crea una variante por combinación de `[x]` marcados. Si solo hay un prop, el COMPONENT_SET tiene una dimensión. Si hay dos props, tiene dos dimensiones. El nombre de cada variante en Figma será `"Prop1=Value1, Prop2=Value2"`.

**@states — máquina de 7 estados:**
Los 7 estados del DS son obligatorios en componentes interactivos. Los `[x]` implementados deben describir exactamente qué cambia (color, transform, outline). Los `[ ]` marcan estados planificados pero no implementados en TSX aún — el generador los omite del push pero los registra como comentario en el COMPONENT_SET.

**Tipos de capa válidos:** Frame · Rect · Ellipse · Text · Group · INSTANCE · SVG · Image

---

## ⚠️ Limitaciones conocidas del Plugin API

```
figma.createVector() + vectorPaths  →  FALLA con paths SVG complejos.
                                        ✅ USAR: figma.createNodeFromSvg(svgStr)
                                        Ejemplo:
                                          const node = figma.createNodeFromSvg(
                                            `<svg viewBox="0 0 24 24" xmlns="...">
                                               <path fill="${hex}" d="${pathData}"/>
                                             </svg>`
                                          );
                                          node.resize(W, H);
                                          node.x = offsetX; node.y = offsetY;

figma.combineAsVariants()           →  NO auto-posiciona. Todas las variantes quedan en (0,0).
                                        SIEMPRE bake el grid manual en el mismo script.

ComponentNode.cornerRadius          →  Funciona (hereda de FrameNode). ✓

COMPONENT_SET dentro de otro frame  →  Posible pero evitar — mantener como hijo directo de page.
```

---

## Pipeline (ahora 1 etapa — script único)

> Las 3 etapas anteriores (extractor → generador → validador separados) se colapsan
> en UN solo `use_figma`. El agente lee el `@figma-spec`, escribe el script completo
> con todo incluido (grid + doc frame + validación) y ejecuta una vez.

### Flujo optimizado

```
@figma-spec del TSX
  → agente escribe script completo (sin llamadas exploratorias)
  → use_figma x1
  → return { ok, variants, errs }
  → screenshot SOLO si usuario pide "muéstrame"
```

---

## Pipeline v3 (legacy — solo referencia)

### Etapa 1 — Extractor (Haiku, mecánico, barato)
**Input:** solo el bloque `@figma-spec` del TSX  
**Output:** JSON compacto ≤ 400 tokens

```json
{
  "component": "Header",
  "w": 1010, "h": 66,
  "page": "Stitch",
  "tokens": { "bg": "#22005C", "txt": "#FFFFFF", "card": "#FFFFFF", "shad": "0 8px 16px rgba(0,0,0,0.10)" },
  "typography": [
    { "id": "ingresa", "family": "Plus Jakarta Sans", "style": "Bold", "size": 14, "lineHeight": 24, "chars": "Ingresa" }
  ],
  "layers": [
    { "name": "root",        "type": "COMPONENT", "w": 1010, "h": 66,  "x": 0,   "y": 0,  "fill": "#22005C" },
    { "name": "logo",        "type": "Rect",       "w": 117,  "h": 64,  "x": 24,  "y": 1,  "fill": "#FFFFFF" },
    { "name": "user-circle", "type": "Ellipse",    "w": 32,   "h": 32,  "x": 954, "y": 17, "fill": "#FFFFFF", "shadow": "0 8px 16px rgba(0,0,0,0.10)" },
    { "name": "user-icon",   "type": "Rect",       "w": 24,   "h": 24,  "x": 962, "y": 21, "fill": "#22005C" },
    { "name": "ingresa",     "type": "Text",        "x": 994,  "y": 21, "typography": "ingresa" }
  ],
  "subcomponents": [],
  "variants": {
    "props": [
      {
        "name": "variant",
        "values": [
          { "value": "guest",         "implemented": true,  "notes": "logo + círculo blanco + Ingresa" },
          { "value": "authenticated", "implemented": false, "notes": "futuro — avatar + nombre usuario" }
        ]
      }
    ],
    "combinations": [["variant=guest"]]
  },
  "states": [
    { "name": "default",  "implemented": true,  "notes": "bg vault, logo y CTA visibles" },
    { "name": "hover",    "implemented": false, "notes": "futuro — CTA hover color-mix" },
    { "name": "focus",    "implemented": false, "notes": "futuro — focus ring en CTA" },
    { "name": "active",   "implemented": false, "notes": "futuro" },
    { "name": "disabled", "implemented": false, "notes": "n/a" },
    { "name": "loading",  "implemented": false, "notes": "n/a" },
    { "name": "error",    "implemented": false, "notes": "n/a" }
  ]
}
```

### Etapa 2 — Generador (Sonnet 3.7, extended thinking)
**Input:** JSON de la Etapa 1 + system prompt con reglas Figma  
**Output:** código JavaScript para `use_figma`

**System prompt del generador (invariable):**
```
Eres un generador de código Figma Plugin API. 
Tu input es un JSON de especificación. Tu output es SOLO código JS ejecutable, sin explicaciones.

REGLAS ABSOLUTAS:
1. Usar figma.createComponent() — nunca createFrame()
2. loadFontAsync ANTES de cualquier texto — incluir Inter siempre
3. t.fontName = {...} SIEMPRE antes de t.characters = "..."
4. RGB: parseInt(hex.slice(n,n+2), 16) / 255 — nunca redondear
5. setCurrentPageAsync(stitchPage) al inicio — siempre
6. Variantes: figma.combineAsVariants([comp1, comp2], stitchPage)
7. Nombres de variantes: "PropName=Value, PropName2=Value2" (multi-prop con coma)
8. Si spec.subcomponents.length > 0 → crear cada sub-componente con createComponent() ANTES del padre, luego instanciar con mainComp.createInstance() en la posición spec.layers[i]
9. Solo crear variantes para combinations con implemented:true — las futuras se omiten del push
10. QA al final — los 5 checks obligatorios
```

### Etapa 3 — Validador (determinista, sin LLM)
5 checks sobre el nodo recién creado:

```javascript
function validate(node, spec) {
  const errors = [];

  // 1. Tipo de nodo correcto
  if (node.type !== 'COMPONENT' && node.type !== 'COMPONENT_SET')
    errors.push(`TIPO: ${node.type} ≠ COMPONENT`);

  // 2. Dimensiones exactas
  if (Math.round(node.width)  !== spec.w) errors.push(`W: ${Math.round(node.width)} ≠ ${spec.w}`);
  if (Math.round(node.height) !== spec.h) errors.push(`H: ${Math.round(node.height)} ≠ ${spec.h}`);

  // 3. Color sampling — verifica fill del root
  if (node.fills && node.fills[0] && spec.tokens.bg) {
    const f = node.fills[0].color;
    const expected = hexToFigmaRgb(spec.tokens.bg);
    const drift = Math.abs(f.r - expected.r) + Math.abs(f.g - expected.g) + Math.abs(f.b - expected.b);
    if (drift > 0.001) errors.push(`COLOR DRIFT: ${drift.toFixed(4)}`);
  }

  // 4. Fuentes faltantes — ningún nodo texto con hasMissingFont
  function checkFonts(n) {
    if (n.type === 'TEXT') {
      if (n.hasMissingFont) errors.push(`MISSING FONT en "${n.characters}"`);
      if (n.fontName && n.fontName.family === 'Inter') errors.push(`INTER en "${n.characters}"`);
    }
    if ('children' in n) n.children.forEach(checkFonts);
  }
  checkFonts(node);

  // 5. Árbol de capas — número de hijos directos
  const expectedLayers = spec.layers.filter(l => l.type !== 'COMPONENT').length;
  if ('children' in node && node.children.length !== expectedLayers)
    errors.push(`CAPAS: ${node.children.length} ≠ ${expectedLayers}`);

  return errors;
}
```

---

## Utilidades exactas (incluir en cada script use_figma)

```javascript
// RGB sin redondeo
function hexToFigmaRgb(hex) {
  const h = hex.replace('#','');
  return {
    r: parseInt(h.slice(0,2),16)/255,
    g: parseInt(h.slice(2,4),16)/255,
    b: parseInt(h.slice(4,6),16)/255,
  };
}

// Gradiente 135° (HeroBanner)
const gradientTransform135 = [[-1,0,1],[1,0,0]];

// Helper texto — fontName SIEMPRE antes de characters
function makeTxt(parent, chars, family, style, size, hex, opts={}) {
  const t = figma.createText();
  t.fontName = { family, style };  // ← PRIMERO
  t.characters = chars;             // ← SEGUNDO
  t.fontSize = size;
  if (hex) t.fills = [{ type:'SOLID', color: hexToFigmaRgb(hex) }];
  if (opts.x !== undefined) t.x = opts.x;
  if (opts.y !== undefined) t.y = opts.y;
  if (opts.w) t.resize(opts.w, t.height);
  if (opts.upper) t.textCase = 'UPPER';
  if (parent) parent.appendChild(t);
  return t;
}
```

---

## Protocolo de fuentes (inicio de CADA script)

```javascript
// SIEMPRE al inicio — antes de cualquier createText()
await figma.setCurrentPageAsync(figma.root.children.find(p => p.id === '3:4'));
await Promise.all([
  figma.loadFontAsync({ family: "Inter",             style: "Regular"  }), // OBLIGATORIO
  figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular"  }),
  figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium"   }),
  figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" }),
  figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold"     }),
  figma.loadFontAsync({ family: "Roboto",            style: "Regular"  }),
  figma.loadFontAsync({ family: "Roboto",            style: "Bold"     }),
  figma.loadFontAsync({ family: "Roboto Mono",       style: "Regular"  }),
  figma.loadFontAsync({ family: "Roboto Mono",       style: "Bold"     }),
]);
```

---

## Tokens de color — referencia rápida

```
Token                          HEX       Figma RGB exacto
--voyager-color-vault          #22005C   r:0.13333 g:0.00000 b:0.36078
--voyager-color-vault-mid      #3B1782   r:0.23137 g:0.09020 b:0.50980
--voyager-color-live           #ED8936   r:0.92941 g:0.53725 b:0.21176
--voyager-color-negotiable     #00CACE   r:0.00000 g:0.79216 b:0.80784
--voyager-text-on-dark         #FFFFFF   r:1.00000 g:1.00000 b:1.00000
--voyager-surface-card         #FFFFFF   r:1.00000 g:1.00000 b:1.00000
--voyager-surface-section      #F2F4F3   r:0.94902 g:0.95686 b:0.95294
--voyager-text-primary         #191C1C   r:0.09804 g:0.10980 b:0.10980
```

---

## Cómo pedir el push

> "push Header"  
> "push OfferCard, variantes: en-vivo y negociable"  
> "push HeroBanner"

El agente lee el `@figma-spec` del TSX correspondiente → extrae → genera → valida → screenshot de confirmación.

---

## Reglas anti-error (inmutables)

1. NUNCA `figma.createFrame()` para el nodo raíz — siempre `createComponent()`
2. NUNCA `t.characters` antes de `t.fontName`
3. NUNCA redondear RGB — usar `parseInt(hex,16)/255` directo
4. NUNCA estimar dimensiones — leer del `@figma-spec`
5. NUNCA omitir `setCurrentPageAsync(stitchPage)` al inicio
6. SIEMPRE ejecutar los 5 checks del validador antes de reportar éxito
