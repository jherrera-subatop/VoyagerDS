#!/usr/bin/env node
/**
 * Voyager — verificación de rutas HTTP (producción local).
 *
 * 1) `pnpm build` (incluye prebuild: gatekeeper + Terrazzo), salvo `--skip-build`
 * 2) `next start` en puerto VERIFY_PORT (default 3999)
 * 3) GET a rutas críticas; falla si 5xx o timeout
 * 4) Apaga el servidor
 *
 * Uso: pnpm verify:pages
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const PORT = process.env.VERIFY_PORT ?? "3999";
const BASE = `http://127.0.0.1:${PORT}`;

const ROUTES = [
  "/",
  "/docs",
  "/docs/taxonomia",
  "/docs/taxonomia/inventario",
  "/docs/taxonomia/marco-detalle-vmc",
  "/docs/fundamentos",
  "/docs/componentes",
  "/docs/design-spec",
  "/login",
];

const SKIP_BUILD = process.argv.includes("--skip-build");

/** Windows: spawn sin shell no resuelve `pnpm` en PATH (ENOENT). */
const SPAWN_SHELL = process.platform === "win32";

function runBuild() {
  return new Promise((resolve, reject) => {
    const p = spawn("pnpm", ["build"], {
      cwd: ROOT,
      stdio: "inherit",
      shell: SPAWN_SHELL,
    });
    p.on("error", reject);
    p.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`pnpm build exited with code ${String(code)}`));
    });
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["exec", "next", "start", "-p", PORT], {
      cwd: ROOT,
      stdio: "inherit",
      shell: SPAWN_SHELL,
      env: { ...process.env, PORT },
    });

    let finished = false;

    function fail(err) {
      if (finished) {
        return;
      }
      finished = true;
      try {
        child.kill("SIGTERM");
      } catch {
        /* ignore */
      }
      reject(err);
    }

    function ok() {
      if (finished) {
        return;
      }
      finished = true;
      resolve(child);
    }

    child.on("error", (err) => {
      fail(err);
    });

    child.on("exit", (code) => {
      if (!finished) {
        fail(new Error(`next start exited before ready (code ${String(code)})`));
      }
    });

    (async () => {
      for (let i = 0; i < 90; i += 1) {
        if (finished) {
          return;
        }
        try {
          const res = await fetch(BASE, {
            redirect: "manual",
            signal: AbortSignal.timeout(3000),
          });
          if (res.status > 0 && res.status < 500) {
            ok();
            return;
          }
        } catch {
          /* server not ready */
        }
        await delay(500);
      }
      fail(new Error("Timeout: servidor no respondió en ~45s"));
    })();
  });
}

function stopServer(child) {
  return new Promise((resolve) => {
    const t = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {
        /* ignore */
      }
      resolve();
    }, 4000);
    child.once("exit", () => {
      clearTimeout(t);
      resolve();
    });
    try {
      child.kill("SIGTERM");
    } catch {
      resolve();
    }
  });
}

async function checkRoute(pathname) {
  const url = `${BASE}${pathname}`;
  const res = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status >= 500) {
    throw new Error(`${pathname} → HTTP ${String(res.status)}`);
  }
  if (res.status === 0) {
    throw new Error(`${pathname} → sin respuesta`);
  }
}

async function main() {
  console.log("\n🔎 Voyager verify:pages — build + next start + HTTP checks\n");

  if (!SKIP_BUILD) {
    console.log("→ pnpm build …");
    await runBuild();
    console.log("✔ build OK\n");
  } else {
    console.log("→ --skip-build: usando .next existente\n");
  }

  console.log(`→ next start -p ${PORT} …`);
  const child = await startServer();
  console.log(`✔ servidor en ${BASE}\n`);

  try {
    for (const path of ROUTES) {
      process.stdout.write(`  GET ${path} … `);
      await checkRoute(path);
      console.log("OK");
    }
    process.stdout.write("  GET / (Cookie: vmc_session) … ");
    const withSession = await fetch(`${BASE}/`, {
      headers: { Cookie: "vmc_session=test" },
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
    });
    if (withSession.status >= 500) {
      throw new Error(`HTTP ${String(withSession.status)}`);
    }
    console.log(String(withSession.status));
  } finally {
    console.log("\n→ deteniendo servidor …");
    await stopServer(child);
    console.log("✔ hecho\n");
  }

  console.log("✅ verify:pages completado sin errores 5xx.\n");
}

main().catch((err) => {
  console.error("\n❌ verify:pages falló:", err instanceof Error ? err.message : err);
  process.exit(1);
});
