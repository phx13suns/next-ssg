import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

const basePath = process.env.GITHUB_PAGES ? '/next-ssg' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: basePath,
  basePath,
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
}

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
