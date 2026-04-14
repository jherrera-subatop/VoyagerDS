import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

/**
 * Mutex — prevents concurrent 401 responses from triggering multiple
 * simultaneous refresh token requests (thundering herd).
 * One refresh runs; others wait and retry with the new token.
 */
const refreshMutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  credentials: "include",
  prepareHeaders(headers) {
    // Auth tokens live in httpOnly cookies — set by the server.
    // Nothing to inject here for cookie-based auth.
    // Add other global headers (e.g. Accept-Language, X-Request-ID) if needed.
    headers.set("Accept", "application/json");
    return headers;
  },
});

/**
 * baseQueryWithReauth — RTK Query base query with Mutex-protected token refresh.
 *
 * Flow:
 *   1. Execute the original request.
 *   2. If 401: acquire mutex (serializes concurrent refreshes).
 *   3. First thread to acquire: POST /auth/refresh.
 *      - Success → retry original request.
 *      - Failure (refresh expired) → auto-logout.
 *   4. Waiting threads: mutex released → retry original (new cookie already set).
 *
 * Auth validation for route protection lives in middleware.ts (Edge Runtime),
 * NOT in this interceptor. This interceptor handles in-flight token expiry only.
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await refreshMutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  if (refreshMutex.isLocked()) {
    // Another thread is already refreshing — wait, then retry with new cookie
    await refreshMutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
    return result;
  }

  const release = await refreshMutex.acquire();

  try {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.error) {
      // Refresh token expired — force logout
      api.dispatch({ type: "auth/logout" });
      return result;
    }

    // Retry original request with new cookie
    result = await baseQuery(args, api, extraOptions);
  } finally {
    release();
  }

  return result;
};
