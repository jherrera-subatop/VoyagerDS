/**
 * Header — UI Upgrade
 * 1010×66px · sticky · scroll-aware logo animation · VOYAGER v2.1.0
 *
 * Token map:
 *   bg-purple-500        → --voyager-color-vault
 *   text-purple-500      → --voyager-color-vault  (SVG fill)
 *   bg-white shadow-lg   → --voyager-surface-card + shadowLg
 *   text-white font-bold → --voyager-text-on-dark  ("Ingresa")
 *
 * Alpine scroll behavior → useState + useEffect:
 *   atTop=true  → logo translateY(24px) scale(1.0)
 *   atTop=false → logo translateY(0)    scale(0.75)
 *
 * @figma-spec
 * @component    Header | 1010x66 | Page:Stitch
 *
 * @tokens
 *   bg   : --voyager-color-vault    : #22005C
 *   card : --voyager-surface-card   : #FFFFFF
 *   txt  : --voyager-text-on-dark   : #FFFFFF
 *   shad : 0 8px 16px rgba(0,0,0,0.10)
 *
 * @typography
 *   ingresa : Plus Jakarta Sans | Bold | 14px | lh:24px | "Ingresa"
 *
 * @layers
 *   root        : COMPONENT : 1010x66 : x:0,   y:0  : fill:bg
 *   logo        : Rect      : 117x64  : x:0,   y:1  : fill:#FFFFFF [placeholder — img logo VMC]
 *   user-circle : Ellipse   : 32x32   : x:888, y:17 : fill:card, shadow:shad
 *   user-icon   : Rect      : 24x24   : x:896, y:21 : fill:bg [placeholder — UserIcon SVG]
 *   ingresa     : Text      : auto    : x:932, y:21 : style:ingresa, fill:txt
 *
 * @variants
 *   [x] guest         (implementado — logo + círculo blanco + "Ingresa")
 *   [ ] authenticated (futuro — logo + avatar usuario + nombre)
 *
 * @states
 *   [x] default  (implementado)
 *   [ ] atTop    (futuro — logo translateY:24 scale:1.0, animación scroll)
 */

"use client";

import type { JSX } from "react";
import { LoginButton } from "@/components/ui/LoginButton";
import type { LoginButtonProps } from "@/components/ui/LoginButton";

export interface HeaderProps {
  user?: LoginButtonProps["user"];
}

/* ── Component ───────────────────────────────────────────────── */
export default function Header({ user }: Readonly<HeaderProps> = {}): JSX.Element {
  return (
    <div
      className="header"
      style={{
        position:       "sticky",
        top:            0,
        zIndex:         50,
        display:        "flex",
        flexDirection:  "row",
        alignItems:     "center",
        justifyContent: "flex-end",
        marginLeft:     "auto",
        marginRight:    "auto",
        flexShrink:     0,
        height:         66,
        paddingLeft:    "var(--vmc-space-300)",
        paddingRight:   "var(--vmc-space-300)",
        background:     "var(--vmc-color-background-brand)",
        width:          790,
      }}
    >
      <LoginButton user={user} />
    </div>
  );
}
