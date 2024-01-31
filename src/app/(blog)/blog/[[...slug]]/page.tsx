import type { Metadata, ResolvingMetadata } from 'next'

import { Category } from '@/components/category'
import { articlesPerPage, paginationLength } from '@/constants/blog'
import { getArticleSlug, getPagerRootSlug, getPagerSlug } from '@/libs/getArticleList'

import { BASE_PATH, getMdxContent, getMdxMetadata, POSTS_DIR } from './mdx'

export type Props = {
  params: {
    slug: string[]
  }
}

export const generateStaticParams = () => {
  return [
    ...getArticleSlug(POSTS_DIR),
    ...getPagerSlug(POSTS_DIR, articlesPerPage),
    ...getPagerRootSlug(POSTS_DIR),
    { slug: [] },
  ]
}

export const generateMetadata = async ({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> => {
  if (
    !getArticleSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug)) ||
    !params.slug
  ) {
    const categorySlug = !params.slug
      ? []
      : getPagerRootSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
      ? params.slug
      : params.slug.slice(0, params.slug.length - 1)

    const categoryName = [...BASE_PATH.split('/'), ...categorySlug][
      [...BASE_PATH.split('/'), ...categorySlug].length - 1
    ]
    const articleCount = getArticleSlug([POSTS_DIR, ...categorySlug].join('/')).length

    return {
      title: `${categoryName} | 記事数:${articleCount}`,
    }
  }

  const meta = await getMdxMetadata(params.slug)

  return {
    title: meta.title,
  }
}

export default async function Entry({ params }: Props) {
  if (
    !getArticleSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug)) ||
    !params.slug
  ) {
    const slug = !params.slug
      ? ['1']
      : getPagerRootSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
      ? [...params.slug, '1']
      : params.slug

    const categorySlug = slug.slice(0, slug.length - 1)
    const categoryArticleSlug = getArticleSlug([POSTS_DIR, ...categorySlug].join('/'))
    const categoryArticlesInfo = await Promise.all(
      categoryArticleSlug.map(async ({ slug }) => {
        const metadata = await getMdxMetadata([...categorySlug, ...slug])
        return { path: [BASE_PATH, ...categorySlug, ...slug].join('/'), slug, metadata }
      })
    )

    const categoryName = [...BASE_PATH.split('/'), ...categorySlug][
      [...BASE_PATH.split('/'), ...categorySlug].length - 1
    ]
    const articleCount = categoryArticleSlug.length
    const currentPage = Number(slug[slug.length - 1])

    const categoryProps = {
      name: categoryName,
      articles: categoryArticlesInfo
        .sort((a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date))
        .splice((currentPage - 1) * articlesPerPage, articlesPerPage),
      pagination: {
        path: [BASE_PATH, ...categorySlug].join('/'),
        currentPage,
        articleCount,
        articlesPerPage,
        maxDisplayCount: paginationLength,
      },
    }

    return <Category {...categoryProps} />
  }

  const MdxContent = await getMdxContent(params.slug)

  return (
    <article className="prose prose-lg max-w-none">
      <MdxContent />
    </article>
  )
}
