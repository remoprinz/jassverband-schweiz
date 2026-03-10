import { SystemrelevanzVideo } from '@/components/sections/SystemrelevanzVideo';
import { Footer } from '@/components/layout/Footer';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Jassen ist systemrelevant | Jassverband Schweiz',
    description: 'Weshalb braucht die Schweiz einen nationalen Jassverband? Alain Berset erklärt es.',
  };
}

export default async function VideoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  const nav = {
    home: t('nav.home'),
    schweizermeisterschaft: t('nav.schweizermeisterschaft'),
    plattformen: t('nav.plattformen'),
    verband: t('nav.verband'),
    news: t('nav.news'),
    kontakt: t('nav.kontakt'),
    mitmachen: t('nav.mitmachen'),
  };

  const footer = {
    tagline: t('footer.tagline'),
    legal: t('footer.legal'),
    impressum: t('footer.impressum'),
    datenschutz: t('footer.datenschutz'),
    copyright: t('footer.copyright'),
  };

  return (
    <>
      {/* Video — mit Standard-Abständen wie andere Seiten */}
      <main className="min-h-screen bg-black">
        <div className="w-full">
          <SystemrelevanzVideo title="Weshalb braucht es den Jassverband?" />
        </div>
      </main>

      {/* Footer mit Standard-Abständen */}
      <Footer locale={locale} content={footer} nav={nav} />
    </>
  );
}
