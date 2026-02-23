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
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#000000', height: '390px' }}
    >
      <div className="container-main relative h-full">
        {/* Logo – 189×51, oben links */}
        <div className="absolute" style={{ top: '48px', left: '0' }}>
          <Image
            src="/images/logos/JVS Logo farbig weiss.svg"
            alt="Jassverband Schweiz"
            width={189}
            height={51}
            className="w-auto"
            style={{ height: '51px' }}
            priority
          />
        </div>

        {/* Jester – 203×333, wird unten abgeschnitten */}
        <div
          className="hidden md:block absolute"
          style={{
            left: '80px',
            top: '140px',
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

        {/* Navigation – 252×232 */}
        <div
          className="absolute"
          style={{
            right: '252px',
            top: '48px',
            width: '252px',
          }}
        >
          <h4 className="mb-5" style={headingStyle}>
            Navigation
          </h4>
          <ul className="space-y-3">
            {[
              { href: `/${locale}`, label: nav.home },
              { href: `/${locale}/verband`, label: nav.verband },
              { href: `/${locale}/news`, label: nav.news },
              { href: `/${locale}/projekte`, label: nav.projekte },
              { href: `/${locale}/partner`, label: nav.partner },
              { href: `/${locale}/kontakt`, label: nav.kontakt },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-white"
                  style={linkStyle}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Rechtliches – 252×232 */}
        <div
          className="absolute"
          style={{
            right: '0',
            top: '48px',
            width: '252px',
          }}
        >
          <h4 className="mb-5" style={headingStyle}>
            {content.legal}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href={`/${locale}/impressum`}
                className="transition-colors duration-200 hover:text-white"
                style={linkStyle}
              >
                {content.impressum}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/datenschutz`}
                className="transition-colors duration-200 hover:text-white"
                style={linkStyle}
              >
                {content.datenschutz}
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <p
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Hirslanderstrasse 34<br />
              8032 Zürich
            </p>
            <a
              href="mailto:info@jassverband.ch"
              className="inline-block mt-2 transition-colors duration-200 hover:text-white"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              info@jassverband.ch
            </a>
          </div>
        </div>

        {/* Copyright – 342×20, linksbündig zum Navigationsblock */}
        <p
          className="absolute text-left"
          style={{
            bottom: '24px',
            right: '504px',
            width: '342px',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}
