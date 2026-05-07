import type { JSX } from "react";

const font  = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const vault = "#22005C";
const vaultMid = "#3B1782";
const live  = "#ED8936";
const teal  = "#00CACE";
const white = "#FFFFFF";

const NAV = [
  { label: "Inicio",     active: false },
  { label: "Subastas",   active: true  },
  { label: "Historial",  active: false },
  { label: "Perfil",     active: false },
  { label: "Configuración", active: false },
];

const STYLES = `
  /* ── shared reset ── */
  .vsb-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── A — Solid vault (actual) ── */
  .vsb-a { width:200px; border-radius:12px; background:${vault}; overflow:hidden; }
  .vsb-a__brand {
    display:flex; align-items:center; justify-content:center;
    height:56px; border-bottom:1px solid rgba(255,255,255,0.07);
  }
  .vsb-a__item {
    display:flex; align-items:center; height:40px; padding:0 16px;
    border-left:3px solid transparent; cursor:pointer;
    transition:background 150ms cubic-bezier(0.3,0,0,1);
    font-family:${font}; font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.55); letter-spacing:0.04em; text-transform:uppercase;
  }
  .vsb-a__item:hover { background:rgba(255,255,255,0.06); }
  .vsb-a__item--active {
    background:rgba(255,255,255,0.10);
    border-left-color:${teal};
    color:${white}; font-weight:700;
  }

  /* ── B — Gradient vault + active pill ── */
  .vsb-b {
    width:200px; border-radius:12px; overflow:hidden;
    background:linear-gradient(160deg, ${vaultMid} 0%, ${vault} 100%);
    box-shadow:0 8px 32px oklch(0.22 0.18 285 / 40%);
  }
  .vsb-b__brand {
    display:flex; align-items:center; justify-content:center;
    height:56px; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .vsb-b__item {
    display:flex; align-items:center; height:40px; padding:0 12px;
    cursor:pointer; margin:2px 8px; border-radius:8px;
    transition:background 150ms cubic-bezier(0.3,0,0,1);
    font-family:${font}; font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.50); letter-spacing:0.04em; text-transform:uppercase;
  }
  .vsb-b__item:hover { background:rgba(255,255,255,0.07); color:rgba(255,255,255,0.80); }
  .vsb-b__item--active {
    background:linear-gradient(135deg, rgba(237,137,54,0.22) 0%, rgba(237,137,54,0.08) 100%);
    border:1px solid rgba(237,137,54,0.30);
    color:${white}; font-weight:700;
  }

  /* ── C — Glass vault ── */
  .vsb-c {
    width:200px; border-radius:12px; overflow:hidden;
    background:rgba(34,0,92,0.55);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,0.12);
    box-shadow:0 8px 32px rgba(0,0,0,0.35);
  }
  .vsb-c__brand {
    display:flex; align-items:center; justify-content:center;
    height:56px; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .vsb-c__item {
    display:flex; align-items:center; height:40px; padding:0 12px;
    cursor:pointer; margin:2px 8px; border-radius:8px;
    transition:background 150ms cubic-bezier(0.3,0,0,1);
    font-family:${font}; font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.50); letter-spacing:0.04em; text-transform:uppercase;
  }
  .vsb-c__item:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.85); }
  .vsb-c__item--active {
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.18);
    color:${white}; font-weight:700;
  }

  /* ── D — Dark minimal con accent live ── */
  .vsb-d {
    width:200px; border-radius:12px; overflow:hidden;
    background:oklch(0.12 0.06 285);
    box-shadow:0 8px 24px rgba(0,0,0,0.50);
  }
  .vsb-d__brand {
    display:flex; align-items:center; justify-content:center;
    height:56px; border-bottom:1px solid rgba(255,255,255,0.05);
  }
  .vsb-d__item {
    display:flex; align-items:center; justify-content:space-between;
    height:40px; padding:0 16px; cursor:pointer;
    border-left:3px solid transparent;
    transition:background 150ms cubic-bezier(0.3,0,0,1);
    font-family:${font}; font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.40); letter-spacing:0.04em; text-transform:uppercase;
  }
  .vsb-d__item:hover { background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.70); }
  .vsb-d__item--active {
    border-left-color:${live};
    background:rgba(237,137,54,0.08);
    color:${white}; font-weight:700;
  }
  .vsb-d__dot {
    width:6px; height:6px; border-radius:9999px; background:${live};
    box-shadow:0 0 8px rgba(237,137,54,0.80);
  }

  /* ── E — Frosted con live accent line ── */
  .vsb-e {
    width:200px; border-radius:12px; overflow:hidden;
    background:linear-gradient(160deg, rgba(59,23,130,0.70) 0%, rgba(34,0,92,0.85) 100%);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    border:1px solid rgba(255,255,255,0.10);
    box-shadow:0 12px 40px oklch(0.22 0.18 285 / 50%);
  }
  .vsb-e__brand {
    display:flex; align-items:center; justify-content:center;
    height:56px; border-bottom:1px solid rgba(255,255,255,0.07);
  }
  .vsb-e__accent {
    height:2px;
    background:linear-gradient(90deg, ${live} 0%, ${teal} 100%);
    margin:0 16px; border-radius:9999px; opacity:0.8;
  }
  .vsb-e__item {
    display:flex; align-items:center; height:40px; padding:0 16px;
    cursor:pointer; border-left:2px solid transparent;
    transition:background 150ms cubic-bezier(0.3,0,0,1), border-color 150ms;
    font-family:${font}; font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.45); letter-spacing:0.04em; text-transform:uppercase;
  }
  .vsb-e__item:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.80); }
  .vsb-e__item--active {
    border-left-color:${teal};
    background:rgba(0,202,206,0.08);
    color:${white}; font-weight:700;
  }
`;

function Brand({ size = 13 }: { size?: number }): JSX.Element {
  return (
    <span style={{
      fontFamily: font, fontSize: size, fontWeight: 800,
      color: white, letterSpacing: "-0.02em",
    }}>
      VMC Subastas
    </span>
  );
}

function Label({ children }: { children: string }): JSX.Element {
  return (
    <p style={{
      fontFamily: font, fontSize: 10, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: "#3B1782", opacity: 0.4, marginBottom: 12,
    }}>
      {children}
    </p>
  );
}

/* ── Sidebar A ── */
function SidebarA(): JSX.Element {
  return (
    <div className="vsb-a">
      <div className="vsb-a__brand"><Brand /></div>
      {NAV.map(function renderItem(item) {
        return (
          <div key={item.label}
            className={`vsb-a__item${item.active ? " vsb-a__item--active" : ""}`}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

/* ── Sidebar B ── */
function SidebarB(): JSX.Element {
  return (
    <div className="vsb-b">
      <div className="vsb-b__brand"><Brand /></div>
      <div style={{ padding: "8px 0" }}>
        {NAV.map(function renderItem(item) {
          return (
            <div key={item.label}
              className={`vsb-b__item${item.active ? " vsb-b__item--active" : ""}`}>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Sidebar C ── */
function SidebarC(): JSX.Element {
  return (
    <div className="vsb-c">
      <div className="vsb-c__brand"><Brand /></div>
      <div style={{ padding: "8px 0" }}>
        {NAV.map(function renderItem(item) {
          return (
            <div key={item.label}
              className={`vsb-c__item${item.active ? " vsb-c__item--active" : ""}`}>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Sidebar D ── */
function SidebarD(): JSX.Element {
  return (
    <div className="vsb-d">
      <div className="vsb-d__brand"><Brand /></div>
      {NAV.map(function renderItem(item) {
        return (
          <div key={item.label}
            className={`vsb-d__item${item.active ? " vsb-d__item--active" : ""}`}>
            <span>{item.label}</span>
            {item.active && <span className="vsb-d__dot" />}
          </div>
        );
      })}
    </div>
  );
}

/* ── Sidebar E ── */
function SidebarE(): JSX.Element {
  return (
    <div className="vsb-e">
      <div className="vsb-e__brand"><Brand /></div>
      <div className="vsb-e__accent" style={{ margin: "10px 16px 6px" }} />
      {NAV.map(function renderItem(item) {
        return (
          <div key={item.label}
            className={`vsb-e__item${item.active ? " vsb-e__item--active" : ""}`}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

export default function SidebarVariantsPage(): JSX.Element {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="vsb-wrap" style={{
        minHeight:   "100vh",
        background:  "#F2F4F3",
        padding:     "64px 80px",
        display:     "flex",
        flexWrap:    "wrap",
        gap:         "48px 40px",
        alignItems:  "flex-start",
      }}>

        <div style={{ width: "100%", marginBottom: 8 }}>
          <p style={{ fontFamily: font, fontSize: 10, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em", color: "#3B1782", opacity: 0.3 }}>
            Sidebar · Variantes
          </p>
        </div>

        <div><Label>A — Solid vault (actual)</Label><SidebarA /></div>
        <div><Label>B — Gradient + active pill naranja</Label><SidebarB /></div>
        <div><Label>C — Glass vault</Label><SidebarC /></div>
        <div><Label>D — Dark minimal + live dot</Label><SidebarD /></div>
        <div><Label>E — Frosted + gradient accent</Label><SidebarE /></div>

      </div>
    </>
  );
}
