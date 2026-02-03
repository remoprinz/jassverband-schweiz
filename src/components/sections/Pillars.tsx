'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  youth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  future: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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
    <section className="section-spacing bg-[var(--color-background-alt)]">
      <div className="container-main">
        <SectionHeader title={title} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.key}
              className="bg-white rounded-2xl p-8 text-center shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
            >
              <div className="w-16 h-16 mx-auto mb-6 text-[var(--color-primary)]">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--color-foreground)]">
                {pillar.title}
              </h3>
              <p className="text-[var(--color-foreground-muted)] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
