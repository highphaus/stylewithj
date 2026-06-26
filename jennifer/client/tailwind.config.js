// jennifer/client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        cream: '#FAFAFA',
        beige: '#F4F1ED',
        gold: '#C5A059',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)', // Flawless editorial deceleration curve
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrolldown: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        scrolldown: 'scrolldown 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}