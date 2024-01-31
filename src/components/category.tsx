import { ArticleList } from '@/components/articleList'
// import { Pagination } from '@/components/pagination'
import { Metadata } from '@/types/mdxMetadata'

// import type { Props as PaginationProps } from './pagination'

type Props = {
  name: string
  articles: {
    path: string
    slug: string[]
    metadata: Metadata
  }[]
  pagination: any
}

export const Category: React.FC<Props> = ({ articles, pagination }) => {
  return (
    <div>
      <ArticleList articles={articles} />
      {/* <Pagination {...pagination} /> */}
    </div>
  )
}
