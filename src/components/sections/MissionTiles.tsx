'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export interface MissionItem {
  title: string;
  mission: string;
}

interface MissionTilesProps {
  title: string;
  items: MissionItem[];
  cta: string;
  ctaHref: string;
}

export function MissionTiles({ title, items, cta, ctaHref }: MissionTilesProps) {
  return (
    <section
      className="py-20 md:py-24"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="container-main">
        <motion.h2
          className="text-center mb-12 md:mb-16"
          style={{
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 42px)',
            lineHeight: '1.37',
            letterSpacing: '-0.96px',
            color: 'var(--color-foreground)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.article
              key={index}
              className="bg-white transition-all duration-300 hover:-translate-y-1"
              style={{
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ boxShadow: 'var(--shadow-card-hover)' }}
            >
              <Link href={`${ctaHref}#mission-${index + 1}`} className="block h-full p-6 lg:p-8">
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-20)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.4px',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: 'var(--font-size-16)',
                    lineHeight: '1.5',
                    color: 'var(--color-foreground-muted)',
                  }}
                >
                  {item.mission}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#1e2d1e] text-white font-bold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl hover:bg-[#152015] transition-all duration-200"
          >
            {cta}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
