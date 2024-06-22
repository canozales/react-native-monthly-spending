/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        prm: "#6965A8",
        sec: "#F6F6FE",
      },
    },
  },
  plugins: [],
};
