"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { DetallePageFrame } from "../components/DetallePageFrame";

// Screenshot canónico: auto en vivo · public/screenshots/canonical/detalle/vmc-live.png
const FALLBACK_SCREENSHOT: string | null = "/screenshots/canonical/detalle/vmc-live.png";
const VMC_BROWSE_URL = "https://www.vmcsubastas.com/oferta";

// Tipo de referencia que esta tab busca
const REF_TYPE_LABEL = "En Vivo";

// ─── Estado de la URL de referencia ──────────────────────────────────────────
type RefState =
  | { status: "loading" }
  | { status: "found"; url: string; ofertaId: number }
  | { status: "notfound" };

// ─── Barra superior del mini-browser simulado ─────────────────────────────────
function BrowserChrome({ url }: { url: string }): JSX.Element {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 border-b"
      style={{
        background: "var(--vmc-color-background-tertiary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <div className="flex gap-1.5">
        {(["#EF4444", "#FFA000", "#22C55E"] as const).map(function renderDot(c) {
          return (
            <div
              key={c}
              className="rounded-full"
              style={{ width: 10, height: 10, background: c, opacity: 0.6 }}
            />
          );
        })}
      </div>
      <span
        className="text-xs font-mono flex-1 truncate"
        style={{ color: "var(--vmc-color-text-tertiary)" }}
      >
        {url}
      </span>
    </div>
  );
}

// ─── Panel cuando se encontró URL activa ──────────────────────────────────────
function LiveIframePanel({ url, ofertaId }: { url: string; ofertaId: number }): JSX.Element {
  return (
    <div className="space-y-4">
      {/* Cabecera informativa */}
      <div
        className="rounded-lg border p-4 flex items-center justify-between gap-4"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "var(--vmc-color-live, #ED8936)", color: "#fff" }}
            >
              EN VIVO
            </span>
            <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
              VMC Subastas — Detalle oferta #{ofertaId}
            </p>
          </div>
          <code className="text-xs font-mono" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            {url}
          </code>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded"
          style={{ background: "var(--vmc-color-vault-900)", color: "#fff" }}
        >
          Abrir en VMC →
        </a>
      </div>

      {/* Mini-browser */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "var(--vmc-color-border-default)" }}
      >
        <BrowserChrome url={url} />
        <div style={{ overflowX: "auto" }}>
          <iframe
            src={url}
            title="Referencia VMC Detalle"
            style={{ width: 1024, height: 900, border: "none", display: "block" }}
            loading="lazy"
          />
        </div>
      </div>

      <p className="text-xs font-mono" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        ↔ scroll horizontal si el panel es más angosto que 1024px · URL actualizada automáticamente cada hora.
      </p>
    </div>
  );
}

// ─── Panel fallback con screenshot canónico ───────────────────────────────────
function ScreenshotFallbackPanel(): JSX.Element {
  return (
    <div className="space-y-4">
      {/* Aviso */}
      <div
        className="rounded-lg border p-4 flex items-start gap-3"
        style={{
          background: "var(--vmc-color-background-secondary)",
          borderColor: "var(--vmc-color-border-default)",
        }}
      >
        <span style={{ fontSize: 18 }}>📸</span>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
            Screenshot canónico — Detalle {REF_TYPE_LABEL}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--vmc-color-text-secondary)" }}>
            No se encontró subasta EN VIVO en este momento. Se muestra el screenshot de auditoría.
          </p>
        </div>
        <a
          href={VMC_BROWSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded"
          style={{ background: "var(--vmc-color-vault-900)", color: "#fff" }}
        >
          Ver ofertas →
        </a>
      </div>

      {/* Screenshot o placeholder */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "var(--vmc-color-border-default)" }}
      >
        <BrowserChrome url="vmcsubastas.com/oferta/[canónico]" />
        <div style={{ overflowX: "auto" }}>
          {FALLBACK_SCREENSHOT ? (
            <Image
              src={FALLBACK_SCREENSHOT}
              alt="Screenshot canónico de página de detalle VMC Subastas — En Vivo"
              width={1024}
              height={900}
              style={{ display: "block", width: 1024, height: "auto" }}
              priority={false}
            />
          ) : (
            <div
              style={{
                width: 1024,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--vmc-color-background-tertiary)",
                color: "var(--vmc-color-text-tertiary)",
                fontSize: 13,
                fontFamily: "monospace",
              }}
            >
              screenshot canónico pendiente · coloca la imagen en /screenshots/canonical/detalle/vmc-live.png
            </div>
          )}
        </div>
      </div>

      <p className="text-xs font-mono" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        Screenshot de auditoría 13-abr-2026 · La referencia en vivo se activa automáticamente cuando hay subastas activas.
      </p>
    </div>
  );
}

// ─── Panel de carga ───────────────────────────────────────────────────────────
function LoadingPanel(): JSX.Element {
  return (
    <div
      className="rounded-lg border p-8 text-center"
      style={{
        background: "var(--vmc-color-background-secondary)",
        borderColor: "var(--vmc-color-border-default)",
        color: "var(--vmc-color-text-tertiary)",
      }}
    >
      <p className="text-sm">Buscando subasta activa en VMC…</p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function FrameTabView(): JSX.Element {
  const [tab, setTab] = useState<"wireframe" | "referencia">("wireframe");
  const [ref, setRef] = useState<RefState>({ status: "loading" });

  useEffect(function fetchLiveUrl() {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/vmc-live-url");
        const data = (await res.json()) as { url: string | null; ofertaId: number | null };
        if (cancelled) return;
        if (data.url && data.ofertaId) {
          setRef({ status: "found", url: data.url, ofertaId: data.ofertaId });
        } else {
          setRef({ status: "notfound" });
        }
      } catch {
        if (!cancelled) setRef({ status: "notfound" });
      }
    }
    void load();
    return function cleanup() { cancelled = true; };
  }, []);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b mb-4" style={{ borderColor: "var(--vmc-color-border-default)" }}>
        {(["wireframe", "referencia"] as const).map(function renderTab(t) {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={function handleClick() { setTab(t); }}
              className="px-4 py-2 text-sm font-medium transition-colors relative"
              style={{
                color: active ? "var(--vmc-color-vault-900)" : "var(--vmc-color-text-secondary)",
                background: "transparent",
                borderBottom: active
                  ? "2px solid var(--vmc-color-vault-900)"
                  : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {t === "wireframe" ? "Wireframe" : `Ref: ${REF_TYPE_LABEL}`}
              {/* Indicador de estado de URL */}
              {t === "referencia" && ref.status === "found" && (
                <span
                  className="ml-1.5 inline-block rounded-full"
                  style={{ width: 6, height: 6, background: "#22C55E", verticalAlign: "middle" }}
                  title="Subasta activa encontrada"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel: Wireframe */}
      {tab === "wireframe" && <DetallePageFrame />}

      {/* Panel: Referencia VMC */}
      {tab === "referencia" && (
        <>
          {ref.status === "loading" && <LoadingPanel />}
          {ref.status === "found" && <LiveIframePanel url={ref.url} ofertaId={ref.ofertaId} />}
          {ref.status === "notfound" && <ScreenshotFallbackPanel />}
        </>
      )}
    </div>
  );
}
