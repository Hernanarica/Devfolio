import { defineConfig, fontProviders } from 'astro/config'
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
  // Solo la usa /cv
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    // resvg es un binario nativo (.node) que solo usa la imagen OG en el
    // server: el optimizador de deps de dev no puede empaquetarlo
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    ssr: { external: ['@resvg/resvg-js'] },
  },
})
