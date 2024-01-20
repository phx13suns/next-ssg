import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.GITHUB_PAGES ? '/next-ssg' : '',
  images: {
    unoptimized: true,
  },
}

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
