import { MDXContent } from 'mdx/types'

import { Meta } from '@/types/mdxMetadata'

export const BASE_PATH = '/blog'
export const POSTS_DIR = './_posts/blog'

const getMdx = async (slug: string[], type: 'default' | 'meta' = 'default') => {
  return await import(`/_posts/blog/${slug.join('/')}.mdx`).then(module => module[type])
}

export const getMdxContent = async (slug: string[]): Promise<MDXContent> => {
  return await getMdx(slug)
}

export const getMdxMetadata = async (slug: string[]): Promise<Meta> => {
  return await getMdx(slug, 'meta')
}
