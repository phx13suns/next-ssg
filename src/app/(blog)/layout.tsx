import { Profile } from '@/components/profile'

type Props = {
  children: React.ReactNode
}

const BlogLayout = async ({ children }: Props) => {
  return (
    <div className="flex flex-wrap md:m-4 md:gap-x-4">
      <div className="flex-1 bg-white">{children}</div>
      <aside className="w-full md:w-[300px] flex flex-col md:gap-y-4">
        <Profile />
      </aside>
    </div>
  )
}

export default BlogLayout
