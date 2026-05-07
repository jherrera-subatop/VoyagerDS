import type { JSX } from "react";

const font  = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const vault = "#3B1782";

const STYLES = `
  /* ── pill base — filled orange ── */
  .v2-pill {
    display:        inline-flex;
    align-items:    center;
    gap:            10px;
    height:         38px;
    padding:        0 18px 0 4px;
    border-radius:  9999px;
    font-family:    ${font};
    font-size:      13px;
    font-weight:    700;
    color:          #FFFFFF;
    cursor:         pointer;
    border:         1.5px solid rgba(255,255,255,0.18);
    background:     linear-gradient(135deg, #F5A558 0%, #ED8936 55%, #E07520 100%);
    box-shadow:     0 2px 8px rgba(237,137,54,0.22);
    transition:     background 150ms cubic-bezier(0.3,0,0,1),
                    box-shadow  150ms cubic-bezier(0.3,0,0,1),
                    transform   150ms cubic-bezier(0.3,0,0,1),
                    border-color 150ms cubic-bezier(0.3,0,0,1);
  }
  .v2-pill__icon {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           30px;
    height:          30px;
    border-radius:   9999px;
    background:      rgba(255,255,255,0.22);
    border:          1.5px solid rgba(255,255,255,0.30);
    flex-shrink:     0;
  }
  .v2-pill--loggedin { font-weight: 400; }
  .v2-pill--loggedin strong {
    font-weight: 700;
    color: rgba(255,255,255,0.95);
  }

  /* ── hover — apaga glow, baja brillo ── */
  .v2-pill--hover {
    background:  linear-gradient(135deg,
      color-mix(in oklch, #F5A558 82%, oklch(0 0 0)) 0%,
      color-mix(in oklch, #E07520 82%, oklch(0 0 0)) 100%);
    box-shadow:  0 2px 10px rgba(237,137,54,0.28),
                 inset 0 1px 0 rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.10);
  }

  /* ── pressed — muy oscuro + scale ── */
  .v2-pill--pressed {
    background:  linear-gradient(135deg,
      color-mix(in oklch, #F5A558 58%, oklch(0 0 0)) 0%,
      color-mix(in oklch, #E07520 58%, oklch(0 0 0)) 100%);
    box-shadow:  0 1px 4px rgba(0,0,0,0.30),
                 inset 0 2px 4px rgba(0,0,0,0.20);
    border-color: rgba(255,255,255,0.08);
    transform:   scale(0.96);
  }

  /* ── header bar ── */
  .v2-header {
    width: 806px; height: 64px;
    background: ${vault};
    display: flex; align-items: center;
    justify-content: flex-end;
    padding: 0 24px; box-sizing: border-box;
    border-radius: 4px; flex-shrink: 0;
  }

  /* ── tray on vault bg ── */
  .v2-tray {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px 40px;
    background: ${vault};
    border-radius: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    .v2-pill { transition: none; }
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

function Label({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontFamily: font, fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: "#3B1782", opacity: 0.4, margin: 0,
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
      color: "rgba(255,255,255,0.35)",
      margin: 0, textAlign: "center",
    }}>
      {children}
    </p>
  );
}

function PillLogin({ mod }: { mod?: string }): JSX.Element {
  return (
    <button type="button" className={`v2-pill${mod ? ` ${mod}` : ""}`}>
      <span className="v2-pill__icon"><AvatarIcon /></span>
      Ingresa
    </button>
  );
}

function PillLoggedIn({ mod }: { mod?: string }): JSX.Element {
  return (
    <button type="button" className={`v2-pill v2-pill--loggedin${mod ? ` ${mod}` : ""}`}>
      <span className="v2-pill__icon"><AvatarIcon /></span>
      Bienvenido, <strong>ZAEX5G</strong>
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

export default function HeaderV2Page(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "flex-start",
        minHeight:     "100vh",
        background:    "#FFFFFF",
        padding:       "64px 80px",
        gap:           48,
      }}>

        <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.1em",
          color: "#3B1782", opacity: 0.3, margin: 0 }}>
          Header V2 · Pill naranja filled
        </p>

        {/* ── Header Login ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label>Header · Login</Label>
          <div className="v2-header">
            <PillLogin />
          </div>
        </div>

        {/* ── Header Logged-in ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label>Header · Logged in</Label>
          <div className="v2-header">
            <PillLoggedIn />
          </div>
        </div>

        {/* ── Button Login — estados ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label>Button · Login</Label>
          <div className="v2-tray">
            <StateBlock pill={<PillLogin />}                        state="Default" />
            <StateBlock pill={<PillLogin mod="v2-pill--hover" />}   state="Hover"   />
            <StateBlock pill={<PillLogin mod="v2-pill--pressed" />} state="Pressed" />
          </div>
        </div>

        {/* ── Button Logged-in — estados ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label>Button · Logged in</Label>
          <div className="v2-tray">
            <StateBlock pill={<PillLoggedIn />}                        state="Default" />
            <StateBlock pill={<PillLoggedIn mod="v2-pill--hover" />}   state="Hover"   />
            <StateBlock pill={<PillLoggedIn mod="v2-pill--pressed" />} state="Pressed" />
          </div>
        </div>

      </div>
    </>
  );
}
