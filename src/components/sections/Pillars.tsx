'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="6" width="32" height="36" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14 14h20M14 22h20M14 30h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="34" r="6" fill="currentColor" opacity="0.2" />
      <path d="M32 34l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  youth: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 26c-8 0-14 4-14 10v4h28v-4c0-6-6-10-14-10z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M36 8l4 4-8 8-4-4 8-8z" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  future: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 12v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M38 10l4-4M10 38l-4 4M38 38l4 4M10 10l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
};

export function Pillars({ title, tradition, youth, future }: PillarsProps) {
  const pillars = [
    { key: 'tradition', icon: icons.tradition, image: '/images/cards/rosen-under.png', ...tradition },
    { key: 'youth', icon: icons.youth, image: '/images/cards/schilten-bauer.png', ...youth },
    { key: 'future', icon: icons.future, image: '/images/cards/eichel-ass.png', ...future },
  ];

  return (
    <section className="section-spacing bg-[var(--color-cream)]">
      <div className="container-main">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.key}
              className="pillar-card bg-white rounded-xl p-6 lg:p-8 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Decorative Card Image */}
              <div className="absolute -right-4 -top-4 w-20 h-28 opacity-10 rotate-12">
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-5 text-[var(--color-felt-green)]">
                  {pillar.icon}
                </div>
                <h3 
                  className="text-xl lg:text-2xl font-bold mb-3 text-[var(--color-foreground)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[var(--color-foreground-muted)] leading-relaxed text-sm lg:text-base">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
