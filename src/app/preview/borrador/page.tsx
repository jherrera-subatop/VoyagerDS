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

    </div>
  );
}
