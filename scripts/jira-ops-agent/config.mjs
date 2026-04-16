/**
 * config.mjs — Voyager Jira Ops Agent
 * Centraliza constantes y lee credenciales desde .env.local
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "..", "..");

// ─── Cargar .env.local ────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ─── Validar credenciales ─────────────────────────────────────────────────────
export function getCredentials() {
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const base  = process.env.JIRA_BASE_URL ?? "https://subastop.atlassian.net";
  if (!email || !token) {
    console.error(
      "\n❌  Faltan credenciales Jira.\n" +
      "    Agregá en .env.local:\n" +
      "      JIRA_EMAIL=tu@email.com\n" +
      "      JIRA_API_TOKEN=tu_token_de_atlassian\n"
    );
    process.exit(1);
  }
  return { email, token, base };
}

// ─── Constantes del proyecto ──────────────────────────────────────────────────
export const JIRA_PROJECT_KEY = "VD";

/** Mapeo de prioridad Voyager → etiqueta Jira */
export const PRIORITY_LABEL = {
  P0: "voyager-p0-base",
  P1: "voyager-p1-shell",
  P2: "voyager-p2-content",
  P3: "voyager-p3-auction",
  P4: "voyager-p4-transversal",
};

/** Nombres de transición reales del board VD (español) */
export const STATUS_NAMES = {
  todo:        "Tareas por hacer",
  inprogress:  "En curso",
  done:        "Finalizada",
};

/** Etiqueta base para identificar tickets gestionados por el agente */
export const AGENT_LABEL = "voyager-ops-agent";

/** Mapeo de fases IB a labels */
export const IB_PHASE_LABELS = {
  "ib-taxonomia":   "voyager-fase-1",
  "ib-fundamentos": "voyager-fase-2",
  "ib-componentes": "voyager-fase-3",
  "ib-handoff":     "voyager-fase-4",
  "ib-optimization":"voyager-fase-opt",
};
