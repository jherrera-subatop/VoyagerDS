import { readFile } from "fs/promises";
import path from "node:path";
import Link from "next/link";

export const metadata = {
  title: "DESIGN.md — Voyager DS",
  description: "Especificación VMC Subastas v1.1.0 (The Digital Curator)",
};

export default async function DesignSpecPage() {
  const fullPath = path.join(process.cwd(), "DESIGN.md");
  const body = await readFile(fullPath, "utf8");

  return (
    <article className="max-w-5xl mx-auto px-6 py-8 pb-24">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-sm font-medium"
          style={{ color: "var(--vmc-color-text-brand-hover)" }}
        >
          ← Índice DS
        </Link>
        <h1
          className="text-lg font-semibold mt-3"
          style={{
            color: "var(--vmc-color-text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          DESIGN.md (especificación completa)
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-tertiary)" }}>
          Fuente: Google Stitch · versión 1.1.0 · mismo contenido que la raíz del repo
        </p>
      </div>
      <pre
        className="text-xs font-mono leading-relaxed whitespace-pre-wrap"
        style={{ color: "var(--vmc-color-text-secondary)" }}
      >
        {body}
      </pre>
    </article>
  );
}
