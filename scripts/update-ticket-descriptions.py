#!/usr/bin/env python3
"""Update Jira ticket descriptions with rich context for Voyager DS project."""
import os, urllib.request, json, base64, time
from pathlib import Path

token = os.environ.get("JIRA_API_TOKEN", "")
email = os.environ.get("JIRA_EMAIL", "jherrera@subastop.com")
auth = base64.b64encode(f"{email}:{token}".encode()).decode()
headers = {"Authorization": f"Basic {auth}", "Accept": "application/json", "Content-Type": "application/json"}

def put(path, payload):
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"https://subastop.atlassian.net/rest/api/3{path}",
        data=data, headers=headers, method="PUT"
    )
    with urllib.request.urlopen(req) as r:
        content = r.read()
        return json.loads(content) if content else {}

def doc(*nodes): return {"type": "doc", "version": 1, "content": list(nodes)}
def h3(t): return {"type": "heading", "attrs": {"level": 3}, "content": [{"type": "text", "text": t}]}
def p(t): return {"type": "paragraph", "content": [{"type": "text", "text": t}]}
def pb(t): return {"type": "paragraph", "content": [{"type": "text", "text": t, "marks": [{"type": "strong"}]}]}
def bullets(items):
    return {"type": "bulletList", "content": [
        {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": i}]}]}
        for i in items
    ]}

descriptions = {

"VD-43": doc(
    h3("Por que existe este ticket"),
    p("Es el BLOCKER que congela VD-39, VD-40 y VD-41. Sin wireframes actualizados, los 3 componentes "
      "principales con diseno Figma aprobado (Footer, Header, Sidebar) no pueden entrar al pipeline."),
    h3("Estado actual"),
    bullets([
        "Ley de fidelidad pixel-perfect: el boceto en el acordeon DEBE ser extracto del {Frame}PageFrame.tsx",
        "Los wireframes actuales NO reflejan el diseno real de VMC — creados antes de los screenshots",
        "ComponentWireframe.tsx tiene bocetos que no coinciden con el frame real",
    ]),
    h3("Que hay que hacer"),
    bullets([
        "1. Tomar screenshot real de VMC Subastas (pagina de detalle de vehiculo)",
        "2. Actualizar DetallePageFrame.tsx basandose en ese screenshot — no en SubasCars",
        "3. Extraer cada zona visual como funcion WfXxx() dentro del frame",
        "4. Sincronizar ComponentWireframe.tsx con esas funciones",
        "5. Verificar: ningun acordeon muestra 'wireframe pendiente {id}'",
    ]),
    h3("Archivos a modificar"),
    bullets([
        "src/app/docs/taxonomia/components/DetallePageFrame.tsx",
        "src/app/docs/taxonomia/components/ComponentWireframe.tsx",
    ]),
    h3("Definicion de done"),
    p("Abrir acordeon de Footer, Header y Sidebar en /docs/taxonomia/marco-detalle-vmc. "
      "Los 3 muestran wireframe pixel-perfect extraido del frame. Ningun boceto es generico o inventado."),
),

"VD-39": doc(
    h3("Por que existe este ticket"),
    p("El Footer es el primer componente del DS. La version actual en src/features/Footer/ es un BORRADOR "
      "— fue construido sin pasar por los 4 agentes correctamente. Re-correrlo bien lo convierte en la "
      "plantilla que todos los demas componentes seguiran, y alimenta el feedback-log con las primeras reglas aprendidas."),
    h3("Estado actual del componente"),
    bullets([
        "EXISTE: Footer.tsx, constants.tsx, index.ts, types.ts en src/features/Footer/",
        "CUMPLE: gobernanza de codigo — var(--token), funciones nominadas, TypeScript estricto, zero HEX",
        "FALTA: haber pasado por el pipeline completo de 4 agentes",
        "FALTA: link a resultado de Stitch (UI upgrade proposal)",
        "FALTA: entrada en feedback-log.json con la correccion que se hizo",
        "BLOQUEADO POR: VD-43 — wireframes desactualizados",
    ]),
    h3("9 violaciones encontradas en el run anterior (Agente 3)"),
    bullets([
        "V-01: bg-[#22005C] en footer -> debe ser var(--color-vault)",
        "V-02/03: border-[#ED8936], hover:text-[#ED8936] -> var(--color-live)",
        "V-04: text-white/60,/80,/40 -> tokens de opacidad del DS",
        "V-06/07: text-slate-300, dark:bg-slate-950 -> Tailwind defaults no pertenecen al DS",
        "V-09: border-t-4 border-[#ED8936] eliminado por completo",
        "UX: Copyright 'El Curador Digital...' corregido a 'Todos los derechos reservados.'",
    ]),
    h3("Pipeline que debe correr (en orden)"),
    bullets([
        "Agente 1 — UX Writer Validator: valida copy, consistencia de tono VMC",
        "Agente 2 — UI Lead + Stitch: propuesta visual via Google Stitch MCP (proyecto 14182036405227000116)",
        "Agente 3 — Product Designer: audita output de Stitch contra DESIGN.md, detecta violaciones",
        "Agente 4 — Frontend: implementa en React con gobernanza completa",
    ]),
    h3("Definicion de done"),
    bullets([
        "4 agentes ejecutados en orden con outputs documentados",
        "Cero violaciones de gobernanza (zero HEX, var(--token) everywhere)",
        "Link a resultado de Stitch en descripcion del ticket",
        "feedback-log.json creado en src/features/Footer/ con las correcciones aplicadas",
        "pnpm type-check + pnpm lint sin errores",
    ]),
),

"VD-40": doc(
    h3("Por que existe este ticket"),
    p("Header tiene diseno Figma aprobado. Es el componente de mayor visibilidad — aparece en TODAS las paginas. "
      "Construirlo bien establece el patron de navegacion global del DS."),
    h3("Estado actual"),
    bullets([
        "NO EXISTE en src/features/ — sin implementacion",
        "Taxonomia COMPLETA en TAXONOMY.md: header-primary, dominio discovery-navegacion",
        "Diseno Figma: APROBADO",
        "SubasCars referencia anatomica: Group Checkout 2, Group Header 2, Group Console 2",
        "BLOQUEADO POR: VD-43 — wireframes desactualizados",
    ]),
    h3("Especificacion tecnica (DESIGN.md seccion 12.12)"),
    bullets([
        "Altura: 64px fija",
        "Background: var(--color-vault) — purpura profundo",
        "Contenido izquierda: breadcrumb o titulo de pagina",
        "Contenido derecha: icono busqueda + notificaciones + avatar 32px circular",
        "IMPORTANTE: el logo NO vive en Header — vive en brand area del Sidebar",
        "ARIA role: banner (landmark)",
    ]),
    h3("Definicion de done"),
    bullets([
        "src/features/Header/ con Header.tsx, constants.tsx, index.ts, types.ts",
        "Altura exacta 64px, background var(--color-vault)",
        "7 estados interactivos definidos para elementos interactivos",
        "Responsive: colapsa correctamente en mobile",
        "pnpm type-check + pnpm lint sin errores",
    ]),
),

"VD-41": doc(
    h3("Por que existe este ticket"),
    p("Sidebar tiene diseno Figma aprobado. Es el componente que define el layout de toda la aplicacion. "
      "256px fijos + bg var(--color-vault). Decision: solo-vmc — no hay referencia SubasCars valida."),
    h3("Estado actual"),
    bullets([
        "NO EXISTE en src/features/",
        "Taxonomia COMPLETA: sidebar, dominio discovery-navegacion, decision solo-vmc",
        "Diseno Figma: APROBADO",
        "BLOQUEADO POR: VD-43 — wireframes desactualizados",
    ]),
    h3("Especificacion tecnica (DESIGN.md seccion 12.13)"),
    bullets([
        "Ancho: 256px fijo, full height",
        "Background: var(--color-vault)",
        "Brand area: 64px — logo VMC centrado/izquierda en blanco",
        "Nav items: 44px altura — icon + label",
        "Estado default: white 60% opacidad",
        "Estado active: white bg 10% opacidad + white 100% texto",
        "Estado hover: white bg 5% opacidad",
        "ARIA role: complementary (landmark)",
    ]),
    h3("Definicion de done"),
    bullets([
        "src/features/Sidebar/ completo",
        "Layout correcto: 256px sidebar + content area = 1024px total",
        "Nav items con 3 estados visuales (default/active/hover)",
        "Logo VMC en brand area sin HEX en SVG",
        "pnpm type-check + pnpm lint sin errores",
    ]),
),

"VD-34": doc(
    h3("Por que existe este ticket (GAP-1)"),
    p("El Agente 3 (Product Designer) audita el output de Stitch comparando contra el diseno original de VMC, "
      "pero trabaja de memoria. Sin screenshots canonicos, puede aprobar propuestas que se alejaron visualmente "
      "del original. Este ticket implementa la captura y almacenamiento de referencia visual canonical."),
    h3("Arquitectura decidida"),
    bullets([
        "Playwright on-demand — NO siempre-encendido (las paginas tienen URLs variables)",
        "El usuario provee la URL cuando la pagina esta viva en ese momento",
        "2 screenshots por componente: full-page (contexto de layout) + component-isolated (anatomia)",
        "Almacenamiento: SQLite en scripts/qa/canonical.db",
        "Text snapshot: representacion texto del screenshot para CI gate sin OCR",
        "Una vez capturado, el canonical es permanente — no requiere que la pagina este viva de nuevo",
    ]),
    h3("Que hay que construir"),
    bullets([
        "scripts/qa/capture.py — Playwright que recibe --url y --component",
        "scripts/qa/canonical.db — SQLite: component_id, url, screenshot_full, screenshot_component, text_snapshot, captured_at",
        "scripts/qa/compare.py — compara screenshot nuevo contra canonical, reporta drift",
        "Integracion Agente 3: leer canonical antes de auditar Stitch output",
    ]),
    h3("Primer caso de uso"),
    p("Capturar footer-primary: abrir VMC Subastas, navegar a cualquier pagina con footer, "
      "ejecutar capture.py con la URL en ese momento."),
    h3("Definicion de done"),
    bullets([
        "capture.py funciona con --url y --component flags",
        "SQLite almacena screenshots y text_snapshot correctamente",
        "Primer canonical capturado: footer-primary con URL real de VMC",
        "compare.py detecta diferencias y reporta drift en porcentaje",
    ]),
),

"VD-35": doc(
    h3("Por que existe este ticket (GAP-2)"),
    p("El Agente 2 (UI Lead + Stitch) repite los mismos errores en cada componente nuevo: HEX hardcodeados, "
      "Tailwind defaults no pertenecientes al DS. No tiene memoria de correcciones anteriores. "
      "El feedback-log es la memoria del sistema — permite que el Agente mejore con cada iteracion."),
    h3("Schema decidido — AI-readable JSON"),
    p("Archivo: src/features/{ComponentName}/feedback-log.json — uno por componente"),
    bullets([
        "component_id: string — ID canonico (ej: footer-primary)",
        "pipeline_run: number — numero de iteracion",
        "stitch_output: string — descripcion del HTML/CSS generado por Stitch",
        "violations_found: array — violaciones detectadas por Agente 3",
        "human_correction: string — lo que el humano corrigio",
        "delta: string — diferencia entre stitch_output y version final",
        "rules_extracted: array — reglas generalizables para futuros componentes",
        "confidence: number 0-1.0 — certeza de la regla",
        "applied_to_next: boolean — si ya fue aplicada al proximo run",
    ]),
    h3("Primer entry conocido — Footer"),
    bullets([
        "violations_found: V-01 bg-[#22005C], V-02 border-[#ED8936], V-04 text-white/60, V-06 text-slate-300",
        "rules_extracted: 'Nunca usar HEX en className — siempre var(--token)'",
        "rules_extracted: 'text-white/N no existe en el DS — usar var(--color-text-on-dark-muted)'",
        "rules_extracted: 'Tailwind defaults slate-* no pertenecen al @theme de Voyager'",
        "confidence: 0.95",
    ]),
    h3("Definicion de done"),
    bullets([
        "Schema TypeScript en src/types/feedback-log.ts",
        "feedback-log.json creado para Footer con datos reales del run anterior",
        "El Agente 2 lee los feedback-logs existentes antes de generar — demostrable en proximo run",
    ]),
),

"VD-42": doc(
    h3("Por que existe este ticket"),
    p("El ecosistema Voyager debe operar autonomamente overnight. Los agentes deben procesar tickets "
      "del Agent Queue cuando los tokens de Claude se renuevan, sin intervencion del usuario."),
    h3("Estado actual de la infraestructura"),
    bullets([
        "HECHO: voyager-jira-sync scheduled task — cada hora L-V, ejecuta JIRA_SYNC.md",
        "HECHO: voyager-jira-nightly scheduled task — 1am L-V, sync completo + git analysis",
        "HECHO: voyager-jira-sync.py — script Python que ejecuta la cola de acciones de JIRA_SYNC.md",
        "PENDIENTE: Windows Task Scheduler para cuando Claude Code esta cerrado (ver VD-44)",
        "PENDIENTE: Orchestrator Master Agent — lee Jira + dispatcha sub-agentes autonomamente",
    ]),
    h3("Lo que falta"),
    bullets([
        "Orchestrator Master Agent: lee tickets en Agent Queue, determina cual ejecutar, corre el skill correcto",
        "Criterio de ejecucion: tokens renovados + tickets en Agent Queue = ejecutar pipeline",
        "Notificacion al usuario: summary overnight en DAILY_LOG.md o comment en Jira",
        "Manejo de errores: si falla, mover ticket a Bloqueado con razon del error",
    ]),
    h3("Definicion de done"),
    bullets([
        "Un ticket en Agent Queue se procesa automaticamente overnight sin intervencion humana",
        "Al dia siguiente: ticket movido, comentario con lo que se hizo, DAILY_LOG.md actualizado",
        "Si falla: ticket en Bloqueado con razon del error documentada",
    ]),
),

"VD-44": doc(
    h3("Por que existe este ticket"),
    p("Los scheduled tasks de Claude Code requieren que la app este ABIERTA. "
      "Si el usuario cierra Claude Code, el sync de JIRA_SYNC.md se detiene. "
      "Windows Task Scheduler permite que el Python script corra aunque Claude Code este cerrado."),
    h3("Impacto de no tenerlo"),
    bullets([
        "Cerrar Claude Code a las 6pm = ninguna accion Jira hasta el dia siguiente",
        "El hourly sync deja de correr",
        "Acciones acumuladas en JIRA_SYNC.md quedan pendientes",
    ]),
    h3("Ahorro de tokens"),
    bullets([
        "Hourly Claude task: ~1.200 tokens/run x 8h x 5 dias = ~48.000 tokens/semana",
        "Windows Task Scheduler corriendo Python directo = 0 tokens",
        "El nightly agent SI se queda como Claude task — necesita inteligencia para analizar git",
    ]),
    h3("Pasos de implementacion"),
    bullets([
        "1. Abrir Task Scheduler (Win+R -> taskschd.msc)",
        "2. Create Basic Task: 'Voyager Jira Sync'",
        "3. Trigger: Daily, repetir cada 1 hora durante 24 horas",
        "4. Action: program=python3, arguments=C:\\VoyagerDS\\VoyagerDS\\scripts\\voyager-jira-sync.py",
        "5. Start in: C:\\VoyagerDS\\VoyagerDS",
        "6. Desactivar voyager-jira-sync de Claude Code (reemplazado por este)",
    ]),
    h3("Definicion de done"),
    bullets([
        "Task ejecutando cada hora en Windows Task Scheduler",
        "Verificado que corre con Claude Code cerrado",
        "voyager-jira-sync de Claude Code desactivado",
    ]),
),

}

print("Actualizando descripciones...\n")
for key, desc in descriptions.items():
    try:
        put(f"/issue/{key}", {"fields": {"description": desc}})
        print(f"  [ok] {key}")
        time.sleep(0.3)
    except Exception as e:
        print(f"  [!!] {key}: {e}")

print("\nDone.")
