import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'rgb(var(--border))',
        input: 'rgb(var(--border))',
        ring: 'rgb(var(--color-primary-500))',
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        surface: {
          DEFAULT: 'rgb(var(--surface))',
          muted: 'rgb(var(--surface-muted))',
        },
        gray: {
          50: 'rgb(var(--color-gray-50))',
          100: 'rgb(var(--color-gray-100))',
          200: 'rgb(var(--color-gray-200))',
          300: 'rgb(var(--color-gray-300))',
          400: 'rgb(var(--color-gray-400))',
          500: 'rgb(var(--color-gray-500))',
          600: 'rgb(var(--color-gray-600))',
          700: 'rgb(var(--color-gray-700))',
          800: 'rgb(var(--color-gray-800))',
          900: 'rgb(var(--color-gray-900))',
          950: 'rgb(var(--color-gray-950))',
        },
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          200: 'rgb(var(--color-primary-200))',
          300: 'rgb(var(--color-primary-300))',
          400: 'rgb(var(--color-primary-400))',
          500: 'rgb(var(--color-primary-500))',
          600: 'rgb(var(--color-primary-600))',
          700: 'rgb(var(--color-primary-700))',
          800: 'rgb(var(--color-primary-800))',
          900: 'rgb(var(--color-primary-900))',
          950: 'rgb(var(--color-primary-950))',
          DEFAULT: 'rgb(var(--color-primary-500))',
          foreground: 'rgb(var(--background))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-gray-200))',
          foreground: 'rgb(var(--foreground))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--danger))',
          foreground: 'rgb(var(--foreground))',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-gray-800))',
          foreground: 'rgb(var(--color-gray-400))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'rgb(var(--background))',
        },
        popover: {
          DEFAULT: 'rgb(var(--surface))',
          foreground: 'rgb(var(--foreground))',
        },
        card: {
          DEFAULT: 'rgb(var(--surface))',
          foreground: 'rgb(var(--foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fadein': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'infinitescroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shine': 'shine 3s ease-in-out infinite alternate',
        'fadein': 'fadein 2s ease',
        'infinitescroll': 'infinitescroll 45s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(.4, 0, .6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;