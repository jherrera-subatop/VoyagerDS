# VOYAGER — VMC Subastas
**AI-Driven · AI-Readable Design System**

## Stack
- Next.js (App Router) · TypeScript estricto · Tailwind CSS v4
- RTK Query (estado async) · Zustand (estado UI)
- Terrazzo (token pipeline) · Tokens Studio (Figma sync)

## 🚨 REGLA DE SERVIDOR — OBLIGATORIA PARA EL AGENTE

**NUNCA usar Bash/PowerShell para levantar el servidor de desarrollo.**
**SIEMPRE usar `preview_start` con el nombre `voyager-dev`.**

Razón: Bash en background acumula procesos Node en Task Manager y explota la PC del usuario.
`preview_start` detecta si ya hay un servidor corriendo y lo reutiliza — nunca duplica.

```
# ✅ CORRECTO — única forma permitida
preview_start("voyager-dev")  → http://localhost:3420

# ❌ PROHIBIDO
Bash: pnpm dev
Bash: pnpm exec next dev
PowerShell: pnpm dev
```

Config en: `.claude/launch.json`

## Comandos esenciales
```bash
pnpm dev          # SOLO si el usuario lo corre manualmente en su terminal → http://localhost:3420
pnpm dev:full     # tokens + servidor (solo cuando tokens.json cambia)
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

## 🚀 Protocolo de arranque de sesión (SIEMPRE ACTIVO — primer acto de cada sesión)
Antes de cualquier otra cosa al iniciar o retomar trabajo:
1. Ejecutar `python3 scripts/voyager-jira-sync.py --status` — leer el board
2. Identificar el ticket en **En curso** — ese es el trabajo activo
3. Leer la descripción del ticket — contiene exactamente qué se necesita para avanzar
4. Pedir al usuario lo que falta (screenshot, URL, decisión) **antes de escribir una línea de código o análisis**
5. No proceder sin ese input

**El agente conduce. El usuario no debería recordarle al agente qué pedir.**
Ver `.claude/skills/voyager-session-start/SKILL.md` para el protocolo completo.

## Skills disponibles (bajo demanda)
- `voyager-session-start` → protocolo de arranque — leer board, identificar ticket activo, pedir inputs
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

## 🤖 Detección proactiva de automatizaciones (SIEMPRE ACTIVA)
Cuando el usuario mencione — en cualquier punto de la conversación — una tarea repetitiva, un proceso manual, un "cada vez que...", una frustración operativa, o una idea que implique scripts/checks/notificaciones recurrentes:
1. Marcar con 🤖 al inicio de la respuesta
2. Nombrar la automatización concreta: scheduled task / skill / git hook / script / regla
3. Estimar el ahorro real (tiempo o fricción eliminada)
4. Preguntar: "¿Lo defino ahora o lo agrego al backlog de automatizaciones?"
No esperar a que el usuario pida la automatización explícitamente — detectarla y proponerla.

## ⚠️ Protocolo de handoff por límite de contexto

**Por qué el protocolo anterior fallaba:**
Claude no puede medir su propio contexto restante. "Esperar al último momento" = garantía de fallo,
porque cuando el límite llega la sesión termina sin aviso. Protocolo nuevo: proactivo + escribe a disco.

### Regla de activación — TRES disparadores (cualquiera basta):

1. **Milestone completado** — al terminar cualquier ticket (mover a Finalizada en Jira), escribir handoff
2. **Sesión larga** — al completar la respuesta 25 de la sesión, escribir handoff aunque no haya milestone
3. **Señal de degradación** — si la respuesta anterior fue truncada o incompleta, escribir handoff inmediato

### Acción obligatoria: escribir a `.claude/handoff-current.md`

**NO solo emitir al chat** — escribir a archivo. El archivo sobrevive si el chat se corta.
Después de escribir, continuar el trabajo normalmente.

```bash
# El agente escribe este archivo con Write tool — no Bash
# Ruta: C:\VoyagerDS\VoyagerDS\.claude\handoff-current.md
```

### Estructura del handoff (en `.claude/handoff-current.md`):

```markdown
# Handoff — [fecha YYYY-MM-DD HH:MM] — [sesión actual]

## Proyecto
VMC Subastas — Voyager DS. Stack: Next.js 15 / TypeScript / Tailwind v4 / Terrazzo.
Objetivo: UI Upgrade visual (sin tocar UX flows legacy).

## Lo que se completó en esta sesión
- [archivo modificado] — [qué cambió]
- [archivo modificado] — [qué cambió]

## Estado del board Jira (al momento del handoff)
- VD-XX [estado] — [qué lo bloquea o qué falta]

## Tarea en curso (si aplica)
Archivo: [ruta exacta]
Línea aproximada: [N]
Qué se estaba haciendo: [descripción concisa]

## Próximo paso — empieza aquí
[instrucción específica: archivo, función, comando]

## Decisiones que NO están en el código
[trade-offs, razones arquitectónicas, lo que no se puede inferir leyendo los archivos]

## Archivos clave (leer en este orden)
1. [ruta] — [propósito]
2. [ruta] — [propósito]

## Comandos para retomar
```bash
python3 scripts/voyager-jira-sync.py --status
pnpm type-check
```
```

### Al iniciar sesión nueva:
Leer `.claude/handoff-current.md` ANTES de leer el board Jira.
Si existe y tiene fecha reciente → retomar desde ahí directamente.

## 📐 Ley de fidelidad pixel-perfect en wireframes de taxonomía (INVARIABLE)

Esta regla aplica a TODOS los frames presentes y futuros (detalle, listing, home, etc.).

**Fuente de verdad visual = el frame wireframe (`{Frame}PageFrame.tsx`), siempre.**

### Contratos que no se pueden romper

1. **Un solo origen visual por componente por frame.**
   El boceto que aparece en el acordeón de "Componentes de este marco" DEBE ser un extracto
   pixel-perfect de lo que se ve en el `{Frame}PageFrame.tsx` correspondiente.
   NUNCA dibujar un boceto independiente, genérico o "inspirado en SubasCars".

2. **La paleta `W` es compartida y única.**
   `ComponentWireframe.tsx` y cada `{Frame}PageFrame.tsx` usan exactamente el mismo objeto `W`.
   Si se cambia un valor en el frame, se cambia en el componente. Son la misma verdad.

3. **SubasCars es referencia taxonómica, NUNCA visual.**
   - ✅ Usar SubasCars para: nombre canónico, variantes, anatomía de slots
   - ❌ NUNCA usar SubasCars para dibujar el wireframe — el visual viene del screenshot VMC

4. **Al auditar un frame nuevo (listing, home, etc.) el flujo es:**
   ```
   1. Crear {Frame}PageFrame.tsx basado en el screenshot de VMC (no en SubasCars)
   2. Extraer cada sección visual → función WfXxx() dentro del frame
   3. Añadir las funciones correspondientes a ComponentWireframe.tsx
   4. Registrar los nuevos IDs en WIREFRAME_MAP de ComponentWireframe.tsx
   5. El acordeón mostrará automáticamente el boceto correcto
   ```

5. **Verificación antes de cerrar cualquier tarea de taxonomía:**
   Abrir el acordeón del frame en `/docs/taxonomia/marco-{frame}-vmc`.
   Si algún componente muestra "wireframe pendiente · {id}" → la tarea NO está completa.

### Archivos involucrados
| Archivo | Rol |
|---|---|
| `components/wf-detalle-atoms.tsx` | **FUENTE DE VERDAD DE ANCHOS** — exporta `ATOM_W` |
| `components/{Frame}PageFrame.tsx` | Wireframe completo del frame — usa `ATOM_W` |
| `components/ComponentWireframe.tsx` | Bocetos individuales — usa `ATOM_W`, NO valores propios |
| `_data/taxonomy-components.ts` | Datos taxonómicos — NO dicta el visual |

### Contrato de anchos — INVARIABLE
- `ATOM_W` se exporta SOLO desde `wf-detalle-atoms.tsx`
- `ComponentWireframe.tsx` importa `ATOM_W` — NUNCA define sus propios anchos
- `{Frame}PageFrame.tsx` importa `ATOM_W` — NUNCA define sus propios anchos
- Si el ancho de un componente cambia → cambiar en `ATOM_W` → propaga a ambos automáticamente
- NUNCA duplicar `NW` / `FRAME_W` / `SIDEBAR_W` en `ComponentWireframe.tsx`

### Validación antes de cerrar cualquier tarea de wireframe
Ejecutar: `pnpm run wireframe:parity` (script de auditoría) — sin errores = listo.

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
