import type { JSX } from "react";

const font  = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const vault = "#3B1782";
const live  = "#ED8936";

const STYLES = `
  .vhv-bar {
    width: 806px; height: 64px;
    background: ${vault};
    display: flex; align-items: center;
    justify-content: flex-end;
    padding: 0 24px; box-sizing: border-box;
    border-radius: 4px; flex-shrink: 0;
  }
  .vhv-tray {
    display: flex; align-items: flex-end; gap: 40px;
    padding: 32px 40px;
    background: ${vault};
    border-radius: 8px;
  }
  .vhv-col {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
  }
  .vhv-lbl {
    font-family: ${font}; font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.30); margin: 0;
  }

  /* ─── A — White inverse ─── */
  .pa {
    display: inline-flex; align-items: center; gap: 8px;
    height: 36px; padding: 0 16px 0 6px;
    border-radius: 9999px; cursor: pointer; border: none;
    background: #fff;
    font-family: ${font}; font-size: 13px; font-weight: 700;
    color: ${vault};
    transition: background 120ms ease, transform 120ms ease;
  }
  .pa__dot {
    width: 22px; height: 22px; border-radius: 9999px;
    background: ${vault}; display: flex; align-items: center;
    justify-content: center; color: #fff; flex-shrink: 0;
  }
  .pa--hover  { background: rgba(255,255,255,0.88); }
  .pa--pressed { background: rgba(255,255,255,0.72); transform: scale(0.96); }

  /* ─── B — Orange solid flat ─── */
  .pb {
    display: inline-flex; align-items: center; gap: 8px;
    height: 36px; padding: 0 16px 0 6px;
    border-radius: 9999px; cursor: pointer; border: none;
    background: ${live};
    font-family: ${font}; font-size: 13px; font-weight: 700;
    color: ${vault};
    transition: background 120ms ease, transform 120ms ease;
  }
  .pb__dot {
    width: 22px; height: 22px; border-radius: 9999px;
    background: ${vault}; display: flex; align-items: center;
    justify-content: center; color: #fff; flex-shrink: 0;
  }
  .pb--hover  { background: color-mix(in oklch, ${live} 88%, oklch(1 0 0)); }
  .pb--pressed { background: color-mix(in oklch, ${live} 78%, oklch(0 0 0)); transform: scale(0.96); }

  /* ─── C — Gradient border ─── */
  .pc {
    display: inline-flex; align-items: center; gap: 8px;
    height: 36px; padding: 0 16px 0 6px;
    border-radius: 9999px; cursor: pointer;
    border: 1.5px solid transparent;
    background:
      linear-gradient(${vault}, ${vault}) padding-box,
      linear-gradient(135deg, ${live} 0%, #F5A040 100%) border-box;
    font-family: ${font}; font-size: 13px; font-weight: 700;
    color: #fff;
    transition: opacity 120ms ease, transform 120ms ease;
  }
  .pc__dot {
    width: 22px; height: 22px; border-radius: 9999px;
    background: linear-gradient(135deg, ${live} 0%, #F5A040 100%);
    display: flex; align-items: center;
    justify-content: center; color: #fff; flex-shrink: 0;
  }
  .pc--hover  { opacity: 0.82; }
  .pc--pressed { opacity: 0.64; transform: scale(0.96); }

  @media (prefers-reduced-motion: reduce) {
    .pa, .pb, .pc { transition: none; }
  }
`;

function AvatarIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SLabel({ children }: { children: string }): JSX.Element {
  return (
    <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: vault, opacity: 0.4, margin: 0 }}>
      {children}
    </p>
  );
}

function VarLabel({ children }: { children: string }): JSX.Element {
  return (
    <p style={{ fontFamily: font, fontSize: 11, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.06em",
      color: vault, margin: 0 }}>
      {children}
    </p>
  );
}

/* ── Pill A ── */
function PA({ loggedIn, mod }: { loggedIn?: boolean; mod?: string }): JSX.Element {
  return (
    <button type="button" className={`pa${mod ? ` ${mod}` : ""}`}>
      <span className="pa__dot"><AvatarIcon /></span>
      {loggedIn ? <span>Bienvenido, <strong style={{ color: live }}>ZAEX5G</strong></span> : "Ingresa"}
    </button>
  );
}

/* ── Pill B ── */
function PB({ loggedIn, mod }: { loggedIn?: boolean; mod?: string }): JSX.Element {
  return (
    <button type="button" className={`pb${mod ? ` ${mod}` : ""}`}>
      <span className="pb__dot"><AvatarIcon /></span>
      {loggedIn ? <span>Bienvenido, <strong style={{ color: vault }}>ZAEX5G</strong></span> : "Ingresa"}
    </button>
  );
}

/* ── Pill C ── */
function PC({ loggedIn, mod }: { loggedIn?: boolean; mod?: string }): JSX.Element {
  return (
    <button type="button" className={`pc${mod ? ` ${mod}` : ""}`}>
      <span className="pc__dot"><AvatarIcon /></span>
      {loggedIn ? <span style={{ fontWeight: 400 }}>Bienvenido, <strong style={{ color: live }}>ZAEX5G</strong></span> : "Ingresa"}
    </button>
  );
}

function Block({
  varLabel, login, loginIn, loginStates, loginInStates,
}: {
  varLabel: string;
  login: JSX.Element;
  loginIn: JSX.Element;
  loginStates: [JSX.Element, JSX.Element, JSX.Element];
  loginInStates: [JSX.Element, JSX.Element, JSX.Element];
}): JSX.Element {
  const states = ["Default", "Hover", "Pressed"] as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <VarLabel>{varLabel}</VarLabel>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SLabel>Header · Login</SLabel>
        <div className="vhv-bar">{login}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SLabel>Header · Logged in</SLabel>
        <div className="vhv-bar">{loginIn}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SLabel>Button · Login</SLabel>
        <div className="vhv-tray">
          {loginStates.map(function renderState(pill, i) {
            return (
              <div key={states[i]} className="vhv-col">
                {pill}
                <p className="vhv-lbl">{states[i]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SLabel>Button · Logged in</SLabel>
        <div className="vhv-tray">
          {loginInStates.map(function renderState(pill, i) {
            return (
              <div key={states[i]} className="vhv-col">
                {pill}
                <p className="vhv-lbl">{states[i]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const div = <hr style={{ width: "100%", border: "none", borderTop: "1px solid rgba(59,23,130,0.08)" }} />;

export default function HeaderVariantsPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
        minHeight: "100vh", background: "#fff", padding: "64px 80px", gap: 56 }}>

        <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.1em",
          color: vault, opacity: 0.3, margin: 0 }}>
          Header · Variantes
        </p>

        <Block
          varLabel="A — Blanco inverso"
          login={<PA />} loginIn={<PA loggedIn />}
          loginStates={[<PA />, <PA mod="pa--hover" />, <PA mod="pa--pressed" />]}
          loginInStates={[<PA loggedIn />, <PA loggedIn mod="pa--hover" />, <PA loggedIn mod="pa--pressed" />]}
        />

        {div}

        <Block
          varLabel="B — Naranja sólido flat (texto vault)"
          login={<PB />} loginIn={<PB loggedIn />}
          loginStates={[<PB />, <PB mod="pb--hover" />, <PB mod="pb--pressed" />]}
          loginInStates={[<PB loggedIn />, <PB loggedIn mod="pb--hover" />, <PB loggedIn mod="pb--pressed" />]}
        />

        {div}

        <Block
          varLabel="C — Gradient border (naranja → ámbar)"
          login={<PC />} loginIn={<PC loggedIn />}
          loginStates={[<PC />, <PC mod="pc--hover" />, <PC mod="pc--pressed" />]}
          loginInStates={[<PC loggedIn />, <PC loggedIn mod="pc--hover" />, <PC loggedIn mod="pc--pressed" />]}
        />

      </div>
    </>
  );
}
