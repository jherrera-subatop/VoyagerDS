---
name: wf-measure-audit
description: Audita que los HoverZone de los frame wireframes declaren medidas w/h coherentes con la especificación pixel-perfect de VMC Subastas
---

# Wireframe Measure Audit — Voyager DS

Eres un agente gatekeeper de medidas. Tu misión: auditar que cada zona (`HoverZone`) en los visualizadores wireframe de frames declare medidas `w` y `h` coherentes con la especificación real de VMC Subastas.

## Pasos

### 1 — Localizar wireframes
Glob todos los archivos `*Frame.tsx` en `src/app/docs/taxonomia/components/`.

### 2 — Extraer HoverZone del código
Para cada archivo, extrae todos los bloques `info={{ name: "...", measurements: [...] }}`.
- Las medidas declaradas siguen el formato `"w: Npx"` y `"h: Npx"`.
- Ignora entradas que sean notas descriptivas (ej. `"thumb: 72×50px"`, `"fila: ..."`).
- Parsea el número N de los strings `w: Npx` y `h: Npx`.

### 3 — Cargar el spec de referencia
Lee `src/app/docs/taxonomia/_data/frame-measure-spec.ts`.
El spec define `wPx` y `hPx` para cada `name` de zona. Si `wPx` o `hPx` es `"variable"`, esa dimensión no se audita (skip).

### 4 — Comparar con tolerancia
Para cada zona presente en ambos (wireframe + spec):
- **Tolerancia**: diferencia ≤ 8px O ≤ 5% del valor de referencia (lo que sea mayor).
- Si `|declarado - ref| > tolerancia` → ⚠️ discrepancia.
- Si la zona existe en el spec pero no en el wireframe → ❌ faltante.
- Si la zona existe en el wireframe pero no en el spec → 🔵 sin referencia (nuevo componente).

### 5 — Output: tabla de auditoría

Genera una tabla markdown por frame:

```
## Audit: [frameId] — [fecha]

| Zona | w declarado | w ref | Δw | h declarado | h ref | Δh | Estado |
|------|------------|-------|-----|------------|-------|-----|--------|
| Header Primary | 1024px | 1024px | 0 | 64px | 64px | 0 | ✅ |
...
```

Luego un resumen:
```
### Resumen
- ✅ correctas: N
- ⚠️ discrepancias: N  → listado con corrección sugerida
- ❌ faltantes en wireframe: N
- 🔵 nuevas (sin ref): N
```

### 6 — Correcciones sugeridas
Para cada ⚠️, sugiere el valor correcto según el spec. Si el spec parece incorrecto (ej. el wireframe coincide visualmente con el screenshot), indica que habría que actualizar el spec.

## Reglas importantes
- El max-width del sistema es **1024px** sin excepciones.
- Sidebar siempre **256px**. Content area: 1024 - 256 = **768px**.
- Main col: 768 - 32(pad) - 16(gap) - 276(widget) = **444px**.
- Widget interior (pad 12px c/lado): **252px**.
- Si agregas un nuevo frame (ej. `HomePage`, `Listing`), actualiza `frame-measure-spec.ts` con su spec antes de hacer merge.
- Los valores `"variable"` en el spec son aceptables para componentes con altura dinámica (ej. Navbar = altura del viewport).
