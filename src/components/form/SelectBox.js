import React from "react";

export default function SelectBox({ label, options, value, onChange, onBlur, error }) {
  return (
    <div className="mb-4 w-full">
      <label className="block mb-3 font-medium">{label}</label>
      <select
        className={`w-full border ${error ? 'border-red-600' : 'border-gray-600'} outline-none p-2 rounded-md`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option>Select</option>
        {options?.map((itm) => (
          <option key={itm} value={itm} className="capitalize">{itm}</option>
        ))}
      </select>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}

