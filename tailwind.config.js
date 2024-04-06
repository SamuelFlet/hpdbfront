/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    fontFamily: {
      titlefont: ["Normal"],
      notnormal: ["notnormal"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('preline/plugin'),],
};
