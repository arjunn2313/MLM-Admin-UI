import React from "react";

export default function Date({ label, type, value, onChange, onBlur, error }) {
  
  // const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="mb-4 w-full">
      <label className="block mb-3 font-medium">{label}</label>
      <input
        type={type}
        className={`w-full border ${error ? "border-red-600" : "border-gray-600"} outline-none p-2 rounded-md`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}
