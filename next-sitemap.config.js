/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://phx13suns.github.io/next-ssg',
  generateRobotsTxt: true,
  outDir: './out',
  transform: async (config, path) => {
    const slug = path.split('/')
    if (noindexPaths.includes(path) || slug[slug.length - 1] === '1') {
      return null
    }
    return { loc: path }
  },
}

const noindexPaths = ['/rights']
