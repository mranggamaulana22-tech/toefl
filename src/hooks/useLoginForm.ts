"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import {
  getTokenFromLoginResponse,
  getUserFromLoginResponse,
  saveAuthSession,
} from "@/lib/auth-session";

export function useLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Mohon isi Email dan Password!");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await authService.login({
        email,
        password,
      });

      const token = getTokenFromLoginResponse(response);
      const user = getUserFromLoginResponse(response);

      if (!token) {
        throw new Error("Login berhasil, tetapi token tidak ditemukan.");
      }

      saveAuthSession(token, user);

      if (user?.role_id === 2 || user?.role === "admin") {
        router.push("/admin/students");
        return;
      }

      router.push("/student/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login gagal. Silakan coba lagi.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errorMessage,
    handleLogin,
  };
}