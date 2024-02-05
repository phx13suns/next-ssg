import type { Metadata } from 'next'
import { StaticImageData } from 'next/image'

export type Meta = {
  metadata: Metadata & {
    title: string
  }
  date?: string
  image?: StaticImageData
}
