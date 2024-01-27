import Link from 'next/link'

type Props = {
  items: {
    name: string
    path?: string
  }[]
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ol>
        <li>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              role="graphics-symbol"
              className="h-4 w-4"
            >
              <title>Home</title>
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
        </li>
        {items.map(item => (
          <li key={item.name}>{item.path ? <Link href={item.path}>{item.name}</Link> : item.name}</li>
        ))}
      </ol>
    </div>
  )
}
