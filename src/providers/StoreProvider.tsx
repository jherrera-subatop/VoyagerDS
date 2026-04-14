"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/stores/store";

/**
 * StoreProvider — wraps the React tree with a Redux store instance.
 *
 * useRef ensures:
 *   1. Store is created exactly ONCE per React tree (not on every render).
 *   2. The same instance persists across re-renders.
 *   3. Combined with makeStore() factory: each request tree gets an
 *      isolated store, preventing state leakage between server requests.
 */
export function StoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
