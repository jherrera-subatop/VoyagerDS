"use client";

import type { JSX } from "react";
import { Button } from "@/components/ui/Button";

export interface LoginButtonProps {
  href?: string;
  user?: {
    nickname: string;
    avatarUrl?: string;
  };
}

function UserIcon({ color = "white" }: { color?: string }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      style={{ width: 20, height: 20, color }}
    >
      <path
        d="M16.3 6.2C16.3 3.9 14.4 2 12 2 9.6 2 7.8 3.9 7.8 6.2 7.8 8.6 9.6 10.5 12 10.5 14.4 10.5 16.3 8.6 16.3 6.2ZM3.5 17.5C5.3 20.2 8.5 22 12 22 15.5 22 18.7 20.2 20.5 17.5 20.5 14.7 14.8 13.1 12 13.1 9.2 13.1 3.5 14.7 3.5 17.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LoginButton({
  href = "/login?redirect_after_to=/zona",
  user,
}: Readonly<LoginButtonProps>): JSX.Element {
  if (user) {
    return (
      <a
        href="/zona"
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            "var(--vmc-space-100)",
          textDecoration: "none",
          background:     "color-mix(in oklch, var(--vmc-color-orange-600) 18%, transparent)",
          border:         "1px solid color-mix(in oklch, var(--vmc-color-orange-600) 45%, transparent)",
          borderRadius:   "var(--vmc-radius-full)",
          paddingTop:     "var(--vmc-space-050)",
          paddingBottom:  "var(--vmc-space-050)",
          paddingLeft:    "var(--vmc-space-050)",
          paddingRight:   "var(--vmc-space-200)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            width:          28,
            height:         28,
            borderRadius:   "var(--vmc-radius-full)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            background:     "linear-gradient(135deg, var(--vmc-color-orange-600) 0%, var(--vmc-color-orange-700) 100%)",
            boxShadow:      "color-mix(in oklch, var(--vmc-color-orange-600) 45%, transparent) 0 2px 6px",
            flexShrink:     0,
            fontFamily:     "var(--vmc-text-overline-font-family)",
            fontSize:       "var(--vmc-text-overline-font-size)",
            fontWeight:     "var(--vmc-text-overline-font-weight)",
            color:          "var(--vmc-color-base-white)",
            letterSpacing:  "var(--vmc-text-overline-letter-spacing)",
            userSelect:     "none",
          }}
        >
          {user.nickname.slice(0, 2).toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: "var(--vmc-text-label-md-font-family)",
            fontSize:   "var(--vmc-text-label-md-font-size)",
            color:      "var(--vmc-color-base-white)",
          }}
        >
          <span style={{ fontWeight: "var(--vmc-font-weight-light)", opacity: 0.8 }}>Bienvenido, </span>
          <span style={{ fontWeight: "var(--vmc-font-weight-bold)", textTransform: "uppercase" }}>
            {user.nickname}
          </span>
        </span>
      </a>
    );
  }

  return (
    <Button variant="cta" size="sm" href={href}>
      <span
        style={{
          width:          28,
          height:         28,
          borderRadius:   "var(--vmc-radius-full)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          background:     "rgba(255,255,255,0.25)",
          flexShrink:     0,
        }}
      >
        <UserIcon />
      </span>
      <span
        style={{
          fontFamily: "var(--vmc-text-label-md-font-family)",
          fontSize:   "var(--vmc-text-label-md-font-size)",
          fontWeight: "var(--vmc-text-label-md-font-weight)",
        }}
      >
        Ingresa
      </span>
    </Button>
  );
}
