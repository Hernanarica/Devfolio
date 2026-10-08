import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Download,
  Dumbbell,
  Laptop,
  type LucideIcon,
  Mail,
  Megaphone,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/Button'
import { Reveal, Stagger, StaggerItem } from '@/components/Motion'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from '@/components/SocialIcons'
import { cvPath, type Job, resume } from '@/lib/resume'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Contact() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Mail
          className="h-6 w-6 flex-none stroke-zinc-400 dark:stroke-zinc-500"
          strokeWidth={1.5}
        />
        <span className="ml-3">¿Trabajamos juntos?</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Estoy abierto a proyectos freelance y colaboraciones. Contame qué querés
        construir y te paso una cotización sin costo.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href="/services#cotizar" className="flex-1">
          <Sparkles className="h-4 w-4" />
          Pedir cotización
        </Button>
        <Button
          href="https://wa.me/5491139361854"
          variant="secondary"
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>
      <Link
        href="/services#agendar"
        className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
      >
        <CalendarDays className="h-4 w-4" />
        O agendá una llamada de 30 min
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

interface Highlight {
  title: string
  description: string
}

const highlights: Array<Highlight> = [
  {
    title: 'Productos de punta a punta',
    description:
      'Plataformas in-house, e-commerce, blogs, chatbots e integraciones de APIs, desde la interfaz hasta la base de datos.',
  },
  {
    title: 'Datos que se usan',
    description:
      'Pipelines, ETLs, transformación de datos y reportes en BigQuery y Looker Studio para decidir con información real.',
  },
  {
    title: 'Automatización con IA',
    description:
      'Procesos repetitivos resueltos con IA, n8n e integraciones, para operaciones más eficientes.',
  },
  {
    title: 'Criterio técnico y de costos',
    description:
      'Elijo cada tecnología según lo que el proyecto necesita, con una inversión responsable de recursos e infraestructura.',
  },
]

function Highlights() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Cómo puedo ayudarte
      </h2>
      <Stagger
        as="ul"
        role="list"
        className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2"
      >
        {highlights.map((highlight) => (
          <StaggerItem as="li" key={highlight.title}>
            <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              {highlight.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {highlight.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
      <Button href="/projects" variant="secondary" className="mt-10">
        Ver proyectos
      </Button>
    </section>
  )
}

const jobIcons: Record<Job['id'], LucideIcon> = {
  spotter: Dumbbell,
  indigo: Building2,
  freelance: Laptop,
  kickads: Megaphone,
  'kickads-jr': Megaphone,
}

function Role({ job }: { job: Job }) {
  let Icon = jobIcons[job.id]
  let end = job.end ?? {
    label: 'Hoy',
    dateTime: new Date().getFullYear().toString(),
  }

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Icon
          className="h-5 w-5 text-teal-500 dark:text-teal-400"
          strokeWidth={1.75}
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Empresa</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {job.company}
        </dd>
        <dt className="sr-only">Rol</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {job.title}
        </dd>
        <dt className="sr-only">Fecha</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${job.start.label} hasta ${end.label}`}
        >
          <time dateTime={job.start.dateTime}>{job.start.label}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={end.dateTime}>{end.label}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseBusiness
          className="h-6 w-6 flex-none stroke-zinc-400 dark:stroke-zinc-500"
          strokeWidth={1.5}
        />
        <span className="ml-3">Experiencia</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.jobs.map((job) => (
          <Role key={job.id} job={job} />
        ))}
      </ol>
      <Button
        href={cvPath}
        target="_blank"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Descargar CV
        <Download className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <Stagger className="max-w-2xl" stagger={0.12}>
          <StaggerItem>
            <Link
              href="/services"
              className="group mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 py-1 pr-3 pl-2 text-xs font-medium text-teal-700 transition hover:border-teal-500/40 hover:bg-teal-500/10 dark:text-teal-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              Disponible para proyectos freelance
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Full Stack Developer, CTO & Cofounder de{' '}
              <span className="bg-linear-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
                Spotter
              </span>
              .
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              Soy Hernán, desarrollador Full Stack con más de 5 años de
              experiencia, en Buenos Aires. Construyo soluciones de punta a
              punta, desde la interfaz hasta la base de datos, trabajo con datos
              y automatizo procesos con IA. Trabajé con clientes como Bezza Pay,
              Taca Taca y MetaAlign, y hoy estoy construyendo Spotter.
            </p>
          </StaggerItem>
          <StaggerItem className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/Hernanarica"
              aria-label="Seguime en GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/hern%C3%A1n-arica-64ab7b149/"
              aria-label="Conectemos en LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://wa.me/5491139361854"
              aria-label="Escribime por WhatsApp"
              icon={WhatsAppIcon}
            />
          </StaggerItem>
        </Stagger>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <Highlights />
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Reveal>
              <Contact />
            </Reveal>
            <Reveal delay={0.1}>
              <Resume />
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  )
}
