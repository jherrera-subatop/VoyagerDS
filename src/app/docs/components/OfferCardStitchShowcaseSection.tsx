"use client";
import type { JSX } from "react";
import { useState } from "react";
import OfferCard from "@/features/OfferCard/OfferCard";
import type { OfferCardVariant, OfferCardState } from "@/features/OfferCard/OfferCard";
import { ComponentShowcase } from "./ComponentShowcase";

const STITCH_PROJECT_ID = "344497491706707189";
const STITCH_SCREEN_ID = "offer-card-pending";

const OFFER_CARD_FIGMA_SPEC = `@figma-spec
@component    OfferCard | 176×232px | Page:Stitch
@description  Tarjeta de oferta de vehículo. Dos variantes con comportamientos distintos.
              Dimensiones fijas: ancho 176px, imagen 112px, contenido 112px, border-bottom 8px.

@anatomy
  image-area   : 176×112px · object-fit cover · borderRadius top 8px · clickable (href)
  content-area : 176×112px · padding 16px 12px · flex column
    name       : font-display 16px/700 · truncate · color según estado
    year       : font-display 11px/500 · uppercase · tracking 0.06em · truncate · color según estado
    price-row  : CoinIcon 24px + mono 14px/700 tabular-nums · SOLO en variant="en-vivo"
    heart-btn  : 32×32px · círculo · absolute bottom-right 12px · aria-label="me interesa"
  indicator    : 14×14px dot · absolute top-right 8px imagen · SOLO en live/proximo

@tokens
  --vmc-color-card-border-live         : border en-vivo (naranja)
  --vmc-color-card-border-negotiable   : border negociable (cyan)
  --vmc-color-card-border-closed       : border expirado + skeleton (gris)
  --vmc-color-background-card          : superficie de la card
  --vmc-color-background-disabled      : barras skeleton
  --vmc-color-vault-700                : texto/corazón estado normal
  --vmc-color-text-price-label         : texto/corazón estado expirado (muted)
  --vmc-color-cyan-800                 : color precio en-vivo
  --vmc-color-badge-live-bg            : dot indicador live/proximo (naranja)
  --vmc-shadow-sm                      : sombra heart button
  --vmc-shadow-md                      : sombra card
  --vmc-font-display                   : fuente nombre + año
  --vmc-font-mono                      : fuente precio

@variant en-vivo
  border-bottom : 8px --vmc-color-card-border-live (naranja)
  price-row     : visible siempre (incluso en expirado, en gris)
  estados       : publicada | live | proximo | expirado | skeleton

  @state publicada
    card normal · sin indicador · imagen color · texto --vmc-color-vault-700

  @state live
    igual a publicada + dot naranja pulsante (animate-ping) top-right de imagen

  @state proximo
    igual a publicada + dot naranja top-right con ícono reloj blanco 11px

  @state expirado
    imagen: grayscale(1) opacity(0.55)
    border-bottom: --vmc-color-card-border-closed (gris)
    texto + precio + corazón: --vmc-color-text-price-label (muted)

  @state skeleton
    border-bottom: --vmc-color-card-border-closed (gris)
    image-area: bloque sólido --vmc-color-background-disabled
    content: barra nombre 110×12px · barra año 48×8px · círculo coin 20px + barra precio 72×10px · círculo corazón 32px
    sin texto real · sin imagen real

@variant negociable
  border-bottom : 8px --vmc-color-card-border-negotiable (cyan)
  price-row     : NO existe (oculta)
  estados       : publicada | expirado | skeleton

  @state publicada
    card normal · sin indicador · imagen color · texto --vmc-color-vault-700

  @state expirado
    imagen: grayscale(1) opacity(0.55)
    border-bottom: --vmc-color-card-border-closed (gris)
    texto + corazón: --vmc-color-text-price-label (muted)

  @state skeleton
    idéntico al skeleton de en-vivo (mismo layout, mismo border gris)
    incluye barra de precio en el skeleton aunque la card real no tenga precio`;

const EN_VIVO_STATES: { id: OfferCardState; label: string }[] = [
  { id: "publicada", label: "Publicada" },
  { id: "live",      label: "Live"      },
  { id: "proximo",   label: "Próximo"   },
  { id: "expirado",  label: "Expirado"  },
  { id: "skeleton",  label: "Skeleton"  },
];

const NEGOCIABLE_STATES: { id: OfferCardState; label: string }[] = [
  { id: "publicada", label: "Publicada" },
  { id: "expirado",  label: "Expirado"  },
  { id: "skeleton",  label: "Skeleton"  },
];

const VARIANTS: { id: OfferCardVariant; label: string }[] = [
  { id: "en-vivo",    label: "EN VIVO"    },
  { id: "negociable", label: "NEGOCIABLE" },
];

interface TabProps {
  label:   string;
  active:  boolean;
  onClick: () => void;
  accent?: string;
}

function Tab({ label, active, onClick, accent = "var(--vmc-color-card-border-live)" }: TabProps): JSX.Element {
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
        background:    active
          ? accent
          : "color-mix(in oklch, var(--vmc-color-vault-900) 8%, white)",
        color:         active ? "white" : "var(--vmc-color-vault-900)",
        transition:    "background 140ms ease, color 140ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function OfferCardStitchShowcaseSection(): JSX.Element {
  const [variant, setVariant] = useState<OfferCardVariant>("en-vivo");
  const [state,   setState]   = useState<OfferCardState>("publicada");

  const isEnVivo = variant === "en-vivo";

  const variantSwitcher = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>

      {/* Variant row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{
          fontFamily:    "monospace",
          fontSize:      10,
          fontWeight:    700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         "var(--vmc-color-text-price-label)",
        }}>
          variante
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {VARIANTS.map(function renderVariant(v) {
            const accent = v.id === "negociable"
              ? "var(--vmc-color-card-border-negotiable)"
              : "var(--vmc-color-card-border-live)";
            return (
              <Tab
                key={v.id}
                label={v.label}
                active={variant === v.id}
                accent={accent}
                onClick={function () { setVariant(v.id); }}
              />
            );
          })}
        </div>
      </div>

      {/* State row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{
          fontFamily:    "monospace",
          fontSize:      10,
          fontWeight:    700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         "var(--vmc-color-text-price-label)",
        }}>
          {isEnVivo ? "estado · en-vivo" : "estado · negociable"}
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(isEnVivo ? EN_VIVO_STATES : NEGOCIABLE_STATES).map(function renderState(s) {
            const accent = isEnVivo
              ? "var(--vmc-color-card-border-live)"
              : "var(--vmc-color-card-border-negotiable)";
            return (
              <Tab
                key={s.id}
                label={s.label}
                active={state === s.id}
                accent={accent}
                onClick={function () { setState(s.id); }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <ComponentShowcase
      id="offer-card"
      title="offer-card"
      description="176×232px · EN VIVO (5 estados) · NEGOCIABLE"
      stitchProjectId={STITCH_PROJECT_ID}
      stitchScreenId={STITCH_SCREEN_ID}
      importPath='import OfferCard from "@/features/OfferCard/OfferCard";'
      variantSwitcher={variantSwitcher}
      figmaSpec={OFFER_CARD_FIGMA_SPEC}
    >
      <div style={{
        display:        "flex",
        justifyContent: "center",
        alignItems:     "flex-start",
        padding:        "32px 24px",
        background:     "var(--vmc-color-background-secondary)",
      }}>
        <OfferCard
          key={`${variant}-${state}`}
          variant={variant}
          state={state}
        />
      </div>
    </ComponentShowcase>
  );
}
