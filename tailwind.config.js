/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
        'titlefont':["Normal"],
        'notnormal':["notnormal"]
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
