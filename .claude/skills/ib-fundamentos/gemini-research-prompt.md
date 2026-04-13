# Gemini Deep Research Prompt — ib-fundamentos + ib-componentes
**Uso:** Pegar completo en Gemini Deep Research antes de construir ib-fundamentos
**Stack:** Next.js 15 App Router · TypeScript strict · Tailwind CSS v4 · RTK Query · Zustand · Terrazzo · pnpm

---

```
Research goal: Resolver todas las fricciones técnicas y gaps de implementación
para construir un design system production-ready con este stack exacto antes
de escribir una sola línea de código. Necesito respuestas concretas con código
funcional, no teoría genérica.

Stack de referencia:
  - Next.js 15 (App Router)
  - TypeScript strict (no any)
  - Tailwind CSS v4 (CSS-first, sin tailwind.config.js)
  - RTK Query (Redux Toolkit) para toda la capa async
  - Zustand para estado UI global
  - Terrazzo CLI (token transformer)
  - W3C DTCG como formato de tokens
  - OKLCH como espacio de color
  - pnpm como package manager
  - Node.js 20+

═══════════════════════════════════════════════════════════════
BLOQUE 1 — TOKEN PIPELINE: tokens.json → Terrazzo → tokens.css
═══════════════════════════════════════════════════════════════

1. ¿Cuál es la estructura exacta de un tokens.json válido para Terrazzo
   en formato W3C DTCG? Mostrar ejemplo real con:
   - Colores primitivos (paleta de 10 pasos)
   - Colores semánticos (bg-primary, text-primary, border-destructive, etc.)
   - Tipografía (familia, tamaños, pesos, line-height)
   - Spacing (escala 4px base)
   - Border-radius
   - Shadows

2. ¿Cómo se define un color OKLCH en formato DTCG?
   ¿El $value es "oklch(60% 0.15 250)" como string?
   ¿Terrazzo lo pasa directo a CSS o lo transforma a otro formato?
   ¿Cómo forzar que el output de Terrazzo sea OKLCH nativo (no hex)?

3. ¿Cómo se modelan tokens semánticos que referencian primitivos en DTCG?
   Ejemplo: bg-primary → color.brand.500
   ¿Sintaxis: {color.brand.500} o $value: "{color.brand.500}"?

4. ¿Cómo se manejan light/dark mode en tokens.json con Terrazzo?
   ¿Grupos separados o propiedad especial? Mostrar estructura.

5. Configuración mínima de terrazzo.config.mjs para generar tokens.css
   con CSS custom properties. Mostrar el archivo completo.

6. ¿Qué genera Terrazzo exactamente?
   ¿Formato: --color-brand-500: oklch(60% 0.15 250); ?
   ¿Cómo se nombran las variables generadas (convención)?

7. ¿Cómo integrar Terrazzo en el pipeline de build de Next.js 15?
   ¿package.json scripts, next.config.ts plugin, o paso separado?
   ¿Terrazzo debe correr antes del next build o puede ser paralelo?

8. ¿Terrazzo soporta múltiples archivos de output?
   Ej: tokens-primitivos.css + tokens-semanticos.css separados.

═══════════════════════════════════════════════════════════════
BLOQUE 2 — TAILWIND CSS v4 CONSUMIENDO TOKENS DE TERRAZZO
═══════════════════════════════════════════════════════════════

9. En Tailwind v4 CSS-first, ¿cómo se conectan las CSS custom properties
   de Terrazzo con las utilidades de Tailwind?
   ¿Se usa @theme { --color-primary: var(--token-color-primary); }?
   Mostrar el patrón exacto en el archivo CSS principal.

10. ¿Cómo se define la escala tipográfica en Tailwind v4 CSS-first
    consumiendo tokens de Terrazzo?
    ¿Se puede mapear --font-size-lg de Terrazzo a text-lg de Tailwind?

11. ¿Cuáles son las limitaciones conocidas de Tailwind v4 al consumir
    CSS custom properties?
    ¿Hay casos que no funcionan (gradients, opacity modifiers, etc.)?

12. ¿clsx y tailwind-merge son compatibles con Tailwind v4?
    ¿Hay cambios en cómo se usa tailwind-merge con la nueva arquitectura CSS-first?
    Mostrar patrón de uso correcto para lógica condicional de clases.

13. ¿Existe plugin oficial o community de Terrazzo para Tailwind v4?
    Si no, ¿cuál es el workaround recomendado?

═══════════════════════════════════════════════════════════════
BLOQUE 3 — RTK QUERY + NEXT.JS 15 APP ROUTER
═══════════════════════════════════════════════════════════════

14. RTK Query fue diseñado para React client-side. En Next.js 15 App Router
    con Server Components, ¿cuál es el patrón correcto?
    - ¿RTK Query solo en Client Components o puede usarse en Server?
    - ¿Cómo coexisten Server Components (fetch nativo) con Client Components
      que usan RTK Query hooks?
    - ¿Dónde vive el Redux Provider en el App Router?

15. ¿Cuál es el patrón correcto para el interceptor de RTK Query en
    Next.js 15 App Router que:
    - Auto-agrega el token JWT en cada petición
    - Auto-desloguea si recibe 401
    - Es reutilizable en múltiples services/slices
    Mostrar implementación completa (baseQuery con prepareHeaders + retry).

16. ¿Cómo se implementa refresh token con RTK Query en App Router?
    Mostrar el patrón de baseQueryWithReauth completo.

17. ¿Hay incompatibilidades conocidas entre Redux/RTK Query y
    Next.js 15 App Router (hidration mismatches, serialization issues)?
    ¿Cómo resolverlas?

═══════════════════════════════════════════════════════════════
BLOQUE 4 — ZUSTAND EN NEXT.JS 15 APP ROUTER
═══════════════════════════════════════════════════════════════

18. ¿Cuál es el patrón correcto para Zustand en Next.js 15 App Router
    sin hydration mismatch?
    ¿Se necesita el patrón createStore vs create para SSR?
    Mostrar implementación de un store de UI (modal state, auth).

19. ¿Cómo coexisten RTK Query (para datos async) y Zustand (para UI state)
    sin duplicar estado? ¿Hay un patrón de separación recomendado?

═══════════════════════════════════════════════════════════════
BLOQUE 5 — ARQUITECTURA FEATURE-BASED EN APP ROUTER
═══════════════════════════════════════════════════════════════

20. La arquitectura feature-based propone src/features/<nombre>/ pero
    Next.js App Router tiene src/app/<ruta>/. ¿Cómo conviven sin conflicto?
    - ¿Los features van en src/features/ y las páginas en src/app/ que los importan?
    - ¿O los features van dentro de src/app/(features)/?
    Mostrar estructura de directorios completa recomendada.

21. ¿Cómo se hace el barrel export correcto (index.ts) en un feature
    para que Next.js App Router no tenga problemas con tree-shaking
    y code-splitting?

22. ¿Dónde viven los componentes atómicos (src/components/ui/) en relación
    con App Router? ¿Deben ser siempre Client Components o pueden ser Server?

═══════════════════════════════════════════════════════════════
BLOQUE 6 — TYPESCRIPT STRICT + PATRONES DE COMPONENTES
═══════════════════════════════════════════════════════════════

23. En un proyecto con TypeScript strict y Next.js 15 App Router,
    ¿cuál es la diferencia entre tipar un Server Component vs Client Component?
    ¿Las Props se tipan diferente? ¿Qué restricciones hay en Props de Server Components?

24. ¿Cuál es el patrón correcto para tipar eventos en componentes React
    con TypeScript strict?
    Mostrar: onClick, onChange (input), onSubmit (form).

25. ¿Cómo se implementan Error Boundaries en Next.js 15 App Router?
    ¿error.tsx cubre todos los casos o se necesitan Error Boundary components
    adicionales para Client Components?

═══════════════════════════════════════════════════════════════
BLOQUE 7 — PALETA OKLCH PARA PLATAFORMA TRANSACCIONAL
═══════════════════════════════════════════════════════════════

26. ¿Cuáles son las mejores prácticas para una paleta OKLCH en una
    plataforma transaccional de alto valor (subastas, finanzas)?
    - ¿Cuántos pasos en la escala cromática?
    - ¿Cómo garantizar contraste APCA suficiente en tokens semánticos?
    - Colores de acción (CTA), estado (success/error/warning), neutral

27. ¿Hay herramientas que permitan exportar directamente a formato DTCG
    o generar valores OKLCH compatibles con Terrazzo?
    ¿oklch.com, Huetone, Radix Colors en OKLCH?
    ¿Cuál es el workflow: diseñar en herramienta → exportar → tokens.json?

═══════════════════════════════════════════════════════════════
OUTPUT ESPERADO
═══════════════════════════════════════════════════════════════

Para cada pregunta:
- Respuesta técnica concreta
- Ejemplo de código funcional donde aplique
- Versiones de las herramientas si hay cambios entre versiones
- Incompatibilidades o edge cases conocidos

Identificar específicamente:
- Cualquier incompatibilidad entre Terrazzo + Tailwind v4
- Cualquier friction point entre RTK Query + Next.js 15 App Router
- Cualquier hydration issue conocido con Zustand en App Router
- Cambios breaking entre Tailwind v3 y v4 que afecten estos patrones
```
