import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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
      <div className="lg:hidden container-main py-12">
        <div className="flex flex-col items-start gap-10 text-left">
          {/* Logo */}
          <Image
            src={footerLogoSrc}
            alt="Jassverband Schweiz"
            width={189}
            height={51}
            className="h-10 w-auto self-start block"
            priority
          />

          {/* Navigation + Rechtliches Grid */}
          <div className="grid w-full grid-cols-2 gap-8 justify-items-start">
            {/* Navigation */}
            <div>
              <h4 className="mb-4" style={headingStyle}>Navigation</h4>
              <ul className="space-y-2.5">
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
                className="mt-6"
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
            <div>
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
                <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.4)' }}>
                  Hirslanderstrasse 34<br />8032 Zürich
                </p>
                <a href="mailto:info@jassverband.ch" className="inline-block mt-2 transition-colors duration-200 hover:text-white" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                  info@jassverband.ch
                </a>
              </div>
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
          <div className="relative flex h-[326px] shrink-0 flex-row items-start gap-4 lg:gap-6 xl:gap-8">
            <Image
              src={footerLogoSrc}
              alt="Jassverband Schweiz"
              width={189}
              height={51}
              className="shrink-0"
              priority
            />
            <div
              className={`relative mt-[70px] shrink-0 ${showDame ? 'h-[210px] w-[280px]' : 'h-[333px] w-[203px]'}`}
            >
              <Image
                src={showDame ? '/images/cards/jesterdame.png' : '/images/cards/jester.png'}
                alt={showDame ? 'Jass Dame' : 'Jass Narr'}
                fill
                className="object-contain object-top"
                sizes={showDame ? '280px' : '203px'}
              />
            </div>
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
                <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.4)' }}>
                  Hirslanderstrasse 34<br />8032 Zürich
                </p>
                <a href="mailto:info@jassverband.ch" className="inline-block mt-2 transition-colors duration-200 hover:text-white" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                  info@jassverband.ch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
