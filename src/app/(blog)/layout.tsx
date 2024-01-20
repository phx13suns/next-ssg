type Props = {
  children: React.ReactNode
}

const BlogLayout = async ({ children }: Props) => {
  return (
    <main>
      <div className="flex flex-wrap justify-around">
        <div className="w-full lg:w-[728px]">{children}</div>
        <div className="w-full lg:w-[300px]">side</div>
      </div>
    </main>
  )
}

export default BlogLayout
