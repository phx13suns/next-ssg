import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Training Logs',
    default: 'Training Logs',
  },
  description: 'Training Logs with Next.js static exports',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja" data-theme="cupcake">
      <body>
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </body>
    </html>
  )
}
