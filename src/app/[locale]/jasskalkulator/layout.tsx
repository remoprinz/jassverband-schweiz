import { Metadata } from 'next';

const BASE_URL = 'https://jassverband.ch';

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const meta: Record<string, { title: string; description: string; keywords: string[] }> = {
    de: {
      title: 'Jass-Kalkulator – Trumpf-Wahrscheinlichkeit berechnen | Jassverband Schweiz',
      description: 'Berechne die Wahrscheinlichkeit deiner Jass-Hand. Wähle deine 9 Karten und erhalte sofort die exakte Trumpf-Wahrscheinlichkeit – kostenlos und ohne Anmeldung.',
      keywords: ['Jass Kalkulator', 'Jass Wahrscheinlichkeit', 'Trumpf berechnen', 'Jass Tool', 'Jass Rechner', 'Jassverband Schweiz'],
    },
    fr: {
      title: 'Calculateur de Jass – Calculer la probabilité d\'atout | JVS',
      description: 'Calculez la probabilité de vos cartes de Jass. Sélectionnez vos 9 cartes et obtenez instantanément la probabilité exacte d\'atout – gratuit et sans inscription.',
      keywords: ['Calculateur Jass', 'Probabilité Jass', 'Calculer atout', 'Outil Jass', 'Fédération Suisse de Jass'],
    },
    it: {
      title: 'Calcolatore Jass – Calcola la probabilità di briscola | JVS',
      description: 'Calcola la probabilità delle tue carte di Jass. Seleziona le tue 9 carte e ottieni immediatamente la probabilità esatta di briscola – gratuito e senza registrazione.',
      keywords: ['Calcolatore Jass', 'Probabilità Jass', 'Calcola briscola', 'Strumento Jass', 'Federazione Svizzera di Jass'],
    },
  };

  const current = meta[locale] ?? meta.de;

  return {
    title: current.title,
    description: current.description,
    keywords: current.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/jasskalkulator`,
      languages: {
        de: `${BASE_URL}/de/jasskalkulator`,
        fr: `${BASE_URL}/fr/jasskalkulator`,
        it: `${BASE_URL}/it/jasskalkulator`,
        'x-default': `${BASE_URL}/de/jasskalkulator`,
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: `${BASE_URL}/${locale}/jasskalkulator`,
      siteName: 'Jassverband Schweiz',
      locale: locale === 'de' ? 'de_CH' : locale === 'fr' ? 'fr_CH' : 'it_CH',
      type: 'website',
      images: [{ url: `${BASE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: 'Jass-Kalkulator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default function JasskalkulatorLayout({ children }: Props) {
  return <>{children}</>;
}
