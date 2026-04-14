# TAXONOMY.md — VOYAGER

> **Fase:** ib-taxonomia · Task E · Ruta B
> **Scope actual:** VMC DETALLE (oferta/61204) — iteración 1
> **Curado:** 13 de abril de 2026
> **Estado:** 🔄 En construcción — crece page-type por page-type (Ruta B)

---

## Criterios de cierre — Ruta B (operativo)

El skill oficial `ib-taxonomia` define cierre con `TAXONOMY.md` al **100%** global. En **Ruta B** el trabajo avanza por **marco (page-type)** con revisión explícita del arquitecto: un marco se considera **cerrado** cuando el inventario de ese page-type está documentado con los 10 campos y decisiones asignadas. La tensión con el gate formal y las reglas para agentes están descritas en [`VOYAGER_CLAUDE_CODE.md`](./VOYAGER_CLAUDE_CODE.md) (sección 1).

---

## Aclaración sobre las decisiones

| Decisión | Significado |
|---|---|
| `referencia-subascars` | Existe en SubasCars Storybook → usarla como **referencia anatómica** en ib-componentes. **NO portar código.** VMC manda en UX/comportamiento. SubasCars = alternativa a explorar. Output = componente nuevo, UI upgraded. |
| `solo-vmc` | No existe en SubasCars → construir desde audit VMC. Referencia: DOM snapshot + screenshots. |
| `pendiente-audit` | Anatomía insuficiente para documentar. Requiere audit adicional. |

---

## 1 — Primitivos & Tokens

### `icon` — Icon

| Campo | Valor |
|---|---|
| **Nombre humano** | Icon |
| **Nombre AI** | `icon` |
| **Dominio** | primitivos-tokens |
| **Origen** | VMC + SubasCars |
| **Decisión** | `referencia-subascars` |

**Descripción:** Elemento visual atómico. Comunica acciones, estados y conceptos sin texto. Decorativo o funcional según contexto.

**Anatomía:**
- svg sprite
- tamaño: sm/md/lg
- color via token

**Props conocidos:**
- Instancias en VMC DETALLE: 46
- Variantes SubasCars: Alert Circle, Arrow Asset, Attention, Available Subas Tokens, Back, Base, Bell, Bids, Calendar, Car, Check, Check Circle, Check In, Checkout, Clear, Clock 2, Clock, Clock 3, Close, Cookies, Don Justo, Down, Download, Drop Off, Drop On, Engine Displacement, Facebook, Fistbump, Forward, Fuel, Group, Groups Calendar, Higgest Bidder, Hub, Image, Info Circle, Instagram, Invoice, Like, Live, Location, Logout, Minus, On Hold Subas Tokens, Opportunities, Pause, Pay 2 Play, Photo Galery, Plate, Receipt, Share, Subas Token, Subas Top, Subas Wallet, Subastip, Subaszone, Tiktok, Traction, Transmission, Trash, Trophy, Up, Upload, User Calendar, Value, View, X, Youtube
- Storybook ref: https://subascars-storybook-gcp.web.app/?path=/story/icons--alert-circle

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: img (si decorativo: aria-hidden=true)
- Teclado: N/A si decorativo
- Notas: iconos funcionales requieren aria-label

> 📌 **SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.**

---

## 2 — UI Core

### `btn` — Button

| Campo | Valor |
|---|---|
| **Nombre humano** | Button |
| **Nombre AI** | `btn` |
| **Dominio** | ui-core |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Dispara una acción. Variantes: primario (CTA principal), secundario, ghost, destructivo. Estados: default, hover, focus, disabled, loading.

**Anatomía:**
- label
- icon-left?
- icon-right?
- estado: default/hover/disabled/loading

**Props conocidos:**
- Instancias en VMC DETALLE: 17

**Tokens:** Consumo vía `var(--vmc-*)` en `src/components/ui/Button` (ib-componentes — primer átomo). Primitivos/semánticos en `tokens.json` + Terrazzo.

**Accesibilidad:**
- ARIA roles: button
- Teclado: Enter/Space
- Notas: focus-visible required, disabled no ocultar

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

### `input` — Input

| Campo | Valor |
|---|---|
| **Nombre humano** | Input |
| **Nombre AI** | `input` |
| **Dominio** | ui-core |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Captura datos del usuario. Tipos: text, email, número, select, etc. Siempre con label visible y manejo de error explícito.

**Anatomía:**
- label
- placeholder
- helper-text
- error-text
- estado: default/focus/error/disabled

**Props conocidos:**
- Instancias en VMC DETALLE: 6

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: textbox/combobox/listbox según tipo
- Teclado: Tab, flechas en select
- Notas: label asociado obligatorio, error anunciado via aria-describedby

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

## 3 — Discovery & Navegación

### `header-primary` — Header

| Campo | Valor |
|---|---|
| **Nombre humano** | Header |
| **Nombre AI** | `header-primary` |
| **Dominio** | discovery-navegacion |
| **Origen** | VMC + SubasCars |
| **Decisión** | `referencia-subascars` |

**Descripción:** Identidad y navegación global. Contiene logo, links principales y accesos de cuenta. Persiste en todas las páginas.

**Anatomía:**
- logo
- nav-links
- cta-login
- cta-registro

**Props conocidos:**
- Instancias en VMC DETALLE: 8
- Variantes SubasCars: Group Checkout 2, Group Header 2, Group Console 2, Group Opportunity 2
- Storybook ref: https://subascars-storybook-gcp.web.app/?path=/story/main-single-publication-header--group-checkout-2

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: banner (landmark)
- Teclado: Tab a través de nav-links
- Notas: skip-to-content link recomendado

> 📌 **SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.**

---

### `nav-primary` — Navbar

| Campo | Valor |
|---|---|
| **Nombre humano** | Navbar |
| **Nombre AI** | `nav-primary` |
| **Dominio** | discovery-navegacion |
| **Origen** | VMC + SubasCars |
| **Decisión** | `referencia-subascars` |

**Descripción:** Navegación entre secciones principales. Indica página activa. Colapsa a hamburger en mobile.

**Anatomía:**
- links de navegación
- indicador activo
- responsive: hamburger

**Props conocidos:**
- Instancias en VMC DETALLE: 1
- Variantes SubasCars: Navigation
- Storybook ref: https://subascars-storybook-gcp.web.app/?path=/story/basic-control-icon-navigation--navigation

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: navigation (landmark)
- Teclado: Tab/flechas
- Notas: aria-current="page" en link activo

> 📌 **SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.**

---

### `footer-primary` — Footer

| Campo | Valor |
|---|---|
| **Nombre humano** | Footer |
| **Nombre AI** | `footer-primary` |
| **Dominio** | discovery-navegacion |
| **Origen** | VMC + SubasCars |
| **Decisión** | `referencia-subascars` |

**Descripción:** Cierre de página. Links legales, redes sociales, información de contacto. Persiste en todas las páginas.

**Anatomía:**
- columnas de links
- redes sociales
- legal/copyright

**Props conocidos:**
- Instancias en VMC DETALLE: 1
- Variantes SubasCars: Footer Desktop, Footer
- Storybook ref: https://subascars-storybook-gcp.web.app/?path=/story/main-single-general-footer--footer-desktop

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: contentinfo (landmark)
- Teclado: Tab
- Notas: links deben tener texto descriptivo

> 📌 **SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.**

---

### `sidebar` — Sidebar

| Campo | Valor |
|---|---|
| **Nombre humano** | Sidebar |
| **Nombre AI** | `sidebar` |
| **Dominio** | discovery-navegacion |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Panel lateral de filtros para exploración de ofertas. Contiene filtros de precio, tipo, año y marca.

**Anatomía:**
- filtros de búsqueda
- precio-range
- tipo-vehículo
- año
- marca

**Props conocidos:**
- Instancias en VMC DETALLE: 2

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: complementary (landmark)
- Teclado: Tab, flechas en sliders
- Notas: filtros deben anunciar cambios via aria-live

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

## 4 — Subasta en Tiempo Real

### `display-price` — PriceDisplay

| Campo | Valor |
|---|---|
| **Nombre humano** | PriceDisplay |
| **Nombre AI** | `display-price` |
| **Dominio** | subasta-tiempo-real |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Muestra el precio actual de la subasta. Central en la decisión del postor — debe ser legible, preciso y actualizable en tiempo real.

**Anatomía:**
- precio actual
- moneda (PEN/USD)
- precio base?
- variante: grande/compacto

**Props conocidos:**
- Instancias en VMC DETALLE: 1

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: text (implícito)
- Teclado: N/A
- Notas: contraste mínimo 4.5:1, no solo color para comunicar cambio

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

### `card-auction` — AuctionCard

| Campo | Valor |
|---|---|
| **Nombre humano** | AuctionCard |
| **Nombre AI** | `card-auction` |
| **Dominio** | subasta-tiempo-real |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Tarjeta de oferta individual. Contiene imagen, título del vehículo, precio actual, timer y CTA de puja.

**Anatomía:**
- imagen vehículo
- título
- precio
- timer-countdown
- cta-pujar
- badge-estado

**Props conocidos:**
- Instancias en VMC DETALLE: 1

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: article o listitem
- Teclado: Tab al CTA
- Notas: imagen con alt descriptivo del vehículo

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

### `display-metrics` — Metrics

| Campo | Valor |
|---|---|
| **Nombre humano** | Metrics |
| **Nombre AI** | `display-metrics` |
| **Dominio** | subasta-tiempo-real |
| **Origen** | VMC + SubasCars |
| **Decisión** | `referencia-subascars` |

**Descripción:** Muestra una métrica clave (views, pujas, participantes). Compacto, legible, puede actualizarse en tiempo real.

**Anatomía:**
- label
- valor numérico
- unidad
- icono?

**Props conocidos:**
- Instancias en VMC DETALLE: 2
- Variantes SubasCars: Metrics
- Storybook ref: https://subascars-storybook-gcp.web.app/?path=/story/basic-outputs-data-label-metrics--metrics

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: text (implícito)
- Teclado: N/A
- Notas: valores dinámicos via aria-live="polite"

> 📌 **SubasCars tiene este componente → usar como referencia anatómica en ib-componentes (NO portar). VMC manda en UX/comportamiento.**

---

## 5 — Transaccional & Cuenta

### `table-specs` — VehicleSpecs

| Campo | Valor |
|---|---|
| **Nombre humano** | VehicleSpecs |
| **Nombre AI** | `table-specs` |
| **Dominio** | transaccional-cuenta |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Tabla de especificaciones técnicas del vehículo. Agrupa datos por categoría (motor, carrocería, equipamiento). Crítico para la decisión de compra.

**Anatomía:**
- filas clave-valor
- grupos de specs (motor, carrocería, etc.)
- expand/collapse?

**Props conocidos:**
- Instancias en VMC DETALLE: 48

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: table/grid o dl/dt/dd
- Teclado: Tab si hay filas expandibles
- Notas: headers asociados a celdas, scope="row/col"

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

### `indicator-data-quality` — DataQualityIndicator

| Campo | Valor |
|---|---|
| **Nombre humano** | DataQualityIndicator |
| **Nombre AI** | `indicator-data-quality` |
| **Dominio** | transaccional-cuenta |
| **Origen** | VMC |
| **Decisión** | `solo-vmc` |

**Descripción:** Indica el nivel de completitud/calidad de los datos del vehículo. Ayuda al postor a evaluar confiabilidad de la información.

**Anatomía:**
- porcentaje o score
- label descriptivo
- color semántico por nivel

**Props conocidos:**
- Instancias en VMC DETALLE: 1

**Tokens:** Pendiente ib-fundamentos — se asignan tokens DTCG (OKLCH) cuando la capa de primitivos esté definida.

**Accesibilidad:**
- ARIA roles: meter o progressbar
- Teclado: N/A
- Notas: aria-valuenow/min/max, no transmitir solo por color

> 📌 **No existe en SubasCars → construir desde VMC audit. Referencia: solo DOM + screenshot.**

---

## Iteraciones pendientes (Ruta B)

| Iteración | Page type | Estado |
|---|---|---|
| 1 | DETALLE (`/oferta/:id`) | ✅ Completo |
| 2 | Homepage | ⏳ Pendiente |
| 3 | Listing de ofertas | ⏳ Pendiente |
| 4 | Panel de usuario (loggeado) | ⏳ Pendiente |
| 5 | Flujo de puja activa (postor) | ⏳ Pendiente |

---

*TAXONOMY.md es un documento vivo en Ruta B — crece con cada iteración de audit.*
*No está completo hasta que todas las page types estén auditadas.*