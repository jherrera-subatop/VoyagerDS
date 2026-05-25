#!/usr/bin/env node
/**
 * PostToolUse validator — verifica contratos cuantitativos tras Edit/Write.
 * Stdin: JSON con { tool_name, tool_input, tool_response }
 * Exit 0 = pass. Exit 2 = violación (Claude re-intenta).
 */

const fs = require('fs');
const path = require('path');

const contractPath = path.resolve('.claude/contracts/active.json');

let contract;
try {
  contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
} catch {
  // No contract file — pass silently
  process.exit(0);
}

if (!contract.active || !contract.quantitative_assertions?.length) {
  process.exit(0);
}

let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let hookData = {};
  try { hookData = JSON.parse(raw); } catch {}

  const editedFile = hookData.tool_input?.file_path || hookData.tool_input?.path || '';
  const violations = [];

  for (const assertion of contract.quantitative_assertions) {
    // Skip if assertion targets a different file
    if (assertion.file && editedFile) {
      const assertFile = assertion.file.replace(/\*\*\//g, '').replace(/\\/g, '/');
      const edited = editedFile.replace(/\\/g, '/');
      if (!edited.includes(assertFile) && !assertFile.includes(path.basename(edited))) {
        continue;
      }
    }

    const targetPath = editedFile
      ? path.resolve(editedFile)
      : assertion.file
        ? path.resolve(assertion.file)
        : null;

    if (!targetPath || !fs.existsSync(targetPath)) continue;

    const content = fs.readFileSync(targetPath, 'utf8');

    if (assertion.names && Array.isArray(assertion.names)) {
      const missing = assertion.names.filter(name => !content.includes(name));
      if (missing.length > 0) {
        violations.push(
          `[CONTRACT] "${assertion.what}" — faltan: ${missing.join(', ')}`
        );
      }

      if (assertion.exact !== undefined) {
        const found = assertion.names.filter(name => content.includes(name)).length;
        if (found !== assertion.exact) {
          violations.push(
            `[CONTRACT] "${assertion.what}" — requiere exactamente ${assertion.exact}, encontrados ${found}`
          );
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error('⛔ VIOLACIÓN DE CONTRATO:\n' + violations.join('\n'));
    console.error('\nCorregir antes de continuar. Ver .claude/contracts/active.json');
    process.exit(2);
  }

  process.exit(0);
});
