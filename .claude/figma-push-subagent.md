# Figma push — instrucciones mínimas (subagente / handoff)

**Uso:** adjuntar solo este archivo al subagente que genera el JS de `use_figma`.  
**Detalle completo:** [figma-push-ref.md](./figma-push-ref.md) (solo si hace falta depurar casos raros).

---

## Prompt fijo — sesión principal (padre) → subagente

Copiar y pegar sustituyendo `…` por el bloque `@figma-spec` o por la salida de `pnpm figma:extract-spec -- <path.tsx>`.

```
Tarea: generar UN script JavaScript para use_figma (Figma Plugin API) a partir del spec adjunto.

Restricciones:
- NO leas el .tsx completo ni figma-push-ref.md; el spec adjunto es la única fuente de medidas/tokens/capas.
- NO uses get_metadata, ToolSearch, get_design_context ni exploración del archivo Figma para buscar páginas.
- Page destino: id de página "3:4" (Context). Archivo: 7bjDwC20BX1AFrv9Q8BOIb (referencia humana; use_figma ya corre en el archivo correcto).
- Exactamente UNA llamada use_figma: crear componentes, combineAsVariants si aplica, grid manual, doc frame, validación inline; return { ok, errs } mínimo.
- Sin screenshot salvo que el usuario lo pida.

Reglas técnicas: seguir .claude/figma-push-subagent.md (fuentes, HEX→RGB, createComponent).

Spec / JSON:
…
```

---

## Destino (constantes)

| Qué | Valor |
|-----|--------|
| Archivo Figma | `7bjDwC20BX1AFrv9Q8BOIb` |
| Página | node id `3:4` (nombre en archivo: Context) |
| Raíz del componente | `figma.createComponent()` — nunca `createFrame()` para el nodo raíz |

```javascript
const pg = figma.root.children.find(p => p.id === '3:4');
await figma.setCurrentPageAsync(pg);
```

---

## Eficiencia — obligatorio

1. **Una** llamada `use_figma` por componente.
2. **No** `get_metadata` para buscar páginas — usar `3:4` como arriba.
3. **No** segunda `use_figma` para “arreglar” layout.
4. `combineAsVariants` no auto-posiciona — grid manual en el mismo script.
5. Validación inline al final — `return { ok: !errs.length, variants, errs }` (mínimo).
6. Screenshot solo si el usuario lo pide.

---

## Fuentes (orden crítico)

1. Al inicio: `await Promise.all([... figma.loadFontAsync(...) ])` incluyendo **Inter Regular** (evita fallos del default de `createText`).
2. Para cada texto: **`fontName` antes de `characters`**.

```javascript
function hexToFigmaRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}
```

Cargar según necesidad: Plus Jakarta Sans (Regular, Medium, SemiBold, Bold), Roboto (Regular, Bold), Roboto Mono (Regular, Bold). Ver tabla larga en `figma-push-ref.md` si duda.

---

## RGB y medidas

- HEX del spec: `parseInt(..., 16) / 255` — **no** redondear a mano.
- Dimensiones y posiciones: **solo** las del `@figma-spec` / JSON — no estimar.

---

## Variantes

- `figma.combineAsVariants(comps, figma.currentPage)` → `COMPONENT_SET`.
- Nombres de variantes: `Prop=value, Prop2=value2`.

---

## Extracción determinista (padre, antes del subagente)

Desde la raíz del repo:

```bash
pnpm figma:extract-spec -- src/features/OfferCard/OfferCard.tsx
```

Pegar el JSON al subagente junto con este archivo; así el subagente no necesita `Read` del TSX.
