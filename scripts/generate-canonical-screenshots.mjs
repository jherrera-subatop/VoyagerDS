#!/usr/bin/env node
/**
 * generate-canonical-screenshots.mjs
 *
 * Genera screenshots canónicos anotados del wireframe de Voyager DS.
 *
 * Para cada frame registrado en FRAMES:
 *   1. Abre la página del frame en el dev server
 *   2. Captura screenshot raw (limpio, sin anotaciones)
 *   3. Inyecta overlay con bounding boxes coloreados por tipo de zona:
 *      - Rojo   → chrome (header / sidebar / footer)
 *      - Azul   → contenido (componentes del main area)
 *   4. Captura screenshot anotado
 *   5. Guarda manifest JSON con coordenadas de cada zona
 *
 * Output en: public/screenshots/canonical/{frame}/
 *   ├── raw.png
 *   ├── annotated.png
 *   └── manifest.json
 *
 * Uso:
 *   pnpm run screenshots:canonical
 *   pnpm run screenshots:canonical -- --frame detalle   (solo un frame)
 *
 * Requisitos:
 *   pnpm install (incluye @playwright/test)
 *   npx playwright install chromium --with-deps
 *   dev server corriendo en localhost:3420
 */

import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Frames registrados ────────────────────────────────────────────────────────
const FRAMES = [
  {
    id: "detalle",
    url: "http://localhost:3420/docs/taxonomia/frame-detalle-vmc",
    label: "Frame: Detalle VMC",
    viewport: { width: 1280, height: 900 },
  },
  // Agregar frames futuros aquí:
  // { id: "listing", url: "http://localhost:3420/docs/taxonomia/frame-listing-vmc", ... },
];

// ── Colores de anotación ──────────────────────────────────────────────────────
const COLORS = {
  chrome: { bg: "rgba(239,68,68,0.18)", border: "#ef4444", label: "#b91c1c" },
  content: { bg: "rgba(59,130,246,0.15)", border: "#3b82f6", label: "#1d4ed8" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function log(msg) {
  console.log(`  ${msg}`);
}

function err(msg) {
  console.error(`  [ERROR] ${msg}`);
}

// ── Captura de una zona individual ───────────────────────────────────────────
/**
 * Usa locator().screenshot() — hace scroll automático al elemento,
 * funciona tanto para zonas dentro como fuera del viewport inicial.
 * Guardado como: {outDir}/components/{componentId}.png
 */
async function captureComponentCrop(page, zone, outDir) {
  const componentDir = resolve(outDir, "components");
  ensureDir(componentDir);
  const outPath = resolve(componentDir, `${zone.componentId}.png`);

  const locator = page.locator(`[data-component-id="${zone.componentId}"]`).first();
  await locator.screenshot({ path: outPath });

  return outPath;
}

// ── Proceso de un frame ───────────────────────────────────────────────────────
async function processFrame(browser, frame) {
  const outDir = resolve(ROOT, "public", "screenshots", "canonical", frame.id);
  ensureDir(outDir);

  const page = await browser.newPage();
  await page.setViewportSize(frame.viewport);

  log(`Navigating to ${frame.url}`);
  await page.goto(frame.url, { waitUntil: "networkidle" });

  // Esperar que el wireframe renderice (ResizeObserver necesita un tick)
  await page.waitForTimeout(400);

  // ── 1. Recopilar bounding boxes ────────────────────────────────────────────
  const zones = await page.evaluate(function () {
    const elements = document.querySelectorAll("[data-component-id]");
    return Array.from(elements).map(function (el) {
      const rect = el.getBoundingClientRect();
      return {
        componentId: el.getAttribute("data-component-id") ?? "",
        isChrome: el.getAttribute("data-is-chrome") === "true",
        x: Math.round(rect.left),
        y: Math.round(rect.top + window.scrollY),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    });
  });

  log(`Found ${zones.length} component zones`);

  // ── 2. Screenshot raw ──────────────────────────────────────────────────────
  const rawPath = resolve(outDir, "raw.png");
  await page.screenshot({ path: rawPath, fullPage: true });
  log(`Raw screenshot → ${rawPath}`);

  // ── 3. Crops individuales por componente ───────────────────────────────────
  const cropPaths = {};
  for (const zone of zones) {
    if (zone.w > 4 && zone.h > 4) {
      const cropPath = await captureComponentCrop(page, zone, outDir);
      cropPaths[zone.componentId] = cropPath.replace(ROOT + "/", "");
    }
  }

  // ── 4. Inyectar overlay de anotación ──────────────────────────────────────
  await page.evaluate(function (zones) {
    const existing = document.getElementById("__wf-annotation-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "__wf-annotation-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;";

    zones.forEach(function (zone) {
      if (zone.w < 4 || zone.h < 4) return;
      const isChrome = zone.isChrome;
      const bg = isChrome ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.15)";
      const border = isChrome ? "#ef4444" : "#3b82f6";
      const labelColor = isChrome ? "#b91c1c" : "#1d4ed8";

      const box = document.createElement("div");
      box.style.cssText = [
        "position:absolute",
        "left:" + zone.x + "px",
        "top:" + zone.y + "px",
        "width:" + zone.w + "px",
        "height:" + zone.h + "px",
        "background:" + bg,
        "border:2px solid " + border,
        "box-sizing:border-box",
      ].join(";");

      const label = document.createElement("div");
      label.textContent = zone.componentId;
      label.style.cssText = [
        "position:absolute",
        "top:2px",
        "left:4px",
        "font-family:monospace",
        "font-size:10px",
        "font-weight:700",
        "color:" + labelColor,
        "background:rgba(255,255,255,0.88)",
        "padding:1px 5px",
        "border-radius:2px",
        "white-space:nowrap",
        "line-height:16px",
      ].join(";");

      box.appendChild(label);

      const badge = document.createElement("div");
      badge.textContent = isChrome ? "chrome" : "content";
      badge.style.cssText = [
        "position:absolute",
        "bottom:2px",
        "right:4px",
        "font-family:monospace",
        "font-size:9px",
        "font-weight:600",
        "color:" + labelColor,
        "background:rgba(255,255,255,0.75)",
        "padding:0 4px",
        "border-radius:2px",
        "white-space:nowrap",
      ].join(";");

      box.appendChild(badge);
      overlay.appendChild(box);
    });

    document.body.appendChild(overlay);
  }, zones);

  // ── 5. Screenshot anotado ──────────────────────────────────────────────────
  const annotatedPath = resolve(outDir, "annotated.png");
  await page.screenshot({ path: annotatedPath, fullPage: true });
  log(`Annotated screenshot → ${annotatedPath}`);

  // ── 6. Manifest JSON ───────────────────────────────────────────────────────
  const manifest = {
    frame: frame.id,
    label: frame.label,
    url: frame.url,
    generated_at: new Date().toISOString(),
    viewport: frame.viewport,
    chrome_zones: zones.filter(function (z) { return z.isChrome; }).map(function (z) { return z.componentId; }),
    content_zones: zones.filter(function (z) { return !z.isChrome; }).map(function (z) { return z.componentId; }),
    zones: zones.map(function (z) {
      return {
        component_id: z.componentId,
        is_chrome: z.isChrome,
        bounding_box: { x: z.x, y: z.y, w: z.w, h: z.h },
        crop: cropPaths[z.componentId] ?? null,
      };
    }),
  };

  const manifestPath = resolve(outDir, "manifest.json");
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log(`Manifest → ${manifestPath}`);

  await page.close();
  return { frame: frame.id, zones: zones.length, outDir };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const frameArg = args.indexOf("--frame");
  const targetFrame = frameArg !== -1 ? args[frameArg + 1] : null;

  const framesToRun = targetFrame
    ? FRAMES.filter(function (f) { return f.id === targetFrame; })
    : FRAMES;

  if (framesToRun.length === 0) {
    err(`Frame "${targetFrame}" no registrado en FRAMES.`);
    process.exit(1);
  }

  console.log("\nVoyager — Canonical Screenshots Generator");
  console.log("=".repeat(48));

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const frame of framesToRun) {
    console.log(`\n▶ ${frame.label}`);
    try {
      const result = await processFrame(browser, frame);
      results.push(result);
    } catch (e) {
      err(`Frame "${frame.id}" falló: ${e.message}`);
      err("¿Está corriendo el dev server en localhost:3420?");
    }
  }

  await browser.close();

  console.log("\n" + "=".repeat(48));
  results.forEach(function (r) {
    console.log(`  ✓ ${r.frame} — ${r.zones} zonas → public/screenshots/canonical/${r.frame}/`);
  });
  console.log("");
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
