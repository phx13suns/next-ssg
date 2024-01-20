import type { MDXContent } from 'mdx/types'
import type { Metadata, ResolvingMetadata } from 'next'

import { articlesPerPage } from '@/constants/blog'
import { getArticleSlug, getPagerRootSlug, getPagerSlug } from '@/libs/getArticleList'

export type Props = {
  params: {
    slug: string[]
  }
}

type MetadataType = {
  title: string
  date: string
}

const BASE_PATH = '/blog'
const POSTS_DIR = './_posts/blog'

const getMdx = async (slug: Required<Props['params']>['slug'], type: 'default' | 'metadata' = 'default') => {
  return await import(`/_posts/blog/${slug.join('/')}.mdx`).then(module => module[type])
}

const getMdxContent = async (slug: Required<Props['params']>['slug']) => {
  return (await getMdx(slug)) as MDXContent
}

const getMdxMetadata = async (slug: Required<Props['params']>['slug']) => {
  return (await getMdx(slug, 'metadata')) as MetadataType
}

export const generateStaticParams = () => {
  return [...getArticleSlug(POSTS_DIR), ...getPagerSlug(POSTS_DIR, articlesPerPage), ...getPagerRootSlug(POSTS_DIR)]
}

export const generateMetadata = async ({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> => {
  if (
    [...getPagerSlug(POSTS_DIR, articlesPerPage), ...getPagerRootSlug(POSTS_DIR)].some(
      ({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug)
    )
  ) {
    const slug = getPagerRootSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
      ? [...params.slug, '1']
      : params.slug

    const categorySlug = slug.slice(0, slug.length - 1)
    const categoryArticleSlug = getArticleSlug(`${[POSTS_DIR, ...categorySlug].join('/')}`)
    const articleCount = categoryArticleSlug.length

    return {
      title: 'page: 記事数:' + articleCount,
    }
  }

  const meta = await getMdxMetadata(params.slug)

  return {
    title: meta.title,
  }
}

export default async function Entry({ params }: Props) {
  const breadcrumbs = createBreadcrumbs([
    ...BASE_PATH.split('/').filter(item => item !== ''),
    ...params.slug.slice(0, params.slug.length - 1),
  ])

  if (
    [...getPagerSlug(POSTS_DIR, articlesPerPage), ...getPagerRootSlug(POSTS_DIR)].some(
      ({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug)
    )
  ) {
    const slug = getPagerRootSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
      ? [...params.slug, '1']
      : params.slug

    const categorySlug = slug.slice(0, slug.length - 1)
    const categoryArticleSlug = getArticleSlug(`${[POSTS_DIR, ...categorySlug].join('/')}`)
    const categoryArticlesInfo = await Promise.all(
      categoryArticleSlug.map(async ({ slug }) => {
        const metadata = await getMdxMetadata([...categorySlug, ...slug])
        return { path: [BASE_PATH, ...categorySlug, ...slug].join('/'), slug, metadata }
      })
    )

    const articleCount = categoryArticleSlug.length
    const currentPage = Number(slug[slug.length - 1])

    const categoryProps = {
      name: slug[slug.length - 2],
      articles: categoryArticlesInfo
        .sort((a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date))
        .splice((currentPage - 1) * articlesPerPage, articlesPerPage),
      pagination: {
        path: [BASE_PATH, ...categorySlug].join('/'),
        currentPage,
        articleCount,
        articlesPerPage,
        maxDisplayCount: 5,
      },
    }

    return <p>category</p>
  }

  const MdxContent = await getMdxContent(params.slug)

  return (
    <div className="prose prose-xl">
      <MdxContent />
    </div>
  )
}

const createBreadcrumbs = (pathMap: string[]) => {
  let breadcrumbsPath = ''
  return pathMap.map(item => {
    breadcrumbsPath += '/' + item
    return { name: item, path: breadcrumbsPath }
  })
}
