---
paths:
  - "**/*.css"
  - "**/*.tsx"
  - "**/*.ts"
---

# Voyager — Tailwind CSS v4 Rules

```xml
<rules>
- Motor: CSS-first (Oxide). SIN tailwind.config.js.
- Tema: @theme inyectado via Terrazzo desde tokens.json.
- Patrones v3 PROHIBIDOS: bg-opacity-*, text-opacity-*, tailwind.config.js.
- Opacidad moderna: bg-vault/10 o color-mix() — nunca bg-opacity-*.
- NO inventes clases que no existan en el @theme de Voyager.
- Lógica condicional de clases: clsx o tailwind-merge. NUNCA template literals.
- HEX hardcodeados: PROHIBIDOS. Siempre var(--token).
- Estados hover/active: derivar con color-mix() u oklch(from...).
</rules>

<token-pipeline>
  Tier 1 + Tier 2 → @theme → utilidades bg-*, text-*, border-*
  Tier 3 → :root sin namespace → consumir con var() en @layer components
</token-pipeline>

<figma-warning>
  Los HEX que ves en Figma son conversiones automáticas de Tokens Studio.
  NUNCA copies esos HEX al código. Usa el token correspondiente.
</figma-warning>
```
