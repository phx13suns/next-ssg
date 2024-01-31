import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  path: string
  title: string
  date: string
  image?: StaticImageData
  badges: string[]
}

export const ArticleCard: React.FC<Props> = ({ path, title, date, image, badges }) => {
  return (
    <article>
      <Link href={path} className="flex flex-row md:flex-col bg-base-100 shadow-xl h-32 md:h-auto rounded-lg">
        {image && (
          <figure className="relative aspect-square md:aspect-auto">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="!relative object-cover rounded-l-lg md:rounded-l-none md:rounded-t-lg"
            />
          </figure>
        )}
        <div className="relative w-full flex flex-col p-2 pb-6 md:h-32">
          <div className="flex flex-col h-full justify-center md:justify-start">
            <h2 className="text-lg font-bold break-all line-clamp-3">{title}</h2>
          </div>
          {badges.length > 0 && (
            <div className="card-actions mt-1">
              {badges.map(badge => (
                <div key={badge} className="badge badge-outline">
                  {badge}
                </div>
              ))}
            </div>
          )}
          <time dateTime={date} className="absolute right-2 bottom-2 text-xs mt-auto ml-auto">
            {date}
          </time>
        </div>
      </Link>
    </article>
  )
}
