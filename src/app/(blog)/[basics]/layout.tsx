import { Breadcrumbs } from '@/components/breadcrumbs'
import { HeaderTitle } from '@/components/headerTitle'

import { getMdxMetadata } from './mdx'
import { Props as PageProps } from './page'

type Props = {
  children: React.ReactNode
  params: PageProps['params']
}

export default async function ArticleLayout({ children, params }: Props) {
  const meta = await getMdxMetadata(params.basics)

  return (
    <main className="py-2 px-4 md:px-6 lg:px-10">
      <header className="mb-4">
        <Breadcrumbs items={[{ name: meta.title }]} />
        <HeaderTitle title={meta.title} publishedDate={meta.date} />
      </header>
      {children}
    </main>
  )
}
