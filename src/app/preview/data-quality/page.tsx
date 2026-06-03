import type { JSX } from "react";

/* ── DataQualityBadge — standalone preview ─────────────────────
   Arc gauge · 3 niveles: baja / media / alta
   Tokens: vmc-color-status-success (green) · vault track
────────────────────────────────────────────────────────────────── */

const CSS = `
  @keyframes needle-rev {
    0%   { transform: rotate(-7deg); }
    35%  { transform: rotate(8deg);  }
    65%  { transform: rotate(-3deg); }
    100% { transform: rotate(-7deg); }
  }
  @keyframes needle-rev-alta {
    0%   { transform: rotate(0deg);   }
    30%  { transform: rotate(-12deg); }
    60%  { transform: rotate(-4deg);  }
    100% { transform: rotate(0deg);   }
  }
  @keyframes arc-glow {
    0%, 100% { filter: drop-shadow(0 0 2px oklch(70% 0.20 145 / 0.45)); }
    50%       { filter: drop-shadow(0 0 5px oklch(70% 0.20 145 / 0.85)); }
  }
  .dq-gauge-fill-green  { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); animation: arc-glow 2.0s ease-in-out infinite; }
  .dq-gauge-needle-green { stroke: var(--vmc-color-status-success, oklch(0.70 0.20 145)); }
  .dq-gauge-pivot-green  { fill:   var(--vmc-color-status-success, oklch(0.70 0.20 145)); }
  .dq-needle-group {
    transform-box: view-box; transform-origin: 15px 17px;
    animation: needle-rev 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .dq-needle-alta {
    transform-box: view-box; transform-origin: 15px 17px;
    animation: needle-rev-alta 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

type Level = "baja" | "media" | "alta";

const CFG: Record<Level, { arcD: string; tipX: number; tipY: number; alta: boolean; label: string; desc: string }> = {
  baja:  { arcD: "M 3 17 A 12 12 0 0 1 6.5 8.5", tipX: 7.2,  tipY: 9.4,  alta: false, label: "Baja",  desc: "Datos básicos del vehículo" },
  media: { arcD: "M 3 17 A 12 12 0 0 1 16.9 5.1", tipX: 16.7, tipY: 6.2,  alta: false, label: "Media", desc: "Datos parciales disponibles" },
  alta:  { arcD: "M 3 17 A 12 12 0 0 1 27 17",    tipX: 27.0, tipY: 17.0, alta: true,  label: "Alta",  desc: "Datos completos y detallados" },
};

function Gauge({ level, size = 48 }: { level: Level; size?: number }): JSX.Element {
  const cfg = CFG[level];
  const needleCls = cfg.alta ? "dq-needle-alta" : "dq-needle-group";
  return (
    <svg
      width={size} height={Math.round(size * 0.68)}
      viewBox="-4 -5 38 28" fill="none" overflow="visible"
      role="img" aria-label={`Calidad de información: ${cfg.label}`}
    >
      <path
        d="M 3 17 A 12 12 0 0 1 27 17"
        stroke="var(--vmc-color-vault, oklch(0.22 0.18 285))"
        strokeOpacity="0.14" strokeWidth="3" strokeLinecap="round"
      />
      <path className="dq-gauge-fill-green" d={cfg.arcD} strokeWidth="3" strokeLinecap="round" />
      <g className={needleCls}>
        <line className="dq-gauge-needle-green" x1="15" y1="17" x2={cfg.tipX} y2={cfg.tipY} strokeWidth="1.8" strokeLinecap="round" />
        <circle className="dq-gauge-pivot-green" cx={cfg.tipX} cy={cfg.tipY} r="2" />
      </g>
      <circle fill="var(--vmc-color-vault, oklch(0.22 0.18 285))" fillOpacity="0.35" cx="15" cy="17" r="2" />
    </svg>
  );
}

export default function DataQualityPage(): JSX.Element {
  const F = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";
  return (
    <main style={{ minHeight: "100vh", background: "oklch(0.96 0.004 160)", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "center" }}>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: "oklch(0.22 0.18 285)", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
            Calidad de Información
          </h1>
          <p style={{ fontFamily: F, fontSize: 12, color: "oklch(0.55 0.03 220)", margin: 0 }}>
            DataQualityBadge · Arc Gauge · 3 niveles
          </p>
        </div>

        {/* 3 states — large */}
        <div style={{ display: "flex", gap: 48, alignItems: "flex-end" }}>
          {(Object.keys(CFG) as Level[]).map(function renderLevel(lvl) {
            return (
              <div key={lvl} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{
                  background: "oklch(1 0 0)",
                  borderRadius: 12,
                  padding: "24px 28px",
                  boxShadow: "0 4px 16px oklch(0.22 0.18 285 / 0.08)",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                }}>
                  <Gauge level={lvl} size={80} />
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "oklch(0.22 0.18 285)", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {CFG[lvl].label}
                    </p>
                    <p style={{ fontFamily: F, fontSize: 11, color: "oklch(0.60 0.03 220)", margin: 0 }}>
                      {CFG[lvl].desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* In context — small (accordion use case) */}
        <div style={{ background: "oklch(1 0 0)", borderRadius: 8, border: "1px solid oklch(0.22 0.18 285 / 0.08)", padding: "0 0 0", width: 340, overflow: "hidden", boxShadow: "0 2px 8px oklch(0.22 0.18 285 / 0.06)" }}>
          <div style={{ background: "oklch(0.97 0.002 220)", padding: "10px 16px", borderBottom: "1px solid oklch(0.22 0.18 285 / 0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.10em", color: "oklch(0.50 0.03 220)" }}>Información General</span>
            <span style={{ fontFamily: F, fontSize: 12, color: "oklch(0.55 0.03 220)" }}>∧</span>
          </div>
          {(Object.keys(CFG) as Level[]).map(function renderCtx(lvl) {
            return (
              <div key={lvl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid oklch(0.22 0.18 285 / 0.05)" }}>
                <div>
                  <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "oklch(0.50 0.03 220)", margin: "0 0 2px" }}>Calidad de información</p>
                  <p style={{ fontFamily: F, fontSize: 11, color: "oklch(0.45 0.03 220)", margin: 0 }}>Código: 61483</p>
                </div>
                <Gauge level={lvl} size={32} />
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
