import { ArticleCard } from '@/components/articleCard'
import { Metadata } from '@/types/mdxMetadata'

type Props = {
  articles: {
    path: string
    slug: string[]
    metadata: Metadata
  }[]
}

export const ArticleList: React.FC<Props> = ({ articles }) => {
  return (
    <ol className="grid place-items-stretch md:items-start gap-4 md:grid-cols-2">
      {articles.map(article => (
        <li key={article.path}>
          <ArticleCard
            path={article.path}
            title={article.metadata.title}
            date={article.metadata.date}
            image={article.metadata.image}
            badges={article.slug.slice(0, article.slug.length - 1)}
          />
        </li>
      ))}
    </ol>
  )
}
