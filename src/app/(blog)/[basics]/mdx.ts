import { MDXContent } from 'mdx/types'

import { Meta } from '@/types/mdxMetadata'

export const POSTS_DIR = './_posts/basics'

const getMdx = async (name: string, type: 'default' | 'meta' = 'default') => {
  return await import(`/_posts/basics/${name}.mdx`).then(module => module[type])
}

export const getMdxContent = async (name: string): Promise<MDXContent> => {
  return await getMdx(name)
}

export const getMdxMetadata = async (name: string): Promise<Meta> => {
  return await getMdx(name, 'meta')
}
