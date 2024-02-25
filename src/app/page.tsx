import Link from 'next/link'

import sitemapConfig from '@/../next-sitemap.config'

export const metadata = { alternates: { canonical: sitemapConfig.siteUrl + '/' } }

export default function Home() {
  return (
    <main className="flex flex-col h-svh items-center justify-between p-24">
      <h1 className="text-3xl">phx13suns Blog</h1>
      <Link href="/blog/">Enter</Link>
      <Link href="/about/">About</Link>
    </main>
  )
}
