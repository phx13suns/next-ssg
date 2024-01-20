type Props = {
  children: React.ReactNode
}

export default function ArticleLayout({ children }: Props) {
  return (
    <article>
      <div className="prose prose-xl">{children}</div>
    </article>
  )
}
