import { type Metadata, type Viewport } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { site, siteUrl } from '@/lib/site'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s - ${site.name}`,
    default: site.title,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  keywords: site.keywords,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: 'profile',
    locale: site.locale,
    siteName: site.name,
    url: '/',
    title: site.title,
    description: site.description,
    firstName: 'Hernán',
    lastName: 'Arica',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.fullName,
  givenName: 'Hernán',
  familyName: 'Arica',
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: site.jobTitle,
  email: `mailto:${site.email}`,
  worksFor: {
    '@type': 'Organization',
    name: 'Spotter',
    url: 'https://www.gospotter.app',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buenos Aires',
    addressCountry: 'AR',
  },
  alumniOf: { '@type': 'EducationalOrganization', name: 'Escuela Da Vinci' },
  knowsAbout: site.keywords.slice(4),
  sameAs: [site.links.github, site.links.linkedin],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
