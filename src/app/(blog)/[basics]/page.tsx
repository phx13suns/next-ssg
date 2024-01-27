import type { Metadata } from 'next'

import { getArticleSlug } from '@/libs/getArticleList'

import { getMdxContent, getMdxMetadata } from './mdx'

export type Props = {
  params: {
    basics: string
  }
}

const POSTS_DIR = './_posts/basics'

export const generateStaticParams = () => {
  return getArticleSlug(POSTS_DIR).map(({ slug }) => ({ basics: slug[0] }))
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const meta = await getMdxMetadata(params.basics)

  return {
    title: meta.title,
  }
}

export default async function Article({ params }: Props) {
  const MdxContent = await getMdxContent(params.basics)

  return <MdxContent />
}
