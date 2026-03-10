import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Trust, Hero } from '@/components/sections';
import { MeisterschaftContent } from './MeisterschaftContent';

const BASE_URL = 'https://jassverband.ch';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const meta: Record<string, { title: string; description: string }> = {
    de: {
      title: 'Schweizer Jassmeisterschaft | Jassverband Schweiz',
      description: 'Die nationale Jass-Meisterschaft der Schweiz. Spiele Schieber im Zweierteam und kämpfe um den Schweizer Meistertitel. Jetzt Mitglied werden und teilnehmen.',
    },
    fr: {
      title: 'Championnat Suisse de Jass | Fédération Suisse de Jass',
      description: 'Le championnat national de Jass en Suisse. Jouez au Schieber en équipe de deux et battez-vous pour le titre de champion suisse. Devenez membre maintenant.',
    },
    it: {
      title: 'Campionato Svizzero di Jass | Federazione Svizzera di Jass',
      description: 'Il campionato nazionale di Jass in Svizzera. Gioca a Schieber in coppia e lotta per il titolo di campione svizzero. Diventa membro ora.',
    },
  };

  const current = meta[locale] ?? meta.de;

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/schweizermeisterschaft`,
      languages: {
        de: `${BASE_URL}/de/schweizermeisterschaft`,
        fr: `${BASE_URL}/fr/schweizermeisterschaft`,
        it: `${BASE_URL}/it/schweizermeisterschaft`,
        'x-default': `${BASE_URL}/de/schweizermeisterschaft`,
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: `${BASE_URL}/${locale}/schweizermeisterschaft`,
      siteName: 'Jassverband Schweiz',
      locale: locale === 'de' ? 'de_CH' : locale === 'fr' ? 'fr_CH' : 'it_CH',
      type: 'website',
      images: [{ url: `${BASE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: current.title }],
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

const sportsEventJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: locale === 'de'
    ? 'Schweizer Jassmeisterschaft 2026'
    : locale === 'fr'
    ? 'Championnat Suisse de Jass 2026'
    : 'Campionato Svizzero di Jass 2026',
  sport: 'Jass',
  organizer: {
    '@type': 'Organization',
    name: 'Jassverband Schweiz',
    url: BASE_URL,
  },
  location: {
    '@type': 'Country',
    name: 'Schweiz',
    sameAs: 'https://www.wikidata.org/wiki/Q39',
  },
  url: `${BASE_URL}/${locale}/schweizermeisterschaft`,
  description: locale === 'de'
    ? 'Die nationale Jass-Meisterschaft der Schweiz, organisiert vom Jassverband Schweiz.'
    : locale === 'fr'
    ? 'Le championnat national de Jass en Suisse, organisé par la Fédération Suisse de Jass.'
    : 'Il campionato nazionale di Jass in Svizzera, organizzato dalla Federazione Svizzera di Jass.',
});

export default async function SchweizermeisterschaftPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const howSteps = (
    t.raw('schweizermeisterschaft.how.steps') as Array<{ title: string; description: string }>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd(locale)) }}
      />
    <div>
      {/*
       * heroTitleTopDesktop: Titel startet auf Desktop/Tablet höher (16% statt 24.35%),
       * damit die 3-zeilige Überschrift Platz hat, ohne die Subtitle-Position zu ändern.
       * Die Subtitle bleibt bei exakt derselben CSS-Variable wie auf der Homepage.
       */}
      <Hero
        title={t('schweizermeisterschaft.hero.title')}
        subtitle={t('schweizermeisterschaft.hero.subtitle')}
        cta={t('schweizermeisterschaft.hero.cta')}
        locale={locale}
        ctaHref={`/${locale}/mitmachen`}
        preserveTitleLineBreaks
        mobileFlow
        heroTitleTopDesktop="16%"
        wreath
        altTable={t('hero.altTable')}
        altFelt={t('hero.altFelt')}
        altCard={t('hero.altCard')}
      />

      <MeisterschaftContent
        teamTitle={t('schweizermeisterschaft.team.title')}
        teamCopy1={t('schweizermeisterschaft.team.copy1')}
        teamCopy2={t('schweizermeisterschaft.team.copy2')}
        howTitle={t('schweizermeisterschaft.how.title')}
        howIntro={t('schweizermeisterschaft.how.intro')}
        howSteps={howSteps}
        homeTitle={t('schweizermeisterschaft.home.title')}
        homeCopy={t('schweizermeisterschaft.home.copy')}
        homeStrichIntro={t('schweizermeisterschaft.home.strichIntro')}
        homeStrich1Title={t('schweizermeisterschaft.home.strich1Title')}
        homeStrich1Desc={t('schweizermeisterschaft.home.strich1Desc')}
        homeStrich2Title={t('schweizermeisterschaft.home.strich2Title')}
        homeStrich2Desc={t('schweizermeisterschaft.home.strich2Desc')}
        homeStrichConclusion={t('schweizermeisterschaft.home.strichConclusion')}
        profileTitle={t('schweizermeisterschaft.home.profileTitle')}
        profileCopy={t('schweizermeisterschaft.home.profileCopy')}
        titlesTitle={t('schweizermeisterschaft.titles.title')}
        titlesIntro={t('schweizermeisterschaft.titles.intro')}
        titlesOpen={t('schweizermeisterschaft.titles.open')}
        titlesOpenSub={t('schweizermeisterschaft.titles.openSub')}
        titlesYouth={t('schweizermeisterschaft.titles.youth')}
        titlesYouthSub={t('schweizermeisterschaft.titles.youthSub')}
        memberTitle={t('schweizermeisterschaft.titles.memberTitle')}
        memberCopy={t('schweizermeisterschaft.titles.memberCopy')}
        ctaMember={t('schweizermeisterschaft.titles.ctaMember')}
        ctaTeam={t('schweizermeisterschaft.titles.ctaTeam')}
        locale={locale}
        altFelt={t('schweizermeisterschaft.altFelt')}
        altChalkboard={t('schweizermeisterschaft.altChalkboard')}
      />

      <Trust
        badge={t('trust.badge')}
        text={t('trust.text')}
        description={t('trust.description')}
        linkText={t('trust.linkText')}
        altBadge={t('trust.altBadge')}
      />
    </div>
    </>
  );
}
