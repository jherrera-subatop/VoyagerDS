---
name: ib-taxonomia
description: IB Fase 1 de Voyager — Auditoría y Taxonomía. Carga este skill para obtener el contexto completo de la fase de auditoría. Prerequisito: ib-maestro validado. Output de esta fase: TAXONOMY.md al 100% — único input válido para ib-fundamentos.
type: reference
project: VMC Subastas — VOYAGER (Fase 1: Taxonomía)
captured: 2026-04-13
revised: 2026-04-13
context: IB de la fase de auditoría y taxonomía de Voyager. Cubre el audit de VMC Subastas (plataforma viva, sin repositorio) y SubasCars (Storybook live + SAST scan), la categorización bajo 5 dominios funcionales con 10 campos por componente, y la producción de TAXONOMY.md como entregable final de la fase.
---

# IB TAXONOMÍA — VOYAGER FASE 1
**VMC Subastas · Auditoría y Taxonomía · STATUS: VALIDATED ✓**

---

## KICKOFF

```
CODE NAME:    VOYAGER TAXONOMÍA
WHY:          Sin un inventario estructurado de lo que existe
              en VMC Subastas y SubasCars, cada decisión de
              diseño en Voyager es una suposición. La taxonomía
              es la fuente de verdad que lo cambia.
SCOPE:        Fase 1 de Voyager — audit y taxonomía únicamente.
              Sin código de producción. Sin componentes.
              Output único: TAXONOMY.md al 100%.
PREREQUISITO: ib-maestro validado
INPUT:        VMC Subastas (live) + SubasCars Storybook
              (subascars-storybook-gcp.web.app)
OUTPUT:       TAXONOMY.md — taxonomía completa de Voyager
```

---

## PHASE 1 — INTENTION MATRIX

### Necessity

Para que Voyager construya con precisión y sin deuda, necesita saber exactamente qué existe: qué componentes viven en VMC Subastas — plataforma auditable solo en vivo — qué patrones replicables tiene SubasCars, y qué de todo eso vale construir, portar o descartar. Sin ese inventario categorizado, cada decisión de diseño es una suposición.

El problema tiene dos caras distintas. VMC Subastas no tiene repositorio de componentes — la única forma de saber qué existe es entrando a la plataforma viva, frame por frame, estado por estado. SubasCars tiene un Storybook live pero sin organización bajo la taxonomía de Voyager. Ambas fuentes son valiosas. Ninguna es utilizable directamente sin proceso.

### Supposition

Con un inventario categorizado de ambas plataformas, Voyager tiene el mapa de decisiones completo: qué componentes crear desde cero, cuáles optimizar del legacy, cuáles portar desde SubasCars y cuáles descartar — eliminando la ambigüedad de las fases siguientes y garantizando que cada componente construido tiene una razón de existir.

### Challenges & Solutions

#### CHALLENGE A — Extraer componentes de VMC sin repositorio

VMC Subastas solo es auditable en vivo. No existe documentación, no existe repositorio, no existen componentes aislados. La plataforma tiene tres niveles de acceso que exponen estados distintos: no loggeado (vista pública), loggeado (panel de usuario), y postor activo en subasta (componentes de bidding en tiempo real que no existen en los otros estados). Hacer este audit manualmente frame por frame es inviable en la ventana de tiempo disponible.

**Solution:** Agente automatizado que navega VMC sistemáticamente en los tres niveles de acceso, captura screenshots de alta resolución y DOM snapshots de cada estado y variante visible — incluyendo estados interactivos (hover, focus, loading, error, vacío). El clustering visual agrupa instancias del mismo componente que aparecen en múltiples páginas con variaciones menores de DOM o CSS.

#### CHALLENGE B — Extraer y categorizar los componentes de SubasCars

SubasCars tiene un Storybook live en producción (`subascars-storybook-gcp.web.app`) que expone todos sus componentes aislados con sus stories (variantes), props documentados y estados interactivos. Sin embargo, esos componentes no están organizados bajo la taxonomía de Voyager — tienen su propia estructura y nomenclatura. Adicionalmente, antes de portar cualquier componente, el repo de SubasCars debe validarse contra vulnerabilidades críticas activas en Next.js/React 19.

**Solution:** Agente que crawlea el Storybook live de SubasCars extrayendo componentes, variantes, props y estados directamente desde las stories + SAST scan (Snyk o Semgrep) sobre el repo verificando CVE-2025-55182 (React2Shell — RCE crítico, CVSS 10.0) antes de que cualquier componente sea considerado para portarse a Voyager.

#### CHALLENGE C — Definir criterios del audit antes de ejecutar

Sin criterios definidos primero, los outputs de los audits de VMC y SubasCars no son comparables entre sí. Un agente que categoriza sin estructura produce inventarios inconsistentes que no se pueden cruzar. Los criterios incluyen: la estructura de dominios bajo la que se categorizará todo, los niveles de acceso a cubrir, y la naming convention que haga el output AI-readable.

**Solution:** Establecer antes de cualquier extracción:
- **5 dominios funcionales:** Primitivos & Tokens / UI Core / Discovery & Navegación / Subasta en Tiempo Real / Transaccional & Cuenta
- **3 niveles de acceso en VMC:** no loggeado, loggeado, postor activo en subasta
- **Naming convention AI-native:** patrón `<property>-<sentiment>-<state>` alineado al dialecto DTCG que los LLMs esperan (bg-primary-hover, border-destructive, etc.)

#### CHALLENGE D — Transformar output crudo en componentes nombrados y categorizados

Los screenshots de VMC y los datos del Storybook de SubasCars son datos crudos — nombres de clases, capturas visuales, árboles de props. Solos no dicen nada accionable. El trabajo de interpretación y categorización — decidir qué es un componente, a qué dominio pertenece, cómo se llama en el dialecto AI-native — es el paso crítico entre tener datos y tener taxonomía.

**Solution:** Agente de categorización que procesa screenshots de VMC y datos del Storybook de SubasCars, aplica los 5 dominios funcionales y genera el inventario con los 10 campos requeridos por componente:
1. **Nombre humano** — nombre legible y estandarizado
2. **Nombre AI/código** — identificador DTCG (dialecto framework)
3. **Dominio funcional** — cuál de los 5 dominios
4. **Origen** — VMC / SubasCars / nuevo
5. **Descripción y propósito** — qué hace y qué dato muestra
6. **Anatomía** — sub-elementos que lo componen
7. **Props y schema logic** — variantes, estados, API
8. **Tokens y variables** — qué tokens DTCG consume
9. **Accesibilidad** — ARIA roles, contraste, teclado
10. **Decisión** — portar / optimizar / crear desde cero

#### CHALLENGE E — Unificar ambas fuentes en un solo documento curado

Tener ambos inventarios categorizados no es el entregable final — hay que cruzarlos, identificar duplicados, detectar gaps, y tomar decisiones de curaduría: qué de VMC se optimiza, qué de SubasCars se porta, qué Voyager necesita que no existe en ninguna de las dos fuentes. El resultado de esta curaduría es TAXONOMY.md — no un dump de todo lo que existe, sino la taxonomía específica de Voyager.

**Solution:** TAXONOMY.md — inventario unificado y curado con los 10 campos por componente, versionado en el repo, organizado bajo los 5 dominios funcionales. La fase NO termina hasta que este documento esté al 100% completo. Es el único input válido para ib-fundamentos. Sin TAXONOMY.md al 100%, la siguiente fase no comienza.

### Hypothesis

Cuando ib-taxonomia concluye, Voyager cuenta con su taxonomía propia — construida a partir de lo mejor de VMC Subastas y SubasCars, curada bajo los 5 dominios funcionales, con cada componente categorizado, sus 10 campos definidos y su decisión asignada. Ese documento es el único input válido para las fases siguientes: define exactamente qué construir, en qué orden y con qué criterio.

---

## PHASE 2 — PURPOSE PYRAMID

### Task Base

```
TASK A — Establecer los criterios del audit antes de ejecutar
          cualquier extracción
          Antes de que ningún agente toque VMC ni SubasCars,
          deben estar definidos: los 5 dominios funcionales
          bajo los que se categorizará todo (Primitivos &
          Tokens / UI Core / Discovery & Navegación /
          Subasta en Tiempo Real / Transaccional & Cuenta),
          los 3 niveles de acceso a auditar en VMC (no
          loggeado, loggeado, postor activo en subasta), y
          la naming convention AI-native con patrón
          <property>-<sentiment>-<state> alineada al dialecto
          DTCG. Sin esto definido primero, los outputs de
          B y C no son comparables entre sí.

TASK B — Auditar VMC Subastas en vivo mediante agente
          automatizado
          VMC Subastas no tiene repositorio de componentes.
          Un agente automatizado navega sistemáticamente
          todas las pantallas en los tres niveles de acceso,
          captura screenshots de alta resolución y DOM
          snapshots de cada estado y variante visible —
          incluyendo estados interactivos (hover, focus,
          loading, error, vacío). El clustering visual
          agrupa instancias del mismo componente que
          aparecen en múltiples páginas con variaciones
          menores de DOM o CSS.

TASK C — Extraer componentes de SubasCars vía Storybook
          live + validación de seguridad
          ▲ KEYSTONE
          Un agente crawlea sistemáticamente el Storybook
          live de SubasCars (subascars-storybook-gcp.web.app)
          extrayendo por cada componente: nombre, stories
          disponibles, props y sus tipos, y comportamiento
          por estado. En paralelo, un SAST scan (Snyk o
          Semgrep) verifica el repo contra CVE-2025-55182
          (React2Shell — RCE crítico, CVSS 10.0 en Next.js
          /React 19) antes de que cualquier componente sea
          considerado para portarse a Voyager.

TASK D — Categorizar el output crudo de ambas fuentes
          bajo la taxonomía de Voyager
          Con los datos de VMC (screenshots + DOM) y de
          SubasCars (Storybook data) en mano, un agente
          de categorización procesa cada componente
          identificado y lo mapea a los 5 dominios
          funcionales, completando los 10 campos requeridos
          por componente.

TASK E — Curar y producir TAXONOMY.md — entregable
          final de la fase
          Con el inventario categorizado de ambas fuentes,
          se ejecuta la curaduría: se toma lo mejor de VMC
          y de SubasCars, se cruzan ambas fuentes para
          identificar duplicados y gaps, y se descarta lo
          que no sirve a Voyager. TAXONOMY.md es el
          resultado — documento unificado, versionado en
          el repo. La fase NO termina hasta que esté al
          100%. Es el único input válido para ib-fundamentos.
```

### Objectives

```
── SECTION A ──────────────────────────────────────────────────

OBJECTIVE 1 [Tasks A → B]
El paisaje de componentes de VMC Subastas está completamente
documentado — cada pantalla capturada en los tres niveles de
acceso (no loggeado, loggeado, postor activo en subasta), cada
componente y variante identificado, organizado bajo los criterios
y dominios establecidos en Task A antes de cualquier extracción.

OBJECTIVE 2 [Tasks B → C] ▲ KEYSTONE BRIDGE
Las dos fuentes de referencia de Voyager están completamente
capturadas — VMC desde la plataforma viva, SubasCars desde su
Storybook, ambas con seguridad validada (CVE-2025-55182
escaneado). El inventario crudo existe y es confiable.

── SECTION B ──────────────────────────────────────────────────

OBJECTIVE 3 [Tasks C → D]
Cada componente identificado en ambas fuentes está categorizado
bajo los 5 dominios funcionales con sus 10 campos completos —
el inventario crudo se convierte en datos estructurados,
nombrados bajo la naming convention AI-native y listos para
la curaduría final.

OBJECTIVE 4 [Tasks D → E]
TAXONOMY.md existe, está curado y está al 100% — lo mejor de
VMC y SubasCars seleccionado, cruzado, sin duplicados ni gaps,
con decisión asignada a cada componente. La fase está completa
y ib-fundamentos puede comenzar.
```

### Responsibilities

```
RESPONSABILIDAD X [Section A | Central Task: B]
Garantizar que el inventario crudo de ambas fuentes sea
completo y libre de gaps — ningún componente, estado o
variante significativa omitida antes de proceder a la
categorización.

RESPONSABILIDAD Y [Section B | Central Task: D]
Garantizar que cada decisión de categorización y curaduría
sea precisa y justificada — la taxonomía refleja la realidad
de ambas plataformas, no suposiciones del agente.
```

### Purpose

```
Establecer el orden de construcción de Voyager — una taxonomía
AI-driven construida a partir de dos plataformas auditadas que
se convierte en la fuente de verdad AI-readable que los agentes
consumen como contexto para construir con precisión, eliminando
suposiciones y definiendo exactamente qué hacer y en qué secuencia.
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

- La fase produce UN solo entregable: TAXONOMY.md al 100%. Sin él, ib-fundamentos no comienza.
- Los 5 dominios funcionales son: Primitivos & Tokens / UI Core / Discovery & Navegación / Subasta en Tiempo Real / Transaccional & Cuenta
- Los 10 campos por componente son obligatorios — ningún componente entra a TAXONOMY.md sin los 10 campos completos
- VMC se audita en 3 niveles: no loggeado, loggeado, postor activo — el tercer nivel expone componentes de bidding que no existen en los otros dos
- SubasCars Storybook live: subascars-storybook-gcp.web.app — fuente primaria para el audit de SubasCars
- SAST scan es obligatorio antes de portar cualquier componente de SubasCars — CVE-2025-55182 (React2Shell, CVSS 10.0) activo en Next.js/React 19
- Naming convention AI-native: patrón `<property>-<sentiment>-<state>` alineado al dialecto DTCG
- La taxonomía es curaduría, no dump — se toma lo mejor de ambas fuentes, se descartan redundancias y lo que no sirve a Voyager
- Esta fase NO produce componentes ni código de producción

---

## Revision Log

| Version | Date | Change |
|---|---|---|
| v1 | 2026-04-13 | IB Taxonomía construido co-creativamente en sesión. Todos los elementos validados. Research de Gemini Deep Research integrado para tooling y estructura de taxonomía. |

---

## Source

Sesión: VMC Subastas — Voyager IB Taxonomía build + Gemini Deep Research integration, 2026-04-13
