import type { MDXComponents } from 'mdx/types'

const MDXcomponents: MDXComponents = {}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...MDXcomponents,
    ...components,
  }
}
