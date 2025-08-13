/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        success: "#22C55E"
      }
    },
  },
  plugins: [],
}
