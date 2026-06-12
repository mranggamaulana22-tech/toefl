type TermsCheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <div className="flex items-start gap-2.5 pt-1">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
      />
      <label htmlFor="terms" className="text-xs text-gray-600 leading-normal">
        I agree to the <a href="#" className="font-bold text-gray-800 hover:underline">Terms and Conditions</a> and <a href="#" className="font-bold text-gray-800 hover:underline">Privacy Policy</a>.
      </label>
    </div>
  );
}
