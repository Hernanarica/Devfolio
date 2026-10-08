'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Bot,
  Check,
  ChevronDown,
  DatabaseZap,
  Globe,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

import { BookCall } from '@/components/BookCall'
import { SpotlightCard, Stagger, StaggerItem } from '@/components/Motion'
import { site } from '@/lib/site'

interface Service {
  title: string
  description: string
  icon: LucideIcon
  includes: Array<string>
  example: string
  className?: string
}

const services: Array<Service> = [
  {
    title: 'Plataformas y apps a medida',
    description:
      'Sistemas internos, dashboards y productos SaaS de punta a punta: desde la interfaz hasta la base de datos, pensados para escalar sin volverse una carga operativa.',
    icon: LayoutDashboard,
    includes: [
      'Arquitectura y elección de stack',
      'Autenticación, roles y paneles de gestión',
      'Integraciones con APIs y servicios externos',
    ],
    example: 'MetaAlign, IndigoHub, Spotter',
    className: 'lg:col-span-2',
  },
  {
    title: 'Sitios web y landings',
    description:
      'Sitios rápidos, optimizados para SEO y pensados para convertir visitas en clientes.',
    icon: Globe,
    includes: [
      'Diseño responsive y performance',
      'SEO técnico y analítica',
      'Panel para editar contenido',
    ],
    example: 'Bezza Pay, Spotter',
  },
  {
    title: 'Migración de plataformas',
    description:
      'Paso tu sistema o sitio a una plataforma moderna sin perder datos ni usuarios, y sin cortar el servicio.',
    icon: DatabaseZap,
    includes: [
      'Migración de datos y contenido',
      'Convivencia gradual entre plataformas',
      'Usuarios y SEO preservados',
    ],
    example: 'OM Personal, con más de 68.000 usuarios',
  },
  {
    title: 'Datos y reportes',
    description:
      'Pipelines, ETLs y dashboards para que tu equipo decida con información real y actualizada.',
    icon: BarChart3,
    includes: [
      'ETLs e integración de fuentes',
      'Modelado en BigQuery o Postgres',
      'Dashboards en Looker Studio',
    ],
    example: 'Reporting para Indigo y MetaAlign',
  },
  {
    title: 'Automatización con IA',
    description:
      'Automatizo tareas repetitivas y procesos operativos con IA, n8n e integraciones, para que tu equipo se enfoque en lo que suma valor.',
    icon: Bot,
    includes: [
      'Chatbots e integraciones con LLMs',
      'Flujos automáticos entre herramientas',
      'Reportes y tareas que corren solos',
    ],
    example: 'Automatizaciones y ETLs en Indigo',
  },
]

const steps = [
  {
    title: 'Charla inicial',
    description:
      'Agendamos una llamada de 30 minutos sin costo. Me contás tu idea o problema y entiendo objetivos, usuarios y restricciones antes de hablar de tecnología.',
  },
  {
    title: 'Propuesta y cotización',
    description:
      'Te envío una propuesta con alcance, stack recomendado, plazos y presupuesto cerrado, sin costo.',
  },
  {
    title: 'Desarrollo iterativo',
    description:
      'Trabajo en entregas cortas que podés ver y probar desde el principio, con comunicación constante.',
  },
  {
    title: 'Lanzamiento y soporte',
    description:
      'Publicamos, medimos y acompaño los primeros pasos. Si lo necesitás, seguimos con mantenimiento y mejoras.',
  },
]

const faqs = [
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer:
      'Depende del alcance. Después de la charla inicial te envío una cotización cerrada y detallada, sin costo ni compromiso, para que sepas exactamente qué incluye.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'Una landing puede estar en una o dos semanas; una plataforma a medida, de uno a varios meses. En la propuesta te paso un cronograma con entregas parciales.',
  },
  {
    question: '¿Trabajás con equipos o empresas que ya tienen desarrolladores?',
    answer:
      'Sí. Puedo sumarme a un equipo existente, liderar técnicamente un proyecto o encargarme de una parte puntual como datos o automatizaciones.',
  },
  {
    question: '¿Qué pasa después del lanzamiento?',
    answer:
      'Te acompaño en la puesta en producción y podemos acordar mantenimiento, soporte y nuevas funcionalidades según lo que necesite tu proyecto.',
  },
  {
    question: '¿Trabajás con clientes de otros países?',
    answer:
      'Sí, trabajo de forma remota desde Buenos Aires con clientes de Argentina y del exterior.',
  },
]

const serviceOptions = [
  ...services.map((service) => service.title),
  'Otro / no estoy seguro',
]

const budgetOptions = [
  'Todavía no lo sé',
  'Menos de USD 1.000',
  'USD 1.000 – 3.000',
  'USD 3.000 – 10.000',
  'Más de USD 10.000',
]

function ServiceCard({ service }: { service: Service }) {
  let Icon = service.icon

  return (
    <SpotlightCard className={clsx('flex flex-col', service.className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 text-teal-500 ring-1 ring-zinc-900/5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:bg-zinc-800 dark:text-teal-400 dark:ring-white/10">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {service.description}
      </p>
      <ul role="list" className="mt-5 space-y-2">
        {service.includes.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <Check
              className="mt-0.5 h-4 w-4 flex-none text-teal-500"
              strokeWidth={2}
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-zinc-100 pt-4 text-xs text-zinc-400 dark:border-zinc-700/40 dark:text-zinc-500">
        Ejemplos:{' '}
        <span className="font-medium text-zinc-600 dark:text-zinc-300">
          {service.example}
        </span>
      </p>
    </SpotlightCard>
  )
}

function Process() {
  let ref = useRef<HTMLOListElement>(null)
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  let scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ol ref={ref} role="list" className="relative mt-10 space-y-12 pl-12">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[15px] w-px bg-zinc-200 dark:bg-zinc-700/60"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-teal-500"
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <span className="absolute top-0 -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-teal-600 ring-1 ring-teal-500/40 dark:bg-zinc-900 dark:text-teal-400">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {step.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            {step.description}
          </p>
        </motion.li>
      ))}
    </ol>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  )
}

function Select({
  value,
  options,
  onChange,
  className,
}: {
  value: string
  options: Array<string>
  onChange: (value: string) => void
  className: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={clsx(
          className,
          'cursor-pointer appearance-none pr-8 dark:scheme-dark',
        )}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 bottom-2.5 h-4 w-4 text-zinc-400" />
    </div>
  )
}

function QuoteForm() {
  let [name, setName] = useState('')
  let [service, setService] = useState(serviceOptions[0])
  let [budget, setBudget] = useState(budgetOptions[0])
  let [details, setDetails] = useState('')

  let message = [
    `¡Hola Hernán! ${name ? `Soy ${name}. ` : ''}Quiero pedir una cotización.`,
    '',
    `• Servicio: ${service}`,
    `• Presupuesto aproximado: ${budget}`,
    ...(details ? [`• Detalle: ${details}`] : []),
  ].join('\n')

  let whatsappHref = `${site.links.whatsapp}?text=${encodeURIComponent(message)}`
  let mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Cotización: ${service}`,
  )}&body=${encodeURIComponent(message)}`

  let controlClassName =
    'mt-2 block w-full border-0 border-b border-zinc-200 bg-transparent px-0 py-2 text-sm text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-teal-500 focus:ring-0 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 gap-10 rounded-3xl border border-zinc-100 p-6 sm:p-10 lg:grid-cols-5 dark:border-zinc-700/40"
    >
      <div className="lg:col-span-2">
        <p className="text-sm font-semibold text-teal-500 dark:text-teal-400">
          Cotización
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Contame tu proyecto
        </h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Te respondo en menos de 48 horas con una propuesta sin costo.
        </p>
        <a
          href="#agendar"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
        >
          <CalendarDays className="h-4 w-4" />
          ¿Preferís hablarlo? Agendá una llamada
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <form
        className="space-y-6 lg:col-span-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Nombre">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre o empresa"
              className={controlClassName}
            />
          </Field>
          <Field label="Servicio">
            <Select
              value={service}
              options={serviceOptions}
              onChange={setService}
              className={controlClassName}
            />
          </Field>
        </div>
        <Field label="Presupuesto aproximado">
          <Select
            value={budget}
            options={budgetOptions}
            onChange={setBudget}
            className={controlClassName}
          />
        </Field>
        <Field label="Mensaje">
          <textarea
            rows={3}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Qué querés construir, para quién y para cuándo"
            className={clsx(controlClassName, 'resize-none')}
          />
        </Field>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar por WhatsApp
          </motion.a>
          <motion.a
            href={mailHref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200 transition-colors hover:ring-zinc-300 dark:text-zinc-200 dark:ring-zinc-700 dark:hover:ring-zinc-600"
          >
            <Mail className="h-4 w-4" />
            Enviar por email
          </motion.a>
        </div>
      </form>
    </motion.div>
  )
}

function Faq() {
  let [open, setOpen] = useState<number | null>(0)

  return (
    <Stagger
      as="ul"
      role="list"
      className="mt-8 divide-y divide-zinc-100 dark:divide-zinc-700/40"
    >
      {faqs.map((faq, index) => {
        let isOpen = open === index

        return (
          <StaggerItem as="li" key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-base font-medium text-zinc-800 transition-colors group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-400">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-none text-zinc-400"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 text-sm text-zinc-600 dark:text-zinc-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-semibold text-teal-500 dark:text-teal-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {title}
      </h2>
    </motion.div>
  )
}

export function Services() {
  return (
    <div className="space-y-28">
      <section>
        <SectionTitle eyebrow="Servicios" title="En qué te puedo ayudar" />
        <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </Stagger>
      </section>

      <section>
        <SectionTitle eyebrow="Proceso" title="Cómo trabajamos" />
        <Process />
      </section>

      <section id="cotizar" className="scroll-mt-24">
        <QuoteForm />
      </section>

      <section id="agendar" className="scroll-mt-24">
        <SectionTitle
          eyebrow="Agenda"
          title="¿Preferís hablarlo? Agendá una llamada"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400"
        >
          30 minutos por videollamada, sin costo ni compromiso. Elegí el día y
          horario que te quede cómodo y charlamos sobre tu proyecto.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <BookCall />
        </motion.div>
      </section>

      <section>
        <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
        <Faq />
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          ¿Querés ver lo que ya construí?
        </p>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-500 dark:text-teal-400"
        >
          Ver proyectos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
}
