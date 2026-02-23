import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const metadata: Record<string, { title: string; description: string; keywords: string[] }> = {
    de: {
      title: 'Jetzt Mitglied werden | Jassverband Schweiz',
      description: 'Werden Sie Gründungsmitglied im Jassverband Schweiz. Pionier-Status 2026, JassGuru Elo-System, limitiertes Gründungskartenset. Ab CHF 60/Jahr.',
      keywords: ['Jassverband Mitgliedschaft', 'Jass Verein beitreten', 'JVS Mitglied werden', 'Jass-Pionier', 'Jassverband Schweiz', 'Jass fördern'],
    },
    fr: {
      title: 'Devenir membre | Fédération Suisse de Jass',
      description: 'Devenez membre fondateur de la Fédération Suisse de Jass. Statut de pionnier 2026, système Elo JassGuru, jeu de cartes fondateur limité. Dès CHF 60/an.',
      keywords: ['Adhésion Fédération Jass', 'Rejoindre association Jass', 'Membre JVS', 'Jass-Pionnier', 'Fédération Suisse de Jass', 'Promouvoir le Jass'],
    },
    it: {
      title: 'Diventa membro | Federazione Svizzera di Jass',
      description: 'Diventate membro fondatore della Federazione Svizzera di Jass. Status di pioniere 2026, sistema Elo JassGuru, set di carte fondatore limitato. Da CHF 60/anno.',
      keywords: ['Adesione Federazione Jass', 'Iscriversi associazione Jass', 'Membro JVS', 'Jass-Pioniere', 'Federazione Svizzera di Jass', 'Promuovere il Jass'],
    },
  };

  const currentMeta = metadata[locale] || metadata.de;
  const baseUrl = 'https://jassverband.ch';

  const localeRoutes: Record<string, string> = {
    de: '/de/mitmachen',
    fr: '/fr/mitmachen',
    it: '/it/mitmachen',
  };

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    alternates: {
      canonical: `${baseUrl}${localeRoutes[locale]}`,
      languages: {
        de: `${baseUrl}/de/mitmachen`,
        fr: `${baseUrl}/fr/mitmachen`,
        it: `${baseUrl}/it/mitmachen`,
        'x-default': `${baseUrl}/de/mitmachen`,
      },
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `${baseUrl}${localeRoutes[locale]}`,
      siteName: 'Jassverband Schweiz',
      locale: locale === 'de' ? 'de_CH' : locale === 'fr' ? 'fr_CH' : 'it_CH',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function MitmachenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
