# Frontend Lineamientos — VOYAGER
**Fuente:** Frontend - Lineamientos.docx
**Aplica a:** Todas las fases de construcción (ib-componentes en adelante)
**Estos lineamientos son LAW — no son sugerencias.**

---

## 1. Stack Tecnológico Base

```
Framework:  Next.js 15 App Router
Lenguaje:   TypeScript — tipado estricto, PROHIBIDO any
Estilos:    Tailwind CSS v4 (CSS-first)
Datos:      RTK Query (Redux Toolkit) — toda la capa async
Estado UI:  Zustand — modales, filtros, auth, estados ligeros
```

---

## 2. Arquitectura de Archivos — Feature-based

Cada funcionalidad autocontenida vive en `src/features/<nombre>/`:

```
src/features/<nombre>/
├── index.ts              ← punto de entrada (exportación pública)
├── <NombreFeature>.tsx   ← componente principal
├── styles.ts             ← clases Tailwind complejas / componentes de soporte
├── constants.tsx         ← textos estáticos, configs, valores fijos
└── types.ts              ← tipado del feature
```

Componentes atómicos reutilizables (Button, Input, etc.) viven en:
```
src/components/ui/
```

---

## 3. Estándares de Código — OBLIGATORIOS

### TypeScript
- **PROHIBIDO `any`** — todas las props, variables y retornos deben estar tipados
- Definir `interface` clara para cada conjunto de Props
- Tipos opcionales con `?`, eventos tipados: `onClick?: () => void`
- Usar `Enum` cuando aplique

### Control de flujo
- **PROHIBIDO ternarios en if** — usar `if/else` claro o cortocircuito `&&` para renderizado condicional simple
- **PROHIBIDO funciones anónimas** — todas las funciones deben ser nominales o asignadas a constantes

### Principios
- **SOLID** — cada componente tiene una única responsabilidad
- **Clean Code** — nombres descriptivos, funciones pequeñas, cero lógica duplicada

---

## 4. Estructura & Markup (HTML)

- Etiquetas HTML semánticas obligatorias: `section`, `article`, `header`, `button`, etc.
- Accesibilidad básica: `aria-label`, `role`, `alt` en imágenes
- Todos los componentes deben ser **totalmente responsive**

---

## 5. Estilos (Tailwind CSS v4)

- Diseño moderno y limpio
- Estados de interacción obligatorios: `hover:`, `focus:`, `active:`, `disabled:`
- Lógica condicional de estilos: usar `clsx` o `tailwind-merge`
- Clases complejas o reutilizables → extraer a `styles.ts` del feature

---

## 6. Lógica y Estado (Hooks)

- Estado con `useState`
- Efectos con `useEffect` — **siempre con cleanup function**
- Funciones controladoras con prefijo `handle` — definidas **fuera del return**
- Si la lógica supera 20 líneas → extraer a `use<FeatureName>Logic.ts` dentro del feature

---

## 7. Manejo de Datos

- **RTK Query** para toda llamada a API (cache automático, hooks generados)
- Interceptor RTK Query para:
  - Auto-agregar token en cada petición
  - Auto-desloguear en caso de token expirado
  - El interceptor debe ser **reutilizable** en cada service
- **Refresh token** implementado para auto-sincronizar módulos, vistas, middleware y sidebar

---

## 8. Manejo de Errores

- **Error Boundaries** en cada feature
- **Loading states** consistentes en cada feature
- No dejar estados de error silenciosos

---

## 9. Entregable por componente

Un solo archivo funcional `.tsx` con:
- Exportación por defecto
- Interface de Props definida en el mismo archivo (o importada desde `types.ts`)
- Listo para ser importado y usado sin configuración adicional

---

## Checklist antes de hacer PR

- [ ] Sin `any` en ningún lugar del feature
- [ ] Todas las funciones tienen nombre (no anónimas)
- [ ] `useEffect` tiene cleanup si aplica
- [ ] Funciones `handle*` fuera del return
- [ ] Estados de carga y error manejados
- [ ] Componente responsive testeado
- [ ] Atributos ARIA básicos presentes
- [ ] Lógica > 20 líneas extraída a hook
