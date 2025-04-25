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
          '12': '#FAFAFA',
          '25': '#F4F4F6',
          '50': '#EFEFF2',
          '75': '#E4E4EB',
          '100': '#D0CFDC',
          '200': '#AAA9BF',
          '300': '#8887A1',
          '400': '#6B6A83',
          '500': '#505066',
          '600': '#383748',
          '700': '#20202A',
          '800': '#15151C',
          '900': '#0A0A0D',
        },
        plum: {
          '100': '#E6E6FF',
          '200': '#B0ADFE',
          '300': '#817DFC',
          '400': '#5E59F5',
          '500': '#4640EB',
          '600': '#2F2BBE',
          '700': '#1D1980',
        },
        green: {
          '100': 'hsl(155, 48%, 90%)',
          '200': 'hsl(155, 70%, 76%)',
          '300': 'hsl(155, 65%, 61%)',
          '400': 'hsl(155, 61%, 46%)',
          '500': 'hsl(155, 75%, 34%)',
          '600': 'hsl(155, 86%, 22%)',
          '700': 'hsl(155, 91%, 13%)',
        },
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))',
      },
      animation: {
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
      },
      keyframes: {
        rainbow: {
          '0%': {
            'background-position': '0%',
          },
          '100%': {
            'background-position': '200%',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.text-dark': {
          '@apply text-slate-600': {},
        },
        '.text-light': {
          '@apply text-slate-400': {},
        },
        '.text-lighter': {
          '@apply text-slate-300': {},
        },
        '.icon-light': {
          '@apply text-slate-300': {},
        },
        '.icon-lighter': {
          '@apply text-slate-200': {},
        },
        '.icon-lightest': {
          '@apply text-slate-100': {},
        },
        '.icon-white': {
          '@apply text-white': {},
        },
        '.border-base': {
          '@apply border-slate-50': {},
        },
        '.border-dark': {
          '@apply border-slate-75': {},
        },
        '.bg-subtle': {
          '@apply bg-slate-12': {},
        },
        '.bg-deep': {
          '@apply bg-slate-25': {},
        },
      });
    }),
  ],
} satisfies Config;
