import React, { useRef } from "react";

export default function FileInput({ label, id, error, onChange, uploaded }) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-4 w-full p-2">
      <label className="block mb-3 font-medium">{label}</label>
      <div
        className={`w-full border border-dashed border-blue-500 p-2 rounded-md text-center underline text-blue-500 ${
          uploaded ? "border-green-600 text-green-600" : ""
        }`}
        onClick={handleUploadClick}
      >
        {uploaded ? "Uploaded" : "Upload image"}
      </div>
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        className="hidden"
        onChange={onChange}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}
