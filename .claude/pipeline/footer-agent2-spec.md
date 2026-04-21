# Agent 2 — UI Lead Spec — Footer

**Input:** footer-agent1-ux.md (APROBADO · audit 15-abr-2026)
**Tokens referenciados:** tokens-semantics-light.css líneas 1-148
**Implementación auditada:** src/features/Footer/Footer.tsx

---

## Estructura de componentes

```
Footer (root — <footer role="contentinfo">)
├── FooterInner (contenedor de ancho máximo)
│   ├── FooterTopRow (flex row, justify-content: space-between)
│   │   ├── FooterBrandColumn
│   │   │   ├── Logo (<Image>)
│   │   │   ├── BrandDescription (<p>)
│   │   │   └── FooterSocialNav (<nav aria-label="Redes sociales">)
│   │   │       └── FooterSocialLink × 4 (Facebook, YouTube, Instagram, LinkedIn)
│   │   ├── FooterNavColumnsGroup (flex row, gap 48px)
│   │   │   └── FooterNavColumnBlock × 2
│   │   │       └── FooterNavLink × N (via <Link>)
│   │   └── FooterLibroReclamaciones (hardcoded JSX — asset legal Perú)
│   └── FooterBottomBar
│       ├── FooterCopyright (<p>)
│       └── FooterBottomLinks (<nav>) — renderiza vacío (FOOTER_BOTTOM_LINKS = [])
```

---

## Tokens por zona

### Footer (root)

| Propiedad | Token | Valor resuelto |
|---|---|---|
| background | `var(--vmc-color-background-brand)` | `var(--vmc-color-vault-900)` → `#22005C` |
| width | `100%` (w-full, extiende sidebar + content) | — |
| display | block | — |

### FooterInner (contenedor de ancho máximo)

| Propiedad | Valor |
|---|---|
| max-width | `1024px` |
| margin | `0 auto` |
| padding | `32px 32px 16px` |

### FooterTopRow

| Propiedad | Valor |
|---|---|
| display | `flex` |
| flex-direction | `row` |
| gap | `64px` |
| align-items | `flex-start` |
| justify-content | `space-between` |

### FooterBrandColumn

| Propiedad | Token / Valor |
|---|---|
| max-width | `240px` |
| flex-shrink | `0` |
| Logo margin-bottom | `16px` |
| Logo width / height | `120px / 32px` |
| Logo src | `/images/vmc-logo-white.svg` |
| BrandDescription color | `var(--vmc-color-text-on-dark-muted)` → `var(--vmc-color-base-inverse-muted)` (white 60%) |
| BrandDescription font-size | `14px` |
| BrandDescription line-height | `20px` |
| BrandDescription margin-bottom | `24px` |
| SocialNav margin-top | `0` (el margin-bottom del párrafo ya separa) |

### FooterSocialNav (`<nav aria-label="Redes sociales">`)

| Propiedad | Valor |
|---|---|
| display | `flex` |
| gap | `16px` |
| list-style | `none` |
| padding / margin | `0` |

### FooterSocialLink (`<a>`)

| Estado | Propiedad | Token / Valor |
|---|---|---|
| default | width / height | `32px / 32px` |
| default | display | `flex` + align/justify center |
| default | color (icon) | `var(--vmc-color-text-on-dark-muted)` |
| default | border-radius | `var(--radius-full)` → `9999px` |
| default | transition | `color var(--duration-micro, 150ms) var(--ease-default)` |
| hover | color (icon) | `color-mix(in oklch, var(--vmc-color-text-on-dark-muted) 100%, oklch(1 0 0) 30%)` → blanco puro (`var(--vmc-color-text-inverse)`) |
| focus-visible | outline | `2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| prefers-reduced-motion | transition | `none` |

> Nota de implementación: el hover eleva de white 60% a white 100% — se logra con `var(--vmc-color-text-inverse)` directamente, sin color-mix, porque el destino es el blanco puro del sistema. No se crea token paralelo.

### FooterNavColumnsGroup

| Propiedad | Valor |
|---|---|
| display | `flex` |
| gap | `48px` |
| flex | `1` |

### FooterNavColumnBlock (`<nav>`)

**Heading (vacío en datos actuales — heading: '')**

| Propiedad | Token / Valor |
|---|---|
| color | `var(--vmc-color-text-inverse)` (white 100%) + `opacity: 0.8` |
| font-size | `12px` |
| font-weight | `600` |
| letter-spacing | `0.08em` |
| text-transform | `uppercase` |
| margin-bottom | `16px` |
| render | Solo renderiza el `<p>` si `column.heading !== ''` — con operador `&&`, nunca ternario |

> Corrección vs implementación actual: la implementación actual renderiza el `<p>` del heading aunque `heading === ''`, produciendo un bloque vacío con margin. Debe condicionar el render.

**Lista de links**

| Propiedad | Valor |
|---|---|
| list-style | `none` |
| padding / margin | `0` |
| display | `flex` |
| flex-direction | `column` |
| gap | `8px` |

### FooterNavLink (`<Link>`)

| Estado | Propiedad | Token / Valor |
|---|---|---|
| default | color | `var(--vmc-color-text-on-dark-muted)` |
| default | font-size | `14px` |
| default | line-height | `20px` |
| default | text-decoration | `none` |
| default | transition | `color var(--duration-micro, 150ms) var(--ease-default)` |
| hover | color | `var(--vmc-color-text-inverse)` (white 100%) |
| focus-visible | outline | `2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| prefers-reduced-motion | transition | `none` |

> El hover eleva white 60% → white 100% (`var(--vmc-color-text-inverse)`). No requiere color-mix porque el destino es un token existente, no un valor intermedio calculado.

### FooterLibroReclamaciones

| Propiedad | Valor |
|---|---|
| flex-shrink | `0` |
| Link target | `_blank` + `rel="noopener noreferrer"` |
| aria-label | `"Libro de Reclamaciones VMC Subastas"` |
| Image src | `/images/libro-reclamaciones.png` |
| Image width / height | `120px / 40px` |
| Image objectFit | `contain` |
| focus-visible en `<a>` | `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| hover opacity | `opacity: 0.85` — señal de interactividad sin cambiar el asset |

> Este bloque es hardcoded en JSX — requerimiento legal Perú. No requiere constante en constants.tsx. Se mantiene así.

### FooterBottomBar

**Solución al No-Line Rule:**

La implementación actual usa `borderTop: '1px solid var(--vmc-color-border-default)'`. Esto viola la No-Line Rule del DS. La separación visual se logra mediante cambio de superficie:

```css
/* CORRECTO — separación via background shift, no línea */
background: color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0));
```

Esto oscurece el fondo del bottom bar ~15% respecto al footer principal, creando un estrato visual sin usar borde.

| Propiedad | Token / Valor |
|---|---|
| background | `color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))` |
| margin-top | `32px` |
| padding | `16px 0 0 0` (el outer padding de 32px ya cubre los lados) |
| border-top | **ELIMINAR** — reemplazado por background shift |
| display | `flex` |
| flex-direction | `row` |
| justify-content | `space-between` |
| align-items | `center` |
| gap | `16px` |

### FooterCopyright (`<p>`)

| Propiedad | Token / Valor |
|---|---|
| color | `var(--vmc-color-text-on-dark-muted)` |
| font-size | `12px` |
| line-height | `16px` |
| margin | `0` |
| contenido | `FOOTER_COPYRIGHT` desde constants (hardcoded 2025 — no `new Date()`) |

### FooterBottomLinks (`<nav>`)

| Propiedad | Valor |
|---|---|
| render | Solo renderiza si `FOOTER_BOTTOM_LINKS.length > 0` (operador `&&`) |
| display | `flex` |
| gap | `16px` |
| list-style | `none` |
| padding / margin | `0` |

> `FOOTER_BOTTOM_LINKS = []` en el estado actual — el nav no se renderiza. La condición `&&` ya lo maneja sin ternario.

### FooterSocialIcon (SVGs internos)

| Propiedad | Valor |
|---|---|
| width / height | `20px / 20px` |
| fill / stroke | `currentColor` (hereda del `<a>` padre) |
| aria-hidden | `true` |
| YouTube play polygon | **Cambio requerido:** actualmente usa `fill="var(--vmc-color-background-inverse)"`. Debe usar `fill="var(--vmc-color-background-brand)"` para que el triángulo interior adopte el color de fondo correcto del footer (ver "Cambios vs implementación actual"). |

---

## Estados interactivos

### Links de navegación (FooterNavLink)

| Estado | Especificación |
|---|---|
| default | `color: var(--vmc-color-text-on-dark-muted)` |
| hover | `color: var(--vmc-color-text-inverse)` |
| focus-visible | `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| active | `color: var(--vmc-color-text-inverse)` (mismo que hover — el link ya ejecutó la navegación) |
| prefers-reduced-motion | `transition: none` |

**Clase CSS para reutilización en stylesheet del feature:**
```css
.footer-nav-link:hover {
  color: var(--vmc-color-text-inverse);
}
.footer-nav-link:focus-visible {
  outline: 2px solid var(--vmc-color-border-focus);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .footer-nav-link {
    transition: none;
  }
}
```

### Social icons (FooterSocialLink)

| Estado | Especificación |
|---|---|
| default | `color: var(--vmc-color-text-on-dark-muted)` |
| hover | `color: var(--vmc-color-text-inverse)` |
| focus-visible | `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| active | `color: var(--vmc-color-text-inverse)` |
| prefers-reduced-motion | `transition: none` |

**Clase CSS para reutilización:**
```css
.footer-social-link:hover {
  color: var(--vmc-color-text-inverse);
}
.footer-social-link:focus-visible {
  outline: 2px solid var(--vmc-color-border-focus);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .footer-social-link {
    transition: none;
  }
}
```

### Libro de Reclamaciones link

| Estado | Especificación |
|---|---|
| default | `opacity: 1` |
| hover | `opacity: 0.85` |
| focus-visible | `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` |
| prefers-reduced-motion | `transition: none` |

---

## Cambios vs implementación actual

| # | Elemento | Cambio | Razón |
|---|---|---|---|
| 1 | `Footer` root `backgroundColor` | `var(--vmc-color-background-inverse)` → `var(--vmc-color-background-brand)` | El token correcto para sidebar/header/footer según DESIGN.md es `--vmc-color-background-brand`. `background-inverse` es para tooltips y toasts oscuros, no para la superficie vault principal. |
| 2 | `FooterBottomBar` `borderTop` | Eliminar `1px solid var(--vmc-color-border-default)` | Viola No-Line Rule. Reemplazar por `background: color-mix(in oklch, var(--vmc-color-background-brand) 85%, oklch(0 0 0))` en el elemento bottom bar. |
| 3 | `FooterNavColumnBlock` heading render | Renderizar `<p>` incondicionalmente → condicionar con `&&` si `column.heading !== ''` | Con los datos actuales (`heading: ''`) se genera un `<p>` vacío con `marginBottom: 16px` que crea espacio muerto en la columna. |
| 4 | `FooterSocialLink` hover | Sin estado hover definido actualmente | Agregar `.footer-social-link:hover { color: var(--vmc-color-text-inverse) }` — el className ya existe, solo falta la regla en styles. |
| 5 | `FooterSocialLink` focus | Sin `focus-visible` definido actualmente | Agregar `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px` — WCAG 2.2 obligatorio. |
| 6 | `FooterNavLink` hover | Sin estado hover definido actualmente | Agregar `.footer-nav-link:hover { color: var(--vmc-color-text-inverse) }` — el className ya existe. |
| 7 | `FooterNavLink` focus | Sin `focus-visible` definido actualmente | Agregar `outline: 2px solid var(--vmc-color-border-focus); outline-offset: 2px`. |
| 8 | `FooterLibroReclamaciones` hover | Sin estado hover | Agregar `opacity: 0.85` en hover — señal visual de interactividad en el asset legal. |
| 9 | `FooterLibroReclamaciones` focus | Sin `focus-visible` | Agregar outline spec estándar. |
| 10 | YouTube SVG `polygon fill` | `var(--vmc-color-background-inverse)` → `var(--vmc-color-background-brand)` | El triángulo interior del ícono de YouTube usa el color de fondo para "recortar" la forma. Si el fondo del footer cambia a `background-brand`, el triángulo debe usar ese mismo token para permanecer invisible (efecto correcto del ícono). |
| 11 | `prefers-reduced-motion` | No implementado actualmente | Agregar `@media (prefers-reduced-motion: reduce)` en el CSS del feature para deshabilitar las `transition` en `.footer-nav-link` y `.footer-social-link`. |

---

## Tokens necesarios no disponibles actualmente

Todos los tokens requeridos para este componente **están disponibles** en `tokens-semantics-light.css`. No se requieren tokens nuevos.

Resumen de tokens utilizados:

| Token | Línea en tokens-semantics-light.css | Uso |
|---|---|---|
| `--vmc-color-background-brand` | L7 | Fondo del footer (root) |
| `--vmc-color-text-on-dark-muted` | L131 | Texto body, links default, social icons default |
| `--vmc-color-text-inverse` | L125 | Texto headings, links hover, social icons hover |
| `--vmc-color-text-on-dark-subtle` | L133 | Disponible para texto terciario si se necesita en el futuro |
| `--vmc-color-border-focus` | L69 | Focus ring en todos los interactivos |

**Token de background-brand vs background-inverse — aclaración:**

- `--vmc-color-background-brand` → `vault-900` (#22005C) — para sidebar, header, footer, CTAs primarios. **Este es el correcto para Footer.**
- `--vmc-color-background-inverse` → `neutral-1200` (#191C1C) — para tooltips, toasts oscuros. **Incorrecto para Footer.**

La implementación actual usa `background-inverse` en el root del footer. Este es el cambio de mayor impacto visual — el footer debe ser el púrpura vault (#22005C), no el negro neutro (#191C1C).

---

## Notas para el Agente 3 (implementación)

1. Los estilos de hover y focus para `.footer-nav-link` y `.footer-social-link` deben vivir en `src/features/Footer/styles.ts` o en un CSS module/global — no como inline styles (los inline styles no soportan pseudo-clases).

2. El bottom bar con `background: color-mix(...)` puede aplicarse como `style` inline o como clase en el CSS del feature. Dado que usa `var()` dinámico, cualquier approach es válido.

3. La corrección del token de background en el root (`background-brand` en lugar de `background-inverse`) es el cambio más visible y debe priorizarse.

4. La lógica de render condicional del heading ya está en el código como `{column.heading}` — solo necesita envolver el `<p>` entero en `{column.heading && <p>...</p>}`.

5. No crear nuevos componentes — todos los sub-componentes listados en la estructura ya existen en `Footer.tsx`. Las correcciones son quirúrgicas.
