import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

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

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
