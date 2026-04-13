---
name: token-optimizer
description: Técnicas de optimización de contexto y tokens para sesiones largas de Claude Code en Voyager. Usar cuando el contexto esté saturado, antes de sesiones largas, o cuando /context muestre alta densidad. NO usar en tareas de código normales.
---

# Token Optimizer — Voyager

```xml
<when-to-use>
  - /context muestra densidad alta (amarillo/rojo)
  - Sesión supera ~80k tokens
  - Antes de iniciar un IB nuevo
  - Al cambiar de fase del proyecto
</when-to-use>

<strategies>
  <compact>
    Ejecutar /compact antes de nueva fase.
    Claude resume el historial y libera contexto sin perder estado.
  </compact>

  <clear>
    Ejecutar /clear al terminar un componente completo.
    Iniciar nueva sesión con SPEC.md como único input.
  </clear>

  <context-check>
    Ejecutar /context para ver densidad actual.
    Verde: continuar · Amarillo: considerar /compact · Rojo: /clear obligatorio
  </context-check>

  <scope-anchor>
    Iniciar Claude desde el directorio del componente específico:
    cd src/features/[Componente] && claude
    Evita que el agente escanee el repo completo innecesariamente.
  </scope-anchor>
</strategies>

<cache-rules>
  - DESIGN.md y AGENTS.md son contexto estático → candidatos a prompt cache
  - Prefijo inmutable: tools → system (rules) → conversación
  - NO incluir timestamps ni datos volátiles en el system prompt
  - Modelo Sonnet 4.6: umbral mínimo 2,048 tokens para cache
</cache-rules>

<session-hygiene>
  Al terminar cada componente:
  1. git commit con mensaje descriptivo
  2. /compact o /clear según densidad
  3. Nueva sesión con contexto limpio para el siguiente componente
</session-hygiene>
```
