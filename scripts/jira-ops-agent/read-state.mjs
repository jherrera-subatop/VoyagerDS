/**
 * read-state.mjs — Lee el estado real del repositorio Voyager
 * Sin compilar TypeScript: parsea los archivos como texto.
 * Devuelve un ProjectState normalizado que el sync engine consume.
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { ROOT, PRIORITY_LABEL } from "./config.mjs";

// ─── Leer taxonomy-components.ts como texto ────────────────────────────────────
function parseTaxonomyComponents() {
  const filePath = resolve(
    ROOT,
    "src/app/docs/taxonomia/_data/taxonomy-components.ts"
  );
  const src = readFileSync(filePath, "utf-8");

  const components = [];
  // Extraer cada bloque { id: "...", ... } del array TAXONOMY_COMPONENTS
  const blockRegex = /\{\s*id:\s*"([^"]+)"([\s\S]*?)(?=\n  \{|\n\];)/g;
  let match;
  while ((match = blockRegex.exec(src)) !== null) {
    const id = match[1];
    const block = match[0];

    const name     = (block.match(/name:\s*"([^"]+)"/))?.[1] ?? id;
    const domain   = (block.match(/domain:\s*"([^"]+)"/))?.[1] ?? "unknown";
    const decision = (block.match(/decision:\s*"([^"]+)"/))?.[1] ?? "pendiente-audit";
    const framesM  = block.match(/frames:\s*\[([^\]]+)\]/);
    const frames   = framesM
      ? framesM[1].match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) ?? []
      : [];
    const subascarsMatch = (block.match(/subascarsMatch:\s*"([^"]+)"/))?.[1];
    const storybookUrl   = (block.match(/storybookUrl:\s*"([^"]+)"/))?.[1];
    const description    = (block.match(/description:\s*"([^"]+)"/))?.[1];

    components.push({ id, name, domain, decision, frames, subascarsMatch, storybookUrl, description });
  }
  return components;
}

// ─── Leer COMPONENTS_PRIORITY.md ─────────────────────────────────────────────
function parsePriorities() {
  const filePath = resolve(ROOT, "COMPONENTS_PRIORITY.md");
  if (!existsSync(filePath)) return {};
  const src = readFileSync(filePath, "utf-8");

  const priorities = {};
  let currentPriority = null;
  for (const line of src.split("\n")) {
    const headerMatch = line.match(/^##\s+(P\d)/);
    if (headerMatch) {
      currentPriority = headerMatch[1];
      continue;
    }
    if (!currentPriority) continue;
    // Filas de tabla: | # | **ComponentName** (9.x) | ... |
    const rowMatch = line.match(/\|\s*\d+\s*\|\s*\*\*([^*]+)\*\*/);
    if (rowMatch) {
      const name = rowMatch[1].trim();
      priorities[name] = currentPriority;
    }
  }
  return priorities;
}

// ─── Detectar componentes construidos en src/features/ ────────────────────────
function detectBuiltComponents() {
  const featuresDir = resolve(ROOT, "src/features");
  if (!existsSync(featuresDir)) return new Set();
  const entries = readdirSync(featuresDir, { withFileTypes: true });
  return new Set(
    entries.filter((e) => e.isDirectory()).map((e) => e.name.toLowerCase())
  );
}

// ─── Leer fases IB desde memoria ─────────────────────────────────────────────
function readPendingPhases() {
  const filePath = resolve(
    ROOT,
    ".claude/projects/C--VoyagerDS/memory/project_pending_phases.md"
  );
  // Intentar ruta alternativa en memoria global
  const altPath = resolve(
    ROOT,
    "../.claude/projects/C--VoyagerDS/memory/project_pending_phases.md"
  );
  const path = existsSync(filePath) ? filePath : existsSync(altPath) ? altPath : null;

  const phases = [
    { id: "ib-taxonomia",   name: "IB Fase 1 — Taxonomía",       status: "in-progress" },
    { id: "ib-fundamentos", name: "IB Fase 2 — Fundamentos",      status: "done"        },
    { id: "ib-componentes", name: "IB Fase 3 — Componentes",      status: "in-progress" },
    { id: "ib-handoff",     name: "IB Fase 4 — Handoff a código", status: "in-progress" },
    { id: "ib-optimization",name: "IB Optimización Multi-Agente", status: "todo"        },
  ];

  if (path) {
    const src = readFileSync(path, "utf-8");
    // Marcar como pendiente si aparece en el archivo
    for (const phase of phases) {
      if (src.includes(phase.id)) {
        phase.status = "todo";
      }
    }
  }
  return phases;
}

// ─── Estado normalizado del proyecto ─────────────────────────────────────────
export function readProjectState() {
  const rawComponents = parseTaxonomyComponents();
  const priorities    = parsePriorities();
  const builtSet      = detectBuiltComponents();
  const phases        = readPendingPhases();

  const components = rawComponents.map((c) => {
    // Detectar si está construido por nombre de carpeta o ID
    const isBuilt =
      builtSet.has(c.id.toLowerCase()) ||
      builtSet.has(c.name.toLowerCase().replace(/\s+/g, "-")) ||
      builtSet.has(c.name.toLowerCase().replace(/\s+/g, ""));

    // Mapa directo ID → prioridad (fuente de verdad: COMPONENTS_PRIORITY.md)
    const PRIORITY_MAP = {
      // P0 — Fundacion
      "btn":                     "P0",
      "button":                  "P0",
      "display-price":           "P0",
      "price-display":           "P0",
      "input":                   "P0",
      "icon":                    "P0",
      // P1 — Shell
      "header-primary":          "P1",
      "header":                  "P1",
      "sidebar":                 "P1",
      "nav-primary":             "P1",
      "title-bar":               "P1",
      "bid-widget-header":       "P1",
      // P2 — Contenido principal
      "image-gallery":           "P2",
      "table-specs":             "P2",
      "vehicle-specs":           "P2",
      "indicator-data-quality":  "P2",
      "data-quality-indicator":  "P2",
      "conditions-accordion":    "P2",
      "description-block":       "P2",
      "document-downloads":      "P2",
      // P3 — Columna de accion
      "display-metrics":         "P3",
      "option-tags":             "P3",
      "promo-banner":            "P3",
      "help-center-banner":      "P3",
      // P4 — Transversales
      "card-auction":            "P4",
      "auction-card":            "P4",
      "subascoins-promo":        "P4",
      "subascoin-banner":        "P4",
    };
    const priority = PRIORITY_MAP[c.id] ?? priorities[c.name] ?? null;

    // Status derivado
    // Columnas disponibles en Jira: Backlog | En curso | Finalizada | Bloqueado | Agent Queue
    // "Tareas por hacer" NO existe como transicion — usar Backlog para no-iniciados, En curso para activos
    let jiraStatus = "Backlog";
    if (isBuilt) {
      jiraStatus = c.decision === "pendiente-audit" ? "En curso" : "Finalizada";
    } else if (c.decision === "pendiente-audit") {
      jiraStatus = "En curso";
    } else if (c.frames?.length > 0) {
      jiraStatus = "Backlog";
    }

    return { ...c, priority, isBuilt, jiraStatus };
  });

  return { components, phases };
}
