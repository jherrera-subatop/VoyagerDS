---
name: ib-fundamentos
description: IB Fase 2 de Voyager — Infraestructura de Tokens y Estado. Carga este skill para obtener el contexto completo de la fase de fundamentos. Prerequisito: ib-taxonomia con TAXONOMY.md al menos en iteración 1. Output de esta fase: tokens.json + tokens.css + cn() helper + Store providers + token-gatekeeper.mjs — únicos inputs válidos para ib-componentes.
type: reference
project: VMC Subastas — VOYAGER (Fase 2: Fundamentos)
captured: 2026-04-13
revised: 2026-04-13
context: IB de la fase de infraestructura de tokens y estado de Voyager. Cubre el pipeline Terrazzo → DTCG → OKLCH → Tailwind v4, la taxonomía de tokens (3 capas, 12 pasos, Dot Notation, tokens transaccionales), el sistema tipográfico (20 text styles, Plus Jakarta Sans + Roboto + Roboto Mono), la capa de estado (RTK Query + Zustand en Next.js 15 App Router), la arquitectura feature-based y el gatekeeper de calidad de tokens. Construido con base en dos Gemini Deep Research: 27 preguntas técnicas + 29 preguntas de DS governance.
---

# IB FUNDAMENTOS — VOYAGER FASE 2
**VMC Subastas · Infraestructura de Tokens y Estado · STATUS: VALIDATED ✓**

---

## KICKOFF

```
CODE NAME:    VOYAGER FUNDAMENTOS
WHY:          Sin tokens DTCG compilados con taxonomía correcta, sin
              sistema tipográfico definido y sin providers de estado
              correctos, cada componente que se construya en
              ib-componentes va a hardcodear valores, nombrar tokens
              arbitrariamente, producir alucinaciones en agentes AI
              o generar hydration mismatches. Los fundamentos son la
              capa que hace que todo lo que viene después funcione
              sin deuda — técnica y semánticamente.
SCOPE:        Fase 2 de Voyager — infraestructura únicamente.
              Sin componentes de UI. Sin páginas. Sin features de negocio.
              Output: pipeline de tokens funcional + taxonomía completa
              + tipografía definida + capa de estado lista + gatekeeper.
PREREQUISITO: ib-taxonomia con TAXONOMY.md iteración 1 completa
INPUT:        Gemini Deep Research #1 (27 preguntas — pipeline técnico:
                Terrazzo, DTCG, OKLCH, Tailwind v4, RTK Query, Zustand,
                feature architecture)
              Gemini Deep Research #2 (29 preguntas — DS governance:
                MD3, Apple HIG, Atlassian, IBM Carbon, Shopify Polaris,
                Radix, Bloomberg Terminal, Refinitiv Halo)
              design-system.md + frontend-lineamientos.md
              design-system-tokens.md (reglas derivadas de research)
OUTPUT:       tokens.json (DTCG completo: color OKLCH 12 pasos +
                semánticos Dot Notation + tokens transaccionales +
                tipografía 20 text styles + spacing + radius +
                shadows + motion)
              terrazzo.config.mjs
              tokens-primitives.css
              tokens-semantics-light.css
              tokens-semantics-dark.css
              globals.css con @theme
              src/lib/utils/style.ts (cn() helper)
              makeStore() + StoreProvider + ModalStoreProvider
              middleware.ts
              scripts/agents/token-gatekeeper.mjs
```

---

## PHASE 1 — INTENTION MATRIX

### Necessity

Voyager necesita una capa de fundamentos completa en tres dimensiones antes de construir un solo componente.

La primera dimensión es técnica: el stack elegido (Terrazzo + Tailwind v4 CSS-first + OKLCH + DTCG) tiene fricciones de integración que invalidan patrones heredados de Tailwind v3. Sin resolver estas fricciones, el pipeline no compila o genera CSS incorrecto silenciosamente.

La segunda dimensión es de contenido y semántica: un pipeline técnicamente correcto que produce tokens con naming críptico, sin `$description`, sin cobertura transaccional o con una taxonomía de 2 capas en lugar de 3 es tan problemático como uno roto. Los agentes de ib-componentes dependen de que los tokens sean AI-readable — un token llamado `btn-bg-hvr` produce alucinaciones. Un color llamado `blue-subtle` no puede interpolarse algorítmicamente. Y ningún design system consumer genérico tiene `color.timer.imminent` ni `color.action.execute.bid` — si no se definen explícitamente, los agentes los inventan.

La tercera dimensión es de estado: RTK Query y Zustand en Next.js 15 App Router requieren patrones específicos de inicialización. Sin ellos, el estado filtra entre sesiones de servidor concurrentes (bug de seguridad) o genera hydration mismatches que producen destellos visuales en rutas autenticadas.

### Supposition

Con el pipeline de tokens operativo, la taxonomía correcta y la capa de estado inicializada, cada agente que construya en ib-componentes consume tokens desde variables CSS con nombres que comunican propósito inequívocamente, gestiona estado sin riesgo de hydration mismatch y opera dentro de una arquitectura feature-based predecible. El gatekeeper garantiza que la calidad no degrade en el tiempo — cualquier token que no cumpla las reglas falla el build antes de entrar al sistema.

### Challenges & Solutions

#### CHALLENGE A — Pipeline de tokens con fricciones de integración no documentadas en tutoriales estándar

El stack Terrazzo + Tailwind v4 + OKLCH tiene decisiones de implementación que los tutoriales estándar no cubren. El valor OKLCH debe definirse como string CSS nativo en `$value` — si se usa objeto con matrices de componentes, Terrazzo no genera CSS válido para Tailwind v4. Los tokens semánticos que referencian primitivos usan la sintaxis `"{color.brand.500}"` — cualquier otra forma rompe la resolución de AST. Los múltiples archivos de output requieren instancias separadas del plugin CSS en terrazzo.config.mjs. Y el pipeline debe ejecutarse via `predev`/`prebuild` en package.json — delegarlo a next.config.ts genera fallos de compilación porque Lightning CSS evalúa imports antes de que Terrazzo genere los archivos.

**Solution:** tokens.json con estructura DTCG validada y terrazzo.config.mjs con 3 outputs separados (tokens-primitives.css, tokens-semantics-light.css, tokens-semantics-dark.css) usando instancias independientes del plugin CSS con filtros `include`. Scripts `predev` y `prebuild` en package.json garantizan que los archivos existen en disco antes de que Next.js evalúe dependencias de CSS.

#### CHALLENGE B — Tailwind v4 CSS-first rompe el mapeo de tokens sin namespace correcto

Tailwind v4 elimina tailwind.config.js y expone la configuración a través del bloque `@theme`. El mapeo de CSS custom properties de Terrazzo requiere que los nombres sigan el namespace exacto que Tailwind espera — si es incorrecto, las clases utilitarias se generan vacías sin error visible. El caso más crítico son los opacity modifiers (`bg-primary/50`): si la variable no tiene el prefijo `--color-*` correcto, la función `color-mix()` de Tailwind v4 falla silenciosamente. `tailwind-merge` necesita ser extendido con los colores semánticos custom o colisiona en la resolución de precedencia.

**Solution:** globals.css con `@import` de los 3 archivos de Terrazzo + bloque `@theme` con mapeo explícito de cada variable. Conector `cn()` en `src/lib/utils/style.ts` que combina `clsx` + `extendTailwindMerge` con los colores semánticos registrados. Este conector es el único punto de lógica condicional de estilos en todo el proyecto.

#### CHALLENGE C — Sin taxonomía correcta y naming AI-readable, los tokens compilan pero son semánticamente inútiles ▲ KEYSTONE

Un pipeline técnicamente correcto que produce tokens con naming críptico, taxonomía de 2 capas, sin cobertura transaccional o sin `$description` es tan problemático como uno roto — pero más peligroso porque falla silenciosamente. Los agentes de ib-componentes usan los tokens como contratos: si el contrato es ambiguo, producen código incorrecto. Adicionalmente, una plataforma de subastas requiere tokens que no existen en ningún design system consumer (market dynamics, urgency timers, bidding UI) — si no se definen explícitamente aquí, los agentes los inventan con valores arbitrarios. Y sin un sistema tipográfico completo y bloqueado, los componentes van a crear text styles ad hoc hasta llegar a los 50 sin orden.

**Solution:** Modelo de 3 capas (primitivos numéricos → semánticos Dot Notation → componente). Paleta OKLCH de 12 pasos con distribución funcional fija (pasos 1-2 fondos, 3-5 interactivos, 6-8 bordes, 9 anchor de brand, 11-12 texto), con escala alfa paralela (a1-a12). Namespaces separados: `color.background.*`, `color.text.*`, `color.border.*`, `color.icon.*`. Tokens transaccionales obligatorios: `color.text.market.bullish/bearish`, `color.background.urgency.low/high/critical`, `color.timer.standard/imminent`, `color.action.execute.bid/withdraw`, `color.surface.processing`, `color.border.verified`. Sistema tipográfico de 3 fuentes con roles fijos (Plus Jakarta Sans = display/headings/UI, Roboto = body/data, Roboto Mono = valores numéricos críticos) y 20 text styles como composite tokens — ningún componente crea text styles nuevos. `tabular-nums` obligatorio en todos los tokens numéricos. `$description` obligatorio en cada token. Naming AI-first: `{namespace}-{categoría}-{elemento}-{propiedad}-{estado}`.

#### CHALLENGE D — RTK Query filtra estado entre sesiones en App Router sin el patrón correcto

RTK Query fue diseñado para entornos client-side. En Next.js 15 App Router, si el Redux Store se inicializa como variable global, el estado persiste entre solicitudes concurrentes en el servidor, cruzando datos de sesión entre usuarios distintos — bug de seguridad, no solo de rendimiento. Si las validaciones de rutas protegidas se implementan en Redux client-side, generan un destello visual donde el usuario autenticado ve brevemente la pantalla de login antes de que el estado rehidrate.

**Solution:** `makeStore()` como función de construcción (no variable global). `StoreProvider.tsx` con `useRef` garantiza una única instancia por árbol. Auth validation en `middleware.ts` (Edge Runtime) — evalúa cookies antes del router. Interceptor con patrón Mutex (`async-mutex`) previene tormenta de refresh paralelos cuando múltiples peticiones concurrentes reciben 401 simultáneamente.

#### CHALLENGE E — Zustand genera hydration mismatches con el patrón de inicialización estándar

El patrón `create()` de Zustand exporta un store global. En Next.js 15 App Router, este store es compartido entre el renderizado de servidor y el cliente, produciendo discrepancias de estado que React reporta como hydration mismatches. El síntoma más común: el estado inicial del servidor y el del cliente difieren porque el cliente tiene acceso a APIs del navegador que el servidor no tiene.

**Solution:** `createStore` de `zustand/vanilla` como función generadora (no export global) + Context Provider pattern con `useState(() => createStore())` como factory. Hook `useModalStore` con error boundary si el componente está fuera del provider. Separación estricta: RTK Query monopoliza datos de red y cache, Zustand gestiona únicamente estado UI efímero (modals, filtros, auth UI state).

#### CHALLENGE F — La arquitectura feature-based debe coexistir con App Router sin romper tree-shaking

`src/app/` es el directorio de enrutamiento obligatorio de Next.js. Meter toda la lógica de features directamente en `src/app/` produce un árbol inmanejable. Barrel exports clásicos (`export * from`) parecen una solución limpia pero Turbopack evalúa el árbol completo del módulo aunque solo se importe un componente, rompiendo code-splitting. Los componentes atómicos deben seguir siendo Server Components por defecto para maximizar FCP.

**Solution:** `src/app/` = coordinadores de rutas únicamente. `src/features/<nombre>/` = toda la lógica operacional autocontenida. Barrel exports con exportaciones nominativas explícitas — tree-shaking correcto. Componentes en `src/components/ui/` como Server Components por defecto, `'use client'` solo cuando necesitan `useState` o event handlers.

#### CHALLENGE G — Sin validación automática, los tokens degradan silenciosamente hacia naming críptico y ausencia de $description

A medida que la fase avanza y más tokens se agregan, la calidad del sistema decae sin que nadie lo note. Un token sin `$description` es opaco para los agentes. Un nombre críptico produce alucinaciones en los LLMs. Un valor OKLCH escrito como objeto en lugar de string rompe Terrazzo silenciosamente. Sin un gatekeeper que valide antes de que los tokens entren al pipeline, la deuda se acumula desde el día 1 y se vuelve invisible hasta que un agente genera código incorrecto.

**Solution:** `token-gatekeeper.mjs` — agente de validación integrado en el script `prebuild`. Valida: naming hiper-explícito (`{namespace}-{categoría}-{elemento}-{propiedad}-{estado}`), `$description` presente en cada token, `$value` OKLCH como string nativo (no objeto), referencias semánticas con sintaxis `{path.to.token}`, escala numérica en primitivos (no semántica), 12 pasos por paleta de color, contraste APCA mínimo en tokens de texto, `tabular-nums` en tokens numéricos, sin T-shirt sizes en primitivos de color/spacing. Falla el build si alguna validación no pasa. La fase no termina hasta que gatekeeper corre limpio sobre el tokens.json completo.

### Hypothesis

Cuando ib-fundamentos concluye, Voyager tiene una infraestructura de construcción completa en las tres dimensiones. El primer componente que un agente construya en ib-componentes puede: consumir `var(--color-background-primary)` sabiendo exactamente qué es y para qué sirve, usar `text-numeric-lg` para un precio de subasta sabiendo que incluye Roboto Mono + tabular-nums, llamar `cn()` para lógica condicional de estilos, usar un RTK Query hook en un Client Component sin riesgo de filtración de estado, y saber exactamente en qué carpeta vive — sin tomar ninguna decisión de infraestructura, taxonomía ni tipografía. El gatekeeper garantiza que ningún token inválido llegó hasta aquí.

---

## PHASE 2 — PURPOSE PYRAMID

### Task Base

```
TASK A — Construir el pipeline de tokens técnico
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

TASK C — Construir taxonomía completa + sistema tipográfico ▲ KEYSTONE
          Paleta OKLCH 12 pasos con escala alfa paralela.
          Namespaces Dot Notation: color.background/text/border/icon.
          Tokens transaccionales: market dynamics, urgency, timer,
          bidding UI, clearing & settlement.
          20 text styles como composite tokens (Plus Jakarta Sans +
          Roboto + Roboto Mono). tabular-nums en todos los numéricos.
          $description en cada token. Naming AI-first.
          Spacing multiplicador Atlassian (space.100 = 8px).
          Radius 5 pasos. Elevación 3 niveles. Motion 4 niveles.

TASK D — Implementar capa RTK Query production-ready
          makeStore() function + StoreProvider con useRef +
          baseQueryWithReauth con Mutex (prepareHeaders + retry
          + refresh token + auto-logout en 401) +
          middleware.ts para auth validation en Edge Runtime.
          Validar que múltiples peticiones 401 simultáneas no
          generan tormenta de refresh.

TASK E — Implementar capa Zustand sin hydration mismatch
          createStore (zustand/vanilla) + ModalStoreProvider
          con useState factory + useModalStore hook con error
          boundary. Validar que no hay hydration mismatch en
          next dev con estado inicial.

TASK F — Establecer arquitectura de directorios
          Crear estructura src/features/ + src/components/ui/
          + src/stores/ + src/providers/ + src/lib/.
          Barrel exports con exportaciones nominativas explícitas.
          Validar con componente atómico de prueba end-to-end.

TASK G — Construir token gatekeeper
          token-gatekeeper.mjs integrado en prebuild.
          Validaciones: naming, $description, OKLCH format,
          referencias semánticas, escala numérica, 12 pasos,
          APCA contrast, tabular-nums en numéricos.
          La fase NO termina hasta que gatekeeper corre limpio
          sobre el tokens.json completo de Task C.
```

### Objectives

```
── SECTION A ──────────────────────────────────────────────────

OBJECTIVE 1 [Tasks A → B]
El pipeline técnico está operativo — tokens.json compilado por
Terrazzo genera 3 archivos CSS que Tailwind v4 consume a través
del @theme, con cn() disponible en toda la app. Ningún valor
de color, tipografía o spacing está hardcodeado.

OBJECTIVE 2 [Tasks B → C] ▲ KEYSTONE BRIDGE
Los tokens son técnicamente correctos Y semánticamente útiles
— taxonomía de 3 capas, namespaces Dot Notation, cobertura
transaccional completa, 20 text styles bloqueados, $description
en cada token, naming AI-readable. Los agentes de ib-componentes
tienen contratos inequívocos para construir.

── SECTION B ──────────────────────────────────────────────────

OBJECTIVE 3 [Tasks D → E]
RTK Query y Zustand coexisten sin colisión de responsabilidades
— la separación datos de red vs estado UI está enforced por
arquitectura. La capa de estado es production-safe desde el
primer día.

OBJECTIVE 4 [Tasks F → G]
La arquitectura de directorios está establecida con componente
de prueba end-to-end funcional, y el gatekeeper corre limpio
sobre el tokens.json completo. ib-componentes puede arrancar
sin tomar ninguna decisión de infraestructura ni de calidad
de tokens.
```

### Responsibilities

```
RESPONSABILIDAD X [Section A | Central Task: C]
Garantizar que los tokens sean correctos en contenido y
semántica — taxonomía de 3 capas con naming AI-readable,
cobertura transaccional completa (tokens que no existen en
ningún design system consumer), sistema tipográfico de 20
text styles bloqueados y $description en cada token. Si los
tokens son correctos técnicamente pero incorrectos
semánticamente, ib-componentes falla igualmente.

RESPONSABILIDAD Y [Section B | Central Task: D]
Garantizar que la capa de estado y la validación automática
sean production-safe — sin filtración de sesiones entre
usuarios, sin hydration mismatches, con el interceptor Mutex
operativo y el gatekeeper pasando limpio. El gatekeeper
convierte las reglas de calidad en un contrato ejecutable:
si no pasa, la fase no termina.
```

### Purpose

```
Establecer la infraestructura invisible de Voyager en sus
tres dimensiones: el pipeline técnico que compila los tokens,
la taxonomía semántica que hace que esos tokens sean útiles
para agentes AI, y la capa de estado que hace que cada
componente opere sin riesgo. Los fundamentos no producen
UI visible — producen el entorno en el que la UI puede
construirse correctamente, con calidad enforced por el
gatekeeper desde el primer commit.
```

---

## VALIDACIÓN — STATUS: VALIDATED ✓

```
CHECK 1 — Ruta funcional ejecutable:               ✓
CHECK 2 — Responsabilidades resuelven secciones:   ✓
CHECK 3 — Propósito refuerza hipótesis:            ✓
CHECK 4 — Estructura sin vacíos:                   ✓
CHECK 5 — Entendible sin contexto:                 ✓
CHECK 6 — Eficiente, sin redundancias:             ✓
CHECK 7 — Central Task Principle aplicado:         ✓
CHECK 8 — Altitude Rule cumplida:                  ✓
CHECK 9 — Keystone en task correcta (C):           ✓
CHECK 10 — Gatekeeper como condición de cierre:    ✓
```

---

## Key Architectural Decisions

**Pipeline técnico:**
- `$value` OKLCH como string CSS nativo `"oklch(L% C H)"` — nunca objeto con matrices
- Terrazzo: 3 plugins CSS separados con `include` filters
- Build: `predev`/`prebuild` en package.json — NUNCA en next.config.ts
- Tailwind v4 `@theme`: mapeo explícito `--color-*` — namespace exacto para opacity modifiers
- `cn()`: `extendTailwindMerge` + `clsx` — único punto de lógica condicional de estilos

**Taxonomía de tokens:**
- Arquitectura: 3 capas (primitivos → semánticos → componente) — nunca 2 ni 4
- Primitivos: escala numérica (blue-100 a blue-900) — NUNCA semántica en capa primitiva
- Semánticos: Dot Notation — `color.background.*`, `color.text.*`, `color.border.*`, `color.icon.*`
- Color: OKLCH 12 pasos, paso 9 = anchor de brand, escala alfa paralela a1-a12
- Spacing: base 4px/8px, multiplicador en cientos (space.100 = 8px), 12-14 pasos
- Radius: 5 pasos (none/sm/md/lg/full), bordes agudos dominan — plataforma financiera ≠ consumer
- Elevación: 3 niveles únicamente — diseño quasi-plano
- Motion: 4 niveles (0ms WebSocket / 100ms micro / 200-250ms overlays / easing curves)
- Estados interactivos: 9 mínimos (default/hover/active/focus/selected/disabled/loading/error/success)
- Focus ring: `outline` + `outline-offset` — NUNCA `box-shadow` (se amputa con overflow:hidden)
- `$description`: OBLIGATORIO en cada token — consumo por agentes AI y MCP

**Tokens transaccionales (exclusivos de Voyager):**
- `color.text.market.bullish/bearish` — dinámica de mercado (≠ success/error)
- `color.background.urgency.low/high/critical` — fases de countdown
- `color.timer.standard/imminent` — estado del tiempo de subasta
- `color.action.execute.bid/withdraw` — acciones financieras protegidas semánticamente
- `color.surface.processing` / `color.border.verified` — clearing & settlement

**Sistema tipográfico:**
- Plus Jakarta Sans: display / headings / UI principal (SIL Open Font License)
- Roboto: body / data / texto denso (Apache 2.0)
- Roboto Mono: valores numéricos críticos únicamente — precio, timer, bid, códigos
- 20 text styles bloqueados como composite tokens (font-family + size + lh + weight + tracking)
- `tabular-nums`: OBLIGATORIO en todos los tokens numéricos (evita jitter en WebSocket)
- Responsive: breakpoints fijos — NUNCA `clamp()` (DTCG + agentes AI necesitan enteros)
- Ningún componente crea text styles nuevos — solo consume del scale de 20

**Gobernanza:**
- SemVer para tokens: Patch/Minor = ajuste de valor, Major = renombrar/eliminar
- Deprecation period obligatorio antes de eliminar token (warnings en IDE + CI/CD)
- Anti-sprawl: nuevo token primitivo SOLO si su cambio debe propagarse al 100% de la app
- Naming AI-first: `{namespace}-{categoría}-{elemento}-{propiedad}-{estado}` — hiper-explícito
- Gatekeeper falla el build si cualquier token viola las reglas

**Capa de estado:**
- RTK Query Store: `makeStore()` function — NUNCA variable global (filtra entre sesiones SSR)
- RTK Query interceptor: Mutex pattern con `async-mutex` — previene tormenta de refresh
- Auth validation: `middleware.ts` en Edge Runtime — NUNCA en Redux client-side
- Zustand: `createStore` de `zustand/vanilla` + Context Provider — NUNCA `create()` global
- Separación estricta: RTK Query = datos de red/cache, Zustand = estado UI efímero

**Arquitectura:**
- `src/app/` = rutas únicamente, `src/features/` = lógica, `src/components/ui/` = átomos
- Barrel exports: exportaciones nominativas explícitas — NUNCA `export *` (rompe Turbopack)
- Server Components por defecto, `'use client'` solo cuando necesitan estado o event handlers
- `error.tsx` con `unstable_retry()` para errores de servidor, `reset()` para cliente
- Esta fase NO produce componentes de UI ni páginas

---

## Revision Log

| Version | Date | Change |
|---|---|---|
| v1 | 2026-04-13 | IB inicial — pipeline técnico + estado + feature architecture. Base: Gemini Deep Research #1 (27 preguntas técnicas). |
| v2 | 2026-04-13 | Audit completo: añadido Challenge C (taxonomía + tipografía, keystone), Challenge G (gatekeeper), Task C + G, Objectives actualizados (4 en lugar de 5), Responsibilities corregidas (X→Central Task C, Y→Central Task D), Necessity + Supposition + Hypothesis + Purpose expandidos. Base: Gemini Deep Research #2 (29 preguntas DS governance) + decisiones tipográficas (Plus Jakarta Sans + Roboto + Roboto Mono, 20 text styles). |

---

## Source

Sesión: VMC Subastas — Voyager IB Fundamentos v1 + audit v2, 2026-04-13
