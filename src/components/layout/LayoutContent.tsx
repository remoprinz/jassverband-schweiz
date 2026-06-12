'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainWrapper } from './MainWrapper';

// Seiten mit Full-Bleed-Hero hinter dem Header (Header transparent statt solid).
// Client-seitig aus usePathname() abgeleitet — KEIN headers() im Layout, damit
// alle Seiten statisch generiert + vom Edge gecacht bleiben.
const HERO_PAGES = ['', '/', '/plattform', '/schweizermeisterschaft', '/verband', '/mitmachen'];

interface LayoutContentProps {
  children: React.ReactNode;
  locale: string;
  nav: {
    home: string;
    schweizermeisterschaft: string;
    plattformen: string;
    verband: string;
    news: string;
    kontakt: string;
    mitmachen: string;
  };
  footer: {
    tagline: string;
    legal: string;
    impressum: string;
    datenschutz: string;
    copyright: string;
  };
}

export function LayoutContent({ children, locale, nav, footer }: LayoutContentProps) {
  const pathname = usePathname();
  const isStandalonePage = pathname.includes('/jasskalkulator');

  const withoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length)
    : pathname;
  const normalizedSuffix = withoutLocale === '/' ? '' : withoutLocale.replace(/\/$/, '');
  const isHeroPage = HERO_PAGES.includes(normalizedSuffix);

  if (isStandalonePage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header locale={locale} nav={nav} isHeroPage={isHeroPage} />
      <MainWrapper isHeroPage={isHeroPage}>
        {children}
      </MainWrapper>
      <Footer locale={locale} content={footer} nav={nav} />
    </>
  );
}
