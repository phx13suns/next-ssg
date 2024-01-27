type Props = {
  children: React.ReactNode
}

const BlogLayout = async ({ children }: Props) => {
  return (
    <div className="flex flex-wrap md:my-4">
      <div className="flex-1 bg-white md:mx-4">{children}</div>
      <div className="w-full md:w-[300px] md:mx-4">side</div>
    </div>
  )
}

export default BlogLayout
