import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Mail } from 'lucide-react'

import { Container } from '@/components/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/Motion'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { pageMetadata } from '@/lib/site'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <Mail
      className={clsx(
        className,
        'fill-none! stroke-zinc-500 group-hover:stroke-teal-500',
      )}
      strokeWidth={1.75}
    />
  )
}

export const metadata: Metadata = pageMetadata({
  title: 'Sobre mí',
  description:
    'Soy Hernán, desarrollador Full Stack en Buenos Aires y CTO & Cofounder de Spotter.',
  path: '/about',
})

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <Reveal className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Hernán"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </Reveal>
        </div>
        <Stagger className="lg:order-first lg:row-span-2" stagger={0.1}>
          <StaggerItem>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Soy Hernán. Construyo productos web de punta a punta desde Buenos
              Aires.
            </h1>
          </StaggerItem>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <StaggerItem as="div">
              <p>
                Empecé en 2020 en Kickads como desarrollador JavaScript,
                haciendo piezas interactivas, landings y sitios para campañas
                digitales. Ahí crecí a Full Stack: mantuve un sistema interno
                usado por varios equipos e integré APIs de medios como DV360,
                Meta y Google Ads con un enfoque BFF.
              </p>
            </StaggerItem>
            <StaggerItem as="div">
              <p>
                Desde 2023 trabajo en Indigo, donde lideré el desarrollo de una
                aplicación interna con un equipo de tres personas: definí
                arquitectura, stack y procesos, optimicé costos de
                infraestructura en GCP y Supabase, armé ETLs y automatizaciones
                e implementé Linear desde cero para ordenar el trabajo.
              </p>
            </StaggerItem>
            <StaggerItem as="div">
              <p>
                En paralelo trabajo como freelance con clientes como Bezza Pay,
                Taca Taca y MetaAlign: plataformas de gestión, herramientas
                internas, sitios y landings. Elijo cada tecnología con criterio,
                buscando el equilibrio entre lo que el proyecto necesita y una
                inversión responsable de los recursos. Disfruto especialmente
                trabajar con datos y automatizar procesos con IA.
              </p>
            </StaggerItem>
            <StaggerItem as="div">
              <p>
                Desde julio de 2026 soy CTO & Cofounder de Spotter, una
                plataforma social de fitness que conecta a personas del mismo
                gimnasio para que entrenar deje de ser algo que hacés solo. Ahí
                me enfoco en una arquitectura escalable y sostenible, integrando
                IA y automatización para que el producto crezca sin volverse una
                carga operativa. Me formé como desarrollador web en Da Vinci y
                estoy abierto a proyectos freelance y colaboraciones.
              </p>
            </StaggerItem>
          </div>
        </Stagger>
        <Reveal className="lg:pl-20" delay={0.2}>
          <ul role="list">
            <SocialLink href="https://github.com/Hernanarica" icon={GitHubIcon}>
              Seguime en GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/hern%C3%A1n-arica-64ab7b149/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Conectemos en LinkedIn
            </SocialLink>
            <SocialLink
              href="https://wa.me/5491139361854"
              icon={WhatsAppIcon}
              className="mt-4"
            >
              Escribime por WhatsApp
            </SocialLink>
            <SocialLink
              href="mailto:hernan.arica96@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              hernan.arica96@gmail.com
            </SocialLink>
          </ul>
        </Reveal>
      </div>
    </Container>
  )
}
