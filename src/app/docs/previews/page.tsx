import Link from "next/link";

export const metadata = {
  title: "Voyager DS — Previews",
  description: "Páginas de revisión de componentes organizadas por frame · 420px",
};

const fd = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

interface PreviewItem {
  href:       string;
  label:      string;
  iframeH:    number; // altura real de la página — para renderizado interno del iframe
  groupLabel?: string;
}

interface FrameGroup {
  frame: string;
  items: PreviewItem[];
}

/* ── Datos ──────────────────────────────────────────────────────────────── */

const FRAMES: FrameGroup[] = [
  {
    frame: "Homepage",
    items: [
      { href: "/preview/homepage", label: "Homepage", iframeH: 2800 },
    ],
  },
  {
    frame: "Navegación",
    items: [
      { href: "/preview/navigation-header", label: "Navigation", iframeH: 1600 },
    ],
  },
];

const COMPONENTS: FrameGroup[] = [
  {
    frame: "Botones",
    items: [
      { href: "/preview/components/button-primary", label: "Button Primary", iframeH: 600 },
    ],
  },
  {
    frame: "Galería",
    items: [
      { href: "/preview/components/thumbnail", label: "Thumbnail Empty", iframeH: 400 },
    ],
  },
];

/* ── Thumbnail config ───────────────────────────────────────────────────── */

const CARD_W       = 420;   // ancho real del preview
const SCALE        = 0.55;  // factor de escala del thumbnail
const THUMB_W      = Math.round(CARD_W * SCALE);   // 231px
const THUMB_CROP_H = 500;   // altura del recorte — muestra ~910px del preview real

/* ── PreviewCard ────────────────────────────────────────────────────────── */

function PreviewCard({ item }: { item: PreviewItem }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: THUMB_W + 2 }}>

      {/* Group label flotante sobre la card */}
      {item.groupLabel && (
        <p style={{ fontFamily: fd, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "var(--vmc-color-text-tertiary)", margin: "0 0 8px" }}>
          {item.groupLabel}
        </p>
      )}

    <div style={{ display: "flex", flexDirection: "column", borderRadius: 8,
      border: "1px solid var(--vmc-color-border-subtle)",
      background: "var(--vmc-color-background-card)",
      overflow: "hidden", flexShrink: 0 }}>

      {/* Thumbnail — crop fijo, muestra la parte superior del preview */}
      <div style={{ width: THUMB_W, height: THUMB_CROP_H, overflow: "hidden",
        background: "var(--vmc-color-background-secondary)", position: "relative",
        flexShrink: 0 }}>
        <iframe
          src={item.href}
          title={item.label}
          scrolling="no"
          style={{ width: CARD_W, height: item.iframeH, border: "none",
            transformOrigin: "top left", transform: `scale(${SCALE})`,
            pointerEvents: "none" }}
        />
      </div>

      {/* Footer de card */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 12px", borderTop: "1px solid var(--vmc-color-border-subtle)",
        flexShrink: 0 }}>
        <p style={{ fontFamily: fd, fontSize: 12, fontWeight: 600, margin: 0,
          color: "var(--vmc-color-text-primary)", overflow: "hidden",
          whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
          {item.label}
        </p>
        <Link href={item.href} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: fd, fontSize: 11, fontWeight: 600, padding: "3px 10px",
            borderRadius: 4, background: "var(--vmc-color-background-brand)",
            color: "#fff", textDecoration: "none", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginLeft: 8 }}>
          Abrir
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H7M12 2V7" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
    </div>
  );
}

/* ── Section header ─────────────────────────────────────────────────────── */

function SectionHeading({ title }: { title: string }) {
  return (
    <p style={{ fontFamily: fd, fontSize: 11, fontWeight: 700,
      letterSpacing: "0.10em", textTransform: "uppercase",
      color: "var(--vmc-color-text-primary)", margin: "0 0 20px",
      borderBottom: "1px solid var(--vmc-color-border-subtle)", paddingBottom: 8 }}>
      {title}
    </p>
  );
}

function GroupLabel({ label }: { label: string }) {
  return (
    <p style={{ fontFamily: fd, fontSize: 10, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: "var(--vmc-color-text-tertiary)", margin: "0 0 12px" }}>
      {label}
    </p>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function PreviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: fd, fontSize: 24, fontWeight: 700, margin: "0 0 4px",
          color: "var(--vmc-color-text-primary)" }}>
          Previews
        </h1>
        <p style={{ fontFamily: fd, fontSize: 13, color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
          Vista 420px · thumbnail recortado al fold · abre en nueva pestaña para ver completo
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

        {/* ── FRAMES ────────────────────────────────────────────── */}
        <section>
          <SectionHeading title="Frames" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {FRAMES.flatMap(function extractItems(group) {
              return group.items.map(function tagItem(item) {
                return { ...item, groupLabel: group.frame };
              });
            }).map(function renderItem(item) {
              return <PreviewCard key={item.href} item={item} />;
            })}
          </div>
        </section>

        {/* ── COMPONENTES ───────────────────────────────────────── */}
        <section>
          <SectionHeading title="Componentes" />
          {COMPONENTS.length === 0 && (
            <p style={{ fontFamily: fd, fontSize: 12,
              color: "var(--vmc-color-text-tertiary)", margin: 0 }}>
              Sin componentes aún — se irán agregando por sesión.
            </p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {COMPONENTS.flatMap(function extractItems(group) {
              return group.items.map(function tagItem(item) {
                return { ...item, groupLabel: group.frame };
              });
            }).map(function renderItem(item) {
              return <PreviewCard key={item.href} item={item} />;
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
