/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spetta-yellow': '#E8B44A',
        'spetta-red': '#C4432E',
        'spetta-green': '#4F7942',
        'spetta-cream': '#FAF6ED',
      },
      fontFamily: {
        display: ['"Lilita One"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
