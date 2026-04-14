import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen p-8 flex flex-col gap-6"
      style={{ background: "var(--vmc-color-background-primary)" }}
    >
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{
            color: "var(--vmc-color-text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          VMC Subastas — Voyager DS
        </h1>
        <p className="text-sm mt-2" style={{ color: "var(--vmc-color-text-secondary)" }}>
          Infraestructura de tokens activa · 215 tokens · 12 componentes auditados
        </p>
      </div>

      <Link
        href="/docs"
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md w-fit"
        style={{
          background: "var(--vmc-color-vault-900)",
          color: "var(--vmc-color-neutral-100)",
        }}
      >
        Ver fundamentos del Design System →
      </Link>
    </main>
  );
}
