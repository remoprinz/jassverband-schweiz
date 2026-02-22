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

export function Footer({ locale, content, nav }: FooterProps) {
  return (
    <footer style={{ backgroundColor: '#000000' }}>
      <div className="container-main py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            {/* Tagline - Figma: Inter Regular 15px */}
            <p 
              className="mt-5 max-w-xs"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              {content.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="mb-5"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
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
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: '15px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 
              className="mb-5"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {content.legal}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={`/${locale}/impressum`} 
                  className="transition-colors duration-200 hover:text-white"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {content.impressum}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/datenschutz`} 
                  className="transition-colors duration-200 hover:text-white"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {content.datenschutz}
                </Link>
              </li>
            </ul>
            
            {/* Contact Info */}
            <div className="mt-8">
              <p 
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.4)'
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
                  color: 'rgba(255, 255, 255, 0.4)'
                }}
              >
                info@jassverband.ch
              </a>
            </div>
          </div>

          {/* Jester Illustration */}
          <div className="hidden lg:flex items-end justify-center">
            <div className="relative w-36 h-44 opacity-70">
              <Image
                src="/images/cards/jester.png"
                alt="Jass Narr"
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <p 
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.4)'
            }}
          >
            {content.copyright}
          </p>
          
          {/* Lebendige Traditionen Badge */}
          <div className="flex items-center gap-3">
            <span 
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              Gelistet beim Bundesamt für Kultur als
            </span>
            <div className="relative w-24 h-8">
              <Image
                src="/images/badges/lebendige-traditionen.png"
                alt="Lebendige Traditionen"
                fill
                className="object-contain opacity-60"
                sizes="96px"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
