/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#1F2A44',
          900: '#243256',
          800: '#2C3D6A',
        },
        gold: {
          400: '#E8B84B',
          500: '#D9A441',
          600: '#C4923A',
        },
        terracotta: {
          500: '#C1502E',
          600: '#A8442A',
        },
        cream: {
          50:  '#FDFAF5',
          100: '#F6EFE3',
          200: '#EDE0CC',
        },
        swiggy: '#FC8019',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1F2A44 0%, #2C3D6A 40%, #1a2336 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D9A441 0%, #E8B84B 100%)',
        'terracotta-gradient': 'linear-gradient(135deg, #C1502E 0%, #D4613E 100%)',
      },
      animation: {
        'spin-slow':    'spin 20s linear infinite',
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'float':        'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(217, 164, 65, 0.3)',
        'gold-lg': '0 8px 40px rgba(217, 164, 65, 0.4)',
        'dark': '0 4px 24px rgba(0,0,0,0.4)',
        'dark-lg': '0 12px 48px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
