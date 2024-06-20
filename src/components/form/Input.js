import React from "react";

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled
}) {
  return (
    <div className="mb-4  w-full  ">
      <label className="block mb-3 font-medium">{label}</label>
      <input
      disabled={disabled}
        type="text"
        className={`w-full border ${
          error ? "border-red-600" : "border-gray-600"
        } outline-none p-2 rounded-md`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}
