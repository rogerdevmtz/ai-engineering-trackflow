const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

export function resolveSiteConfig(env) {
  const setting = env.SITE_INDEXABLE?.trim() || 'false'
  if (!['true', 'false'].includes(setting)) throw new Error('SITE_INDEXABLE must be true or false.')
  const indexable = setting === 'true'
  let siteUrl = ''
  if (env.SITE_URL?.trim()) {
    const url = new URL(env.SITE_URL.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || !url.hostname.includes('.') || /^(localhost|127\.|0\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname) || ['.local', '.localhost', '.github.dev', '.githubpreview.dev'].some(suffix => url.hostname.endsWith(suffix))) {
      throw new Error('SITE_URL must be the final HTTPS origin, with no credentials, path, query or fragment.')
    }
    siteUrl = url.href
  }
  if (indexable && !siteUrl) throw new Error('An approved SITE_URL is required before enabling indexing.')
  return { siteUrl, indexable }
}

export function createSearchFiles({ siteUrl, indexable }, { siteTitle, siteDescription, services }) {
  const absolute = path => siteUrl ? new URL(path, siteUrl).href : undefined
  const organizationId = absolute('#organizacion') ?? '#organizacion'
  const countries = [{ '@type': 'Country', name: 'Estados Unidos' }, { '@type': 'Country', name: 'España' }]
  const graph = [
    { '@type': 'Organization', '@id': organizationId, name: 'TrackFlow', description: siteDescription,
      ...(siteUrl && { url: siteUrl, logo: absolute('/brand/trackflow-logo-dark.svg') }),
      areaServed: countries,
      location: [
        { '@type': 'Place', name: 'Almacén de Los Ángeles', address: { '@type': 'PostalAddress', addressLocality: 'Los Ángeles', addressCountry: 'US' } },
        { '@type': 'Place', name: 'Almacén de Zaragoza', address: { '@type': 'PostalAddress', addressLocality: 'Zaragoza', addressCountry: 'ES' } },
      ],
    },
    ...services.map(service => ({ '@type': 'Service', '@id': absolute(`#${service.id}`) ?? `#${service.id}`, name: service.title, description: service.description, provider: { '@id': organizationId }, areaServed: countries })),
    ...(siteUrl ? [{ '@type': 'WebSite', '@id': absolute('#sitio'), url: siteUrl, name: 'TrackFlow', inLanguage: 'es', publisher: { '@id': organizationId } }] : []),
  ]
  const meta = (attribute, name, content) => `<meta ${attribute}="${name}" content="${escape(content)}" />`
  const head = [
    `<title>${escape(siteTitle)}</title>`,
    meta('name', 'description', siteDescription),
    meta('name', 'robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'),
    meta('property', 'og:type', 'website'), meta('property', 'og:locale', 'es_ES'),
    meta('property', 'og:site_name', 'TrackFlow'), meta('property', 'og:title', siteTitle), meta('property', 'og:description', siteDescription),
    meta('name', 'twitter:card', siteUrl ? 'summary_large_image' : 'summary'),
    meta('name', 'twitter:title', siteTitle), meta('name', 'twitter:description', siteDescription),
    ...(siteUrl ? [
      `<link rel="canonical" href="${escape(siteUrl)}" />`, meta('property', 'og:url', siteUrl),
      meta('property', 'og:image', absolute('/hero-logistics-clean-v2.webp')),
      meta('property', 'og:image:width', '1672'), meta('property', 'og:image:height', '941'),
      meta('property', 'og:image:alt', 'Escena ilustrativa generada con IA: camión naranja con la identidad de TrackFlow.'),
      meta('name', 'twitter:image', absolute('/hero-logistics-clean-v2.webp')),
      meta('name', 'twitter:image:alt', 'Escena ilustrativa generada con IA: camión naranja con la identidad de TrackFlow.'),
    ] : []),
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
  // Keep crawling open so preview crawlers can read the noindex meta directive.
  const robots = `User-agent: *\nAllow: /\n${indexable ? `\nSitemap: ${absolute('/sitemap.xml')}\n` : ''}`
  // A single-page site has one canonical URL, not a separate URL per anchor.
  const sitemap = indexable ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}</loc></url></urlset>\n` : null
  return { head, robots, sitemap }
}
