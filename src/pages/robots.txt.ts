import { siteUrl } from '@/lib/site'

export function GET() {
  return new Response(
    `User-Agent: *\nAllow: /\n\nHost: ${siteUrl}\nSitemap: ${siteUrl}/sitemap.xml\n`,
  )
}
