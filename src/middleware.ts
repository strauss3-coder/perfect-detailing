import { NextResponse, type NextRequest } from "next/server";

/**
 * Fast gate on the portal. A missing cookie is bounced here without touching
 * the app; the signature itself is verified in the portal layout, which runs
 * on Node and can use the same HMAC as the login route.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/portal/login") return NextResponse.next();

  if (!request.cookies.has("pd_portal")) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    url.search = pathname === "/portal" ? "" : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal", "/portal/((?!login).*)"],
};
