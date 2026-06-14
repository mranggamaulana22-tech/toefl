import type { AuthUser, LoginResponse } from "@/types/auth";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";
const ROLE_KEY = "auth_role";
const AUTH_SESSION_EVENT = "auth-session-changed";

export type AuthRole = "admin" | "student";

type JwtAuthPayload = Partial<AuthUser> & {
  exp?: number;
  iat?: number;
};

function isBrowser() {
  return typeof window !== "undefined";
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.split("=")[1] ?? "");
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=604800; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  return atob(paddedBase64);
}

export function parseJwtPayload(token: string | null): JwtAuthPayload | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    return JSON.parse(decodeBase64Url(payload)) as JwtAuthPayload;
  } catch {
    return null;
  }
}

export function normalizeAuthRole(user?: Partial<AuthUser> | null): AuthRole {
  const role = user?.role?.toLowerCase();

  if (user?.role_id === 2 || role === "admin") {
    return "admin";
  }

  return "student";
}

export function getTokenFromLoginResponse(response: LoginResponse) {
  return (
    response.token ??
    response.access_token ??
    response.data?.token ??
    response.data?.access_token ??
    null
  );
}

export function getUserFromLoginResponse(response: LoginResponse): AuthUser | null {
  return response.user ?? response.data?.user ?? null;
}

export function getUserFromToken(token: string | null): AuthUser | null {
  const payload = parseJwtPayload(token);

  if (!payload) return null;

  return {
    id: payload.id,
    id_users: payload.id_users,
    id_student: payload.id_student,
    full_name: payload.full_name,
    nama: payload.nama,
    email: payload.email,
    role: payload.role,
    role_id: payload.role_id,
  };
}

export function saveAuthSession(token: string, user?: AuthUser | null) {
  const resolvedUser = user ?? getUserFromToken(token);
  const role = normalizeAuthRole(resolvedUser);

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);

  setCookie(TOKEN_KEY, token);
  setCookie(ROLE_KEY, role);

  if (resolvedUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(resolvedUser));
  }

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));

  return {
    role,
    user: resolvedUser,
  };
}

export function getAuthToken() {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEY) ?? getCookie(TOKEN_KEY);
}

export function getAuthRole(): AuthRole | null {
  if (!isBrowser()) return null;

  const role = localStorage.getItem(ROLE_KEY) ?? getCookie(ROLE_KEY);

  if (role === "admin" || role === "student") {
    return role;
  }

  return null;
}

export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function getAuthUserRaw() {
  if (!isBrowser()) return null;
  return localStorage.getItem(USER_KEY);
}

export function parseAuthUser(rawUser: string | null): AuthUser | null {
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);

  deleteCookie(TOKEN_KEY);
  deleteCookie(USER_KEY);
  deleteCookie(ROLE_KEY);

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function subscribeAuthSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_SESSION_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_SESSION_EVENT, callback);
  };
}

export function getAuthTokenSnapshot() {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEY) ?? getCookie(TOKEN_KEY);
}

export function getAuthRoleSnapshot() {
  if (!isBrowser()) return null;
  return localStorage.getItem(ROLE_KEY) ?? getCookie(ROLE_KEY);
}

export function getAuthUserRawSnapshot() {
  if (!isBrowser()) return null;
  return localStorage.getItem(USER_KEY);
}

export function getServerAuthSnapshot() {
  return null;
}
