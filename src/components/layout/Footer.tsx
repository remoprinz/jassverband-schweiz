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
      {/* Desktop: Figma 1440×390 proportional (ab lg, damit Landscape Mobile gestapelt bleibt) */}
      <div className="hidden lg:block container-main relative" style={{ aspectRatio: '1440 / 390' }}>
        {/* Logo – 189×51, top-left */}
        <div style={{ position: 'absolute', top: '12.3%', left: '0' }}>
          <Image
            src="/images/logos/JVS Logo farbig weiss.svg"
            alt="Jassverband Schweiz"
            width={189}
            height={51}
            className="w-auto"
            style={{ height: 'clamp(36px, 3.54vw, 51px)' }}
            priority
          />
        </div>

        {/* Jester – 203×333, abgeschnitten unten */}
        <div
          style={{
            position: 'absolute',
            left: '10.5%',
            top: '33%',
            width: '15.8%',
            aspectRatio: '203 / 333',
          }}
        >
          <Image
            src="/images/cards/jester.png"
            alt="Jass Narr"
            fill
            className="object-contain object-top"
            sizes="(max-width: 1440px) 15.8vw, 203px"
          />
        </div>

        {/* Navigation – rechts, 1. Spalte */}
        <div style={{ position: 'absolute', top: '12.3%', right: '19.7%', width: '17.5%' }}>
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
        </div>

        {/* Rechtliches – rechts, 2. Spalte */}
        <div style={{ position: 'absolute', top: '12.3%', right: '0', width: '17.5%' }}>
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

        {/* Copyright – linksbündig mit Navigation, eine Zeile */}
        <p
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '62.8%',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          {content.copyright}
        </p>
      </div>

      {/* Mobile + Tablet/Landscape: gestapelt */}
      <div className="lg:hidden px-6 py-12">
        <Image
          src="/images/logos/JVS Logo farbig weiss.svg"
          alt="Jassverband Schweiz"
          width={189}
          height={51}
          className="h-10 w-auto mb-10"
        />

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="mb-4" style={headingStyle}>Navigation</h4>
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
                  <Link href={item.href} className="transition-colors duration-200 hover:text-white" style={linkStyle}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4" style={headingStyle}>{content.legal}</h4>
            <ul className="space-y-3">
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

        <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}
