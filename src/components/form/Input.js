import React from "react";

export default function Input({ label, placeholder }) {
  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <input
        type="text"
        className="w-full border border-gray-600   outline-none  p-2 rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
}
