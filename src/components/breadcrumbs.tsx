import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'

type Props = {
  items: {
    name: string
    path?: string
  }[]
  className?: string
}

export const Breadcrumbs: React.FC<Props> = ({ items, className }) => {
  return (
    <nav className={twJoin('text-sm breadcrumbs', className)}>
      <ol>
        <li>
          <Link href="/">
            <HomeIcon title="home" role="graphics-symbol" aria-hidden="false" className="w-4 h-4" />
          </Link>
        </li>
        {items.map(item => (
          <li key={item.name}>{item.path ? <Link href={item.path}>{item.name}</Link> : item.name}</li>
        ))}
      </ol>
    </nav>
  )
}
