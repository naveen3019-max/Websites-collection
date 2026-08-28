/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#1A1613',
        primary: '#D9A24B',
        secondary: '#5C1F2E',
        cream: '#F2E6D3',
        swiggy: '#FC8019',
        whatsapp: '#25D366'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
