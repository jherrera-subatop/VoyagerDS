# Skill: voyager-qa — QA Review de Componentes

## Activación
Usar cuando el usuario diga:
- "revisa este componente"
- "qa del footer" / "qa de [componente]"
- "/qa [ruta]"
- "valida el código"
- "está bien este componente"

## Fuentes de verdad (en orden de prioridad)
1. **Texto pasted (MÁXIMA PRIORIDAD)** — 4 puntos que anulan el doc si hay contradicción:
   - HTML semántico obligatorio
   - Totalmente responsive
   - Tailwind v4 CSS-first
   - TypeScript Interface + Props explícitos
2. **frontend-lineamientos.md** — reglas detalladas de código
3. **agents-governance.md** — axiomas de tokens, color y accesibilidad

---

## Protocolo de ejecución

### Paso 1 — Leer el archivo
```
Read(ruta_del_componente)
```
Si el usuario no dio ruta, preguntar: "¿Qué componente reviso? Dame la ruta."

### Paso 2 — Ejecutar los 8 bloques de checks

Recorrer el código línea por línea contra cada bloque. Anotar: `✅ PASS` / `❌ FAIL línea N: [cita exacta]` / `⚠️ WARN línea N: [razón]`.

---

## BLOQUE 1 — TypeScript (CRÍTICO)

| # | Regla | Cómo detectar |
|---|---|---|
| T1 | Sin `any` — CERO excepciones | buscar `: any`, `as any`, `<any>` |
| T2 | `interface` definida para Props | buscar `interface [Nombre]Props` |
| T3 | Props explícitas en la firma | función recibe `({ prop1, prop2 }: NombreProps)` no `(props)` |
| T4 | Sin tipos implícitos en variables | `const x = []` sin tipo = FAIL |
| T5 | Retorno de función tipado | `function Foo(): JSX.Element` o `ReactNode` |
| T6 | Eventos tipados | `onClick?: () => void`, `onChange?: (e: ChangeEvent<...>) => void` |

**Override texto:** T2 + T3 son CRÍTICOS — el texto explícitamente exige Interface + Props.

---

## BLOQUE 2 — HTML Semántico (CRÍTICO por texto pasted)

| # | Regla | Cómo detectar |
|---|---|---|
| S1 | Usar `<nav>` para navegación | listas de links sin `<nav>` = FAIL |
| S2 | Usar `<footer>` para pie de página | `<div>` como contenedor principal del footer = FAIL |
| S3 | Usar `<header>` para cabeceras | `<div>` como contenedor de header = FAIL |
| S4 | Usar `<main>` para contenido principal | si aplica al componente |
| S5 | Usar `<section>`, `<article>` donde corresponda | bloques de contenido sin semántica = WARN |
| S6 | Usar `<button>` para acciones | `<div onClick>` = FAIL crítico |
| S7 | Usar `<a>` solo para navegación real | `<a>` con `onClick` sin `href` = WARN |
| S8 | `alt` en todas las imágenes | `<img>` o `<Image>` sin `alt` = FAIL |
| S9 | `aria-label` en iconos sin texto visible | botón con solo ícono sin `aria-label` = FAIL |
| S10 | `role` cuando el elemento no es semántico | `<div role="contentinfo">` cuando debería ser `<footer>` |

---

## BLOQUE 3 — Responsive (CRÍTICO por texto pasted)

| # | Regla | Cómo detectar |
|---|---|---|
| R1 | Layout responde al contenedor, no al viewport | preferir `@container` sobre `@media` en componentes DS |
| R2 | Sin anchos fijos que rompan mobile | `width: 1024px` sin `max-width` o sin responsive = FAIL |
| R3 | `overflow-x: auto` en contenedores con contenido ancho | tablas, código, etc. sin scroll = WARN |
| R4 | Imágenes con `object-fit` o responsive | `<Image>` sin `width`/`height` o sin `fill` = WARN |
| R5 | Breakpoints usados son los del DS | mobile 420px · tablet 640px · desktop 1024px |

---

## BLOQUE 4 — Tailwind v4 (CRÍTICO por texto pasted)

| # | Regla | Cómo detectar |
|---|---|---|
| TW1 | Sin `tailwind.config.js` customization en el componente | N/A — verificar que no importe config |
| TW2 | Sin utilities de Tailwind v3 obsoletas | `bg-opacity-*`, `text-opacity-*`, `ring-offset-*` = FAIL |
| TW3 | Opacidad con sintaxis v4 | `bg-vault/10` o `color-mix()` — no `bg-opacity-10` |
| TW4 | Sin clases inventadas | toda clase debe existir en el `@theme` de Voyager |
| TW5 | Condicionales con `clsx` o `tailwind-merge` | template literals con clases = FAIL |
| TW6 | Clases complejas repetidas en `styles.ts` | inline className con 8+ clases = WARN (extraer) |

---

## BLOQUE 5 — Tokens de Color (CRÍTICO — governance)

| # | Regla | Cómo detectar |
|---|---|---|
| C1 | Sin HEX hardcodeados | `#[0-9a-fA-F]{3,6}` en JSX/CSS = FAIL |
| C2 | Sin RGB/HSL hardcodeados | `rgb(`, `hsl(` en componentes = FAIL |
| C3 | Sin `oklch()` hardcodeados en UI | `oklch(` directo en style prop = FAIL (usar var) |
| C4 | Sin `#000000` o `#000` | usar `var(--vmc-color-text-primary)` |
| C5 | Estados hover/active derivados con `color-mix()` | token paralelo `--color-vault-hover` = FAIL |
| C6 | Sin `1px solid` para separar áreas | usar background shift — excepción: `ghost border` funcional |

---

## BLOQUE 6 — Control de flujo y funciones (governance)

| # | Regla | Cómo detectar |
|---|---|---|
| F1 | Sin ternarios | `condition ? a : b` en JSX o lógica = FAIL |
| F2 | Sin funciones anónimas | `onClick={() => ...}` = FAIL; debe ser `onClick={handleClick}` |
| F3 | Handlers con prefijo `handle` | `function doThing()` como handler = WARN |
| F4 | Handlers definidos fuera del return | función dentro de JSX = FAIL |
| F5 | `useEffect` con cleanup si hay suscripciones | `useEffect` sin `return () =>` cuando hay timers/listeners = FAIL |
| F6 | Lógica > 20 líneas extraída a hook | componente con >20 líneas de lógica inline = WARN |

---

## BLOQUE 7 — Accesibilidad (governance)

| # | Regla | Cómo detectar |
|---|---|---|
| A1 | Focus ring visible | componente interactivo sin `outline` o `focus-visible` = FAIL |
| A2 | `aria-live` en contenido que actualiza | countdown/precio sin `aria-live` = WARN |
| A3 | `tabular-nums` en números en tiempo real | precio/timer sin `font-variant-numeric: tabular-nums` = WARN |
| A4 | `prefers-reduced-motion` respetado | animaciones sin `@media (prefers-reduced-motion)` = WARN |
| A5 | `rel="noopener noreferrer"` en links externos | `target="_blank"` sin rel = FAIL |
| A6 | Contraste mínimo 4.5:1 | verificar manualmente — anotar tokens usados para revisión humana |

---

## BLOQUE 8 — Estructura del componente (lineamientos)

| # | Regla | Cómo detectar |
|---|---|---|
| E1 | Default export | sin `export default` = FAIL |
| E2 | Un solo archivo `.tsx` entregable | N/A si se cumple la estructura de features |
| E3 | Props en mismo archivo o importadas de `types.ts` | props definidas en otro feature = WARN |
| E4 | `index.ts` como barrel de exportación | feature sin `index.ts` = WARN |
| E5 | Error Boundary o manejo de error | componente sin estado de error manejado = WARN |
| E6 | Loading state manejado | componente async sin loading state = WARN |
| E7 | 7 estados interactivos documentados | Default·Hover·Focus·Active·Disabled·Loading·Error |

---

## Paso 3 — Reporte de salida

Formato obligatorio:

```
## QA Review — [NombreComponente]
Archivo: [ruta]
Fecha: [fecha]
Revisado contra: Frontend Lineamientos + Texto pasted (override) + Governance

### Resumen
✅ PASS: N checks
❌ FAIL: N checks  ← bloqueantes, no merge hasta resolver
⚠️  WARN: N checks ← mejoras recomendadas

### FAILs (resolver antes de merge)
❌ [Bloque] [Código] — línea N
   Encontrado: `[cita exacta del código]`
   Debe ser:   `[ejemplo correcto]`
   Regla:      [descripción]

### WARNs (recomendados)
⚠️  [Bloque] [Código] — línea N
   [descripción del problema y solución]

### ✅ Checks pasados
[lista compacta de los bloques que pasaron]

### Veredicto
🟢 LISTO PARA MERGE     — 0 FAILs
🟡 MERGE CON CONDICIÓN  — solo WARNs
🔴 BLOQUEO              — tiene FAILs
```

---

## Paso 4 — Pregunta de cierre

Siempre terminar con:
> "¿Quieres que corrija los FAILs ahora o prefieres revisarlos tú?"

---

## Notas operativas
- Si el archivo es > 200 líneas, leerlo completo igual — no recortar
- Si hay múltiples archivos en el feature, revisar todos (componente + types.ts + index.ts)
- NUNCA modificar el archivo durante la revisión — solo reportar
- El texto pasted tiene PRIORIDAD sobre lineamientos.md si hay contradicción
