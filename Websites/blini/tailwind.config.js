/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bistro-red': '#A8442F',
        'bistro-gold': '#D9A83E',
        'bistro-cream': '#F6EEE0',
        'bistro-green': '#3B5240',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'folk-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M20 3.33331L23.3333 10L30 13.3333L23.3333 16.6666L20 23.3333L16.6667 16.6666L10 13.3333L16.6667 10L20 3.33331Z\" fill=\"%23A8442F\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
