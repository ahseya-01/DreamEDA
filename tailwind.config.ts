import type { Config } from 'tailwindcss';

// Colors come from CSS variables, which are set from the admin dashboard (Logo & Branding).
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: c('--brand'), accent: c('--accent'), paper: c('--paper'), ink: c('--ink') },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
