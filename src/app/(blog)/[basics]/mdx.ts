import { MDXContent } from 'mdx/types'

import { Metadata } from '@/types/mdxMetadata'

const getMdx = async (name: string, type: 'default' | 'metadata' = 'default') => {
  return await import(`/_posts/basics/${name}.mdx`).then(module => module[type])
}

export const getMdxContent = async (name: string): Promise<MDXContent> => {
  return await getMdx(name)
}

export const getMdxMetadata = async (name: string): Promise<Metadata> => {
  return await getMdx(name, 'metadata')
}
