/**
 * jira.mjs — Cliente Jira REST API v3
 * Todas las operaciones que el agente necesita sobre el board VD.
 */

import { getCredentials, JIRA_PROJECT_KEY, AGENT_LABEL } from "./config.mjs";

// ─── Auth helper ──────────────────────────────────────────────────────────────
function authHeader() {
  const { email, token } = getCredentials();
  return "Basic " + Buffer.from(`${email}:${token}`).toString("base64");
}

function baseUrl() {
  return getCredentials().base + "/rest/api/3";
}

async function jiraFetch(path, options = {}) {
  const url = baseUrl() + path;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers ?? {}),
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Jira ${options.method ?? "GET"} ${path} → ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

// ─── Issues ───────────────────────────────────────────────────────────────────

/** Devuelve todos los issues del proyecto gestionados por el agente */
export async function listAgentIssues() {
  const jql = encodeURIComponent(
    `project = ${JIRA_PROJECT_KEY} AND labels = "${AGENT_LABEL}" ORDER BY created ASC`
  );
  const data = await jiraFetch(`/search/jql?jql=${jql}&maxResults=200&fields=summary,status,labels,description`);
  return data.issues ?? [];
}

/** Devuelve todos los issues del proyecto (para verificar cuáles ya existen) */
export async function listAllProjectIssues() {
  const jql = encodeURIComponent(
    `project = ${JIRA_PROJECT_KEY} ORDER BY created ASC`
  );
  const data = await jiraFetch(`/search/jql?jql=${jql}&maxResults=500&fields=summary,status,labels,description`);
  return data.issues ?? [];
}

/** Crea un issue nuevo */
export async function createIssue({ summary, description, labels = [], issueType = "Task" }) {
  const allLabels = [...new Set([AGENT_LABEL, ...labels])];
  const body = {
    fields: {
      project: { key: JIRA_PROJECT_KEY },
      summary,
      issuetype: { name: issueType },
      labels: allLabels,
      description: description
        ? (typeof description === "object" ? description : {
            version: 1,
            type: "doc",
            content: [{ type: "paragraph", content: [{ type: "text", text: description }] }],
          })
        : undefined,
    },
  };
  const created = await jiraFetch("/issue", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return created;
}

/** Actualiza summary y/o description de un issue existente */
export async function updateIssue(issueKey, { summary, description, labels }) {
  const fields = {};
  if (summary) fields.summary = summary;
  if (description) {
    fields.description = typeof description === "object"
      ? description
      : { version: 1, type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: description }] }] };
  }
  if (labels) fields.labels = [...new Set([AGENT_LABEL, ...labels])];
  await jiraFetch(`/issue/${issueKey}`, {
    method: "PUT",
    body: JSON.stringify({ fields }),
  });
}

/** Obtiene las transiciones disponibles de un issue */
export async function getTransitions(issueKey) {
  const data = await jiraFetch(`/issue/${issueKey}/transitions`);
  return data.transitions ?? [];
}

/** Mueve un issue al estado target (por nombre: "To Do", "In Progress", "Done") */
export async function transitionIssue(issueKey, targetStatusName) {
  const transitions = await getTransitions(issueKey);
  const match = transitions.find(
    (t) => t.to.name.toLowerCase() === targetStatusName.toLowerCase()
  );
  if (!match) {
    const available = transitions.map((t) => t.to.name).join(", ");
    console.warn(`  ⚠️  Transición "${targetStatusName}" no disponible en ${issueKey}. Disponibles: ${available}`);
    return;
  }
  await jiraFetch(`/issue/${issueKey}/transitions`, {
    method: "POST",
    body: JSON.stringify({ transition: { id: match.id } }),
  });
}

/** Añade un comentario a un issue */
export async function addComment(issueKey, text) {
  await jiraFetch(`/issue/${issueKey}/comment`, {
    method: "POST",
    body: JSON.stringify({
      body: {
        version: 1,
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text }] }],
      },
    }),
  });
}
