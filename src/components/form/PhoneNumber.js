import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input";

export const PhoneNumber = ({
  defaultCountry = "IN",
  placeholder = "Enter phone number",
  value: initialValue,
  onChange,
  error,
  disabled,
  label
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Pass the new value directly
    }
  };

 
  const normalStyle = () => ({
    border: "1px solid gray",
    outline: "none"
  });

  const errorStyle = () => ({
    border: "1px solid red",
    outline: "none"
  });
  
  

  return (
    <div className="mb-4 w-full">
      <label className="block mb-3 font-medium">{label}</label>
      <Input
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        value={value}
        style={error ? errorStyle():normalStyle()}
        international
        withCountryCallingCode
        onChange={handleChange}
        className="px-5 rounded-md border-red-500"
        disabled={disabled}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

PhoneNumber.propTypes = {
  defaultCountry: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};
