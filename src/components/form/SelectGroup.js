import React from "react";

export default function SelectGroup({
  label,
  placeholder,
  value = {},
  onChange,
  onBlur,
  error,
  options,
}) {
  const [selectValue, setSelectValue] = React.useState(
    value.relation || options[0]
  );
  const [inputValue, setInputValue] = React.useState(value.name || "");

  const handleSelectChange = (e) => {
    const newRelation = e.target.value;
    setSelectValue(newRelation);
    onChange({ relation: newRelation, name: inputValue });
  };

  const handleInputChange = (e) => {
    const newName = e.target.value;
    setInputValue(newName);
    onChange({ relation: selectValue, name: newName });
  };

  return (
    <div>
      <label className="block mb-3 font-medium">{label}</label>
      <div
        className={`flex items-center border ${
          error ? "border-red-600" : "border-gray-600"
        }  rounded-md overflow-hidden`}
      >
        <select
          className="h-full bg-gray-100 px-4 py-2  focus:outline-none border-none"
          value={selectValue}
          onChange={handleSelectChange}
          onBlur={onBlur}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={`flex-1 px-4 py-2  border-none focus:outline-none ${
            error ? "border-red-600" : ""
          }`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlur}
        />
      </div>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
}
