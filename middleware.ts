import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN_KEY = "flynt_token";
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const isProtectedPath = (pathname: string): boolean =>
  pathname === "/dashboard" || pathname.startsWith("/dashboard/");

const isAuthPath = (pathname: string): boolean =>
  pathname === "/login" || pathname === "/register" || pathname === "/verify-email";

const clearTokenCookie = (response: NextResponse): void => {
  response.headers.set(
    "Set-Cookie",
    `${AUTH_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`
  );
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  if (!token) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json().catch(() => ({}));
    const valid = res.ok && body?.success === true;

    if (!valid) {
      const redirect = NextResponse.redirect(new URL("/login", request.url));
      clearTokenCookie(redirect);
      return redirect;
    }

    if (isAuthPath(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    const redirect = NextResponse.redirect(new URL("/login", request.url));
    clearTokenCookie(redirect);
    return redirect;
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/verify-email",
  ],
};
