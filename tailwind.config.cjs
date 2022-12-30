/** @type {import('tailwindcss').Config} */
const colors = require('material-ui-colors')
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors, // Use MUI Colors
      transparent: "transparent"
    },
    extend: {
      colors: {
        primary: {
          100: "#f5a385",
          200: "#f39371",
          300: "#f1845d",
          400: "#f07448",
          500: "#ee6534",
          600: "#ec5119",
          700: "#d64612",
          800: "#bb3d10",
          900: "#a1340d"
        }
      }
    },
  },
  plugins: [],
}
