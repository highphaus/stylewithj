// jennifer/client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        thalina: {
          bg: '#EBE8E3',
          text: '#222222',
        }
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        serif: ['Satoshi', 'sans-serif'],
        general: ['General Sans', 'sans-serif'],
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