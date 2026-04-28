# VOYAGER — Frame Layout Specification
**Extension of DESIGN.md · For full web page / frame generation only**

---

## SCOPE

This document extends `DESIGN.md` with page-level layout dimensions.

**Use this file when:** generating or upgrading a complete web page frame (full layout with navigation, content area, footer).

**Do NOT use this file when:** upgrading a single component, building a document, designing a card, or any context that is not a full web page layout. Use `DESIGN.md` alone in those cases.

**Always attach both files together** when this one applies — this document does not repeat the token definitions from `DESIGN.md`.

---

## Page Layout Structure

**Max width:** 1024px centered
**Body background:** `--voyager-surface-section` (#F2F4F3)

```
┌────────────────────────────────────────────────┐
│  Header — 768×64px  (right panel only)         │
├──────────┬─────────────────────────────────────┤
│          │                                     │
│ Sidebar  │  Content Area                       │
│ 256px    │  768px                              │
│ dynamic  │                                     │
│ height * │                                     │
│          │                                     │
├──────────┴─────────────────────────────────────┤
│  Footer — 1024×379px  (full width)             │
└────────────────────────────────────────────────┘
```

*Sidebar height = full viewport height minus footer (379px). Sidebar terminates exactly where footer begins.

### Zone dimensions

| Zone | Width | Height | Background |
|---|---|---|---|
| Sidebar | 256px | dynamic (full height − 379px) | `--voyager-color-vault` |
| Header | 768px | 64px | `--voyager-color-vault` |
| Content area | 768px | dynamic | `--voyager-surface-page` |
| Footer | 1024px | 379px | `--voyager-color-vault` |

### Layout constraints

- Logo lives in the sidebar brand area (top 64px of sidebar), not in the header
- Header contains: left — breadcrumb or page title; right — utility icons + avatar
- Footer spans full 1024px width — it is not split by the sidebar column
- Sidebar collapses to 48px icon-only at tablet (768px–1023px)
- Sidebar hides behind a drawer at mobile (< 768px)
- All text on vault-background zones uses `--voyager-text-on-dark` tokens

---

*VOYAGER Design System v2.1.0 — DESIGN-FRAMES.md — Last updated: 2026-04-28*
