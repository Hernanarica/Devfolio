import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Download } from 'lucide-react'

import { cvPath, type Job, resume } from '@/lib/resume'
import { site, siteUrl } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: { absolute: `${site.fullName} - CV Full Stack Developer` },
  description: `Currículum de ${site.fullName}, ${resume.headline}.`,
  robots: { index: false, follow: true },
}

// Diseño pensado para ATS: una sola columna, texto real, sin tablas,
// íconos ni imágenes. Se exporta a PDF con `pnpm cv`.

function displayUrl(url: string) {
  return decodeURIComponent(url.replace(/^https?:\/\/(www\.)?/, ''))
}

const portfolioUrl = /localhost|example\.com/.test(siteUrl) ? null : siteUrl

const contact = [
  { label: resume.location },
  { label: site.email, href: `mailto:${site.email}` },
  { label: resume.phone, href: site.links.whatsapp },
  { label: displayUrl(site.links.linkedin), href: site.links.linkedin },
  { label: displayUrl(site.links.github), href: site.links.github },
  ...(portfolioUrl
    ? [{ label: displayUrl(portfolioUrl), href: portfolioUrl }]
    : []),
]

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="flex items-center gap-3 text-[12px] font-bold text-teal-700 uppercase">
        {title}
        <span aria-hidden="true" className="h-px flex-auto bg-zinc-200" />
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function Dates({ start, end }: Pick<Job, 'start' | 'end'>) {
  return (
    <p className="flex-none text-[12px] text-zinc-500 tabular-nums">
      <time dateTime={start.dateTime}>{start.label}</time> –{' '}
      {end ? <time dateTime={end.dateTime}>{end.label}</time> : 'Actualidad'}
    </p>
  )
}

function JobEntry({ job }: { job: Job }) {
  return (
    <article className="break-inside-avoid [&+&]:mt-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[14px] font-semibold text-zinc-900">
          {job.title} <span className="font-normal text-zinc-400">·</span>{' '}
          <span className="text-teal-700">{job.company}</span>
          <span className="font-normal text-zinc-500">, {job.location}</span>
        </h3>
        <Dates start={job.start} end={job.end} />
      </div>
      {job.summary && (
        <p className="mt-1 text-[12.5px] text-zinc-600 italic">{job.summary}</p>
      )}
      <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] leading-snug text-zinc-700 marker:text-teal-600">
        {job.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function CvPage() {
  return (
    <div
      className={`${inter.className} min-h-full w-full bg-zinc-100 py-10 print:bg-white print:py-0`}
    >
      <div className="mx-auto mb-4 flex max-w-[210mm] justify-end px-4 print:hidden">
        <a
          href={cvPath}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700"
        >
          <Download className="h-4 w-4" />
          Descargar PDF
        </a>
      </div>
      <main className="mx-auto max-w-[210mm] bg-white px-[14mm] py-[12mm] text-zinc-800 shadow-xl ring-1 shadow-zinc-800/5 ring-zinc-900/5 print:max-w-none print:p-0 print:shadow-none print:ring-0">
        <header>
          <h1 className="text-[28px] leading-tight font-bold tracking-tight text-zinc-900">
            {site.fullName}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-teal-700">
            {resume.headline}
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-zinc-600">
            {contact.map((item, index) => (
              <span key={item.label}>
                {index > 0 && (
                  <span aria-hidden="true" className="mx-1.5 text-zinc-300">
                    |
                  </span>
                )}
                <span className="whitespace-nowrap">
                  {item.href ? (
                    <a href={item.href} className="hover:text-teal-700">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
              </span>
            ))}
          </p>
        </header>

        <Section title="Perfil profesional">
          <p className="text-[12.5px] leading-relaxed text-zinc-700">
            {resume.summary}
          </p>
        </Section>

        <Section title="Experiencia laboral">
          {resume.jobs.map((job) => (
            <JobEntry key={job.id} job={job} />
          ))}
        </Section>

        <Section title="Habilidades técnicas">
          <ul className="space-y-1 text-[12.5px] leading-snug text-zinc-700">
            {resume.skills.map((skill) => (
              <li key={skill.group}>
                <span className="font-semibold text-zinc-900">
                  {skill.group}:
                </span>{' '}
                {skill.items}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Educación">
          {resume.education.map((item) => (
            <div
              key={item.title}
              className="flex items-baseline justify-between gap-4"
            >
              <h3 className="text-[14px] font-semibold text-zinc-900">
                {item.title}{' '}
                <span className="font-normal text-zinc-400">·</span>{' '}
                <span className="text-teal-700">{item.school}</span>
              </h3>
              <Dates start={item.start} end={item.end} />
            </div>
          ))}
        </Section>

        <Section title="Idiomas">
          <ul className="space-y-1 text-[12.5px] text-zinc-700">
            {resume.languages.map((language) => (
              <li key={language.name}>
                <span className="font-semibold text-zinc-900">
                  {language.name}:
                </span>{' '}
                {language.level}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  )
}
