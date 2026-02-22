'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ currentLocale, variant = 'dark' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const isLight = variant === 'light';

  return (
    <div 
      className="flex items-center gap-1"
      style={{
        fontFamily: 'var(--font-capita), Capita, Georgia, serif',
        fontWeight: 700,
        fontSize: '15px'
      }}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            className="px-2 py-1 rounded transition-colors duration-300"
            style={{
              color: currentLocale === locale
                ? '#ff0000'
                : isLight 
                  ? 'rgba(255, 255, 255, 0.7)' 
                  : '#6b6b6b'
            }}
            onMouseEnter={(e) => {
              if (currentLocale !== locale) {
                e.currentTarget.style.color = isLight ? '#ffffff' : '#000000';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLocale !== locale) {
                e.currentTarget.style.color = isLight 
                  ? 'rgba(255, 255, 255, 0.7)' 
                  : '#6b6b6b';
              }
            }}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span 
              className="transition-colors duration-300"
              style={{
                color: isLight ? 'rgba(255, 255, 255, 0.5)' : '#6b6b6b'
              }}
            >
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
