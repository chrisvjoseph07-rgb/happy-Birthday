/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4e9',
          200: '#fecdd7',
          300: '#fda4b8',
          400: '#fb7194',
          500: '#f43f71',
          600: '#e11d57',
        },
        cream: {
          50: '#fffdf9',
          100: '#fdf9f0',
          200: '#faf2df',
        },
        peach: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
        },
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
        },
        rosegold: {
          300: '#e8b4b8',
          400: '#d99b9f',
          500: '#c58376',
          600: '#b76e79',
          700: '#9b5862',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        handwriting: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        note: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-medium': 'floatMedium 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(244, 114, 182, 0.6))' },
          '50%': { opacity: '1', transform: 'scale(1.05)', filter: 'drop-shadow(0 0 25px rgba(251, 113, 133, 0.9))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
