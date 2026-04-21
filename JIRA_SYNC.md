# JIRA_SYNC — Cola de acciones Voyager ↔ Jira
<!-- Este archivo es mantenido por Claude durante las sesiones de trabajo.
     El script voyager-jira-sync.py lo lee y ejecuta las acciones pendientes.
     NO editar manualmente las secciones "Completado" — son log del agente. -->

## Protocolo
- `[ ]` = acción pendiente para ejecutar
- `[x]` = ejecutada (el script la marca)
- `[!]` = error al ejecutar (revisar)
- Formato: `[ ] ACCION TICKET "descripcion" — razon`

## Acciones pendientes

<!-- El agente ejecuta estas en orden. Agregar nuevas al final. -->
- [x] MOVE VD-41 TO Finalizada — SidebarDone completado 18-abr-2026: Figma node 1:964, audit 9 fixes, logo VMC real, handoff panel, /api/source whitelist
- [x] COMMENT VD-41 "DONE 18-abr-2026: SidebarDone.tsx (Figma node 1:964, vault bg, logo VMC, 5 nav items, cyan active border, a11y). Audit 9 fixes: sin RGB hardcodeados, sin ternarios, role list correcto. HandoffPanel + /api/source/sidebar. Badge DONE en subnav. type-check limpio."
- [x] COMMENT VD-33 "Handoff Sidebar operativo 18-abr-2026. Sidebar DONE en /docs/componentes: panel Spec & Handoff con source via API, HTML tree, 10 tokens de color, 10 dimensiones, 9-item QA checklist. Patron replicable: todo componente DONE requiere HandoffPanel + entrada en /api/source/[component]/route.ts."
- [x] CREATE TASK "BUG Taxonomy: medidas en descripcion no coinciden con wireframe visual al cambiar estado normal-upgrade-done" EPIC VD-31
- [x] CREATE TASK "SISTEMA: Actualizar medidas de taxonomy-components.ts como paso obligatorio del workflow voyager-component-done" EPIC VD-30

- [x] MOVE VD-3 TO En curso — ib-componentes activo: Footer pilot DONE, sprint componentes Detalle iniciando
- [x] MOVE VD-40 TO En curso — Header desbloqueado: workflow voyager-component-done validado con Footer
- [x] MOVE VD-41 TO En curso — Sidebar desbloqueado: idem Header
- [x] MOVE VD-50 TO Finalizada — BUG resuelto: TaxonomyComponentCard + DetallePageFrame ahora muestran medidas correctas en upgrade/done
- [x] COMMENT VD-50 "Resuelto 17-abr-2026: (1) TaxonomyComponentCard.tsx: isUpgrade=mode==='upgrade' ampliado a isActiveMode=upgrade||done, badge muestra done/upgrade/normal segun modo real. (2) DetallePageFrame.tsx: funcion resolveZoneInfo() nueva, HoverZone ahora llama useWireMode() y resuelve upgradeMeasurements en modo upgrade/done. Fix es automatico para cualquier componente futuro con upgradeMeasurements en taxonomy-components.ts."
- [x] COMMENT VD-3 "SPRINT 1 PRIMERA MITAD DETALLE: 11 componentes. P0: btn, display-price, input. P1: header-primary, sidebar, title-bar. P2: image-gallery, table-specs, indicator-data-quality, conditions-accordion, description-block. Workflow: skill voyager-component-done para cada uno. Meta: 11 DONE antes de Sprint 2."
- [x] COMMENT VD-3 "SPRINT 2 SEGUNDA MITAD DETALLE: 10 componentes. Auction widget: bid-widget-header, option-tags, promo-banner. Secundarios: display-metrics, document-downloads, help-center-banner. Transversales: card-auction, subascoins-promo, nav-primary, icon. Sprint 2 arranca cuando Sprint 1 este completo."
- [x] COMMENT VD-30 "ROADMAP 17-abr-2026. HECHO: ib-fundamentos (tokens pipeline), ib-taxonomia detalle (22 componentes auditados), FooterDone (piloto workflow). EN CURSO: Sprint 1 (11 componentes Detalle). NEXT: Sprint 2 (10 componentes). LUEGO: ib-frames se activa automaticamente cuando todos los componentes de un frame tengan CHECK DONE en taxonomy. POST-FRAMES: ib-looping (optimizacion SEO/GEO continua v1/v2). PENDIENTE: ib-taxonomia listing+home, Playwright bot (VD-34), feedback-log (VD-35), observer agent (VD-37/38)."
- [x] COMMENT VD-33 "Estado handoff 17-abr-2026: FooterDone operativo en /docs/componentes. Panel incluye source via API route, viewport switcher 420/640/1024px, HTML tree, tokens CSS, QA checklist. Proximo: cuando Sprint 1 complete, habilitar handoff panels para los 11 componentes nuevos usando mismo patron. API route /api/source/[component] ya preparada para nuevas entradas."
- [x] COMMENT VD-40 "Desbloqueado 17-abr-2026. Workflow voyager-component-done validado con Footer. Siguiente accion: leer Figma MCP node header, crear HEADER_DONE_SPEC.md, implementar HeaderDone.tsx con container queries, HandoffPanel. Dependencias: btn (P0) y display-price (P0) deben estar DONE primero."
- [x] COMMENT VD-41 "Desbloqueado 17-abr-2026. Mismo workflow que Header. SidebarDone.tsx: 256px, fondo vault, nav items con icon+label, brand area 64px. Dependencia: header-primary DONE primero."
- [x] COMMENT VD-1 "ib-taxonomia progreso 17-abr-2026: frame Detalle completo (22 componentes, wireframes pixel-perfect, medidas auditadas). Bugs corregidos: medidas en tooltips y cards ahora reactivas a modo normal/upgrade/done. Pendiente para cerrar fase: frames listing y home. Listing = prioridad post-Sprint 1."
- [x] COMMENT VD-32 "Automatizaciones pendientes 17-abr-2026: (1) VD-34 Playwright bot capture canonical, ALTA prioridad. (2) VD-35 feedback-log schema para observer agent. (3) VD-42 scheduled tasks nocturnos cuando Sprint 1 este a mitad. (4) VD-5 ib-optimization no existe como fase, debe renombrarse ib-looping."

- [x] MOVE VD-30 TO En curso — Epic DS Pipeline activo: ib-componentes Sprint 1 en marcha
- [x] MOVE VD-31 TO En curso — Epic QA activo: FooterDone QA pendiente, mas componentes vienen
- [x] MOVE VD-32 TO En curso — Epic Automatizacion activo: Playwright bot y scheduled tasks pendientes
- [x] COMMENT VD-40 "PRIORIDAD MAXIMA en Sprint 1. Construir Header antes que Sidebar. Una vez Header DONE: desbloquea Sidebar y TitleBar. Skill: /voyager-component-done Header"
- [x] COMMENT VD-41 "PRIORIDAD MAXIMA en Sprint 1, despues de Header. SidebarDone.tsx depende de HeaderDone completado. Skill: /voyager-component-done Sidebar"

- [x] MOVE VD-43 TO Finalizada — wireframes atom actualizados con screenshots reales vmcsubastas.com
- [x] COMMENT VD-43 "Completado 15-abr-2026: AtomHeader_Content, AtomSidebar_Content, AtomFooter_Content actualizados pixel-perfect desde screenshot real VMC. Footer/constants.tsx corregida con contenido real. pnpm type-check sin errores."
- [x] MOVE VD-39 TO Finalizada — FooterDone pixel-perfect Figma MCP node 1:1017 completado 16-abr-2026
- [x] COMMENT VD-39 "FooterDone completado 16-abr-2026. Entregables: FooterDone.tsx (Server Component, container queries, WCAG 2.2), FOOTER_DONE_SPEC.md, Panel Spec & Handoff en /docs/componentes con viewport switcher 420/640/1024px, upload/descarga de assets con preview en tiempo real. VD-33 desbloqueado."
- [x] MOVE VD-33 TO En curso — handoff de FooterDone operativo en /docs/componentes
- [x] COMMENT VD-33 "Primer handoff completo: FooterDone. Panel interactivo en /docs/componentes incluye codigo listo para copiar, integracion en layout Next.js App Router, tokens CSS requeridos, upload de assets con preview y descarga con nombre canonico. Dev puede integrar sin preguntas adicionales."
- [x] CREATE TASK "Jira ecosistema vivo: Timeline + Calendar + Reports + weekly report script" EPIC VD-32
- [x] CREATE TASK "FooterDone QA visual en staging: 420px, 640px, 1024px" EPIC VD-31
- [x] CREATE TASK "Header: pipeline UX Writer + Stitch + Figma MCP + Frontend DONE" EPIC VD-30

## Completado
- [x] 2026-04-18 10:52 COMMENT VD-41 "DONE 18-abr-2026: SidebarDone.tsx (Figma node 1:964, vault bg, lo
- [x] 2026-04-18 10:52 COMMENT VD-33 "Handoff Sidebar operativo 18-abr-2026. Sidebar DONE en /docs/comp
- [!] 2026-04-18 10:52 COMMENT VD-41 "COMPLETADO 18-abr-2026. Entregables: (1) SidebarDone.tsx — 256px 
- [x] 2026-04-18 10:52 MOVE VD-41 TO Finalizada — SidebarDone completado 18-abr-2026: Figma node 1:964,
- [x] 2026-04-17 14:54 COMMENT VD-41 "PRIORIDAD MAXIMA en Sprint 1, despues de Header. SidebarDone.tsx 
- [x] 2026-04-17 14:54 COMMENT VD-40 "PRIORIDAD MAXIMA en Sprint 1. Construir Header antes que Sidebar.
- [x] 2026-04-17 14:54 MOVE VD-32 TO En curso — Epic Automatizacion activo: Playwright bot y scheduled 
- [x] 2026-04-17 14:54 MOVE VD-31 TO En curso — Epic QA activo: FooterDone QA pendiente, mas componente
- [x] 2026-04-17 14:54 MOVE VD-30 TO En curso — Epic DS Pipeline activo: ib-componentes Sprint 1 en mar
- [x] 2026-04-17 13:51 COMMENT VD-32 "Automatizaciones pendientes 17-abr-2026: (1) VD-34 Playwright bot
- [x] 2026-04-17 13:51 COMMENT VD-3 "SPRINT 2 SEGUNDA MITAD DETALLE: 10 componentes. Auction widget: bi
- [x] 2026-04-17 13:51 COMMENT VD-3 "SPRINT 1 PRIMERA MITAD DETALLE: 11 componentes. P0: btn, display-p
- [!] 2026-04-17 13:50 COMMENT VD-32 "Automatizaciones pendientes 17-abr-2026: (1) VD-34 Playwright bot
- [x] 2026-04-17 13:50 COMMENT VD-1 "ib-taxonomia progreso 17-abr-2026: frame Detalle completo (22 comp
- [x] 2026-04-17 13:50 COMMENT VD-41 "Desbloqueado 17-abr-2026. Mismo workflow que Header. SidebarDone.
- [x] 2026-04-17 13:50 COMMENT VD-40 "Desbloqueado 17-abr-2026. Workflow voyager-component-done validad
- [x] 2026-04-17 13:50 COMMENT VD-33 "Estado handoff 17-abr-2026: FooterDone operativo en /docs/compone
- [x] 2026-04-17 13:50 COMMENT VD-30 "ROADMAP 17-abr-2026. HECHO: ib-fundamentos (tokens pipeline), ib-
- [!] 2026-04-17 13:50 COMMENT VD-3 "SPRINT 2 SEGUNDA MITAD DETALLE — 10 componentes. Auction widget: b
- [!] 2026-04-17 13:50 COMMENT VD-3 "SPRINT 1 PRIMERA MITAD DETALLE — 11 componentes. P0 (fundacion): b
- [x] 2026-04-17 13:50 COMMENT VD-50 "Resuelto 17-abr-2026: (1) TaxonomyComponentCard.tsx: isUpgrade=mo
- [x] 2026-04-17 13:50 MOVE VD-50 TO Finalizada — BUG resuelto: TaxonomyComponentCard + DetallePageFram
- [x] 2026-04-17 13:50 MOVE VD-41 TO En curso — Sidebar desbloqueado: idem Header
- [x] 2026-04-17 13:50 MOVE VD-40 TO En curso — Header desbloqueado: workflow voyager-component-done va
- [x] 2026-04-17 13:50 MOVE VD-3 TO En curso — ib-componentes activo: Footer pilot DONE, sprint compone
- [x] 2026-04-17 12:54 CREATE TASK "BUG Taxonomy: medidas en descripcion no coinciden con wireframe vis
- [x] 2026-04-17 12:53 CREATE TASK "SISTEMA: Actualizar medidas de taxonomy-components.ts como paso obl
- [!] 2026-04-17 12:53 CREATE TASK "BUG: Taxonomy — medidas en descripción no coinciden con wireframe v
- [x] 2026-04-16 17:56 CREATE TASK "Header: pipeline UX Writer + Stitch + Figma MCP + Frontend DONE" EP
- [x] 2026-04-16 17:56 CREATE TASK "FooterDone QA visual en staging: 420px, 640px, 1024px" EPIC VD-31
- [x] 2026-04-16 17:56 CREATE TASK "Jira ecosistema vivo: Timeline + Calendar + Reports + weekly report
- [!] 2026-04-16 17:52 CREATE TASK "Header: pipeline UX Writer + Stitch + Figma MCP + Frontend DONE" EP
- [!] 2026-04-16 17:52 CREATE TASK "FooterDone QA visual en staging: 420px, 640px, 1024px" EPIC VD-31
- [!] 2026-04-16 17:52 CREATE TASK "Jira ecosistema vivo: Timeline + Calendar + Reports + weekly report
- [x] 2026-04-16 17:52 COMMENT VD-33 "Primer handoff completo: FooterDone. Panel interactivo en /docs/c
- [x] 2026-04-16 17:52 MOVE VD-33 TO En curso — handoff de FooterDone operativo en /docs/componentes
- [x] 2026-04-16 17:52 COMMENT VD-39 "FooterDone completado 16-abr-2026. Entregables: FooterDone.tsx (S
- [x] 2026-04-16 17:52 MOVE VD-39 TO Finalizada — FooterDone pixel-perfect Figma MCP node 1:1017 comple
- [x] 2026-04-16 17:52 COMMENT VD-43 "Completado 15-abr-2026: AtomHeader_Content, AtomSidebar_Content, 
- [x] 2026-04-16 17:52 MOVE VD-43 TO Finalizada — wireframes atom actualizados con screenshots reales v
- [x] 2026-04-16 17:51 COMMENT VD-33 "Primer handoff completo: FooterDone..."
- [x] 2026-04-15 18:05 COMMENT VD-39 "VD-43 desbloqueado. Wireframes listos. Footer pipeline puede proceder."
- [x] 2026-04-15 16:39 LINK VD-41 VD-43 Blocks
- [x] 2026-04-15 16:39 LINK VD-40 VD-43 Blocks
- [x] 2026-04-15 16:39 LINK VD-39 VD-43 Blocks
- [x] 2026-04-15 16:39 COMMENT VD-39 "Footer actual = primera version borrador."
- [x] 2026-04-15 16:39 COMMENT VD-32 "Jira board conectado via API."
- [x] 2026-04-15 16:39 COMMENT VD-31 "Arquitectura QA definida: Playwright + SQLite."
- [x] 2026-04-15 16:39 COMMENT VD-30 "Pipeline iniciado. Footer en progreso."
<!-- El script agrega entradas aqui con timestamp -->