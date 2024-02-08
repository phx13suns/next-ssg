import mdx from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { getHighlighter } from 'shiki'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const basePath = process.env.GITHUB_PAGES ? '/next-ssg' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: basePath,
  basePath,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false,
  },
  webpack: (config, options) => {
    if (!options.dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          generateStatsFile: true,
        })
      )
    }
    return config
  },
}

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: 'github-dark',
  getHighlighter,
}

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
})

export default withMDX(nextConfig)
