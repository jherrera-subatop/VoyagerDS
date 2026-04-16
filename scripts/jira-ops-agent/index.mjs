#!/usr/bin/env node
/**
 * voyager-ops-agent — Agente autónomo de operaciones Voyager ↔ Jira
 *
 * Uso:
 *   node scripts/jira-ops-agent/index.mjs            # sync real
 *   node scripts/jira-ops-agent/index.mjs --dry-run  # solo muestra cambios, no aplica
 *   node scripts/jira-ops-agent/index.mjs --state    # solo muestra estado del repo
 *
 * Credenciales en .env.local:
 *   JIRA_EMAIL=tu@email.com
 *   JIRA_API_TOKEN=<token de https://id.atlassian.com/manage-profile/security/api-tokens>
 *
 * El agente:
 *   1. Lee taxonomy-components.ts, COMPONENTS_PRIORITY.md y memory/
 *   2. Compara contra el board Jira VD
 *   3. Crea tickets faltantes, actualiza estados y transiciona issues
 */

import { readProjectState } from "./read-state.mjs";
import { runSync } from "./sync.mjs";

const args = process.argv.slice(2);
const isDryRun   = args.includes("--dry-run");
const isStateOnly = args.includes("--state");

if (isStateOnly) {
  // Solo mostrar estado del repo sin tocar Jira
  const { components, phases } = readProjectState();
  console.log("\n📋  Estado actual del repo Voyager\n");
  console.log("── Fases IB ─────────────────────────────────────────────");
  for (const p of phases) {
    console.log(`  ${p.id.padEnd(20)} ${p.status}`);
  }
  console.log("\n── Componentes ──────────────────────────────────────────");
  for (const c of components) {
    const built = c.isBuilt ? "✅" : "⬜";
    const prio  = c.priority ? ` [${c.priority}]` : "     ";
    console.log(`  ${built} ${prio} ${c.id.padEnd(28)} ${c.jiraStatus.padEnd(14)} ${c.domain}`);
  }
  console.log(`\nTotal: ${components.length} componentes · ${phases.length} fases\n`);
  process.exit(0);
}

// Sync completo (o dry-run)
runSync({ dryRun: isDryRun }).catch((err) => {
  console.error("❌  Error en sync:", err.message);
  process.exit(1);
});
