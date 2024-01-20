import type { Metadata } from 'next'

import { getArticleSlug } from '@/libs/getArticleList'

type Props = {
  params: {
    basics: string
  }
}

const POSTS_DIR = './_posts/basics'

const getMdx = async (name: Props['params']['basics'], type: 'default' | 'metadata' = 'default') => {
  return await import(`/_posts/basics/${name}.mdx`).then(module => module[type])
}

export const generateStaticParams = () => {
  return getArticleSlug(POSTS_DIR).map(({ slug }) => ({ basics: slug[0] }))
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const meta = await getMdx(params.basics, 'metadata')

  return {
    title: meta.title,
  }
}

export default async function Article({ params }: Props) {
  const MdxContent = await getMdx(params.basics)

  return <MdxContent />
}
