"use client";

import Link from "next/link";
import RegisterFormFields from "@/components/auth/RegisterFormFields";
import RegisterHeader from "@/components/auth/RegisterHeader";
import ProfileUpload from "@/components/auth/ProfileUpload";
import TermsCheckbox from "@/components/auth/TermsCheckbox";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterPage() {
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 text-black">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-gray-100">
        <RegisterHeader
          title="TOEFL Analytics"
          description="Create your student account to access AI-powered learning."
        />

        <form onSubmit={handleRegister} className="p-8 space-y-5">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {successMessage}
            </div>
          )}

          <ProfileUpload
            fileInputRef={fileInputRef}
            profilePreview={profilePreview}
            onImageChange={handleImageChange}
            onClickUpload={() => fileInputRef.current?.click()}
          />

          <RegisterFormFields
            fullName={formState.fullName}
            email={formState.email}
            password={formState.password}
            confirmPassword={formState.confirmPassword}
            onFieldChange={updateField}
          />

          <TermsCheckbox checked={agreeTerms} onChange={setAgreeTerms} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#0a192f] hover:bg-[#112240] disabled:cursor-not-allowed disabled:opacity-60 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md"
          >
            {isLoading ? "Creating Account..." : "Create Account"}

            {!isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            )}
          </button>

          <p className="text-xs text-center text-gray-500 font-medium pt-3 border-t border-gray-100">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-gray-800 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}