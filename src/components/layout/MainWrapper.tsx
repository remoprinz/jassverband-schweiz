'use client';

import { usePathname } from 'next/navigation';

interface MainWrapperProps {
  children: React.ReactNode;
  isHeroPage: boolean;
}

export function MainWrapper({ children, isHeroPage }: MainWrapperProps) {
  const pathname = usePathname();
  const isKontaktPage = pathname.includes('/kontakt');
  const defaultPagePadding = 'pt-14 md:pt-24';
  const kontaktPagePadding = 'pt-12 md:pt-20';
  const topPaddingClass = isKontaktPage
    ? kontaktPagePadding
    : !isHeroPage
      ? defaultPagePadding
      : '';

  return (
    <main suppressHydrationWarning className={topPaddingClass}>
      {children}
    </main>
  );
}
