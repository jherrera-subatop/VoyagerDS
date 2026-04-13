---
name: ib-fundamentos
description: IB Fase 2 de Voyager — Infraestructura de Tokens y Estado. Carga este skill para obtener el contexto completo de la fase de fundamentos. Prerequisito: ib-taxonomia con TAXONOMY.md al menos en iteración 1. Output de esta fase: tokens.json + tokens.css + cn() helper + Store providers — únicos inputs válidos para ib-componentes.
type: reference
project: VMC Subastas — VOYAGER (Fase 2: Fundamentos)
captured: 2026-04-13
revised: 2026-04-13
context: IB de la fase de infraestructura de tokens y estado de Voyager. Cubre el pipeline Terrazzo → DTCG → OKLCH → Tailwind v4, la capa de estado (RTK Query + Zustand en Next.js 15 App Router) y la arquitectura feature-based. Construido con base en Gemini Deep Research de 27 preguntas técnicas.
---

# IB FUNDAMENTOS — VOYAGER FASE 2
**VMC Subastas · Infraestructura de Tokens y Estado · STATUS: VALIDATED ✓**

---

## KICKOFF

```
CODE NAME:    VOYAGER FUNDAMENTOS
WHY:          Sin tokens DTCG compilados, sin providers de estado correctos
              y sin la arquitectura feature-based establecida, cada
              componente que se construya en ib-componentes va a hardcodear
              valores, generar hydration mismatches o contaminar el estado
              entre sesiones. Los fundamentos son la capa que hace que todo
              lo que viene después funcione sin deuda.
SCOPE:        Fase 2 de Voyager — infraestructura únicamente.
              Sin componentes de UI. Sin páginas. Sin features de negocio.
              Output: pipeline de tokens funcional + capa de estado lista.
PREREQUISITO: ib-taxonomia con TAXONOMY.md iteración 1 completa
INPUT:        Gemini Deep Research (27 preguntas, 7 bloques resueltos)
              design-system.md + frontend-lineamientos.md
OUTPUT:       tokens.json · terrazzo.config.mjs · tokens.css (3 archivos)
              globals.css con @theme · cn() helper · makeStore() · providers
```

---

## PHASE 1 — INTENTION MATRIX

### Necessity

Voyager necesita una capa de tokens compilados antes de que se construya un solo componente. Sin ella, cada componente que un agente produzca va a elegir valores arbitrarios — un color hardcodeado en un componente base contamina todos los que lo usan, y ese tipo de deuda se acumula silenciosamente hasta que el sistema entero está comprometido.

El problema tiene dos dimensiones. La primera es técnica: el stack elegido (Terrazzo + Tailwind v4 CSS-first + OKLCH + DTCG) tiene fricciones de integración documentadas que invalidan patrones heredados de Tailwind v3. La segunda es estructural: RTK Query y Zustand en Next.js 15 App Router requieren patrones específicos de inicialización para no generar hydration mismatches ni filtrar estado entre sesiones de servidor concurrentes. Sin resolver estas dos dimensiones antes de construir, ib-componentes empieza sobre arena.

### Supposition

Con el pipeline de tokens operativo y la capa de estado correctamente inicializada, cada agente que construya un componente en ib-componentes consume tokens desde variables CSS, gestiona estado sin riesgo de hydration mismatch y opera dentro de una arquitectura feature-based predecible. Los fundamentos no producen UI visible — producen el entorno en el que la UI se puede construir correctamente.

### Challenges & Solutions

#### CHALLENGE A — Pipeline de tokens con fricciones de integración no documentadas en tutoriales estándar

El stack Terrazzo + Tailwind v4 + OKLCH tiene decisiones de implementación que los tutoriales estándar no cubren. El valor OKLCH debe definirse como string CSS nativo en `$value` — si se usa objeto con matrices de componentes, Terrazzo no genera CSS válido para Tailwind v4. Los tokens semánticos que referencian primitivos usan la sintaxis `"{color.brand.500}"` — cualquier otra forma rompe la resolución de AST. Los múltiples archivos de output (primitivos separados de semánticos por modo) requieren instancias separadas del plugin CSS en terrazzo.config.mjs. Y el pipeline debe ejecutarse via `predev`/`prebuild` en package.json — delegarlo a next.config.ts genera fallos de compilación porque Lightning CSS evalúa imports antes de que Terrazzo genere los archivos.

**Solution:** tokens.json con estructura DTCG validada (colores primitivos + semánticos, tipografía, spacing, radius, shadows) y terrazzo.config.mjs con 3 outputs (tokens-primitives.css, tokens-semantics-light.css, tokens-semantics-dark.css). Scripts `predev` y `prebuild` en package.json garantizan que los archivos existen en disco antes de que Next.js evalúe dependencias de CSS.

#### CHALLENGE B — Tailwind v4 CSS-first rompe el mapeo de tokens sin namespace correcto

Tailwind v4 elimina tailwind.config.js y expone la configuración a través del bloque `@theme` en el CSS principal. El mapeo de CSS custom properties de Terrazzo a utilidades de Tailwind requiere que los nombres de variables sigan el namespace exacto que Tailwind espera — si el namespace es incorrecto, las clases utilitarias se generan vacías sin error visible. El caso más crítico son los opacity modifiers (`bg-primary/50`): si la variable no tiene el prefijo `--color-*` correcto, la función `color-mix()` de Tailwind v4 falla silenciosamente. Adicionalmente, `tailwind-merge` necesita ser extendido con los colores semánticos custom o colisiona en la resolución de precedencia.

**Solution:** globals.css con `@import` de los 3 archivos de Terrazzo + bloque `@theme` con mapeo explícito de cada variable. Conector `cn()` en `src/lib/utils/style.ts` que combina `clsx` + `extendTailwindMerge` con los colores semánticos registrados. Este conector es el único punto de lógica condicional de estilos en todo el proyecto.

#### CHALLENGE C — RTK Query filtra estado entre sesiones en App Router sin el patrón correcto

RTK Query fue diseñado para entornos client-side. En Next.js 15 App Router, si el Redux Store se inicializa como variable global (el patrón por defecto de la documentación), el estado persiste entre solicitudes concurrentes en el servidor, cruzando datos de sesión entre usuarios distintos. Este es un bug de seguridad, no solo de rendimiento. Además, si las validaciones de rutas protegidas se implementan en Redux client-side, generan un destello visual donde el usuario autenticado ve brevemente la pantalla de login antes de que el estado rehidrate — porque Redux inicializa vacío en el cliente antes de leer las cookies.

**Solution:** `makeStore()` como función de construcción (no variable global) — crea una instancia pura por solicitud. `StoreProvider.tsx` con `useRef` garantiza una única instancia por árbol de componentes. Auth validation en `middleware.ts` (Edge Runtime) — evalúa cookies antes del router, sin tiempo diferencial de hidratación. Interceptor con patrón Mutex (`async-mutex`) previene tormenta de refresh paralelos cuando múltiples peticiones concurrentes reciben 401 simultáneamente.

#### CHALLENGE D — Zustand genera hydration mismatches con el patrón de inicialización estándar

El patrón `create()` de Zustand exporta un store global. En Next.js 15 App Router, este store es compartido entre el renderizado de servidor y el cliente, produciendo discrepancias de estado que React reporta como hydration mismatches. El síntoma más común: el estado inicial del servidor y el del cliente difieren porque el cliente tiene acceso a APIs del navegador (localStorage, cookies) que el servidor no tiene, y Zustand intenta leerlos durante SSR.

**Solution:** `createStore` de `zustand/vanilla` como función generadora (no export global) + Context Provider pattern con `useState(() => createStore())` como factory — garantiza una instancia nueva por árbol sin re-inicializaciones en re-renders. Hook `useModalStore` con error boundary si el componente está fuera del provider. Separación estricta de responsabilidades: RTK Query monopoliza datos de red y cache, Zustand solo gestiona estado UI efímero (modals, filtros, notificaciones, auth UI state).

#### CHALLENGE E — La arquitectura feature-based debe coexistir con App Router sin romper tree-shaking

`src/app/` es el directorio de enrutamiento de Next.js — no puede ignorarse. Pero meter toda la lógica de features directamente en `src/app/` produce un árbol inmanejable. Barrel exports clásicos (`export * from`) en archivos `index.ts` parecen una solución limpia pero Turbopack/Webpack evalúa el árbol completo del módulo aunque solo se importe un componente, rompiendo code-splitting. Y los componentes atómicos (`src/components/ui/`) deben seguir siendo Server Components por defecto para maximizar FCP — solo se elevan a Client Components cuando necesitan estado o event handlers del DOM.

**Solution:** `src/app/` = coordinadores de rutas únicamente (page.tsx importa features, layout.tsx envuelve providers). `src/features/<nombre>/` = toda la lógica operacional autocontenida. Barrel exports con exportaciones nominativas explícitas (no re-exports de default) — tree-shaking correcto. Componentes en `src/components/ui/` como Server Components por defecto, `'use client'` solo cuando el componente necesita `useState` o event handlers.

### Hypothesis

Cuando ib-fundamentos concluye, Voyager tiene una infraestructura de construcción completa: tokens DTCG compilados en CSS con pipeline automatizado, Tailwind v4 consumiendo esos tokens correctamente, estado de red y UI inicializados sin riesgo de hydration mismatch, y arquitectura feature-based lista para recibir componentes. El primer componente que un agente construya en ib-componentes puede consumir `var(--semantic-bg-primary)`, llamar `cn()` para lógica condicional de estilos, usar un RTK Query hook en un Client Component y saber exactamente en qué carpeta vive — sin tomar ninguna decisión de infraestructura.

---

## PHASE 2 — PURPOSE PYRAMID

### Task Base

```
TASK A — Construir el pipeline de tokens completo
          tokens.json (DTCG + OKLCH) → terrazzo.config.mjs
          (3 outputs: primitivos + semánticos light/dark) →
          tokens-primitives.css + tokens-semantics-light.css +
          tokens-semantics-dark.css. Scripts predev/prebuild
          en package.json. Validar que Terrazzo corre y genera
          los 3 archivos antes de next dev.

TASK B — Conectar tokens a Tailwind v4 y exponer cn()
          globals.css con @import de los 3 archivos de Terrazzo
          + bloque @theme con mapeo completo de colores, tipografía
          y spacing. Conector cn() en src/lib/utils/style.ts
          (clsx + extendTailwindMerge con semánticos registrados).
          Validar que bg-primary/50 genera CSS correcto.

TASK C — Implementar capa RTK Query production-ready
          ▲ KEYSTONE
          makeStore() function + StoreProvider con useRef +
          baseQueryWithReauth con Mutex (prepareHeaders + retry
          + refresh token + auto-logout en 401 sin release) +
          middleware.ts para auth validation en Edge Runtime.
          Validar que múltiples peticiones 401 simultáneas no
          generan tormenta de refresh.

TASK D — Implementar capa Zustand sin hydration mismatch
          createStore (zustand/vanilla) + ModalStoreProvider
          con useState factory + useModalStore hook con error
          boundary. Validar que no hay hydration mismatch en
          next dev con estado inicial.

TASK E — Establecer la arquitectura de directorios y validar
          el entorno completo
          Crear la estructura src/features/ + src/components/ui/
          + src/stores/ + src/providers/ + src/lib/. Validar
          que un componente atómico de prueba consume tokens,
          usa cn(), vive en src/components/ui/ y es importado
          correctamente desde src/features/. La fase NO termina
          hasta que este componente de prueba funcione end-to-end.
```

### Objectives

```
── SECTION A ──────────────────────────────────────────────────

OBJECTIVE 1 [Tasks A → B]
El pipeline de tokens está operativo — tokens.json compilado por
Terrazzo genera 3 archivos CSS que Tailwind v4 consume correctamente
a través del bloque @theme, con cn() disponible en toda la app.
Ningún valor de color, tipografía o spacing está hardcodeado en
ningún archivo del proyecto.

OBJECTIVE 2 [Tasks B → C] ▲ KEYSTONE BRIDGE
La capa de estado está lista — RTK Query con makeStore() + interceptor
Mutex + middleware.ts de auth, y Zustand con patrón vanilla/Context.
Los agentes de ib-componentes pueden llamar hooks de datos y UI sin
riesgo de hydration mismatch ni filtración de estado entre sesiones.

── SECTION B ──────────────────────────────────────────────────

OBJECTIVE 3 [Tasks C → D]
RTK Query y Zustand coexisten sin colisión de responsabilidades —
la separación datos de red vs estado UI está enforced por arquitectura,
no solo por convención.

OBJECTIVE 4 [Tasks D → E]
La arquitectura de directorios está establecida y validada con un
componente de prueba funcional end-to-end. ib-componentes puede
comenzar sin tomar ninguna decisión de infraestructura.
```

### Responsibilities

```
RESPONSABILIDAD X [Section A | Central Task: C]
Garantizar que la capa de estado sea production-safe desde el primer
día — sin filtración de sesiones, sin tormenta de refresh, sin
hydration mismatches. El interceptor y los providers deben estar
validados antes de que un solo componente los consuma.

RESPONSABILIDAD Y [Section B | Central Task: E]
Garantizar que la arquitectura de directorios y el componente de
prueba end-to-end validen que tokens + estilos + estado funcionan
juntos — no en aislamiento. Si el componente de prueba falla,
la fase no termina.
```

### Purpose

```
Establecer la infraestructura invisible de Voyager — el pipeline de
tokens que hace que cada componente hable el mismo idioma visual,
y la capa de estado que hace que cada componente opere sin riesgo.
Los fundamentos no son visibles en producción, pero sin ellos nada
de lo que viene después puede construirse sin deuda.
```

---

## VALIDACIÓN — STATUS: VALIDATED ✓

```
CHECK 1 — Ruta funcional ejecutable:      ✓
CHECK 2 — Responsabilidades resuelven:    ✓
CHECK 3 — Propósito refuerza hipótesis:   ✓
CHECK 4 — Estructura sin vacíos:          ✓
CHECK 5 — Entendible sin contexto:        ✓
CHECK 6 — Eficiente, sin redundancias:    ✓
```

---

## Key Architectural Decisions

- **tokens.json DTCG**: `$value` OKLCH como string CSS nativo `"oklch(L% C H)"` — nunca objeto con matrices
- **Terrazzo config**: 3 plugins CSS separados (primitivos, semánticos-light, semánticos-dark) con `include` filters
- **Build pipeline**: `predev`/`prebuild` en package.json — NUNCA en next.config.ts
- **Tailwind v4 @theme**: mapeo explícito `--color-*` en globals.css — namespace exacto requerido para opacity modifiers
- **cn()**: `extendTailwindMerge` con colores semánticos registrados + `clsx` — único punto de lógica condicional de estilos
- **RTK Query Store**: `makeStore()` function (no variable global) — previene filtración entre sesiones SSR
- **RTK Query interceptor**: Mutex pattern con `async-mutex` — previene tormenta de refresh en 401 concurrentes
- **Auth validation**: `middleware.ts` en Edge Runtime — NUNCA en Redux client-side
- **Zustand**: `createStore` de `zustand/vanilla` + Context Provider — NUNCA `create()` global en App Router
- **Separación de estado**: RTK Query = datos de red/cache, Zustand = estado UI efímero. Sin superposición.
- **Feature architecture**: `src/app/` = rutas únicamente, `src/features/` = lógica, `src/components/ui/` = átomos
- **Barrel exports**: exportaciones nominativas explícitas — NUNCA `export *` (rompe tree-shaking en Turbopack)
- **Server vs Client Components**: átomos son Server Components por defecto, `'use client'` solo cuando necesitan estado o event handlers
- **OKLCH palette**: APCA algorithm — Lc~90 microtipografía, Lc~75 texto, Lc~60 CTAs. Herramienta: Accessible Palette
- **Error boundaries**: `error.tsx` con `unstable_retry()` para errores de servidor, `reset()` para cliente. No atrapa errores de layout.tsx colindante.
- **Esta fase NO produce componentes de UI ni páginas** — solo infraestructura

---

## Revision Log

| Version | Date | Change |
|---|---|---|
| v1 | 2026-04-13 | IB Fundamentos construido con base en Gemini Deep Research de 27 preguntas técnicas (7 bloques). Todos los elementos validados. |

---

## Source

Sesión: VMC Subastas — Voyager IB Fundamentos build + Gemini Deep Research results, 2026-04-13
