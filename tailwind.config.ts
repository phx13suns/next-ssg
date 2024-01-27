import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/mdx-components.tsx',
    './_posts/**/*.mdx',
  ],
  plugins: [typography, daisyui],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              wordBreak: 'break-all',
            },
            p: {
              wordBreak: 'break-all',
            },
            li: {
              wordBreak: 'break-all',
            },
          },
        },
        lg: {
          css: {
            img: {
              margin: 0,
            },
          },
        },
      },
    },
  },
  daisyui: {
    themes: ['cupcake'],
  },
}

export default config
