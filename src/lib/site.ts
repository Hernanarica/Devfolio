import { type Metadata } from 'next'

// En Vercel, si no se define NEXT_PUBLIC_SITE_URL, se usa el dominio de
// producción que Vercel expone solo. Sin una URL absoluta y pública, las
// redes no encuentran la imagen OG al compartir el link.
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/$/, '')

export const site = {
  name: 'Hernán',
  // Solo para metadatos no visibles (SEO, datos estructurados)
  fullName: 'Hernán Arica',
  title: 'Hernán - Full Stack Developer & CTO de Spotter',
  jobTitle: 'Full Stack Developer',
  description:
    'Soy Hernán, desarrollador Full Stack con más de 5 años de experiencia y CTO & Cofounder de Spotter. Construyo productos web de punta a punta, pipelines de datos y automatizaciones con IA desde Buenos Aires.',
  email: 'hernan.arica96@gmail.com',
  locale: 'es_AR',
  links: {
    github: 'https://github.com/Hernanarica',
    linkedin: 'https://www.linkedin.com/in/hern%C3%A1n-arica-64ab7b149/',
    whatsapp: 'https://wa.me/5491139361854',
    calLink: 'hernan-arica-yz48m9/30min',
    cal: 'https://cal.com/hernan-arica-yz48m9/30min',
  },
  keywords: [
    'Hernán Arica',
    'Full Stack Developer',
    'desarrollador Full Stack',
    'desarrollador freelance',
    'Buenos Aires',
    'Argentina',
    'React',
    'Next.js',
    'Astro',
    'TypeScript',
    'Node.js',
    'Supabase',
    'Google Cloud Platform',
    'BigQuery',
    'automatización con IA',
    'n8n',
    'Spotter',
  ],
}

// Al definir openGraph en una página, Next no hereda la imagen de
// app/opengraph-image.tsx, así que se referencia explícitamente
const ogImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: site.title,
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      images: [ogImage],
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: `${title} - ${site.name}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
      title: `${title} - ${site.name}`,
      description,
    },
  }
}
