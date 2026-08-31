/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: '#B5772E',
        forest: '#3B5D3A',
        stone: '#F3ECDC',
        charcoal: '#2A2622',
      },
      fontFamily: {
        display: ['"Rye"', '"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
