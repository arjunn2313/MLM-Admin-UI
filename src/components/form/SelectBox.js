import React from "react";

export default function SelectBox({ label, options }) {
  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <select className="w-full border border-gray-600   outline-none  p-2 rounded-md">
        <option>Select</option>
        {options?.map((itm) => (
          <option key={itm} className="capitalize">{itm}</option>
        ))}
      </select>
    </div>
  );
}
