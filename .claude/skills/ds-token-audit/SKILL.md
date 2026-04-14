---
name: ds-token-audit
description: Auditoría de tokens Voyager — gatekeeper, Terrazzo, CSS, alineación DESIGN.md / IB Fundamentos, y brief para Gemini Deep Research. Usar cuando haya dudas en semánticos vs primitivos, colores que no coinciden con la doc, o antes de cerrar una fase de fundamentos.
type: procedure
project: VMC Subastas — Voyager
---

# DS Token Audit — Voyager

Actúas como **auditor de design system** (no solo implementador). Objetivo: que `tokens.json` + Terrazzo + CSS + `/docs` + `DESIGN.md` formen un solo sistema verificable.

## Cuándo usar este skill

- Después de cambios grandes en `tokens.json` o `terrazzo.config.mjs`.
- Cuando “los colores en pantalla no parecen DESIGN.md”.
- Cuando los semánticos no parecen enlazar a primitivos (cadenas `var()` rotas o RGB plano inesperado).
- Antes de declarar **ib-fundamentos** “cerrado”.

## Procedimiento (orden fijo)

1. **Auditoría rápida**: `pnpm tokens:audit` (gatekeeper + Terrazzo + `type-check` + ESLint).
2. **Greps de coherencia** (ejemplos):
   - `rg "var\\(--vmc-color" src/styles/globals.css` vs `rg "^  --vmc-color" src/styles/tokens/tokens-semantics-light.css` — detectar variables referenciadas pero no generadas.
   - `rg "color\\.(background|text)\\." terrazzo.config.mjs` — confirmar que `include` cubre **todos** los paths profundos (`background.urgency.*`, `text.market.*`, `badge.**`, etc.).
3. **Opcional**: `pnpm build` antes de merge si tocó `@theme` o layout global.

## Criterios de aceptación (IB + DESIGN)

- Tres capas respetadas: primitivos numéricos / utilidades base → semánticos (Dot Notation + intención) → uso en componentes solo con `var(--vmc-*)` o utilidades mapeadas.
- **En Vivo (naranja)** y **Negociable (cyan)** aparecen como **roles** (`timer.imminent`, `badge.*`, `card.border.*`), no como nombres de tinte en `text.*` genérico.
- `DESIGN.md` v1.1.0 en raíz es fuente creativa; `tokens.json` es fuente técnica — documentar divergencias explícitas (ej. tipografía triple IB vs Stitch).

## Salida esperada del agente

Lista breve:

- **OK**: qué reglas pasaron.
- **Riesgos**: tokens o patrones Terrazzo dudosos.
- **Acciones**: cambios concretos de archivo (ruta + qué hacer).

---

## Prompts para Gemini Deep Research (copiar/pegar)

Usar **uno por sesión** para no mezclar temas. Pegar tal cual; sustituir `[VERSIÓN]` si aplica.

### A) Terrazzo + DTCG + globs anidados

> Estoy usando Design Tokens Community Group JSON con Terrazzo CLI v2 y `@terrazzo/plugin-css` con opción `include` como lista de globs por archivo de salida (primitivos vs semánticos). Los token IDs son anidados (`color.background.urgency.high`, `color.text.market.bullish`, `color.badge.live.bg`).  
> Pregunta de investigación: **¿cómo deben escribirse los patrones `include`/`exclude` en Terrazzo v2 para no omitir tokens hijos de dos o más niveles?** Incluye ejemplos de globs correctos vs incorrectos, límites del `CachedWildcardMatcher`, y recomendaciones para pipelines con `color.background.*` vs `color.background.**` o patrones explícitos por subárbol.  
> Contexto de salida: CSS con variables `--token-id-con-guiones` y múltiples archivos (`primitives` / `semantics-light` / `semantics-dark`).

### B) Semántica de color multi-marca (Vault + acento + estado)

> Plataforma financiera / subastas de alto valor con marca primaria morada (#22005C), acento naranja de urgencia “En Vivo” (#ED8936) y acento cyan “Negociable” (#00CACE). Queremos **naming semántico** (no `orange-600` en JSX) compatible con DTCG y consumo por agentes de código.  
> Investiga: **patrones de taxonomía** (Primitives → Semantic → Component), cómo nombrar urgencia vs error vs “live indicator”, y antipatrones (p. ej. usar `red` para countdown). Referencia: Material dynamic color, IBM Carbon, Bloomberg-like density.  
> Entrega: tabla sugerida `semantic path → intención → primitivo típico` y reglas de contraste APCA para datos financieros en vivo.

### C) Gatekeeper automático + CI para tokens

> Tenemos un script Node que valida `tokens.json` antes de Terrazzo (descripciones obligatorias, formato de color, alias solo en rutas semánticas, escalas de 12 pasos, etc.).  
> Investiga: **lista de validaciones recomendadas** para un design system orientado a IA (AI-readable tokens), cómo versionar breaking changes de tokens (SemVer), y cómo integrar el gatekeeper en CI (GitHub Actions) con fallos claros.  
> Incluye comparación ligera con Style Dictionary / Tokens Studio export y riesgos de drift entre Figma y repo.

### D) Alineación spec creativo (Stitch/Figma) ↔ repo técnico

> Tenemos un `DESIGN.md` humano (versionado) como spec creativo y un `tokens.json` como fuente compilada. El equipo detecta “desalineación visual” aunque los HEX coincidan, por drift en **tipografía**, **motion** o **layout** entre spec y tokens.  
> Investiga: **proceso de gobernanza** para mantener spec y tokens sincronizados (ownership, RFC, deprecation), y cómo documentar “fuentes de verdad” múltiples sin contradicción para equipos híbridos diseño+IA+dev.

---

## Revision log

| Fecha | Cambio |
|------|--------|
| 2026-04-13 | Skill inicial + prompts Deep Research + alineación gatekeeper prefijos semánticos (`status`, `badge`, `card`). |
