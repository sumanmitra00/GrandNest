/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070B14',
          900: '#0D1524',
          800: '#141F35',
          700: '#1D2C48',
          600: '#2A3D61',
        },
        gold: {
          50: '#FBF6E9',
          200: '#EBD69A',
          400: '#D9BB6A',
          500: '#D4AF37',
          600: '#B8912A',
          700: '#8F701E',
        },
        cream: '#F8F5EE',
        ink: '#0A0A0A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212,175,55,0.35)',
        card: '0 20px 60px -20px rgba(0,0,0,0.5)',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
    },
  },
  plugins: [],
}
