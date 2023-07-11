/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,scss,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")({
    // strategy: 'base', // only generate global styles
    // strategy: 'class', // only generate classes
  }),],
}