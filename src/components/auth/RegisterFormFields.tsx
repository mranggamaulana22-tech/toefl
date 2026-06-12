import type { RegisterFormState } from "@/hooks/useRegisterForm";

type RegisterFormFieldsProps = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  onFieldChange: (field: keyof RegisterFormState, value: string) => void;
};

export default function RegisterFormFields({
  fullName,
  email,
  password,
  confirmPassword,
  onFieldChange,
}: RegisterFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => onFieldChange("fullName", e.target.value)}
          placeholder="Ahmad Rifki Ayala"
          className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          placeholder="nama@email.com"
          className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => onFieldChange("password", e.target.value)}
          placeholder="••••••••"
          className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => onFieldChange("confirmPassword", e.target.value)}
          placeholder="••••••••"
          className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
        />
      </div>
    </div>
  );
}