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

function Logo({ variant = 'color', shrunk = false }: { variant?: 'color' | 'white'; shrunk?: boolean }) {
  const src = variant === 'white' 
    ? '/images/logos/JVS Logo farbig weiss.svg'
    : '/images/logos/JVS Logo farbig.svg';
  
  return (
    <Image
      src={src}
      alt="Jassverband Schweiz"
      width={180}
      height={48}
      className={`transition-all duration-500 w-auto ${
        shrunk ? 'h-9 md:h-10' : 'h-11 md:h-14'
      }`}
      priority
    />
  );
}

export function Header({ locale, nav }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}/verband`, label: nav.verband },
    { href: `/${locale}/news`, label: nav.news },
    { href: `/${locale}/projekte`, label: nav.projekte },
    { href: `/${locale}/partner`, label: nav.partner },
    { href: `/${locale}/kontakt`, label: nav.kontakt },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const showTransparent = isHomePage && !scrolled;
  const logoVariant = showTransparent ? 'white' : 'color';

  return (
    <header
      className="fixed z-50 transition-all duration-500 ease-out"
      style={
        scrolled
          ? {
              top: '12px',
              left: '140px',
              right: '140px',
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              backdropFilter: 'blur(12px)',
            }
          : isHomePage
          ? {
              top: 0,
              left: 0,
              right: 0,
              background: 'transparent',
            }
          : {
              top: 0,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.98)',
              boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
            }
      }
    >
      <div className={scrolled ? 'px-6' : 'container-main'}>
        <nav className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-[76px]' : 'h-20 md:h-24'
        }`}>
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Logo variant={logoVariant} shrunk={scrolled} />
          </Link>

          {/* Desktop Navigation - Figma: Capita Bold 20px */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '1',
                  color: isActive(item.href) 
                    ? '#ff0000' 
                    : showTransparent 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : '#000000'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = showTransparent 
                      ? 'rgba(255, 255, 255, 0.7)' 
                      : '#ff0000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = showTransparent 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : '#000000';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher currentLocale={locale} variant={showTransparent ? 'light' : 'dark'} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              showTransparent ? 'text-white' : 'text-black'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white rounded-b-xl shadow-lg overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {/* Home link in mobile */}
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 px-6 transition-colors"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: isHomePage ? '#ff0000' : '#000000',
                    backgroundColor: isHomePage ? '#f0eee7' : 'transparent'
                  }}
                >
                  {nav.home}
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 px-6 transition-colors"
                    style={{
                      fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: isActive(item.href) ? '#ff0000' : '#000000',
                      backgroundColor: isActive(item.href) ? '#f0eee7' : 'transparent'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-6 pt-4 border-t border-gray-200 mt-2">
                  <LanguageSwitcher currentLocale={locale} variant="dark" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
