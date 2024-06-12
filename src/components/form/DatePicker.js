import React from "react";

export default function Date({ label, type }) {
  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <input
        type={type}
        className="w-full border border-gray-600    outline-none  p-2 rounded-md" 
      />
    </div>
  );
}
