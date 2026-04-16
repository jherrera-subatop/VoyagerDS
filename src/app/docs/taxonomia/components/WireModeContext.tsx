"use client";

/**
 * WireModeContext — estado global del modo wireframe para toda la sección de taxonomía.
 *
 * NORMAL  = as-is VMC hoy (fuente de verdad: screenshot real)
 * UPGRADE = propuesta con cambios (input del pipeline de agentes)
 *
 * Persiste en localStorage → sobrevive refresh y navegación entre páginas.
 * Key: "voyager-wire-mode"
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";

export type WireMode = "normal" | "upgrade" | "done";

const STORAGE_KEY = "voyager-wire-mode";

function readStoredMode(): WireMode {
  if (typeof window === "undefined") return "normal";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "upgrade") return "upgrade";
  if (stored === "done") return "done";
  return "normal";
}

function persistMode(m: WireMode): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, m);
}

interface WireModeContextValue {
  mode: WireMode;
  setMode: (m: WireMode) => void;
}

const WireModeContext = createContext<WireModeContextValue>({
  mode: "normal",
  setMode: () => undefined,
});

interface WireModeProviderProps {
  children: ReactNode;
}

export function WireModeProvider({ children }: WireModeProviderProps): JSX.Element {
  // Inicializar desde localStorage tras hidratación — evita mismatch SSR
  const [mode, setModeState] = useState<WireMode>("normal");

  useEffect(function syncFromStorage() {
    setModeState(readStoredMode());
  }, []);

  function setMode(m: WireMode): void {
    persistMode(m);
    setModeState(m);
  }

  return (
    <WireModeContext.Provider value={{ mode, setMode }}>
      {children}
    </WireModeContext.Provider>
  );
}

export function useWireMode(): WireModeContextValue {
  return useContext(WireModeContext);
}
