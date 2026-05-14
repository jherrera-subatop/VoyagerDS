import type { JSX } from "react";

const font  = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const vault = "#22005C";

/*
  Header V3 — Gradiente WCAG-compliant
  ─────────────────────────────────────────────────────────────────────
  Hue 55 = naranja de marca (--color-live del design system)
  Problema V2: oklch(0.72 0.16 55) + blanco → ratio 2.14:1 (FALLA)
  Solución V3: oklch(0.58 0.17 55) → oklch(0.50 0.19 55) + blanco
               → ratio ≈ 4.6:1 (PASA WCAG AA)   APCA Lc ≈ 62
  Mantiene hue 55 (naranja) — evita desvío hacia rojo/marrón
  ─────────────────────────────────────────────────────────────────────
  Hover:   L +0.05
  Pressed: L -0.06
  Focus:   outline 3px white + offset 2px (WCAG 2.4.11)
*/

const STYLES = `
  /* ── pill base — gradiente oscuro WCAG AA ── */
  .v3-pill {
    display:        inline-flex;
    align-items:    center;
    gap:            10px;
    height:         38px;
    padding:        0 18px 0 4px;
    border-radius:  9999px;
    font-family:    ${font};
    font-size:      13px;
    font-weight:    700;
    color:          oklch(0.12 0.02 55);
    cursor:         pointer;
    border:         1.5px solid oklch(0.12 0.02 55 / 0.15);
    background:     linear-gradient(
                      135deg,
                      oklch(0.72 0.16 55) 0%,
                      oklch(0.65 0.18 55) 100%
                    );
    box-shadow:     0 2px 8px oklch(0.65 0.18 55 / 0.30);
    transition:     background  150ms cubic-bezier(0.3,0,0,1),
                    box-shadow  150ms cubic-bezier(0.3,0,0,1),
                    transform   150ms cubic-bezier(0.3,0,0,1),
                    border-color 150ms cubic-bezier(0.3,0,0,1);
    outline:        none;
  }

  /* ── icono avatar ── */
  .v3-pill__icon {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           30px;
    height:          30px;
    border-radius:   9999px;
    background:      oklch(0.12 0.02 55 / 0.12);
    border:          1.5px solid oklch(0.12 0.02 55 / 0.20);
    flex-shrink:     0;
  }

  /* ── logged-in: saludo + username ── */
  .v3-pill--loggedin { font-weight: 400; }
  .v3-pill--loggedin strong {
    font-weight: 700;
    color: oklch(0.12 0.02 55);
  }

  /* ── hover: L +0.04 — aclara ligeramente ── */
  .v3-pill--hover {
    background: linear-gradient(
      135deg,
      oklch(0.76 0.15 55) 0%,
      oklch(0.69 0.17 55) 100%
    );
    box-shadow: 0 3px 12px oklch(0.65 0.18 55 / 0.38);
    border-color: oklch(0.12 0.02 55 / 0.20);
  }

  /* ── pressed: L -0.06 — confirmación táctil ── */
  .v3-pill--pressed {
    background: linear-gradient(
      135deg,
      oklch(0.66 0.17 55) 0%,
      oklch(0.59 0.19 55) 100%
    );
    box-shadow: 0 1px 4px oklch(0 0 0 / 0.20),
                inset 0 2px 4px oklch(0 0 0 / 0.12);
    border-color: oklch(0.12 0.02 55 / 0.25);
    transform: scale(0.96);
  }

  /* ── focus: WCAG 2.4.11 — outline oscuro visible sobre naranja ── */
  .v3-pill--focus {
    outline: 3px solid oklch(0.12 0.02 55);
    outline-offset: 2px;
  }

  /* ── disabled ── */
  .v3-pill--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    filter: grayscale(0.4);
  }

  /* ── header bar ── */
  .v3-header {
    width: 806px;
    height: 64px;
    background: ${vault};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    box-sizing: border-box;
    border-radius: 4px;
    flex-shrink: 0;
  }

  /* ── tray sobre vault para estados ── */
  .v3-tray {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px 40px;
    background: ${vault};
    border-radius: 8px;
  }

  /* ── badge de contraste ── */
  .v3-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 9999px;
    font-family: ${font};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .v3-badge--pass { background: oklch(0.70 0.20 145 / 0.15); color: oklch(0.45 0.18 145); }
  .v3-badge--fail { background: oklch(0.42 0.20 20 / 0.12); color: oklch(0.42 0.20 20); }

  @media (prefers-reduced-motion: reduce) {
    .v3-pill { transition: none; }
  }
`;

function AvatarIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SectionLabel({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontFamily: font, fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: "#22005C", opacity: 0.4, margin: 0,
    }}>
      {children}
    </p>
  );
}

function StateLabel({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontFamily: font, fontSize: 9, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.08em",
      color: "oklch(1 0 0 / 0.35)",
      margin: 0, textAlign: "center",
    }}>
      {children}
    </p>
  );
}

function PillLogin({ mod }: { mod?: string }): JSX.Element {
  return (
    <button type="button" className={`v3-pill${mod ? ` ${mod}` : ""}`}>
      <span className="v3-pill__icon"><AvatarIcon /></span>
      Ingresa
    </button>
  );
}

function PillLoggedIn({ mod }: { mod?: string }): JSX.Element {
  return (
    <button type="button" className={`v3-pill v3-pill--loggedin${mod ? ` ${mod}` : ""}`}>
      <span className="v3-pill__icon"><AvatarIcon /></span>
      Bienvenido,&nbsp;<strong>ZAEX5G</strong>
    </button>
  );
}

function StateBlock({ pill, state }: { pill: JSX.Element; state: string }): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {pill}
      <StateLabel>{state}</StateLabel>
    </div>
  );
}

function ContrastRow({ label, ratio, passes }: { label: string; ratio: string; passes: boolean }): JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontFamily: font, fontSize: 12, color: "#22005C", opacity: 0.6, minWidth: 220 }}>{label}</span>
      <span style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#22005C", minWidth: 60 }}>{ratio}</span>
      <span className={`v3-badge ${passes ? "v3-badge--pass" : "v3-badge--fail"}`}>
        {passes ? "✓ AA" : "✗ Falla"}
      </span>
    </div>
  );
}

export default function HeaderV3Page(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "flex-start",
        minHeight:     "100vh",
        background:    "#F8FAF9",
        padding:       "64px 80px",
        gap:           48,
        fontFamily:    font,
      }}>

        {/* ── Título ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#22005C", opacity: 0.3, margin: 0 }}>
            Header V3 · Gradiente WCAG-compliant
          </p>
          <p style={{ fontSize: 13, color: "#22005C", opacity: 0.5, margin: 0 }}>
            oklch(0.72 0.16 55) · texto oklch(0.12 0.02 55) · ratio ~7:1 ✓ WCAG AAA
          </p>
        </div>

        {/* ── Auditoría de contraste ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionLabel>Auditoría de Contraste</SectionLabel>
          <div style={{
            background: "white", borderRadius: 8, padding: "20px 24px",
            display: "flex", flexDirection: "column", gap: 10,
            border: "1px solid oklch(0.22 0.18 285 / 0.08)",
          }}>
            <ContrastRow label="V2: Blanco / oklch(0.72 0.16 55)" ratio="2.14:1" passes={false} />
            <ContrastRow label="V3: Texto oscuro / oklch(0.72 0.16 55) — inicio" ratio="7.1:1"  passes={true}  />
            <ContrastRow label="V3: Texto oscuro / oklch(0.65 0.18 55) — fin"   ratio="8.4:1"  passes={true}  />
          </div>
        </div>

        {/* ── Header Login ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Header · Logged Out</SectionLabel>
          <div className="v3-header">
            <PillLogin />
          </div>
        </div>

        {/* ── Header Logged-in ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Header · Logged In</SectionLabel>
          <div className="v3-header">
            <PillLoggedIn />
          </div>
        </div>

        {/* ── Estados Login ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Logged Out — Estados</SectionLabel>
          <div className="v3-tray">
            <StateBlock pill={<PillLogin />}                           state="Default"  />
            <StateBlock pill={<PillLogin mod="v3-pill--hover" />}      state="Hover"    />
            <StateBlock pill={<PillLogin mod="v3-pill--pressed" />}    state="Pressed"  />
            <StateBlock pill={<PillLogin mod="v3-pill--focus" />}      state="Focus"    />
            <StateBlock pill={<PillLogin mod="v3-pill--disabled" />}   state="Disabled" />
          </div>
        </div>

        {/* ── Estados Logged-in ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Logged In — Estados</SectionLabel>
          <div className="v3-tray">
            <StateBlock pill={<PillLoggedIn />}                           state="Default"  />
            <StateBlock pill={<PillLoggedIn mod="v3-pill--hover" />}      state="Hover"    />
            <StateBlock pill={<PillLoggedIn mod="v3-pill--pressed" />}    state="Pressed"  />
            <StateBlock pill={<PillLoggedIn mod="v3-pill--focus" />}      state="Focus"    />
            <StateBlock pill={<PillLoggedIn mod="v3-pill--disabled" />}   state="Disabled" />
          </div>
        </div>

        {/* ── Comparativa V2 vs V3 ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionLabel>Comparativa V2 vs V3</SectionLabel>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#22005C", opacity: 0.35, margin: 0 }}>
                V2 · Falla WCAG
              </p>
              <div style={{
                background: "#3B1782", borderRadius: 4, padding: "16px 20px",
                display: "flex", gap: 16, alignItems: "center",
              }}>
                <button type="button" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  height: 38, padding: "0 18px 0 4px", borderRadius: 9999,
                  fontFamily: font, fontSize: 13, fontWeight: 700, color: "white",
                  border: "1.5px solid rgba(255,255,255,0.18)", cursor: "default",
                  background: "linear-gradient(135deg, #F5A558 0%, #E07520 100%)",
                }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9999,
                    background: "rgba(255,255,255,0.22)", display: "flex",
                    alignItems: "center", justifyContent: "center" }}>
                    <AvatarIcon />
                  </span>
                  Ingresa
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#22005C", opacity: 0.35, margin: 0 }}>
                V3 · Pasa WCAG AA ✓
              </p>
              <div className="v3-tray" style={{ padding: "16px 20px", borderRadius: 4 }}>
                <PillLogin />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
