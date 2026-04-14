# COMPONENTS_PRIORITY — ib-componentes (marco VMC DETALLE)

Orden sugerido para implementar piezas alineadas a [`DESIGN.md`](./DESIGN.md) sección 9 y al marco **Detalle** en [`TAXONOMY.md`](./TAXONOMY.md). Construir primero primitivos que otras piezas componen.

**Reglas:** solo tokens (`var(--vmc-*)`); SubasCars como referencia anatómica, no portar código; ver [`CLAUDE.md`](./CLAUDE.md).

---

## P0 — Base y dependencias compartidas

| # | Componente (DESIGN.md) | Notas |
|---|------------------------|--------|
| 1 | **Button** (9.1–9.2) | Ya implementado en `src/components/ui/Button`. |
| 2 | **Badge** (9.4) | Estados de lote; usado en cards, banner, widget. |
| 3 | **PriceDisplay** (9.9) | Contextos hero / card / compact. |
| 4 | **CountdownTimer** (9.8) | `data-status`, Roboto Mono + tabular-nums. |

---

## P1 — Shell y contexto de página

| # | Componente (DESIGN.md) | Notas |
|---|------------------------|--------|
| 5 | **Header** (9.13) | 64px, panel derecho; breadcrumb + acciones. |
| 6 | **Sidebar** (9.14) | 256px + brand 64px. |
| 7 | **AuctionStatusBanner** (9.10) | Debajo del header en detalle; `data-status`. |

---

## P2 — Contenido principal detalle

| # | Componente (DESIGN.md) | Notas |
|---|------------------------|--------|
| 8 | **VehicleImageGallery** (9.16) | Galería + thumbnails. |
| 9 | **VehicleSpecsRow** (9.17) | Chips de especificación. |
| 10 | **DataQualityBadge** (9.18) | Datos verificados / parciales / básicos. |
| 11 | **Accordion** (9.19) | Secciones colapsables (info, términos). |
| 12 | **DocumentDownloadRow** (9.21) | Filas de documentos descargables. |

---

## P3 — Columna de acción y oferta

| # | Componente (DESIGN.md) | Notas |
|---|------------------------|--------|
| 13 | **AuctionSummaryWidget** (9.11) | Columna derecha; compone badge, precio, countdown. |
| 14 | **Input Field** (9.3) + **TextField / SearchInput** (9.24) si aplica | Monto de oferta; búsqueda en header si el marco lo incluye. |
| 15 | **AuctionActionBar** (9.12) | Input + OFERTAR + participaciones. |

---

## P4 — Piezas transversales y promos

| # | Componente (DESIGN.md) | Notas |
|---|------------------------|--------|
| 16 | **SubascoinsPromoBanner** (9.21) | Franja promocional. |
| 17 | **HelpCenterBanner** (9.22) | Cierre de página. |
| 18 | **AuctioneerSection** (9.23) | Otros lotes del rematador (si aplica al detalle). |
| 19 | **Auction Card (Standard)** (9.5) | Grid de tarjetas dentro de sección rematador u otras grillas en detalle. |
| 20 | **Auction Card (Featured)** (9.6) | Variante destacada cuando el layout lo requiera. |
| 21 | **Auction Card (Compact)** (9.7) | Lista horizontal densa si aplica. |
