import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xxs: '11px',
      xs: '12px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
    },
    extend: {
      fontFamily: {
        sans: ['Messina Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontWeight: {
        light: '450',
        regular: '550',
        medium: '650',
        bold: '750',
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
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.text-dark': {
          '@apply text-slate-600 dark:text-slate-12': {},
        },
        '.text-light': {
          '@apply text-slate-400 dark:text-slate-50': {},
        },
        '.text-lighter': {
          '@apply text-slate-300 dark:text-slate-200': {},
        },
        '.icon-light': {
          '@apply text-slate-300 dark:text-slate-200': {},
        },
        '.icon-lighter': {
          '@apply text-slate-200 dark:text-slate-200': {},
        },
        '.icon-lightest': {
          '@apply text-slate-100 dark:text-slate-200': {},
        },
        '.icon-white': {
          '@apply text-white': {},
        },
        '.border': {
          '@apply border-slate-50 dark:border-slate-700': {},
        },
        '.bg-subtle': {
          '@apply bg-slate-12 dark:bg-slate-800': {},
        },
        '.bg-deep': {
          '@apply bg-slate-25 dark:bg-slate-900': {},
        },
      });
    }),
  ],
} satisfies Config;
