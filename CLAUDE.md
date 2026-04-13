# VOYAGER — VMC Subastas
**AI-Driven · AI-Readable Design System**

## Stack
- Next.js (App Router) · TypeScript estricto · Tailwind CSS v4
- RTK Query (estado async) · Zustand (estado UI)
- Terrazzo (token pipeline) · Tokens Studio (Figma sync)

## Comandos esenciales
```bash
pnpm dev          # desarrollo local
pnpm build        # build producción
pnpm lint         # linter
pnpm type-check   # verificación TypeScript
```

## Arquitectura de memoria (leer en orden)
1. `.claude/rules/design-system.md` → tokens, colores, componentes VMC
2. `.claude/rules/typescript-strict.md` → contrato de código (activa en *.ts, *.tsx)
3. `.claude/rules/tailwind-v4.md` → reglas específicas de Tailwind v4
4. `.claude/rules/agents-governance.md` → constitución del agente (siempre activa)

## Skills disponibles (bajo demanda)
- `ib-maestro` → IB macro del proyecto Voyager
- `ib-taxonomia` → IB fase 1: auditoría y taxonomía
- `ib-fundamentos` → IB fase 2: tokens y gobernanza
- `ib-componentes` → IB fase 3: construcción de componentes
- `ib-handoff` → IB fase 4: handoff a código
- `voyager-frontend` → estándares de código frontend
- `token-optimizer` → técnicas de optimización de contexto y tokens

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
