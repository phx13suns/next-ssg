import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/mdx-components.tsx',
    './_posts/**/*.{md,mdx}',
  ],
  plugins: [typography, daisyui],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: { wordBreak: 'break-all' },
            p: { wordBreak: 'break-all' },
            li: { wordBreak: 'break-all' },
            table: { width: 'fit-content' },
          },
        },
        lg: {
          css: {
            img: {
              margin: 0,
            },
            pre: { padding: '0.25rem 1rem' },
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
