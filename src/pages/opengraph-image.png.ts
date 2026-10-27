import { renderOgImage } from '@/libs/og-image'

export async function GET() {
  return new Response(await renderOgImage(), {
    headers: { 'Content-Type': 'image/png' },
  })
}
