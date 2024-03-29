import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { TimerBadge } from '@/components/timerBadge'
import { newArrivalDays } from '@/constants/blog'

type Props = {
  path: string
  title: string
  date?: string
  image?: StaticImageData
  badges: string[]
}

export const ArticleCard: React.FC<Props> = ({ path, title, date, image, badges }) => {
  return (
    <article>
      <Link
        href={path}
        scroll={true}
        className="relative flex flex-row md:flex-col bg-base-100 shadow-xl h-32 md:h-auto rounded-lg overflow-hidden"
      >
        {image && (
          <figure className="relative aspect-square md:aspect-auto h-full">
            <Image src={image} alt={title} fill priority className="!relative object-cover" />
          </figure>
        )}
        {date ? (
          <TimerBadge publishedTime={Date.parse(date)} newArrivalDays={newArrivalDays}>
            NEW
          </TimerBadge>
        ) : null}
        <div className="relative w-full flex flex-col p-2 md:pt-3 pb-6 md:h-32">
          <div className="flex flex-col h-full justify-center md:justify-start">
            <h2 className="text-lg font-bold break-all line-clamp-3">{title}</h2>
          </div>
          {badges.length > 0 && (
            <div className="card-actions mt-1">
              {badges.map(badge => (
                <div key={badge} aria-hidden="true" className="badge badge-outline">
                  {badge}
                </div>
              ))}
            </div>
          )}
          {date ? (
            <time dateTime={date} className="absolute right-2 bottom-2 text-xs mt-auto ml-auto">
              {formatDate(date)}
            </time>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}
