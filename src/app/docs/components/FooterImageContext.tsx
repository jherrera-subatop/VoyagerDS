"use client";

/**
 * FooterImageContext
 * Almacena data URLs de imágenes subidas en el panel de handoff.
 * Persiste en localStorage — sobrevive refresh.
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";

const STORAGE_KEY_LOGO          = "vds-footer-logo-src";
const STORAGE_KEY_RECLAMACIONES = "vds-footer-reclamaciones-src";

export interface FooterImageState {
  logoSrc:             string | undefined;
  reclamacionesSrc:    string | undefined;
  setLogoSrc:          (src: string) => void;
  setReclamacionesSrc: (src: string) => void;
  clearLogoSrc:        () => void;
  clearReclamacionesSrc: () => void;
}

const FooterImageContext = createContext<FooterImageState>({
  logoSrc:               undefined,
  reclamacionesSrc:      undefined,
  setLogoSrc:            () => undefined,
  setReclamacionesSrc:   () => undefined,
  clearLogoSrc:          () => undefined,
  clearReclamacionesSrc: () => undefined,
});

interface FooterImageProviderProps { children: ReactNode; }

export function FooterImageProvider({ children }: FooterImageProviderProps): JSX.Element {
  const [logoSrc,          setLogoState]          = useState<string | undefined>(undefined);
  const [reclamacionesSrc, setReclamacionesState] = useState<string | undefined>(undefined);

  // Rehydrate from localStorage on mount
  useEffect(function rehydrate() {
    const storedLogo = localStorage.getItem(STORAGE_KEY_LOGO);
    const storedRec  = localStorage.getItem(STORAGE_KEY_RECLAMACIONES);
    if (storedLogo) setLogoState(storedLogo);
    if (storedRec)  setReclamacionesState(storedRec);
  }, []);

  function setLogoSrc(src: string): void {
    localStorage.setItem(STORAGE_KEY_LOGO, src);
    setLogoState(src);
  }

  function setReclamacionesSrc(src: string): void {
    localStorage.setItem(STORAGE_KEY_RECLAMACIONES, src);
    setReclamacionesState(src);
  }

  function clearLogoSrc(): void {
    localStorage.removeItem(STORAGE_KEY_LOGO);
    setLogoState(undefined);
  }

  function clearReclamacionesSrc(): void {
    localStorage.removeItem(STORAGE_KEY_RECLAMACIONES);
    setReclamacionesState(undefined);
  }

  return (
    <FooterImageContext.Provider value={{
      logoSrc,
      reclamacionesSrc,
      setLogoSrc,
      setReclamacionesSrc,
      clearLogoSrc,
      clearReclamacionesSrc,
    }}>
      {children}
    </FooterImageContext.Provider>
  );
}

export function useFooterImages(): FooterImageState {
  return useContext(FooterImageContext);
}
