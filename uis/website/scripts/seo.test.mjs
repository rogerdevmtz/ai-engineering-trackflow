import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createSearchFiles, resolveSiteConfig } from './seo.mjs'

const content = { siteTitle: 'TrackFlow', siteDescription: 'Logística para comercio electrónico.', services: [{ id: 'almacenamiento', title: 'Almacenamiento', description: 'Inventario resguardado.' }] }

test('previews stay noindex and never invent a public domain', () => {
  const config = resolveSiteConfig({})
  const result = createSearchFiles(config, content)
  assert.match(result.head, /noindex, nofollow/)
  assert.doesNotMatch(result.head, /rel="canonical"|og:url|localhost|127\.0\.0\.1/)
  assert.equal(result.sitemap, null)
  assert.doesNotMatch(result.robots, /Disallow|Sitemap/)
})

test('indexing requires an explicit domain and valid settings', () => {
  assert.throws(() => resolveSiteConfig({ SITE_INDEXABLE: 'true' }))
  assert.throws(() => resolveSiteConfig({ SITE_INDEXABLE: 'yes' }))
  for (const SITE_URL of ['http://example.com', 'https://localhost', 'https://preview.localhost', 'https://127.0.0.1', 'https://192.168.1.1', 'https://workspace-5173.app.github.dev', 'https://example.com/app', 'https://user:secret@example.com', 'https://example.com/?token=x', 'https://example.com/#servicios']) assert.throws(() => resolveSiteConfig({ SITE_URL }))
})

test('published metadata has one canonical URL, consistent graph and sitemap', () => {
  const config = resolveSiteConfig({ SITE_URL: 'https://example.com', SITE_INDEXABLE: 'true' })
  const result = createSearchFiles(config, content)
  assert.match(result.head, /rel="canonical" href="https:\/\/example.com\/"/)
  assert.match(result.head, /content="index, follow, max-image-preview:large"/)
  assert.match(result.robots, /Sitemap: https:\/\/example.com\/sitemap.xml/)
  assert.match(result.sitemap, /<loc>https:\/\/example.com\/<\/loc>/)
  assert.doesNotMatch(result.sitemap, /#almacenamiento/)
  const json = JSON.parse(result.head.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(json['@graph'].find(item => item['@type'] === 'Service').provider['@id'], 'https://example.com/#organizacion')
  assert.doesNotMatch(result.head, /aggregateRating|telephone|streetAddress|FAQPage/)
})

test('metadata escapes HTML and script terminators', () => {
  const result = createSearchFiles(resolveSiteConfig({}), { ...content, siteTitle: '<TrackFlow> & "envíos"', siteDescription: '</script><script>alert(1)</script>' })
  assert.match(result.head, /&lt;TrackFlow&gt; &amp; &quot;envíos&quot;/)
  assert.equal((result.head.match(/<script/g) ?? []).length, 1)
  assert.doesNotMatch(result.head, /<script>alert/)
})
