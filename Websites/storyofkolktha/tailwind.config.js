/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'heritage-yellow': '#D9A521',
        'heritage-maroon': '#5C1A1B',
        'heritage-parchment': '#F4EBD9',
        'heritage-navy': '#1E2A38',
        'swiggy-orange': '#FC8019',
        'whatsapp-green': '#25D366'
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
