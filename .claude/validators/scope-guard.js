#!/usr/bin/env node
/**
 * PreToolUse scope guard — bloquea ediciones a archivos en lista deny.
 * Stdin: JSON con { tool_name, tool_input }
 * Exit 0 = permitir. Exit 2 = bloquear (cancela la herramienta).
 */

const fs = require('fs');
const path = require('path');

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let hookData = {};
  try { hookData = JSON.parse(raw); } catch {}

  const targetFile = (hookData.tool_input?.file_path || hookData.tool_input?.path || '')
    .replace(/\\/g, '/');

  if (!targetFile) process.exit(0);

  const denyList = [];

  // Cargar deny list desde contracts/active.json
  try {
    const contract = JSON.parse(
      fs.readFileSync(path.resolve('.claude/contracts/active.json'), 'utf8')
    );
    if (contract.active && Array.isArray(contract.deny_modifications)) {
      denyList.push(...contract.deny_modifications);
    }
  } catch {}

  // Cargar deny list desde task-state.yaml (parse simple)
  try {
    const yaml = fs.readFileSync(path.resolve('.claude/task-state.yaml'), 'utf8');
    const block = yaml.match(/deny_files:\s*\n((?:[ \t]+-[ \t]+.+\n?)*)/);
    if (block) {
      const items = [...block[1].matchAll(/[-]\s+(.+)/g)].map(m => m[1].trim());
      denyList.push(...items);
    }
  } catch {}

  if (denyList.length === 0) process.exit(0);

  const blocked = denyList.find(entry => {
    const normalized = entry.replace(/\*\*\//g, '').replace(/\\/g, '/');
    return targetFile.includes(normalized);
  });

  if (blocked) {
    console.error(
      `⛔ [SCOPE GUARD] BLOQUEADO: "${targetFile}"\n` +
      `   Motivo: coincide con entrada deny "${blocked}"\n` +
      `   Ver .claude/task-state.yaml o .claude/contracts/active.json`
    );
    process.exit(2);
  }

  process.exit(0);
});
