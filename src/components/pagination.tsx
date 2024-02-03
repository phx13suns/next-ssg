import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'

export type Props = {
  path: string
  currentPage: number
  articleCount: number
  articlesPerPage: number
  maxDisplayCount: number
}

export const Pagination: React.FC<Props> = ({ path, currentPage, articleCount, articlesPerPage, maxDisplayCount }) => {
  const pageCount = Math.ceil(articleCount / articlesPerPage)

  return (
    <nav aria-label="Pager">
      <ul className="flex -space-x-px h-8 text-sm text-gray-500">
        <li>
          {pageCount <= maxDisplayCount || currentPage <= Math.ceil(maxDisplayCount / 2) ? (
            <div className="flex items-center justify-center px-3 h-full bg-white border border-e-0 border-gray-300 rounded-s-lg">
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </div>
          ) : (
            <Link
              href={`${path}/1`}
              className="flex items-center justify-center px-3 h-full bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronDoubleLeftIcon
                title="first page"
                role="graphics-symbol"
                aria-hidden="false"
                className="h-4 w-4"
              />
            </Link>
          )}
        </li>
        {[...Array(pageCount > maxDisplayCount ? maxDisplayCount : pageCount)].map((_, i) => {
          const index = getIndex(i, currentPage, pageCount, maxDisplayCount)
          return (
            <li key={index}>
              <Link
                href={`${path}/${index}`}
                className={twJoin(
                  'flex items-center justify-center px-3 h-full border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
                  currentPage === index ? 'bg-blue-50' : 'bg-white'
                )}
                aria-current={currentPage === index ? 'page' : undefined}
              >
                {index}
              </Link>
            </li>
          )
        })}
        <li>
          {pageCount <= maxDisplayCount || currentPage >= pageCount - Math.floor(maxDisplayCount / 2) ? (
            <div className="flex items-center justify-center px-3 h-full bg-white border border-gray-300 rounded-e-lg">
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </div>
          ) : (
            <Link
              href={`${path}/${pageCount}`}
              className="flex items-center justify-center px-3 h-full bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronDoubleRightIcon
                title="last page"
                role="graphics-symbol"
                aria-hidden="false"
                className="h-4 w-4"
              />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

const getIndex = (index: number, currentPage: number, pageCount: number, maxDisplayCount: number) => {
  return (
    index +
    (pageCount > maxDisplayCount
      ? currentPage > Math.ceil(maxDisplayCount / 2)
        ? currentPage > pageCount - Math.floor(maxDisplayCount / 2)
          ? pageCount + 1 - Math.ceil(maxDisplayCount / 2) - Math.floor(maxDisplayCount / 2)
          : currentPage + 1 - Math.ceil(maxDisplayCount / 2)
        : 1
      : 1)
  )
}
