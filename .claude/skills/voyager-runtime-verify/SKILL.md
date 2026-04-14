---
name: voyager-runtime-verify
description: Obliga verificación HTTP real (build + next start + rutas) antes de cerrar tareas que tocan rutas, layouts, middleware o navegación. Usar siempre que se edite src/app, middleware, root layout, globals.css, o flujos de redirección; nunca dar por terminado un cambio sin pnpm verify:pages en verde.
---

# VOYAGER — Verificación en runtime (páginas que no fallan)

## Objetivo

Que **ningún cambio** que pueda romper el sitio en producción quede entregado sin comprobar que **el servidor responde** en las rutas críticas. `type-check` y `lint` no bastan: hay que **levantar `next start`** y hacer **GET** reales.

## Complemento: Context7 (documentación al día)

Antes de implementar patrones de **Next.js App Router**, **React**, **Tailwind v4** o **RTK Query** en cambios no triviales, consultar **Context7 MCP** (`resolve-library-id` → `query-docs`). Así se reduce el riesgo de APIs mal usadas (“página en blanco”, errores de RSC, middleware). No sustituye esta skill: **hay que ejecutar `verify:pages` igual**.

En **Cursor**, la regla `.cursor/rules/voyager-context7-docs-first.mdc` refuerza el mismo hábito en archivos bajo `src/app`, middleware, estilos y stores.

## Cuándo aplicar esta skill (obligatorio)

Activar y seguir este procedimiento **antes de decir “listo”** si tocaste cualquiera de:

- `src/app/**` (páginas, layouts, `loading`, `error`, rutas dinámicas)
- `middleware.ts` o redirecciones / cookies / auth
- `src/app/globals.css` o imports globales que afecten el root
- Navegación compartida (`DocsHeader`, `DocsAreaNav`, enlaces a `/docs/*`, etc.)

Si solo cambiaste copy en un markdown aislado sin rutas, aún así ejecuta **`pnpm verify:pages:quick`** si existe `.next` reciente; si no, **`pnpm verify:pages`**.

## Comandos del proyecto

| Comando | Qué hace |
|--------|-----------|
| `pnpm verify:pages` | `pnpm build` + `next start` en puerto `VERIFY_PORT` (default **3999**) + GET a rutas críticas. Falla en **5xx** o timeout. |
| `pnpm verify:pages:quick` | Igual pero **`--skip-build`** (usa `.next` existente; más rápido en iteración). |

Puerto alternativo: `VERIFY_PORT=4001 pnpm verify:pages`.

## Checklist (orden fijo)

1. Si tocaste **tokens** o `tokens.json` / Terrazzo: `pnpm tokens:audit` (o al menos gatekeeper + build según el alcance).
2. **`pnpm verify:pages`** (o `:quick` solo si acabas de hacer un build exitoso y no cambiaste nada que invalide `.next`).
3. Si **`verify:pages` falla**: arreglar hasta que pase; **no** cerrar la tarea con “debería funcionar”.
4. Si el usuario reporta fallo **solo en `pnpm dev`**: igualmente ejecutar **`verify:pages`** para alinear con **paridad producción**; luego reproducir en dev si hace falta.
5. Si acabas de usar **`pnpm dev` con Turbopack** y **`verify:pages:quick`** falla con errores raros de React/webpack: ejecutar **`pnpm build`** y **`pnpm verify:pages`** completo (`.next` puede estar mezclado).

## Qué NO cuenta como “verificado”

- Solo `pnpm build` sin levantar el servidor y pegarle a las URLs.
- Solo abrir el navegador “a ojo” sin dejar el comando en verde en el repo.
- Asumir que un 302/307 es error: el script acepta redirecciones manuales y rechaza **5xx**.

## Rutas comprobadas por el script

Definidas en `scripts/verify-routes.mjs`: home, `/docs` y subrutas de documentación, `/login`, y un GET a `/` con cookie de sesión de prueba para detectar bucles o 500 en middleware.

## Mensaje al usuario al cerrar

Incluir una línea explícita, por ejemplo: **“Verificado: `pnpm verify:pages` OK (puerto 3999).”** Si usaste `:quick`, indicarlo.
