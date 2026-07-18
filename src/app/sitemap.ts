import { MetadataRoute } from 'next';
import { articles } from '@/lib/news/articles';
import { tournaments, isTournamentVisibleInLocale } from '@/lib/tournaments/tournaments';

const BASE_URL = 'https://jassverband.ch';
const LOCALES = ['de', 'fr', 'it'] as const;

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

const staticPages: {
  path: string;
  priority: number;
  changeFreq: ChangeFrequency;
  lastModified: string;
}[] = [
  { path: '',                        priority: 1.0,  changeFreq: 'weekly',  lastModified: '2026-03-01' },
  { path: '/mitmachen',              priority: 0.95, changeFreq: 'weekly',  lastModified: '2026-03-01' },
  { path: '/schweizermeisterschaft', priority: 0.9,  changeFreq: 'weekly',  lastModified: '2026-03-01' },
  // /turniere-Index kommt weiter unten dynamisch dazu — nur in Sprachen mit sichtbaren Turnieren
  { path: '/plattform',              priority: 0.9,  changeFreq: 'weekly',  lastModified: '2026-03-01' },
  { path: '/news',                   priority: 0.9,  changeFreq: 'weekly',  lastModified: '2026-03-01' },
  { path: '/research',               priority: 0.85, changeFreq: 'monthly', lastModified: '2026-07-17' },
  { path: '/research/wie-alphajass-denkt', priority: 0.8, changeFreq: 'monthly', lastModified: '2026-07-17' },
  { path: '/research/wie-stark-alphajass-spielt', priority: 0.8, changeFreq: 'monthly', lastModified: '2026-07-17' },
  { path: '/verband',                priority: 0.8,  changeFreq: 'monthly', lastModified: '2026-02-01' },
  { path: '/projekte',               priority: 0.8,  changeFreq: 'monthly', lastModified: '2026-02-01' },
  { path: '/jasskalkulator',         priority: 0.75, changeFreq: 'monthly', lastModified: '2026-02-01' },
  { path: '/partner',                priority: 0.7,  changeFreq: 'monthly', lastModified: '2026-02-01' },
  { path: '/kontakt',                priority: 0.6,  changeFreq: 'yearly',  lastModified: '2026-01-15' },
  { path: '/impressum',              priority: 0.3,  changeFreq: 'yearly',  lastModified: '2026-01-15' },
  { path: '/datenschutz',            priority: 0.3,  changeFreq: 'yearly',  lastModified: '2026-01-15' },
  // mitmachen/erfolg wird bewusst NICHT indexiert (Danke-Seite)
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Statische Seiten — alle 3 Sprachen als separate Einträge mit Hreflang-Alternates
  for (const page of staticPages) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${page.path}`;
    }
    languages['x-default'] = `${BASE_URL}/de${page.path}`;

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: page.changeFreq,
        priority: locale === 'de' ? page.priority : Math.max(page.priority - 0.05, 0.1),
        alternates: { languages },
      });
    }
  }

  // News-Artikel — alle 3 Sprachen, lastModified aus Artikelmetadaten
  for (const article of articles) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}/news/${article.slug}`;
    }
    languages['x-default'] = `${BASE_URL}/de/news/${article.slug}`;

    const lastModified = new Date(article.updatedAt || article.publishedAt);
    const basePriority = article.featured ? 0.8 : 0.6;

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/news/${article.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: locale === 'de' ? basePriority : Math.max(basePriority - 0.05, 0.1),
        alternates: { languages },
      });
    }
  }

  // Turniere — NUR in freigeschalteten Sprachen (Soft-Launch; aktuell FR).
  // Keine leeren DE/IT-Turnierseiten im Sitemap bewerben.
  const localesWithTournaments = new Set<string>();
  for (const tournament of tournaments) {
    const visibleLocales = LOCALES.filter((locale) => isTournamentVisibleInLocale(tournament, locale));
    if (visibleLocales.length === 0) continue;

    const languages: Record<string, string> = {};
    for (const locale of visibleLocales) {
      languages[locale] = `${BASE_URL}/${locale}/turniere/${tournament.slug}`;
    }
    languages['x-default'] = languages[visibleLocales[0]];

    const lastModified = new Date(tournament.updatedAt || tournament.publishedAt);
    const basePriority = tournament.featured ? 0.8 : 0.6;

    for (const locale of visibleLocales) {
      localesWithTournaments.add(locale);
      entries.push({
        url: `${BASE_URL}/${locale}/turniere/${tournament.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: locale === 'de' ? basePriority : Math.max(basePriority - 0.05, 0.1),
        alternates: { languages },
      });
    }
  }

  // Turnier-Übersicht — nur in Sprachen mit sichtbaren Turnieren
  if (localesWithTournaments.size > 0) {
    const indexLocales = Array.from(localesWithTournaments);
    const indexLanguages: Record<string, string> = {};
    for (const locale of indexLocales) {
      indexLanguages[locale] = `${BASE_URL}/${locale}/turniere`;
    }
    indexLanguages['x-default'] = indexLanguages[indexLocales[0]];

    for (const locale of indexLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/turniere`,
        lastModified: new Date('2026-07-16'),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: { languages: indexLanguages },
      });
    }
  }

  return entries;
}
