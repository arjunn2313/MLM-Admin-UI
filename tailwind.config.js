/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
      },
      colors: {
        
        bgorg:"#FFE4D0",
        bggray:"#F9F9F9",
      },
      boxShadow: {
        'custom-dark': '4px 4px 6px rgba(249, 115, 22, 0.5)',
      },
    },
  },
  plugins: [],
};