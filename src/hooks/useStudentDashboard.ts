"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthSession,
  getAuthRoleSnapshot,
  getAuthTokenSnapshot,
  getAuthUserRawSnapshot,
  getServerAuthSnapshot,
  parseAuthUser,
  subscribeAuthSession,
} from "@/lib/auth-session";

export function useStudentDashboard() {
  const router = useRouter();

  const token = useSyncExternalStore(
    subscribeAuthSession,
    getAuthTokenSnapshot,
    getServerAuthSnapshot
  );

  const role = useSyncExternalStore(
    subscribeAuthSession,
    getAuthRoleSnapshot,
    getServerAuthSnapshot
  );

  const rawUser = useSyncExternalStore(
    subscribeAuthSession,
    getAuthUserRawSnapshot,
    getServerAuthSnapshot
  );

  const user = useMemo(() => {
    return parseAuthUser(rawUser);
  }, [rawUser]);

  const [isReady, setIsReady] = useState(false);
  const [hasTakenTest, setHasTakenTest] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (role === "admin") {
      router.replace("/admin/questions");
    }
  }, [token, role, router]);

  const handleStartExam = () => {
    if (!isReady) return;
    router.push("/student/exam");
  };

  const toggleDemoMode = () => {
    setHasTakenTest((previous) => !previous);
  };

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  return {
    token,
    role,
    user,
    isReady,
    setIsReady,
    hasTakenTest,
    toggleDemoMode,
    handleStartExam,
    handleLogout,
  };
}
