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

const FOOTER_JASSGURU_LOGO = '/images/logos/jassguru-logo-weiss.png';

export function Footer({ locale, content, nav }: FooterProps) {
  const [showDame] = useState(() => Math.random() < 0.5);

  return (
    <footer data-footer className="bg-black overflow-hidden">
      {/* Mobile Layout */}
      <div
        className="lg:hidden container-main pt-10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex flex-col items-start gap-5 text-left">
          {/* Logo */}
          <Image
            src={FOOTER_JASSGURU_LOGO}
            alt="JassGuru"
            width={1152}
            height={252}
            className="h-9 w-auto max-w-full self-start sm:h-10"
            priority
          />
          <SocialIconLinks variant="on-dark" size="md" locale={locale} />

          <div className="flex w-full items-stretch gap-5 sm:gap-7">
            {/* Mobile: nur Narr; translate-y an Zeilenhöhe angepasst, unten ohne extra pb (nur safe-area) */}
            <div className="flex min-h-0 min-w-0 basis-0 flex-[1_1_0%] flex-col overflow-hidden">
              <div className="relative min-h-[180px] w-full flex-1 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[128%] w-[min(100%,188px)] -translate-x-1/2 translate-y-[18%]">
                  <Image
                    src="/images/cards/jester.png"
                    alt="Jass Narr"
                    fill
                    className="pointer-events-none object-contain object-top"
                    sizes="(max-width: 1024px) 46vw, 188px"
                  />
                </div>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 basis-0 flex-[1_1_0%] flex-col justify-start text-left">
              <h4 className="mb-2.5" style={headingStyle}>{content.legal}</h4>
              <ul className="space-y-1.5">
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
              <div className="mt-3.5">
                <a href="mailto:info@jassverband.ch" className="inline-block transition-colors duration-200 hover:text-white" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  info@jassverband.ch
                </a>
              </div>
              <p
                className="mt-2.5"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 1.35,
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
              src={FOOTER_JASSGURU_LOGO}
              alt="JassGuru"
              width={1152}
              height={252}
              className={`h-[52px] w-auto shrink-0 ${showDame ? 'self-start' : ''}`}
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
