/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#699C78',
        'secondary': '#7DC383',
        'light': '#D6E6F2'
      }
    },
    screens: {
      'xxxl': '1560px',

      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
