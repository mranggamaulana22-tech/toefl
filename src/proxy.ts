import { NextRequest, NextResponse } from "next/server";

type AuthRole = "admin" | "student";

const TOKEN_COOKIE = "access_token";
const ROLE_COOKIE = "auth_role";

const PUBLIC_PATHS = ["/", "/login", "/register"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname === path);
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  return atob(paddedBase64);
}

function getRoleFromToken(token?: string): AuthRole | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const parsedPayload = JSON.parse(decodeBase64Url(payload)) as {
      role?: string;
      role_id?: number;
    };

    if (parsedPayload.role_id === 2 || parsedPayload.role === "admin") {
      return "admin";
    }

    return "student";
  } catch {
    return null;
  }
}

function normalizeCookieRole(role?: string): AuthRole | null {
  if (role === "admin" || role === "student") {
    return role;
  }

  return null;
}

function getHomePathByRole(role: AuthRole | null) {
  if (role === "admin") return "/admin/questions";
  return "/student/dashboard";
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const role =
    normalizeCookieRole(request.cookies.get(ROLE_COOKIE)?.value) ??
    getRoleFromToken(token);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isStudentPage = pathname.startsWith("/student");
  const isAdminPage = pathname.startsWith("/admin");

  if (!token && (isStudentPage || isAdminPage)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPage) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = getHomePathByRole(role);
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  if (token && isPublicPath(pathname) && pathname === "/") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = getHomePathByRole(role);
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  if (token && isAdminPage && role !== "admin") {
    const studentUrl = request.nextUrl.clone();
    studentUrl.pathname = "/student/dashboard";
    studentUrl.search = "";
    return NextResponse.redirect(studentUrl);
  }

  if (token && isStudentPage && role === "admin") {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin/questions";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
