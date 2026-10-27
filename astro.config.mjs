import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// En Vercel, si no se define PUBLIC_SITE_URL, se usa el dominio de producción
// que Vercel expone solo. Sin una URL absoluta y pública, las redes no
// encuentran la imagen OG al compartir el link
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

export default defineConfig({
  site: (
    process.env.PUBLIC_SITE_URL ||
    (vercelUrl ? `https://${vercelUrl}` : 'https://www.hernanarica.com.ar')
  ).replace(/\/$/, ''),
  trailingSlash: 'never',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
