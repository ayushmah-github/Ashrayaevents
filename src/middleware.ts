import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin/auth";

/** Protect /admin pages and /api/admin routes. Login/logout are public. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic =
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout";
  if (isPublic) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidToken(token)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
