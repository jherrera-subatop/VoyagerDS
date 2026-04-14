# Voyager — Insumo para Claude Code

Documento operativo: gobernanza IB (Ruta B), criterios de cierre y reglas de ejecución. Complementa [`CLAUDE.md`](./CLAUDE.md).

---

## 1. Criterios de cierre: Ruta B vs. skill `ib-taxonomia` (100% global)

El skill oficial exige `TAXONOMY.md` al **100%** antes de declarar cerrada la fase y, en sentido estricto, antes de **ib-fundamentos**. En la ejecución real del repo se adoptó **Ruta B**: la taxonomía **crece por marco / page-type**, con iteraciones revisables.

**Reglas acordadas para no bloquear ni descontrolar el alcance:**

| Nivel | Qué significa | Quién cierra |
|------|----------------|--------------|
| **Marco cerrado** | Para un page-type dado (p. ej. VMC DETALLE): inventario auditado, 10 campos completos por componente listado en ese marco, decisiones `referencia-subascars` / `solo-vmc` / `pendiente-audit` asignadas | Arquitecto (validación explícita) |
| **Taxonomía global 100%** | Todos los page-types previstos para el alcance Voyager están documentados en `TAXONOMY.md` | Objetivo final de ib-taxonomia según skill |

**Para agentes:** no usar el “100% global” como excusa para no implementar tokens o componentes ya cubiertos por un **marco cerrado** documentado. Sí exigir que todo componente nuevo tenga entrada en `TAXONOMY.md` (o issue de deuda) antes de merge masivo sin inventario.

**Tensión explícita:** si el arquitecto ordena modo estricto skill, volver al gate secuencial completo hasta completar `TAXONOMY.md`.

---

## 2. Orden IB (recordatorio)

`ib-maestro` → `ib-taxonomia` → `ib-fundamentos` → `ib-componentes` → `ib-handoff`

- **ib-fundamentos** en este repo ya está operativo (pipeline, gatekeeper, estado); los agentes **mantienen** calidad de tokens al extender.
- **ib-componentes** consume [`DESIGN.md`](./DESIGN.md), [`TAXONOMY.md`](./TAXONOMY.md) y [`COMPONENTS_PRIORITY.md`](./COMPONENTS_PRIORITY.md).

---

## 3. Instrucciones operativas (copiar al inicio de una tarea)

1. Leer en orden: `DESIGN.md`, `TAXONOMY.md` (sección del marco activo), `CLAUDE.md`, y si la tarea es UI: `COMPONENTS_PRIORITY.md`.
2. Alcance: **solo cambios de UI** en el dominio autorizado; no alterar flujos de negocio ni copy legacy sin aprobación.
3. Tras implementar: `pnpm lint`, `pnpm type-check`. Si se tocaron rutas, layout raíz o middleware: `pnpm verify:pages`.
4. Código: sin `any`; sin ternarios (usar `if`/`else` o `&&` según convención del proyecto); estilos con `var(--token)` / variables VMC, **sin HEX en componentes**.

---

## 4. Referencias en repo

| Archivo | Uso |
|---------|-----|
| [`COMPONENTS_PRIORITY.md`](./COMPONENTS_PRIORITY.md) | Orden sugerido de implementación ib-componentes para pantalla Detalle |
| [`TAXONOMY.md`](./TAXONOMY.md) | Inventario y decisiones por componente |
| [`.claude/skills/ib-maestro/SKILL.md`](./.claude/skills/ib-maestro/SKILL.md) | IB macro |
| [`.claude/skills/ib-taxonomia/SKILL.md`](./.claude/skills/ib-taxonomia/SKILL.md) | IB fase taxonomía |
| [`.claude/skills/ib-fundamentos/SKILL.md`](./.claude/skills/ib-fundamentos/SKILL.md) | IB fase fundamentos |
