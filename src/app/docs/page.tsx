import Link from "next/link";

export const metadata = {
  title: "Voyager DS — Índice",
  description: "Taxonomía, fundamentos y componentes del Design System Voyager (orden IB)",
};

const AREAS = [
  {
    href: "/docs/taxonomia",
    title: "Taxonomía",
    body: "Antes que fundamentos: TAXONOMY.md, wireframes por marco, inventario por dominio y audits (p. ej. Detalle).",
  },
  {
    href: "/docs/fundamentos",
    title: "Fundamentos",
    body: "Tokens, Terrazzo, tipografía, spacing, gobernanza y gate de salida ib-fundamentos.",
  },
  {
    href: "/docs/componentes",
    title: "Componentes",
    body: "Átomos y moléculas ib-componentes (p. ej. Button) construidos solo con tokens.",
  },
] as const;

export default function DocsIndexPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-24 pt-12 space-y-10">
      <div>
        <h1
          className="text-xl font-semibold"
          style={{
            color: "var(--vmc-color-text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          Documentación del Design System
        </h1>
        <p className="text-sm mt-2 max-w-2xl" style={{ color: "var(--vmc-color-text-secondary)" }}>
          Orden del IB: primero taxonomía (marcos + inventario), después fundamentos técnicos, luego componentes
          implementados.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {AREAS.map((area) => (
          <li key={area.href}>
            <Link
              href={area.href}
              className="block rounded-lg border p-5 h-full transition-colors hover:brightness-[1.02]"
              style={{
                background: "var(--vmc-color-background-secondary)",
                borderColor: "var(--vmc-color-border-default)",
              }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
                {area.title}
              </span>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
                {area.body}
              </p>
              <span className="text-xs font-medium mt-3 inline-block" style={{ color: "var(--vmc-color-text-brand)" }}>
                Abrir →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        Especificación creativa (Stitch):{" "}
        <Link href="/docs/design-spec" className="underline underline-offset-2" style={{ color: "var(--vmc-color-text-brand)" }}>
          DESIGN.md completo
        </Link>
      </p>
    </main>
  );
}
