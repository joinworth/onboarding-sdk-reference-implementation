import type { ReactElement } from 'react';
import type { PrefillFormData } from '@/types/prefill';

interface FormFieldProps {
  label: string;
  name: keyof PrefillFormData;
  type?: string;
  required?: boolean;
  value: string | number | boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

const FormField = ({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  options,
}: FormFieldProps): ReactElement => {
  if (type === 'checkbox') {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value as boolean}
          onChange={onChange}
          className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor={name} className="text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      </div>
    );
  }

  if (type === 'select' && options) {
    return (
      <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value as string | number}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default FormField;
