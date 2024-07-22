export const validatePAN = (value) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return (
    panRegex.test(value) ||
    "Invalid PAN number format. It should be in the format: ABCDE1234F"
  );
};

export const validateAccountNumber = (value) => {
  // Example validation: 10 to 16 digits, allowing spaces or dashes
  const accountNumberRegex = /^[0-9]{10,16}$/;
  return (
    accountNumberRegex.test(value) ||
    "Invalid account number. It should be 10 to 16 digits."
  );
};

export const validateIFSC = (value) => {
  // IFSC code should be exactly 11 characters: 4 letters, 1 zero, and 6 alphanumeric characters
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return (
    ifscRegex.test(value) ||
    "Invalid IFSC code format. It should be 11 characters long."
  );
};

export const validateAadharNumber = (value) => {
  // Aadhar number should be exactly 12 digits long
  const aadharRegex = /^[0-9]{12}$/;
  return (
    aadharRegex.test(value) ||
    "Invalid Aadhar Number. It should be exactly 12 digits."
  );
};

export const validateZipCode = (value) => {
  // Example for US zip code: 5 digits or 5 digits-4 digits
  const zipCodeRegex = /^(\d{5}(-\d{4})?)$/;
  // For India PIN code: exactly 6 digits
  // const zipCodeRegex = /^\d{6}$/;
  return zipCodeRegex.test(value) || "Invalid zip code format.";
};


export const validatePhoneNumber = (value) => {
  // Remove non-numeric characters (e.g., +, spaces, etc.)
  const cleanedValue = value.replace(/\D/g, '');
  return cleanedValue.length <= 12 || "Phone number with country code should be at most 12 digits.";
};

export const validateDOB = (value) => {
  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 || "You must be at least 18 years old to register.";
};


export const validateFile = (file) => {
  if (file && file.length > 0) {
    const fileType = file[0].type;
    if (
      fileType === "image/svg+xml" ||
      fileType === "image/png" ||
      fileType === "image/jpeg" ||
      fileType === "image/gif"
    ) {
      const img = new Image();
      img.src = URL.createObjectURL(file[0]);
      return new Promise((resolve) => {
        img.onload = function () {
          URL.revokeObjectURL(this.src);
          if (this.width <= 800 && this.height <= 400) {
            resolve(true);
          } else {
            resolve("Image dimensions should be within 800x400px.");
          }
        };
      });
    } else {
      return "Invalid file type.";
    }
  }
  return "File is required.";
};
