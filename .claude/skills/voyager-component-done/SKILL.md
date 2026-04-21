# Skill: voyager-component-done
**Workflow completo para maquetar un componente DS de NORMAL → DONE**
**Token budget: ~4k tokens de sesión si se sigue el protocolo exacto**

---

## Activación
`/voyager-component-done <NombreComponente>`
Ejemplo: `/voyager-component-done Header`

---

## 0. Pre-lectura obligatoria (ANTES de escribir código)

Leer en este orden exacto — parar si falta alguno:
1. `src/features/<Nombre>/<Nombre>.tsx` — versión NORMAL existente
2. `src/features/<Nombre>/SPEC.md` o `<NOMBRE>_DONE_SPEC.md` si existe
3. Figma via MCP: `mcp__f3f807ad__get_design_context` con el node ID del componente

Solo después de leer los tres, proceder.

---

## 1. Estructura de archivos que se crean/tocan

```
src/features/<Nombre>/
  <Nombre>Done.tsx           ← componente principal (nuevo)
  index.ts                   ← agregar export si no existe

src/app/docs/components/
  <Nombre>ImageContext.tsx   ← solo si el componente tiene imágenes
  <Nombre>DoneShowcaseSection.tsx
  <Nombre>DoneHandoffPanel.tsx

src/app/api/source/<nombre>/
  route.ts                   ← sirve el .tsx como texto plano

src/app/docs/sections/
  ComponentesPreviewSection.tsx  ← agregar la nueva sección
```

---

## 2. Patrón del componente DONE

### Container queries (SIEMPRE — nunca Tailwind responsive)
```tsx
// En el componente, dentro de un bloque <style>:
const STYLES = `
  .cd-container {
    container-type: inline-size;
    container-name: cd;    /* cd = siglas del componente, ej: hd = header */
  }
  @container cd (min-width: 640px) { /* tablet */ }
  @container cd (min-width: 1024px) { /* desktop */ }
`;
// Prefijo de clases: .{siglas}-{elemento}, ej: .fd-link, .hd-nav, .ac-price
```

**Por qué container queries y no Tailwind:**
Tailwind `lg:flex-row` responde al VIEWPORT del navegador, no al contenedor.
En el viewport switcher del DS (420/640/1024px) el viewport NO cambia → breakpoints de Tailwind nunca se activan.
Container queries responden al ancho del `<div>` contenedor → funcionan en el switcher.

### Props canónicas
```tsx
export interface <Nombre>DoneProps {
  // Solo overrides para preview en docs. En producción sin props.
  // Ejemplo para imágenes:
  logoSrc?: string;
}
export default function <Nombre>Done({ logoSrc }: <Nombre>DoneProps): JSX.Element {
  const resolvedLogoSrc = logoSrc ?? "/images/<nombre>-canonical.png";
  // ...
}
```

### Tokens — reglas de aplicación
```tsx
// ✅ Correcto
style={{ backgroundColor: "var(--vmc-color-background-brand)" }}
// ✅ Correcto para hover/active (no existe token *-hover)
"color-mix(in oklch, var(--vmc-color-background-brand) 85%, var(--vmc-color-text-primary))"
// ❌ Prohibido
style={{ backgroundColor: "#22005C" }}
style={{ color: "oklch(0.22 0.18 285)" }}  // hardcoded, no token
```

### Funciones nominales siempre
```tsx
// ✅ Correcto
{links.map(function renderLink(link) { return <li key={link.label}>…</li>; })}
// ❌ Prohibido
{links.map((link) => <li key={link.label}>…</li>)}
```

---

## 3. Patrón del ImageContext (cuando hay imágenes)

Solo crear si el componente tiene imágenes que el usuario necesita customizar en el preview.

```tsx
// src/app/docs/components/<Nombre>ImageContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";

const KEYS = {
  imagenA: "vds-<nombre>-imagen-a",
  imagenB: "vds-<nombre>-imagen-b",
} as const;

interface <Nombre>ImageContextValue {
  imagenASrc: string | undefined;
  imagenBSrc: string | undefined;
  setImagenASrc: (v: string) => void;
  setImagenBSrc: (v: string) => void;
  clearImagenASrc: () => void;
  clearImagenBSrc: () => void;
}

// ... (ver FooterImageContext.tsx como referencia completa)
export function <Nombre>ImageProvider({ children }: { children: ReactNode }): JSX.Element { ... }
export function use<Nombre>Images(): <Nombre>ImageContextValue { ... }
```

---

## 4. Patrón del ShowcaseSection

```tsx
// src/app/docs/components/<Nombre>DoneShowcaseSection.tsx
"use client";
import { ComponentShowcase } from "./ComponentShowcase";
import <Nombre>Done from "@/features/<Nombre>/<Nombre>Done";
import { use<Nombre>Images } from "./<Nombre>ImageContext"; // si aplica
import { <Nombre>DoneHandoffPanel } from "./<Nombre>DoneHandoffPanel";
import type { JSX } from "react";

export function <Nombre>DoneShowcaseSection(): JSX.Element {
  const { imagenASrc } = use<Nombre>Images(); // si aplica
  return (
    <div>
      <ComponentShowcase title="<Nombre>" status="done">
        <<Nombre>Done imagenASrc={imagenASrc} />
      </ComponentShowcase>
      <<Nombre>DoneHandoffPanel />
    </div>
  );
}
```

---

## 5. API Route — fuente del componente (OBLIGATORIO)

```ts
// src/app/api/source/<nombre>/route.ts
// Sirve el .tsx como texto plano. El HandoffPanel lo fetcha en runtime.
// Así NO se embebe el código fuente en el bundle del panel (ahorra ~20-50KB + tokens futuros).

import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const ALLOWED_COMPONENTS: Record<string, string> = {
  "<nombre>": "src/features/<Nombre>/<Nombre>Done.tsx",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ component: string }> }
): Promise<NextResponse> {
  const { component } = await params;
  const relPath = ALLOWED_COMPONENTS[component];
  if (!relPath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const absPath = join(process.cwd(), relPath);
  const content = await readFile(absPath, "utf-8");
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

---

## 6. HandoffPanel — estructura de secciones

El panel usa el componente `<SourceSection>` (ver `ComponentHandoffShared.tsx`) que fetcha el código en runtime.

Secciones en orden canónico:
1. **Importación** — import A (directo) + import B (barrel)
2. **Uso** — `<Componente />` sin props
3. **Código fuente completo** — `<SourceSection component="<nombre>" />` (fetch API)
4. **Árbol HTML semántico** — ASCII tree del DOM
5. **Contenido canónico** — tabla links + tabla textos
6. **Swap legacy** — antes/después
7. **Layout responsivo** — tabla breakpoints
8. **Tokens de color** — tabla zona/token
9. **Imágenes requeridas** — `<ImageAssetsSection>` si aplica
10. **Integración en layout** — código Next.js
11. **Tokens CSS mínimos** — fallback para producción
12. **QA checklist** — ítems específicos del componente

---

## 7. Registro en ComponentesPreviewSection

```tsx
// src/app/docs/sections/ComponentesPreviewSection.tsx
// 1. Importar el Provider (si tiene imágenes) y el ShowcaseSection
import { <Nombre>ImageProvider } from "../components/<Nombre>ImageContext";
import { <Nombre>DoneShowcaseSection } from "../components/<Nombre>DoneShowcaseSection";

// 2. En modo "done", agregar:
{mode === "done" && (
  <>
    {/* Footer */}
    <FooterImageProvider><FooterDoneShowcaseSection /></FooterImageProvider>
    {/* <Nombre> */}
    <<Nombre>ImageProvider><<Nombre>DoneShowcaseSection /></<Nombre>ImageProvider>
  </>
)}
```

---

## 8. Sincronizar medidas en taxonomy-components.ts (OBLIGATORIO — VD-49/VD-50)

Antes de marcar el componente como DONE, actualizar su entrada en `taxonomy-components.ts`:

```ts
// Campos que SIEMPRE deben reflejar el estado DONE real:
{
  id: "<nombre>-primary",
  // ...
  specs: {
    h: "<valor real del componente DONE>",   // ej: "variable (≥ 96px)"
    w: "<valor real>",                        // ej: "1024px full width"
    pad: "<valor real>",                      // ej: "32px 32px 16px"
    background: "var(--vmc-color-background-brand)",  // SIEMPRE token, nunca HEX
  },
  status: "done",  // cambiar de "normal" o "upgrade"
}
```

**Por qué:** el wireframe en /docs/taxonomia muestra las medidas del objeto `specs`.
Si no se actualizan, el visual (correcto) y los números (desactualizados) no coinciden.
Este fue el bug VD-50 detectado en FooterDone.

---

## 9. QA antes de cerrar

Ejecutar `/voyager-qa` sobre el componente nuevo.
Criterios de bloqueo específicos de maquetado:
- [ ] Container queries funcionan en 420/640/1024px del viewport switcher
- [ ] Sin HEX hardcodeados (verificar con grep: `grep -r "#[0-9a-fA-F]" src/features/<Nombre>/`)
- [ ] Sin `oklch(` literals fuera de tokens (excepto en `color-mix()` con var())
- [ ] Logo/imagen visible en todos los viewports
- [ ] Focus ring visible en todos los links
- [ ] `role` no duplica semántica nativa (no `role="contentinfo"` en `<footer>`)

---

## 9. Deploy

```bash
pnpm type-check          # 0 errores
pnpm build               # 0 errores, 0 warnings
npx vercel deploy --prod # → https://voyager-vmc.vercel.app
```

---

## Referencia de componentes ya completados

| Componente | Archivo | API route | Notas |
|---|---|---|---|
| FooterDone | `src/features/Footer/FooterDone.tsx` | `/api/source/footer` | Imágenes: logo + reclamaciones |

---

## Anti-patterns — lo que costó tokens en Footer (no repetir)

| Anti-pattern | Costo | Fix |
|---|---|---|
| Usar `lg:flex-row` Tailwind para responsive | 3 iteraciones hasta descubrir container queries | Siempre container queries en DS |
| Embeber 480 líneas de source como string en panel | +2KB bundle, riesgo de stale | API route + fetch en runtime |
| `role="contentinfo"` en `<footer>` | QA FAIL + corrección extra | `<footer>` ya tiene rol implícito |
| `oklch(0 0 0)` hardcodeado | QA FAIL | Siempre `var(--vmc-color-text-primary)` |
| No leer SPEC.md antes de codificar | 2 rondas de correcciones visuales | Pre-lectura es paso 0 |
