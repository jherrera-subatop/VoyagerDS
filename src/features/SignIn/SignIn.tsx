/**
 * SignIn — UI Upgrade
 * ─────────────────────────────────────────────────────────────────
 * Estructura 100% preservada del outerHTML legacy VMC Subastas.
 * Solo tokenización VOYAGER v2.1.0 — sin cambios estructurales.
 * 790×581px · estado disabled (botón inactivo)
 *
 * Token map:
 *   bg-coral-100      → --voyager-surface-page
 *   text-purple-500   → --voyager-color-vault-mid  (headings / links)
 *   text-purple-900   → --voyager-text-primary
 *   bg-gray-100       → --voyager-input-bg
 *   border-purple-100 → --voyager-border-ghost
 *   text-purple-200   → --voyager-text-tertiary    (eye icon)
 *   text-purple-300   → --voyager-text-tertiary    (divider "ó")
 *   border-purple-300 → --voyager-border-ghost
 *   bg-purple-500     → --voyager-color-vault       (CTA primary)
 *   border-purple-500 → --voyager-color-vault       (ghost btn)
 *   text-white        → --voyager-text-on-dark
 *   shadow-md         → shadow.md (raised)
 *   disabled state    → opacity 0.72 + grayscale(1)
 * ─────────────────────────────────────────────────────────────────
 */

import type { CSSProperties, JSX } from "react";

/* ── Token aliases ───────────────────────────────────────────── */
const T = {
  vault:        "var(--voyager-color-vault,      #22005C)",
  vaultMid:     "var(--voyager-color-vault-mid,  #3B1782)",
  surfacePage:  "var(--voyager-surface-page,     #F8FAF9)",
  textPrimary:  "var(--voyager-text-primary,     #191C1C)",
  textTertiary: "var(--voyager-text-tertiary,    #99A1AF)",
  textOnDark:   "var(--voyager-text-on-dark,     #FFFFFF)",
  inputBg:      "var(--voyager-input-bg,         #E1E3E2)",
  borderGhost:  "var(--voyager-border-ghost,     rgba(34,0,92,0.10))",
  shadowMd:     "0 8px 16px rgba(0,0,0,0.10)",
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";
const fontBody    = "var(--font-body,    'Roboto', sans-serif)";

/* ── Shared input style ──────────────────────────────────────── */
const inputBase: CSSProperties = {
  fontFamily:  fontBody,
  fontSize:    14,        /* body-sm */
  lineHeight:  "20px",
  fontWeight:  400,
  color:       T.textPrimary,
  background:  T.inputBg,
  border:      `1px solid ${T.borderGhost}`,
  borderRadius: 4,        /* radius.sm */
  width:        "100%",
  paddingTop:   12,       /* space.150 */
  paddingBottom:12,
  paddingLeft:  24,       /* space.300 (snapped from px-5 / 20px) */
  paddingRight: 24,
  boxSizing:    "border-box",
};

/* ── Label style ─────────────────────────────────────────────── */
const labelStyle: CSSProperties = {
  display:     "block",
  fontFamily:  fontDisplay,
  fontSize:    12,        /* label-sm */
  lineHeight:  "16px",
  fontWeight:  500,
  color:       T.textPrimary,
};

export default function SignIn(): JSX.Element {
  return (
    <div
      className="p-3 h-full flex"
      style={{ background: T.surfacePage }}
    >
      <div id="sign-in" className="w-full max-w-xs m-auto py-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-center">
          <div>
            <img
              src="https://www.vmcsubastas.com/4app/assets/images/frontend/subastin/subastin_head_smile_right.svg"
              width={60}
              height={54}
              alt=""
            />
          </div>
          <div className="ml-4">
            <h1
              className="leading-tight"
              style={{
                fontFamily: fontDisplay,
                fontSize:   20,       /* heading-md */
                lineHeight: "28px",
                fontWeight: 300,      /* preserved: font-light from outerHTML */
                color:      T.vaultMid,
                margin:     0,
              }}
            >
              ¡Bienvenido <br />
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontSize:   16,       /* label-lg */
                  lineHeight: "24px",
                  fontWeight: 500,
                }}
              >
                Cazador de ofertas!
              </span>
            </h1>
          </div>
        </div>

        {/* ── Form area ──────────────────────────────────────── */}
        <div
          className="px-6"
          style={{ marginTop: 64 }}   /* space.800 — snapped from mt-16 */
        >
          <span>
            <form noValidate className="space-y-6">
              <input id="redirect-to" type="hidden" name="redirect_to" value="/zona" />

              {/* Email */}
              <div>
                <label htmlFor="email" style={labelStyle}>
                  Correo Electrónico
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="input"
                    style={inputBase}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" style={labelStyle}>
                  Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="input"
                    style={{ ...inputBase, paddingRight: 32 }}   /* space.400 — pr-8 */
                  />
                  <span
                    className="h-6 w-6 absolute top-0 right-0 transform -mt-px translate-y-1/2 cursor-pointer"
                    style={{
                      marginRight: 8,   /* space.100 — mr-2 */
                      color: T.textTertiary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="fill-current w-6 h-6"
                    >
                      <path
                        d="M12.1 5.1C7.5 5.1 3.7 8 2.1 12 3.7 16 7.5 18.9 12.1 18.9 16.6 18.9 20.4 16 22 12 20.4 8 16.6 5.1 12.1 5.1ZM12.1 16.6C9.6 16.6 7.5 14.5 7.5 12 7.5 9.5 9.6 7.4 12.1 7.4 14.6 7.4 16.6 9.5 16.6 12 16.6 14.5 14.6 16.6 12.1 16.6ZM12.1 9.2C10.6 9.2 9.3 10.5 9.3 12 9.3 13.5 10.6 14.8 12.1 14.8 13.6 14.8 14.8 13.5 14.8 12 14.8 10.5 13.6 9.2 12.1 9.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-center">
                <a
                  href="https://www.vmcsubastas.com/login/recordar"
                  className="focus:outline-none"
                  style={{
                    fontFamily: fontDisplay,
                    fontSize:   12,       /* label-sm */
                    lineHeight: "16px",
                    fontWeight: 700,
                    color:      T.vaultMid,
                    textDecoration: "none",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit */}
              <div>
                <div style={{ boxShadow: T.shadowMd, borderRadius: 4 }}>
                  <button
                    type="submit"
                    className="button relative rounded w-full flex items-center justify-center focus:outline-none"
                    disabled
                    style={{
                      fontFamily:    fontDisplay,
                      fontSize:      12,       /* label-sm */
                      lineHeight:    "24px",
                      fontWeight:    700,
                      textTransform: "uppercase",
                      color:         T.textOnDark,
                      background:    T.vault,
                      paddingLeft:   24,       /* space.300 */
                      paddingRight:  24,
                      paddingTop:    12,       /* space.150 */
                      paddingBottom: 12,
                      borderRadius:  4,        /* radius.sm */
                      border:        "none",
                      cursor:        "not-allowed",
                      opacity:       0.72,     /* Voyager disabled state */
                      filter:        "grayscale(1)",
                    }}
                  >
                                Ingresa
                                </button>
                </div>
              </div>
            </form>
          </span>

          {/* Divider */}
          <div className="relative" style={{ marginTop: 24 }}>   {/* space.300 — snapped from mt-5/20px */}
            <div className="flex items-center justify-center">
              <div
                className="absolute z-0 w-full border-t"
                style={{ borderColor: T.borderGhost }}
              />
              <span
                className="leading-none text-center relative z-1"
                style={{
                  fontFamily:   fontDisplay,
                  fontSize:     14,         /* label-md */
                  lineHeight:   "20px",
                  fontWeight:   700,
                  color:        T.textTertiary,
                  background:   T.surfacePage,
                  paddingTop:   4,          /* space.050 — py-1 */
                  paddingBottom:4,
                  paddingLeft:  24,         /* space.300 — px-6 */
                  paddingRight: 24,
                }}
              >
                ó
              </span>
            </div>
          </div>

          {/* Register */}
          <div style={{ marginTop: 24 }}>   {/* space.300 — mt-6 */}
            <a
              href="https://www.vmcsubastas.com/registro"
              className="rounded w-full flex items-center justify-center focus:outline-none"
              style={{
                fontFamily:    fontDisplay,
                fontSize:      12,       /* label-sm */
                lineHeight:    "24px",
                fontWeight:    700,
                textTransform: "uppercase",
                color:         T.vault,
                border:        `1px solid ${T.vault}`,
                background:    T.surfacePage,
                paddingLeft:   24,       /* space.300 */
                paddingRight:  24,
                paddingTop:    12,       /* space.150 */
                paddingBottom: 12,
                borderRadius:  4,        /* radius.sm */
                textDecoration:"none",
              }}
            >
                    Regístrate
                </a>
          </div>
        </div>
      </div>
    </div>
  );
}
