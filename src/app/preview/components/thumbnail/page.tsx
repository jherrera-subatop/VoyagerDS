import type { JSX, CSSProperties } from "react";

const F = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

const THUMB: CSSProperties = {
  width: 87, height: 87, borderRadius: 4, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
};

function ImageIcon({ size = 24, color = "var(--vmc-color-icon-muted)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="8.5" cy="10" r="1.75" fill={color}/>
      <path d="M3 16.5l5-5 3.5 3.5 3-3 5.5 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.08em", color: "var(--vmc-color-text-tertiary)", margin: "0 0 8px" }}>
      {children}
    </p>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: F, fontSize: 10, color: "var(--vmc-color-text-disabled)",
      margin: "6px 0 0", fontStyle: "italic" }}>
      {children}
    </p>
  );
}

export default function ThumbnailPreviewPage(): JSX.Element {
  return (
    <main style={{
      background: "var(--vmc-color-background-secondary)",
      minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 0",
    }}>
      <div style={{
        width: 420, borderRadius: 4, overflow: "hidden",
        outline: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}>
        <div style={{ background: "#FFFFFF", padding: 24, display: "flex", flexDirection: "column", gap: 32 }}>

          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.10em",
            color: "var(--vmc-color-text-primary)", margin: 0,
            borderBottom: "1px solid var(--vmc-color-border-subtle)", paddingBottom: 12 }}>
            Thumbnail Empty — variantes
          </p>

          {/* A — Solo icono (Atlassian / Carbon) */}
          <div>
            <Label>A · solo ícono — Atlassian / Carbon</Label>
            <div style={{ ...THUMB, background: "var(--vmc-color-background-tertiary)" }}>
              <ImageIcon size={24} />
            </div>
            <Note>Ícono muted centrado. Mínimo, no distrae.</Note>
          </div>

          {/* B — Dashed border (Figma / Radix) */}
          <div>
            <Label>B · dashed border — Figma / Radix</Label>
            <div style={{
              ...THUMB,
              background: "var(--vmc-color-background-secondary)",
              border: "1.5px dashed var(--vmc-color-border-subtle)",
            }}>
              <ImageIcon size={24} />
            </div>
            <Note>Borde punteado = slot disponible. Señal de "arrastrar aquí".</Note>
          </div>

          {/* C — Icono + micro label (Shopify Polaris) */}
          <div>
            <Label>C · ícono + label — Shopify Polaris</Label>
            <div style={{
              ...THUMB, flexDirection: "column", gap: 4,
              background: "var(--vmc-color-background-tertiary)",
            }}>
              <ImageIcon size={20} />
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.06em",
                color: "var(--vmc-color-text-disabled)" }}>
                Sin imagen
              </span>
            </div>
            <Note>Label solo si el slot es editable / hay acción.</Note>
          </div>

          {/* D — Skeleton (Material / MUI) */}
          <div>
            <Label>D · skeleton pulse — Material / MUI</Label>
            <div style={{
              ...THUMB,
              background: "linear-gradient(90deg, var(--vmc-color-background-tertiary) 25%, var(--vmc-color-background-input) 50%, var(--vmc-color-background-tertiary) 75%)",
              backgroundSize: "200% 100%",
              animation: "vmc-skeleton 1.6s ease-in-out infinite",
            }}>
              <ImageIcon size={20} color="var(--vmc-color-border-subtle)" />
            </div>
            <Note>Skeleton animado = imagen cargando. No usar para ausencia real.</Note>
            <style>{`
              @keyframes vmc-skeleton {
                0%   { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>
          </div>

          {/* Contexto — fila de 3 con variante A */}
          <div>
            <Label>Variante A en contexto — galería vacía</Label>
            <div style={{ display: "flex", gap: 8 }}>
              {[0,1,2].map(function renderSlot(i) {
                return (
                  <div key={i} style={{ ...THUMB, background: "var(--vmc-color-background-tertiary)" }}>
                    <ImageIcon size={24} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
