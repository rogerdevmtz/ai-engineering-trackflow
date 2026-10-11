import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createServer, loadEnv } from 'vite'
import { createSearchFiles, resolveSiteConfig } from './seo.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const config = resolveSiteConfig({ ...loadEnv('production', root, 'SITE_'), ...process.env })
const vite = await createServer({ root, mode: 'production', appType: 'custom', server: { middlewareMode: true, watch: null } })
try {
  const page = await vite.ssrLoadModule('/src/entry-server.tsx')
  const search = createSearchFiles(config, page)
  const indexPath = new URL('../dist/index.html', import.meta.url)
  const template = await readFile(indexPath, 'utf8')
  if (!template.includes('<!--app-html-->') || !template.includes('<!--seo:start-->')) throw new Error('Prerender placeholders are missing from index.html.')
  const html = template.replace('<!--app-html-->', () => page.render())
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => search.head)
  await writeFile(indexPath, html)
  await writeFile(new URL('../dist/robots.txt', import.meta.url), search.robots)
  if (search.sitemap) await writeFile(new URL('../dist/sitemap.xml', import.meta.url), search.sitemap)
  console.log(`Static HTML generated. Search indexing: ${config.indexable ? 'enabled for the configured domain' : 'disabled for preview'}.`)
} finally {
  await vite.close()
}
