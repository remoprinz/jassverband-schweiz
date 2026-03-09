import { getTranslations } from 'next-intl/server';
import { Trust, Hero } from '@/components/sections';
import { MeisterschaftContent } from './MeisterschaftContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function SchweizermeisterschaftPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const howSteps = (
    t.raw('schweizermeisterschaft.how.steps') as Array<{ title: string; description: string }>
  );

  return (
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
  );
}
