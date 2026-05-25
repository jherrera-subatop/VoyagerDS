# VOYAGER — Landing Page Sections
**VMC Subastas · Biblioteca de Secciones para Landing Pages**
**Version 1.0 · Companion de design-system.md**

Este documento define los bloques de contenido que componen las landing pages de VMC Subastas.
Sin header, sin footer, sin sidebar — solo el cuerpo interior.
Todo token referencia `.claude/rules/design-system.md` como fuente de verdad.

---

## AXIOMAS PARA LANDING PAGES

```xml
<axioms>
- NUNCA incluyas Header, Footer o Sidebar en estos componentes — son independientes
- TODO section tiene ancho máximo 1024px centrado (--layout-max-width)
- TODA sección alterna background: page → section → page → section (separación sin bordes)
- El gradient-vault se reserva para secciones de alto impacto: Hero, Stats, CTA Band
- NUNCA uses más de 2 secciones de gradient-vault consecutivas
- Headings de sección: siempre uppercase + var(--type-h2) o superior
- Toda sección define padding vertical mínimo var(--spacing-section-y) = 32px
- En mobile: grid de 3 cols → 1 col, grid de 4 cols → 2 cols
</axioms>
```

---

## INVENTARIO DE SECCIONES

| ID | Nombre | Background | Props | Status |
|---|---|---|---|---|
| `ls-hero` | HeroSection | gradient-vault | headline, subtitle, ctaPrimary, ctaGhost, stats[] | pending |
| `ls-live-strip` | LiveAuctionsStrip | color-live (naranja) | auctions[] | pending |
| `ls-featured-grid` | FeaturedVehiclesGrid | surface-page | vehicles[], columns? | pending |
| `ls-category-bands` | CategoryBands | surface-section | categories[] | pending |
| `ls-stats` | StatsSection | gradient-vault | stats[] | pending |
| `ls-how-it-works` | HowItWorks | surface-page | steps[] | pending |
| `ls-cta-band` | CTABand | gradient-vault | headline, cta, sublink? | pending |
| `ls-auctioneer-spotlight` | AuctioneerSpotlight | surface-section | auctioneer, vehicles[] | pending |
| `ls-testimonials` | Testimonials | surface-page | testimonials[] | pending |

---

## SECCIONES — ESPECIFICACIONES

---

### `ls-hero` — HeroSection

```xml
<section id="ls-hero">
  <background>var(--gradient-vault)</background>
  <padding>64px 24px (desktop) · 40px 20px (mobile)</padding>
  <max-width>1024px centrado</max-width>

  <layout>
    Centro-aligned en desktop. Stack vertical en mobile.
    Opción A: full-width texto centrado
    Opción B: 60/40 texto izquierda + imagen vehículo derecha
  </layout>

  <eyebrow>
    Texto: "PLATAFORMA LÍDER DE SUBASTAS"
    Style: var(--type-badge) · uppercase · var(--color-live) · tracking 1.5px
  </eyebrow>

  <headline>
    Texto: "SUBASTAS DE VEHÍCULOS DE ALTO VALOR"
    Style: var(--type-display) = 56px/800 · var(--color-text-on-dark) · uppercase
    Mobile: var(--type-h1) = 30px
  </headline>

  <subtitle>
    Style: var(--type-body) = 16px/400 · var(--color-text-on-dark-muted) = white 60%
    max-width: 520px
  </subtitle>

  <cta-group>
    gap: 16px · flex-row en desktop · flex-col en mobile
    ctaPrimary: ButtonPrimary (gradient-vault sobre vault = usar white bg + vault text como variante Hero)
      O: bg white · text var(--color-vault) · uppercase · radius-sm
    ctaGhost: ButtonSecondary · border 1px white 40% · text white · uppercase
  </cta-group>

  <stats-row>
    margin-top: 48px
    layout: 3 columnas · separadas por divider var(--color-text-on-dark-subtle) = white 30%
    cada stat:
      number: var(--type-h1) = 30px/800 · var(--color-text-on-dark) · Roboto Mono · tabular-nums
      label:  var(--type-badge) · uppercase · var(--color-text-on-dark-muted)
    ejemplos: "247 VEHÍCULOS" | "S/. 12M+" | "1,840 COMPRADORES"
  </stats-row>
</section>
```

**Props TypeScript:**
```typescript
interface HeroSectionProps {
  eyebrow?: string
  headline: string
  subtitle?: string
  ctaPrimary: { label: string; href: string }
  ctaGhost?: { label: string; href: string }
  stats?: Array<{ value: string; label: string }>
  variant?: 'centered' | 'split'
}
```

---

### `ls-live-strip` — LiveAuctionsStrip

```xml
<section id="ls-live-strip">
  <background>var(--color-live) = oklch(0.72 0.16 55) — naranja urgencia</background>
  <padding>16px 24px</padding>
  <height>~80px desktop · auto mobile</height>
  <overflow>scroll horizontal en mobile</overflow>

  <header-col>
    width: ~180px · flex-shrink: 0
    badge: "EN VIVO" · BadgeStatus variant=live (punto animado)
    count: "X subastas activas" · var(--type-label) · var(--color-vault)
  </header-col>

  <divider>
    1px vertical · var(--color-vault) 20% opacity
  </divider>

  <auctions-list>
    flex-row · gap: 0 · cada item separado por divider vertical
    CADA AUCTION-ITEM:
      layout: horizontal compact · padding: 0 24px
      vehicle-name: var(--type-label) = 12px/600 · var(--color-vault) · uppercase · truncated
      lot: var(--type-micro) = 8px/600 · var(--color-vault) 60%
      countdown: Roboto Mono · var(--type-label) · var(--color-vault) · tabular-nums
      bid: "OFERTA ACTUAL" label micro + monto var(--type-h4) = 14px/700 · var(--color-vault)
  </auctions-list>

  <cta-col>
    flex-shrink: 0
    link: "VER TODAS →" · var(--type-label) · var(--color-vault) · uppercase
  </cta-col>
</section>
```

**Notas:**
- Si no hay subastas live → sección oculta (display: none). No mostrar strip vacío.
- Animación: punto parpadeante cada 1.5s. Respetar prefers-reduced-motion.

**Props TypeScript:**
```typescript
interface LiveAuctionsStripProps {
  auctions: Array<{
    id: string
    vehicleName: string
    lotNumber: string
    currentBid: string
    countdown: string // "HH:MM:SS" pre-formateado
  }>
  viewAllHref: string
}
```

---

### `ls-featured-grid` — FeaturedVehiclesGrid

```xml
<section id="ls-featured-grid">
  <background>var(--color-surface-page) = oklch(0.98 0.004 160)</background>
  <padding>var(--spacing-section-y) var(--spacing-section-x) = 32px 24px</padding>

  <section-header>
    layout: flex · justify: space-between · align: center
    title: var(--type-h2) = 20px/800 · uppercase · var(--color-text-on-surface)
    link: "VER TODOS →" · var(--type-label) · var(--color-vault) · uppercase
  </section-header>

  <grid>
    desktop: 3 columnas · gap: var(--spacing-grid-gap) = 16px
    tablet:  2 columnas
    mobile:  1 columna
    usar: AuctionCardStandard o AuctionCardFeatured (ver design-system.md §12.5/12.6)
    primera card puede ser AuctionCardFeatured para destacar
  </grid>

  <empty-state>
    Si no hay vehículos: texto "Próximas subastas disponibles pronto"
    style: centrado · var(--type-body) · var(--color-text-muted)
  </empty-state>
</section>
```

**Props TypeScript:**
```typescript
interface FeaturedVehiclesGridProps {
  title?: string
  vehicles: VehicleCardData[]
  viewAllHref?: string
  columns?: 2 | 3 | 4
}

interface VehicleCardData {
  id: string
  vehicleName: string
  subtitle?: string
  imageUrl?: string
  price: string
  status: 'live' | 'negotiable' | 'upcoming' | 'closed' | 'featured'
  countdown?: string
  opensInDays?: number
  isFeatured?: boolean
}
```

---

### `ls-category-bands` — CategoryBands

```xml
<section id="ls-category-bands">
  <background>var(--color-surface-section) = oklch(0.96 0.004 160)</background>
  <padding>var(--spacing-section-y) var(--spacing-section-x)</padding>

  <section-header>
    title: "EXPLORAR POR CATEGORÍA" · var(--type-h2) · uppercase
  </section-header>

  <categories-row>
    layout: flex-row · gap: 12px · overflow: scroll horizontal en mobile
    NO wrap en desktop

    CADA CATEGORY-CHIP:
      bg: var(--color-surface-card) · radius-sm = 4px · shadow-card
      padding: 16px 20px
      hover: shadow-floating + translateY(-2px) · transition 150ms
      layout: vertical · align: center · gap: 8px

      icon: 32×32 · var(--color-vault) · SVG
      label: var(--type-label) = 12px/600 · uppercase · var(--color-text-on-surface)
      count: var(--type-micro) = 8px/600 · var(--color-text-muted)
      bottom-border: 4px solid var(--color-vault) — firma de marca

    min-width: 120px · flex-shrink: 0
  </categories-row>
</section>
```

**Props TypeScript:**
```typescript
interface CategoryBandsProps {
  title?: string
  categories: Array<{
    id: string
    label: string
    icon: React.ReactNode
    count: number
    href: string
  }>
}
```

**Categorías sugeridas:** Sedanes, SUVs, Camionetas, Deportivos, Clásicos, Camiones, Motos

---

### `ls-stats` — StatsSection

```xml
<section id="ls-stats">
  <background>var(--gradient-vault)</background>
  <padding>48px 24px</padding>

  <grid>
    desktop: 4 columnas · gap: 0 · separadas por divider vertical white 20%
    mobile:  2x2 grid

    CADA STAT-BLOCK:
      padding: 0 32px · text-align: center
      value: var(--type-h1) = 30px/800 · var(--color-text-on-dark) · Roboto Mono · tabular-nums
      label: var(--type-caption) = 11px/700 · uppercase · var(--color-text-on-dark-muted)
  </grid>

  <optional-subtitle>
    margin-top: 32px · text-align: center
    var(--type-body-sm) · var(--color-text-on-dark-muted)
  </optional-subtitle>
</section>
```

**Props TypeScript:**
```typescript
interface StatsSectionProps {
  stats: Array<{ value: string; label: string }>
  subtitle?: string
}
```

**Valores sugeridos:**
- "15+" / "AÑOS DE OPERACIÓN"
- "5,000+" / "VEHÍCULOS SUBASTADOS"
- "98%" / "SATISFACCIÓN DE CLIENTES"
- "SBS" / "CERTIFICADO Y REGULADO"

---

### `ls-how-it-works` — HowItWorks

```xml
<section id="ls-how-it-works">
  <background>var(--color-surface-page)</background>
  <padding>var(--spacing-section-y) var(--spacing-section-x)</padding>

  <section-header>
    title: "CÓMO FUNCIONA" · var(--type-h2) · uppercase · centrado
    subtitle: var(--type-body) · var(--color-text-muted) · centrado · max-width 480px
  </section-header>

  <steps-row>
    desktop: 3 columnas · gap: 32px
    mobile:  1 columna
    conectadas por línea punteada var(--color-divider-section) entre números (oculta en mobile)

    CADA STEP:
      bg: var(--color-surface-card) · radius-sm · shadow-card · padding: 24px
      number-badge: 40×40 circular · bg var(--gradient-vault) · text white · var(--type-h3) · font Roboto Mono
      icon: 32×32 · var(--color-vault) · margin-top: 16px
      title: var(--type-h4) = 14px/700 · uppercase · var(--color-text-on-surface) · margin-top: 12px
      description: var(--type-body-sm) = 14px/400 · var(--color-text-body) · margin-top: 8px
      bottom-border: 4px solid var(--color-vault) — firma de marca
  </steps-row>
</section>
```

**Props TypeScript:**
```typescript
interface HowItWorksProps {
  title?: string
  subtitle?: string
  steps: Array<{
    number: number
    icon: React.ReactNode
    title: string
    description: string
  }>
}
```

**Steps sugeridos:**
1. REGÍSTRATE — Crea tu cuenta y verifica tu identidad en minutos.
2. EXPLORA Y POSTULA — Navega el catálogo y deposita tu garantía.
3. PARTICIPA Y ADJUDÍCATE — Puja en tiempo real y lleva tu vehículo.

---

### `ls-cta-band` — CTABand

```xml
<section id="ls-cta-band">
  <background>var(--gradient-vault)</background>
  <padding>48px 24px</padding>
  <text-align>center</text-align>

  <eyebrow>
    var(--type-badge) · var(--color-live) · uppercase · tracking 1.5px
  </eyebrow>

  <headline>
    var(--type-h1) = 30px/800 · var(--color-text-on-dark) · uppercase
    mobile: var(--type-h2) = 20px
  </headline>

  <subtitle>
    var(--type-body) · var(--color-text-on-dark-muted) · max-width: 440px · margin: 0 auto
  </subtitle>

  <cta-primary>
    ButtonPrimary variante "on-dark":
    bg: white · text: var(--color-vault) · uppercase · radius-sm
    hover: color-mix(in oklch, white 90%, var(--color-vault))
    margin-top: 24px
  </cta-primary>

  <sublink>
    opcional · var(--type-label) · var(--color-text-on-dark-subtle) · underline
    ej: "Ver términos y condiciones"
    margin-top: 12px
  </sublink>
</section>
```

**Props TypeScript:**
```typescript
interface CTABandProps {
  eyebrow?: string
  headline: string
  subtitle?: string
  cta: { label: string; href: string }
  sublink?: { label: string; href: string }
}
```

---

### `ls-auctioneer-spotlight` — AuctioneerSpotlight

```xml
<section id="ls-auctioneer-spotlight">
  <background>var(--color-surface-section)</background>
  <padding>var(--spacing-section-y) var(--spacing-section-x)</padding>

  <auctioneer-header>
    layout: flex · space-between
    left: avatar 48px circular + nombre empresa (var(--type-h3) uppercase) + "X SUBASTAS ACTIVAS" label muted
    right: "IR AL PERFIL →" link · var(--color-vault) · uppercase
  </auctioneer-header>

  <vehicles-grid>
    margin-top: 16px
    usar FeaturedVehiclesGrid sin header propio
  </vehicles-grid>
</section>
```

---

### `ls-testimonials` — Testimonials

```xml
<section id="ls-testimonials">
  <background>var(--color-surface-page)</background>
  <padding>var(--spacing-section-y) var(--spacing-section-x)</padding>

  <section-header>
    title: "LO QUE DICEN NUESTROS COMPRADORES" · var(--type-h2) · uppercase
  </section-header>

  <testimonials-grid>
    desktop: 3 columnas · gap: 16px
    mobile:  1 columna

    CADA TESTIMONIAL-CARD:
      bg: var(--color-surface-card) · radius-sm · shadow-card · padding: 24px
      quote: var(--type-body) · var(--color-text-body) · italic
      author: var(--type-label) = 12px/600 · uppercase · var(--color-text-on-surface) · margin-top: 16px
      role: var(--type-micro) · var(--color-text-muted)
      bottom-border: 4px solid var(--color-negotiable) — cyan para diferenciarlo de auction cards
  </testimonials-grid>
</section>
```

---

## COMPOSICIÓN DE PÁGINAS

### Landing Principal (Home)
```
ls-hero
ls-live-strip          ← solo si hay subastas live
ls-featured-grid
ls-category-bands
ls-stats
ls-how-it-works
ls-cta-band
```

### Landing de Categoría (ej: SUVs)
```
[Hero compacto con fondo gradient-vault — variante sin stats]
ls-featured-grid       ← filtrado por categoría
ls-live-strip          ← solo subastas live de esa categoría
ls-cta-band
```

### Landing de Empresa Subastadora
```
ls-auctioneer-spotlight
ls-featured-grid
ls-stats               ← stats de la empresa
ls-cta-band
```

---

## REGLAS DE ALTERNANCIA DE BACKGROUNDS

Para que las secciones se separen visualmente sin bordes:

```
ls-hero              → gradient-vault (oscuro)
ls-live-strip        → color-live (naranja) — siempre contrasta con vecinos
ls-featured-grid     → surface-page (claro)
ls-category-bands    → surface-section (gris muy sutil)
ls-stats             → gradient-vault (oscuro)
ls-how-it-works      → surface-page (claro)
ls-cta-band          → gradient-vault (oscuro)
```

Regla: gradient-vault nunca aparece dos veces seguidas (excepto si ls-live-strip lo separa).

---

## ESTRUCTURA DE ARCHIVOS

```
src/features/
  HeroSection/
    index.ts
    HeroSection.tsx
    styles.ts
    constants.tsx
    types.ts
  LiveAuctionsStrip/
    ...
  FeaturedVehiclesGrid/
    ...
  CategoryBands/
    ...
  StatsSection/
    ...
  HowItWorks/
    ...
  CTABand/
    ...
```

Cada sección = feature independiente. Composición ocurre en `src/app/(marketing)/page.tsx`.

---

## CHECKLIST PRE-BUILD

Antes de codificar cualquier sección:
- [ ] ¿El background alterna correctamente con sus vecinos?
- [ ] ¿Todo color referencia var(--token)? No HEX directo.
- [ ] ¿Headings de sección son uppercase?
- [ ] ¿Hay estado empty/loading?
- [ ] ¿Es responsive (1 col en mobile)?
- [ ] ¿Precios/números usan Roboto Mono + tabular-nums?
- [ ] ¿La sección funciona sin Header/Footer/Sidebar?
