# Handoff — 2026-05-02 — Sesión Colaboración GitHub + PriceIcon Figma

## Proyecto
VMC Subastas — Voyager DS. Stack: Next.js 15 / TypeScript strict / Tailwind v4 / Terrazzo.
Objetivo: UI Upgrade visual total (sin tocar UX flows legacy).

---

## Lo que se completó en esta sesión

### GitHub Colaboración (Aaron onboarding)
- `.github/CODEOWNERS` — tokens.json, terrazzo.config.mjs, package.json, next.config.ts, .claude/ → owner: @jherrera-subatop
- `.devcontainer/devcontainer.json` — Node 22 + pnpm, puerto 3420, VS Code extensions, listo para Codespaces
- `.github/pull_request_template.md` — checklist DS: no HEX, no any, type-check, rama < 48h
- Branch ruleset `main` activado en GitHub — PR obligatorio + 1 aprobación + CODEOWNERS + dismiss stale
- Aaron (apuherrerafo) invitado como colaborador con rol Write — invitación pendiente de aceptar
- CodeRabbit instalado y conectado al repo — revisa PRs automáticamente
- PR de auditoría completa abierto: `audit/coderabbit-full-review` — pendiente de revisión

### Figma Context page (3:4) — sesión anterior
- OfferCard COMPONENT_SET (id: 115:145) — 8 variantes en-vivo×5 + negociable×3, 176×232
- FavoriteIcon COMPONENT_SET — 4 estados (default/pressed/expirado/skeleton), 32×32
- PriceIcon COMPONENT_SET — 3 estados (default/expirado/skeleton), 24×24
  - Fix crítico: V/H commands → L explícitos, bezier inválido corregido, path order invertido para Figma
- Doc frames con headers, column labels, row labels para los 3 componentes

### QuickFilters @figma-spec
- Tokens corregidos --voyager-* → --vmc-*
- Root fill corregido: vaultMid (dark) → surfaceSection (light)
- OfferCard → OfferTypeTile en subcomponents

---

## Estado del board Jira

| Ticket | Estado | Descripción |
|--------|--------|-------------|
| VD-30 | En curso | DS Pipeline — construcción e IB Flow |
| VD-31 | En curso | QA y Validación Visual |
| VD-32 | En curso | Automatización y Agentes |
| VD-33 | En curso | Handoff y Entrega de Componentes |
| VD-34 | Agent Queue | GAP-1: Playwright capture + SQLite canonical store |
| VD-35 | Agent Queue | GAP-2: feedback-log.json schema |
| VD-36 | Backlog | GAP-3: Stitch link + Figma copy button |
| VD-37 | Backlog | GAP-4: Feedback agent pre-Stitch |
| VD-38 | Backlog | GAP-5: Playwright Component Monitor Bot |
| VD-39 | Finalizada | Footer pipeline completo |
| VD-40 | En curso | Header: pipeline completo + Figma design |
| VD-41 | Finalizada | Sidebar pipeline completo |
| VD-42 | Backlog | Scheduled agents nocturnos |
| VD-43 | Finalizada | Wireframes PageFrame actualizados |

---

## Ticket activo — VD-40 Header

Siguiente componente a construir y pushear a Figma.

---

## Próximo paso — empieza aquí

1. Verificar que PriceIcon quedó bien en Figma (usuario no confirmó visualmente)
2. Si OK → continuar con Header (VD-40)
3. Si no OK → reparar PriceIcon con shapes básicos (ellipse para coin, text para $)

```bash
python3 scripts/voyager-jira-sync.py --status
pnpm dev   # http://localhost:3420
```

---

## Setup de colaboración — pendiente completar

1. Aaron acepta invitación GitHub (email a apuherrerafo)
2. Aaron instala Claude Code en su laptop
3. Aaron clona: `git clone https://github.com/jherrera-subatop/VoyagerDS.git`
4. Workflow de Aaron: branch `feat/VD-XX-nombre` → PR → CodeRabbit revisa → Julio aprueba

---

## Decisiones que NO están en el código

- CSS generado por Terrazzo NO se commitea — se genera en CI (evita diffs masivos)
- CodeRabbit en plan Free — revisa y comenta, NO bloquea merge automáticamente
- Agent Teams disponible pero NO recomendado para trabajo diario — consume 3x tokens
- Branch ruleset en main solamente — develop se crea cuando Aaron empiece
- PriceIcon: Figma reversa el orden de paths SVG (primer path = topmost layer)
- Tokens --voyager-* son HEX fallbacks falsos — usar siempre --vmc-* de Terrazzo

---

## Archivos clave (leer en este orden)

1. `.claude/handoff-current.md` — este archivo
2. `.github/CODEOWNERS` — quién aprueba qué
3. `.devcontainer/devcontainer.json` — entorno Aaron
4. `src/features/QuickFilters/QuickFilters.tsx` — @figma-spec corregido (referencia)
5. `.claude/figma-push-ref.md` — protocolo Figma push (tokens, single-call)
6. `COMPONENTS_PRIORITY.md` — orden Sprint 1 y Sprint 2

## Comandos para retomar

```bash
python3 scripts/voyager-jira-sync.py --status
pnpm type-check
pnpm dev
```
