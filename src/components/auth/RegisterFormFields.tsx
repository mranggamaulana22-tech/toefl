type RegisterFormFieldsProps = {
  fullName: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
  onFieldChange: (field: 'fullName' | 'studentId' | 'email' | 'password' | 'confirmPassword', value: string) => void;
};

const fields = [
  {
    key: 'fullName' as const,
    label: 'Full Name',
    placeholder: 'Jane Doe',
    type: 'text',
  },
  {
    key: 'studentId' as const,
    label: 'Student ID',
    placeholder: '12345678',
    type: 'text',
  },
  {
    key: 'email' as const,
    label: 'Email Address',
    placeholder: 'jane.doe@university.edu',
    type: 'email',
  },
  {
    key: 'password' as const,
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
  },
  {
    key: 'confirmPassword' as const,
    label: 'Confirm Password',
    placeholder: '••••••••',
    type: 'password',
  },
];

export default function RegisterFormFields({
  fullName,
  studentId,
  email,
  password,
  confirmPassword,
  onFieldChange,
}: RegisterFormFieldsProps) {
  const values = {
    fullName,
    studentId,
    email,
    password,
    confirmPassword,
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.key}>
          <label className="text-xs font-bold text-gray-700 block mb-1.5">{field.label}</label>
          <input
            type={field.type}
            value={values[field.key]}
            onChange={(e) => onFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2.5 border border-gray-200 rounded-md bg-gray-50/50 text-sm focus:outline-none focus:border-[#112240] transition-colors"
          />
        </div>
      ))}
    </>
  );
}
