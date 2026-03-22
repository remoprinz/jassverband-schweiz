import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SocialIconLinks } from '@/components/layout/SocialIconLinks';

interface FooterProps {
  locale: string;
  content: {
    tagline: string;
    legal: string;
    impressum: string;
    datenschutz: string;
    copyright: string;
  };
  nav: {
    home: string;
    schweizermeisterschaft: string;
    plattformen: string;
    verband: string;
    news: string;
    kontakt: string;
    mitmachen: string;
  };
}

const linkStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 400 as const,
  fontSize: '15px',
  color: 'rgba(255, 255, 255, 0.6)',
};

const headingStyle = {
  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
  fontWeight: 700 as const,
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 0.95)',
};

export function Footer({ locale, content, nav }: FooterProps) {
  const [showDame] = useState(() => Math.random() < 0.5);
  const normalizedLocale = locale === 'fr' || locale === 'it' ? locale : 'de';
  const footerLogoByLocale = {
    de: '/images/logos/JVS Logo farbig weiss.svg',
    fr: '/images/logos/JVS Logo 100mm farbig weiss FR.svg',
    it: '/images/logos/JVS Logo 100mm farbig weiss IT.svg',
  } as const;
  const footerLogoSrc = footerLogoByLocale[normalizedLocale];

  return (
    <footer data-footer className="bg-black overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden container-main pt-10 pb-4">
        <div className="flex flex-col items-start gap-6 text-left">
          {/* Logo */}
          <Image
            src={footerLogoSrc}
            alt="Jassverband Schweiz"
            width={189}
            height={51}
            className="h-10 w-auto self-start block"
            priority
          />
          <SocialIconLinks variant="on-dark" size="md" locale={locale} />

          {/* Links Figur unten bündig; Rechtliches + Copyright nur rechts (kein volle-Breite-Block unten) */}
          <div className="grid w-full grid-cols-2 gap-6 sm:gap-8 items-stretch">
            <div className="flex min-h-[200px] w-full max-w-[220px] min-w-0 flex-col justify-end overflow-hidden">
              {showDame ? (
                <div className="relative h-[200px] w-full shrink-0">
                  <Image
                    src="/images/cards/jesterdame.png"
                    alt="Jass Dame"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 1024px) 40vw, 220px"
                  />
                </div>
              ) : (
                <div className="relative mt-auto h-[280px] w-[170px] max-w-full shrink-0 sm:h-[292px] sm:w-[180px]">
                  <Image
                    src="/images/cards/jester.png"
                    alt="Jass Narr"
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1024px) 40vw, 180px"
                  />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col justify-start text-left">
              <h4 className="mb-4" style={headingStyle}>{content.legal}</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href={`/${locale}/impressum`} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                    {content.impressum}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/datenschutz`} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                    {content.datenschutz}
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <a href="mailto:info@jassverband.ch" className="inline-block transition-colors duration-200 hover:text-white" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                  info@jassverband.ch
                </a>
              </div>
              <p
                className="mt-5"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.35)',
                }}
              >
                {content.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Logo im normalen Fluss → gleiche linke Kante wie Header (absolute left:0 liegt vor dem Padding) */}
      <div className="hidden lg:block min-h-[390px]">
        <div
          className="container-main flex flex-row justify-between items-start pt-16"
          style={{ minHeight: '390px' }}
        >
          <div
            className={`relative flex h-[326px] shrink-0 flex-row gap-4 lg:gap-6 xl:gap-8 ${
              showDame ? 'items-stretch' : 'items-start'
            }`}
          >
            <Image
              src={footerLogoSrc}
              alt="Jassverband Schweiz"
              width={189}
              height={51}
              className={showDame ? 'shrink-0 self-start' : 'shrink-0'}
              priority
            />
            {showDame ? (
              <div className="flex h-full w-[322px] shrink-0 flex-col justify-end">
                <div className="relative h-[242px] w-full">
                  <Image
                    src="/images/cards/jesterdame.png"
                    alt="Jass Dame"
                    fill
                    className="object-contain object-bottom"
                    sizes="322px"
                  />
                </div>
              </div>
            ) : (
              <div className="relative mt-[80px] h-[333px] w-[203px] shrink-0">
                <Image
                  src="/images/cards/jester.png"
                  alt="Jass Narr"
                  fill
                  className="object-contain object-top"
                  sizes="203px"
                />
              </div>
            )}
          </div>

          <div className="flex shrink-0 justify-end" style={{ gap: '120px' }}>
            {/* Navigation */}
            <div className="flex flex-col" style={{ width: '140px', height: '260px' }}>
              <h4 className="mb-4" style={headingStyle}>Navigation</h4>
              <ul className="space-y-2">
                {[
                  { href: `/${locale}`, label: nav.home },
                  { href: `/${locale}/schweizermeisterschaft`, label: nav.schweizermeisterschaft },
                  { href: `/${locale}/plattform`, label: nav.plattformen },
                  { href: `/${locale}/verband`, label: nav.verband },
                  { href: `/${locale}/news`, label: nav.news },
                  { href: `/${locale}/kontakt`, label: nav.kontakt },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p
                className="mt-auto pt-8"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.35)',
                  whiteSpace: 'nowrap',
                }}
              >
                {content.copyright}
              </p>
            </div>

            {/* Rechtliches */}
            <div style={{ width: '180px' }}>
              <h4 className="mb-4" style={headingStyle}>{content.legal}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/impressum`} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                    {content.impressum}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/datenschutz`} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                    {content.datenschutz}
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <a href="mailto:info@jassverband.ch" className="inline-block transition-colors duration-200 hover:text-white" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                  info@jassverband.ch
                </a>
              </div>
              <div className="mt-6">
                <SocialIconLinks variant="on-dark" size="md" locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
