import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAdminPage = nextUrl.pathname.startsWith("/admin") && !nextUrl.pathname.startsWith("/api");
  const isPublicAdminPage =
    nextUrl.pathname === "/admin/login" ||
    nextUrl.pathname === "/admin/forgot-password";

  if (isAdminPage && !isPublicAdminPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  if (isPublicAdminPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
