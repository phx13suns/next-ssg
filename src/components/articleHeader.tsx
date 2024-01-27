type Props = {
  title: string
  publishedDate: string
}

export const ArticleHeader: React.FC<Props> = ({ title, publishedDate }) => {
  const date = new Date(publishedDate)

  return (
    <div>
      <h1 className="text-4xl font-bold border-b border-primary pb-1">{title}</h1>
      <div className="flex justify-end">
        <time dateTime={publishedDate} itemProp="datepublished">
          {formatDate(date)}
        </time>
        公開
      </div>
    </div>
  )
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}
