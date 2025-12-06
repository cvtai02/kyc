import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  errorMessage?: string;
  options: SelectOption[];
}

const Select = ({ label, errorMessage, className = '', id, options, ...props }: SelectProps) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const widthStyle = 'w-full';

  return (
    <div className={widthStyle}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-left text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${widthStyle} px-4 py-2.5 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-focus focus:border-transparent ${
          errorMessage ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
