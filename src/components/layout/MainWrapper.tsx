'use client';

import { usePathname } from 'next/navigation';

interface MainWrapperProps {
  children: React.ReactNode;
  locale: string;
}

export function MainWrapper({ children, locale }: MainWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  return (
    <main className={isHomePage ? '' : 'pt-16 md:pt-24'}>
      {children}
    </main>
  );
}
