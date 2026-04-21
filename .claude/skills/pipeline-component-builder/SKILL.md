# Skill: pipeline-component-builder
**Pipeline de construcción con loop de iteración interno y memoria acumulada**

## Activación
`/pipeline-component-builder <NombreComponente>`
Ejemplo: `/pipeline-component-builder Sidebar`

---

## Arquitectura del pipeline

```
component-learnings.json
        ↓ (Agent 0 lee y prepara contexto)
Agent 1 — UX Writer        → contenido canónico auditado
        ↓
Agent 2 — UI Lead          → spec visual con tokens exactos
        ↓
Agent 3 — Stitch Builder   → genera prompt optimizado para Stitch
        ↓
    [Stitch genera v1]
        ↓
Agent 4 — Audit            → score contra scorecard + learnings
        ↓
  score >= 80? 
    NO → Agent 3 refina prompt con fallas específicas → Stitch vN → re-audita
    SÍ → presentar al usuario con score breakdown
        ↓
Agent 5 — Learning Capture → (post-Figma) captura correcciones → actualiza JSON
```

---

## Agent 0 — Learning Reader

**Input:** `.claude/pipeline/component-learnings.json`

**Tarea:**
1. Leer `global_principles` — inyectar como restricciones base
2. Leer `stitch_prompt_patterns.always_include` y `common_failures`
3. Buscar componentes similares ya procesados (mismo domain) — extraer `learned_principles`
4. Construir un "context brief" de máx 500 tokens para pasar al resto de agentes

**Output:** `LEARNING_CONTEXT` — bloque de texto que se inyecta al inicio de cada agente

---

## Agent 1 — UX Writer

**Input:** wireframe atom del componente + `LEARNING_CONTEXT`

**Tarea:**
1. Auditar el wireframe contra la referencia VMC en vivo (`/api/vmc-live-url`)
2. Extraer todo el contenido textual canónico (labels, textos, tooltips)
3. Verificar contra `canonical_content` en learnings si ya existe
4. Producir `CONTENT_SPEC` — solo contenido aprobado, sin invención

**Restricciones del learner:**
- Si existe `canonical_content` en el JSON → usar exactamente ese, no reinventar

---

## Agent 2 — UI Lead

**Input:** `CONTENT_SPEC` + wireframe measurements + `LEARNING_CONTEXT` + `approved_tokens` del componente si existen

**Tarea:**
1. Traducir wireframe a spec visual con tokens exactos
2. Aplicar `approved_tokens` de componentes similares (sidebar usa tokens del footer)
3. Definir estados: default, hover, active, disabled
4. Producir `VISUAL_SPEC` — dimensiones, tokens, estados, restricciones

**Restricciones del learner:**
- Aplicar todos los `global_principles` del JSON
- Si un componente del mismo `approved_tokens` — heredar y extender, no reinventar

---

## Agent 3 — Stitch Prompt Builder

**Input:** `CONTENT_SPEC` + `VISUAL_SPEC` + `LEARNING_CONTEXT` + historial de iteraciones anteriores

**Tarea:**
1. Construir el prompt de Stitch con TODA la especificación
2. Incluir explícitamente los `iteration_triggers` como restricciones ("CRITICAL: ...")
3. Si es iteración > 1: añadir sección "PREVIOUS VERSION FAILURES:" con fallas específicas del audit
4. Llamar `mcp__stitch__generate_screen_from_text`

**Reglas del prompt:**
- Siempre incluir dimensiones exactas en px
- Siempre listar labels numerados y en orden
- Siempre incluir "CRITICAL:" para los failure patterns conocidos
- En re-iteraciones: incluir descripción de qué falló en la versión anterior

---

## Agent 4 — Audit Agent

**Input:** screenshot URL de Stitch + `VISUAL_SPEC` + `LEARNING_CONTEXT`

**Tarea:** Evaluar el resultado contra el scorecard

### Scorecard (threshold: 80/100)

| Criterio | Peso | Cómo evaluar |
|---|---|---|
| brand_colors | 25 | ¿Background es #22005C? ¿Colores de texto correctos? |
| typography | 20 | ¿Plus Jakarta Sans? ¿Tamaños correctos? ¿Roboto Mono en datos? |
| layout_fidelity | 25 | ¿Dimensiones exactas? ¿Spacing correcto? |
| content_accuracy | 20 | ¿Labels exactos? ¿Sin invención de contenido? |
| ds_rules | 10 | ¿Sin 1px borders de separación? ¿Sin box-shadow genérico? |

**Output:**
```
AUDIT_RESULT:
  score: XX/100
  pass: true/false
  failures:
    - [criterio] [descripción específica de qué falló]
    - ...
  refinements_for_next_iteration:
    - "CRITICAL: [instrucción exacta para el prompt de Stitch]"
    - ...
```

**Si score < 80:** volver a Agent 3 con `AUDIT_RESULT.refinements`
**Si score >= 80:** presentar al usuario

### Límite de iteraciones: 3
Si después de 3 iteraciones el score sigue < 80, presentar el mejor resultado con nota de qué requiere ajuste manual en Figma.

---

## Agent 5 — Learning Capture (post-Figma)

**Cuándo activar:** Después de que el usuario trae el resultado corregido de Figma via MCP

**Input:** 
- Node ID del componente en Figma (via `mcp__f3f807ad__get_design_context`)
- Versión aprobada por Stitch antes de ir a Figma
- `.claude/pipeline/component-learnings.json`

**Tarea:**
1. Leer el design context del nodo Figma final
2. Comparar contra la spec de Stitch que se envió
3. Extraer delta — qué cambió el usuario en Figma
4. Convertir cada cambio en un `learned_principle` con formato:
   ```json
   {
     "component": "sidebar",
     "change": "descripción del cambio",
     "principle": "regla general derivada del cambio",
     "applies_to": ["componentes donde aplica esta regla"]
   }
   ```
5. Actualizar `component-learnings.json`:
   - Agregar a `components[nombre].corrections_from_figma`
   - Si el principio es universal → agregar también a `global_principles`
   - Incrementar `stitch_iterations` del componente
   - Cambiar `status` a `"done"`

**Output:** Resumen de qué aprendió + JSON actualizado

---

## Flujo completo de ejecución

```bash
# 1. Activar pipeline
/pipeline-component-builder Sidebar

# El pipeline ejecuta internamente:
# Agent 0 → lee learnings → LEARNING_CONTEXT
# Agent 1 → CONTENT_SPEC
# Agent 2 → VISUAL_SPEC  
# Agent 3 → Stitch v1
# Agent 4 → score=72, fail → refinements
# Agent 3 → Stitch v2 (con refinements)
# Agent 4 → score=85, pass ✓
# → Presentar v2 al usuario con score breakdown

# 2. Usuario lleva a Figma, hace correcciones, trae con MCP
/pipeline-component-builder Sidebar --capture-figma-learnings --node-id 1:XXXX

# Agent 5 → captura delta → actualiza component-learnings.json
# Próximo componente arranca con +1 learning
```

---

## Estado del JSON tras cada componente

```json
{
  "components": {
    "sidebar": {
      "status": "done",
      "stitch_iterations": 2,
      "best_score": 85,
      "corrections_from_figma": ["..."],
      "learned_principles": ["..."]
    }
  },
  "global_principles": [
    // Se enriquece con cada componente
  ]
}
```

---

## Referencia de archivos

| Archivo | Rol |
|---|---|
| `.claude/pipeline/component-learnings.json` | Memoria persistente del pipeline |
| `.claude/skills/pipeline-component-builder/SKILL.md` | Este archivo |
| `.claude/pipeline/footer-agent1-ux.md` | Output Agent 1 para Footer (referencia) |
| `.claude/pipeline/footer-agent2-spec.md` | Output Agent 2 para Footer (referencia) |
