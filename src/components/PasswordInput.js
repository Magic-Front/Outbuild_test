import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className="border border-gray-300 p-2 rounded w-full"
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 3.313 5.373 9 9 9s9-5.687 9-9-5.373-9-9-9-9 5.687-9 9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 01-6 0" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 3.313 5.373 9 9 9s9-5.687 9-9-5.373-9-9-9-9 5.687-9 9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 00-6 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;