import { type MetadataRoute } from 'next'

import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  let lastModified = new Date()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/stack`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
