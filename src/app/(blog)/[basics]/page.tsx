import type { Metadata } from 'next'

import { getArticleSlug } from '@/libs/getArticleList'

import { getMdxContent, getMdxMetadata, POSTS_DIR } from './mdx'

export type Props = {
  params: {
    basics: string
  }
}

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

  return (
    <article className="prose prose-lg max-w-none">
      <MdxContent />
    </article>
  )
}
