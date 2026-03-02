'use client';

import { SafeAnimateOnScroll } from '@/components/ui/ClientOnlyMotion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const titleSizes = {
  sm: {
    fontSize: 'clamp(24px, 4vw, 32px)',
    marginBottom: '12px',
  },
  md: {
    fontSize: 'clamp(28px, 4.5vw, 36px)',
    marginBottom: '16px',
  },
  lg: {
    fontSize: 'clamp(32px, 5vw, 42px)',
    marginBottom: '16px',
  },
};

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = true, 
  light = false, 
  size = 'lg',
  className = '' 
}: SectionHeaderProps) {
  return (
    <SafeAnimateOnScroll
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 
        className={`mb-4 ${light ? 'text-white' : 'text-[var(--color-foreground)]'}`}
        style={{
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: titleSizes[size].fontSize,
          lineHeight: '1.37',
          letterSpacing: 'var(--letter-spacing-tight)',
          marginBottom: titleSizes[size].marginBottom,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={`max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-[var(--color-foreground-muted)]'}`}
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            lineHeight: '1.6',
          }}
        >
          {subtitle}
        </p>
      )}
    </SafeAnimateOnScroll>
  );
}
