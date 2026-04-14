# VOYAGER — VMC Subastas
**AI-Driven · AI-Readable Design System**

## Stack
- Next.js (App Router) · TypeScript estricto · Tailwind CSS v4
- RTK Query (estado async) · Zustand (estado UI)
- Terrazzo (token pipeline) · Tokens Studio (Figma sync)

## Comandos esenciales
```bash
pnpm dev          # desarrollo local → http://localhost:3420 (script fijo; otro puerto: pnpm exec next dev -p <puerto>)
pnpm dev:turbo    # opcional: Turbopack (rápido; si algo falla, borrar .next y usar pnpm dev)
pnpm build        # build producción
pnpm lint         # linter
pnpm type-check   # verificación TypeScript
pnpm verify:pages # build + next start + GET rutas críticas (no dejar páginas rotas)
```

## Arquitectura de memoria (leer en orden)
1. `.claude/rules/design-system.md` → tokens, colores, componentes VMC
2. `.claude/rules/typescript-strict.md` → contrato de código (activa en *.ts, *.tsx)
3. `.claude/rules/tailwind-v4.md` → reglas específicas de Tailwind v4
4. `.claude/rules/agents-governance.md` → constitución del agente (siempre activa)

**Docs al día (Cursor MCP Context7):** antes de patrones no triviales en Next.js / React / Tailwind / RTK Query, consultar documentación vía Context7; combinar con `pnpm verify:pages` al tocar rutas. Ver `.cursor/rules/voyager-context7-docs-first.mdc`.

## Skills disponibles (bajo demanda)
- `ib-maestro` → IB macro del proyecto Voyager
- `ib-taxonomia` → IB fase 1: auditoría y taxonomía
- `ib-fundamentos` → IB fase 2: tokens y gobernanza
- `ib-componentes` → IB fase 3: construcción de componentes
- `ib-handoff` → IB fase 4: handoff a código
- `voyager-frontend` → estándares de código frontend
- `token-optimizer` → técnicas de optimización de contexto y tokens
- `ds-token-audit` → auditoría tokens + Terrazzo + CSS + DESIGN.md (procedimiento + prompts Deep Research)
- `voyager-runtime-verify` → antes de cerrar: `pnpm verify:pages` (HTTP real tras build)

En **Cursor**: `.cursor/rules/voyager-ds-token-audit.mdc` (tokens/Terrazzo/docs) y `.cursor/rules/voyager-context7-docs-first.mdc` (Next/React/stack + verify tras cambios en app).

## Estructura de features
```
src/features/[NombreFeature]/
  index.ts
  [NombreFeature].tsx
  styles.ts
  constants.tsx
  types.ts
  use[NombreFeature]Logic.ts   ← si lógica > 20 líneas
```

## Protocolo de Salida Directa (RESTRICCIÓN ABSOLUTA)
- NUNCA resumir contexto recuperado ni replantear instrucciones del prompt
- NUNCA explicar el código antes de escribirlo ni después de escribirlo
- NUNCA emitir saludos, confirmaciones conversacionales ni frases de cierre
- La respuesta consiste EXCLUSIVAMENTE en bloques de código funcional + comentarios estructurales mínimos
- Si se debe reportar un estado: una línea, imperativa, sin narrativa

## Optimización de contexto (sesiones largas)
- No re-leer archivos ya leídos en la sesión salvo que hayan podido cambiar
- Ignorar archivos > 100 KB salvo solicitud explícita
- Sugerir `/cost` cuando la sesión se extiende para monitorear el cache ratio
- Recomendar nueva sesión al cambiar a una tarea completamente no relacionada

## Reglas de oro (invariables)
- NUNCA any en TypeScript
- NUNCA ternarios — if/else o &&
- NUNCA HEX en componentes — siempre var(--token)
- NUNCA modificar archivos fuera del dominio autorizado sin aprobación
- SIEMPRE leer DESIGN.md antes de crear o editar un componente visual
- SIEMPRE ejecutar en modo Plan antes de implementar cambios estructurales

## Contexto del proyecto
VMC Subastas — plataforma transaccional de subastas de vehículos de alto valor, Perú.
UI Upgrade total (Voyager): modernización de capa visual únicamente.
UX flows y UX writing del legacy se mantienen INTACTOS.

## Insumo Claude Code / IB (roadmap)
- [`VOYAGER_CLAUDE_CODE.md`](./VOYAGER_CLAUDE_CODE.md) — gobernanza Ruta B, criterios de cierre por marco, instrucciones operativas para agentes.
- [`COMPONENTS_PRIORITY.md`](./COMPONENTS_PRIORITY.md) — orden sugerido de implementación ib-componentes (marco Detalle).
