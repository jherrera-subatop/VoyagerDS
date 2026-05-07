import type { JSX } from "react";

const font = "'Plus Jakarta Sans', sans-serif";

/* Dimensiones reales: grid 2col gap-20 dentro de panel 239px → cada card ~110×88px
   3fr/2fr de 88px → tab 53px, label 35px */
const CARD_W  = 110;
const TAB_H   = 53;
const LABEL_H = 35;

const negotiableColor = "#00CACE";
const liveColor       = "#ED8936";
const white           = "#FFFFFF";
const textOnDark      = "#FFFFFF";
const shadow          = "0 2px 8px rgba(0,0,0,0.08)";

interface OfferCardProps {
  label:     string;
  tabColor:  string;
  textColor: string;
}

function OfferCard({ label, tabColor, textColor }: OfferCardProps): JSX.Element {
  return (
    <div style={{
      display:      "flex",
      flexDirection:"column",
      width:        CARD_W,
      borderRadius: 8,
      boxShadow:    shadow,
      overflow:     "hidden",
      flexShrink:   0,
    }}>

      {/* Tab coloreado */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          CARD_W,
        height:         TAB_H,
        background:     tabColor,
      }}>
        <span style={{
          fontFamily:    font,
          fontSize:      13,
          fontWeight:    700,
          lineHeight:    "16px",
          color:         textOnDark,
          textTransform: "uppercase",
          whiteSpace:    "nowrap",
        }}>
          {label}
        </span>
      </div>

      {/* Label VER TODAS */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          CARD_W,
        height:         LABEL_H,
        background:     white,
      }}>
        <span style={{
          fontFamily:    font,
          fontSize:      11,
          fontWeight:    700,
          lineHeight:    "14px",
          color:         textColor,
          textTransform: "uppercase",
          whiteSpace:    "nowrap",
        }}>
          VER TODAS
        </span>
      </div>

    </div>
  );
}

export default function OfferTypeStatesPage(): JSX.Element {
  return (
    <div style={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      minHeight:      "100vh",
      background:     "#F2F4F3",
    }}>
      <div style={{ display: "flex", gap: 20 }}>
        <OfferCard
          label="Negociable"
          tabColor={negotiableColor}
          textColor={negotiableColor}
        />
        <OfferCard
          label="En Vivo"
          tabColor={liveColor}
          textColor={liveColor}
        />
      </div>
    </div>
  );
}
