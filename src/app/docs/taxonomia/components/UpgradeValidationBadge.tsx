"use client";

import { useState, useTransition } from "react";
import type { JSX } from "react";
import { setUpgradeValidation } from "../actions/validateUpgrade";
import { useWireMode } from "./WireModeContext";

interface UpgradeValidationBadgeProps {
  componentId: string;
  validatedAt: string | undefined;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-PE");
}

function resolveButtonLabel(isPending: boolean, isValidated: boolean): string {
  if (isPending) return "Guardando…";
  if (isValidated) return "Desvalidar";
  return "Validar upgrade →";
}

export function UpgradeValidationBadge({
  componentId,
  validatedAt,
}: UpgradeValidationBadgeProps): JSX.Element | null {
  const { mode } = useWireMode();
  const [isPending, startTransition] = useTransition();

  // Estado local — no depende de revalidatePath ni de reconciliación del servidor
  const [isValidated, setIsValidated] = useState(validatedAt !== undefined);

  // Solo visible en modo upgrade
  if (mode !== "upgrade") return null;

  function handleToggle(): void {
    const next = !isValidated;
    setIsValidated(next); // inmediato, sin glitch
    startTransition(async function persistToggle(): Promise<void> {
      await setUpgradeValidation(componentId, next);
    });
  }

  return (
    <div
      className="border-t pt-3 mt-1"
      style={{ borderColor: "var(--vmc-color-border-subtle)" }}
    >
      <div className="flex flex-col gap-2">

        {/* Status pill */}
        {isValidated && (
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "var(--vmc-color-green-100)", color: "var(--vmc-color-green-900)" }}
          >
            ✓ Upgrade validado — pipeline habilitado
          </span>
        )}
        {!isValidated && (
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "var(--vmc-color-amber-100)", color: "var(--vmc-color-amber-900)" }}
          >
            ⚠ Upgrade pendiente — pipeline bloqueado
          </span>
        )}

        {/* Fecha — solo si ya estaba validado al cargar */}
        {isValidated && validatedAt && (
          <p className="text-xs" style={{ color: "var(--vmc-color-text-tertiary)" }}>
            {formatDate(validatedAt)}
          </p>
        )}

        {/* Botón toggle */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className="text-xs px-2 py-1 rounded self-start"
          style={{
            background: isValidated ? "var(--vmc-color-background-tertiary)" : "var(--vmc-color-vault-600)",
            color: isValidated ? "var(--vmc-color-text-secondary)" : "white",
            border: isValidated ? "1px solid var(--vmc-color-border-subtle)" : "none",
            opacity: isPending ? 0.6 : 1,
            transition: "opacity 150ms ease",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {resolveButtonLabel(isPending, isValidated)}
        </button>

      </div>
    </div>
  );
}
