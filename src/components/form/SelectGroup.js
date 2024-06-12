import React from "react";

export default function SelectGroup({ label, placeholder }) {
  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
        <select className="h-full bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none border-none">
          <option value="USD">S/O</option>
      
        </select>
        <input
          type="text"
          className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
