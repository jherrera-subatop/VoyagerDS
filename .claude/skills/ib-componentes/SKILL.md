---
name: ib-componentes
description: IB Fase 3 de Voyager — Construcción de Componentes vía pipeline multi-agente. Carga este skill para obtener el contexto completo de la fase. Prerequisito: ib-fundamentos ✓ · ib-taxonomia (TAXONOMY.md) ✓. Output de esta fase: todos los componentes de TAXONOMY.md al 100% + pipeline de agentes validado como infraestructura replicable.
type: reference
project: VMC Subastas — VOYAGER (Fase 3: Componentes)
captured: 2026-04-14
revised: 2026-04-14
context: IB de la fase de construcción de componentes de Voyager. Define el pipeline multi-agente (Orchestrator + UX Writer Validator + UI Lead + Product Designer + Frontend) que consume TAXONOMY.md como corpus estructurado y produce componentes production-ready. Valida Voyager como AI-readable design system funcional.
---

# IB COMPONENTES — VOYAGER FASE 3
**VMC Subastas · Construcción de Componentes · STATUS: VALIDATED ✓**

---

## KICKOFF

```
CODE NAME:    VOYAGER COMPONENTES

WHY:          La Fase 3 es el primer momento donde los tres pilares
              de Voyager operan juntos — fundamentos, taxonomía y
              Stitch. Si el pipeline funciona, VMC tiene un mecanismo
              de construcción que ningún competidor con modelo
              tradicional puede replicar. Si no funciona, el problema
              no es de código — es de arquitectura, y se detecta
              aquí antes de contaminar producción.

SCOPE:        Fase 3 — construcción de componentes únicamente.
              UX writing y flows del legacy: INTACTOS sin excepción.
              Governance gana sobre Stitch cuando hay conflicto.

PREREQUISITO: ib-fundamentos ✓ · ib-taxonomia (TAXONOMY.md) ✓

INPUT:        TAXONOMY.md · DESIGN.md · tokens (--vmc-*) · Stitch

PROTOCOLO:    Stitch genera referencia visual. El agente mapea a
              var(--vmc-*). Si Stitch viola governance → governance
              gana, Stitch se ajusta. Nunca al revés.

PREREQUISITO  Si TAXONOMY.md tiene gaps en el contrato de un
CRÍTICO:      componente (variantes ambiguas, estados sin documentar)
              → resolver el gap en TAXONOMY.md ANTES de construir
              ese componente. El agente no asume. El agente bloquea.

OUTPUT:       Todos los componentes de TAXONOMY.md al 100%.

              Por componente, "100%" = cumplir el contrato que
              TAXONOMY.md define para ese componente específico:
              variantes documentadas, estados definidos, UX
              writing registrado.

              Criterios universales (aplican a todos sin excepción):
              □ type-check clean — cero any
              □ Cero HEX en código — solo var(--vmc-*)
              □ Accesibilidad: aria, tabular-nums donde aplica
              □ Visual match con referencia Stitch validada

              Criterios por contrato (según TAXONOMY.md):
              □ Variantes al 100% según taxonomía
              □ Estados interactivos según taxonomía
              □ UX writing delta = 0 vs legacy
```

---

## PHASE 1 — INTENTION MATRIX

### Necessity

Para que Voyager produzca superficie visual, necesita un pipeline de construcción agente-driven donde tres fuentes operan simultáneamente sobre cada componente: DESIGN.md + fundamentos (la regla), TAXONOMY.md (el qué y el contrato), y Stitch (el cómo se ve). Sin ese pipeline, los componentes se construyen manualmente uno a uno — lento, inconsistente y no replicable. La oportunidad no es solo construir la librería de componentes: es construir el mecanismo que la genera, capaz de producir cualquier componente futuro sobre el mismo proceso sin reconstruir la intención desde cero.

### Supposition

Con el pipeline operativo, VMC tiene una fábrica autónoma de componentes: TAXONOMY.md como corpus estructurado → Orchestrator → 4 agentes especializados (UX Validator · UI Lead · Product Designer · Frontend) → componente production-ready. El Arquitecto corre el pipeline, revisa el output, itera desde el agente que falló — no desde cero. Cuando todos los componentes de TAXONOMY.md existen, el pipeline está validado como infraestructura replicable: cualquier componente futuro se construye sobre los mismos datos y el mismo proceso, sin reconstruir la intención.

### Challenges & Solutions

#### CHALLENGE A — Gaps en TAXONOMY.md bloquean el pipeline

Si una fila de taxonomía tiene campos incompletos (anatomía ambigua, variantes sin documentar, UX writing no registrado), el Orchestrator no tiene contrato completo para ese componente. El agente no puede asumir — si asume, produce deuda invisible que contamina producción silenciosamente.

**Solution:** Gate de pre-construcción: el Orchestrator audita la fila de TAXONOMY.md antes de iniciar el pipeline para ese componente. Si detecta gap → bloquea y emite reporte de qué falta. El componente no entra al pipeline hasta que TAXONOMY.md esté completo para esa fila. El Arquitecto resuelve el gap, no el agente.

#### CHALLENGE B — El UI Lead produce output que viola governance

Stitch genera referencias visuales que no conocen `var(--vmc-*)` — puede proponer HEX, spacing fuera de escala o tokens inexistentes. Si el UI Lead no filtra esto, el Frontend recibe una spec que viola las reglas del stack antes de escribir una línea. El error entra al pipeline por el agente de diseño, no por el de código.

**Solution:** Governance embebida como constraint hard en el UI Lead: toda spec que produzca debe referenciar tokens existentes en `tokens-semantics-light.css`. Si Stitch propone algo sin token equivalente → el UI Lead usa el token más cercano dentro del sistema. Governance gana sobre Stitch. Siempre.

#### CHALLENGE C — UX writing drift silencioso en el output del Frontend

El Frontend implementa copy en código. Al transcribir puede parafrasear, "mejorar" o simplemente copiar mal el texto del legacy. El drift no es siempre intencional — puede ser un espacio, una mayúscula, una coma. En una plataforma transaccional, ese delta rompe el contrato con el negocio sin emitir ningún error técnico.

**Solution:** El UX Writer Validator (Agente 1) produce un contrato de strings exactos para ese componente — campo por campo. El Frontend recibe los strings como constantes tipadas, no como copy libre. El Validator corre una segunda vez sobre el output final del Frontend antes de cerrar — delta = 0 es el único resultado aceptable.

#### CHALLENGE D — Pérdida de contexto entre agentes por output no estructurado

Cada agente recibe el output del anterior. Si ese output no está estructurado, el agente siguiente interpreta en lugar de consumir. La interpretación introduce ruido — y el ruido se amplifica a medida que avanza el pipeline. Un Frontend que recibió output ambiguo del Product Designer produce código ambiguo aunque su lógica sea correcta.

**Solution:** Formato de output estandarizado por agente — cada uno produce un documento estructurado con campos fijos que el siguiente consume sin ambigüedad. El Orchestrator define el schema de handoff entre agentes. No hay outputs en prosa libre — solo schemas validados.

#### CHALLENGE E — Iteración sin trazabilidad produce reruns completos costosos

El pipeline falla en algún agente. Sin trazabilidad, el Arquitecto no sabe dónde falló exactamente, con qué input, ni desde dónde reiniciar. Cada iteración se convierte en un rerun completo — caro en contexto y tiempo, e imposible de diagnosticar con precisión.

**Solution:** El Orchestrator registra el estado de cada agente por componente: qué input recibió, qué output produjo, si pasó o falló. Si hay fallo → el Arquitecto reinicia desde el agente fallido con input corregido. El log de iteración queda en el repo como artefacto de la sesión.

### Hypothesis

Cuando ib-componentes concluye, Voyager queda validado como un AI-readable design system funcional: el pipeline de 4 agentes consumió TAXONOMY.md + DESIGN.md + Stitch como corpus estructurado y produjo componentes production-ready con governance embebida, UX writing fiel al legacy y upgrade visual — de forma autónoma.

Esa prueba tiene un valor que trasciende la librería de componentes: demuestra que cualquier flujo de trabajo de desarrollo, UX o UI sobre Voyager puede ser acelerado por agentes que leen el mismo corpus. El design system no es solo la referencia — es el combustible del pipeline. Cada nuevo componente, variante o feature que VMC necesite en el futuro se construye sobre el mismo sistema, más rápido que el anterior, sin reconstruir la intención.

---

## PHASE 2 — PURPOSE PYRAMID

### Task Base

```
TASK A — Definir la arquitectura del pipeline antes de construir
          ningún agente
          Antes de que exista un solo agente, el pipeline necesita
          su contrato de operación: schema de handoff entre agentes
          (qué produce cada uno, en qué formato, qué consume el
          siguiente), protocolo de trazabilidad del Orchestrator
          (qué registra, cómo reporta fallo, desde dónde reinicia),
          y el gate de pre-construcción (qué campos de TAXONOMY.md
          son obligatorios antes de iniciar el pipeline para un
          componente). Sin esta arquitectura definida primero, cada
          agente opera con su propia interpretación del contrato.

TASK B — Construir el Orchestrator con gate de pre-construcción
          y trazabilidad
          El Orchestrator lee la fila de TAXONOMY.md para el
          componente objetivo, ejecuta el gate (audita que todos
          los campos requeridos estén completos — bloquea si hay
          gaps), dispara los 4 agentes en secuencia pasando el
          output estructurado de uno al siguiente, y registra
          el estado de cada agente por componente. Si hay fallo →
          el log indica exactamente qué agente falló, con qué
          input, para que el Arquitecto reinicie desde ahí.

TASK C — Construir los 4 agentes especializados del pipeline
          ▲ KEYSTONE
          Los 4 agentes operan en secuencia bajo el contrato
          definido en Task A:
          · UX Writer Validator: lee legacy + campo UX writing
            de taxonomía → produce contrato de strings exactos
            → corre segunda vez sobre output final del Frontend
          · UI Lead: lee DESIGN.md + Stitch + output del Validator
            → produce design spec con tokens var(--vmc-*) únicamente
            → governance embebida hard, Stitch se ajusta a tokens
          · Product Designer: lee design spec + anatomía de
            taxonomía + UX contract → valida coherencia UX+UI
            → produce component spec final
          · Frontend: lee component spec + stack rules (governance)
            → produce código en src/components/ui/ o src/features/
            → strings como constantes tipadas, no copy libre

TASK D — Validar el pipeline end-to-end con componentes P0
          Antes de correr el pipeline sobre toda la taxonomía,
          se valida con los componentes P0 ya parcialmente
          construidos (Button, Badge, PriceDisplay, CountdownTimer).
          El pipeline los procesa, el Arquitecto compara output
          contra lo existente, identifica gaps en el schema de
          handoff o en los agentes, y corrige la arquitectura
          antes del run completo. P0 es el banco de pruebas —
          falla aquí antes de fallar en producción.

TASK E — Ejecutar el pipeline sobre todos los componentes de
          TAXONOMY.md e iterar hasta done criteria
          Con el pipeline validado en P0, el Orchestrator procesa
          todos los componentes de TAXONOMY.md en orden de
          prioridad (P0 → P1 → P2 → P3 → P4). Por cada
          componente: gate → 4 agentes → output → revisión del
          Arquitecto → iteración si aplica. La fase cierra cuando
          todos los componentes cumplen los criterios universales
          y el contrato de TAXONOMY.md para ese componente.
          Sin excepción.
```

### Objectives

```
── SECTION A ─────────────────────────────────────────────────

OBJECTIVE 1 [Tasks A → B]
El pipeline tiene contrato de operación y coordinador activo —
el schema de handoff entre agentes está definido, el gate de
pre-construcción está implementado, y el Orchestrator puede
leer una fila de TAXONOMY.md, auditarla, dispararla en secuencia
y registrar el estado por agente. La infraestructura de
coordinación existe antes de que se construya un solo agente.

OBJECTIVE 2 [Tasks B → C] ▲ KEYSTONE BRIDGE
El pipeline completo es operativo — Orchestrator + 4 agentes
especializados trabajando en secuencia con handoffs estructurados.
UX Validator · UI Lead · Product Designer · Frontend consumen
y producen bajo el contrato definido. Governance embebida en
el UI Lead. UX writing como constantes tipadas en el Frontend.
El pipeline puede recibir una fila de taxonomía y producir
un componente.

── SECTION B ─────────────────────────────────────────────────

OBJECTIVE 3 [Tasks C → D]
El pipeline está validado end-to-end contra componentes reales —
P0 procesados, output comparado contra existente, gaps en
schema o agentes identificados y corregidos. La arquitectura
es confiable antes del run sobre toda la taxonomía. Fallar
aquí es barato. Fallar en Objective 4 no lo es.

OBJECTIVE 4 [Tasks D → E]
Todos los componentes de TAXONOMY.md existen en código y
cumplen su contrato: variantes completas según taxonomía,
UX writing delta = 0, type-check clean, cero HEX, accesibilidad
presente, visual match con Stitch validado. La fase cierra
cuando el último componente pasa — no antes.
```

### Responsibilities

```
RESPONSABILIDAD X [Section A | Central Task: B]
Garantizar que el pipeline opere bajo su contrato en cada
ejecución — ningún componente entra sin pasar el gate de
pre-construcción, ningún agente opera sin schema de handoff
definido, ningún fallo queda sin traza registrada. El
Orchestrator no es un artefacto que se construye una vez
y se olvida: es la infraestructura que mantiene la integridad
del proceso en cada componente, en cada iteración, durante
toda la fase.

RESPONSABILIDAD Y [Section B | Central Task: D]
Garantizar que cada componente producido por el pipeline
cumple su contrato de done criteria — la validación no
ocurre al final de la fase, ocurre componente a componente.
Ningún output avanza sin que UX writing delta = 0, governance
clean y contrato de taxonomía cumplido. El pipeline puede
funcionar técnicamente y fallar estratégicamente: esta
responsabilidad existe para que eso no ocurra en silencio.
```

### Purpose

```
Demostrar que un design system AI-readable no es un concepto —
es infraestructura activa: cuando la intención está
suficientemente estructurada (taxonomía + fundamentos +
governance), los agentes construyen sin intervención manual
por componente, y cada flujo de desarrollo, UX o UI sobre
Voyager se acelera de forma permanente.
```

---

## PURPOSE PYRAMID — DIAGRAMA

```
                    ┌─────────────────────────┐
                    │        PROPÓSITO        │
                    │                         │
                    │  Demostrar que un design │
                    │  system AI-readable no  │
                    │  es un concepto — es    │
                    │  infraestructura activa: │
                    │  cuando la intención    │
                    │  está suficientemente   │
                    │  estructurada, los      │
                    │  agentes construyen     │
                    │  sin intervención manual│
                    │  por componente, y cada │
                    │  flujo de desarrollo,   │
                    │  UX o UI sobre Voyager  │
                    │  se acelera de forma    │
                    │  permanente.            │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┴──────────────────┐
              │                                    │
   RESP. X                                RESP. Y
   Integridad del proceso                 Integridad del output
   Pipeline opera bajo contrato           Cada componente cumple
   en cada ejecución                      su done criteria
              │                                    │
        ┌─────┴──────┐                    ┌────────┴──────┐
        │            │                    │               │
     OBJ 1        OBJ 2 ▲            OBJ 3           OBJ 4
  Contrato +    Pipeline          Validado          Todos los
  Orchestrator  operativo         en P0             componentes
        │            │                    │               │
      ┌─┴─┐      ┌───┴───┐           ┌───┴───┐       ┌───┴─┐
      A   B      B       C           C       D       D     E
                         ▲ KEYSTONE
         ├── Section A ──┤├────── Section B ──────────────┤
         └────────────────── Foundation ──────────────────┘

α HIPÓTESIS:  Voyager queda validado como AI-readable design
              system — el pipeline que produjo los componentes
              es la prueba. Acelera permanentemente el flujo
              de desarrollo + UX/UI. Cada componente futuro:
              más rápido, mismo sistema.
CODE NAME:    VOYAGER COMPONENTES
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

- TAXONOMY.md es corpus estructurado de input — no documentación. Cada fila es un contrato de construcción para un componente.
- El pipeline es el entregable real de Fase 3 — los componentes son el output visible, el pipeline es la infraestructura invisible más valiosa.
- 4 agentes especializados en secuencia: UX Writer Validator → UI Lead → Product Designer → Frontend. El Orchestrator coordina y registra.
- Gate de pre-construcción es no negociable — ningún componente entra al pipeline con gaps en su fila de TAXONOMY.md.
- Governance gana sobre Stitch siempre — si Stitch propone algo sin token equivalente, el UI Lead lo mapea al token más cercano del sistema.
- UX writing se implementa como constantes tipadas en código — nunca copy libre en el componente.
- El UX Writer Validator corre dos veces: al inicio (produce contrato) y al final (verifica output del Frontend). Delta = 0 es el único resultado aceptable.
- P0 es el banco de pruebas del pipeline — Badge, Button, PriceDisplay, CountdownTimer. Fallar en P0 es barato. Fallar en P3 no lo es.
- El Arquitecto no construye componente a componente — corre el pipeline, revisa output, itera desde el agente que falló.
- Orden de prioridad: P0 → P1 → P2 → P3 → P4 según COMPONENTS_PRIORITY.md.
- Stack: Next.js App Router · TypeScript estricto · Tailwind v4 · RTK Query · Zustand · var(--vmc-*) tokens.

---

## Revision Log

| Version | Date | Change |
|---|---|---|
| v1 | 2026-04-14 | IB Componentes construido co-creativamente en sesión. Todos los elementos validados. Pipeline multi-agente definido como arquitectura central de la fase. |

---

## Source

Sesión: VMC Subastas — Voyager IB Componentes build, 2026-04-14
