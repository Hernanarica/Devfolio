import { siteUrl } from '@/lib/site'

const pages = [
  { path: '/', changefreq: 'monthly', priority: 1 },
  { path: '/projects', changefreq: 'monthly', priority: 0.9 },
  { path: '/services', changefreq: 'monthly', priority: 0.9 },
  { path: '/about', changefreq: 'yearly', priority: 0.8 },
  { path: '/stack', changefreq: 'yearly', priority: 0.6 },
]

export function GET() {
  let lastmod = new Date().toISOString()
  let urls = pages
    .map(
      (page) =>
        `<url><loc>${siteUrl}${page.path === '/' ? '/' : page.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`,
    )
    .join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  )
}
