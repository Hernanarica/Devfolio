import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Stagger, StaggerItem } from '@/components/Motion'
import imageBezzaPay from '@/images/projects/bezzapay.jpg'
import imageIndigoHub from '@/images/projects/indigohub.jpg'
import imageMetaAlign from '@/images/projects/metaalign.jpg'
import imageOmPersonal from '@/images/projects/ompersonal.jpg'
import imageSpotterPlatform from '@/images/projects/spotter-platform.jpg'
import imageSpotterWebsite from '@/images/projects/spotter-website.jpg'
import { pageMetadata } from '@/lib/site'

interface Project {
  name: string
  role: string
  description: string
  stack: Array<string>
  image: StaticImageData
  links: Array<{ href: string; label: string }>
}

const projects: Array<Project> = [
  {
    name: 'Spotter Platform',
    role: 'CTO & Cofounder',
    description:
      'App que empareja a personas que entrenan en el mismo gimnasio y horario para sostener la constancia: matching, agenda de entrenamientos, confirmación de sesiones y notificaciones. Arquitectura pensada para escalar sin volverse una carga operativa.',
    stack: ['TypeScript', 'Supabase', 'GCP', 'IA'],
    image: imageSpotterPlatform,
    links: [{ href: 'https://www.gospotter.app', label: 'gospotter.app' }],
  },
  {
    name: 'Spotter Website',
    role: 'CTO & Cofounder',
    description:
      'Sitio de lanzamiento con lista de espera para personas y gimnasios, con el que validamos la demanda antes del MVP.',
    stack: ['Astro', 'Tailwind CSS', 'Supabase'],
    image: imageSpotterWebsite,
    links: [{ href: 'https://www.gospotter.app', label: 'gospotter.app' }],
  },
  {
    name: 'MetaAlign',
    role: 'Full Stack',
    description:
      'Plataforma de planificación ortodóntica para clínicas y laboratorios. Incluye el website, MetaAlign Cloud para gestionar casos, planificación y créditos, y un visor 3D en el navegador para revisar y aprobar tratamientos.',
    stack: ['Next.js', 'React', 'Supabase', 'Visor 3D'],
    image: imageMetaAlign,
    links: [
      { href: 'https://www.meta-align.com', label: 'Website' },
      { href: 'https://cloud.meta-align.com', label: 'Cloud' },
      { href: 'https://viewer.meta-align.com', label: 'Viewer 3D' },
    ],
  },
  {
    name: 'IndigoHub',
    role: 'Full Stack Developer · Indigo',
    description:
      'Plataforma interna de Indigo. Lideré su desarrollo con un equipo de 3 personas, definiendo arquitectura, stack y procesos; optimicé costos de infraestructura y sumé ETLs y automatizaciones.',
    stack: ['GCP', 'Supabase', 'BigQuery', 'ETLs'],
    image: imageIndigoHub,
    links: [
      {
        href: 'https://kickhub.indigohubs.tech/login',
        label: 'indigohubs.tech',
      },
    ],
  },
  {
    name: 'OM Personal English',
    role: 'Full Stack',
    description:
      'Migración de un portal de inglés gratuito con 27 años de historia y más de 68.000 usuarios a una plataforma nueva: cursos de A1 a C2 con audio, ejercicios y exámenes automatizados, migrando el contenido sección por sección sin cortar el servicio.',
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Migración de datos'],
    image: imageOmPersonal,
    links: [
      { href: 'https://www.ompersonal.com.ar', label: 'ompersonal.com.ar' },
    ],
  },
  {
    name: 'Bezza Pay',
    role: 'Full Stack',
    description:
      'Website de un proveedor de servicios de pago autorizado por el BCRA (ex Taca Taca), con landings y herramientas como el simulador de cobros, comisiones y cuotas.',
    stack: ['Astro', 'Tailwind CSS', 'TypeScript'],
    image: imageBezzaPay,
    links: [{ href: 'https://www.bezzapay.com.ar', label: 'bezzapay.com.ar' }],
  },
]

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
    >
      {label}
      <ArrowUpRight className="h-4 w-4 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  )
}

export const metadata: Metadata = pageMetadata({
  title: 'Proyectos',
  description:
    'Plataformas, productos y sitios que construí para clientes, empresas y mi propio startup.',
  path: '/projects',
})

export default function Projects() {
  return (
    <SimpleLayout
      title="Productos que construí, de la idea a producción."
      intro="Una selección de los proyectos más importantes en los que trabajé: mi propio startup, plataformas internas, migraciones a gran escala y sitios para empresas."
    >
      <Stagger
        as="ul"
        role="list"
        stagger={0.12}
        className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2"
      >
        {projects.map((project) => (
          <StaggerItem as="li" key={project.name} className="flex flex-col">
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-zinc-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 dark:bg-zinc-800 dark:ring-white/10"
            >
              <Image
                src={project.image}
                alt={`Captura de ${project.name}`}
                sizes="(min-width: 768px) 24rem, 100vw"
                className="aspect-16/10 w-full object-cover object-top transition duration-300 group-hover:scale-[1.04]"
                placeholder="blur"
              />
              <span className="sr-only">
                Visitar {project.name} (se abre en una pestaña nueva)
              </span>
            </a>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {project.name}
            </h2>
            <p className="mt-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {project.role}
            </p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <ul role="list" className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {project.links.map((link) => (
                <ProjectLink key={link.href} {...link} />
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SimpleLayout>
  )
}
