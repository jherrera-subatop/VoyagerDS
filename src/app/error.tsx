"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="min-h-screen p-8 flex flex-col gap-4 items-start justify-center"
      style={{ background: "var(--vmc-color-background-primary)" }}
    >
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--vmc-color-text-primary)" }}
      >
        Error al cargar la vista
      </h1>
      <p className="text-sm max-w-md" style={{ color: "var(--vmc-color-text-secondary)" }}>
        Ocurrió un error inesperado. Puedes reintentar o volver al inicio.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="text-sm font-medium px-4 py-2 rounded-md"
          style={{
            background: "var(--vmc-color-background-brand)",
            color: "var(--vmc-color-text-inverse)",
          }}
          onClick={() => reset()}
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="text-sm font-medium px-4 py-2 rounded-md border"
          style={{
            borderColor: "var(--vmc-color-border-default)",
            color: "var(--vmc-color-text-brand)",
          }}
        >
          Inicio
        </Link>
      </div>
    </main>
  );
}
