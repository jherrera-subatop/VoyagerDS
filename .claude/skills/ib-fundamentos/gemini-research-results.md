# Gemini Deep Research — Resultados
**Fecha:** 2026-04-13
**Input:** gemini-research-prompt.md (27 preguntas, 7 bloques)
**Usado para:** Construir ib-fundamentos con soluciones concretas

---

## DECISIONES ARQUITECTÓNICAS CLAVE EXTRAÍDAS

### Token Pipeline
- `$value` OKLCH como string CSS nativo: `"oklch(60% 0.15 250)"` — Terrazzo lo pasa directo sin degradar a HEX
- Tokens semánticos referencian primitivos con sintaxis: `"{color.brand.500}"`
- Terrazzo genera: `--color-brand-500: oklch(60% 0.15 250);`
- Múltiples outputs via instancias del plugin CSS con `include` filters
- Build integration: scripts `predev` y `prebuild` en package.json — NO en next.config.ts

### Tailwind v4
- Directiva `@theme` mapea CSS vars de Terrazzo a utilidades de Tailwind
- Opacity modifiers (`bg-primary/50`) requieren namespace `--color-*` correcto o fallan silenciosamente
- `tailwind-merge` v3.5.0+ compatible con Tailwind v4 — usar `extendTailwindMerge` para colores semánticos custom
- Exportar `cn()` como conector unificado de `clsx` + `extendTailwindMerge`

### RTK Query + App Router
- Server Components: fetch nativo async — NUNCA RTK Query
- Client Components: RTK Query hooks — SIEMPRE 'use client'
- Redux Store: `makeStore()` function (NO variable global) — previene filtración entre sesiones SSR
- Provider: `StoreProvider.tsx` con `useRef` para asignación única
- Interceptor: patrón **Mutex** (async-mutex) para prevenir tormenta de refresh paralelos en 401
- Auth validation en rutas: **middleware.ts** en Edge Runtime — NO en Redux client-side

### Zustand
- `createStore` de `zustand/vanilla` (NO `create` global) — previene hydration mismatch
- Context Provider pattern: `useState(() => createModalStore())` — preserva instancia única
- Hook wrapper: `useModalStore` con error si no está en provider
- Separación estricta: RTK Query = datos de red/async, Zustand = estado UI efímero (modals, filtros, auth UI)

### Feature Architecture
- `src/app/` = coordinadores de rutas únicamente (page.tsx importa features)
- `src/features/<nombre>/` = toda la lógica operacional
- `src/components/ui/` = átomos agnósticos al negocio
- `src/stores/` = Zustand stores + Redux store
- `src/providers/` = StoreProvider, ModalStoreProvider
- `src/lib/` = cn(), utils, interceptores
- Barrel exports: exportaciones nominativas explícitas (NO re-exports de default) — tree-shaking

### TypeScript Strict
- Server Component props: solo tipos serializables (no funciones, no instancias complejas)
- Eventos: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.FormEvent<HTMLFormElement>`
- `error.tsx`: no atrapa errores de `layout.tsx` colindante
- `unstable_retry()` para errores de servidor (recalcula SSR), `reset()` para errores de cliente

### OKLCH + APCA
- Escala: pasos decimales del 50 al 900
- Contraste APCA: Lc~90 microtipografía, Lc~75 texto continuo, Lc~60 CTAs/bloques
- Herramientas: Accessible Palette (APCA nativo), Atmos, Huetone
- Flujo: diseñar en herramienta → validar APCA → exportar → tokens.json → Terrazzo → CSS

---

## RESEARCH COMPLETO (texto íntegro de Gemini)

[Ver documento original compartido en sesión 2026-04-13]

### Bloque 1: Token Pipeline
- Estructura tokens.json DTCG con ejemplos de color, tipografía, spacing, radius, shadows
- terrazzo.config.mjs con 3 outputs (primitives, semantics-light, semantics-dark)
- predev/prebuild scripts en package.json

### Bloque 2: Tailwind v4 + Terrazzo
- globals.css con @import + @theme mapping completo
- cn() helper con extendTailwindMerge para colores semánticos
- Limitación opacity modifiers documentada

### Bloque 3: RTK Query + App Router
- makeStore() pattern + StoreProvider con useRef
- baseQueryWithReauth completo con Mutex (async-mutex)
- middleware.ts para auth validation en Edge Runtime

### Bloque 4: Zustand App Router
- createModalStore con createStore/vanilla
- ModalStoreProvider con useState factory
- useModalStore hook con error boundary

### Bloque 5: Feature Architecture
- Estructura de directorios completa
- Named exports en index.ts para tree-shaking

### Bloque 6: TypeScript Strict
- Tipado de eventos React completo
- error.tsx con unstable_retry + reset

### Bloque 7: OKLCH + APCA
- Tabla de umbrales Lc por contexto UI
- Workflow: Accessible Palette → tokens.json → Terrazzo → Tailwind v4
