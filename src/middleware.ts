import { type NextRequest, NextResponse } from "next/server";

/**
 * Auth middleware — runs in Edge Runtime, evaluates cookies BEFORE the router.
 *
 * This is the ONLY place where auth validation for route protection lives.
 * NEVER use Redux client-side for route auth — it causes a flash where the
 * authenticated user briefly sees the login page while the store rehydrates.
 *
 * Cookie name: adjust to match your actual auth cookie.
 */

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/registro",
  "/recuperar-contrasena",
  "/docs",
]);

const AUTH_COOKIE = "vmc_session";

/** Rutas de marketing/auth: si ya hay sesión, se redirige a la app (no aplica a /docs — ver DS sin perder sesión) */
function isMarketingPublicPathname(pathname: string): boolean {
  if (pathname === "/") {
    return true;
  }
  if (pathname === "/login" || pathname === "/registro" || pathname === "/recuperar-contrasena") {
    return true;
  }
  return false;
}

function isPublicPathname(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) {
    return true;
  }
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    return true;
  }
  if (pathname === "/preview" || pathname.startsWith("/preview/")) {
    return true;
  }
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Todo lo de Next (chunks, HMR, etc.) y APIs — sin lógica de auth aquí
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Otros estáticos por extensión (favicon, manifest, etc.)
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  const isPublicPath = isPublicPathname(pathname);
  const sessionCookie = request.cookies.get(AUTH_COOKIE);
  const isAuthenticated = sessionCookie !== undefined;

  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicPath && isMarketingPublicPathname(pathname)) {
    return NextResponse.redirect(new URL("/subastas", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Igual que la plantilla Next: no ejecutar middleware en api, estáticos de
     * Next ni favicon (evita interferir con chunks / RSC / imágenes).
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
