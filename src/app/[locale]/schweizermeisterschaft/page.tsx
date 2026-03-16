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
      description: 'Die erste offizielle Schweizermeisterschaft im Team-Schieber. Gründe deine Gruppe auf JassGuru, qualifiziere dich und kämpfe um den Titel. Saison 1 startet 2026.',
    },
    fr: {
      title: 'Championnat Suisse de Jass | Fédération Suisse de Jass',
      description: 'Le premier championnat officiel de Jass en équipe. Créez votre groupe sur JassGuru, qualifiez-vous et battez-vous pour le titre. Saison 1 commence en 2026.',
    },
    it: {
      title: 'Campionato Svizzero di Jass | Federazione Svizzera di Jass',
      description: 'Il primo campionato ufficiale di Jass a squadre. Crea il tuo gruppo su JassGuru, qualificati e lotta per il titolo. Stagione 1 inizia nel 2026.',
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
    ? 'Erste offizielle Schweizer Jassmeisterschaft 2026'
    : locale === 'fr'
    ? 'Premier Championnat Officiel Suisse de Jass 2026'
    : 'Primo Campionato Ufficiale Svizzero di Jass 2026',
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
    ? 'Die erste offizielle Schweizermeisterschaft im Team-Schieber, organisiert vom Jassverband Schweiz.'
    : locale === 'fr'
    ? 'Le premier championnat officiel de Jass en équipe, organisé par la Fédération Suisse de Jass.'
    : 'Il primo campionato ufficiale di Jass a squadre, organizzato dalla Federazione Svizzera di Jass.',
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
      <Hero
        title={t('schweizermeisterschaft.hero.title')}
        {...(locale === 'de' ? { mobileTitle: 'Erste offizielle\nSchweizer-\nmeisterschaft\nim Teamjassen.' } : {})}
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
        teamCopy3={t('schweizermeisterschaft.team.copy3')}
        jassguruTitle={t('schweizermeisterschaft.jassguru.title')}
        jassguruCopy={t('schweizermeisterschaft.jassguru.copy')}
        jassguruCta={t('schweizermeisterschaft.jassguru.cta')}
        jassguruTafelLabel={t('schweizermeisterschaft.jassguru.tafelLabel')}
        jassguruTafelLink={t('schweizermeisterschaft.jassguru.tafelLink')}
        jassguruGroupLabel={t('schweizermeisterschaft.jassguru.groupLabel')}
        jassguruGroupLink={t('schweizermeisterschaft.jassguru.groupLink')}
        jassguruProfileLabel={t('schweizermeisterschaft.jassguru.profileLabel')}
        jassguruProfileLink={t('schweizermeisterschaft.jassguru.profileLink')}
        jassguruAltScreenshot={t('schweizermeisterschaft.jassguru.altScreenshot')}
        jassguruAltGroup={t('schweizermeisterschaft.jassguru.altGroup')}
        jassguruAltProfile={t('schweizermeisterschaft.jassguru.altProfile')}
        howTitle={t('schweizermeisterschaft.how.title')}
        howIntro={t('schweizermeisterschaft.how.intro')}
        howSteps={howSteps}
        howFootnote={t('schweizermeisterschaft.how.footnote')}
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
