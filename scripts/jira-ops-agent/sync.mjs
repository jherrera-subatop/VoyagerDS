/**
 * sync.mjs — Motor de sincronización Voyager ↔ Jira
 * Tickets legibles, descripciones accionables, etiquetas mínimas.
 */

import {
  listAgentIssues,
  createIssue,
  updateIssue,
  transitionIssue,
  addComment,
} from "./jira.mjs";
import { readProjectState } from "./read-state.mjs";
import { AGENT_LABEL } from "./config.mjs";

// ─── Helpers de identificación ────────────────────────────────────────────────

function extractVoyagerId(issue) {
  const labels = issue.fields?.labels ?? [];
  // Support both current "vid-{id}" and legacy "voyager-id-{id}" formats
  const match = labels.find((l) => l.startsWith("vid-") || l.startsWith("voyager-id-"));
  if (!match) return null;
  if (match.startsWith("vid-"))         return match.replace("vid-", "");
  if (match.startsWith("voyager-id-"))  return match.replace("voyager-id-", "");
  return null;
}

// ─── Títulos legibles ─────────────────────────────────────────────────────────

const DOMAIN_ES = {
  "primitivos-tokens": "Primitivos",
  "ui-core":           "UI Core",
  "layout":            "Layout",
  "auction-core":      "Subasta",
  "vehicle-data":      "Datos del vehículo",
  "media":             "Galería",
  "content":           "Contenido",
  "support":           "Soporte",
};

const PHASE_META = {
  "ib-taxonomia":    { title: "Fase 1 · Taxonomía",           emoji: "🗂️" },
  "ib-fundamentos":  { title: "Fase 2 · Tokens y pipeline",   emoji: "🎨" },
  "ib-componentes":  { title: "Fase 3 · Construcción",        emoji: "🔧" },
  "ib-handoff":      { title: "Fase 4 · Handoff a código",    emoji: "🚀" },
  "ib-optimization": { title: "Optimización multi-agente",    emoji: "⚡" },
};

function componentTitle(c) {
  const domain = DOMAIN_ES[c.domain] ?? c.domain;
  const prio   = c.priority && c.priority !== "P4" ? `[${c.priority}] ` : "";
  return `${prio}${c.name} · ${domain}`;
}

function phaseTitle(phase) {
  const meta = PHASE_META[phase.id];
  return meta ? `${meta.emoji} Voyager ${meta.title}` : `[IB] ${phase.name}`;
}

// ─── Etiquetas mínimas ────────────────────────────────────────────────────────
// Máx. 3 etiquetas por ticket: ownership + id + 1 contexto

function componentLabels(c) {
  const labels = [AGENT_LABEL, `vid-${c.id}`];
  if (c.priority === "P0" || c.priority === "P1") labels.push(c.priority.toLowerCase());
  else if (c.decision === "pendiente-audit") labels.push("pendiente-audit");
  return labels;
}

function phaseLabels(phase) {
  return [AGENT_LABEL, `vid-${phase.id}`, "ib-fase"];
}

// ─── Descripciones Atlassian Document Format (ADF) ───────────────────────────

/** Nodo ADF de texto plano */
function text(content, bold = false) {
  if (bold) return { type: "text", text: content, marks: [{ type: "strong" }] };
  return { type: "text", text: content };
}

/** Párrafo ADF */
function para(...nodes) {
  return { type: "paragraph", content: nodes.map((n) => (typeof n === "string" ? text(n) : n)) };
}

/** Heading ADF (nivel 3) */
function h3(content) {
  return { type: "heading", attrs: { level: 3 }, content: [text(content)] };
}

/** Lista de ítems ADF */
function bulletList(items) {
  return {
    type: "bulletList",
    content: items.map((item) => ({
      type: "listItem",
      content: [{ type: "paragraph", content: [text(item)] }],
    })),
  };
}

/** Doc ADF completo */
function adfDoc(...nodes) {
  return { version: 1, type: "doc", content: nodes };
}

// ─── Descripción de componente ────────────────────────────────────────────────

function componentDescription(c) {
  const hasSubascars =
    c.subascarsMatch && !c.subascarsMatch.startsWith("No se encontró");

  const nodes = [
    h3("¿Qué es este componente?"),
    para(c.description ?? `Componente ${c.name} del Design System Voyager para VMC Subastas.`),

    h3("¿Qué hay que construir?"),
    para(
      `Implementar `,
      text(c.name, true),
      ` en `,
      text(`src/features/${c.id}/`, true),
      ` siguiendo DESIGN.md y los estándares de código de Voyager.`
    ),
    bulletList([
      "Archivo principal: " + c.name + ".tsx con export default",
      "Tipado estricto: interface Props definida, sin any",
      "Colores: solo var(--token) — ningún HEX en el componente",
      "7 estados interactivos: Default · Hover · Focus · Active · Disabled · Loading · Error",
      "Validación: pnpm type-check + pnpm lint sin errores",
    ]),
  ];

  if (hasSubascars) {
    nodes.push(
      h3("Referencia en SubasCars"),
      para(
        `Componente equivalente: `,
        text(c.subascarsMatch, true),
        ". Usar como referencia anatómica (estructura y variantes), no copiar código."
      )
    );
    if (c.storybookUrl) {
      nodes.push(para(`Storybook: ${c.storybookUrl}`));
    }
  }

  if (c.frames?.length > 0) {
    nodes.push(
      h3("Frames donde aparece"),
      bulletList(c.frames.map((f) => `Marco: ${f}`))
    );
  }

  nodes.push(
    h3("Criterios de aceptación"),
    bulletList([
      "Componente existe y exporta por defecto",
      "Compila sin errores de TypeScript",
      "Visual alineado al wireframe del marco Detalle",
      "Sin HEX hardcodeados — todos los colores usan var(--vmc-*)",
    ]),
    para("—"),
    para(text("Gestionado automáticamente por voyager-ops-agent.", false))
  );

  return adfDoc(...nodes);
}

// ─── Descripción de fase IB ───────────────────────────────────────────────────

const PHASE_DESCRIPTIONS = {
  "ib-taxonomia": {
    what: "Auditar y documentar todos los componentes de VMC Subastas, marco por marco. Cada componente necesita: nombre canónico, dominio, decisión (referencia-subascars / solo-vmc), variantes y medidas.",
    next: "Completar los marcos: listing y home. El marco detalle ya está auditado.",
    done: "TAXONOMY.md completo para todos los marcos del alcance Voyager.",
  },
  "ib-fundamentos": {
    what: "Pipeline de tokens W3C DTCG → Terrazzo → CSS → Tailwind v4. Nomenclatura OKLCH, 3 capas (primitivos / semánticos / componente), gatekeeper de calidad.",
    next: "Fase completada. El pipeline está operativo y el gatekeeper corre en predev/prebuild.",
    done: "tokens.json validado, tokens.css generado, pnpm tokens:audit sin errores.",
  },
  "ib-componentes": {
    what: "Construir cada componente del inventario en src/features/ según el orden de prioridad P0→P4 definido en COMPONENTS_PRIORITY.md.",
    next: "Arrancar con P0: Button (ya existe), Badge, PriceDisplay, CountdownTimer.",
    done: "Todos los componentes del marco Detalle construidos, testeados y aprobados en PR.",
  },
  "ib-handoff": {
    what: "Documentar cada componente para que el equipo de desarrollo lo consuma sin fricción: props API, tokens usados, ejemplos de uso, restricciones.",
    next: "Bloqueado por ib-componentes. Arranca una vez que P0 y P1 estén completos.",
    done: "Storybook + README por componente, alineado al DESIGN.md.",
  },
  "ib-optimization": {
    what: "Optimizar el flujo de trabajo multi-agente (Claude Code → Cursor). Includes: context architecture, handoff scripts, .mdc rules y scheduled tasks.",
    next: "En progreso paralelo. Fases 1, 2, 6, 8 del plan Gemini pendientes.",
    done: "Sesiones de 2h+ sin pérdida de contexto. Handoff automático documentado.",
  },
};

function phaseDescription(phase) {
  const meta = PHASE_DESCRIPTIONS[phase.id] ?? {
    what: phase.name,
    next: "Revisar VOYAGER_CLAUDE_CODE.md para los criterios de cierre.",
    done: "Criterios definidos en el IB correspondiente.",
  };

  return adfDoc(
    h3("¿De qué trata esta fase?"),
    para(meta.what),
    h3("¿Qué sigue?"),
    para(meta.next),
    h3("¿Cuándo se considera terminada?"),
    para(meta.done),
    para("—"),
    para(text("Gestionado automáticamente por voyager-ops-agent.", false))
  );
}

// ─── Estado Jira de una fase ──────────────────────────────────────────────────

function phaseJiraStatus(phase) {
  if (phase.status === "done")        return "Finalizada";
  if (phase.status === "in-progress") return "En curso";
  return "Tareas por hacer";
}

// ─── Motor principal ──────────────────────────────────────────────────────────

export async function runSync({ dryRun = false } = {}) {
  console.log(`\n🔄  Voyager Ops Agent — sync ${dryRun ? "(DRY RUN)" : ""}`);
  console.log(`    ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}\n`);

  const { components, phases } = readProjectState();
  console.log(`📦  Estado del repo: ${components.length} componentes · ${phases.length} fases IB`);

  const existing = await listAgentIssues();
  const byId     = new Map();
  for (const issue of existing) {
    const vid = extractVoyagerId(issue);
    if (vid) byId.set(vid, issue);
  }
  console.log(`🎯  Issues en Jira (agente): ${existing.length}\n`);

  const log = { created: [], updated: [], transitioned: [], skipped: [] };

  // ─── Fases IB ───────────────────────────────────────────────────────────────
  console.log("── Fases IB ─────────────────────────────────────────────");
  for (const phase of phases) {
    const existingIssue = byId.get(phase.id);
    const summary       = phaseTitle(phase);
    const labels        = phaseLabels(phase);
    const targetStatus  = phaseJiraStatus(phase);

    if (!existingIssue) {
      console.log(`  ✚ Crear: "${summary}" → ${targetStatus}`);
      if (!dryRun) {
        const created = await createIssue({ summary, description: phaseDescription(phase), labels });
        await transitionIssue(created.key, targetStatus);
        log.created.push({ key: created.key, summary });
      }
    } else {
      const currentStatus = existingIssue.fields?.status?.name ?? "";
      const titleChanged  = existingIssue.fields?.summary !== summary;

      if (titleChanged) {
        console.log(`  ✏️  Actualizar ${existingIssue.key}: título y descripción`);
        if (!dryRun) {
          await updateIssue(existingIssue.key, {
            summary,
            description: phaseDescription(phase),
            labels,
          });
          log.updated.push({ key: existingIssue.key, summary });
        }
      }

      if (currentStatus !== targetStatus) {
        console.log(`  ↔ Transicionar ${existingIssue.key}: "${currentStatus}" → "${targetStatus}"`);
        if (!dryRun) {
          await transitionIssue(existingIssue.key, targetStatus);
          log.transitioned.push({ key: existingIssue.key, from: currentStatus, to: targetStatus });
        }
      } else if (!titleChanged) {
        console.log(`  ✓ ${existingIssue.key}: OK (${currentStatus})`);
        log.skipped.push(existingIssue.key);
      }
    }
  }

  // ─── Componentes ────────────────────────────────────────────────────────────
  console.log("\n── Componentes ──────────────────────────────────────────");
  for (const c of components) {
    const existingIssue = byId.get(c.id);
    const summary       = componentTitle(c);
    const labels        = componentLabels(c);
    const targetStatus  = c.jiraStatus;

    if (!existingIssue) {
      console.log(`  ✚ Crear: "${summary}" → ${targetStatus}`);
      if (!dryRun) {
        const created = await createIssue({ summary, description: componentDescription(c), labels });
        await transitionIssue(created.key, targetStatus);
        log.created.push({ key: created.key, summary });
      }
    } else {
      const currentStatus = existingIssue.fields?.status?.name ?? "";
      const titleChanged  = existingIssue.fields?.summary !== summary;

      if (titleChanged) {
        console.log(`  ✏️  Actualizar ${existingIssue.key}: "${summary}"`);
        if (!dryRun) {
          await updateIssue(existingIssue.key, {
            summary,
            description: componentDescription(c),
            labels,
          });
          log.updated.push({ key: existingIssue.key, summary });
        }
      }

      if (currentStatus !== targetStatus) {
        console.log(`  ↔ Transicionar ${existingIssue.key}: "${currentStatus}" → "${targetStatus}"`);
        if (!dryRun) {
          await transitionIssue(existingIssue.key, targetStatus);
          if (c.isBuilt) {
            await addComment(
              existingIssue.key,
              `✅ Componente detectado en src/features/. Estado actualizado automáticamente por voyager-ops-agent.`
            );
          }
          log.transitioned.push({ key: existingIssue.key, from: currentStatus, to: targetStatus });
        }
      } else if (!titleChanged) {
        log.skipped.push(existingIssue.key);
      }
    }
  }

  // ─── Resumen ─────────────────────────────────────────────────────────────────
  console.log("\n── Resumen ──────────────────────────────────────────────");
  console.log(`  ✚ Creados:        ${log.created.length}`);
  console.log(`  ✏️  Actualizados:   ${log.updated.length}`);
  console.log(`  ↔ Transicionados: ${log.transitioned.length}`);
  console.log(`  ↩ Sin cambios:    ${log.skipped.length}`);

  if (log.updated.length > 0) {
    console.log("\n  Actualizados:");
    for (const i of log.updated) console.log(`    ${i.key}  ${i.summary}`);
  }
  if (log.transitioned.length > 0) {
    console.log("\n  Transicionados:");
    for (const i of log.transitioned) console.log(`    ${i.key}  ${i.from} → ${i.to}`);
  }
  console.log("\n✅  Sync completo.\n");
  return log;
}
