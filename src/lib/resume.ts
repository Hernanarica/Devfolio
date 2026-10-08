// Fuente única de la experiencia: la usan el home y el CV (/cv)

export interface ResumeDate {
  label: string
  dateTime: string
}

export interface Job {
  id: 'spotter' | 'indigo' | 'freelance' | 'kickads' | 'kickads-jr'
  company: string
  title: string
  location: string
  start: ResumeDate
  // null = puesto actual
  end: ResumeDate | null
  summary?: string
  bullets: Array<string>
}

export const resume = {
  headline: 'Full Stack Developer · CTO & Cofounder en Spotter',
  location: 'Buenos Aires, Argentina',
  phone: '+54 9 11 3936-1854',
  summary:
    'Desarrollador Full Stack con más de 5 años de experiencia construyendo productos web de punta a punta con React, Next.js, Node.js y TypeScript. Experiencia en Supabase, PostgreSQL y Google Cloud Platform, pipelines de datos y ETLs en BigQuery, y automatización de procesos con IA y n8n. Lideré equipos de desarrollo, definí arquitecturas y optimicé costos de infraestructura. Actualmente CTO & Cofounder de Spotter.',
  jobs: [
    {
      id: 'spotter',
      company: 'Spotter',
      title: 'CTO & Cofounder',
      location: 'Remoto',
      start: { label: 'Jul 2026', dateTime: '2026-07' },
      end: null,
      summary:
        'Plataforma que conecta personas para entrenar juntas según horario, objetivos y estilo de entrenamiento.',
      bullets: [
        'Defino la arquitectura técnica del producto con foco en escalabilidad, sostenibilidad y costos (TypeScript, Supabase, Google Cloud).',
        'Lidero el desarrollo de la plataforma y del sitio web (Astro, Tailwind CSS) desde la idea hasta producción.',
        'Integro IA y automatizaciones en el producto y en la operación del equipo.',
      ],
    },
    {
      id: 'indigo',
      company: 'Indigo',
      title: 'Full Stack Developer',
      location: 'Buenos Aires',
      start: { label: 'Jul 2023', dateTime: '2023-07' },
      end: null,
      bullets: [
        'Lideré el desarrollo de IndigoHub, una aplicación interna, con un equipo de 3 personas, definiendo arquitectura, stack y procesos.',
        'Optimicé costos de infraestructura en Google Cloud Platform y Supabase.',
        'Desarrollé ETLs, pipelines de datos y reportes con BigQuery, Fivetran y Looker Studio.',
        'Implementé Linear desde cero, estructurando flujos de trabajo y priorización del equipo.',
      ],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      title: 'Full Stack Developer',
      location: 'Remoto',
      start: { label: '2022', dateTime: '2022' },
      end: null,
      bullets: [
        'OM Personal English: migré una plataforma educativa con más de 68.000 usuarios a Next.js y Supabase, incluyendo la migración de datos.',
        'MetaAlign: desarrollé el sitio web, la plataforma cloud y el visor 3D para planificación ortodóntica (Next.js, React, Supabase).',
        'Bezza Pay (ex Taca Taca): sitios web, landings y herramientas internas como simulador de cobros y comisiones (Astro, TypeScript).',
        'Plataforma de gestión de pacientes con React y Supabase, con reporting en Looker Studio.',
      ],
    },
    {
      id: 'kickads',
      company: 'Kickads',
      title: 'Full Stack Developer',
      location: 'Buenos Aires',
      start: { label: 'Jun 2021', dateTime: '2021-06' },
      end: { label: 'Jul 2023', dateTime: '2023-07' },
      bullets: [
        'Desarrollé y mantuve un sistema interno utilizado por múltiples equipos (Node.js, Express, React).',
        'Integré APIs de medios (DV360, Meta Ads, Google Ads) bajo un enfoque BFF.',
        'Participé en proyectos end-to-end y en la visualización de métricas, contribuyendo a la optimización de costos.',
      ],
    },
    {
      id: 'kickads-jr',
      company: 'Kickads',
      title: 'JavaScript Developer Jr',
      location: 'Buenos Aires',
      start: { label: 'Jul 2020', dateTime: '2020-07' },
      end: { label: 'Jun 2021', dateTime: '2021-06' },
      bullets: [
        'Desarrollé piezas interactivas, landing pages y sitios web para campañas digitales.',
        'Integré APIs externas y optimicé assets para mejorar la performance.',
        'Trabajé principalmente en frontend, con aportes en backend y mejora de formatos creativos.',
      ],
    },
  ] satisfies Array<Job>,
  skills: [
    { group: 'Lenguajes', items: 'TypeScript, JavaScript (ES6+), Python, SQL' },
    {
      group: 'Frontend',
      items: 'React, Next.js, Astro, Tailwind CSS, HTML, CSS',
    },
    {
      group: 'Backend',
      items: 'Node.js, Express, Supabase, FastAPI, Firebase, APIs REST, BFF',
    },
    {
      group: 'Datos',
      items: 'PostgreSQL, BigQuery, Firestore, Looker Studio, Fivetran, ETL',
    },
    {
      group: 'Cloud y DevOps',
      items:
        'Google Cloud Platform, Vercel, Docker, GitHub Actions, CI/CD, Git',
    },
    {
      group: 'IA y automatización',
      items: 'Claude Code, n8n, integraciones con LLMs, chatbots',
    },
    { group: 'Producto', items: 'Linear, Figma, metodologías ágiles' },
  ],
  education: [
    {
      title: 'Desarrollador Web',
      school: 'Escuela Da Vinci',
      start: { label: 'Mar 2019', dateTime: '2019-03' },
      end: { label: 'Dic 2022', dateTime: '2022-12' },
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Básico (lectura de documentación técnica)' },
  ],
}

export const cvPath = '/hernan-arica-cv.pdf'
