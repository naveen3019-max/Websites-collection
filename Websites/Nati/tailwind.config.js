/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'naati-terracotta': '#B5502E',
        'naati-green': '#3B5D3A',
        'naati-yellow': '#E0A83E',
        'naati-white': '#FAF3E4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rokkitt', 'serif'],
      },
    },
  },
  plugins: [],
}
