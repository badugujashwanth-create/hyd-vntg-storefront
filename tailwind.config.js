/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--color-ivory)',
        sand: 'var(--color-sand)',
        ink: 'var(--color-ink)',
        stone: 'var(--color-stone)',
        mist: 'var(--color-mist)',
        moss: 'var(--color-moss)',
      },
      fontFamily: {
        display: ['Arial Black', 'Arial', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        velvet: '0 24px 70px rgba(0, 0, 0, 0.32)',
        float: '0 28px 90px rgba(0, 0, 0, 0.42)',
      },
      letterSpacing: {
        luxe: '0.22em',
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        floatIn: 'floatIn 1s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatIn: {
          '0%': { opacity: 0, transform: 'translateY(26px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
