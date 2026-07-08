import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cfranci.github.io',
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
