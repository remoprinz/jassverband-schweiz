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

function FooterLogo() {
  return (
    <Image
      src="/images/logos/JVS Logo farbig weiss.svg"
      alt="Jassverband Schweiz"
      width={200}
      height={54}
      className="h-12 md:h-14 w-auto"
    />
  );
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
    <footer className="relative overflow-visible" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container-main py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Left: Logo + Jester (overflows bottom) */}
          <div className="md:col-span-5 lg:col-span-4 relative">
            <FooterLogo />

            <div className="hidden md:block relative mt-6" style={{ height: '320px' }}>
              <div
                className="absolute left-0"
                style={{ width: '220px', height: '380px', top: '0' }}
              >
                <Image
                  src="/images/cards/jester.png"
                  alt="Jass Narr"
                  fill
                  className="object-contain object-top"
                  sizes="220px"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-4">
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

          {/* Rechtliches */}
          <div className="md:col-span-4 lg:col-span-4">
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

            {/* Adresse */}
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
        </div>

        {/* Copyright */}
        <div
          className="mt-16 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
