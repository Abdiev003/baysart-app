/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 0px 0px 1px",
        bottom: "3px 3px 18px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
