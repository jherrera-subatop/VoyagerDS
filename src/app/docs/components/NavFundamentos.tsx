"use client";

const hashLinks = [
  { href: "#ib-orden", label: "Gate IB" },
  { href: "#colores", label: "Colores" },
  { href: "#tipografia", label: "Tipografía" },
  { href: "#spacing", label: "Spacing & Radius" },
  { href: "#gobernanza", label: "Gobernanza" },
];

export function NavFundamentos() {
  return (
    <nav
      className="border-b sticky top-24 z-30"
      style={{
        background: "var(--vmc-color-background-primary)",
        borderColor: "var(--vmc-color-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex gap-1 min-h-9 items-center flex-wrap py-1">
        {hashLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1 text-xs rounded transition-colors"
            style={{
              color: "var(--vmc-color-text-secondary)",
              fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "var(--vmc-color-text-primary)";
              el.style.background = "var(--vmc-color-background-interactive-hover)";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "var(--vmc-color-text-secondary)";
              el.style.background = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
