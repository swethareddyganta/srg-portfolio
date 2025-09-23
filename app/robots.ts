import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const host = 'https://srg-portfolio.vercel.app'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  }
}


