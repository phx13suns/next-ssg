import { Breadcrumbs } from '@/components/breadcrumbs'
import { HeaderTitle } from '@/components/headerTitle'
import { getArticleSlug, getPagerRootSlug } from '@/libs/getArticleList'

import { BASE_PATH, getMdxMetadata, POSTS_DIR } from './mdx'
import { Props as PageProps } from './page'

type Props = {
  children: React.ReactNode
  params: PageProps['params']
}

export default async function EntryLayout({ children, params }: Props) {
  const { date, metadata } = getArticleSlug(POSTS_DIR).some(
    ({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug)
  )
    ? await getMdxMetadata(params.slug)
    : { date: undefined, metadata: undefined }

  const slug = !params.slug
    ? ['1']
    : getPagerRootSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
    ? [...params.slug, '1']
    : params.slug

  const breadcrumbs = createBreadcrumbs([
    ...BASE_PATH.split('/').filter(item => item !== ''),
    ...slug.slice(0, slug.length - 1),
  ])

  const category = [...BASE_PATH.split('/'), ...slug][[...BASE_PATH.split('/'), ...slug].length - 2]
  const categoryName = `${category}`

  return (
    <main className="py-2 px-4 md:px-6 lg:px-10">
      <header className="flex flex-col mb-4">
        <HeaderTitle title={metadata?.title || categoryName} publishedDate={date} />
        <Breadcrumbs items={breadcrumbs} className="order-first" />
      </header>
      {children}
    </main>
  )
}

const createBreadcrumbs = (pathMap: string[]) => {
  let breadcrumbsPath = ''
  return pathMap.map(item => {
    breadcrumbsPath += '/' + item
    return { name: item, path: breadcrumbsPath }
  })
}
