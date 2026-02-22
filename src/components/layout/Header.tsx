'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

function Logo({ variant = 'color' }: { variant?: 'color' | 'white' }) {
  const src = variant === 'white' 
    ? '/images/logos/JVS Logo farbig weiss.svg'
    : '/images/logos/JVS Logo farbig.svg';
  
  return (
    <Image
      src={src}
      alt="Jassverband Schweiz"
      width={180}
      height={48}
      className="h-10 md:h-12 w-auto"
      priority
    />
  );
}

export function Header({ locale, nav }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

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

  // Logo variant logic:
  // - Homepage: white when not scrolled (dark hero bg), color when scrolled (white header)
  // - Other pages: always color (they have light backgrounds)
  const logoVariant = isHomePage && !scrolled ? 'white' : 'color';
  
  // Text colors based on header state
  const textColorUnscrolled = isHomePage ? 'text-white' : 'text-[var(--color-foreground)]';
  const textColorScrolled = 'text-[var(--color-foreground)]';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : isHomePage 
            ? 'bg-transparent' 
            : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo variant={logoVariant} />
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
                      ? `${textColorScrolled} hover:text-[var(--color-primary)]`
                      : `${textColorUnscrolled} hover:text-[var(--color-primary-light)]`
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? textColorScrolled : textColorUnscrolled
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
