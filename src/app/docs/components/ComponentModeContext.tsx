"use client";

/**
 * ComponentModeContext — estado global del modo de componentes.
 *
 * NORMAL = output directo del pipeline Stitch (versión generada por agentes)
 * DONE   = versión refinada en Figma por el usuario → traída via Figma MCP
 *          → reconstruida pixel-perfect con tokens del DS
 *
 * Persiste en localStorage → sobrevive refresh.
 * Key: "voyager-component-mode"
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";

export type ComponentMode = "normal" | "done";

const STORAGE_KEY = "voyager-component-mode";

function readStoredMode(): ComponentMode {
  if (typeof window === "undefined") return "normal";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "done") return "done";
  return "normal";
}

function persistMode(m: ComponentMode): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, m);
}

interface ComponentModeContextValue {
  mode: ComponentMode;
  setMode: (m: ComponentMode) => void;
}

const ComponentModeContext = createContext<ComponentModeContextValue>({
  mode: "normal",
  setMode: () => undefined,
});

interface ComponentModeProviderProps {
  children: ReactNode;
  initialMode?: ComponentMode;
}

export function ComponentModeProvider({ children, initialMode }: ComponentModeProviderProps): JSX.Element {
  const [mode, setModeState] = useState<ComponentMode>("normal");

  useEffect(function syncFromStorage() {
    if (initialMode) {
      persistMode(initialMode);
      setModeState(initialMode);
    } else {
      setModeState(readStoredMode());
    }
  }, [initialMode]);

  function setMode(m: ComponentMode): void {
    persistMode(m);
    setModeState(m);
  }

  return (
    <ComponentModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ComponentModeContext.Provider>
  );
}

export function useComponentMode(): ComponentModeContextValue {
  return useContext(ComponentModeContext);
}
