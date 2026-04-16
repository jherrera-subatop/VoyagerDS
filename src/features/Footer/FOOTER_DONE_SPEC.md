# FooterDone — Spec Sheet para Desarrollo Frontend

**Componente:** `FooterDone`  
**Ruta:** `src/features/Footer/FooterDone.tsx`  
**Estado:** DONE — pixel-perfect contra Figma node 1:1017 (VMC 2026 Design System)  
**Tipo:** Server Component · Sin props · Sin estado

---

## Importación

```tsx
// Opción A — import directo
import FooterDone from "@/features/Footer/FooterDone";

// Opción B — barrel
import { FooterDone } from "@/features/Footer";
```

## Uso

```tsx
// Sin props — contenido canónico hardcodeado
<FooterDone />
```

---

## Estructura HTML

```
<footer role="contentinfo">
  ├── <style>          — pseudo-clases hover/focus con tokens de color
  │
  ├── <div>            — Top section (max-w-screen-lg · px-8 · pt-8 · pb-10)
  │   └── layout flex-col / lg:flex-row
  │       ├── BrandColumn           — logo + descripción
  │       └── grid sm:2cols lg:3cols
  │           ├── NavColumn "Plataforma"          — 6 links
  │           ├── NavColumn "Legal & Compliance"  — 4 links
  │           └── ContactoColumn
  │               ├── link "Contáctanos"
  │               ├── <nav> "Redes sociales"      — FB / IG / YT / X
  │               └── ReclamacionesBlock          — imagen + texto
  │
  └── BottomBar
      ├── Copyright (left)
      └── <nav> links legales (right) — Cookies · Sitemap · Accesibilidad
```

---

## Tokens de color usados

| Zona                  | Token DS                                      |
|-----------------------|-----------------------------------------------|
| Fondo principal       | `var(--vmc-color-background-brand)`           |
| Fondo bottom bar      | `color-mix(in oklch, …brand 85%, oklch(0 0 0))` |
| Texto links           | `var(--vmc-color-text-on-dark-muted)`  (60%) |
| Headings de columna   | `var(--vmc-color-text-inverse)` + `opacity: 0.8` |
| Copyright             | `var(--vmc-color-text-on-dark-subtle)` + `opacity: 0.75` |
| Bullet separadores    | `var(--vmc-color-text-on-dark-subtle)` + `opacity: 0.5`  |
| Texto reclamaciones   | `var(--vmc-color-text-inverse)`               |
| Focus ring            | `var(--vmc-color-border-focus)`               |

---

## Layout responsivo

| Breakpoint  | Brand       | Columnas nav              |
|-------------|-------------|---------------------------|
| mobile (420px) | full width  | 1 columna (stacked)    |
| sm (640px)  | full width  | 2 columnas                |
| lg (1024px) | `w-48` fijo | 3 columnas lado a lado    |

---

## Accesibilidad

- `<footer role="contentinfo">` — landmark semántico
- `<nav aria-label="Plataforma">` — por cada columna de navegación
- `<nav aria-label="Redes sociales">` — bloque de iconos sociales
- `<nav aria-label="Links de pie de página">` — bottom bar
- `aria-label` en todos los links de redes sociales
- `alt` descriptivo en todas las imágenes (`<Image>`)
- `aria-hidden="true"` en SVGs decorativos
- `rel="noopener noreferrer"` en todos los links externos
- Focus ring `2px solid var(--vmc-color-border-focus)` en todos los interactivos
- `prefers-reduced-motion` elimina todas las transiciones

---

## Imágenes requeridas (públicas)

| Ruta                                  | Dimensiones | Descripción            |
|---------------------------------------|-------------|------------------------|
| `/public/images/vmc-logo-white.svg`   | 120 × 32    | Logo VMC blanco        |
| `/public/images/libro-reclamaciones.png` | 86 × 35  | Ícono libro (req. legal Perú) |

---

## Contenido (hardcodeado — no modificar sin validación DS)

### Columna Plataforma
- SubasCars → `https://subascars.com`
- SubasBlog → `/blog`
- ¿Quiénes somos? → `/quienes-somos`
- ¿Cómo vender? → `/como-vender`
- ¿Cómo obtener acceso ilimitado a las subastas? → `/subaspass`
- BlackSheep Nation → `/blacksheep-nation`

### Columna Legal & Compliance
- Condiciones y Términos → `/condiciones`
- Política de Protección de Datos Personales → `/politica-proteccion-datos`
- Política de privacidad General → `/politica-privacidad`
- Testimonios → `/testimonios`

### Columna Contacto
- Contáctanos → `/contacto`
- Facebook → `https://facebook.com/vmcsubastas`
- Instagram → `https://instagram.com/vmcsubastas`
- YouTube → `https://youtube.com/vmcsubastas`
- X → `https://x.com/vmcsubastas`
- Libro de Reclamaciones → `https://www.vmcsubastas.com/libro-de-reclamaciones`

### Bottom bar
- Copyright: `© 2026 VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos reservados.`
- Política de Cookies → `/politica-cookies`
- Mapa del Sitio → `/mapa-del-sitio`
- Accesibilidad → `/accesibilidad`

---

## Reemplazar Footer legacy en producción

```tsx
// Antes
import Footer from "@/features/Footer/Footer";
<Footer />

// Después
import FooterDone from "@/features/Footer/FooterDone";
<FooterDone />
```

Sin cambios en el layout padre — es un swap directo.

---

## Checklist de QA antes de merge

- [ ] Render correcto en mobile (< 640px) — columna única
- [ ] Render correcto en tablet (640–1023px) — 2 cols nav
- [ ] Render correcto en desktop (≥ 1024px) — 4 cols (brand + 3 nav)
- [ ] Logo visible (imagen carga desde `/public/images/vmc-logo-white.svg`)
- [ ] Imagen Libro de Reclamaciones visible
- [ ] Hover en links cambia opacidad
- [ ] Focus ring visible al navegar con teclado
- [ ] Bottom bar más oscuro que el fondo principal
- [ ] Sin HEX hardcodeados en el código
