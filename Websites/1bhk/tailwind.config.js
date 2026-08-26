/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0F172A',
        amber: '#F59E0B',
        cream: '#F8FAFC',
        'bottle-green': '#10B981',
      },
      fontFamily: {
        display: ['Rokkitt', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
