import { defineConfig, fontProviders } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // URL absoluta y pública: sin ella las redes no encuentran la imagen OG
  site: 'https://www.hernanarica.com.ar',
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
