import { getArticleSlug } from '@/libs/getArticleList'

import { Props as PageProps } from './page'

type Props = {
  children: React.ReactNode
  params: PageProps['params']
}

const getMdxMetadata = async (slug: Required<Props['params']>['slug']) => {
  return await import(`/_posts/blog/${slug.join('/')}.mdx`).then(module => module['metadata'])
}

const POSTS_DIR = './_posts/blog'

export default async function EntryLayout({ children, params }: Props) {
  const meta = getArticleSlug(POSTS_DIR).some(({ slug }) => JSON.stringify(slug) === JSON.stringify(params.slug))
    ? await getMdxMetadata(params.slug)
    : undefined

  return (
    <article>
      {meta ? <h1>{meta.title}</h1> : null}
      {children}
    </article>
  )
}
