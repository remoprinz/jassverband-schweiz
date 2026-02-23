import Link from 'next/link';
import Image from 'next/image';

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
    verband: string;
    news: string;
    projekte: string;
    partner: string;
    kontakt: string;
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
  return (
    <footer className="bg-black overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden container-main py-12">
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <Image
            src="/images/logos/JVS Logo farbig weiss.svg"
            alt="Jassverband Schweiz"
            width={189}
            height={51}
            className="h-10 w-auto"
            priority
          />

          {/* Navigation + Rechtliches Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation */}
            <div>
              <h4 className="mb-4" style={headingStyle}>Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { href: `/${locale}`, label: nav.home },
                  { href: `/${locale}/verband`, label: nav.verband },
                  { href: `/${locale}/news`, label: nav.news },
                  { href: `/${locale}/projekte`, label: nav.projekte },
                  { href: `/${locale}/partner`, label: nav.partner },
                  { href: `/${locale}/kontakt`, label: nav.kontakt },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Copyright direkt unter Kontakt */}
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

      {/* Desktop Layout – Figma: 1440 x 390px */}
      <div className="hidden lg:block relative" style={{ height: '390px' }}>
        <div className="container-main h-full relative">
          {/* Logo – oben links */}
          <div className="absolute" style={{ top: '64px', left: '0' }}>
            <Image
              src="/images/logos/JVS Logo farbig weiss.svg"
              alt="Jassverband Schweiz"
              width={189}
              height={51}
              priority
            />
          </div>

          {/* Jester – weiter rechts, ragt nach unten raus */}
          <div 
            className="absolute"
            style={{ 
              top: '150px',
              left: '200px',
              width: '203px', 
              height: '333px',
            }}
          >
            <Image
              src="/images/cards/jester.png"
              alt="Jass Narr"
              fill
              className="object-contain object-top"
              sizes="203px"
            />
          </div>

          {/* Navigation + Rechtliches – Flex-Layout, rechtsbündig mit Content */}
          <div 
            className="flex justify-end gap-16"
            style={{ paddingTop: '64px' }}
          >
            {/* Navigation */}
            <div style={{ width: '140px' }}>
              <h4 className="mb-4" style={headingStyle}>Navigation</h4>
              <ul className="space-y-2">
                {[
                  { href: `/${locale}`, label: nav.home },
                  { href: `/${locale}/verband`, label: nav.verband },
                  { href: `/${locale}/news`, label: nav.news },
                  { href: `/${locale}/projekte`, label: nav.projekte },
                  { href: `/${locale}/partner`, label: nav.partner },
                  { href: `/${locale}/kontakt`, label: nav.kontakt },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Copyright direkt unter Kontakt */}
              <p
                className="mt-4"
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
