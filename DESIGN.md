# VMC Subastas — Design System Specification
**Version 1.1.0 · "The Digital Curator"**

This document is the single source of truth for the VMC Subastas design system. Any AI tool, designer, or developer reading this document must use these specifications exactly to produce components. Do not invent values — every size, color, and rule is defined here.

---

## 1. Brand Identity & Creative Direction

**Platform:** VMC Subastas — a high-value vehicle auction platform in Peru.

**Creative North Star:** "The Digital Curator." We reject the standard marketplace aesthetic. Every screen is a curated gallery — secure, exclusive, editorial. The visual language is borrowed from luxury automotive magazines: deep tonal backgrounds, intentional asymmetry, high-contrast typographic hierarchy.

**Atmosphere:** "The Vault" — deep purple anchors the structure. Sharp orange signals urgency. Clean cyan marks negotiation. White surfaces float above the dark foundation.

**Tone:** Authoritative, precise, high-stakes. Never playful. Never generic.

---

## 2. Colors

### Primary Palette

| Name | HEX | Usage |
|---|---|---|
| **The Vault (Primary)** | `#22005C` | Navigation, primary CTAs, header, sidebar background, card accent border |
| **En Vivo (Secondary)** | `#ED8936` | Live auction badges, urgent status, CTA accent |
| **Negociable (Tertiary)** | `#00CACE` | Negotiable status, interactive highlights, info state |
| **Vault Dark** | `#2E0F70` | Overlays, hover states on dark surfaces |
| **Vault Mid** | `#3B1782` | Gradient end, action primary interactive |

### Surface Tiers (The Layering System)

| Level | HEX | Usage |
|---|---|---|
| **Level 0 — Page** | `#F8FAF9` | Base page background |
| **Level 1 — Section** | `#F2F4F3` | Sub-sections, sidebar content areas, tinted wrappers |
| **Level 2 — Card** | `#FFFFFF` | Cards, modals, input surfaces, floating elements |

### Text Colors

| Name | HEX / Opacity | Usage |
|---|---|---|
| On Surface | `#191C1C` | Primary text — never use pure black |
| Body | `#494550` | Card body text, secondary content |
| Muted | `#494550` at 50% | Subtitles, secondary labels |
| Label | `#494550` at 40% | Form labels, metadata |
| Price Label | `#99A1AF` | "PRECIO BASE" label above price |
| Disabled | `#4A5565` | Disabled component text |
| On Dark | `#FFFFFF` | Text on dark (purple/sidebar) surfaces |
| On Dark Muted | `#FFFFFF` at 60% | Secondary text on dark surfaces |
| On Dark Subtle | `#FFFFFF` at 30% | Tertiary text on dark surfaces |
| Link | `#3B1782` | Clickable links |

### Status Colors

| State | HEX | Usage |
|---|---|---|
| Live indicator dot | `#EF4444` | Animated dot on live auction banners |
| Success | `#22C55E` | Successful bid, confirmed action |
| Warning | `#FFA000` | Near-expiry, attention needed |
| Error | `#BA1A1A` | Failed bid, rejected action, form errors |
| Info | `#00CACE` | Informational messages |

### Utility Colors

| Name | HEX | Usage |
|---|---|---|
| Ghost Border | `#22005C` at 10% | Only permitted functional border |
| Section Divider | `#22005C` at 5% | Subtle row separators |
| Input Background | `#E1E3E2` | Input field fill (no border) |
| Skeleton / Inactive | `#D1D5DC` | Loading placeholders, disabled states |

### Gradient

**Vault Gradient:** `linear-gradient(135deg, #22005C 0%, #3B1782 100%)`
Use for: Hero banners, primary action areas, sidebar background, button fills.

### Glassmorphism

**Glass Surface:** `rgba(255, 255, 255, 0.40)` + `backdrop-blur: 8px`
Use for: Favorite icon buttons overlaid on vehicle images. Nowhere else.

---

## 3. Typography

**Single typeface system.** Everything uses **Plus Jakarta Sans** (Google Fonts).
Monospace exception: **Roboto Mono** for VINs, license plates, lot numbers only.

```
Import: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap
```

### Font Weights

| Name | Value |
|---|---|
| Regular | 400 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |

### Type Scale

| Role | Size | Line Height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| **display** | 56px | 84px | 800 | -1.5px | Hero headlines only — magazine impact |
| **h1** | 30px | 44px | 800 | -1.5px | Page-level headings, auction price hero |
| **h2** | 20px | 32px | 800 | -0.5px | Section headings (uppercase) |
| **h3** | 18px | 28px | 800 | -0.5px | Sub-section headings |
| **h4** | 14px | 20px | 700 | 0px | Featured card titles, sidebar headings |
| **body** | 16px | 24px | 400 | 0px | Default body text |
| **bodySm** | 14px | 20px | 400 | 0px | Secondary body, specs, descriptions |
| **caption** | 11px | 16px | 700 | 0px | Card titles (standard), hero subtitles |
| **label** | 12px | 20px | 600 | 0.9px | Prices, meta-info, form inputs |
| **badge** | 10px | 16px | 700 | 1.0px | Status badge text (always uppercase) |
| **micro** | 8px | 12px | 600 | 0px | Ultra-dense labels (exception only) |

### Typography Rules

- **Prices:** Always use `h1` (30px) size, `tabular-nums` rendering — numbers must not shift layout
- **Vehicle names on cards:** Always uppercase, `caption` role (11px/700)
- **Section headings:** Always uppercase
- **VINs, plates, lot IDs:** Roboto Mono, `tabular-nums`
- **Never use Inter.** If any design source shows Inter, substitute Plus Jakarta Sans

---

## 4. Spacing System

**Base grid: 4px.** All spacing values are multiples of 4.

| Token | Value | Use |
|---|---|---|
| space-1 | 4px | Icon padding, micro gaps |
| space-2 | 8px | Between badge and text, internal chip gap |
| space-3 | 12px | Card internal padding |
| space-4 | 16px | Grid column gap, standard padding |
| space-5 | 20px | Nav padding, section inner padding |
| space-6 | 24px | Hero padding, modal padding |
| space-7 | 28px | — |
| space-8 | 32px | Section vertical padding |
| space-10 | 40px | Between sections |
| space-12 | 48px | — |
| space-16 | 64px | Header height, sidebar brand area height |

### Semantic Spacing

| Name | Value | Use |
|---|---|---|
| Card padding | 12px | Inside cards |
| Card gap | 8px | Between card internal elements |
| Grid gap | 16px | Between cards in a grid |
| Section padding X | 24px | Horizontal padding of sections |
| Section padding Y | 32px | Vertical padding of sections |
| Between sections | 40px | Gap between major content blocks |
| Header height | 64px | Fixed header/sidebar brand area height |

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| none | 0px | Tables, data cells — never rounded |
| sm (surface) | 4px | Cards, badges, inputs, buttons, sections |
| md | 8px | — (reserved) |
| lg | 16px | Modals, drawers |
| full | 9999px | Icon buttons (circular: 28×28, 48×48) |

**Rule:** Almost everything uses 4px. The system is intentionally restrained — a financial/transactional platform must feel rigorous, not soft.

---

## 6. Shadows

Only two shadows are permitted in the system:

| Name | Value | Use |
|---|---|---|
| **Card shadow (brand-tinted)** | `0 8px 16px rgba(34, 0, 92, 0.06)` | All cards at rest — Vault-tinted |
| **Floating shadow** | `0 8px 16px rgba(0, 0, 0, 0.10)` | Active/hover cards, modals |

**Do not use generic `box-shadow` values.** If neither of these fits, the design needs to be reconsidered.

---

## 7. Layout

- **Max width:** 1024px, centered
- **Body background:** `#F2F4F3`
- **Layout pattern:** Sidebar (256px fixed) + Content area (768px)
- **Header height:** 64px

### Layout Structure (Desktop 1024px)

```
┌─────────────────────────────────────────┐
│  Header — 768px (right panel only)  64px│
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │   Content Area               │
│  256px   │   768px                      │
│          │                              │
│ (full    │                              │
│  height  │                              │
│  incl.   │                              │
│  brand   │                              │
│  area)   │                              │
├──────────┴──────────────────────────────┤
│  Footer — 1024px full width             │
└─────────────────────────────────────────┘
```

---

## 8. Core Rules

### The "No-Line" Rule
**Never use 1px solid borders to separate content areas.** Separation must come from background color shifts only (e.g., `#FFFFFF` card on `#F2F4F3` section). If a border is functionally required for accessibility, use a "Ghost Border": `#22005C` at 10% opacity.

### The "Signature Finish" Rule
Every auction card must have a **4px solid bottom border** as a brand signature. Color depends on lot status:
- Live → `#ED8936`
- Negotiable → `#00CACE`
- Upcoming / New → `#22005C`
- Closed → `#D1D5DC`
- Featured → `#191C1C`

### The "No Black" Rule
Never use `#000000` for text. Always use `#191C1C` (on_surface).

### The "No HEX in Code" Rule
In component code, always reference design tokens. Never write HEX values directly.

### The "7 States" Rule
Every interactive component must define all 7 states: Default · Hover · Focus · Active · Disabled · Loading · Error

---

## 9. Components

### 9.1 Button (Primary)

- **Background:** Vault Gradient (`135deg #22005C → #3B1782`)
- **Text:** `#FFFFFF`, badge role (10px/700/uppercase), letter-spacing 1.0px
- **Height:** 44px
- **Border radius:** 4px
- **Padding:** 0 20px
- **States:**
  - Hover: lighten gradient (Vault Mid `#3B1782` dominant)
  - Focus: 2px outline `#3B1782`, 2px offset
  - Active: scale 0.97
  - Disabled: 72% opacity, `grayscale(1)`
  - Loading: animated pulse, 72% opacity
  - Error: background `#BA1A1A`

### 9.2 Button (Secondary / Ghost)

- **Background:** transparent
- **Border:** 1px `#22005C` (ghost border exception — functional)
- **Text:** `#22005C`, badge role uppercase
- **Height:** 44px
- **Border radius:** 4px

### 9.3 Input Field

- **Background:** `#E1E3E2` (no border, no outline at rest)
- **Text:** `#191C1C`, bodySm (14px/400)
- **Label:** Above field, caption role (11px/700/uppercase), `#494550` at 40%
- **Height:** 48px
- **Border radius:** 4px
- **Focus state:** Ghost border `#22005C` 10%
- **Error state:** Ghost border `#BA1A1A` 50%

### 9.4 Badge (Status)

- **Shape:** Pill — border-radius 9999px
- **Padding:** 2px 8px
- **Font:** badge role (10px/700/uppercase/1.0px tracking)
- **Variants:**

| Variant | Background | Text |
|---|---|---|
| EN VIVO | `#ED8936` | `#FFFFFF` |
| NEGOCIABLE | `#00CACE` | `#22005C` |
| PRÓXIMAMENTE | `#22005C` | `#FFFFFF` |
| CERRADO | `#9CA3AF` | `#FFFFFF` |
| DESTACADO | `#191C1C` | `#FFFFFF` |
| NUEVO | `#3B1782` | `#FFFFFF` |

- **EN VIVO** badge includes an animated orange dot (8px circle, `#EF4444`, pulse animation) to the left of text.

### 9.5 Auction Card (Standard)

**Dimensions:** Width flexible (fits grid), image height 132px

**Structure (top to bottom):**
1. **Image area** (132px) — `#F2F4F3` background when no image
   - Badge overlay: top-left, 8px from edges
   - Placeholder: centered car silhouette SVG at 25% white opacity on Vault Gradient
2. **Content area** — 12px padding, 8px gap between elements
   - Vehicle name: caption role (11px/700/uppercase), `#191C1C`
   - Subtitle (year · location): label role (12px/400), `#494550` at 50%
   - Price row: PriceDisplay component + Favorite button (right-aligned)
   - Countdown (if active): "CIERRA EN" label + timer
3. **Signature bottom border** — 4px solid, color by status (see Rule 9.4)

**Card surface:** `#FFFFFF`, border-radius 4px, shadow `0 8px 16px rgba(34, 0, 92, 0.06)`

**Favorite button:** 32×32px circular (border-radius 9999px)
- Default: `#22005C` at 5% background, muted icon
- Favorited: `#22005C` background, white heart icon
- On image (Featured variant): glassmorphic — `rgba(255,255,255,0.40)` + `backdrop-blur: 8px`, white icon

### 9.6 Auction Card (Featured)

Same as Standard but:
- **Image height:** 200px
- **Vehicle name:** h4 role (14px/700)
- **Badge + Favorite:** Both overlaid on image (glassmorphic favorite)
- **Price:** h1 role (30px) for price amount
- **Shadow:** Floating shadow `0 8px 16px rgba(0,0,0,0.10)`

### 9.7 Auction Card (Compact)

Horizontal list item, no image:
- **Height:** ~44px
- **Background:** `#FFFFFF`
- **Layout:** Badge · Vehicle name (truncated) · [Countdown] · Price — all in one row
- **Separator:** Bottom border `#22005C` at 5% (last item has no border)

### 9.8 CountdownTimer

- **Font:** Roboto Mono, h1 role (30px/800), `tabular-nums`
- **Format:** HH:MM:SS
- **States:**
  - Default (> 5 min): `#191C1C`
  - **Urgent (< 5 min):** `#ED8936` — orange, NOT red. Urgency signal only.
  - Expired: `#99A1AF` — shows "CERRADO"
- **Exposes** `data-status="default|urgent|expired"` on root element

### 9.9 PriceDisplay

Three contexts:

| Context | Label size | Amount size | Use |
|---|---|---|---|
| hero | 12px/600 | 30px/800 | Auction summary widget, featured card |
| card | 10px/600 | 16px/700 | Standard auction card |
| compact | 10px/600 | 12px/700 | Compact card, list views |

- **Label text** ("PRECIO BASE"): `#99A1AF`, uppercase, tracking 0.9px
- **Currency symbol** ("US$"): same size as amount, `#22005C`
- **Amount:** `#191C1C`, `tabular-nums`

### 9.10 AuctionStatusBanner

Full-width horizontal bar that appears below the header on detail pages.

| Status | Background | Text |
|---|---|---|
| EN VIVO | `#ED8936` | `#22005C` |
| PRÓXIMAMENTE | `#22005C` | `#FFFFFF` |
| NEGOCIABLE | `#00CACE` | `#22005C` |
| CERRADO | `#9CA3AF` | `#FFFFFF` |

**Content:** Animated dot (EN VIVO only) · Status label · Separator · Lot # · Lot title · Countdown timer (right-aligned)

**Exposes** `data-status="live|upcoming|negotiable|closed"` on root element.

### 9.11 AuctionSummaryWidget

Right-column widget on auction detail page (276px wide).

**Structure:**
- Lot ID label (`#99A1AF`, badge role)
- Vehicle title (h3, uppercase)
- Subtitle (bodySm, muted)
- Status badge
- Current price: h1 role (30px)
- Starting price: label role (muted)
- Total bids count
- Countdown timer
- Minimum bid amount (highlighted)

**Surface:** `#FFFFFF`, 4px radius, brand-tinted shadow

### 9.12 AuctionActionBar

Full-width action bar for bidding:
- **Full variant:** Bid amount input + "OFERTAR" primary button + participation counter
- **Compact variant:** Condensed for mobile-like contexts
- Participation limit shown as `X/3 participaciones`

### 9.13 Header (Upgrade version)

**Height:** 64px · **Width:** 768px (right panel) · **Background:** `#22005C`

**Content:** Left — Breadcrumb/page title · Right — Search icon · Notifications icon · User avatar (32px circular)

**No standalone logo** — logo lives in Sidebar brand area.

### 9.14 Sidebar (Upgrade version)

**Width:** 256px · **Full height** (includes 64px brand area at top) · **Background:** `#22005C`

**Structure (top to bottom):**
1. **Brand area** (64px): VMC logo centered/left-aligned, white
2. **Navigation items:** Icon + label, 44px tall each
   - Default: white at 60% opacity
   - Active: white background at 10% opacity, white at 100%
   - Hover: white background at 5% opacity
3. **Bottom section:** User info or settings link

### 9.15 Footer (Upgrade version)

**Background:** `#22005C` · **Width:** 1024px full width · **Padding:** 32px 32px 16px

**Structure:**
- Top section (flex row): Brand column (logo + description) + Nav columns (Plataforma / Legal / Contacto + Social)
- Bottom bar: Copyright text (left) + Cookie / Sitemap / Accessibility links (right)
- Includes "Libros de Reclamaciones" image (Peruvian legal requirement)

**Text:** White at 60% opacity for body, white at 80% for headings

### 9.16 VehicleImageGallery

- **Main image:** Full width, ~280px height, object-cover
- **Thumbnails:** Row of 3–4 smaller images below, 64px tall, 4px gap
- **Active thumbnail:** 2px `#22005C` border indicator
- **Navigation:** Prev/Next arrows overlaid on main image (glassmorphic circles)

### 9.17 VehicleSpecsRow

Horizontal row of spec chips. Each chip:
- Icon (SVG, 16×16px, `#22005C`) + label (badge role, muted) + value (label role, `#191C1C`)
- No borders between chips — separated by spacing only
- Icons: year calendar · km speedometer · fuel pump · gear transmission

### 9.18 DataQualityBadge

- **High:** `#22C55E` icon + "DATOS VERIFICADOS" label
- **Medium:** `#FFA000` icon + "DATOS PARCIALES"
- **Low:** `#99A1AF` icon + "DATOS BÁSICOS"

### 9.19 Accordion

Collapsible sections for vehicle info, terms, required documents:
- **Header:** h4 role + chevron icon (right-aligned)
- **Background:** `#F2F4F3`, no border
- **Expanded background:** `#FFFFFF`
- **Separator:** background shift only (No-Line Rule)
- **Transition:** 300ms standard easing

### 9.20 DocumentDownloadRow

List item for downloadable documents:
- **Icon:** File type icon (PDF red / XLS green / DOC blue), 20×20px
- **Label:** bodySm (14px)
- **Download button:** Ghost button, "DESCARGAR", badge role (10px)
- **Separator:** No border, spacing only

### 9.21 SubascoinsPromoBanner

Promotional strip for SubasCoins loyalty program:
- **Background:** Vault Gradient
- **Text:** White
- **Coin icon:** Yellow/gold circular icon
- **CTA:** Secondary ghost button (white border, white text)

### 9.22 HelpCenterBanner

Full-width section at page bottom:
- **Background:** `#F2F4F3`
- **Content:** Help icon + heading (h3) + description (bodySm) + CTA button
- **Padding:** 32px section padding

### 9.23 AuctioneerSection

Section grouping auction cards by seller:
- **Header:** Seller name (h2 uppercase) + offer count + "IR AL PERFIL" link
- **Card grid:** 4 columns, 16px gap, standard AuctionCards
- **Background:** `#F8FAF9` page background

### 9.24 TextField / SearchInput

- No border at rest
- Background: `#E1E3E2`
- Placeholder: `#494550` at 40%
- Search icon: left-aligned inside field, `#22005C`
- Height: 44px, border-radius: 4px
- Focus: ghost border `#22005C` at 10%

### 9.25 Alert / Toast

| Type | Background | Icon color | Text |
|---|---|---|---|
| Success | `#22C55E` at 10% | `#22C55E` | `#191C1C` |
| Warning | `#FFA000` at 10% | `#FFA000` | `#191C1C` |
| Error | `#BA1A1A` at 10% | `#BA1A1A` | `#191C1C` |
| Info | `#00CACE` at 10% | `#00CACE` | `#191C1C` |

- Border radius: 4px
- Left accent border: 4px solid (icon color)
- Toast: fixed position, 300ms appear/dismiss transition

---

## 10. Interaction & Motion

| Duration | Value | Use |
|---|---|---|
| Micro | 150ms | Hover, focus, icon transitions |
| Standard | 300ms | Modals, accordions, page transitions |

**Easing:** `cubic-bezier(0.3, 0, 0, 1)` for all transitions.

**Reduced motion:** When `prefers-reduced-motion: reduce` is set, all transitions and animations are disabled.

---

## 11. Accessibility

- **Minimum contrast:** 4.5:1 for body text, 3:1 for large text and icons
- **Financial data** (live prices, countdown timers): APCA Lc 90 minimum
- **Focus ring:** 2px solid `#3B1782`, 2px offset — visible on all interactive elements
- **Tab order:** Logical, top-to-bottom, left-to-right
- **`aria-live="polite"`** on CountdownTimer and AuctionStatusBanner
- **`tabular-nums`** on all numeric data that updates in real time

---

## 12. Token Architecture (for AI tools)

### Why Token Names Matter
When an AI modifies component code, it treats `--color-action-primary` as an **immutable design rule**, but treats `#22005C` as an **overridable aesthetic preference**. Always use token names, never raw values, in component code.

### Three-Level Hierarchy

```
Primitives  →  Semantic  →  Component Tokens
(raw values)   (intent)     (component decisions)

#22005C  →  --color-action-primary  →  BidButton.bg.default
                                        BidButton.bg.loading
```

### Component Tokens Quick Reference

| Component | Key tokens |
|---|---|
| AuctionCard | `border` color per status (live/negotiable/upcoming/closed/featured) |
| BidButton | `bg` per state (default/hover/loading/error/disabled) |
| Badge | `bg` and `text` per status variant |
| CountdownTimer | `text.default` / `text.urgent` (urgent = orange #ED8936, NOT red) |
| AuctionStatusBanner | `bg` and `text` per status |

### `data-status` Attribute
All status-driven components expose `data-status` on their root element:
- AuctionCard: `data-status="live|negotiable|upcoming|closed|featured"`
- AuctionStatusBanner: `data-status="live|upcoming|negotiable|closed"`
- CountdownTimer: `data-status="default|urgent|expired"`

---

## 13. Do's and Don'ts

### Do
- Use background color shifts to create separation (not borders)
- Overlap elements for editorial feel (image slightly breaking card container)
- Use the Vault Gradient for hero areas and primary CTAs
- Apply the 4px signature bottom border on every auction card
- Keep vehicle names uppercase everywhere
- Use `tabular-nums` on all prices and timers
- Add generous white space — if crowded, increase section gap to 40px

### Don't
- Don't use `#000000` — use `#191C1C`
- Don't use 1px solid borders for layout separation
- Don't use shadows other than the two defined ones
- Don't use Inter or any font other than Plus Jakarta Sans (or Roboto Mono for codes)
- Don't use red for urgency/countdown — red means error only
- Don't expose primitive color names in component code
- Don't create new spacing values — snap to the 4px grid
