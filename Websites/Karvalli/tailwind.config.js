/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#051f1c',
          900: '#0a2e2a',
          800: '#0E4B43',
          700: '#155e54',
          600: '#1a7066',
          500: '#22897c',
        },
        gold: {
          300: '#e8c07a',
          400: '#d9a84f',
          500: '#C9973B',
          600: '#b07e28',
          700: '#8f6520',
        },
        cream: {
          50:  '#fdfaf4',
          100: '#F5EFE0',
          200: '#EBD9B8',
          300: '#DEC49A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Work Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideLeft: {
          '0%':   { opacity: 0, transform: 'translateX(-28px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
