import Link from 'next/link';

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

export function Footer({ locale, content, nav }: FooterProps) {
  return (
    <footer className="bg-[var(--color-background-dark)] text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-2">Jassverband Schweiz</div>
            <p className="text-white/60 mb-4">{content.tagline}</p>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="inline-block w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
              Lebendige Tradition
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/verband`} className="text-white/60 hover:text-white transition-colors">
                  {nav.verband}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="text-white/60 hover:text-white transition-colors">
                  {nav.news}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projekte`} className="text-white/60 hover:text-white transition-colors">
                  {nav.projekte}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partner`} className="text-white/60 hover:text-white transition-colors">
                  {nav.partner}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className="text-white/60 hover:text-white transition-colors">
                  {nav.kontakt}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{content.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/impressum`} className="text-white/60 hover:text-white transition-colors">
                  {content.impressum}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className="text-white/60 hover:text-white transition-colors">
                  {content.datenschutz}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-white/40">
                Hirslanderstrasse 34<br />
                8032 Zürich
              </p>
              <p className="text-sm text-white/40 mt-2">
                info@jassverband.ch
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          {content.copyright}
        </div>
      </div>
    </footer>
  );
}
