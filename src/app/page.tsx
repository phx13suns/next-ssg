import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-3xl">phx13suns Blog</h1>
      <Link href="/blog/">Enter</Link>
      <Link href="/about/">About</Link>
    </main>
  )
}
