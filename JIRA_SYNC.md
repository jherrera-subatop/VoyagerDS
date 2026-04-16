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