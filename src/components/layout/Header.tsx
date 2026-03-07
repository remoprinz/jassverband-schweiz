'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
  isHeroPage: boolean;
  nav: {
    home: string;
    schweizermeisterschaft: string;
    plattformen: string;
    verband: string;
    news: string;
    kontakt: string;
    mitmachen: string;
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
        shrunk ? 'h-10 md:h-10' : 'h-11 md:h-14'
      }`}
      priority
    />
  );
}

export function Header({ locale, nav, isHeroPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileCompact, setIsMobileCompact] = useState(false);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const MOBILE_BREAKPOINT = 1024;
    const PIN_THRESHOLD_PX = 38; // ~1cm scroll distance
    const COLLAPSE_THRESHOLD_PX = 288; // 3x später kollabieren
    const EXPAND_THRESHOLD_PX = 220;

    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobileViewport(isMobile);
      if (!isMobile) {
        setIsMobileCompact(false);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      if (window.innerWidth < MOBILE_BREAKPOINT && !mobileMenuOpen) {
        const isScrollingDown = scrollY > lastScrollYRef.current;

        if (scrollY <= PIN_THRESHOLD_PX) {
          setIsMobileCompact(false);
        } else if (scrollY >= COLLAPSE_THRESHOLD_PX && isScrollingDown) {
          setIsMobileCompact(true);
        } else if (!isScrollingDown && scrollY <= EXPAND_THRESHOLD_PX) {
          setIsMobileCompact(false);
        }
      }

      lastScrollYRef.current = scrollY;
    };

    handleResize();
    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsMobileCompact(false);
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { href: `/${locale}/schweizermeisterschaft`, label: nav.schweizermeisterschaft, shortLabel: 'Meisterschaft' },
    { href: `/${locale}/plattform`, label: nav.plattformen },
    { href: `/${locale}/verband`, label: nav.verband },
    { href: `/${locale}/news`, label: nav.news },
    { href: `/${locale}/kontakt`, label: nav.kontakt },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const isCompactMode = isMobileViewport && isMobileCompact && !mobileMenuOpen;
  const isKontaktPage = pathname === `/${locale}/kontakt` || pathname === `/${locale}/kontakt/`;
  const useHeroHeaderStyle = isHeroPage && !isKontaktPage;
  const showTransparent = useHeroHeaderStyle && !scrolled;
  const logoVariant = showTransparent ? 'white' : 'color';

  return (
    <header
      data-header
      suppressHydrationWarning
      className="fixed z-50 transition-[top,left,right,width,background,border-radius,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={
        isMobileViewport
          ? isCompactMode
            ? {
                top: '12px',
                right: '12px',
                width: '56px',
                background: 'rgba(255,255,255,0.98)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                backdropFilter: 'blur(12px)',
              }
            : scrolled
            ? {
                top: '12px',
                right: '12px',
                width: 'calc(100% - 24px)',
                background: 'rgba(255,255,255,0.98)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                backdropFilter: 'blur(12px)',
              }
            : useHeroHeaderStyle
            ? {
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                background: 'transparent',
              }
            : {
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                background: 'rgba(255,255,255,0.98)',
                boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
              }
          : scrolled
          ? {
              top: '12px',
              left: '140px',
              right: '140px',
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              backdropFilter: 'blur(12px)',
            }
          : useHeroHeaderStyle
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
      <div suppressHydrationWarning className={isCompactMode ? 'px-0' : scrolled ? 'px-6' : 'container-main'}>
        <nav suppressHydrationWarning className={`flex items-center transition-all duration-500 ${
          isCompactMode
            ? 'justify-end h-14 px-1'
            : scrolled
            ? 'justify-between h-[72px] md:h-[76px]'
            : 'justify-between h-20 md:h-24'
        }`}>
          {!isCompactMode && (
            <Link href={`/${locale}`} className="flex items-center">
              <Logo variant={logoVariant} shrunk={scrolled} />
            </Link>
          )}

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: '16px',
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
                {'shortLabel' in item && item.shortLabel ? item.shortLabel : item.label}
              </Link>
            ))}
            
            <Link
              href={`/${locale}/mitmachen`}
              className="rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: '17px',
                lineHeight: '1',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                padding: '10px 24px',
                boxShadow: '0 2px 8px rgba(255, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#cc0000';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 0, 0, 0.3)';
              }}
            >
              {nav.mitmachen}
            </Link>

            <LanguageSwitcher currentLocale={locale} variant={showTransparent ? 'light' : 'dark'} />
          </div>

          <button
            className={`lg:hidden rounded-lg transition-all ${
              isCompactMode
                ? 'text-black'
                : showTransparent
                ? 'text-white'
                : 'text-black'
            }`}
            style={isCompactMode ? { width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white rounded-b-xl shadow-lg overflow-hidden"
            >
              <div className="py-4 space-y-1">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 px-6 transition-colors"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: pathname === `/${locale}` || pathname === `/${locale}/` ? '#ff0000' : '#000000',
                    backgroundColor: pathname === `/${locale}` || pathname === `/${locale}/` ? '#f0eee7' : 'transparent'
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
                
                <div className="px-6 pt-3">
                  <Link
                    href={`/${locale}/mitmachen`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center rounded-full"
                    style={{
                      fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                      fontWeight: 700,
                      fontSize: '18px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      padding: '14px 24px',
                    }}
                  >
                    {nav.mitmachen}
                  </Link>
                </div>
                
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
