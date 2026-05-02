/**
 * @figma-spec
 * @component    Visitas | 317x429 | Page:Stitch
 *
 * @tokens
 *   vault       : --voyager-color-vault          : #22005C
 *   vaultMid    : --voyager-color-vault-mid       : #3B1782
 *   live        : --voyager-color-live            : #ED8936
 *   success     : --voyager-color-status-success  : #22C55E
 *   surfaceCard : --voyager-surface-card          : #FFFFFF
 *   textOnDark  : --voyager-text-on-dark          : #FFFFFF
 *   shadowSm    : 0 1px 3px rgba(34,0,92,0.10), 0 1px 2px rgba(34,0,92,0.06)
 *
 * @typography
 *   heading  : Plus Jakarta Sans | Bold   | 14px | lh:20px | "Visitas"
 *   avail    : Plus Jakarta Sans | Regular| 12px | lh:1    | "Disponible"
 *   body     : Plus Jakarta Sans | Light  | 14px | lh:24px | "Las visitas son previa cita..."
 *   cta-lbl  : Plus Jakarta Sans | Light  | 14px | lh:1    | "Para agendar tu visita:"
 *   btn-lbl  : Plus Jakarta Sans | Bold   | 14px | lh:24px | "Ingresa"
 *
 * @layers
 *   root        : COMPONENT : 317x429 : x:0,  y:0  : fill:surfaceCard, radius:4px, shadow:shadowSm
 *   header-row  : Frame     : 317x88  : x:0,  y:0  : fill:none, padding:32
 *   bracket-TL  : SVG       : 12x12   : x:32, y:32 : fill:live
 *   bracket-BR  : SVG       : 12x12   : x:32, y:32 : fill:live
 *   heading-txt : Text      : autoXauto:x:56,y:40 : style:heading, fill:vault
 *   dot-success : Ellipse   : 8x8     : x:56, y:64 : fill:success
 *   avail-txt   : Text      : autoXauto:x:72,y:62 : style:avail, fill:vault
 *   chevron     : SVG       : 24x24   : x:261,y:44 : fill:vaultMid@30%white
 *   body-area   : Frame     : 253xAuto: x:32, y:88 : fill:none, paddingBottom:32
 *   body-txt    : Text      : 253xAuto: x:0,  y:0  : style:body, fill:vaultMid@70%white
 *   skeleton-row: Frame     : 253x36  : x:0,  y:var: fill:none, flex:col, gap:8
 *   skel-1      : Rect      : 84x8    : x:0,  y:0  : fill:vault@6%white
 *   skel-2      : Rect      : 190x8   : x:0,  y:16 : fill:vault@6%white
 *   divider     : Rect      : 253x1   : x:0,  y:var: fill:vault@8%white
 *   cta-lbl-txt : Text      : 253xauto: x:0,  y:var: style:cta-lbl, fill:vaultMid@70%white, align:center
 *   btn         : Frame     : 221x48  : x:16, y:var: fill:vaultGrad, radius:4px
 *   btn-txt     : Text      : autoXauto:x:auto,y:12: style:btn-lbl, fill:textOnDark
 *
 * @subcomponents
 *   CornerTL  : inline
 *     @tokens   fill:live
 *     @layers   bracket:SVG:12x12:x:0,y:0:fill:currentColor
 *   CornerBR  : inline
 *     @tokens   fill:live
 *     @layers   bracket:SVG:12x12:x:0,y:0:fill:currentColor
 *   ChevronDown : inline
 *     @tokens   fill:vaultMid@30%white
 *     @layers   chevron:SVG:24x24:x:0,y:0:fill:currentColor
 *
 * @variants
 *   (ninguna — un único estado)
 *
 * @states
 *   [x] default  : acordeón abierto, dot verde "Disponible", skeleton de fechas, CTA "Ingresa"
 *   [ ] hover    : (futuro)
 *   [ ] focus    : (futuro)
 *   [ ] active   : (futuro) toggle acordeón
 *   [ ] disabled : n/a
 *   [ ] loading  : n/a
 *   [ ] error    : n/a
 */

/**
 * Visitas — UI Upgrade
 * 317×429px · accordion card · detalle de subasta · VOYAGER v2.1.0
 *
 * Token map:
 *   bg-white             → --voyager-surface-card
 *   rounded / shadow     → 4px / shadowSm
 *   text-coral-500       → --voyager-color-live   (corner bracket SVGs)
 *   text-purple-800      → --voyager-color-vault   (heading "Visitas")
 *   bg-quality-200       → --voyager-color-status-success (dot Disponible)
 *   text-purple-500      → vault-mid @ 70% white  (body / "Para agendar")
 *   text-purple-200      → vault-mid @ 30% white  (chevron)
 *   bg-purple-500        → vault gradient          (button)
 *   text-white           → --voyager-text-on-dark
 *   border-gray-200      → vault 8% mix
 *   placeholder-span     → vault 6% skeleton
 */

import type { JSX } from "react";

const V = {
  vault:       "var(--vmc-color-vault-900)",
  vaultMid:    "var(--vmc-color-vault-700)",
  live:        "var(--vmc-color-status-urgent)",
  success:     "var(--vmc-color-status-success)",
  surfaceCard: "var(--vmc-color-background-card)",
  textOnDark:  "var(--vmc-color-text-inverse)",
  /* derived */
  vaultBody:   "color-mix(in oklch, var(--vmc-color-vault-700) 70%, white)",
  vaultLight:  "color-mix(in oklch, var(--vmc-color-vault-700) 30%, white)",
  borderSubtle:"color-mix(in oklch, var(--vmc-color-vault-900) 8%, white)",
  skeleton:    "color-mix(in oklch, var(--vmc-color-vault-900) 6%, white)",
  vaultGrad:   "linear-gradient(135deg, var(--vmc-color-vault-900) 0%, var(--vmc-color-vault-700) 100%)",
  shadowSm:    "var(--vmc-shadow-sm)",
} as const;

const fontDisplay = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

/* ── Corner bracket SVG — top-left ─────────────────────────── */
function CornerTL(): JSX.Element {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12,
               fill: "currentColor", color: V.live, transition: "color 200ms" }}
    >
      <path d="M5.75 22C7.82107 22 9.5 20.3211 9.5 18.25L9.5 9.5H18.25C20.3211 9.5 22 7.82107 22 5.75C22 3.67893 20.3211 2 18.25 2L7 2C4.23858 2 2 4.23858 2 7L2 18.25C2 20.3211 3.67893 22 5.75 22Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Corner bracket SVG — bottom-right ─────────────────────── */
function CornerBR(): JSX.Element {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12,
               fill: "currentColor", color: V.live, transition: "color 200ms" }}
    >
      <path d="M18.25 2C16.1789 2 14.5 3.67893 14.5 5.75V14.5L5.75 14.5C3.67893 14.5 2 16.1789 2 18.25C2 20.3211 3.67893 22 5.75 22H17C19.7614 22 22 19.7614 22 17V5.75C22 3.67893 20.3211 2 18.25 2Z"
        fill="currentColor" />
    </svg>
  );
}

/* ── Chevron down SVG ───────────────────────────────────────── */
function ChevronDown(): JSX.Element {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ width: 24, height: 24, fill: "currentColor", color: V.vaultLight }}
    >
      <path d="M6.6 8L12 13.6 17.4 8 19 9.7 12 17 5 9.7 6.6 8Z" fill="currentColor" />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────── */
export default function Visitas(): JSX.Element {
  return (
    <div style={{
      position:     "relative",
      width:        "100%",
      maxWidth:     317,
      marginTop:    12,
      background:   V.surfaceCard,
      borderRadius: 4,
      boxShadow:    V.shadowSm,
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header row — p-8 = 32px */}
        <div style={{
          position:   "relative",
          display:    "flex",
          alignItems: "center",
          padding:    32,
        }}>

          {/* Corner decorator + heading */}
          <div style={{
            position: "relative",
            display:  "inline-block",
            padding:  "8px 24px",   /* py-2 px-6 */
          }}>
            <CornerTL />

            {/* h2 — text-sm font-bold text-purple-800 */}
            <h2 style={{
              fontFamily: fontDisplay,
              fontSize:   14,
              fontWeight: 700,
              lineHeight: "20px",
              color:      V.vault,
              margin:     0,
            }}>
              Visitas
              {/* Disponible row */}
              <span style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                {/* dot — w-2 h-2 rounded-full bg-quality-200 */}
                <span style={{
                  width:        8,
                  height:       8,
                  marginRight:  8,
                  borderRadius: 9999,
                  background:   V.success,
                  boxShadow:    "0 2px 4px rgba(34,197,94,0.40)",
                  flexShrink:   0,
                }} />
                <span style={{
                  fontFamily: fontDisplay,
                  fontSize:   12,
                  fontWeight: 400,
                  lineHeight: 1,
                  color:      V.vault,
                }}>
                  Disponible
                </span>
              </span>
            </h2>

            <CornerBR />
          </div>

          {/* Chevron — absolute right-0 mr-8 */}
          <span style={{
            position:  "absolute",
            right:     0,
            width:     24,
            height:    24,
            marginRight: 32,
            transition: "transform 200ms",
          }}>
            <ChevronDown />
          </span>
        </div>

        {/* Body — px-8 pb-8 */}
        <div style={{ paddingLeft: 32, paddingRight: 32, paddingBottom: 32 }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Body text — text-sm font-light leading-relaxed text-purple-500 */}
              <p style={{
                fontFamily:  fontDisplay,
                fontSize:    14,
                fontWeight:  300,
                lineHeight:  "24px",
                color:       V.vaultBody,
                margin:      0,
              }}>
                Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
              </p>

              {/* Placeholder skeleton list */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                <li style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* w-4/12 placeholder-span */}
                  <div style={{
                    width:        "33.33%",
                    height:       8,
                    background:   V.skeleton,
                    borderRadius: 4,
                  }} />
                  {/* w-9/12 placeholder-span */}
                  <div style={{
                    width:        "75%",
                    height:       8,
                    background:   V.skeleton,
                    borderRadius: 4,
                  }} />
                </li>
              </ul>

              {/* CTA section — py-6 border-t */}
              <div style={{
                paddingTop:    24,
                paddingBottom: 24,
                borderTop:     `1px solid ${V.borderSubtle}`,
              }}>
                {/* "Para agendar tu visita:" */}
                <p style={{
                  fontFamily:  fontDisplay,
                  fontSize:    14,
                  fontWeight:  300,
                  lineHeight:  1,
                  textAlign:   "center",
                  color:       V.vaultBody,
                  margin:      0,
                }}>
                  Para agendar tu visita:
                </p>

                {/* Button wrapper — px-4 mt-6 */}
                <div style={{ paddingLeft: 16, paddingRight: 16, marginTop: 24 }}>
                  <button
                    type="button"
                    style={{
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      width:           "100%",
                      paddingLeft:     24,
                      paddingRight:    24,
                      paddingTop:      12,
                      paddingBottom:   12,
                      fontFamily:      fontDisplay,
                      fontSize:        14,
                      fontWeight:      700,
                      lineHeight:      "24px",
                      color:           V.textOnDark,
                      background:      V.vaultGrad,
                      borderRadius:    4,
                      border:          "none",
                      cursor:          "pointer",
                      outline:         "none",
                    }}
                  >
                    Ingresa
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
