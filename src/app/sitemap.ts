import { MetadataRoute } from 'next';
import { articles } from '@/lib/news/articles';

const BASE_URL = 'https://jassverband.ch';
const LOCALES = ['de', 'fr', 'it'] as const;

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as ChangeFrequency },
    { path: '/verband', priority: 0.8, changeFreq: 'monthly' as ChangeFrequency },
    { path: '/projekte', priority: 0.8, changeFreq: 'monthly' as ChangeFrequency },
    { path: '/partner', priority: 0.7, changeFreq: 'monthly' as ChangeFrequency },
    { path: '/kontakt', priority: 0.6, changeFreq: 'yearly' as ChangeFrequency },
    { path: '/news', priority: 0.9, changeFreq: 'weekly' as ChangeFrequency },
    { path: '/impressum', priority: 0.3, changeFreq: 'yearly' as ChangeFrequency },
    { path: '/datenschutz', priority: 0.3, changeFreq: 'yearly' as ChangeFrequency },
  ];

  for (const page of staticPages) {
    const alternates: Record<string, string> = {};
    
    for (const locale of LOCALES) {
      alternates[locale] = `${BASE_URL}/${locale}${page.path}`;
    }
    alternates['x-default'] = `${BASE_URL}/de${page.path}`;

    entries.push({
      url: `${BASE_URL}/de${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority,
      alternates: { languages: alternates },
    });
  }

  for (const article of articles) {
    const alternates: Record<string, string> = {};
    
    for (const locale of LOCALES) {
      alternates[locale] = `${BASE_URL}/${locale}/news/${article.slug}`;
    }
    alternates['x-default'] = `${BASE_URL}/de/news/${article.slug}`;

    entries.push({
      url: `${BASE_URL}/de/news/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: 'monthly',
      priority: article.featured ? 0.8 : 0.6,
      alternates: { languages: alternates },
    });
  }

  return entries;
}
