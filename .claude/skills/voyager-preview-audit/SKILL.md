# Skill: voyager-preview-audit — Auditor de Lenguaje Cinematic

## Activación
Usar cuando el usuario diga:
- `/preview-audit`
- "audita los componentes del preview"
- "revisa si todos los componentes tienen el mismo estilo"
- "auditor de lenguaje"
- "verifica cohesión visual del preview"

---

## Propósito

Auditar que **todos los componentes CSS en `BUTTON_CSS`** del archivo
`src/app/preview/components/button-primary/page.tsx`
hablen el **mismo lenguaje cinematic** de Voyager DS.

El lenguaje cinematic es el conjunto de patrones visuales que define la identidad
del preview page. Un componente que no los usa queda fuera del sistema.

---

## Los 8 Pilares del Lenguaje Cinematic

```
P1 · GRADIENT RING
    border: 1.5px solid transparent
    background-image: [opaque-fill], [shimmer-ring]
    background-origin: padding-box, border-box
    background-clip:   padding-box, border-box
    RAZÓN: firma visual de todos los componentes del DS.
    EXCEPCIÓN permitida: componentes ghost/outline donde el ring ES el borde visible.

P2 · INSET SHINE (::before)
    content: ''  position: absolute  inset: 0
    background: linear-gradient(... oklch(1 0 0 / 0.XX) 0%, transparent YY%)
    pointer-events: none  z-index: 1
    RAZÓN: profundidad óptica sin sombra, lenguaje premium.
    EXCEPCIÓN: componentes < 24px de alto (micro-badges).

P3 · SPLIT-CHROMA GLOW (::after)
    content: ''  position: absolute  inset: -Npx
    radial-gradient o linear-gradient del color de marca / opacity 0
    filter: blur(Npx)  z-index: -1
    opacity: 0 → 1 en :hover o .p[name]--hover
    RAZÓN: profundidad espacial en hover — diferencia el DS de interfaces planas.
    EXCEPCIÓN: componentes estáticos sin interacción (skeleton, disabled-only).

P4 · HOVER LIFT
    transform: translateY(-2px) [+ scale(1.02) opcional]
    box-shadow amplificado en hover
    NUNCA cambiar gradiente fill en hover — solo lift + shadow.
    EXCEPCIÓN: componentes embebidos donde el lift choca con el contenedor padre.

P5 · FOCUS PRESS
    transform: scale(0.96) o scale(0.97) con !important
    fill más oscuro (fill gradient shift)
    box-shadow reducido o inset
    RAZÓN: feedback táctil — el usuario siente que "presiona" el componente.

P6 · FROZEN STATE CLASSES
    .p[name]--hover  →  misma regla que :hover (para grid estático del preview)
    .p[name]--focus  →  misma regla que .pressed/active (para grid estático)
    .p[name]--disabled → opacidad + grayscale
    RAZÓN: el preview grid necesita mostrar cada estado sin interacción real.

P7 · OKLCH-ONLY
    Cero HEX (#XXXXXX), cero rgb(), cero hsl() en el bloque CSS del componente.
    Solo oklch() directo o var(--vmc-token).
    RAZÓN: coherencia con el pipeline de tokens Terrazzo.

P8 · Z-INDEX LAYERING
    z-index: 2   → content (icon, label, texto)
    z-index: 1   → ::before inset shine
    z-index: -1  → ::after glow (detrás del componente)
    RAZÓN: sin layering explícito el shine tapa el contenido o el glow no se ve.
```

---

## Perfiles de Componente

Cada componente tiene un perfil que indica qué pilares son OBLIGATORIOS (●) vs OPCIONALES (○) vs NO-APLICA (–).

| Componente | P1 Ring | P2 Shine | P3 Glow | P4 Lift | P5 Press | P6 Frozen | P7 OKLCH | P8 Z |
|---|---|---|---|---|---|---|---|---|
| **pvbtn** (Primary Button) | ● | ● | ● | ● | ● | ● | ● | ● |
| **pvbtn--secondary** | ○ ghost ring | ● | ● | ● | ● | ● | ● | ● |
| **pvbtn--ghost** | – borde directo | ● | ● | ● | ● | ● | ● | ● |
| **plike** (Like icon) | ● | ● | ● | ● | ● | ● | ● | ● |
| **pprice** (Price icon) | – icono display | ○ shelf-glow | – sin hover | – | – | ● disabled | ● | – |
| **ptag** (Price tag) | ● | ● | ○ | – pill sin lift | ○ | ● | ● | ● |
| **poftype** (Offer type) | ● variant ring | ● | ● | ● | ● | ● | ● | ● |
| **pcatcard** (Category card) | ● | ● | ● | ● | ● | ● | ● | ● |

---

## Protocolo de Ejecución

### Paso 1 — Leer el archivo completo
```
Read("src/app/preview/components/button-primary/page.tsx")
```
Si el archivo es muy grande: leer en segmentos usando offset/limit.
Identificar el string `BUTTON_CSS` — es el bloque auditable.

### Paso 2 — Extraer los componentes CSS
Buscar comentarios `/* ── [NombreComponente] ── */` en BUTTON_CSS.
Listar todos los componentes encontrados con sus selectores raíz (`.p[name]`).

### Paso 3 — Auditar cada componente contra su perfil

Para cada componente:
1. Determinar el perfil de la tabla de arriba.
2. Verificar cada pilar OBLIGATORIO (●).
3. Anotar: `✅ PASS` / `❌ FAIL` / `⚠️ WARN` / `– N/A`.

**Señales de FAIL por pilar:**
```
P1: No tiene `background-clip: padding-box, border-box`
    O usa `border-color` fijo en vez de `transparent`
    O el fill es transparent (rompe el clip trick)

P2: No tiene `::before` con `oklch(1 0 0 / 0.XX)` → transparent
    O tiene `::before` con otra función (tapona el contenido)

P3: No tiene `::after` con `opacity: 0`
    O no hay transición de opacity en hover

P4: Hover no tiene `transform: translateY`
    O tiene cambio de gradiente fill en hover (prohibido)

P5: No hay `.p[name]--focus` o equivalente pressed
    O no tiene `scale()` reducido

P6: Faltan .p[name]--hover y/o .p[name]--focus como clases independientes

P7: Hay `#[0-9a-f]{3,6}` o `rgb(` o `hsl(` en el bloque

P8: El content-wrapper (icon/label) no tiene z-index: 2
    O ::after glow no tiene z-index: -1
```

### Paso 4 — Reporte de salida

Formato obligatorio:

```markdown
## 🎬 Voyager Preview Audit — Lenguaje Cinematic
Archivo: src/app/preview/components/button-primary/page.tsx
Fecha: [fecha]
Componentes auditados: N

---

### Matriz de Cumplimiento

| Componente | P1 Ring | P2 Shine | P3 Glow | P4 Lift | P5 Press | P6 Frozen | P7 OKLCH | P8 Z | Score |
|---|---|---|---|---|---|---|---|---|---|
| pvbtn | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 8/8 |
| plike  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 8/8 |
| pprice | – | ✅ | – | – | – | ✅ | ✅ | – | 3/3 |
| ptag   | ✅ | ✅ | ⚠️ | – | – | ✅ | ✅ | ✅ | ... |
| poftype | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 8/8 |
| pcatcard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 8/8 |

---

### FAILs — Bloqueo de Cohesión (resolver antes de agregar nuevo componente)

❌ [Componente] P[N] — [descripción]
   Encontrado: `[cita del CSS]`
   Debe ser:   `[ejemplo correcto]`

---

### WARNs — Mejoras Recomendadas

⚠️ [Componente] P[N] — [descripción y solución]

---

### Veredicto General

🟢 COHESIÓN TOTAL     — todos los obligatorios en PASS
🟡 COHESIÓN PARCIAL   — solo WARNs, mejorable sin urgencia
🔴 RUPTURA DE ESTILO  — hay FAILs, nuevo componente rompería el sistema

---

### Próximo componente a construir

Basado en el estado actual, el siguiente componente puede construirse
[con/sin] correcciones previas. Si hay FAILs críticos → corregir primero.
```

### Paso 5 — Pregunta de cierre

Terminar siempre con:
> "¿Corrijo los FAILs/WARNs ahora antes de continuar con el próximo componente?"

---

## Reglas operativas

- **Leer el archivo COMPLETO** — no hacer assumptions sobre el estado actual
- **No modificar nada** durante la auditoría — solo reportar
- **Si se descubre un componente no en la tabla de perfiles** → crear su perfil on-the-fly
  basándose en: ¿es interactivo? ¿tiene fill o es ghost? ¿tiene sub-secciones?
- **La tabla de perfiles es viva** — actualizar SKILL.md después si se agrega un perfil nuevo
- **Un componente con 0 pilares obligatorios fallidos = cohesión** aunque tenga WARNs
- Prioridad de corrección: P7 OKLCH > P1 Ring > P3 Glow > P2 Shine > resto
