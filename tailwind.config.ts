import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  // For Tailwind v4, most configuration is done in CSS with @theme
  // This file can be minimal or even removed
}

export default config