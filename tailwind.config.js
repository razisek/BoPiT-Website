/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#101820',
        'light': '#C8C8C8',
        'grey': '#423F3E',
        'lightgrey': '#D1D1D1',
        'green-light': '#74E75D',
        'purple-light': '#BA7CFA',
        'yellow-light': '#F8F280',
        'orange-light': '#E8976E',

      },
      width: {
        'middle': '45%',
      }
    },
  },
  plugins: [],
}