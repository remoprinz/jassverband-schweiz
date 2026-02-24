'use client';

import { motion } from 'framer-motion';

export interface MissionItem {
  title: string;
  mission: string;
}

interface MissionTilesProps {
  title: string;
  items: MissionItem[];
}

export function MissionTiles({ title, items }: MissionTilesProps) {
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
              className="bg-white p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1"
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
