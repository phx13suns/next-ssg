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
    figure: ({ children, ...props }) => {
      if (props.hasOwnProperty('data-rehype-pretty-code-figure')) {
        const childElements = React.Children.toArray(children)
        if (
          childElements.length === 2 &&
          React.isValidElement(childElements[0]) &&
          childElements[0].type === 'figcaption' &&
          React.isValidElement(childElements[1]) &&
          childElements[1].type === 'pre'
        ) {
          const pre = React.cloneElement(childElements[1] as React.ReactElement)
          const shikiStyle = pre.props['style']
          const figcaption = React.cloneElement(childElements[0] as React.ReactElement<{ readonly style: string }>, {
            style: shikiStyle,
          })
          return (
            <figure {...props}>
              {figcaption}
              {pre}
            </figure>
          )
        }
      }
      return <figure {...props}>{children}</figure>
    },
    ...components,
  }
}
