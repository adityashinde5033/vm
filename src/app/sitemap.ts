import type { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';

const SITE = 'https://vm.ketoy.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogs.map((b) => ({
      url: `${SITE}/blogs/${b.slug}`,
      lastModified: b.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
