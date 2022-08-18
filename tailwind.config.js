/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(251 146 60)",
      },
    },
  },
  plugins: [require("daisyui")],
};
