'use client'

import { motion } from 'motion/react'
import {
  BarChart3,
  Check,
  Bot,
  Cloud,
  Code2,
  Database,
  LayoutTemplate,
  type LucideIcon,
  PenTool,
  Server,
  Workflow,
} from 'lucide-react'
import {
  type SimpleIcon,
  siClaude,
  siDocker,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siGit,
  siGithubactions,
  siGooglebigquery,
  siGooglecloud,
  siJavascript,
  siLinear,
  siLooker,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siAstro,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons'
import clsx from 'clsx'

import { SpotlightCard, Stagger, StaggerItem } from '@/components/Motion'

interface Tech {
  name: string
  icon: SimpleIcon | LucideIcon
}

interface Category {
  title: string
  tagline: string
  icon: LucideIcon
  techs: Array<Tech>
  highlights?: Array<string>
  className?: string
  featured?: boolean
}

const categories: Array<Category> = [
  {
    title: 'Frontend',
    tagline:
      'Interfaces rápidas y cuidadas. React y Next.js para productos con mucha interacción; Astro cuando lo que importa es el contenido y el SEO.',
    icon: LayoutTemplate,
    techs: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'Astro', icon: siAstro },
      { name: 'Tailwind CSS', icon: siTailwindcss },
    ],
    className: 'lg:col-span-2',
  },
  {
    title: 'Lenguajes',
    tagline: 'TypeScript en todo lo que tenga que crecer. Python para datos.',
    icon: Code2,
    techs: [
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'Python', icon: siPython },
    ],
  },
  {
    title: 'Backend',
    tagline:
      'APIs, integraciones y BFFs. Supabase para salir rápido a producción sin descuidar costos.',
    icon: Server,
    techs: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express', icon: siExpress },
      { name: 'Supabase', icon: siSupabase },
      { name: 'FastAPI', icon: siFastapi },
      { name: 'Firebase', icon: siFirebase },
    ],
  },
  {
    title: 'IA y automatización',
    tagline:
      'Lo repetitivo se automatiza. Desarrollo asistido por IA todos los días y flujos que integran APIs e IA para operar más con menos.',
    icon: Bot,
    techs: [
      { name: 'Claude Code', icon: siClaude },
      { name: 'n8n', icon: siN8n },
    ],
    highlights: [
      'Chatbots e integraciones con LLMs',
      'Flujos automáticos entre APIs y herramientas internas',
      'Reportes y tareas operativas que corren solos',
      'Desarrollo asistido por IA con skills propias',
    ],
    className: 'lg:col-span-2',
    featured: true,
  },
  {
    title: 'Datos y analytics',
    tagline:
      'Pipelines, ETLs y reportes para que los equipos decidan con datos reales.',
    icon: BarChart3,
    techs: [
      { name: 'BigQuery', icon: siGooglebigquery },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Looker Studio', icon: siLooker },
      { name: 'Fivetran', icon: Database },
    ],
    highlights: [
      'ETLs e ingesta desde múltiples fuentes',
      'Modelado y transformación en BigQuery',
      'Dashboards en Looker Studio para los equipos',
      'Métricas de campañas y costos de infraestructura',
    ],
    className: 'lg:col-span-2',
  },
  {
    title: 'Cloud y DevOps',
    tagline: 'Infra simple, deploys automáticos y costos bajo control.',
    icon: Cloud,
    techs: [
      { name: 'Google Cloud', icon: siGooglecloud },
      { name: 'Vercel', icon: siVercel },
      { name: 'Docker', icon: siDocker },
      { name: 'GitHub Actions', icon: siGithubactions },
      { name: 'Git', icon: siGit },
    ],
  },
  {
    title: 'Producto y diseño',
    tagline:
      'Implementé Linear desde cero en Indigo. Figma para bajar ideas a pantallas junto a diseño.',
    icon: PenTool,
    techs: [
      { name: 'Linear', icon: siLinear },
      { name: 'Figma', icon: siFigma },
    ],
    className: 'lg:col-span-3',
  },
]

const marqueeTechs = categories.flatMap((category) => category.techs)

const principles = [
  {
    title: 'Primero el problema',
    description:
      'Entiendo qué necesita el negocio antes de elegir herramientas. La mejor tecnología es la que resuelve el problema real.',
  },
  {
    title: 'Costos bajo control',
    description:
      'Elijo infraestructura que escale con el proyecto y no se coma el presupuesto: servicios gestionados, pago por uso y nada de sobreingeniería.',
  },
  {
    title: 'Automatizar lo repetitivo',
    description:
      'Si una tarea se repite, se automatiza. IA y flujos con n8n para que el equipo se enfoque en lo que suma valor.',
  },
]

function isSimpleIcon(icon: Tech['icon']): icon is SimpleIcon {
  return typeof icon === 'object' && 'path' in icon
}

function TechIcon({
  icon,
  className,
}: Pick<Tech, 'icon'> & { className?: string }) {
  if (isSimpleIcon(icon)) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={clsx('fill-current', className)}
      >
        <path d={icon.path} />
      </svg>
    )
  }

  let Icon = icon
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />
}

function brandColor(icon: Tech['icon']) {
  // Las marcas negras se pierden en modo oscuro: usan el color del texto
  if (
    !isSimpleIcon(icon) ||
    ['000000', '0A0A0A', '181717', '191919'].includes(icon.hex)
  ) {
    return undefined
  }
  return `#${icon.hex}`
}

function TechChip({ tech }: { tech: Tech }) {
  let color = brandColor(tech.icon)

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      whileHover={{ y: -2 }}
      style={{ '--brand': color } as React.CSSProperties}
      className="group/chip flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-zinc-600"
    >
      <TechIcon
        icon={tech.icon}
        className={clsx(
          'h-4 w-4 flex-none text-zinc-500 transition-colors dark:text-zinc-400',
          color
            ? 'group-hover/chip:text-(--brand)'
            : 'group-hover/chip:text-zinc-900 dark:group-hover/chip:text-zinc-100',
        )}
      />
      {tech.name}
    </motion.li>
  )
}

function Marquee() {
  let items = [...marqueeTechs, ...marqueeTechs]

  return (
    <div className="relative -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2 sm:mx-0">
      <motion.ul
        aria-hidden="true"
        className="flex w-max gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {items.map((tech, index) => (
          <li
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2.5 text-zinc-400 dark:text-zinc-500"
          >
            <TechIcon icon={tech.icon} className="h-6 w-6" />
            <span className="text-sm font-medium whitespace-nowrap">
              {tech.name}
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

function CategoryCard({ category }: { category: Category }) {
  let Icon = category.icon

  return (
    <SpotlightCard
      className={clsx(
        category.className,
        category.featured &&
          'bg-linear-to-br from-teal-50 to-white dark:from-teal-500/10 dark:to-zinc-900',
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
            category.featured
              ? 'bg-teal-500 text-white ring-teal-500'
              : 'bg-zinc-50 text-teal-500 ring-zinc-900/5 dark:bg-zinc-800 dark:text-teal-400 dark:ring-white/10',
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {category.title}
        </h2>
        {category.featured && (
          <span className="ml-auto rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-600 dark:text-teal-400">
            Mi diferencial
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        {category.tagline}
      </p>
      {category.highlights && (
        <motion.ul
          role="list"
          className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.15 },
            },
          }}
        >
          {category.highlights.map((highlight) => (
            <motion.li
              key={highlight}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <Check
                className="mt-0.5 h-4 w-4 flex-none text-teal-500"
                strokeWidth={2}
              />
              {highlight}
            </motion.li>
          ))}
        </motion.ul>
      )}
      <motion.ul
        role="list"
        className="mt-6 flex flex-wrap gap-2"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05, delayChildren: 0.2 },
          },
        }}
      >
        {category.techs.map((tech) => (
          <TechChip key={tech.name} tech={tech} />
        ))}
      </motion.ul>
    </SpotlightCard>
  )
}

export function StackShowcase() {
  return (
    <div className="space-y-24">
      <Marquee />

      <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </Stagger>

      <section>
        <Stagger>
          <StaggerItem>
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              <Workflow className="h-6 w-6 text-teal-500" strokeWidth={1.75} />
              Cómo elijo tecnología
            </h2>
          </StaggerItem>
          <Stagger
            as="ul"
            role="list"
            stagger={0.15}
            className="relative mt-10 grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {principles.map((principle, index) => (
              <StaggerItem as="li" key={principle.title} className="relative">
                <span className="text-5xl font-bold tracking-tight text-teal-500/20 dark:text-teal-400/20">
                  0{index + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {principle.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Stagger>
      </section>
    </div>
  )
}
