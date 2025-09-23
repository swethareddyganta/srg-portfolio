import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://srg-portfolio.vercel.app'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}


