import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji"',
          'Segoe UI Emoji"',
          'Segoe UI Symbol"',
          'Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        slate: {
          12: '#FAFAFA',
          25: '#F4F4F6',
          50: '#EFEFF2',
          75: '#E4E4EB',
          100: '#D0CFDC',
          200: '#AAA9BF',
          300: '#8887A1',
          400: '#6B6A83',
          500: '#505066',
          600: '#383748',
          700: '#20202A',
          800: '#15151C',
          900: '#0A0A0D',
        },
        plum: {
          100: '#E6E6FF',
          200: '#B0ADFE',
          300: '#817DFC',
          400: '#5E59F5',
          500: '#4640EB',
          600: '#2F2BBE',
          700: '#1D1980',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
