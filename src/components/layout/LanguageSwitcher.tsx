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
  
  const activeColor = 'text-[var(--color-primary)]';
  const inactiveColor = isLight 
    ? 'text-white/70 hover:text-white' 
    : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]';
  const separatorColor = isLight 
    ? 'text-white/50' 
    : 'text-[var(--color-foreground-muted)]';

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            className={`px-2 py-1 rounded transition-colors duration-300 ${
              currentLocale === locale
                ? `${activeColor} font-semibold`
                : inactiveColor
            }`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className={`transition-colors duration-300 ${separatorColor}`}>/</span>
          )}
        </span>
      ))}
    </div>
  );
}
