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
  assert.doesNotMatch(result.head, /aggregateRating|streetAddress|FAQPage/)
  assert.equal(json['@graph'].find(item => item['@type'] === 'Organization').url, 'https://trackflow.com')
  assert.equal(json['@graph'].find(item => item['@type'] === 'WebSite').url, 'https://example.com/')
})

test('organization includes the official TrackFlow schema in local and configured builds', () => {
  for (const env of [{}, { SITE_URL: 'https://example.com', SITE_INDEXABLE: 'false' }, { SITE_URL: 'https://example.com', SITE_INDEXABLE: 'true' }]) {
    const result = createSearchFiles(resolveSiteConfig(env), content)
    const json = JSON.parse(result.head.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.equal(json['@context'], 'https://schema.org')
    const organizations = json['@graph'].filter(item => item['@type'] === 'Organization')
    assert.equal(organizations.length, 1)
    const organization = organizations[0]
    assert.equal(organization.name, 'TrackFlow')
    assert.equal(organization.description, 'Gestión de almacenes y entregas de última milla para e-commerce')
    assert.equal(organization.url, 'https://trackflow.com')
    assert.equal(organization.foundingDate, '2009')
    assert.deepEqual(organization.address, [
      { '@type': 'PostalAddress', addressCountry: 'US', addressLocality: 'Los Ángeles', addressRegion: 'California' },
      { '@type': 'PostalAddress', addressCountry: 'ES', addressLocality: 'Zaragoza', addressRegion: 'Aragón' },
    ])
    assert.deepEqual(organization.contactPoint, { '@type': 'ContactPoint', telephone: '+1-213-555-0147', email: 'comercial@trackflow.com', contactType: 'sales', availableLanguage: ['Spanish', 'English'] })
    assert.deepEqual(organization.sameAs, ['https://linkedin.com/company/trackflow'])
    assert.deepEqual(organization.areaServed, [{ '@type': 'Country', name: 'Estados Unidos' }, { '@type': 'Country', name: 'España' }])
    assert.deepEqual(organization.location.map(place => place.address), organization.address)
    for (const service of json['@graph'].filter(item => item['@type'] === 'Service')) assert.equal(service.provider['@id'], organization['@id'])
    if (env.SITE_INDEXABLE !== 'true') {
      assert.match(result.head, /noindex, nofollow/)
      assert.equal(result.sitemap, null)
    }
    if (!env.SITE_URL) assert.equal(json['@graph'].some(item => item['@type'] === 'WebSite'), false)
  }
})

test('metadata escapes HTML and script terminators', () => {
  const description = '</script><script>alert(1)</script>'
  const result = createSearchFiles(resolveSiteConfig({}), { ...content, siteTitle: '<TrackFlow> & "envíos"', siteDescription: description, services: [{ ...content.services[0], description }] })
  assert.match(result.head, /&lt;TrackFlow&gt; &amp; &quot;envíos&quot;/)
  assert.equal((result.head.match(/<script/g) ?? []).length, 1)
  assert.doesNotMatch(result.head, /<script>alert/)
  const json = JSON.parse(result.head.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(json['@graph'].find(item => item['@type'] === 'Service').description, description)
})
