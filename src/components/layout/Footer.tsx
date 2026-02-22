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
    <footer className="bg-[var(--color-background-dark)] text-white">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="text-white/60 mt-4 text-sm leading-relaxed max-w-xs">
              {content.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/verband`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.verband}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.news}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projekte`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.projekte}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partner`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.partner}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {nav.kontakt}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">{content.legal}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/impressum`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {content.impressum}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {content.datenschutz}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-white/50">
                Hirslanderstrasse 34<br />
                8032 Zürich
              </p>
              <a 
                href="mailto:info@jassverband.ch" 
                className="text-sm text-white/50 hover:text-white transition-colors mt-2 inline-block"
              >
                info@jassverband.ch
              </a>
            </div>
          </div>

          {/* Jester Illustration */}
          <div className="hidden lg:flex items-end justify-center">
            <div className="relative w-32 h-40">
              <Image
                src="/images/illustrations/jester.png"
                alt="Jass Jester"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {content.copyright}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">Gelistet beim Bundesamt für Kultur als</span>
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
