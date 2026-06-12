"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export type RegisterFormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormState: RegisterFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useRegisterForm() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] =
    useState<RegisterFormState>(initialFormState);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field: keyof RegisterFormState, value: string) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const validateRegisterForm = () => {
    const { fullName, email, password, confirmPassword } = formState;

    if (!fullName || !email || !password || !confirmPassword) {
      return "Mohon isi semua data formulir!";
    }

    if (password !== confirmPassword) {
      return "Password dan Konfirmasi Password tidak cocok!";
    }

    if (!agreeTerms) {
      return "Anda harus menyetujui Terms and Conditions dan Privacy Policy.";
    }

    return "";
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationMessage = validateRegisterForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      setSuccessMessage("");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await authService.register({
        full_name: formState.fullName,
        email: formState.email,
        password: formState.password,
        role: "user",
      });

      console.log("REGISTER RESPONSE:", response);

      setSuccessMessage(response.message ?? "Akun berhasil dibuat!");

      router.replace("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Registrasi gagal. Silakan coba lagi.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    agreeTerms,
    setAgreeTerms,
    profilePreview,
    fileInputRef,

    isLoading,
    errorMessage,
    successMessage,

    handleImageChange,
    handleRegister,
    updateField,
  };
}