/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
      },
      colors: {
        textorg: "#rgba(170, 91, 23, 1)",
        bggray: "#F9F9F9",
        popover:"rgba(33, 150, 243, 1)",
        popcontent:"rgba(170, 91, 23, 1)"
      },
      boxShadow: {
        "custom-dark": "4px 4px 6px rgba(249, 115, 22, 0.5)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
