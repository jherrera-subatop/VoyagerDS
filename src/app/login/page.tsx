import type { ReactNode } from "react";
import Link from "next/link";

type LoginPageProps = Readonly<{
  searchParams?: Promise<{ redirect?: string }>;
}>;

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams !== undefined ? await searchParams : {};
  const redirect = params.redirect;

  let redirectHint: ReactNode = null;
  if (redirect !== undefined && redirect !== "") {
    redirectHint = (
      <p className="text-xs font-mono" style={{ color: "var(--vmc-color-text-tertiary)" }}>
        redirect={redirect}
      </p>
    );
  }

  return (
    <main
      className="min-h-screen p-8 flex flex-col gap-4 max-w-lg"
      style={{ background: "var(--vmc-color-background-primary)" }}
    >
      <h1
        className="text-2xl font-semibold"
        style={{
          color: "var(--vmc-color-text-primary)",
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        }}
      >
        Acceso — Voyager
      </h1>
      <p className="text-sm" style={{ color: "var(--vmc-color-text-secondary)" }}>
        Pantalla provisional: el flujo de autenticación legacy se integrará aquí. Las rutas protegidas redirigen a
        esta página cuando no hay sesión.
      </p>
      {redirectHint}
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-2 w-fit"
        style={{ color: "var(--vmc-color-text-brand)" }}
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
