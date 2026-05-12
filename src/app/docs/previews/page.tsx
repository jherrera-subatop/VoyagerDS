import Link from "next/link";

export const metadata = {
  title: "Voyager DS — Previews",
  description: "Páginas de preview y revisión de componentes en construcción",
};

const PREVIEWS = [
  { href: "/preview/detail-card-v2", label: "Detail Card v2", desc: "Auction card + VisitasCard · 317×422px / 317×429px" },
] as const;

const fd = "var(--font-display, 'Plus Jakarta Sans', sans-serif)";

const THUMB_W = 900;
const THUMB_H = 560;
const SCALE = 0.44;

export default function PreviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: fd, color: "var(--vmc-color-text-primary)" }}
        >
          Previews
        </h1>
        <p className="text-sm" style={{ color: "var(--vmc-color-text-tertiary)", fontFamily: fd }}>
          Páginas de revisión en construcción · abre en nueva pestaña para comparar con Stitch
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {PREVIEWS.map((p) => (
          <div
            key={p.href}
            className="rounded-lg border overflow-hidden"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-subtle)",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: "100%",
                height: Math.round(THUMB_H * SCALE),
                overflow: "hidden",
                position: "relative",
                background: "var(--vmc-color-background-tertiary)",
              }}
            >
              <iframe
                src={p.href}
                title={p.label}
                scrolling="no"
                style={{
                  width: THUMB_W,
                  height: THUMB_H,
                  border: "none",
                  transformOrigin: "top left",
                  transform: `scale(${SCALE})`,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Footer row */}
            <div
              className="flex items-center justify-between gap-4 px-4 py-3 border-t"
              style={{ borderColor: "var(--vmc-color-border-subtle)" }}
            >
              <div>
                <p
                  className="text-sm font-semibold leading-tight"
                  style={{ fontFamily: fd, color: "var(--vmc-color-text-primary)" }}
                >
                  {p.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ fontFamily: fd, color: "var(--vmc-color-text-tertiary)" }}
                >
                  {p.desc}
                </p>
              </div>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
                style={{
                  fontFamily: fd,
                  background: "var(--vmc-color-vault-700, #22005C)",
                  color: "#fff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Abrir
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H7M12 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
