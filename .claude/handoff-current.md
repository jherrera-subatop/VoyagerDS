# Handoff — 2026-04-17 14:45 — Sesión Jira Audit + Bug Fixes + Sprint Plan

## Proyecto
VMC Subastas — Voyager DS. Stack: Next.js 15 / TypeScript strict / Tailwind v4 / Terrazzo.
Objetivo: UI Upgrade visual total (sin tocar UX flows legacy).

---

## Lo que se completó en esta sesión

### Bugs corregidos
- `src/app/docs/taxonomia/components/TaxonomyComponentCard.tsx`
  - `isUpgrade = mode === "upgrade"` ampliado a `isActiveMode = mode === "upgrade" || mode === "done"`
  - Badge muestra "done" / "upgrade" / "normal" según modo real
  - Amber styling activo en upgrade Y done

- `src/app/docs/taxonomia/components/DetallePageFrame.tsx`
  - Nueva función `resolveZoneInfo(base, componentId, mode)` — lee `upgradeMeasurements` en upgrade/done
  - `HoverZone` llama `useWireMode()` y usa `resolveZoneInfo()` — tooltip siempre correcto
  - Fix automático para cualquier componente futuro con `upgradeMeasurements`

### Infraestructura
- `src/app/api/source/[component]/route.ts` — API route sirve .tsx como text/plain
- `src/app/docs/components/ComponentHandoffShared.tsx` — CodeBlock, SectionHeading, SourceSection
- `src/app/docs/components/FooterDoneHandoffPanel.tsx` — refactorizado (SourceSection via API, accordion abierto por defecto)
- `src/app/docs/components/FooterDoneShowcaseSection.tsx` — HandoffPanel solo en modo "done"
- `.claude/skills/voyager-component-done/SKILL.md` — cookbook completo NORMAL→DONE

### Jira organizado (13 acciones ejecutadas)
- VD-3 (ib-componentes) → En curso
- VD-4 (ib-handoff) → En curso
- VD-40 (Header) → En curso (desbloqueado)
- VD-41 (Sidebar) → En curso (desbloqueado)
- VD-50 (BUG taxonomy medidas) → Finalizada
- Sprint 1 + Sprint 2 plan en comentarios de VD-3
- Roadmap en VD-30, VD-32, VD-33, VD-40, VD-41, VD-1

### Scripts arreglados
- `scripts/jira-ops-agent/read-state.mjs` — "Tareas por hacer" → "Backlog" (columna real en Jira)
- `scripts/jira-ops-agent/sync.mjs` — phaseJiraStatus usa "Backlog" para todo
- `ib-componentes` + `ib-handoff` → `in-progress` en read-state.mjs

---

## Estado del board Jira

| Ticket | Estado | Descripción |
|--------|--------|-------------|
| VD-1 | En curso | ib-taxonomia (detalle completo, falta listing+home) |
| VD-2 | Finalizada | ib-fundamentos |
| VD-3 | En curso | ib-componentes Sprint 1 activo |
| VD-4 | En curso | ib-handoff (Footer pilot operativo) |
| VD-5 | Backlog | ib-optimization (renombrar a ib-looping) |
| VD-33 | En curso | Handoff y entrega |
| VD-39 | Finalizada | FooterDone |
| VD-40 | En curso | Header desbloqueado |
| VD-41 | En curso | Sidebar desbloqueado |
| VD-50 | Finalizada | BUG medidas taxonomy resuelto |

---

## Sprint 1 — Primera mitad Detalle (11 componentes — PRIORIDAD AHORA)

```
P0 — Fundacion (otros dependen de estos):
  1. btn            → ButtonDone.tsx
  2. display-price  → PriceDisplayDone.tsx
  3. input          → InputDone.tsx

P1 — Shell de pagina:
  4. header-primary → HeaderDone.tsx
  5. sidebar        → SidebarDone.tsx (depende de header)
  6. title-bar      → TitleBarDone.tsx

P2 — Contenido principal:
  7. image-gallery           → ImageGalleryDone.tsx
  8. table-specs             → VehicleSpecsDone.tsx
  9. indicator-data-quality  → DataQualityDone.tsx
 10. conditions-accordion    → AccordionDone.tsx
 11. description-block       → DescriptionBlockDone.tsx
```

Workflow: `/voyager-component-done <Nombre>` — skill en `.claude/skills/voyager-component-done/SKILL.md`

---

## Sprint 2 — Segunda mitad (10 componentes, despues de Sprint 1)

```
Auction widget: bid-widget-header, option-tags, promo-banner
Secundarios: display-metrics, document-downloads, help-center-banner
Transversales: card-auction, subascoins-promo, nav-primary, icon
```

---

## Proximo paso — empieza aqui

**Construir Button (btn) — P0 mas simple, base de todo.**
```bash
# En nueva sesion:
python3 scripts/voyager-jira-sync.py --status   # ver board
pnpm dev                                         # http://localhost:3420
# Luego: /voyager-component-done Button
```

---

## Decisiones arquitectonicas (no estan en el codigo)

- Container queries en TODOS los Done — Tailwind lg: no funciona en viewport switcher del DS
- API route /api/source/[component] — source servido en runtime, no embebido en bundle
- ib-frames trigger — automatico cuando TODOS los componentes de un frame tienen Done en taxonomy
- ib-looping — fase continua post-frames, versiones v1/v2 optimizadas SEO/GEO
- VD-5 ib-optimization no existe como fase — renombrar a ib-looping cuando llegue
- VD-34 Playwright bot — ALTA prioridad, pero despues de Sprint 1

---

## Archivos clave (leer en orden)

1. `.claude/skills/voyager-component-done/SKILL.md` — workflow completo
2. `src/features/Footer/FooterDone.tsx` — referencia de implementacion
3. `src/app/docs/components/FooterDoneHandoffPanel.tsx` — referencia HandoffPanel
4. `src/app/docs/taxonomia/_data/taxonomy-components.ts` — specs por componente
5. `COMPONENTS_PRIORITY.md` — orden Sprint 1 y Sprint 2
