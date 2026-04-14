import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen p-8 flex flex-col gap-4 items-start justify-center"
      style={{ background: "var(--vmc-color-background-primary)" }}
    >
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--vmc-color-text-primary)" }}
      >
        Página no encontrada
      </h1>
      <p className="text-sm max-w-md" style={{ color: "var(--vmc-color-text-secondary)" }}>
        La ruta solicitada no existe o fue movida. Si acabas de iniciar sesión, puede que el destino aún no esté
        disponible.
      </p>
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-2"
        style={{ color: "var(--vmc-color-text-brand)" }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
