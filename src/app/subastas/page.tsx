import Link from "next/link";

export default function SubastasHomePage() {
  return (
    <main
      className="min-h-screen p-8 flex flex-col gap-4"
      style={{ background: "var(--vmc-color-background-primary)" }}
    >
      <h1
        className="text-2xl font-semibold"
        style={{
          color: "var(--vmc-color-text-primary)",
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        }}
      >
        Subastas
      </h1>
      <p className="text-sm max-w-xl" style={{ color: "var(--vmc-color-text-secondary)" }}>
        Área autenticada provisional. El middleware redirige aquí cuando hay cookie de sesión y visitas una ruta
        pública como el inicio.
      </p>
      <Link
        href="/docs"
        className="text-sm font-medium underline underline-offset-2 w-fit"
        style={{ color: "var(--vmc-color-text-brand)" }}
      >
        Ver documentación del design system
      </Link>
    </main>
  );
}
