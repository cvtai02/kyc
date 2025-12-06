import type { InputHTMLAttributes, Ref } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({ label, errorMessage, className = '', id, ref, ...props }: InputProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const widthStyle = 'w-full';

  return (
    <div className={widthStyle}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-left text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`${widthStyle} px-4 py-2.5 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-focus focus:border-transparent ${errorMessage ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
        {...props}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
