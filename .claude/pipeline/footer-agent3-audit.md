# Agent 3 — Product Designer Audit — Footer

**Input:** footer-agent2-spec.md · footer-agent1-ux.md · src/features/Footer/Footer.tsx  
**Fecha:** 2026-04-16  
**Auditor:** Agente 3 — Product Designer

---

## Resultado del checklist

| # | Regla | Implementación actual | Spec Agent 2 | Veredicto |
|---|---|---|---|---|
| 1 | Sin HEX hardcodeados — todo `var(--token)` | ✓ Sin HEX en ningún lugar | ✓ Confirma | ✓ PASA |
| 2 | Sin `1px solid border` para separación — background shift | ✗ `FooterBottomBar` usa `borderTop: '1px solid var(--vmc-color-border-default)'` | ✓ Spec ordena eliminarlo y usar `color-mix(...)` | ✗ FALLA — implementación actual viola No-Line Rule |
| 3 | Sin funciones anónimas en JSX | ✗ Múltiples: `function renderNavColumn(col)`, `function renderSocialLink(social)`, `function renderNavLink(link)`, `function renderBottomLink(link)` son funciones nominales declaradas dentro de `.map()` — técnicamente tienen nombre, pero la regla del DS exige que las funciones handler/render no sean inline. Ver análisis detallado. | ✓ Spec no usa funciones anónimas | ✓ PASA (parcial — ver Issue 2) |
| 4 | Sin `any` en TypeScript | ✓ Todos los tipos están declarados | ✓ Confirma | ✓ PASA |
| 5 | Sin ternarios | ✓ Sin ternarios en la implementación actual | ✓ Confirma | ✓ PASA |
| 6 | Background correcto: `var(--vmc-color-background-brand)` (vault) | ✗ `backgroundColor: 'var(--vmc-color-background-inverse)'` — token incorrecto (neutral-1200 / negro) | ✓ Spec ordena `var(--vmc-color-background-brand)` (vault-900 / púrpura) | ✗ FALLA — error de impacto visual máximo |
| 7 | Hover links: `color-mix(in oklch, ...)` o token existente — no token paralelo | ✓ Spec usa `var(--vmc-color-text-inverse)` directamente (destino es blanco puro, token existente, no valor calculado). No se crea token paralelo. | ✓ Solución aceptable y bien justificada | ✓ PASA |
| 8 | Focus ring: `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` | ✗ No hay ningún `focus-visible` definido en la implementación actual | ✓ Spec especifica el focus ring en todos los interactivos | ✗ FALLA — WCAG 2.2 violado en producción actual |
| 9 | `prefers-reduced-motion` considerado | ✗ No hay `@media (prefers-reduced-motion: reduce)` en ningún lugar del feature | ✓ Spec incluye la media query en el CSS del feature | ✗ FALLA — accesibilidad obligatoria |
| 10 | `role="contentinfo"` en `<footer>` | ✓ `<footer role="contentinfo" ...>` presente en línea 16 | ✓ Confirma | ✓ PASA |
| 11 | `aria-label` en todos los `<nav>` | ✗ `FooterNavColumnBlock` usa `aria-label={column.heading}` — con `heading: ''`, el nav recibe `aria-label=""` (vacío). Atributo vacío es inútil y puede confundir lectores de pantalla. `FooterBottomBar` render el `<nav aria-label="Links de pie de página">` aunque `FOOTER_BOTTOM_LINKS` esté vacío. | ✓ Spec condicionará el render del nav bottom con `&&` | ✗ FALLA PARCIAL — aria-label vacío en nav de columnas |
| 12 | Social icons: `aria-hidden="true"` en SVGs, `aria-label` en `<a>` | ✓ Todos los SVGs tienen `aria-hidden="true"`, todos los `<a>` de social tienen `aria-label` | ✓ Confirma | ✓ PASA |
| 13 | YouTube SVG bug: triángulo interior usa token de fondo correcto | ✗ `<polygon fill="var(--vmc-color-background-inverse)">` — cuando el background del footer cambie a `background-brand`, el triángulo quedará del color incorrecto (negro vs púrpura) | ✓ Spec ordena cambiar a `fill="var(--vmc-color-background-brand)"` | ✗ FALLA — bug visual acoplado al Issue 6 |
| 14 | Libro de Reclamaciones: href correcto, `target="_blank"` + `rel="noopener noreferrer"` | ✓ `href="https://www.vmcsubastas.com/libro-de-reclamaciones"`, `target="_blank"`, `rel="noopener noreferrer"` | ✓ Confirma | ✓ PASA |
| 15 | Spacing múltiplos de 8px (micro-gap 4/12px permitidos) | ✓ Todos los valores de spacing presentes (32px, 16px, 24px, 64px, 48px, 8px) son múltiplos de 8px o micro-gaps permitidos | ✓ Confirma | ✓ PASA |

**Resumen:** 9 ✓ PASA · 5 ✗ FALLA (Issues 2, 6, 8, 9, 11)  
*(Issue 3 — funciones inline — se evalúa como PASA con advertencia; ver análisis)*

---

## Issues encontrados

### Issue 1 (CRÍTICO) — Background del footer usa token incorrecto
**Archivo:** `src/features/Footer/Footer.tsx` línea 18  
**Actual:** `backgroundColor: 'var(--vmc-color-background-inverse)'` → neutral-1200 (#191C1C, negro)  
**Correcto:** `backgroundColor: 'var(--vmc-color-background-brand)'` → vault-900 (#22005C, púrpura)  
**Razón:** `--vmc-color-background-inverse` es para tooltips y toasts oscuros. El footer, sidebar y header usan `--vmc-color-background-brand` (vault) según DESIGN.md §12.14 y §12.13. Este es el error de mayor impacto visual — el footer será negro en lugar del púrpura corporativo.  
**Corrección requerida:** Reemplazar `var(--vmc-color-background-inverse)` por `var(--vmc-color-background-brand)` en el estilo inline del `<footer>` root.

---

### Issue 2 (CRÍTICO) — No-Line Rule violada en FooterBottomBar
**Archivo:** `src/features/Footer/Footer.tsx` línea 191  
**Actual:** `borderTop: '1px solid var(--vmc-color-border-default)'`  
**Correcto:** Eliminar `borderTop`. Agregar `background: 'color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))'` al div del `FooterBottomBar`.  
**Razón:** La No-Line Rule del DS (design-system.md §11, agents-governance.md §1) prohíbe `1px solid borders` para separar áreas. La separación visual debe lograrse mediante background shift — oscureciendo el fondo del bottom bar ~15% respecto al footer principal.  
**Corrección requerida:** Eliminar la propiedad `borderTop` del style inline del `FooterBottomBar`. Agregar la propiedad `background` con `color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))`.

---

### Issue 3 (ALTA) — Focus ring ausente en todos los elementos interactivos
**Archivo:** `src/features/Footer/Footer.tsx` — no existe `styles.ts` ni CSS module en el feature  
**Actual:** Ningún elemento interactivo (`FooterNavLink`, `FooterSocialLink`, enlace del Libro de Reclamaciones) tiene definido `:focus-visible`.  
**Correcto:** Crear `src/features/Footer/styles.ts` (o `Footer.module.css`) con las reglas de focus-visible para `.footer-nav-link`, `.footer-social-link`, y el `<a>` del Libro de Reclamaciones.  
**Razón:** WCAG 2.2 §2.4.11 (Focus Appearance) — obligatorio. El sistema de diseño especifica: `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px`.  
**Nota importante:** Los inline styles no soportan pseudo-clases. Las reglas de hover y focus DEBEN vivir en un archivo de estilos externo. Los `className` ya están asignados (`footer-nav-link`, `footer-social-link`) — solo falta crear el archivo con las reglas CSS correspondientes.  
**Corrección requerida:** Crear `src/features/Footer/styles.ts` con las clases CSS referenciadas, o agregar un `<style>` JSX con las reglas de pseudo-clases, o crear `Footer.module.css`. Ver sección "Instrucciones para Agent 4" para la implementación exacta.

---

### Issue 4 (ALTA) — `prefers-reduced-motion` no implementado
**Archivo:** No existe archivo de estilos en el feature  
**Actual:** Las transiciones `transition: 'color var(--duration-fast) var(--ease-standard)'` están definidas como inline styles pero no hay `@media (prefers-reduced-motion: reduce)` que las deshabilite.  
**Correcto:** Agregar al archivo de estilos la media query que deshabilite transiciones en `.footer-nav-link` y `.footer-social-link`.  
**Razón:** Obligatorio por WCAG 2.1 §2.3.3 (Animation from Interactions). Usuarios con trastornos vestibulares o epilepsia fotosensible requieren que las animaciones puedan desactivarse.  
**Corrección requerida:** Incluir en el archivo de estilos:
```css
@media (prefers-reduced-motion: reduce) {
  .footer-nav-link,
  .footer-social-link {
    transition: none;
  }
}
```

---

### Issue 5 (MEDIA) — `aria-label` vacío en `FooterNavColumnBlock`
**Archivo:** `src/features/Footer/Footer.tsx` línea 146  
**Actual:** `<nav aria-label={column.heading}>` — con `heading: ''`, resulta en `<nav aria-label="">`, que es semánticamente equivalente a ausente pero puede generar ruido en lectores de pantalla.  
**Correcto:** Condicionar el atributo: si `column.heading === ''`, no renderizar el atributo `aria-label` (o usar un fallback descriptivo como `"Navegación del footer"`).  
**Razón:** Un `aria-label` vacío no cumple su propósito de orientación para usuarios de screen reader. Con dos navs sin etiqueta, los usuarios de tecnología asistiva no pueden distinguirlas.  
**Corrección requerida:** Cambiar a `aria-label={column.heading || 'Navegación del footer'}` o asignar labels distintos a cada columna. Dado que los datos actuales tienen `heading: ''`, se recomienda usar un fallback por índice: la columna 0 podría recibir `"Plataforma"` y la columna 1 `"Legal"` como fallbacks internos no visibles.  
**Alternativa mínima aceptable:** `aria-label={column.heading !== '' ? column.heading : undefined}` — esto omite el atributo cuando está vacío, que es preferible a pasarlo vacío.

---

### Issue 6 (MEDIA) — YouTube SVG: `polygon fill` usa token incorrecto
**Archivo:** `src/features/Footer/Footer.tsx` línea 280  
**Actual:** `<polygon fill="var(--vmc-color-background-inverse)" ...>`  
**Correcto:** `<polygon fill="var(--vmc-color-background-brand)" ...>`  
**Razón:** El triángulo del ícono de YouTube está diseñado para "recortar" la forma del play button usando el color del fondo del footer como relleno. Cuando el Issue 1 se corrija (background cambia de `background-inverse` a `background-brand`), este triángulo quedará negro sobre un fondo púrpura, rompiendo el ícono visualmente. Este fix es directamente dependiente del Issue 1 y debe hacerse en la misma pasada.  
**Corrección requerida:** Reemplazar `var(--vmc-color-background-inverse)` por `var(--vmc-color-background-brand)` en el atributo `fill` del `<polygon>` de YouTube.

---

### Issue 7 (BAJA) — FooterNavColumnBlock: heading vacío genera `<p>` invisible con margin
**Archivo:** `src/features/Footer/Footer.tsx` líneas 147–158  
**Actual:** El `<p>` del heading se renderiza siempre, aunque `column.heading === ''`. Esto produce un elemento vacío con `marginBottom: '16px'` que empuja el primer link hacia abajo innecesariamente.  
**Correcto:** Condicionar el render del `<p>` con `{column.heading && <p ...>{column.heading}</p>}`.  
**Razón:** Con los datos actuales (ambas columnas con `heading: ''`), se generan dos párrafos vacíos en el DOM que crean 16px de espacio muerto antes del primer link de cada columna.  
**Corrección requerida:** Envolver el bloque `<p>` del heading en `{column.heading && (...)}`.

---

### Issue 8 (BAJA) — `FooterBottomLinks` nav se renderiza aunque esté vacío
**Archivo:** `src/features/Footer/Footer.tsx` líneas 212–241  
**Actual:** El `<nav aria-label="Links de pie de página">` y su `<ul>` se renderizan siempre, incluso cuando `FOOTER_BOTTOM_LINKS = []`. El map simplemente no produce `<li>` items, pero el nav vacío queda en el DOM.  
**Correcto:** Condicionar el render con `{FOOTER_BOTTOM_LINKS.length > 0 && <nav ...>...</nav>}`.  
**Razón:** Un nav vacío en el DOM puede confundir a lectores de pantalla y es semánticamente incorrecto (nav sin links no es un nav). La spec del Agente 2 ya documenta esta corrección.  
**Corrección requerida:** Envolver el bloque completo del `<nav>` de bottom links en `{FOOTER_BOTTOM_LINKS.length > 0 && (...)}`.

---

### Nota sobre funciones nominales en `.map()`
Las funciones `renderNavColumn`, `renderSocialLink`, `renderNavLink`, `renderBottomLink` son técnicamente nominales (tienen nombre declarado). La regla prohíbe funciones **anónimas** (`() => {}`). Sin embargo, la práctica recomendada en el DS es extraer las funciones fuera del JSX para máxima legibilidad y prevenir re-creación en cada render. Esta es una **advertencia**, no un bloqueo — el código actual no viola la regla estricta de "sin funciones anónimas". Agent 4 puede mantenerlas como están o extraerlas; ambas son válidas.

---

## Instrucciones para Agent 4

Implementar los siguientes cambios **en este orden exacto**, todos en `src/features/Footer/`:

### Paso 1 — Crear `styles.ts` con pseudo-clases (BLOQUEANTE para Issues 3 y 4)

Crear el archivo `src/features/Footer/styles.ts` con el contenido CSS que soporta pseudo-clases. Dado que el proyecto usa Tailwind v4 y estilos inline, la forma correcta es inyectar una etiqueta `<style>` en el componente o crear un CSS module. Usar la aproximación de JSX style tag global en el componente raíz del Footer:

```tsx
// Al inicio del return de Footer(), antes del <footer>:
<style>{`
  .footer-nav-link:hover {
    color: var(--vmc-color-text-inverse);
  }
  .footer-nav-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
  }
  .footer-social-link:hover {
    color: var(--vmc-color-text-inverse);
  }
  .footer-social-link:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
  }
  .footer-libro-reclamaciones:focus-visible {
    outline: 2px solid var(--vmc-color-border-focus);
    outline-offset: 2px;
  }
  .footer-libro-reclamaciones:hover {
    opacity: 0.85;
  }
  @media (prefers-reduced-motion: reduce) {
    .footer-nav-link,
    .footer-social-link {
      transition: none;
    }
  }
`}</style>
```

Agregar `className="footer-libro-reclamaciones"` al `<a>` del Libro de Reclamaciones.

### Paso 2 — Corregir background del root (Issue 1 — CRÍTICO)

En `Footer()`, línea 18:
```tsx
// ANTES:
style={{ backgroundColor: 'var(--vmc-color-background-inverse)' }}

// DESPUÉS:
style={{ backgroundColor: 'var(--vmc-color-background-brand)' }}
```

### Paso 3 — Corregir YouTube polygon (Issue 6 — acoplado al Paso 2)

En `FooterSocialIcon`, línea 280:
```tsx
// ANTES:
<polygon fill="var(--vmc-color-background-inverse)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />

// DESPUÉS:
<polygon fill="var(--vmc-color-background-brand)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
```

### Paso 4 — Eliminar border-top de FooterBottomBar y aplicar background shift (Issue 2 — CRÍTICO)

En `FooterBottomBar()`, eliminar la propiedad `borderTop` y agregar `background`:
```tsx
// ANTES:
style={{
  marginTop: '32px',
  paddingTop: '16px',
  borderTop: '1px solid var(--vmc-color-border-default)',  // ELIMINAR
  ...
}}

// DESPUÉS:
style={{
  marginTop: '32px',
  paddingTop: '16px',
  background: 'color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))',
  ...
}}
```

### Paso 5 — Corregir aria-label vacío en FooterNavColumnBlock (Issue 5 — MEDIA)

En `FooterNavColumnBlock()`, línea 146:
```tsx
// ANTES:
<nav aria-label={column.heading}>

// DESPUÉS:
<nav aria-label={column.heading !== '' ? column.heading : undefined}>
```

### Paso 6 — Condicionar render del heading vacío (Issue 7 — BAJA)

En `FooterNavColumnBlock()`, envolver el bloque `<p>` del heading:
```tsx
// ANTES:
<p style={{ ... }}>{column.heading}</p>

// DESPUÉS:
{column.heading && (
  <p style={{ ... }}>{column.heading}</p>
)}
```

### Paso 7 — Condicionar render del nav de bottom links (Issue 8 — BAJA)

En `FooterBottomBar()`, envolver el `<nav>` de bottom links:
```tsx
// ANTES:
<nav aria-label="Links de pie de página">
  ...
</nav>

// DESPUÉS:
{FOOTER_BOTTOM_LINKS.length > 0 && (
  <nav aria-label="Links de pie de página">
    ...
  </nav>
)}
```

### Validación post-implementación

Después de aplicar todos los pasos, verificar:
- [ ] El footer muestra color púrpura vault, no negro
- [ ] El bottom bar es ligeramente más oscuro que el área principal (background shift visible)
- [ ] Sin `border-top` en el DOM del FooterBottomBar
- [ ] Tab por el footer con teclado muestra focus rings visibles en todos los links
- [ ] El ícono de YouTube muestra un triángulo del color del fondo (invisible sobre el rojo)
- [ ] El DOM no contiene `<nav aria-label="">` ni `<p>` vacíos con margin
- [ ] `pnpm type-check` sin errores

---

## Veredicto

**REQUIERE REVISIÓN PREVIA**

La spec del Agente 2 es correcta y completa — identifica todos los problemas y prescribe las correcciones adecuadas. El problema es la **implementación actual** (`Footer.tsx`) que tiene 5 issues activos, 2 de ellos críticos:

1. **Background incorrecto** (`background-inverse` vs `background-brand`) — el footer se renderiza negro en lugar del púrpura corporativo vault. Este es el error de mayor impacto visual.
2. **No-Line Rule violada** — `borderTop: 1px solid` en FooterBottomBar.

El Agente 4 puede proceder directamente a la implementación siguiendo los 7 pasos definidos arriba. No requiere nueva spec ni consulta adicional. Todos los tokens necesarios existen en el sistema. Los cambios son quirúrgicos y no afectan la estructura de componentes ni las constantes de contenido aprobadas por Agent 1.
