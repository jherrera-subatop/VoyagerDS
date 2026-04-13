# Gemini Deep Research — Design System Governance & Foundations
**Fecha:** 2026-04-13
**Input:** 29 preguntas, 8 bloques — sistemas de referencia: MD3, Apple HIG, Atlassian, IBM Carbon, Shopify Polaris, Radix, Ant Design, Base Web, Refinitiv Halo, Bloomberg Terminal
**Usado para:** Informar la taxonomía de tokens, gobernanza y decisiones fundacionales de Voyager

---

## DECISIONES ARQUITECTÓNICAS EXTRAÍDAS PARA VOYAGER

### Taxonomía de Capas
- Modelo de 3 capas es el estándar consolidado: Primitivos → Semánticos → Componente
- 4a capa solo si se soporta white-label multimarca — no aplica a Voyager en esta fase
- Naming de primitivos: escala NUMÉRICA (blue-100 a blue-900) — NUNCA semántica en primitivos

### Paleta de Color
- Escala de 12 pasos (modelo Radix) — distribución funcional inequívoca:
  - Pasos 1-2: fondos de contenedores y superficies
  - Pasos 3-5: estados interactivos (default, hover, active)
  - Pasos 6-8: bordes y separadores
  - Pasos 9-10: colores sólidos puros / fondos primarios de alta prominencia
  - Pasos 9 = anchor del color de marca (default del brand)
  - Pasos 11-12: textos de alto contraste
- Generar escala paralela alfa (a1-a12) para composiciones sobre fondos superpuestos
- Namespaces separados con Dot Notation: color.background.*, color.text.*, color.border.*, color.icon.*
- Categorías transaccionales adicionales obligatorias:
  - color.text.market.bullish / color.text.market.bearish (no son success/error)
  - color.background.urgency.low/high/critical (countdown timers)
  - color.surface.processing / color.border.verified (clearing & settlement)
  - color.action.execute.bid / color.action.execute.withdraw (bidding UI — protegido semánticamente)
  - color.timer.standard / color.timer.imminent

### Spacing
- Base: 4px/8px — múltiplos exactos, nunca impares (anti-aliasing blurring)
- 12-14 pasos suficientes — naming: multiplicador en cientos estilo Atlassian
  - space.100 = 8px, space.200 = 16px (permite space.150 = 12px sin romper secuencia)
- Separación cognitiva:
  - Micro (space.025-space.300 → 2px-24px): paddings internos, gaps de componentes, celdas
  - Macro (space.400-space.1200 → 32px-96px+): separación de módulos, márgenes de sección
- Tokens semánticos de spacing: SOLO para micro-estructuras ultra-repetitivas (table.cell.padding, form.input.gap)

### Tipografía
- 10-12 niveles productivos (no los 15 de MD3 — sobreingeniería)
- Naming combinado: text-heading-xl, text-body-sm (comunica rol HTML + jerarquía)
- Composite Tokens obligatorios: font-family + font-size + line-height + font-weight + letter-spacing
- **CRÍTICO: tabular-nums** — font-variant-numeric: tabular-nums en TODOS los tokens que renderizan precios, timers o valores numéricos cambiantes. Sin esto el texto "jitters" en WebSocket updates
- Responsive: breakpoints fijos (NO clamp()) — DTCG + agentes AI necesitan valores enteros predecibles

### Bordes, Radius y Elevación
- Border-radius: 4-5 pasos MÁXIMO, T-shirt sizes aceptable solo aquí:
  - radius-none (0px): tablas estructurales, divisores
  - radius-sm (2-4px): celdas de subasta, labels, checkboxes
  - radius-md (6-8px): botones primarios, inputs
  - radius-lg (12-16px): modales, popovers, agrupaciones superiores
  - radius-full (9999px): avatares, status dots
- Financiero = bordes agudos (0-4px dominantes) — radius amplio comunica "consumer app", no confianza financiera
- Elevación: 3 niveles ÚNICAMENTE (quasi-flat):
  - Elevación 1: hover en tarjetas accionables
  - Elevación 2: dropdowns, tooltips
  - Elevación 3: modals de confirmación crítica (con overlay-backdrop token)
- Border tokens semánticos (modelo Carbon):
  - border.subtle: divisores entre filas de tabla
  - border.strong: inputs, separaciones estructurales mayores
  - border.interactive / border.selected: acción presente
  - border.focus-ring: EXCLUSIVO para focus ring (outline, no box-shadow)

### Estados Interactivos
- 9+ estados mínimos para plataforma transaccional:
  default, hover, active/pressed, focus/focus-visible, selected, disabled, loading/processing, error/invalid, success/winning
- Naming: sufijo terminal en JSON — color-button-primary-background-hover
  NUNCA pseudo-clases en clave JSON (hover:bg-primary rompe AST parsers)
- Focus: outline + outline-offset OBLIGATORIO (NO box-shadow — overflow:hidden lo amputa)
  Token dedicado: color.border.focus-ring (alta luminancia APCA, azul/violeta prominente)
  WCAG 2.2 criteria 2.4.11 y 2.4.13 — contraste 3:1 mínimo del focus ring

### Motion
- 4 niveles para Voyager:
  - motion-duration-instant (0ms): datos WebSocket de precio/volumen — SIN fade-in, valor visible inmediatamente
  - motion-duration-fast (100ms): micro-feedback hover/press
  - motion-duration-moderate (200-250ms): overlays, dialogs de confirmación
  - motion-easing-standard + motion-easing-entrance: coordenadas Bezier
- Minimalismo cinético como mandato de negocio — transiciones largas = percepción de latencia en pasarela de pujas

### Gobernanza
- Versionado semántico (SemVer) para tokens: MAJOR.MINOR.PATCH
  - Patch/Minor: ajustes de valor sin renombrar
  - Major: renombrar o eliminar token → deprecation period obligatorio con warnings en IDE y CI/CD
- Regla de oro anti-sprawl: nuevo token primitivo SOLO si su cambio debe propagarse al 100% de la app
  Variaciones aisladas → Component Tokens bajo flujo formal de revisión
- Token sprawl = antipatrón documentado — linting en PR reviews
- Nomenclatura AI-first: {namespace}-{categoría}-{elemento}-{propiedad}-{estado}
  Ejemplo: voyager-color-button-primary-background-hover
  Hiper-explícito > críptico — los LLMs maximizan precisión con contratos inequívocos
- $description: OBLIGATORIO en cada token para consumo por MCP y agentes

### Plataformas Transaccionales — Diferenciadores
- Tipografía tabular-nums para números (bloomberg-style)
- Modo de densidad compacto como feature de diseño (multiplicador global de tokens de spacing)
- Contenedores: NO usar fondos coloreados para separar — usar border.subtle de 1px sobre fondo neutro (gray-1/gray-950)
- Fondos: gris casi blanco (gray-1) o casi negro (gray-950) puros — neutralizan fatiga ocular en sesiones largas
- Densidad ≠ reducir tamaño de fuente — densidad = optimizar spacing tokens en modo compacto

---

## RESEARCH COMPLETO (texto íntegro de Gemini)

[Ver documento original compartido en sesión 2026-04-13 — 8 bloques, 29 preguntas]
