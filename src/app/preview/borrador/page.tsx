"use client";

import { useState } from "react";
import type { JSX } from "react";

/* ─── tokens ────────────────────────────────────────────────── */
const T = {
  vault:        "oklch(0.22 0.18 285)",
  vaultMid:     "oklch(0.30 0.20 285)",
  negotiable:   "#00CACE",
  live:         "#ED8936",
  white:        "#FFFFFF",
  textOnDark:   "#FFFFFF",
  gradientVault:"linear-gradient(135deg, oklch(0.22 0.18 285) 0%, oklch(0.30 0.20 285) 100%)",
  shadow:       "0 2px 8px rgba(0,0,0,0.08)",
  shadowFloat:  "0 8px 24px rgba(0,0,0,0.22)",
} as const;

const font = "'Plus Jakarta Sans', sans-serif";

/* ─── helpers ───────────────────────────────────────────────── */
function Label({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontFamily:    font,
      fontSize:      9,
      fontWeight:    700,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color:         T.white,
      opacity:       0.4,
      margin:        "0 0 12px",
    }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: string }): JSX.Element {
  return (
    <h2 style={{
      fontFamily:    font,
      fontSize:      11,
      fontWeight:    700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color:         T.white,
      opacity:       0.55,
      margin:        "0 0 32px",
      paddingBottom: 12,
      borderBottom:  "1px solid rgba(255,255,255,0.1)",
    }}>
      {children}
    </h2>
  );
}

/* ─── OfferCard variantes ────────────────────────────────────── */

/* A — Solid (referencia actual) */
function CardSolid({ color, label }: { color: string; label: string }): JSX.Element {
  return (
    <div style={{
      display:      "flex",
      flexDirection:"column",
      width:        110,
      borderRadius: 8,
      boxShadow:    T.shadow,
      overflow:     "hidden",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:53, background: color,
      }}>
        <span style={{ fontFamily:font, fontSize:13, fontWeight:700, color:T.textOnDark, textTransform:"uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:35, background:T.white,
      }}>
        <span style={{ fontFamily:font, fontSize:11, fontWeight:700, color, textTransform:"uppercase" }}>
          VER TODAS
        </span>
      </div>
    </div>
  );
}

/* B — Gradient tab (offer color → vault-mid) */
function CardGradientTab({ color, label }: { color: string; label: string }): JSX.Element {
  const tabGradient = `linear-gradient(135deg, ${color} 0%, oklch(0.30 0.20 285) 100%)`;
  return (
    <div style={{
      display:"flex", flexDirection:"column",
      width:110, borderRadius:8,
      boxShadow:"0 4px 16px rgba(0,0,0,0.18)",
      overflow:"hidden",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:53, background: tabGradient,
      }}>
        <span style={{ fontFamily:font, fontSize:13, fontWeight:700, color:T.textOnDark, textTransform:"uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:35, background:"rgba(255,255,255,0.06)",
        borderTop:"1px solid rgba(255,255,255,0.12)",
      }}>
        <span style={{ fontFamily:font, fontSize:11, fontWeight:700, color:T.white, textTransform:"uppercase", opacity:0.8 }}>
          VER TODAS
        </span>
      </div>
    </div>
  );
}

/* C — Full glass (sobre fondo oscuro) */
function CardGlass({ color, label }: { color: string; label: string }): JSX.Element {
  return (
    <div style={{
      display:"flex", flexDirection:"column",
      width:110, borderRadius:10,
      background:"rgba(255,255,255,0.10)",
      backdropFilter:"blur(12px)",
      WebkitBackdropFilter:"blur(12px)",
      border:"1px solid rgba(255,255,255,0.18)",
      boxShadow:"0 8px 24px rgba(0,0,0,0.25)",
      overflow:"hidden",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:53,
        background:`color-mix(in oklch, ${color} 35%, transparent)`,
        borderBottom:"1px solid rgba(255,255,255,0.12)",
      }}>
        <span style={{ fontFamily:font, fontSize:13, fontWeight:700, color:T.textOnDark, textTransform:"uppercase", textShadow:"0 1px 4px rgba(0,0,0,0.3)" }}>
          {label}
        </span>
      </div>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:35,
      }}>
        <span style={{ fontFamily:font, fontSize:11, fontWeight:700, color, textTransform:"uppercase", opacity:0.9 }}>
          VER TODAS
        </span>
      </div>
    </div>
  );
}

/* D — Vault gradient card (modo "featured") */
function CardVaultFull({ color, label }: { color: string; label: string }): JSX.Element {
  return (
    <div style={{
      display:"flex", flexDirection:"column",
      width:110, borderRadius:10,
      background: T.gradientVault,
      boxShadow:"0 8px 24px rgba(34,0,92,0.45)",
      overflow:"hidden",
      border:"1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:53,
        borderBottom:`2px solid ${color}`,
      }}>
        <span style={{ fontFamily:font, fontSize:13, fontWeight:700, color:T.textOnDark, textTransform:"uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:35,
      }}>
        <span style={{ fontFamily:font, fontSize:11, fontWeight:700, color, textTransform:"uppercase" }}>
          VER TODAS
        </span>
      </div>
    </div>
  );
}

/* ─── Sidebar variantes ──────────────────────────────────────── */

function SidebarSolid(): JSX.Element {
  const navItems = ["Inicio", "Subastas", "Historial", "Perfil", "Ajustes"];
  return (
    <div style={{
      width:200, borderRadius:12,
      background: T.gradientVault,
      boxShadow: T.shadowFloat,
      overflow:"hidden",
      padding:"20px 0",
    }}>
      {/* Brand */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:48, marginBottom:16,
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        paddingBottom:16,
      }}>
        <span style={{ fontFamily:font, fontSize:14, fontWeight:800, color:T.white, letterSpacing:"-0.02em" }}>
          VMC Subastas
        </span>
      </div>
      {/* Nav */}
      {navItems.map(function renderItem(item) {
        const isActive = item === "Subastas";
        return (
          <div key={item} style={{
            display:"flex", alignItems:"center",
            height:40, paddingLeft:20, paddingRight:20,
            background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            borderLeft: isActive ? `3px solid ${T.negotiable}` : "3px solid transparent",
            cursor:"pointer",
          }}>
            <span style={{
              fontFamily:font, fontSize:12, fontWeight: isActive ? 700 : 500,
              color:T.white, opacity: isActive ? 1 : 0.55,
              textTransform:"uppercase", letterSpacing:"0.06em",
            }}>
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SidebarGlass(): JSX.Element {
  const navItems = ["Inicio", "Subastas", "Historial", "Perfil", "Ajustes"];
  return (
    <div style={{
      width:200, borderRadius:12,
      background:"rgba(34,0,92,0.55)",
      backdropFilter:"blur(20px)",
      WebkitBackdropFilter:"blur(20px)",
      border:"1px solid rgba(255,255,255,0.12)",
      boxShadow:"0 8px 32px rgba(0,0,0,0.35)",
      overflow:"hidden",
      padding:"20px 0",
    }}>
      {/* Brand */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        height:48, marginBottom:16,
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        paddingBottom:16,
      }}>
        <span style={{ fontFamily:font, fontSize:14, fontWeight:800, color:T.white, letterSpacing:"-0.02em" }}>
          VMC Subastas
        </span>
      </div>
      {/* Nav */}
      {navItems.map(function renderItem(item) {
        const isActive = item === "Subastas";
        return (
          <div key={item} style={{
            display:"flex", alignItems:"center",
            height:40, paddingLeft:20, paddingRight:20,
            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
            borderLeft: isActive ? `3px solid ${T.negotiable}` : "3px solid transparent",
            cursor:"pointer",
          }}>
            <span style={{
              fontFamily:font, fontSize:12, fontWeight: isActive ? 700 : 500,
              color:T.white, opacity: isActive ? 1 : 0.55,
              textTransform:"uppercase", letterSpacing:"0.06em",
            }}>
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function BorradorPage(): JSX.Element {
  return (
    <div style={{
      minHeight:      "100vh",
      background:     `radial-gradient(ellipse at 20% 30%, oklch(0.30 0.20 285) 0%, oklch(0.15 0.14 285) 60%, oklch(0.10 0.08 285) 100%)`,
      padding:        "64px 48px",
      fontFamily:     font,
    }}>

      {/* OfferCard */}
      <section style={{ marginBottom: 80 }}>
        <SectionTitle>OfferCard — experimentos</SectionTitle>

        <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>

          <div>
            <Label>A — Solid (actual)</Label>
            <div style={{ display:"flex", gap:16 }}>
              <CardSolid color={T.negotiable} label="Negociable" />
              <CardSolid color={T.live}       label="En Vivo"    />
            </div>
          </div>

          <div>
            <Label>B — Gradient tab (offer → vault)</Label>
            <div style={{ display:"flex", gap:16 }}>
              <CardGradientTab color={T.negotiable} label="Negociable" />
              <CardGradientTab color={T.live}       label="En Vivo"    />
            </div>
          </div>

          <div>
            <Label>C — Glass</Label>
            <div style={{ display:"flex", gap:16 }}>
              <CardGlass color={T.negotiable} label="Negociable" />
              <CardGlass color={T.live}       label="En Vivo"    />
            </div>
          </div>

          <div>
            <Label>D — Vault full + accent border</Label>
            <div style={{ display:"flex", gap:16 }}>
              <CardVaultFull color={T.negotiable} label="Negociable" />
              <CardVaultFull color={T.live}       label="En Vivo"    />
            </div>
          </div>

        </div>
      </section>

      {/* Sidebar */}
      <section>
        <SectionTitle>Sidebar — experimentos</SectionTitle>

        <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
          <div>
            <Label>A — Solid vault (actual)</Label>
            <SidebarSolid />
          </div>
          <div>
            <Label>B — Glass vault</Label>
            <SidebarGlass />
          </div>
        </div>
      </section>

      {/* ── AuctionConditions ── */}
      <section>
        <SectionTitle>AuctionConditions · Pill</SectionTitle>
        <style>{`
          .pcond {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 8px;
            min-height: 46px;
            border-radius: 4px;
            border: 2px solid transparent;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.35;
            user-select: none;
            overflow: hidden;
            transition: box-shadow 0.25s ease, transform 0.2s ease, opacity 0.2s ease;
          }
          .pcond--active {
            background-image:
              linear-gradient(135deg,
                var(--vmc-color-vault-500, oklch(0.45 0.20 285)) 0%,
                var(--vmc-color-vault-700, oklch(0.30 0.20 285)) 100%
              ),
              linear-gradient(135deg,
                var(--vmc-color-orange-400, oklch(0.78 0.16 55)) 0%,
                rgb(100% 100% 100%)                              40%,
                var(--vmc-color-vault-400, oklch(0.55 0.20 285)) 75%,
                var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 100%
              );
            background-origin: padding-box, border-box;
            background-clip:   padding-box, border-box;
            box-shadow:
              0 3px 14px rgb(51.76% 37.65% 89.8% / 0.35),
              inset 0 1px 0 rgb(100% 100% 100% / 0.22);
            color: oklch(1 0 0);
            text-shadow: 0 1px 2px oklch(0 0 0 / 0.25);
          }
          .pcond--active::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgb(100% 100% 100% / 0.14) 0%, transparent 55%);
            pointer-events: none;
          }
          .pcond--inactive {
            background: oklch(0.88 0.004 220);
            color: oklch(0.50 0.02 220);
            opacity: 0.65;
            cursor: default;
          }
          .pcond--clickable { cursor: pointer; }
          .pcond--clickable.pcond--active:hover {
            box-shadow:
              0 5px 18px rgb(51.76% 37.65% 89.8% / 0.50),
              inset 0 1px 0 rgb(100% 100% 100% / 0.28);
            transform: translateY(-1px);
          }
          .pcond--clickable.pcond--active:active {
            transform: scale(0.97) translateY(0);
            box-shadow:
              0 2px 8px rgb(51.76% 37.65% 89.8% / 0.30),
              inset 0 1px 0 rgb(100% 100% 100% / 0.18);
          }
          .pcond--clickable.pcond--inactive:hover { opacity: 0.85; }
        `}</style>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <Label>Static — 4 active · 1 inactive</Label>
            <ConditionsCard interactive={false} />
          </div>
          <div>
            <Label>Demo interactivo — click para toggle</Label>
            <ConditionsCard interactive={true} />
          </div>
        </div>
      </section>

      {/* ── Download Button ── */}
      <section>
        <SectionTitle>Download Button</SectionTitle>
        <style>{DOWNLOAD_BTN_CSS}</style>

        {/* Iconos en 3 estados */}
        <div style={{ marginBottom: 32 }}>
          <Label>Iconos — Default · Hover · Focus</Label>
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <Label>DownloadIcon</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ color: "oklch(0.22 0.18 285)" }}><DownloadArrowIcon size={20} /></span>
                <span style={{ color: "oklch(0.55 0.20 285)" }}><DownloadArrowIcon size={20} /></span>
                <span style={{ color: "oklch(0.72 0.02 220)" }}><DownloadArrowIcon size={20} /></span>
              </div>
            </div>
            <div>
              <Label>FilesIcon</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ color: "oklch(0.22 0.18 285)" }}><FilesIcon size={20} /></span>
                <span style={{ color: "oklch(0.55 0.20 285)" }}><FilesIcon size={20} /></span>
                <span style={{ color: "oklch(0.72 0.02 220)" }}><FilesIcon size={20} /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Button — 3 estados estáticos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          <div><Label>Default</Label><DownloadBtn state="default" /></div>
          <div><Label>Hover</Label><DownloadBtn state="hover" /></div>
          <div><Label>Focus</Label><DownloadBtn state="focus" /></div>
        </div>

        {/* Interactive */}
        <div>
          <Label>Interactive — hover + mousedown</Label>
          <DownloadBtnInteractive />
        </div>
      </section>

    </div>
  );
}

/* ─── AuctionConditions components ─── */
interface ConditionItem { label: string; initialActive: boolean; }

const CONDITION_ITEMS: ConditionItem[] = [
  { label: "Con Precio Reserva",               initialActive: true  },
  { label: "Con Opción a Visitas",             initialActive: true  },
  { label: "Con Comisión",                     initialActive: true  },
  { label: "Cuota mínima de participantes: 2", initialActive: true  },
  { label: "Sin Opción a Financiamiento",      initialActive: false },
];

interface ConditionPillProps {
  label: string;
  isActive: boolean;
  onToggle?: () => void;
  spanFull?: boolean;
  interactive: boolean;
}

function ConditionPill({ label, isActive, onToggle, spanFull, interactive }: ConditionPillProps): JSX.Element {
  const activeCls  = interactive ? "pcond pcond--active pcond--clickable"   : "pcond pcond--active";
  const inactiveCls = interactive ? "pcond pcond--inactive pcond--clickable" : "pcond pcond--inactive";
  const baseCls = isActive ? activeCls : inactiveCls;
  return (
    <button
      className={baseCls}
      type="button"
      style={spanFull ? { gridColumn: "1 / -1" } : undefined}
      onClick={onToggle}
      aria-pressed={isActive}
      disabled={!interactive}
    >
      {label}
    </button>
  );
}

/* ─── Download Button CSS ─── */
const DOWNLOAD_BTN_CSS = `
  .pdlbtn {
    display: inline-flex;
    align-items: stretch;
    border-radius: 8px;
    border: 1.5px solid transparent;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.01em;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    padding: 0;
  }
  .pdlbtn-left {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
  }
  .pdlbtn-divider {
    width: 1px;
    align-self: stretch;
    flex-shrink: 0;
  }
  .pdlbtn-right {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
  }
  /* ── Default ── */
  .pdlbtn--default {
    background: oklch(1 0 0);
    border-color: oklch(0.22 0.18 285);
    color: oklch(0.22 0.18 285);
  }
  .pdlbtn--default .pdlbtn-divider {
    background-color: oklch(0.22 0.18 285 / 0.25);
  }
  /* ── Hover ── */
  .pdlbtn--hover {
    background-image:
      linear-gradient(135deg,
        var(--vmc-color-vault-500, oklch(0.45 0.20 285)) 0%,
        var(--vmc-color-vault-700, oklch(0.30 0.20 285)) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-orange-400, oklch(0.78 0.16 55)) 0%,
        oklch(1 0 0) 40%,
        var(--vmc-color-vault-400, oklch(0.55 0.20 285)) 75%,
        var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    color: oklch(1 0 0);
  }
  .pdlbtn--hover .pdlbtn-divider {
    background-color: oklch(1 0 0 / 0.30);
  }
  /* ── Focus ── */
  .pdlbtn--focus {
    background-image:
      linear-gradient(135deg,
        color-mix(in oklch, oklch(0.45 0.20 285) 80%, oklch(0 0 0)) 0%,
        color-mix(in oklch, oklch(0.30 0.20 285) 80%, oklch(0 0 0)) 100%
      ),
      linear-gradient(135deg,
        var(--vmc-color-orange-400, oklch(0.78 0.16 55)) 0%,
        oklch(1 0 0) 40%,
        var(--vmc-color-vault-400, oklch(0.55 0.20 285)) 75%,
        var(--vmc-color-vault-300, oklch(0.80 0.12 285)) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    color: oklch(1 0 0 / 0.85);
    outline: 2px solid oklch(0.78 0.16 55);
    outline-offset: 2px;
  }
  .pdlbtn--focus .pdlbtn-divider {
    background-color: oklch(1 0 0 / 0.30);
  }
`;

type DlBtnState = "default" | "hover" | "focus";

const DL_STATE_CLS: Record<DlBtnState, string> = {
  default: "pdlbtn pdlbtn--default",
  hover:   "pdlbtn pdlbtn--hover",
  focus:   "pdlbtn pdlbtn--focus",
};

interface IconProps { size?: number; }

function DownloadArrowIcon({ size = 20 }: IconProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilesIcon({ size = 20 }: IconProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7 6H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="8" y="3" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface DownloadBtnProps { state: DlBtnState; }

function DownloadBtn({ state }: DownloadBtnProps): JSX.Element {
  const cls = DL_STATE_CLS[state];
  return (
    <button type="button" className={cls} aria-label="Descargar detalle de la oferta">
      <span className="pdlbtn-left">
        <FilesIcon size={16} />
        <span>Detalle de la oferta</span>
      </span>
      <span className="pdlbtn-divider" aria-hidden="true" />
      <span className="pdlbtn-right">
        <DownloadArrowIcon size={16} />
        <span>Descarga</span>
      </span>
    </button>
  );
}

function DownloadBtnInteractive(): JSX.Element {
  const [dlState, setDlState] = useState<DlBtnState>("default");

  function handleMouseEnter(): void { setDlState("hover"); }
  function handleMouseLeave(): void { setDlState("default"); }
  function handleMouseDown(): void  { setDlState("focus"); }
  function handleMouseUp(): void    { setDlState("hover"); }

  const cls = DL_STATE_CLS[dlState];
  return (
    <button
      type="button"
      className={cls}
      aria-label="Descargar detalle de la oferta"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span className="pdlbtn-left">
        <FilesIcon size={16} />
        <span>Detalle de la oferta</span>
      </span>
      <span className="pdlbtn-divider" aria-hidden="true" />
      <span className="pdlbtn-right">
        <DownloadArrowIcon size={16} />
        <span>Descarga</span>
      </span>
    </button>
  );
}

/* ─── AuctionConditions components ─── */
interface ConditionsCardProps { interactive: boolean; }

function ConditionsCard({ interactive }: ConditionsCardProps): JSX.Element {
  const [active, setActive] = useState<boolean[]>(
    CONDITION_ITEMS.map(function initState(c) { return c.initialActive; })
  );

  function handleToggle(index: number): void {
    setActive(function updater(prev) {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  const isOddCount = CONDITION_ITEMS.length % 2 !== 0;

  return (
    <div style={{
      background: "oklch(1 0 0)",
      borderRadius: 8,
      boxShadow: "0 0 16px 0 oklch(0 0 0 / 0.14)",
      padding: "4px 6px",
      width: 311,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {CONDITION_ITEMS.map(function renderPill(item, i) {
          const isLastOdd = isOddCount && (i === CONDITION_ITEMS.length - 1);
          function handlePillToggle(): void { handleToggle(i); }
          return (
            <ConditionPill
              key={item.label}
              label={item.label}
              isActive={active[i] ?? false}
              onToggle={interactive ? handlePillToggle : undefined}
              spanFull={isLastOdd}
              interactive={interactive}
            />
          );
        })}
      </div>
    </div>
  );
}
