"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createModalStore, type ModalStore, type ModalState } from "@/stores/modalStore";

const ModalStoreContext = createContext<ModalStore | null>(null);

/**
 * ModalStoreProvider — provides the modal Zustand store to the component tree.
 *
 * useState(() => createModalStore()) is the factory pattern:
 *   - Creates the store ONCE per component mount (not on every render)
 *   - Each provider instance gets its own isolated store
 *   - Server renders with empty initial state, client hydrates identically
 *     → zero hydration mismatch
 *
 * Place this provider in layout.tsx below StoreProvider.
 */
export function ModalStoreProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [store] = useState(() => createModalStore());
  return (
    <ModalStoreContext.Provider value={store}>
      {children}
    </ModalStoreContext.Provider>
  );
}

/**
 * useModalStore — typed hook to consume modal state.
 * Throws if used outside ModalStoreProvider (fails loud, not silent).
 */
export function useModalStore<T>(selector: (state: ModalState) => T): T {
  const store = useContext(ModalStoreContext);

  if (store === null) {
    throw new Error(
      "useModalStore must be used inside <ModalStoreProvider>. " +
        "Add <ModalStoreProvider> to your layout.tsx."
    );
  }

  return useStore(store, selector);
}
