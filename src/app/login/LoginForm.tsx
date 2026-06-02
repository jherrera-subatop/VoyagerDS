"use client";

import { useState } from "react";
import type { JSX } from "react";
import Link from "next/link";

/* ─── CSS extraído del preview /preview/components/button-primary ─── */
const LOGIN_CSS = `
  @property --vbtn-angle {
    syntax: '<angle>'; inherits: false; initial-value: 135deg;
  }
  @property --vbtn-stop-a {
    syntax: '<color>'; inherits: false; initial-value: oklch(0.72 0.16 55);
  }
  @property --vbtn-stop-b {
    syntax: '<color>'; inherits: false; initial-value: oklch(0.55 0.22 285);
  }
  @property --vsec-angle {
    syntax: '<angle>'; inherits: false; initial-value: 160deg;
  }
  @property --vsec-stop-a {
    syntax: '<color>'; inherits: false; initial-value: oklch(0.38 0.20 285);
  }
  @property --vsec-stop-b {
    syntax: '<color>'; inherits: false; initial-value: oklch(0.28 0.18 285);
  }

  /* ── Primary (Ingresa) ── */
  .login-btn-primary {
    --vbtn-stop-a: var(--vmc-color-orange-600);
    --vbtn-stop-b: var(--vmc-color-vault-500);
    display: flex; align-items: center; justify-content: center;
    width: 100%; height: 52px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer; position: relative; overflow: hidden;
    font-family: var(--vmc-font-display); font-size: 16px; font-weight: 700;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.25);
    letter-spacing: 0.02em;
    background-image:
      linear-gradient(var(--vbtn-angle), var(--vbtn-stop-a) 0%, var(--vbtn-stop-a) 40%, var(--vbtn-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-base-white) 0%,
        var(--vmc-color-orange-400) 25%,
        var(--vmc-color-vault-400)  75%,
        var(--vmc-color-base-white) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.28),
      0 4px 16px rgb(92.94% 53.73% 21.18% / 0.35);
    transition:
      --vbtn-angle  0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      --vbtn-stop-a 0.35s ease, --vbtn-stop-b 0.35s ease,
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  .login-btn-primary::before {
    content: ''; position: absolute; inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.17) 0%, transparent 55%);
    pointer-events: none; z-index: 1;
  }
  .login-btn-primary::after {
    content: ''; position: absolute; inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-orange-600), var(--vmc-color-vault-500));
    filter: blur(14px); opacity: 0; z-index: -1;
    transition: opacity 0.3s ease, filter 0.3s ease;
  }
  .login-btn-primary:hover {
    --vbtn-angle: 220deg;
    --vbtn-stop-a: var(--vmc-color-orange-400);
    --vbtn-stop-b: var(--vmc-color-vault-400);
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.35),
      0 4px 10px rgb(92.94% 53.73% 21.18% / 0.40);
  }
  .login-btn-primary:hover::after { opacity: 0.45; filter: blur(18px); }
  .login-btn-primary:active {
    --vbtn-stop-a: var(--vmc-color-orange-700);
    --vbtn-stop-b: var(--vmc-color-vault-600);
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.22);
  }
  .login-btn-primary:active::after { opacity: 0; }
  .login-btn-primary:focus-visible {
    outline: 3px solid transparent; outline-offset: 4px;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500);
  }

  /* ── Secondary (Regístrate) ── */
  .login-btn-secondary {
    --vsec-stop-a: var(--vmc-color-vault-500);
    --vsec-stop-b: var(--vmc-color-vault-700);
    display: flex; align-items: center; justify-content: center;
    width: 100%; height: 52px;
    border-radius: var(--vmc-radius-full);
    border: 2.5px solid transparent;
    cursor: pointer; position: relative; overflow: hidden;
    font-family: var(--vmc-font-display); font-size: 15px; font-weight: 600;
    color: var(--vmc-color-base-white);
    text-shadow: 0 1px 3px rgb(0% 0% 0% / 0.30);
    text-decoration: none;
    background-image:
      linear-gradient(var(--vsec-angle), var(--vsec-stop-a) 0%, var(--vsec-stop-b) 100%),
      linear-gradient(135deg,
        var(--vmc-color-vault-300) 0%,
        var(--vmc-color-base-white) 35%,
        var(--vmc-color-vault-400) 65%,
        var(--vmc-color-vault-300) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.22),
      0 2px 8px rgb(51.76% 37.65% 89.8% / 0.25);
    transition:
      --vsec-angle 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      --vsec-stop-a 0.35s ease, --vsec-stop-b 0.35s ease,
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.25s ease;
    transform: translateZ(0);
  }
  .login-btn-secondary::before {
    content: ''; position: absolute; inset: 0;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(180deg, rgb(100% 100% 100% / 0.16) 0%, transparent 55%);
    pointer-events: none; z-index: 1;
  }
  .login-btn-secondary::after {
    content: ''; position: absolute; inset: -4px;
    border-radius: var(--vmc-radius-full);
    background: linear-gradient(135deg, var(--vmc-color-vault-400), var(--vmc-color-vault-600));
    filter: blur(14px); opacity: 0; z-index: -1;
    transition: opacity 0.3s ease;
  }
  .login-btn-secondary:hover {
    --vsec-angle: 220deg;
    --vsec-stop-a: var(--vmc-color-vault-400);
    --vsec-stop-b: var(--vmc-color-vault-600);
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      inset 0 1px 0 rgb(100% 100% 100% / 0.20),
      0 8px 24px rgb(51.76% 37.65% 89.8% / 0.40);
  }
  .login-btn-secondary:hover::after { opacity: 0.45; filter: blur(18px); }
  .login-btn-secondary:active {
    transform: scale(0.97) translateY(1px);
    box-shadow: inset 0 2px 5px rgb(0% 0% 0% / 0.28);
  }
  .login-btn-secondary:focus-visible {
    outline: 3px solid transparent; outline-offset: 4px;
    box-shadow:
      0 0 0 2px var(--vmc-color-base-white),
      0 0 0 5px var(--vmc-color-vault-500);
  }

  /* ── Input ── */
  .login-input {
    height: 48px; width: 100%; box-sizing: border-box;
    padding: 0 16px;
    border-radius: 8px;
    border: 1.5px solid oklch(0.22 0.18 285 / 0.12);
    background: oklch(0.97 0.002 220);
    font-family: var(--vmc-font-body, 'Roboto', sans-serif);
    font-size: 15px; font-weight: 400;
    color: oklch(0.15 0.008 200);
    outline: none;
    transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  }
  .login-input::placeholder { color: oklch(0.55 0.02 220); }
  .login-input:focus {
    border-color: oklch(0.45 0.22 285 / 0.50);
    background: oklch(1 0 0);
    box-shadow: 0 0 0 3px oklch(0.45 0.22 285 / 0.10);
  }

  /* ── Card border — dual-layer vault shimmer ── */
  .login-card {
    display: flex;
    width: 766px; height: 589px;
    border-radius: 16px; overflow: hidden;
    border: 1.5px solid transparent;
    background-image:
      linear-gradient(oklch(1 0 0), oklch(1 0 0)),
      linear-gradient(135deg,
        oklch(0.72 0.16 55 / 0.60) 0%,
        oklch(0.45 0.22 285 / 0.40) 40%,
        oklch(0.72 0.16 55 / 0.30) 100%
      );
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    box-shadow:
      0 32px 64px oklch(0.22 0.18 285 / 0.18),
      0 8px 24px oklch(0 0 0 / 0.08);
  }
`;

const F = "var(--vmc-font-display, 'Plus Jakarta Sans', sans-serif)";

function EyeIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function BrandPanel(): JSX.Element {
  return (
    <div style={{
      flex: "0 0 42%",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(155deg, oklch(0.22 0.18 285) 0%, oklch(0.28 0.20 285) 60%, oklch(0.22 0.15 285) 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
      padding: "36px 32px",
    }}>
      {/* Radial glows */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.42 0.20 285 / 0.55) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "-40px",
        width: "220px", height: "220px", borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.72 0.16 55 / 0.20) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Diagonal shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(135deg, oklch(1 0 0 / 0.04) 0%, transparent 50%, oklch(1 0 0 / 0.02) 100%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "10px",
            background: "linear-gradient(135deg, oklch(0.72 0.16 55) 0%, oklch(0.60 0.18 45) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 14px oklch(0.72 0.16 55 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.25)",
          }}>
            <span style={{ color: "oklch(1 0 0)", fontSize: 20, fontWeight: 800, fontFamily: F, lineHeight: 1 }}>V</span>
          </div>
          <div>
            <div style={{
              fontFamily: F, fontSize: 13, fontWeight: 800,
              color: "oklch(1 0 0)", letterSpacing: "0.07em", textTransform: "uppercase",
            }}>VMCSubastas</div>
            <div style={{
              fontFamily: F, fontSize: 9, fontWeight: 500,
              color: "oklch(1 0 0 / 0.45)", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>Powered by Subastop</div>
          </div>
        </div>

        <p style={{
          fontFamily: F, fontSize: 26, fontWeight: 800,
          color: "oklch(1 0 0)", lineHeight: 1.2, margin: "0 0 12px",
          letterSpacing: "-0.4px",
        }}>
          La subasta de<br />
          <span style={{ color: "oklch(0.72 0.16 55)" }}>alto valor</span><br />
          del Perú.
        </p>
        <p style={{
          fontFamily: F, fontSize: 12, fontWeight: 400,
          color: "oklch(1 0 0 / 0.55)", lineHeight: 1.65, margin: 0,
        }}>
          Vehículos, maquinaria y equipos<br />en subastas transparentes.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid oklch(1 0 0 / 0.10)",
        paddingTop: "20px",
        display: "flex", gap: "20px",
      }}>
        {[
          { val: "500+", label: "Subastas" },
          { val: "12K+", label: "Postores" },
          { val: "US$1M+", label: "Adjudicado" },
        ].map(function renderStat(s) {
          return (
            <div key={s.label}>
              <div style={{
                fontFamily: F, fontSize: 17, fontWeight: 800,
                color: "oklch(0.72 0.16 55)",
              }}>{s.val}</div>
              <div style={{
                fontFamily: F, fontSize: 9, fontWeight: 600,
                color: "oklch(1 0 0 / 0.45)",
                textTransform: "uppercase", letterSpacing: "0.10em",
              }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InputLabel({ children }: { children: string }): JSX.Element {
  return (
    <label style={{
      display: "block", marginBottom: "7px",
      fontFamily: F, fontSize: "11px", fontWeight: 700,
      color: "oklch(0.38 0.04 280 / 0.55)",
      textTransform: "uppercase", letterSpacing: "0.09em",
    }}>
      {children}
    </label>
  );
}

export default function LoginForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword(): void {
    setShowPassword(!showPassword);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 24px",
      background: "var(--vmc-color-background-secondary, oklch(0.96 0.004 160))",
    }}>
      <style dangerouslySetInnerHTML={{ __html: LOGIN_CSS }} />

      <div style={{ position: "relative" }}>
        {/* Close button — top-right, fuera del overflow:hidden del card */}
        <Link href="/" aria-label="Cerrar" style={{
          position: "absolute", top: "-14px", right: "-14px",
          width: "32px", height: "32px", borderRadius: "50%",
          background: "oklch(1 0 0)",
          border: "1.5px solid oklch(0.22 0.18 285 / 0.15)",
          boxShadow: "0 2px 8px oklch(0.22 0.18 285 / 0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "oklch(0.38 0.04 280)",
          textDecoration: "none",
          zIndex: 10,
          transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </Link>

      <div className="login-card">
        <BrandPanel />

        {/* Right — form */}
        <div style={{
          flex: 1, background: "oklch(1 0 0)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "44px 40px",
        }}>
          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{
              fontFamily: F, fontSize: "34px", fontWeight: 800,
              color: "oklch(0.15 0.008 200)",
              margin: "0 0 4px", lineHeight: 1.1, letterSpacing: "-0.5px",
            }}>
              ¡Bienvenido!
            </h1>
            <p style={{
              fontFamily: F, fontSize: "14px", fontWeight: 600,
              color: "var(--vmc-color-vault-500, oklch(0.45 0.22 285))",
              margin: 0, letterSpacing: "0.01em",
            }}>
              Cazador de ofertas
            </p>
          </div>

          {/* Form */}
          <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <InputLabel>Correo electrónico</InputLabel>
              <input className="login-input" type="email" placeholder="tu@correo.com" />
            </div>

            {/* Password */}
            <div>
              <InputLabel>Contraseña</InputLabel>
              <div style={{ position: "relative" }}>
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "4px", color: "oklch(0.55 0.04 220)",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword && <EyeOffIcon />}
                  {!showPassword && <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginTop: "-4px" }}>
              <Link href="/forgot-password" style={{
                fontFamily: F, fontSize: "12px", fontWeight: 500,
                color: "oklch(0.45 0.22 285)", textDecoration: "none",
              }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Ingresa */}
            <button type="submit" className="login-btn-primary">
              Ingresa
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, height: "1px", background: "oklch(0.22 0.18 285 / 0.08)" }} />
              <span style={{
                fontFamily: F, fontSize: "11px", fontWeight: 600,
                color: "oklch(0.62 0.03 220)", letterSpacing: "0.05em",
              }}>ó</span>
              <div style={{ flex: 1, height: "1px", background: "oklch(0.22 0.18 285 / 0.08)" }} />
            </div>

            {/* Regístrate */}
            <Link href="/register" className="login-btn-secondary">
              Regístrate
            </Link>
          </form>
        </div>
      </div>
      </div>
    </main>
  );
}
