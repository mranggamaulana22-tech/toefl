import { apiClient } from "@/services/api-client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const authService = {
  login(payload: LoginRequest) {
    return apiClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  register(payload: RegisterRequest) {
    return apiClient<RegisterResponse>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },
};