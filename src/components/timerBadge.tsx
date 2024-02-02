'use client'

import { useEffect, useState } from 'react'

import { twJoin } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
  className?: string
  publishedTime: number
  newArrivalDays: number
}

export const TimerBadge: React.FC<Props> = ({ children, className, publishedTime, newArrivalDays }) => {
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
    <span aria-hidden="true" className={twJoin('text-xs text-white bg-secondary px-1 rounded-ee-lg', className)}>
      {children}
    </span>
  )
}
