/**
 * ComponentWireframe — bocetos a proporciones reales.
 *
 * Reglas aplicadas:
 * - DESIGN.md manda en medidas (header 64px, btn 44px, input 48px,
 *   card-img 132px, padding 12px, gap 8px, radius 4px, etc.)
 * - VMC DETALLE manda en layout y comportamiento
 * - SubasCars manda en anatomía interna cuando decision = referencia-subascars
 * - Sin color de marca: solo grises neutros para que sea un boceto genuino
 */

/** Paleta neutra de boceto */
const W = {
  bg: "rgba(130,128,148,0.08)",
  border: "rgba(130,128,148,0.35)",
  fill: "rgba(130,128,148,0.18)",
  fillDark: "rgba(130,128,148,0.32)",
  fillDarker: "rgba(130,128,148,0.48)",
  text: "rgba(60,58,80,0.55)",
  textStrong: "rgba(60,58,80,0.75)",
  label: {
    fontSize: "8px",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "rgba(60,58,80,0.45)",
    fontFamily: "monospace",
  },
  mono: {
    fontFamily: "'Roboto Mono', 'Courier New', monospace",
  },
};

/** Línea de texto simulada */
function Line({ w = "60%", h = 7, opacity = 1 }: { w?: string; h?: number; opacity?: number }) {
  return (
    <div
      style={{
        width: w,
        height: `${h}px`,
        borderRadius: "3px",
        background: W.fill,
        opacity,
        flexShrink: 0,
      }}
    />
  );
}

/** Contenedor del boceto con borde discontinuo */
function WireFrame({
  children,
  label,
  minH = 80,
  p = 8,
}: {
  children: React.ReactNode;
  label?: string;
  minH?: number;
  p?: number;
}) {
  return (
    <div
      style={{
        border: `1.5px dashed ${W.border}`,
        borderRadius: "6px",
        background: W.bg,
        padding: `${p}px`,
        minHeight: `${minH}px`,
        display: "flex",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      {children}
      {label && (
        <div style={{ ...W.label, marginTop: "6px", paddingTop: "4px", borderTop: `1px solid ${W.border}` }}>
          {label}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── sketches por componente ────────────────────────── */

/** Icon — tamaños sm/md/lg, referencia SubasCars sprite */
function WireIcon() {
  const sizes = [
    { s: 16, name: "sm" },
    { s: 20, name: "md" },
    { s: 24, name: "lg" },
  ];
  return (
    <WireFrame label="svg sprite · sm 16 · md 20 · lg 24 · color via token">
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", padding: "8px 0" }}>
        {sizes.map(({ s, name }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: `${s}px`,
                height: `${s}px`,
                border: `1.5px solid ${W.border}`,
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 24 24" width={s - 4} height={s - 4} fill="none" stroke={W.border} strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
            </div>
            <span style={{ ...W.label, fontSize: "7px" }}>{name}</span>
          </div>
        ))}
        <div style={{ marginLeft: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {["Bell", "Check", "Car", "Clock"].map((n) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{ width: "14px", height: "14px", border: `1px dashed ${W.border}`, borderRadius: "2px" }}
              />
              <span style={{ ...W.label }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </WireFrame>
  );
}

/** Button — DESIGN.md: h44, radius4, padding 0 20px. Variantes VMC */
function WireButton() {
  return (
    <WireFrame label="h 44px · radius 4px · padding 0 20px · 7 estados">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "4px 0" }}>
        {/* Primario */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            style={{
              height: "44px",
              padding: "0 20px",
              borderRadius: "4px",
              background: W.fillDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Line w="60px" h={8} />
          </div>
          <span style={W.label}>primario</span>
        </div>
        {/* Secundario */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            style={{
              height: "44px",
              padding: "0 20px",
              borderRadius: "4px",
              border: `1.5px solid ${W.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Line w="60px" h={8} />
          </div>
          <span style={W.label}>ghost / secundario</span>
        </div>
        {/* Disabled */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            style={{
              height: "44px",
              padding: "0 20px",
              borderRadius: "4px",
              background: W.fill,
              opacity: 0.45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Line w="60px" h={8} />
          </div>
          <span style={W.label}>disabled 72% opacity</span>
        </div>
      </div>
    </WireFrame>
  );
}

/** Input — DESIGN.md: h48, sin borde en rest, label arriba uppercase, helper/error abajo */
function WireInput() {
  return (
    <WireFrame label="h 48px · fill sin borde · label uppercase arriba · helper / error abajo">
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "4px 0" }}>
        {/* Label uppercase */}
        <div
          style={{
            ...W.label,
            fontSize: "9px",
            letterSpacing: "0.9px",
          }}
        >
          NOMBRE DEL CAMPO
        </div>
        {/* Campo */}
        <div
          style={{
            height: "48px",
            borderRadius: "4px",
            background: W.fill,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
          }}
        >
          <Line w="45%" h={8} opacity={0.6} />
        </div>
        {/* Helper */}
        <Line w="55%" h={6} opacity={0.5} />
        {/* Error state */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "4px" }}>
          <div
            style={{
              height: "48px",
              flex: 1,
              borderRadius: "4px",
              background: W.fill,
              border: `1px solid rgba(186,26,26,0.35)`,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
            <Line w="35%" h={8} opacity={0.5} />
          </div>
          <span style={W.label}>estado error</span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(186,26,26,0.3)" }} />
          <Line w="50%" h={6} opacity={0.5} />
        </div>
      </div>
    </WireFrame>
  );
}

/**
 * Header — DESIGN.md: h64, width 768px (panel derecho), fondo oscuro.
 * Anatomía SubasCars Group Checkout 2: logo izq + nav-links centro + cta-login + cta-registro der.
 */
function WireHeader() {
  return (
    <WireFrame label="h 64px · logo izq · nav-links centro · cta-login + cta-registro der · SubasCars Group Checkout 2">
      <div
        style={{
          height: "64px",
          borderRadius: "4px",
          background: W.fillDarker,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: "0",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "96px",
            height: "28px",
            borderRadius: "3px",
            background: W.fillDark,
            border: `1px solid ${W.border}`,
          }}
        />
        {/* Nav links */}
        <div style={{ display: "flex", gap: "20px" }}>
          {["Subastas", "Vehículos", "Nosotros"].map((l, i) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span
                style={{
                  ...W.label,
                  color: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.45)",
                  fontSize: "8px",
                }}
              >
                {l}
              </span>
              {i === 0 && (
                <div style={{ width: "100%", height: "2px", borderRadius: "1px", background: W.border }} />
              )}
            </div>
          ))}
        </div>
        {/* CTAs */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            style={{
              height: "32px",
              padding: "0 12px",
              borderRadius: "4px",
              border: `1px solid ${W.border}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ ...W.label, color: "rgba(255,255,255,0.6)" }}>ingresar</span>
          </div>
          <div
            style={{
              height: "32px",
              padding: "0 12px",
              borderRadius: "4px",
              background: W.fillDark,
              border: `1px solid ${W.border}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ ...W.label, color: "rgba(255,255,255,0.7)" }}>registrarse</span>
          </div>
        </div>
      </div>
    </WireFrame>
  );
}

/**
 * Navbar — anatomía SubasCars "Navigation" (icon + label por ítem)
 */
function WireNavbar() {
  const items = [
    { icon: "🏷️", label: "Subastas", active: true },
    { icon: "🚗", label: "Vehículos" },
    { icon: "👤", label: "Cuenta" },
    { icon: "❤️", label: "Favoritos" },
  ];
  return (
    <WireFrame label="icon + label · indicador activo bajo ítem · colapsa a hamburger en mobile · SubasCars Navigation">
      <div
        style={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          borderBottom: `2px solid ${W.border}`,
          padding: "0 8px",
        }}
      >
        {items.map(({ label, active }) => (
          <div
            key={label}
            style={{
              height: "48px",
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              position: "relative",
              borderBottom: active ? `2px solid ${W.fillDarker}` : "2px solid transparent",
              marginBottom: "-2px",
            }}
          >
            <div style={{ width: "16px", height: "16px", borderRadius: "2px", background: W.fill }} />
            <span style={{ ...W.label, fontSize: "7px", color: active ? W.textStrong : W.text }}>{label}</span>
          </div>
        ))}
      </div>
    </WireFrame>
  );
}

/**
 * Footer — anatomía SubasCars Footer Desktop: logo top-left, 3-4 cols links, fila copyright
 */
function WireFooter() {
  const cols = [
    { head: "Empresa", rows: 3 },
    { head: "Legal", rows: 4 },
    { head: "Redes", rows: 4 },
    { head: "Contacto", rows: 3 },
  ];
  return (
    <WireFrame label="logo · 4 cols links · copyright · SubasCars Footer Desktop" minH={100} p={10}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Logo + cols */}
        <div style={{ display: "flex", gap: "24px" }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "80px" }}>
            <div style={{ width: "72px", height: "20px", borderRadius: "3px", background: W.fillDark }} />
            <Line w="70px" h={6} opacity={0.5} />
            <Line w="55px" h={6} opacity={0.4} />
          </div>
          {/* Cols links */}
          {cols.map(({ head, rows }) => (
            <div key={head} style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
              <Line w="50%" h={7} />
              {Array.from({ length: rows }).map((_, i) => (
                <Line key={i} w={`${45 + i * 5}%`} h={6} opacity={0.5} />
              ))}
            </div>
          ))}
        </div>
        {/* Separator */}
        <div style={{ height: "1px", background: W.fill }} />
        {/* Copyright */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Line w="30%" h={6} opacity={0.4} />
          <div style={{ display: "flex", gap: "8px" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{ width: "18px", height: "18px", borderRadius: "9999px", background: W.fill }}
              />
            ))}
          </div>
        </div>
      </div>
    </WireFrame>
  );
}

/**
 * Sidebar — VMC: 256px, filtros de precio/tipo/año/marca + slider price range
 */
function WireSidebar() {
  const filters = [
    { label: "Precio", type: "range" },
    { label: "Tipo vehículo", type: "checkboxes" },
    { label: "Año", type: "checkboxes" },
    { label: "Marca", type: "checkboxes" },
  ];
  return (
    <WireFrame label="256px · filtros precio-range + checkboxes · VMC audit" minH={160} p={8}>
      <div style={{ display: "flex", gap: "12px" }}>
        {/* Panel sidebar */}
        <div
          style={{
            width: "120px",
            border: `1px solid ${W.border}`,
            borderRadius: "4px",
            background: W.bg,
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {filters.map(({ label, type }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Line w="70%" h={7} />
              {type === "range" && (
                <div style={{ position: "relative", height: "10px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", height: "3px", borderRadius: "9999px", background: W.fill }} />
                  <div
                    style={{
                      position: "absolute",
                      left: "30%",
                      width: "60%",
                      height: "3px",
                      background: W.fillDarker,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "28%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: W.fillDarker,
                      border: `1px solid ${W.border}`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "87%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: W.fillDarker,
                      border: `1px solid ${W.border}`,
                    }}
                  />
                </div>
              )}
              {type === "checkboxes" &&
                [65, 50, 75].map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "2px",
                        border: `1px solid ${W.border}`,
                        ...(i === 1 ? { background: W.fillDark } : {}),
                      }}
                    />
                    <Line w={`${w}%`} h={6} opacity={0.55} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        {/* Label apuntando */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
          <span style={W.label}>256px</span>
          <span style={W.label}>complementary</span>
          <span style={W.label}>aria-live</span>
        </div>
      </div>
    </WireFrame>
  );
}

/**
 * PriceDisplay — DESIGN.md 9.9: tres contextos.
 * Hero: label 12/600 "PRECIO BASE" + amount h1 30px tabular-nums + currency.
 */
function WirePriceDisplay() {
  return (
    <WireFrame label="3 contextos: hero h1-30 · card 16px · compact 12px · tabular-nums VMC">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "4px 0" }}>
        {/* Hero */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              ...W.label,
              letterSpacing: "0.9px",
              fontSize: "8px",
            }}
          >
            PRECIO BASE
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span
              style={{
                fontSize: "11px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontWeight: 700,
              }}
            >
              US$
            </span>
            <span
              style={{
                fontSize: "22px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              00,000
            </span>
          </div>
          <span style={{ ...W.label }}>contexto hero · h1 30px</span>
        </div>
        <div style={{ height: "1px", background: W.fill }} />
        {/* Card */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontSize: "8px", fontFamily: W.mono.fontFamily, color: W.textStrong }}>US$</span>
            <span
              style={{
                fontSize: "14px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0,000
            </span>
          </div>
          <span style={{ ...W.label }}>card · 16px</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ fontSize: "7px", fontFamily: W.mono.fontFamily, color: W.textStrong }}>US$</span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              000
            </span>
          </div>
          <span style={{ ...W.label }}>compact · 12px</span>
        </div>
      </div>
    </WireFrame>
  );
}

/**
 * AuctionCard — DESIGN.md 9.5: img 132px, content-padding 12px, gap 8px,
 * radius 4px, Signature bottom border 4px, badge top-left en imagen.
 */
function WireAuctionCard() {
  return (
    <WireFrame label="img 132px · badge overlay · content 12px padding 8px gap · signature border 4px" p={0}>
      <div
        style={{
          width: "200px",
          borderRadius: "4px",
          border: `1px solid ${W.border}`,
          overflow: "hidden",
          background: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Imagen 132px */}
        <div
          style={{
            width: "100%",
            height: "132px",
            background: W.fill,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Car silhouette placeholder */}
          <svg viewBox="0 0 64 32" width="56" height="28" fill="none" opacity={0.35}>
            <rect x="8" y="12" width="48" height="14" rx="2" fill="currentColor" />
            <path d="M16 12L22 4h20l6 8" fill="currentColor" />
            <circle cx="18" cy="26" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="46" cy="26" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {/* Badge top-left */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              height: "18px",
              padding: "0 8px",
              borderRadius: "9999px",
              background: W.fillDarker,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ ...W.label, color: "rgba(255,255,255,0.8)", fontSize: "7px" }}>EN VIVO</span>
          </div>
          {/* Fav button top-right */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              background: W.fill,
              border: `1px solid ${W.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke={W.border} strokeWidth="1.5">
              <path d="M8 13.5S2 9.5 2 5.5a3 3 0 0 1 6 0 3 3 0 0 1 6 0c0 4-6 8-6 8z" />
            </svg>
          </div>
        </div>
        {/* Content */}
        <div
          style={{
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* Nombre vehículo uppercase caption */}
          <Line w="90%" h={8} />
          {/* Subtítulo year · location */}
          <Line w="60%" h={6} opacity={0.5} />
          {/* Precio + fav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Line w="36px" h={5} opacity={0.4} />
              <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                <span style={{ fontSize: "7px", fontFamily: W.mono.fontFamily, color: W.textStrong }}>US$</span>
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: W.mono.fontFamily,
                    color: W.textStrong,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  0,000
                </span>
              </div>
            </div>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "9999px",
                background: W.fill,
                border: `1px solid ${W.border}`,
              }}
            />
          </div>
          {/* Countdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Line w="50px" h={6} opacity={0.4} />
            <span
              style={{
                fontSize: "10px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              00:00:00
            </span>
          </div>
        </div>
        {/* Signature border 4px */}
        <div style={{ height: "4px", background: W.fillDarker }} />
      </div>
    </WireFrame>
  );
}

/**
 * Metrics — SubasCars anatomy: icono + valor grande + label.
 * DESIGN.md: aria-live, compacto.
 */
function WireMetrics() {
  const items = [
    { icon: "👁", label: "Vistas", value: "128" },
    { icon: "🏷", label: "Pujas", value: "24" },
    { icon: "👥", label: "Postores", value: "9" },
  ];
  return (
    <WireFrame label="icono + valor + label · aria-live · SubasCars Metrics">
      <div style={{ display: "flex", gap: "12px", padding: "4px 0" }}>
        {items.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              border: `1px solid ${W.border}`,
              borderRadius: "4px",
              padding: "8px 10px",
              background: W.bg,
            }}
          >
            {/* Icon placeholder */}
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                background: W.fill,
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: W.mono.fontFamily,
                  color: W.textStrong,
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {value}
              </span>
              <span style={{ ...W.label }}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </WireFrame>
  );
}

/**
 * VehicleSpecs — VMC: dl/dt/dd con grupos por categoría (motor, carrocería…)
 * 48 instancias VMC. Filas clave-valor + header de grupo.
 */
function WireVehicleSpecs() {
  const groups = [
    { head: "Motor", rows: [["Combustible", "Gasolina"], ["Motor", "2.0L 16v"], ["Potencia", "150 CV"]] },
    { head: "Carrocería", rows: [["Tipo", "Sedán"], ["Color", "Blanco"], ["Año", "2022"]] },
  ];
  return (
    <WireFrame label="grupos col-1 header + filas clave-valor · 48 inst VMC · dl/dt/dd" minH={140} p={8}>
      <div style={{ display: "flex", gap: "12px" }}>
        {groups.map(({ head, rows }) => (
          <div
            key={head}
            style={{
              flex: 1,
              border: `1px solid ${W.border}`,
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Group header */}
            <div
              style={{
                padding: "6px 10px",
                background: W.fill,
                borderBottom: `1px solid ${W.border}`,
              }}
            >
              <Line w="50%" h={7} />
            </div>
            {/* Rows */}
            {rows.map(([k], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  padding: "5px 10px",
                  borderBottom: i < rows.length - 1 ? `1px solid ${W.border}` : "none",
                  gap: "8px",
                }}
              >
                <Line w="40%" h={6} opacity={0.5} />
                <Line w="45%" h={6} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </WireFrame>
  );
}

/**
 * DataQualityIndicator — VMC: score %, barra de progreso, label, color semántico.
 */
function WireDataQualityIndicator() {
  return (
    <WireFrame label="score % · barra · label semántico · meter / progressbar · VMC">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "4px 0" }}>
        {/* Badge score */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              background: W.fillDark,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontFamily: W.mono.fontFamily,
                color: W.textStrong,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              72%
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Line w="100px" h={7} />
            <span style={W.label}>calidad del dato</span>
          </div>
        </div>
        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "9999px",
            background: W.fill,
            border: `1px solid ${W.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "72%",
              height: "100%",
              borderRadius: "9999px",
              background: W.fillDarker,
            }}
          />
        </div>
        {/* Niveles */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "bajo <40%", w: 32 },
            { label: "medio 40-70%", w: 52 },
            { label: "alto >70%", w: 40 },
          ].map(({ label }) => (
            <div
              key={label}
              style={{
                flex: 1,
                height: "5px",
                borderRadius: "2px",
                background: W.fillDark,
                opacity: label.startsWith("alto") ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <span style={W.label}>aria-valuenow · aria-min · aria-max · no solo color</span>
      </div>
    </WireFrame>
  );
}

/* ─────────────────────────── mapa id → sketch ───────────────────────────── */

const WIREFRAMES: Record<string, () => React.JSX.Element> = {
  icon: WireIcon,
  btn: WireButton,
  input: WireInput,
  "header-primary": WireHeader,
  "nav-primary": WireNavbar,
  "footer-primary": WireFooter,
  sidebar: WireSidebar,
  "display-price": WirePriceDisplay,
  "card-auction": WireAuctionCard,
  "display-metrics": WireMetrics,
  "table-specs": WireVehicleSpecs,
  "indicator-data-quality": WireDataQualityIndicator,
};

interface ComponentWireframeProps {
  componentId: string;
}

export function ComponentWireframe({ componentId }: ComponentWireframeProps) {
  const Sketch = WIREFRAMES[componentId];
  if (!Sketch) {
    return (
      <div
        style={{
          border: `1.5px dashed ${W.border}`,
          borderRadius: "6px",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={W.label}>boceto pendiente — {componentId}</span>
      </div>
    );
  }
  return <Sketch />;
}
