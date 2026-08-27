/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: '#4A1E3A',
          light: '#6B2E57',
          dark: '#2E1024',
        },
        coral: {
          DEFAULT: '#E8613C',
          light: '#F07A59',
          dark: '#C44E2A',
        },
        cream: {
          DEFAULT: '#FBF3E7',
          dark: '#F0E2CC',
        },
        mint: {
          DEFAULT: '#7FA98E',
          light: '#A3C4B0',
          dark: '#5A8A6F',
        },
        swiggy: '#FC8019',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 97, 60, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 97, 60, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
