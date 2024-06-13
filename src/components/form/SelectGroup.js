import React from "react";

export default function SelectGroup({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
        <select className="h-full bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none border-none">
          <option value="S/O">S/O</option>
        </select>
        <input
          type="text"
          className={`flex-1 px-4 py-2 text-gray-700 focus:outline-none ${
            error ? "border-red-600" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}
