import { renderOgImage } from '@/libs/og-image'

export async function GET() {
  return new Response(new Uint8Array(await renderOgImage()), {
    headers: { 'Content-Type': 'image/png' },
  })
}
