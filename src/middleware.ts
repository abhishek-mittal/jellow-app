import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Cookie set by the Hono auth routes upon successful sign-in/sign-up. */
const SESSION_COOKIE = "jellow-session";

/** Path prefixes that require an active session. */
const PROTECTED_PREFIXES = ["/home", "/scan", "/profile", "/rewards", "/verdict", "/ai", "/resources"];

/** Path prefixes that are only accessible when NOT signed in. */
const AUTH_PREFIXES = ["/auth"];

/**
 * Route-guard middleware.
 *
 * - Signed-out users reaching a protected path are redirected to /auth/sign-in.
 * - Signed-in users reaching /auth/* are redirected to /home.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !session) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/auth/sign-in";
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && session) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/home";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (sw.js, manifest.json, etc.)
     * - API routes (handled by Hono)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:png|jpg|jpeg|svg|ico|json|webmanifest|js|css|woff2?)$).*)",
  ],
};
