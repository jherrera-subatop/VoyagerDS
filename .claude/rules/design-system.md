# VOYAGER — VMC Subastas Design System
**Version 2.0.0 · AI-Readable · W3C DTCG 2025.10**

Este documento es la fuente de verdad absoluta del Design System de VMC Subastas.
Toda IA, diseñador o desarrollador que lo lea debe usarlo con precisión exacta.
No se inventan valores. No se usan HEX en código de componentes.

---

## 0. AXIOMAS INVARIABLES (LEY — no negociables)

```xml
<axioms>
- NUNCA escribas HEX, RGB o HSL en componentes. Todo color = var(--token)
- NUNCA uses Tier 1 o Tier 2 tokens directamente en UI de producción
- NUNCA uses Inter o cualquier fuente que no sea Plus Jakarta Sans / Roboto Mono
- NUNCA uses #000000 — usa var(--color-text-on-surface)
- NUNCA uses 1px solid borders para separar áreas — usa background shift
- NUNCA uses red para urgencia/countdown — rojo = error únicamente
- NUNCA crees valores de spacing fuera de la escala definida
- NUNCA expongas token primitivos en código de componentes
- TODO componente interactivo define los 7 estados: Default·Hover·Focus·Active·Disabled·Loading·Error
- TODO color de estado interactivo (hover/active) se deriva con color-mix() u oklch(from...)
</axioms>
```

---

## 1. IDENTIDAD DE MARCA

```xml
<brand>
  <platform>VMC Subastas — plataforma transaccional de subastas de vehículos de alto valor, Perú</platform>
  <north-star>The Digital Curator — galería curada, no marketplace genérico</north-star>
  <atmosphere>The Vault — púrpura profundo como estructura, naranja como urgencia, cian como negociación</atmosphere>
  <tone>Autoritativo · Preciso · High-stakes · Nunca juguetón · Nunca genérico</tone>
</brand>
```

---

## 2. SISTEMA DE COLOR

### 2.0 Arquitectura Dual de Tokens (OKLCH ↔ Figma)

```xml
<dual-token-architecture>
  <source-of-truth>tokens.json en OKLCH — única fuente de verdad para código</source-of-truth>
  <figma-note>
    Figma NO soporta OKLCH nativamente.
    Tokens Studio (ya instalado) convierte OKLCH → HEX automáticamente al sincronizar.
    NUNCA edites tokens directamente en Figma — siempre en tokens.json.
    Los HEX en Figma son derivados de solo lectura.
  </figma-note>
  <flow>
    tokens.json (W3C DTCG · OKLCH)
      ├→ Tokens Studio Plugin → Figma (HEX automático · solo lectura)
      └→ Terrazzo CLI → @theme CSS (OKLCH · producción)
                          └→ Componentes React — var(--token) siempre
  </flow>
  <law>Código de producción NUNCA usa HEX. Siempre var(--token).</law>
</dual-token-architecture>
```

### 2.1 Migración de Valores (HEX → OKLCH)

| Token Semántico | HEX Legacy | OKLCH | Uso |
|---|---|---|---|
| `--color-vault` | `#22005C` | `oklch(0.22 0.18 285)` | Nav, CTAs primarios, sidebar, header |
| `--color-live` | `#ED8936` | `oklch(0.72 0.16 55)` | Badges live, urgencia, CTA accent |
| `--color-negotiable` | `#00CACE` | `oklch(0.78 0.14 195)` | Estado negociable, highlights interactivos |
| `--color-vault-dark` | `#2E0F70` | `oklch(0.26 0.19 285)` | Overlays, hover en superficies oscuras |
| `--color-vault-mid` | `#3B1782` | `oklch(0.30 0.20 285)` | Gradient end, action primary interactive |

### 2.2 Superficie (Layering System)

| Token | HEX Legacy | OKLCH | Uso |
|---|---|---|---|
| `--color-surface-page` | `#F8FAF9` | `oklch(0.98 0.004 160)` | Fondo base de página |
| `--color-surface-section` | `#F2F4F3` | `oklch(0.96 0.004 160)` | Secciones, sidebar content, wrappers |
| `--color-surface-card` | `#FFFFFF` | `oklch(1 0 0)` | Cards, modales, inputs, elementos flotantes |

### 2.3 Texto

| Token | Valor | Uso |
|---|---|---|
| `--color-text-on-surface` | `oklch(0.15 0.008 200)` | Texto primario (nunca #000000) |
| `--color-text-body` | `oklch(0.38 0.04 280)` | Cuerpo, contenido secundario |
| `--color-text-muted` | `oklch(0.38 0.04 280 / 50%)` | Subtítulos, labels secundarios |
| `--color-text-label` | `oklch(0.38 0.04 280 / 40%)` | Labels de formulario, metadata |
| `--color-text-price-label` | `oklch(0.68 0.02 220)` | Label "PRECIO BASE" |
| `--color-text-disabled` | `oklch(0.42 0.03 220)` | Texto en componentes deshabilitados |
| `--color-text-on-dark` | `oklch(1 0 0)` | Texto en superficies oscuras (púrpura/sidebar) |
| `--color-text-on-dark-muted` | `oklch(1 0 0 / 60%)` | Texto secundario en superficies oscuras |
| `--color-text-on-dark-subtle` | `oklch(1 0 0 / 30%)` | Texto terciario en superficies oscuras |
| `--color-text-link` | `oklch(0.30 0.20 285)` | Links clicables |

### 2.4 Status Colors

| Token | OKLCH | Uso |
|---|---|---|
| `--color-status-live-dot` | `oklch(0.55 0.22 25)` | Punto animado en badges live |
| `--color-status-success` | `oklch(0.70 0.20 145)` | Puja exitosa, acción confirmada |
| `--color-status-warning` | `oklch(0.72 0.16 65)` | Próximo a expirar, atención requerida |
| `--color-status-error` | `oklch(0.42 0.20 20)` | Puja fallida, error, rechazo |
| `--color-status-info` | `oklch(0.78 0.14 195)` | Mensajes informativos |

### 2.5 Utility Colors

| Token | Valor | Uso |
|---|---|---|
| `--color-border-ghost` | `oklch(0.22 0.18 285 / 10%)` | Único borde funcional permitido |
| `--color-divider-section` | `oklch(0.22 0.18 285 / 5%)` | Separadores de fila sutiles |
| `--color-input-bg` | `oklch(0.91 0.004 160)` | Fondo de inputs (sin borde) |
| `--color-skeleton` | `oklch(0.85 0.008 220)` | Skeletons de carga, estados deshabilitados |

### 2.6 Gradiente y Glass

```css
/* Vault Gradient — hero banners, CTAs primarios, sidebar, button fills */
--gradient-vault: linear-gradient(135deg, oklch(0.22 0.18 285) 0%, oklch(0.30 0.20 285) 100%);

/* Glass Surface — SOLO para botón favorito sobre imágenes de vehículos */
--glass-surface: rgba(255, 255, 255, 0.40);
--glass-blur: 8px;
```

### 2.7 Derivación Dinámica de Estados Interactivos

```css
/* OBLIGATORIO: usar derivación OKLCH para estados hover/active */
/* NO crear tokens paralelos como --color-vault-hover */

/* Hover sobre superficie oscura */
background: color-mix(in oklch, var(--color-vault) 85%, oklch(1 0 0));

/* Active / pressed */
background: oklch(from var(--color-vault) calc(l - 0.08) c h);

/* Hover sobre superficie clara */
background: color-mix(in oklch, var(--color-surface-card) 92%, var(--color-vault));
```

---

## 3. TOKENS W3C DTCG (tokens.json)

```json
{
  "color": {
    "vault": {
      "$value": "oklch(0.22 0.18 285)",
      "$type": "color",
      "$description": "Tier 1: Primitive. PROHIBIDO para IA en UI directa. Base del color corporativo VMC."
    },
    "action": {
      "primary": {
        "default": {
          "$value": "{color.vault}",
          "$type": "color",
          "$description": "Tier 2: Semantic. Color de acción principal. Usar solo en layouts abstractos."
        }
      }
    }
  },
  "button": {
    "primary": {
      "background": {
        "default": {
          "$value": "{color.action.primary.default}",
          "$type": "color",
          "$description": "Tier 3: Component. ÚSALO EXCLUSIVAMENTE para background-color del Button variante Primary en estado default."
        },
        "hover": {
          "$value": "color-mix(in oklch, {color.vault} 85%, oklch(1 0 0))",
          "$type": "color",
          "$description": "Tier 3: Component. background-color del Button Primary en estado hover. Derivado matemáticamente."
        },
        "active": {
          "$value": "oklch(from {color.vault} calc(l - 0.08) c h)",
          "$type": "color",
          "$description": "Tier 3: Component. background-color del Button Primary en estado active/pressed."
        }
      }
    }
  },
  "auction": {
    "card": {
      "border": {
        "live": {
          "$value": "{color.live}",
          "$type": "color",
          "$description": "Tier 3: Component. 4px solid bottom border del AuctionCard cuando data-status=live."
        },
        "negotiable": {
          "$value": "{color.negotiable}",
          "$type": "color",
          "$description": "Tier 3: Component. 4px solid bottom border del AuctionCard cuando data-status=negotiable."
        },
        "upcoming": {
          "$value": "{color.vault}",
          "$type": "color",
          "$description": "Tier 3: Component. 4px solid bottom border del AuctionCard cuando data-status=upcoming."
        },
        "closed": {
          "$value": "{color.skeleton}",
          "$type": "color",
          "$description": "Tier 3: Component. 4px solid bottom border del AuctionCard cuando data-status=closed."
        },
        "featured": {
          "$value": "{color.text.on-surface}",
          "$type": "color",
          "$description": "Tier 3: Component. 4px solid bottom border del AuctionCard cuando data-status=featured."
        }
      }
    },
    "timer": {
      "text": {
        "default": {
          "$value": "{color.text.on-surface}",
          "$type": "color",
          "$description": "Tier 3: Component. Color de texto del CountdownTimer cuando quedan más de 5 minutos."
        },
        "urgent": {
          "$value": "{color.live}",
          "$type": "color",
          "$description": "Tier 3: Component. Aplicar al texto del CountdownTimer cuando falten menos de 5 minutos. NARANJA, no rojo."
        },
        "expired": {
          "$value": "{color.text.price-label}",
          "$type": "color",
          "$description": "Tier 3: Component. Color del CountdownTimer en estado expirado. Muestra CERRADO."
        }
      }
    }
  }
}
```

---

## 4. TIPOGRAFÍA

```xml
<typography>
  <primary-font>Plus Jakarta Sans (Google Fonts)</primary-font>
  <mono-font>Roboto Mono — SOLO para VINs, placas, números de lote</mono-font>
  <import>https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap</import>
  <rule>NUNCA uses Inter. Si alguna fuente indica Inter, sustituye por Plus Jakarta Sans.</rule>
</typography>
```

### Escala Tipográfica

| Token | Size | Line Height | Weight | Tracking | Uso |
|---|---|---|---|---|---|
| `--type-display` | 56px | 84px | 800 | -1.5px | Headlines hero únicamente |
| `--type-h1` | 30px | 44px | 800 | -1.5px | Headings de página, precio hero |
| `--type-h2` | 20px | 32px | 800 | -0.5px | Headings de sección (uppercase) |
| `--type-h3` | 18px | 28px | 800 | -0.5px | Sub-sección headings |
| `--type-h4` | 14px | 20px | 700 | 0px | Títulos featured card, sidebar |
| `--type-body` | 16px | 24px | 400 | 0px | Cuerpo de texto default |
| `--type-body-sm` | 14px | 20px | 400 | 0px | Cuerpo secundario, specs |
| `--type-caption` | 11px | 16px | 700 | 0px | Títulos de card, subtítulos hero |
| `--type-label` | 12px | 20px | 600 | 0.9px | Precios, meta-info, inputs |
| `--type-badge` | 10px | 16px | 700 | 1.0px | Texto de badges (siempre uppercase) |
| `--type-micro` | 8px | 12px | 600 | 0px | Labels ultra-densos (excepción) |

### Reglas Tipográficas

```xml
<type-rules>
- Precios: siempre h1 (30px) + tabular-nums (números no deben desplazar layout)
- Nombres de vehículo en cards: siempre uppercase + caption (11px/700)
- Headings de sección: siempre uppercase
- VINs, placas, IDs de lote: Roboto Mono + tabular-nums
- tabular-nums obligatorio en CUALQUIER dato numérico que actualice en tiempo real
</type-rules>
```

---

## 5. SISTEMA DE ESPACIADO

**Base: 4px mínimo. Regla de bloque: múltiplos de 8px para padding/margin/gap de contenedores.**

```xml
<spacing-rules>
  <micro>4px — gaps internos de iconos, chips. NO usar en bloques.</micro>
  <block>Múltiplos de 8px obligatorios en padding, margin, gap de contenedores.</block>
  <reason>Renderizado fraccional destruye nitidez en tablas de datos en tiempo real de subastas.</reason>
</spacing-rules>
```

| Token | Value | Uso |
|---|---|---|
| `--space-1` | 4px | Padding de iconos, micro gaps internos |
| `--space-2` | 8px | Entre badge y texto, gap interno de chip |
| `--space-3` | 12px | Padding interno de card |
| `--space-4` | 16px | Gap de columnas de grid, padding estándar |
| `--space-5` | 20px | Padding de nav, padding inner de sección |
| `--space-6` | 24px | Padding hero, padding de modal |
| `--space-8` | 32px | Padding vertical de sección |
| `--space-10` | 40px | Entre secciones |
| `--space-12` | 48px | Reservado |
| `--space-16` | 64px | Altura de header, altura de brand area del sidebar |

### Spacing Semántico

| Token | Value | Uso |
|---|---|---|
| `--spacing-card-padding` | 12px | Interior de cards |
| `--spacing-card-gap` | 8px | Entre elementos internos de card |
| `--spacing-grid-gap` | 16px | Entre cards en un grid |
| `--spacing-section-x` | 24px | Padding horizontal de secciones |
| `--spacing-section-y` | 32px | Padding vertical de secciones |
| `--spacing-between-sections` | 40px | Gap entre bloques de contenido mayores |
| `--spacing-header-height` | 64px | Altura fija de header y brand area del sidebar |

---

## 6. BORDER RADIUS

```xml
<radius-rules>
  <concentric-law>
    Radio Interno = Radio Externo - Padding del contenedor padre.
    Si AuctionPanel usa radius-lg (16px) con padding de 8px → botón anidado máximo radius 8px.
    RAZÓN: Paralelismo concéntrico. Sin esto se genera ilusión óptica de asimetría
    que degrada confianza en plataforma transaccional.
  </concentric-law>
</radius-rules>
```

| Token | Value | Uso |
|---|---|---|
| `--radius-none` | 0px | Tablas, celdas de datos — nunca rounded |
| `--radius-sm` | 4px | Cards, badges, inputs, botones, secciones |
| `--radius-md` | 8px | Reservado / concentric inner |
| `--radius-lg` | 16px | Modales, drawers |
| `--radius-full` | 9999px | Icon buttons (circular: 28×28, 48×48) |

---

## 7. SOMBRAS

**Solo dos sombras permitidas. Si ninguna aplica, el diseño debe reconsiderarse.**

| Token | Value | Uso |
|---|---|---|
| `--shadow-card` | `0 8px 16px oklch(0.22 0.18 285 / 6%)` | Cards en reposo — Vault-tinted |
| `--shadow-floating` | `0 8px 16px oklch(0 0 0 / 10%)` | Cards active/hover, modales |

---

## 8. LAYOUT

```xml
<layout>
  <max-width>1024px centrado</max-width>
  <body-bg>var(--color-surface-section)</body-bg>
  <sidebar-width>256px fijo</sidebar-width>
  <content-width>768px</content-width>
  <header-height>64px</header-height>
  <structure>Sidebar (256px) + Content Area (768px) | Footer (1024px full width)</structure>
</layout>
```

---

## 9. MOTION

| Token | Value | Uso |
|---|---|---|
| `--duration-micro` | 150ms | Hover, focus, transiciones de icono |
| `--duration-standard` | 300ms | Modales, accordions, transiciones de página |
| `--ease-default` | `cubic-bezier(0.3, 0, 0, 1)` | Todas las transiciones |

```xml
<motion-rule>
  prefers-reduced-motion: reduce → deshabilitar TODAS las transiciones y animaciones.
</motion-rule>
```

---

## 10. ACCESIBILIDAD

```xml
<accessibility>
- Contraste mínimo: 4.5:1 para texto cuerpo, 3:1 para texto grande e iconos
- Datos financieros (precios live, timers): APCA Lc 90 mínimo
- Focus ring: 2px solid var(--color-vault-mid), 2px offset — visible en TODOS los elementos interactivos
- Tab order: lógico, top-to-bottom, left-to-right
- aria-live="polite" en CountdownTimer y AuctionStatusBanner
- tabular-nums en TODO dato numérico que actualice en tiempo real
</accessibility>
```

---

## 11. REGLAS CORE

```xml
<core-rules>
  <no-line-rule>
    NUNCA uses 1px solid borders para separar áreas de contenido.
    La separación proviene SOLO de cambios de background color.
    Excepción funcional: Ghost Border = var(--color-border-ghost)
  </no-line-rule>

  <signature-finish-rule>
    CADA auction card tiene un 4px solid bottom border como firma de marca.
    Color según estado:
    - data-status="live"        → var(--color-live)
    - data-status="negotiable"  → var(--color-negotiable)
    - data-status="upcoming"    → var(--color-vault)
    - data-status="closed"      → var(--color-skeleton)
    - data-status="featured"    → var(--color-text-on-surface)
  </signature-finish-rule>

  <no-black-rule>NUNCA uses #000000. Siempre var(--color-text-on-surface)</no-black-rule>

  <no-hex-rule>En código de componentes, SIEMPRE referencias tokens. NUNCA HEX directo.</no-hex-rule>

  <seven-states-rule>
    Todo componente interactivo define:
    Default · Hover · Focus · Active · Disabled · Loading · Error
  </seven-states-rule>

  <data-status-rule>
    Todos los componentes driven por estado exponen data-status en su root element:
    - AuctionCard: data-status="live|negotiable|upcoming|closed|featured"
    - AuctionStatusBanner: data-status="live|upcoming|negotiable|closed"
    - CountdownTimer: data-status="default|urgent|expired"
  </data-status-rule>
</core-rules>
```

---

## 12. COMPONENTES

### 12.1 Button Primary
```xml
<component name="ButtonPrimary">
  <background>var(--gradient-vault)</background>
  <text>var(--color-text-on-dark) · badge role · uppercase · tracking 1.0px</text>
  <height>44px</height>
  <radius>var(--radius-sm)</radius>
  <padding>0 20px</padding>
  <states>
    <hover>color-mix(in oklch, var(--color-vault-mid) 70%, oklch(1 0 0))</hover>
    <focus>2px outline var(--color-vault-mid), 2px offset</focus>
    <active>scale(0.97)</active>
    <disabled>opacity 72% + grayscale(1)</disabled>
    <loading>animated pulse + opacity 72%</loading>
    <error>background var(--color-status-error)</error>
  </states>
</component>
```

### 12.2 Button Secondary / Ghost
```xml
<component name="ButtonSecondary">
  <background>transparent</background>
  <border>1px var(--color-vault) — excepción ghost border funcional</border>
  <text>var(--color-vault) · badge role · uppercase</text>
  <height>44px</height>
  <radius>var(--radius-sm)</radius>
</component>
```

### 12.3 Input Field
```xml
<component name="InputField">
  <background>var(--color-input-bg) — sin borde en reposo</background>
  <text>var(--color-text-on-surface) · body-sm (14px/400)</text>
  <label>Sobre el campo · caption (11px/700/uppercase) · var(--color-text-label)</label>
  <height>48px</height>
  <radius>var(--radius-sm)</radius>
  <states>
    <focus>ghost border var(--color-vault) 10%</focus>
    <error>ghost border var(--color-status-error) 50%</error>
  </states>
</component>
```

### 12.4 Badge Status
```xml
<component name="BadgeStatus">
  <shape>Pill — radius-full</shape>
  <padding>2px 8px</padding>
  <font>badge role · 10px/700/uppercase/1.0px tracking</font>
  <variants>
    EN VIVO: bg var(--color-live) · text white · punto animado 8px rojo a la izquierda
    NEGOCIABLE: bg var(--color-negotiable) · text var(--color-vault)
    PRÓXIMAMENTE: bg var(--color-vault) · text white
    CERRADO: bg oklch(0.65 0.01 220) · text white
    DESTACADO: bg var(--color-text-on-surface) · text white
    NUEVO: bg var(--color-vault-mid) · text white
  </variants>
</component>
```

### 12.5 AuctionCard Standard
```xml
<component name="AuctionCardStandard" data-status="live|negotiable|upcoming|closed|featured">
  <surface>var(--color-surface-card) · radius-sm · shadow-card</surface>
  <image-area>
    height: 132px · bg var(--color-surface-section) sin imagen
    badge: top-left, 8px desde bordes
    placeholder: silueta SVG centrada, 25% white opacity sobre vault-gradient
  </image-area>
  <content-area>
    padding: var(--spacing-card-padding) · gap: var(--spacing-card-gap)
    vehicle-name: caption (11px/700/uppercase) · var(--color-text-on-surface)
    subtitle: label (12px/400) · var(--color-text-muted)
    price-row: PriceDisplay + FavoriteButton (right-aligned)
    countdown: "CIERRA EN" label + timer (si aplica)
  </content-area>
  <signature>4px solid bottom border — color según data-status (ver core-rules)</signature>
</component>
```

### 12.6 AuctionCard Featured
```xml
<component name="AuctionCardFeatured">
  <extends>AuctionCardStandard</extends>
  <overrides>
    image-height: 200px
    vehicle-name: h4 (14px/700)
    badge + favorite: overlay glassmórfico sobre imagen
    price: h1 (30px)
    shadow: var(--shadow-floating)
  </overrides>
</component>
```

### 12.7 AuctionCard Compact
```xml
<component name="AuctionCardCompact">
  <layout>Horizontal list item — sin imagen</layout>
  <height>~44px</height>
  <bg>var(--color-surface-card)</bg>
  <row>Badge · Nombre vehículo (truncado) · [Countdown] · Precio</row>
  <separator>Bottom border var(--color-divider-section) — último item sin borde</separator>
</component>
```

### 12.8 CountdownTimer
```xml
<component name="CountdownTimer" data-status="default|urgent|expired">
  <font>Roboto Mono · h1 (30px/800) · tabular-nums</font>
  <format>HH:MM:SS</format>
  <states>
    default (más de 5 min): var(--color-text-on-surface)
    urgent (menos de 5 min): var(--color-live) — NARANJA, NUNCA ROJO
    expired: var(--color-text-price-label) — muestra "CERRADO"
  </states>
  <aria>aria-live="polite"</aria>
</component>
```

### 12.9 PriceDisplay
```xml
<component name="PriceDisplay">
  <label>"PRECIO BASE" — uppercase · tracking 0.9px · var(--color-text-price-label)</label>
  <currency>"US$" — misma size que amount · var(--color-vault)</currency>
  <amount>var(--color-text-on-surface) · tabular-nums</amount>
  <contexts>
    hero: label 12px/600 · amount 30px/800
    card: label 10px/600 · amount 16px/700
    compact: label 10px/600 · amount 12px/700
  </contexts>
</component>
```

### 12.10 AuctionStatusBanner
```xml
<component name="AuctionStatusBanner" data-status="live|upcoming|negotiable|closed">
  <layout>Full-width horizontal bar · bajo header en páginas de detalle</layout>
  <content>Punto animado (solo EN VIVO) · Label estado · Separador · Lote# · Título · Countdown (right)</content>
  <variants>
    live: bg var(--color-live) · text var(--color-vault)
    upcoming: bg var(--color-vault) · text white
    negotiable: bg var(--color-negotiable) · text var(--color-vault)
    closed: bg oklch(0.65 0.01 220) · text white
  </variants>
  <aria>aria-live="polite"</aria>
</component>
```

### 12.11 AuctionSummaryWidget
```xml
<component name="AuctionSummaryWidget">
  <width>276px · columna derecha en página de detalle</width>
  <surface>var(--color-surface-card) · radius-sm · shadow-card</surface>
  <structure>
    Lot ID: badge role · var(--color-text-price-label)
    Vehicle title: h3 · uppercase
    Subtitle: body-sm · muted
    Status badge
    Current price: h1 (30px)
    Starting price: label · muted
    Bid count
    Countdown timer
    Minimum bid (highlighted)
  </structure>
</component>
```

### 12.12 Header
```xml
<component name="Header">
  <height>64px</height>
  <width>768px (panel derecho)</width>
  <bg>var(--color-vault)</bg>
  <content>Left: breadcrumb/título · Right: search icon · notifications · avatar 32px circular</content>
  <note>Logo NO vive aquí — vive en brand area del Sidebar</note>
</component>
```

### 12.13 Sidebar
```xml
<component name="Sidebar">
  <width>256px · full height</width>
  <bg>var(--color-vault)</bg>
  <structure>
    Brand area 64px: VMC logo centrado/left, blanco
    Nav items 44px: icon + label
      default: white 60% opacity
      active: white bg 10% opacity + white 100%
      hover: white bg 5% opacity
    Bottom: user info o settings link
  </structure>
</component>
```

### 12.14 Footer
```xml
<component name="Footer">
  <bg>var(--color-vault)</bg>
  <width>1024px full width</width>
  <padding>32px 32px 16px</padding>
  <structure>
    Top: Brand col (logo + descripción) + Nav cols (Plataforma / Legal / Contacto + Social)
    Bottom bar: Copyright (left) + Cookie/Sitemap/Accesibilidad (right)
    Incluye imagen "Libros de Reclamaciones" (requerimiento legal Perú)
  </structure>
  <text>white 60% body · white 80% headings</text>
</component>
```

### 12.15 Alert / Toast
```xml
<component name="Alert">
  <radius>var(--radius-sm)</radius>
  <left-accent>4px solid (color del ícono)</left-accent>
  <variants>
    success: bg var(--color-status-success)/10% · icon var(--color-status-success)
    warning: bg var(--color-status-warning)/10% · icon var(--color-status-warning)
    error: bg var(--color-status-error)/10% · icon var(--color-status-error)
    info: bg var(--color-status-info)/10% · icon var(--color-status-info)
  </variants>
  <text>var(--color-text-on-surface)</text>
  <toast>fixed position · 300ms appear/dismiss transition</toast>
</component>
```

### 12.16 Otros Componentes

```xml
<components-quick-ref>
  VehicleImageGallery:
    main-image: full-width · ~280px · object-cover
    thumbnails: 64px · 4px gap · active=2px var(--color-vault) border
    nav-arrows: glassmórfico overlay

  VehicleSpecsRow:
    chips: icon 16×16 var(--color-vault) + label badge muted + value label on-surface
    sin bordes entre chips — solo spacing

  DataQualityBadge:
    high: var(--color-status-success) + "DATOS VERIFICADOS"
    medium: var(--color-status-warning) + "DATOS PARCIALES"
    low: var(--color-text-price-label) + "DATOS BÁSICOS"

  Accordion:
    header: h4 + chevron right-aligned
    collapsed: bg var(--color-surface-section) · sin borde
    expanded: bg var(--color-surface-card)
    transition: 300ms standard

  SubascoinsPromoBanner:
    bg: var(--gradient-vault)
    text: white · coin icon amarillo/dorado
    CTA: ghost button (white border + white text)

  AuctioneerSection:
    header: seller name h2 uppercase + offer count + "IR AL PERFIL" link
    grid: 4 cols · 16px gap · AuctionCards standard
    bg: var(--color-surface-page)
</components-quick-ref>
```

---

## 13. PIPELINE DE TOKENS (Terrazzo + Tailwind v4)

```xml
<token-pipeline>
  <tool>Terrazzo (@terrazzo/cli + @terrazzo/plugin-tailwind)</tool>
  <source>tokens.json (W3C DTCG)</source>
  <output>src/styles/tokens.css</output>

  <strategy>
    Tier 1 + Tier 2 → @theme (genera utilidades Tailwind: bg-*, text-*, border-*)
    Tier 3 → :root sin namespace Tailwind → consumir con var() en @layer components
    RAZÓN: Evitar utilidades ilógicas como border-button-primary-background-hover
  </strategy>

  <tailwind-css-entry>
    @import "tailwindcss";
    @theme { @tz (theme: "light"); }
    @variant dark { @tz (theme: "dark"); }
    @custom-variant high-contrast ([data-theme="high-contrast"] &);
  </tailwind-css-entry>
</token-pipeline>
```

---

## 14. QUICK REFERENCE PARA IA

```xml
<ai-quick-ref>
  PREGUNTA: ¿Qué token uso para el fondo del botón primario?
  RESPUESTA: var(--color-action-primary) para Tier 2 genérico / Tier 3 específico del componente

  PREGUNTA: ¿Cómo hago el hover de un botón?
  RESPUESTA: color-mix(in oklch, var(--color-vault) 85%, oklch(1 0 0)) — NUNCA token paralelo

  PREGUNTA: ¿Qué color va en la signature bottom border de un card LIVE?
  RESPUESTA: var(--color-live) [oklch(0.72 0.16 55)]

  PREGUNTA: ¿Puedo usar #ED8936 directamente?
  RESPUESTA: NO. Usa var(--color-live) siempre.

  PREGUNTA: ¿El countdown urgente es rojo?
  RESPUESTA: NO. Es var(--color-live) — naranja. Rojo = error únicamente.

  PREGUNTA: ¿Puedo crear un spacing de 10px?
  RESPUESTA: NO. Snappea al grid: 8px o 12px.
</ai-quick-ref>
```
