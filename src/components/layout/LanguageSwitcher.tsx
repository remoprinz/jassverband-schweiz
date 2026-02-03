'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Replace the locale in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            className={`px-2 py-1 rounded transition-colors ${
              currentLocale === locale
                ? 'text-[var(--color-primary)] font-semibold'
                : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'
            }`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className="text-[var(--color-foreground-muted)]">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
