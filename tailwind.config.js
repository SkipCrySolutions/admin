/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "one-color": "#E5E3D4",
        "one-color-light": "#F0EEE4",
        "one-color-dark": "#CBC9C0",
        "two-color": "#9ABF80",
        "two-color-light": "#AFCCA0",
        "two-color-dark": "#85A76E",
        "three-color": "#6A669D",
        "three-color-light": "#837FAF",
        "three-color-dark": "#5D5A8A",
        "four-color": "#1C325B",
        "four-color-light": "#334A71",
        "four-color-dark": "#192D52",
      },
    },
  },
  plugins: [],
}
