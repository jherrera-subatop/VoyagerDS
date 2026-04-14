# Voyager — Resumen para reunión
> VMC Subastas · Design System · Estado al 14 de abril de 2026

---

## 1. Qué es Voyager

**Voyager** es la modernización visual de **VMC Subastas** (plataforma de subastas de vehículos, Perú).

- **Qué cambia:** Solo la **capa visual** (UI). Los flujos de negocio, el copy y la lógica del producto legacy se mantienen intactos.
- **Por qué:** La UI actual genera desconfianza financiera en nuevos usuarios antes de que evalúen el producto. Voyager devuelve la autoridad visual que la trayectoria de VMC merece.
- **Cómo:** Un arquitecto humano orquesta **agentes de IA especializados**. Ventana de ejecución: ~4 meses.

---

## 2. Cómo funciona el IB (Intention Builder)

El IB es el **marco de planificación** del proyecto. Tiene dos partes que van juntas:

```
INTENTION MATRIX               PURPOSE PYRAMID
────────────────               ───────────────
Necesidad / oportunidad    →   5 Tareas (secuenciales)
Suposición (resultado)     →   4 Objetivos (parejas de tareas)
Retos + Soluciones         →   2 Responsabilidades (continuas)
Hipótesis (estratégica)    →   Propósito (por qué importa)
```

**Para Voyager** se construyeron 5 IBs en total:

| IB | Qué es | Entregable |
|----|--------|-----------|
| **ib-maestro** | Estrategia global del proyecto | Gobernanza + criterios (no es código) |
| **ib-taxonomia** | Inventario de qué existe y qué construir | `TAXONOMY.md` completo |
| **ib-fundamentos** | Infraestructura técnica (tokens, estado) | Pipeline funcional + gatekeeper |
| **ib-componentes** | Construcción de piezas de UI | `src/components/ui/*` |
| **ib-handoff** | Entrega al producto real | Integración con app legacy |

Los IBs van **en orden**. No se abre el siguiente sin cerrar el anterior.

---

## 3. Dónde estamos en el roadmap

```
ib-maestro ✅  →  ib-taxonomia 🔄  →  ib-fundamentos ✅  →  ib-componentes 🔶  →  ib-handoff ⬜
```

| IB | Estado | Detalle |
|----|--------|---------|
| ib-maestro | **Cerrado** | IB validado; gobernanza, scope UI-only y criterios definidos |
| ib-taxonomia | **En curso** | Ruta B: avanza por tipo de pantalla; VMC DETALLE (22 componentes) documentado |
| ib-fundamentos | **Operativo** | Pipeline tokens (215 tokens, gatekeeper), Redux/Zustand, middleware, estructura |
| ib-componentes | **Iniciado** | Button implementado como primer átomo; 21 componentes pendientes |
| ib-handoff | **No iniciado** | Fase posterior |

> **Ruta B:** la taxonomía no espera estar al 100% global para avanzar. Crece marco por marco (tipo de pantalla). El arquitecto valida el cierre de cada marco antes de escalar componentes.

---

## 4. Qué hay en la taxonomía hoy

**Marco documentado:** VMC DETALLE (página de oferta individual)
**Total de componentes inventariados:** 22
**Marcos pendientes de audit:** Listado/Catálogo, Home, otros

### Por dominio funcional

| Dominio | Componentes | Ejemplos |
|---------|-------------|---------|
| Primitivos y tokens | 1 | Icon |
| UI Core | 3 | Button ✅, Input, SubasCoins Banner |
| Layout y navegación | 5 | Header, Navbar, Footer, Title Bar, Sidebar |
| Subasta y oferta | 6 | PriceDisplay, AuctionCard, Metrics, Bid Widget, Option Tags, Promo Banner |
| Datos del vehículo | 2 | VehicleSpecs, DataQualityIndicator |
| Media e imágenes | 1 | Image Gallery |
| Contenido y documentos | 3 | Description, Documents Downloads, Conditions Accordion |
| Soporte y ayuda | 1 | Help Center Banner |

### Por decisión de construcción

| Decisión | Cantidad | Qué significa |
|----------|----------|---------------|
| **referencia-subascars** | 20 | Existe en SubasCars Storybook → usarlo como referencia anatómica. NO portar código; construir nuevo componente con UI upgrade. |
| **solo-vmc** | 2 | No existe en SubasCars → construir desde audit de VMC en vivo (DOM + screenshots). |
| **pendiente-audit** | 0 | Ninguno sin documentar en este marco. |

---

## 5. Qué sigue

### Prioridad inmediata: completar componentes del marco Detalle

Orden sugerido (ver `COMPONENTS_PRIORITY.md`):

```
P0 — Primitivos compartidos:   Badge, PriceDisplay, CountdownTimer
P1 — Shell de página:          Header, Sidebar, AuctionStatusBanner
P2 — Contenido principal:      ImageGallery, VehicleSpecs, Accordion, DocumentDownloads
P3 — Columna de oferta:        AuctionSummaryWidget, Input, AuctionActionBar
P4 — Transversales:            SubasCoinsBanner, HelpCenterBanner, AuctioneerSection, Cards
```

### Próximo marco: VMC LISTADO (catálogo de subastas)
Una vez cerrado el Detalle, el siguiente tipo de pantalla a auditar e inventariar en la taxonomía es el **listado / catálogo** (grid de AuctionCards, filtros, navegación).

---

## 6. Qué hay en el repo en este momento (demo)

La app corre en **http://localhost:3420**:

| Ruta | Qué muestra |
|------|-------------|
| `/` | Home del DS (estado del sistema) |
| `/docs` | Índice de documentación |
| `/docs/taxonomia` | Inventario de los 22 componentes con stats |
| `/docs/taxonomia/inventario` | Tabla completa por dominio |
| `/docs/taxonomia/marco-detalle-vmc` | Wireframe interactivo del marco Detalle |
| `/docs/fundamentos` | Pipeline de tokens y gate técnico |
| `/docs/componentes` | Componentes ya implementados en código |
| `/docs/design-spec` | DESIGN.md renderizado |

---

## 7. Frase de cierre

> "Tenemos la estrategia validada (IB Maestro), el pipeline técnico operativo (215 tokens, gatekeeper), y el inventario del marco Detalle cerrado con 22 componentes catalogados. El primer componente en código (Button) cumple todos los criterios. Lo que sigue es construir los componentes del Detalle en orden de dependencia, auditar el marco Listado y acercar el handoff al producto."

---

*Documento generado el 14-abr-2026 · VoyagerDS / RESUMEN_REUNION.md*
