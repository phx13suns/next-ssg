import { ArticleList } from '@/components/articleList'
import { Pagination } from '@/components/pagination'
import { Meta } from '@/types/mdxMetadata'

import type { Props as PaginationProps } from './pagination'

type Props = {
  name: string
  articles: {
    path: string
    slug: string[]
    meta: Meta
  }[]
  pagination: PaginationProps
}

export const Category: React.FC<Props> = ({ articles, pagination }) => {
  return (
    <>
      <ArticleList articles={articles} />
      <footer className="flex justify-center mt-4 mb-2">
        <Pagination {...pagination} />
      </footer>
    </>
  )
}
