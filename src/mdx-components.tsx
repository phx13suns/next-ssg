import type { MDXComponents } from 'mdx/types'

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    // Allows customizing built-in components, e.g. to add tailwind.
    // h1: ({ children }) => <h1 className="text-2xl font-semibold">{children}</h1>,
    ...components,
  }
}
