import { configureStore } from "@reduxjs/toolkit";
import { baseQueryWithReauth } from "@/lib/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Root API slice — all RTK Query endpoints extend this.
 * Feature slices inject their endpoints via api.injectEndpoints().
 *
 * Using a single API instance ensures:
 *   - Shared cache deduplication across features
 *   - Single middleware instance (no duplicate subscriptions)
 *   - Consistent invalidation tags across the app
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auction",
    "AuctionLot",
    "Bid",
    "Vehicle",
    "User",
    "Auth",
  ],
  endpoints: () => ({}),
});

/**
 * makeStore — factory function, NOT a global variable.
 *
 * CRITICAL: In Next.js 15 App Router, a global store variable is shared across
 * all concurrent server requests, leaking state between users (security bug).
 * makeStore() creates a fresh store instance per request tree.
 * StoreProvider uses useRef to ensure one instance per React tree.
 */
export function makeStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
