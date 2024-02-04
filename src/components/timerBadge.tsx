'use client'

import { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  publishedTime: number
  newArrivalDays: number
}

export const TimerBadge: React.FC<Props> = ({ children, publishedTime, newArrivalDays }) => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (publishedTime + newArrivalDays * 24 * 60 * 60 * 1000 > Date.now()) {
      setIsShow(true)
    }
  }, [newArrivalDays, publishedTime])

  if (!isShow) {
    return null
  }

  return (
    <span aria-hidden="true" className="absolute text-xs text-white bg-secondary px-1 rounded-ee-lg">
      {children}
    </span>
  )
}
