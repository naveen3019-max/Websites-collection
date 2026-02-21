/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          DEFAULT: '#FCFAF7',
          light: '#FFFFFF',
          dark: '#F3F0E9',
        },
        maroon: {
          DEFAULT: '#4A0E0E',
          light: '#631313',
          dark: '#310909',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#D4B982',
          dark: '#A6833D',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
          dark: '#000000',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
