import type { AuthUser, LoginResponse } from "@/types/auth";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";
const AUTH_SESSION_EVENT = "auth-session-changed";

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

export function saveAuthSession(token: string, user?: AuthUser | null) {
  localStorage.setItem(TOKEN_KEY, token);

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function getAuthUserRaw() {
  if (typeof window === "undefined") return null;
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
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUserRawSnapshot() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_KEY);
}

export function getServerAuthSnapshot() {
  return null;
}