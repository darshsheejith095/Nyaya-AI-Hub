/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFCF5',
        taupe: {
          50: '#FBF8F1',
          100: '#F5EFE3',
          200: '#EDE3CE',
          300: '#E3C7A3',
          400: '#D4AE82',
          500: '#BF9866',
        },
        sky: {
          soft: '#AED9E0',
          deep: '#7BB8C4',
        },
        terracotta: {
          gold: '#E3C7A3',
          red: '#C8593F',
          amber: '#D89A4A',
          safe: '#7BA968',
        },
        ink: '#1A1A1A',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(60, 50, 30, 0.18)',
        card: '0 10px 40px -18px rgba(60, 50, 30, 0.22)',
        glow: '0 0 0 4px rgba(174, 217, 224, 0.35)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
