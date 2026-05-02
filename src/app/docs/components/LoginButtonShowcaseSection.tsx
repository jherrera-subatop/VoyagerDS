"use client";
import { useState } from "react";
import type { JSX } from "react";
import { LoginButton } from "@/components/ui/LoginButton";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID  = "login-button-pending";

const FIGMA_SPEC = `@figma-spec
@component    LoginButton | autoXauto | Page:Stitch

@tokens
  orange : --vmc-color-orange-600          : #ED8936
  vault  : --vmc-color-background-brand    : #22005C
  white  : #FFFFFF
  txt    : --vmc-color-text-inverse        : #FFFFFF

@variants
  prop: user
  [x] guest         : pill naranja + círculo semitransparente + "INGRESA" uppercase
  [x] authenticated : círculo blanco + icono vault + "Bienvenido, NICK" (nick = 6 chars, bold uppercase)

@states
  [x] default
  [ ] hover  : (futuro) brightness-110
  [ ] focus  : (futuro) outline vault-mid`;

type Variant = "guest" | "auth";

const VARIANTS: { id: Variant; label: string }[] = [
  { id: "guest", label: "Guest"         },
  { id: "auth",  label: "Autenticado"   },
];

const ACCENT = "oklch(0.22 0.18 285)";

interface TabProps { label: string; active: boolean; onClick: () => void }

function Tab({ label, active, onClick }: TabProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:       "5px 14px",
        borderRadius:  6,
        border:        "none",
        cursor:        "pointer",
        fontFamily:    "monospace",
        fontSize:      11,
        fontWeight:    active ? 700 : 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background:    active ? ACCENT : "color-mix(in oklch, oklch(0.22 0.18 285) 8%, white)",
        color:         active ? "#FFFFFF" : ACCENT,
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function LoginButtonShowcaseSection(): JSX.Element {
  const [variant, setVariant] = useState<Variant>("guest");

  const variantSwitcher = (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{
        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--vmc-color-text-price-label)",
      }}>
        variante
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        {VARIANTS.map(function renderTab(v) {
          return (
            <Tab
              key={v.id}
              label={v.label}
              active={variant === v.id}
              onClick={function () { setVariant(v.id); }}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <ComponentShowcase
      id="login-button"
      title="LoginButton"
      description="Estado guest (CTA naranja pill) · estado autenticado (círculo blanco + Bienvenido, NICK)"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import { LoginButton } from "@/components/ui/LoginButton";'
      variantSwitcher={variantSwitcher}
      figmaSpec={FIGMA_SPEC}
    >
      <div
        style={{
          background:      "var(--vmc-color-background-brand)",
          padding:         "28px 32px",
          display:         "flex",
          justifyContent:  "center",
          alignItems:      "center",
          minHeight:        88,
        }}
      >
        {variant === "guest"
          ? <LoginButton />
          : <LoginButton user={{ nickname: "ZAEX5G" }} />
        }
      </div>
    </ComponentShowcase>
  );
}
