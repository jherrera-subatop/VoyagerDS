# VOYAGER — Design System Visual Specification
**Version 2.1.0 · AI-Readable · W3C DTCG 2025**

---

## SCOPE

This document defines the VOYAGER visual vocabulary: color tokens, typography rules, spacing scale, radius, shadows, and constraints.

**What this document IS:**
Token values and their semantic roles. Decision rules for typography, color, spacing, and visual hierarchy. Constraints that prevent generic output.

**What this document is NOT:**
Component definitions. UI structure. Content layout. Application logic.
This document does not tell you what UI to build — it tells you what visual language to apply once you have a structure.

**Two operating modes — both are valid with either file:**
- **Mode A (With reference):** You have a reference — outerHTML, Copy Element, screenshot, or any combination. Respect it. Apply VOYAGER tokens to what exists. Do not invent structure, elements, or text.
- **Mode B (Without reference):** You have no reference. Use the decision guides in Section 8 to make visual choices from scratch.

---

## 1. Visual Identity

**Aesthetic:** Institutional precision. Every surface is a curated, editorial space — secure, exclusive, authoritative. Deep tonal backgrounds. Intentional hierarchy. High-contrast typographic structure.

**Color atmosphere:**
- Deep purple = structure, authority, primary brand surfaces
- Orange = urgency, time pressure, live/active signals
- Cyan = negotiable, interactive, informational
- White surfaces float above the dark foundation

**Density:** High-information, professional. Never sparse, never playful.

**Tone:** Authoritative · Precise · High-stakes · Never generic · Never casual.

---

## 2. Color Tokens

Token format: `--voyager-{name}`. Reference HEX shown for identification only — always use the token in code, never the HEX.

### 2.1 Brand Colors

| Token | HEX | Semantic Role |
|---|---|---|
| `--voyager-color-vault` | `#22005C` | Primary brand color. Full page/body background. Navigation, footer, brand surfaces, primary actions. |
| `--voyager-color-vault-mid` | `#3B1782` | Gradient end point. Links. Interactive states of primary surfaces. |
| `--voyager-color-vault-dark` | `#2E0F70` | Overlays. Hover states on dark surfaces. |
| `--voyager-color-live` | `#ED8936` | Urgency signal. Time pressure. "Happening now." Also used as a promotional surface color. Orange = urgency — never red. |
| `--voyager-color-negotiable` | `#00CACE` | Negotiable / available. Interactive highlights. Informational accent. |

**Vault Gradient:** `linear-gradient(135deg, #22005C 0%, #3B1782 100%)`
Role: Primary brand surface. Use on high-prominence structural elements.

### 2.2 Surface Hierarchy

Three levels. Never skip levels — elevation communicates importance.

| Token | HEX | Level | Role |
|---|---|---|---|
| `--voyager-surface-page` | `#F8FAF9` | 0 — Base | Content container background. Sits on top of the vault body. |
| `--voyager-surface-section` | `#F2F4F3` | 1 — Mid | Sub-areas and grouped zones within the content container. |
| `--voyager-surface-card` | `#FFFFFF` | 2 — Top | Foreground elements that float above their container: cards, modals, inputs, popovers. |

### 2.3 Text Colors

| Token | Value | Role |
|---|---|---|
| `--voyager-text-primary` | `#191C1C` | Main content. Never pure black. |
| `--voyager-text-secondary` | `#494550` | Supporting content, body text. |
| `--voyager-text-muted` | `#494550` at 50% | Subdued labels, secondary metadata. |
| `--voyager-text-label` | `#494550` at 40% | Form labels, fine metadata. |
| `--voyager-text-tertiary` | `#99A1AF` | Lowest-hierarchy text — reference labels, units. |
| `--voyager-text-disabled` | `#4A5565` | Text on disabled elements. |
| `--voyager-text-on-dark` | `#FFFFFF` | Text on dark (vault) surfaces. |
| `--voyager-text-on-dark-muted` | `#FFFFFF` at 60% | Secondary text on dark surfaces. |
| `--voyager-text-on-dark-subtle` | `#FFFFFF` at 30% | Tertiary text on dark surfaces. |
| `--voyager-text-link` | `#3B1782` | Clickable links. |

### 2.4 Status Colors

| Token | HEX | Role |
|---|---|---|
| `--voyager-status-success` | `#22C55E` | Confirmed, completed, positive outcome. |
| `--voyager-status-warning` | `#FFA000` | Attention required. Near threshold. |
| `--voyager-status-error` | `#BA1A1A` | Failed, rejected, invalid. Red = error only — never urgency. |
| `--voyager-status-info` | `#00CACE` | Neutral informational message. |
| `--voyager-status-live-dot` | `#EF4444` | Broadcasting indicator only (animated dot). Not urgency. |

### 2.5 Utility Colors

| Token | Value | Role |
|---|---|---|
| `--voyager-border-ghost` | `#22005C` at 10% | Functional border when background shift alone is insufficient. |
| `--voyager-divider-section` | `#22005C` at 5% | Subtle row/section separator. |
| `--voyager-input-bg` | `#E1E3E2` | Input field fill. No visible border at rest. |
| `--voyager-skeleton` | `#D1D5DC` | Loading states, disabled visual placeholders. |

**Glass effect:** `background: rgba(255,255,255,0.40); backdrop-filter: blur(8px)`
Use only when an element overlays a photographic image and must remain legible.

### 2.6 Interactive State Derivation

Do not create parallel tokens for hover/active. Derive mathematically:

```css
/* Hover — darken on dark surface */
color-mix(in oklch, var(--voyager-color-vault) 85%, oklch(1 0 0))

/* Hover — lighten on light surface */
color-mix(in oklch, var(--voyager-surface-card) 92%, var(--voyager-color-vault))

/* Active / pressed */
oklch(from var(--voyager-color-vault) calc(l - 0.08) c h)
```

---

## 3. Typography

Three typefaces with strictly separate roles. Assign by element function, not by visual preference.

### 3.1 Typeface Decision Rule

```
Is this a number, measurement, code, or identifier —
or any value that may update dynamically?
  → Roboto Mono  +  font-variant-numeric: tabular-nums

Is this body copy, description, metadata, table content,
form helper text, or dense readable prose?
  → Roboto

Is this a heading, label, button text, badge, nav item,
tag, or any UI chrome element?
  → Plus Jakarta Sans
```

When uncertain: Roboto for reading, Jakarta Sans for interaction.

### 3.2 Type Scale

**Plus Jakarta Sans — Headings & UI Chrome**

| Step | Size | Line Height | Weight | Role |
|---|---|---|---|---|
| `display-xl` | 48px | 56px | 700 | Primary hero headline. One per screen maximum. |
| `display-lg` | 40px | 48px | 700 | Secondary hero. Section openers. |
| `display-md` | 32px | 40px | 600 | Large section or modal title. |
| `heading-xl` | 28px | 36px | 600 | Primary page heading. |
| `heading-lg` | 24px | 32px | 600 | Section heading. |
| `heading-md` | 20px | 28px | 600 | Subsection title. |
| `heading-sm` | 18px | 24px | 500 | Widget title. Grouped label. |
| `label-lg` | 16px | 24px | 500 | Button text. Navigation item. |
| `label-md` | 14px | 20px | 500 | Form label. Column header. |
| `label-sm` | 12px | 16px | 500 | Badge text. Tag. Chip. |

**Roboto — Body & Data**

| Step | Size | Line Height | Weight | Role |
|---|---|---|---|---|
| `body-lg` | 18px | 28px | 400 | Lead paragraph. Prominent description. |
| `body-md` | 16px | 24px | 400 | Standard body. Form input value. |
| `body-sm` | 14px | 20px | 400 | Supporting copy. Helper text. |
| `caption` | 12px | 16px | 400 | Footnote. Secondary metadata. |
| `overline` | 10px | 14px | 500 | Category indicator. Always uppercase + letter-spacing +0.08em. |

**Roboto Mono — Numeric & Identifiers**

Always pair with `font-variant-numeric: tabular-nums`.

| Step | Size | Line Height | Weight | Role |
|---|---|---|---|---|
| `numeric-xl` | 40px | 48px | 700 | Prominent primary value. |
| `numeric-lg` | 32px | 40px | 600 | Large secondary value. |
| `numeric-md` | 24px | 32px | 500 | Mid-size value or counter display. |
| `numeric-sm` | 16px | 24px | 400 | Table data. Spec value. |
| `numeric-xs` | 12px | 16px | 400 | Fine identifier. Code fragment. |

### 3.3 Casing Rules

```
UPPERCASE → overline style only (category indicators, `text-transform: uppercase`)
           → preserve if source already has it — do not add it

Mixed case → everything else: headings, body, labels, button text, badge text
           → preserve from source exactly — never transform

Never apply text-transform to content you did not write.
```

---

## 4. Spacing Scale

Base grid: 4px minimum. All block spacing (padding, margin, gap) must be a multiple of 4px.

| Token | Value | When to use |
|---|---|---|
| `space.025` | 2px | Hairline gap. Icon-to-text alignment. |
| `space.050` | 4px | Tight internal gap. Icon padding. Inline spacing. |
| `space.100` | 8px | Base unit. Standard gap between related elements. |
| `space.150` | 12px | Comfortable internal padding in dense containers. |
| `space.200` | 16px | Standard component padding. Grid column gap. |
| `space.300` | 24px | Section horizontal padding. Generous component padding. |
| `space.400` | 32px | Section vertical padding. |
| `space.600` | 48px | Major section separation. |
| `space.800` | 64px | Structural height unit. Large layout gap. |
| `space.1000` | 80px | Wide layout spacing. |
| `space.1200` | 96px | Maximum layout spacing. |

### Icon glyph sizes (`icon.size.*`)

Semantic width/height for SVG icons. Compiled as `--vmc-icon-size-*`; in Tailwind use **`size-icon-*`**, **`w-icon-*`**, **`h-icon-*`** (theme maps them via `--spacing-icon-*`). **Do not** use `space.*` tokens as a stand-in for icon pixel dimensions—`space` is for layout gaps and padding only.

| Token | Value | Typical use |
|---|---|---|
| `icon.size.xs` | 12px (alias `space.150`) | Chevrons, dense metadata, inline with `label-sm` / caption |
| `icon.size.sm` | 16px (alias `space.200`) | Default UI, data tables, nav beside `body-md` |
| `icon.size.md` | 20px | Row emphasis; pairs with `heading-sm` line box |
| `icon.size.lg` | 24px (alias `space.300`) | Section headers, empty states, toolbar beside `label-lg` |

**Touch targets (WCAG 2.5.8):** The glyph may stay small (e.g. `icon.size.sm`). Interactive controls must meet at least **24×24 CSS px** (stricter on mobile)—add transparent padding with `space.050` / `space.100` on the hit target wrapper, not by inflating the SVG alone.

**Snap rule:** Always use the nearest token for **layout** spacing. Do not invent stray px (10px, 15px, 28px, 40px) outside the `space.*` scale. **Exception:** `icon.size.md` is the sanctioned **20px** step for icon glyphs only—not for generic padding or margins.

---

## 5. Border Radius

| Token | Value | When to use |
|---|---|---|
| `radius.none` | 0px | Tables. Data cells. Structural dividers. |
| `radius.sm` | 4px | **Default for almost everything:** cards, inputs, buttons, badges, sections. |
| `radius.md` | 8px | Inner elements nested inside a `radius.lg` container. |
| `radius.lg` | 16px | Modals. Drawers. Large floating panels. |
| `radius.full` | 9999px | Circular elements. Pill badges. |

**Concentric rounding:** Inner radius = Outer container radius − Container padding.
If a container uses `radius.lg` (16px) with 8px padding → inner elements use at most `radius.md` (8px).

---

## 6. Shadows

Exactly two. Do not create new ones.

| Token | Value | When to use |
|---|---|---|
| `shadow.sm` | `0 8px 16px rgba(34,0,92,0.06)` | Resting elevation. Subtle depth on foreground elements. |
| `shadow.md` | `0 8px 16px rgba(0,0,0,0.10)` | Raised elevation. Hover state. Floating panels. Modals. |

---

## 7. Visual Constraints

### Separation
Never use `1px solid` borders to divide content areas. Separation comes from background color level shifts only.
Exception: `--voyager-border-ghost` when a visible edge is functionally required.

### Interactive states
Every interactive element must define:
`Default → Hover → Focus → Active → Disabled → Loading → Error`

Focus ring: `outline: 2px solid var(--voyager-color-vault-mid); outline-offset: 2px`
Never use `box-shadow` for focus — it is clipped by `overflow: hidden`.

Disabled: `opacity: 0.72` + `grayscale(1)`. Do not change the color.

### Color constraints
- Never use `#000000` — use `--voyager-text-primary`
- Never write HEX in code — always reference a `--voyager-` token
- Never use red for urgency — `--voyager-color-live` (orange) is the urgency signal. Red = error only.
- Never use glassmorphism outside image overlay contexts
- Never use colored backgrounds to separate content areas — use surface level shifts

### Typography constraints
- Never use Inter or any font outside this system
- Never create new text styles — use only the locked scale
- Never use a proportional font for numeric values that may update
- Never omit `tabular-nums` on live numeric values

### Spacing constraints
- Never use values not in the **layout** scale (10px, 15px, 28px, 40px, etc.). **`icon.size.md` (20px)** is allowed only for icon glyph dimensions.
- Never use `rem` or `em` — px from the token scale only

---

## 8. Decision Guide — Generating Without a Reference

Use this section when you have no outerHTML and must make visual choices from scratch.

### Color decisions

**When to use `--voyager-color-vault` (deep purple #22005C):**
- Primary brand surfaces: navigation, header, footer, sidebar backgrounds
- Primary action buttons (filled, high prominence)
- Any element that establishes authority or structural hierarchy
- Text on light surfaces that needs maximum brand weight

**When to use `--voyager-color-live` (orange #ED8936):**
- Time-sensitive signals: "happening now", imminent deadlines, urgent status
- Accent on elements requiring immediate user attention
- Live/active state indicators
- Never for errors — that is `--voyager-status-error`

**When to use `--voyager-color-negotiable` (cyan #00CACE):**
- Interactive highlights on light surfaces
- Available / open / negotiable state
- Informational accents (not warnings, not errors)
- Secondary interactive accents when vault would be too heavy

**When to use status colors:**
- Success → confirmed action, positive outcome
- Warning → approaching a limit, soft alert
- Error → failed action, invalid state, rejection
- Info → neutral message, no action required

**When to use surface levels:**
- `vault` → full page/body background — the dark canvas the entire layout sits on
- `surface-page` → content container background — the first light level on top of vault
- `surface-section` → grouped zones within the content container
- `surface-card` → foreground elements that float above their container

**When to use text hierarchy:**
- `text-primary` → main content, headings, primary labels
- `text-secondary` → body copy, supporting text
- `text-muted` → secondary labels, subdued metadata
- `text-label` → form labels, fine detail
- `text-tertiary` → lowest-hierarchy reference text, units, codes
- `text-on-dark` → any text placed on vault/dark surfaces

### Typography decisions

```
Is this the primary action or a UI label?        → Plus Jakarta Sans, label-lg or label-md
Is this a heading or title?                      → Plus Jakarta Sans, heading-*
Is this body text the user reads?                → Roboto, body-md or body-sm
Is this a number, measurement, or identifier?    → Roboto Mono, appropriate numeric-* step
Is this a category indicator above other text?   → Roboto overline, uppercase
```

### Casing decisions

```
UPPERCASE only for:
  - overline-style category indicators (small, above content, Roboto overline)
  - Elements that are already uppercase in the source

Mixed case for everything else:
  - All headings, labels, button text, badge text, navigation
  - Preserve casing from any source material exactly
  - Do not apply text-transform unless the element is an overline
```

### Spacing decisions

```
Inside a tight element (badge, chip, icon button):   space.050 (4px) or space.100 (8px)
Between related items in a group:                    space.100 (8px)
Padding inside a card or container:                  space.150 (12px) or space.200 (16px)
Between cards in a grid:                             space.200 (16px)
Horizontal section padding:                          space.300 (24px)
Vertical section padding:                            space.400 (32px)
Between major page sections:                         space.600 (48px)
```

### Accent border decisions

When an element needs a status accent:
- Use a `4px solid` bottom border as the accent mechanism
- Map the semantic role to the nearest color token:
  - Active / live / urgent → `--voyager-color-live`
  - Available / open / negotiable → `--voyager-color-negotiable`
  - Primary / brand / standard → `--voyager-color-vault`
  - Inactive / disabled / closed → `--voyager-skeleton`

---

## 9. Mode A — Upgrade Workflow (with reference)

When you have a reference — outerHTML, Copy Element, screenshot, or any combination:

1. **Structure is locked.** The reference is the contract. Do not add, remove, reorder, or rename any element. Do not change any text. Do not invent elements that are not in the reference.

2. **Tokenize each color.** For every color in the source, identify its role (is it a brand color? primary text? muted text? urgency? status?) and map it to the nearest `--voyager-` token that serves the same role.

3. **Apply the typeface decision rule** from Section 3 to each text element.

4. **Snap all spacing** to the nearest token in the Section 4 scale.

5. **Preserve all decorative visual properties.** If the source has a bottom border, a circular background, a shadow — keep it. Map its color to the nearest `--voyager-` token. Do not remove visual elements.

6. **Apply radius and separation rules** from Sections 5 and 6.

---

*VOYAGER Design System v2.1.0 — Last updated: 2026-04-28*
