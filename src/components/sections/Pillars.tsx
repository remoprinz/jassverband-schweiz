'use client';

import { motion } from 'framer-motion';
import { StandardSection } from '@/components/layout/StandardSection';

interface PillarContent {
  title: string;
  description: string;
}

interface PillarsProps {
  title: string;
  tradition: PillarContent;
  youth: PillarContent;
  future: PillarContent;
}

const icons = {
  tradition: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="10" y="8" width="44" height="48" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M18 20h28M18 32h28M18 44h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="46" cy="46" r="8" fill="currentColor" opacity="0.15" />
      <path d="M43 46l3 3 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  youth: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="18" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M32 32c-10 0-18 5-18 12v6h36v-6c0-7-8-12-18-12z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="42" r="4" fill="currentColor" opacity="0.3" />
      <path d="M48 10l5 5-10 10-5-5 10-10z" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  future: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M32 16v16l10 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <path d="M50 14l5-5M14 50l-5 5M50 50l5 5M14 14l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
};

export function Pillars({ title, tradition, youth, future }: PillarsProps) {
  const pillars = [
    { key: 'tradition', icon: icons.tradition, ...tradition },
    { key: 'youth', icon: icons.youth, ...youth },
    { key: 'future', icon: icons.future, ...future },
  ];

  return (
    <StandardSection
      title={title}
      background="cream"
      containerSize="full"
      spacing="lg"
    >
      {/* Cards Grid - Figma: 3 columns, 32px gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.key}
            className="bg-white p-8 lg:p-10 text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ boxShadow: 'var(--shadow-card-hover)' }}
          >
            {/* Icon - Figma: 64x64px, Schweizer Rot */}
            <div 
              className="w-16 h-16 mx-auto mb-6"
              style={{ color: 'var(--color-primary)' }}
            >
              {pillar.icon}
            </div>
            
            {/* Card Title - Figma: Capita Bold 28px */}
            <h3 
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'var(--font-size-28)',
                lineHeight: '1',
                letterSpacing: 'var(--letter-spacing-normal)',
                color: 'var(--color-foreground)'
              }}
            >
              {pillar.title}
            </h3>
            
            {/* Description - Figma: Inter Regular 16px */}
            <p 
              style={{ 
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'var(--font-size-16)',
                lineHeight: '1.5',
                color: 'var(--color-foreground-muted)'
              }}
            >
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>
    </StandardSection>
  );
}
