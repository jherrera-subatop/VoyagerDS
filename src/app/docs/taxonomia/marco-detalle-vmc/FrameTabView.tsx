"use client";

import { useState } from "react";
import { DetallePageFrame } from "../components/DetallePageFrame";

const VMC_REFERENCE_URL = "https://www.vmcsubastas.com/oferta/61204";

export function FrameTabView() {
  const [tab, setTab] = useState<"wireframe" | "referencia">("wireframe");

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex border-b mb-4"
        style={{ borderColor: "var(--vmc-color-border-default)" }}
      >
        {(["wireframe", "referencia"] as const).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-medium transition-colors relative"
              style={{
                color: active
                  ? "var(--vmc-color-vault-900)"
                  : "var(--vmc-color-text-secondary)",
                background: "transparent",
                borderBottom: active
                  ? "2px solid var(--vmc-color-vault-900)"
                  : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {t === "wireframe" ? "Wireframe" : "Referencia VMC"}
            </button>
          );
        })}
      </div>

      {/* Panel: Wireframe */}
      {tab === "wireframe" && <DetallePageFrame />}

      {/* Panel: Referencia VMC */}
      {tab === "referencia" && (
        <div className="space-y-4">
          {/* Cabecera */}
          <div
            className="rounded-lg border p-4 flex items-center justify-between gap-4"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-default)",
            }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--vmc-color-text-primary)" }}
              >
                VMC Subastas — Detalle de oferta
              </p>
              <code
                className="text-xs font-mono"
                style={{ color: "var(--vmc-color-text-tertiary)" }}
              >
                {VMC_REFERENCE_URL}
              </code>
            </div>
            <a
              href={VMC_REFERENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-medium px-3 py-1.5 rounded"
              style={{
                background: "var(--vmc-color-vault-900)",
                color: "#fff",
              }}
            >
              Abrir en VMC →
            </a>
          </div>

          {/* iframe de referencia — 1024px max, igual que el wireframe */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: "var(--vmc-color-border-default)" }}
          >
            {/* barra de url */}
            <div
              className="flex items-center gap-2 px-3 py-2 border-b"
              style={{
                background: "var(--vmc-color-background-tertiary)",
                borderColor: "var(--vmc-color-border-subtle)",
              }}
            >
              <div className="flex gap-1.5">
                {["#EF4444", "#FFA000", "#22C55E"].map((c) => (
                  <div
                    key={c}
                    className="rounded-full"
                    style={{ width: 10, height: 10, background: c, opacity: 0.6 }}
                  />
                ))}
              </div>
              <span
                className="text-xs font-mono flex-1 truncate"
                style={{ color: "var(--vmc-color-text-tertiary)" }}
              >
                {VMC_REFERENCE_URL}
              </span>
            </div>

            {/* iframe */}
            <div style={{ overflowX: "auto" }}>
              <iframe
                src={VMC_REFERENCE_URL}
                title="Referencia VMC Detalle"
                style={{
                  width: 1024,
                  height: 900,
                  border: "none",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>

            {/* Fallback visible si iframe no carga */}
            <noscript>
              <div
                className="p-6 text-center text-sm"
                style={{ color: "var(--vmc-color-text-secondary)" }}
              >
                El iframe requiere JavaScript.{" "}
                <a
                  href={VMC_REFERENCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--vmc-color-text-brand)" }}
                >
                  Abrir directamente →
                </a>
              </div>
            </noscript>
          </div>

          {/* Nota de referencia */}
          <p
            className="text-xs font-mono"
            style={{ color: "var(--vmc-color-text-tertiary)" }}
          >
            ↔ scroll horizontal si el panel es más angosto que 1024px · Si el iframe muestra error
            de seguridad, usar el botón {`"Abrir en VMC"`} para ver la página real en otra pestaña.
          </p>
        </div>
      )}
    </div>
  );
}
