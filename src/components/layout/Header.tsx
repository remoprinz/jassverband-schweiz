'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
  nav: {
    home: string;
    verband: string;
    news: string;
    projekte: string;
    partner: string;
    kontakt: string;
  };
}

function Logo() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col items-center gap-0.5">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-primary)]" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-none ml-1">
        <span className="text-lg md:text-xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
          Jassverband
        </span>
        <span className="text-lg md:text-xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
          Schweiz
        </span>
      </div>
    </div>
  );
}

export function Header({ locale, nav }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/verband`, label: nav.verband },
    { href: `/${locale}/news`, label: nav.news },
    { href: `/${locale}/projekte`, label: nav.projekte },
    { href: `/${locale}/partner`, label: nav.partner },
    { href: `/${locale}/kontakt`, label: nav.kontakt },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--color-primary)]'
                    : scrolled 
                      ? 'text-[var(--color-foreground)] hover:text-[var(--color-primary)]'
                      : 'text-white hover:text-[var(--color-primary-light)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-[var(--color-foreground)]' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-b-xl shadow-lg"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[var(--color-primary)] bg-[var(--color-background-alt)]'
                        : 'text-[var(--color-foreground)] hover:bg-[var(--color-background-alt)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 pt-3 border-t border-[var(--color-border)] mt-2">
                  <LanguageSwitcher currentLocale={locale} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
