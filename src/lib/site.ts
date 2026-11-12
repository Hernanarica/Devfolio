// Sale de `site` en astro.config.mjs, que resuelve la URL pública
export const siteUrl = import.meta.env.SITE

export const site = {
  name: 'Hernán',
  // Solo para metadatos no visibles (SEO, datos estructurados)
  fullName: 'Hernán Arica',
  title: 'Hernán - Full Stack & Forward Deployed Engineer',
  jobTitle: 'Full Stack & Forward Deployed Engineer',
  description:
    'Soy Hernán, desarrollador Full Stack y Forward Deployed Engineer. Me meto de cerca en cada problema y lo llevo a producción: productos web, datos y automatizaciones con IA. Además construyo mis propios productos, como Spotter y Momenrise.',
  email: 'hernan.arica96@gmail.com',
  xHandle: '@Hernan__Arica',
  locale: 'es_AR',
  links: {
    github: 'https://github.com/Hernanarica',
    linkedin: 'https://www.linkedin.com/in/hern%C3%A1n-arica-64ab7b149/',
    x: 'https://x.com/Hernan__Arica',
    whatsapp: 'https://wa.me/5491139361854',
    calLink: 'hernan-arica-yz48m9/30min',
    cal: 'https://cal.com/hernan-arica-yz48m9/30min',
  },
  keywords: [
    'Hernán Arica',
    'Forward Deployed Engineer',
    'FDE',
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
