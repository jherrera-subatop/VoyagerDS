---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Voyager — TypeScript Strict Rules

```xml
<rules>
- any: PROHIBIDO. Usar tipos estrictos, opcionales (?), Enums o Zod.
- Ternarios: PROHIBIDOS. Usar if/else o &&.
- Funciones anónimas: PROHIBIDAS. Todas nominales o asignadas a constante.
- Props: Interface obligatoria. Eventos tipados (onClick?: () => void).
- Retornos: toda función tiene tipo de retorno explícito.
- Exports: export default en archivo principal del componente.
</rules>

<architecture>
- Features en src/features/[Nombre]/
- Lógica > 20 líneas → extraer a use[Nombre]Logic.ts
- Estado async: RTK Query
- Estado UI: Zustand
</architecture>

<validation>
  Antes de entregar código verifica:
  [ ] Cero any
  [ ] Cero ternarios
  [ ] Todas las funciones son nominales
  [ ] Props tipadas con Interface
  [ ] export default presente en componente principal
</validation>
```
