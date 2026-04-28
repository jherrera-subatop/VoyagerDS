# voyager-ui-upgrade
**Reskin puro: mismo DOM · mismos textos · tokens Voyager.**

## Activación
```
/voyager-ui-upgrade <Nombre> <W>x<H>
```
Adjuntar en el mismo mensaje: screenshot + outerHTML (ya limpio de Vue noise).
Si falta alguno → pedir antes de continuar. No proceder sin ambos.

---

## Reglas absolutas — NUNCA romper
- **CERO lecturas de archivo.** Ni DESIGN.md, ni sidenav, ni nada del repo.
- DESIGN.md y governance ya están en contexto (rules cargadas) — no releer.
- DOM 100% idéntico al outerHTML. Sin agregar, quitar ni reordenar elementos.
- Texto 100% idéntico al outerHTML. Sin cambiar casing salvo `text-transform: uppercase` explícito.
- Sin HEX en código — solo `var(--voyager-token, #fallback)`.
- Paso 7 siempre vía subagente — el contexto principal no acumula esos archivos.

---

## Tokens de referencia (usar solo filas presentes en el outerHTML recibido)

| Clase legacy | Rol | Token |
|---|---|---|
| bg-casablanca / bg-amber-* | urgency bg | `var(--voyager-color-live, #ED8936)` |
| text-damask / text-orange-* | urgency text | `var(--voyager-color-live, #ED8936)` |
| teal / cyan / text-oracle | negotiable | `var(--voyager-color-negotiable, #00CACE)` |
| bg-vault / bg-purple / bg-brand | brand bg | `var(--voyager-color-vault, #22005C)` |
| text-white en dark bg | on-dark text | `var(--voyager-text-on-dark, #FFFFFF)` |
| text-gray-* / text-muted | secondary text | `var(--voyager-text-secondary, #494550)` |
| shadow-md / lg / xl | raised | `0 8px 16px rgba(0,0,0,0.10)` |
| shadow-sm | resting | `0 8px 16px rgba(34,0,92,0.06)` |
| rounded-full | pill | `border-radius: 9999px` |
| rounded / rounded-sm | default | `border-radius: 4px` |
| rounded-lg / rounded-xl | floating | `border-radius: 16px` |
| bg-white | card surface | `var(--voyager-surface-card, #FFFFFF)` |
| bg-gray-50 / bg-gray-100 | section bg | `var(--voyager-surface-section, #F2F4F3)` |

**Tipografía:**
- Número dinámico / precio / timer → Roboto Mono + `fontVariantNumeric: "tabular-nums"`
- Heading / label / badge / botón → Plus Jakarta Sans
- Body copy / metadata / descripción → Roboto

**Spacing:** snap al múltiplo de 4px más cercano del outerHTML (8, 12, 16, 24, 32…).

---

## Protocolo (en orden)

1. **Filtrar token map** — construir tabla solo con clases presentes en el outerHTML, descartar el resto
2. **Asignar tipografía** — una línea por texto, fuente + step
3. **Snap spacing** — anotar conversiones
4. **Escribir componente** → `src/features/<Nombre>/<Nombre>.tsx`
5. **`pnpm type-check`** → 0 errores antes de entregar
6. **Registrar** → subagente (ver abajo)

---

## Paso 6 — registro directo (sesión principal)

3 ediciones en orden:

**6a.** Append en `ComponentesSideNav.tsx` → array `COMPONENT_ITEMS`:
```ts
{ id: "<kebab>", label: "<Nombre>", status: "stitch" }
```

**6b.** Crear `src/app/docs/components/<Nombre>StitchShowcaseSection.tsx`:
```tsx
"use client";
import type { JSX } from "react";
import <Nombre> from "@/features/<Nombre>/<Nombre>";
import { ComponentShowcase } from "./ComponentShowcase";
const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "<kebab>-pending";
export function <Nombre>StitchShowcaseSection(): JSX.Element {
  return (
    <ComponentShowcase id="<kebab>" title="<Nombre>"
      description="<W>x<H>px" stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import <Nombre> from "@/features/<Nombre>/<Nombre>";'>
      <div style={{display:"flex",justifyContent:"center",padding:"32px 24px",background:"var(--voyager-surface-section)"}}>
        <<Nombre> />
      </div>
    </ComponentShowcase>
  );
}
```

**6c.** En `ComponentesPreviewSection.tsx` → añadir import + `<NombreStitchShowcaseSection />`

NO usar Agent/subagente — el registro en sesión principal cuesta ~2k tokens vs ~47k del subagente en frío.

---

## Señales de stop
- Elemento no presente en outerHTML → STOP, no inventar
- HEX literal en código → reemplazar con `var()`
- Texto modificado → revertir al original
- type-check con error → corregir antes de responder
