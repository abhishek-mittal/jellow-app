import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/auth",
  "/onboarding",
  "/landing",
  "/api/auth",
  "/api/v1/health",
];

/** Protect app routes — redirect unauthenticated users to sign-in. */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths, static assets, and API routes (except protected ones)
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js"
  ) {
    return NextResponse.next();
  }

  // Check for Better Auth session cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value;

  if (!sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
