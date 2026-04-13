'use client';
import React from "react";

type Props = {
  label?: string;
  name: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const TextField = ({
  label,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
  error,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`border p-2 rounded-lg outline-none transition
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-blue-500`}
      />

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default TextField;