import React from 'react'

import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    // Allows customizing built-in components, e.g. to add tailwind.
    // h1: ({ children }) => <h1 className="text-2xl font-semibold">{children}</h1>,
    a: ({ href, children }) => {
      if (href && href.startsWith('/')) {
        return <Link href={href}>{children}</Link>
      }

      if (href && href.startsWith('#')) {
        return <a href={href}>{children}</a>
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
    pre: ({ children, ...props }) => {
      const childElements = React.Children.toArray(children)
      if (childElements.length === 1 && React.isValidElement(childElements[0]) && childElements[0].type === 'code') {
        const newChildren = React.cloneElement(childElements[0] as React.ReactElement<{ readonly className: string }>, {
          className: 'w-0',
        })
        return (
          <pre {...props} className="overflow-x-auto">
            {newChildren}
          </pre>
        )
      }
      return <pre {...props}>{children}</pre>
    },
    ...components,
  }
}
