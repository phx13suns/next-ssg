import { MDXContent } from 'mdx/types'

import { Metadata } from '@/types/mdxMetadata'

const getMdx = async (name: string, type: 'default' | 'metadata' = 'default') => {
  return await import(`/_posts/basics/${name}.mdx`).then(module => module[type])
}

export const getMdxContent = async (name: string) => {
  return (await getMdx(name)) as MDXContent
}

export const getMdxMetadata = async (name: string) => {
  return (await getMdx(name, 'metadata')) as Metadata
}
