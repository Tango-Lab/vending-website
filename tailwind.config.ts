import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          100: '#E6EFFD',  // Very light shade
          200: '#C1D4FB',  // Light shade
          300: '#9AB8F8',  // Light-medium shade
          400: '#739DF6',  // Medium shade
          500: '#4D82F3',  // Base color (slightly lighter than the original)
          600: '#2F6AEB',  // Darker shade (closest to the original `#2463EB`)
          700: '#1E54C3',  // Darker medium shade
          800: '#153D9B',  // Darker shade
          900: '#0D2674',  // Very dark shade
        },
        secondary: 'var(--color-secondary)',
        danger: {
          DEFAULT: 'var(--cl-error)',
          100: '#fbd7db',
          200: '#f7b0b6',
          300: '#f28890',
          400: '#ec616b',
          500: '#d84654',  // Base Color
          600: '#b43a46',
          700: '#902e38',
          800: '#6c232a',
          900: '#48181c'
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
