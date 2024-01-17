import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors : {
      "primary" : "#4c1d95",
      "secondary" : "#4338ca",
      "primary-neon": "#7dd3fc",
      "secondary-neon": "#FF004D",
    }
  },
  plugins: [],
}
export default config
