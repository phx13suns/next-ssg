import { ArticleHeader } from '@/components/articleHeader'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { getMdxMetadata } from './mdx'
import { Props as PageProps } from './page'

type Props = {
  children: React.ReactNode
  params: PageProps['params']
}

export default async function ArticleLayout({ children, params }: Props) {
  const meta = await getMdxMetadata(params.basics)

  return (
    <main className="px-10 py-2">
      <header className="mb-4">
        <Breadcrumbs items={[{ name: meta.title }]} />
        <ArticleHeader title={meta.title} publishedDate={meta.date} />
      </header>
      <article className="prose prose-lg max-w-none">{children}</article>
    </main>
  )
}
