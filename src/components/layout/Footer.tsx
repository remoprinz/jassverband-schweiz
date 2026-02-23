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
      <div className="container-main py-12 lg:py-16">
        {/* Top row: Logo + Nav columns */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-0">
          {/* Left: Logo + Jester */}
          <div className="flex-shrink-0 lg:w-[35%] relative">
            <Image
              src="/images/logos/JVS Logo farbig weiss.svg"
              alt="Jassverband Schweiz"
              width={189}
              height={51}
              className="h-10 lg:h-[51px] w-auto"
              priority
            />
            {/* Jester – nur Desktop, abgeschnitten durch overflow:hidden */}
            <div className="hidden lg:block mt-4 relative" style={{ width: '203px', height: '280px' }}>
              <Image
                src="/images/cards/jester.png"
                alt="Jass Narr"
                fill
                className="object-contain object-top"
                sizes="203px"
              />
            </div>
          </div>

          {/* Right: Navigation + Rechtliches */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 lg:w-[55%]">
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

        {/* Copyright */}
        <p
          className="mt-12 lg:mt-8 lg:ml-[45%]"
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
    </footer>
  );
}
