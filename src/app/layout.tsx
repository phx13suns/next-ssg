import '@/styles/global.css'

export const metadata = {
  title: {
    template: '%s | phx13suns Blog',
    default: 'phx13suns Blog',
  },
  description: 'Next.jsでstatic exportsを使ったmarkdownベースのSSGサイトを構築する際のTipsを紹介するブログです',
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
