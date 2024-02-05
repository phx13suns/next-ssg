import { ArticleCard } from '@/components/articleCard'
import { Meta } from '@/types/mdxMetadata'

type Props = {
  articles: {
    path: string
    slug: string[]
    meta: Meta
  }[]
}

export const ArticleList: React.FC<Props> = ({ articles }) => {
  return (
    <ol className="grid place-items-stretch md:items-start gap-4 md:grid-cols-2">
      {articles.map(article => (
        <li key={article.path}>
          <ArticleCard
            path={article.path}
            title={article.meta.metadata.title}
            date={article.meta.date}
            image={article.meta.image}
            badges={article.slug.slice(0, article.slug.length - 1)}
          />
        </li>
      ))}
    </ol>
  )
}
