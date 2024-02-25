import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <div className="flex bg-white p-4 justify-center">
      <ul className="flex gap-x-4 [&>li+li]:relative [&>li+li]:before:absolute [&>li+li]:before:content-['-'] [&>li+li]:before:text-gray-300 [&>li+li]:before:translate-x-[-11px]">
        <li>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </li>
        <li>
          <Link href="/disclaimer">免責事項</Link>
        </li>
        <li>
          <Link href="/copyright">著作権</Link>
        </li>
      </ul>
    </div>
  )
}
