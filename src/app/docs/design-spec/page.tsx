import { readFile } from "fs/promises";
import path from "node:path";
import Link from "next/link";
import CopyPromptButton from "./CopyPromptButton";
import DownloadButton from "./DownloadButton";
import PromptBuilder from "./PromptBuilder";

export const metadata = {
  title: "DESIGN.md — VOYAGER DS v2.1",
  description: "Especificación VOYAGER v2.1.0 — fuente de verdad para upgrades con Stitch",
};

export default async function DesignSpecPage() {
  const designPath = path.join(process.cwd(), "DESIGN.md");
  const framesPath = path.join(process.cwd(), "DESIGN-FRAMES.md");
  const body = await readFile(designPath, "utf8");
  const framesBody = await readFile(framesPath, "utf8");

  return (
    <article className="max-w-5xl mx-auto px-6 py-8 pb-24">

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-sm font-medium"
          style={{ color: "var(--vmc-color-text-brand-hover)" }}
        >
          ← Índice DS
        </Link>
        <div className="flex items-start justify-between mt-3 gap-4">
          <div>
            <h1
              className="text-lg font-semibold"
              style={{
                color: "var(--vmc-color-text-primary)",
                fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              DESIGN.md
            </h1>
            <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-tertiary)" }}>
              VOYAGER v2.1.0 · AI-Readable · Fuente de verdad para Stitch + UI Upgrade
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <DownloadButton content={body} filename="DESIGN.md" label="DESIGN.md" />
            <DownloadButton content={framesBody} filename="DESIGN-FRAMES.md" label="DESIGN-FRAMES.md" />
            <span
              className="text-xs font-semibold px-2 py-1 rounded"
              style={{
                background: "var(--vmc-color-vault, #22005C)",
                color: "#fff",
                fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              v2.1.0
            </span>
          </div>
        </div>
      </div>

      {/* Which file to use */}
      <div
        className="rounded p-4 mb-4 text-xs leading-relaxed"
        style={{
          background: "var(--vmc-color-surface-section, #F2F4F3)",
          borderLeft: "4px solid var(--vmc-color-vault, #22005C)",
          color: "var(--vmc-color-text-secondary, #494550)",
          fontFamily: "var(--font-body, 'Roboto', sans-serif)",
        }}
      >
        <p className="font-semibold mb-2" style={{ color: "var(--vmc-color-text-primary)" }}>
          ¿Qué archivo adjuntar?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
              DESIGN.md
            </p>
            <p>Vocabulario visual puro — tokens, tipografía, espaciado, sombras.</p>
            <p className="mt-1">Usar para: componente, card, sección, doc, email, cualquier elemento que no sea un frame web completo.</p>
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
              DESIGN.md + DESIGN-FRAMES.md
            </p>
            <p>Agrega dimensiones de layout de página (header, sidebar, footer).</p>
            <p className="mt-1">Usar para: frame web completo con navegación, área de contenido y footer.</p>
          </div>
        </div>
      </div>

      {/* Workflow instructions */}
      <div
        className="rounded p-4 mb-6 text-xs leading-relaxed"
        style={{
          background: "var(--vmc-color-surface-section, #F2F4F3)",
          borderLeft: "4px solid var(--vmc-color-negotiable, #00CACE)",
          color: "var(--vmc-color-text-secondary, #494550)",
          fontFamily: "var(--font-body, 'Roboto', sans-serif)",
        }}
      >
        <p className="font-semibold mb-1" style={{ color: "var(--vmc-color-text-primary)" }}>
          Flujo de UI Upgrade con Stitch
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Genera el prompt con el builder de abajo</li>
          <li>Adjunta <strong>DESIGN.md</strong> (+ DESIGN-FRAMES.md si es frame completo)</li>
          <li>Adjunta el <strong>screenshot</strong> del componente actual</li>
          <li>Incluye el <strong>outerHTML</strong> — ya está en el prompt generado</li>
        </ol>
      </div>

      {/* Prompt builder */}
      <PromptBuilder />

      {/* Divider */}
      <div
        className="my-10"
        style={{ borderTop: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
      />

      {/* Prompt estático (referencia) */}
      <CopyPromptButton className="mb-10" />

      {/* Divider */}
      <div
        className="mb-8 mt-2"
        style={{ borderTop: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
      />

      {/* DESIGN.md raw content */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--vmc-color-text-brand, #22005C)" }}
        >
          DESIGN.md — contenido completo
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            background: "var(--vmc-color-surface-section, #F2F4F3)",
            color: "var(--vmc-color-text-tertiary)",
          }}
        >
          {body.split("\n").length} líneas
        </span>
      </div>
      <pre
        className="text-xs font-mono leading-relaxed whitespace-pre-wrap mb-12"
        style={{ color: "var(--vmc-color-text-secondary)" }}
      >
        {body}
      </pre>

      {/* Divider */}
      <div
        className="mb-8"
        style={{ borderTop: "1px solid var(--vmc-color-border-ghost, rgba(34,0,92,0.10))" }}
      />

      {/* DESIGN-FRAMES.md raw content */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--vmc-color-text-brand, #22005C)" }}
        >
          DESIGN-FRAMES.md — contenido completo
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            background: "var(--vmc-color-surface-section, #F2F4F3)",
            color: "var(--vmc-color-text-tertiary)",
          }}
        >
          {framesBody.split("\n").length} líneas
        </span>
      </div>
      <pre
        className="text-xs font-mono leading-relaxed whitespace-pre-wrap"
        style={{ color: "var(--vmc-color-text-secondary)" }}
      >
        {framesBody}
      </pre>
    </article>
  );
}
