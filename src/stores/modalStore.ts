import { createStore } from "zustand/vanilla";

/**
 * Modal store — manages ephemeral UI state: open modals, active overlays.
 *
 * Uses zustand/vanilla createStore (NOT the global create() from zustand).
 *
 * CRITICAL: The global create() from zustand exports a singleton store.
 * In Next.js 15 App Router, this singleton is shared between SSR and client
 * renders, causing hydration mismatches when initial state differs
 * (e.g., a modal that was open on the server vs. closed on the client).
 *
 * Pattern: createStore (vanilla) + Context Provider with useState factory.
 * Each component tree that needs modals gets its own store instance.
 */

export type ModalId = string;

export interface ModalState {
  openModals: Set<ModalId>;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
  isModalOpen: (id: ModalId) => boolean;
}

export function createModalStore() {
  return createStore<ModalState>((set, get) => ({
    openModals: new Set(),

    openModal(id) {
      set((state) => ({
        openModals: new Set([...state.openModals, id]),
      }));
    },

    closeModal(id) {
      set((state) => {
        const next = new Set(state.openModals);
        next.delete(id);
        return { openModals: next };
      });
    },

    closeAllModals() {
      set({ openModals: new Set() });
    },

    isModalOpen(id) {
      return get().openModals.has(id);
    },
  }));
}

export type ModalStore = ReturnType<typeof createModalStore>;
