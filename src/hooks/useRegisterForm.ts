'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type RegisterFormState = {
  fullName: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormState: RegisterFormState = {
  fullName: '',
  studentId: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function useRegisterForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState<RegisterFormState>(initialFormState);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

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

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, studentId, email, password, confirmPassword } = formState;

    if (!fullName || !studentId || !email || !password || !confirmPassword) {
      alert('Mohon isi semua data formulir!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    if (!agreeTerms) {
      alert('Anda harus menyetujui Terms and Conditions dan Privacy Policy.');
      return;
    }

    console.log('Mengirim data registrasi ke API POST /api/v1/student:', {
      name: fullName,
      student_id: studentId,
      email,
      password,
    });

    alert('Akun berhasil dibuat! Silakan masuk.');
    router.push('/login');
  };

  return {
    formState,
    agreeTerms,
    setAgreeTerms,
    profilePreview,
    fileInputRef,
    handleImageChange,
    handleRegister,
    updateField,
  };
}
