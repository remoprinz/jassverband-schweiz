'use client';

interface MainWrapperProps {
  children: React.ReactNode;
  isHeroPage: boolean;
}

export function MainWrapper({ children, isHeroPage }: MainWrapperProps) {
  return (
    <main suppressHydrationWarning className={isHeroPage ? '' : 'pt-16 md:pt-24'}>
      {children}
    </main>
  );
}
