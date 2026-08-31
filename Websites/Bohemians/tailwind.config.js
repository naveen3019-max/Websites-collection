/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#C97D3D',
        },
        rust: {
          DEFAULT: '#8C4A3B',
        },
        teal: {
          DEFAULT: '#3C6E71',
        },
        cream: {
          DEFAULT: '#F2E8D5',
        },
        swiggy: '#FC8019',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
