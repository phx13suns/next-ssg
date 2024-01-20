import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/mdx-components.tsx',
  ],
  plugins: [daisyui, require('@tailwindcss/typography')],
}

export default config
