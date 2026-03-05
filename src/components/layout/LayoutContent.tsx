'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainWrapper } from './MainWrapper';

interface LayoutContentProps {
  children: React.ReactNode;
  locale: string;
  isHeroPage: boolean;
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

export function LayoutContent({ children, locale, isHeroPage, nav, footer }: LayoutContentProps) {
  const pathname = usePathname();
  const isStandalonePage = pathname.includes('/jasskalkulator');

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
