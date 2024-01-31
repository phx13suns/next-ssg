import fs from 'fs'
import path from 'path'

const listMdFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.name[0] !== '.')
    .filter(dirent => !dirent.isFile() || ['.md', '.mdx'].includes(path.extname(dirent.name).toLowerCase()))
    .flatMap(dirent =>
      dirent.isFile() ? [`${dir}/${dirent.name}`.replace(/\.mdx?$/, '')] : listMdFiles(`${dir}/${dirent.name}`)
    )

export const getArticleSlug = (sourceDir: string) => {
  const reg = new RegExp(`^${sourceDir}`)

  return listMdFiles(sourceDir).map(filePath => {
    const path = filePath.replace(reg, '').replace(/^\//, '').split('/')
    return {
      slug: path,
    }
  })
}

export const getPagerSlug = (sourceDir: string, articlesPerPage: number) => {
  const reg = new RegExp(`^${sourceDir}`)

  const filePaths = listMdFiles(sourceDir)

  let result: Record<string, number> = {}
  for (const filePath of filePaths) {
    const slug = filePath.replace(reg, '').replace(/^\//, '').split('/')
    slug.pop()

    result = { ...result, '': result[''] ? result[''] + 1 : 1 }

    const pageSlug: string[] = []
    slug.forEach(word => {
      pageSlug.push(word)
      const pagePath = pageSlug.join('/')
      result = { ...result, [pagePath]: result[pagePath] ? result[pagePath] + 1 : 1 }
    })
  }

  return Object.entries(result)
    .map(([categoryPath, articleCount]) =>
      [...Array(Math.ceil(articleCount / articlesPerPage))].map((_, i) => ({
        slug: [...categoryPath.split('/'), `${i + 1}`].filter(slug => slug !== ''),
      }))
    )
    .flat()
}

export const getPagerRootSlug = (sourceDir: string) => {
  const reg = new RegExp(`^${sourceDir}`)

  const filePaths = listMdFiles(sourceDir).filter(filePath => {
    const path = filePath.replace(reg, '').replace(/^\//, '').split('/')
    return path.length >= 2
  })

  let result: string[] = []
  for (const filePath of filePaths) {
    const slug = filePath.replace(reg, '').replace(/^\//, '').split('/')
    slug.pop()

    let pageSlug: string[] = []
    slug.forEach(word => {
      pageSlug.push(word)
      const pagePath = pageSlug.join('/')
      result.push(pagePath)
    })
  }

  return Array.from(new Set(result)).map(categoryPath => ({
    slug: categoryPath.split('/'),
  }))
}
