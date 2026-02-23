'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TrustProps {
  badge: string;
  text: string;
}

export function Trust({ badge }: TrustProps) {
  return (
    <section 
      className="py-6 md:py-8"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <div className="container-main">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            {badge}
          </p>

          <div className="flex items-center gap-4">
            <div 
              className="hidden sm:block text-right"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                lineHeight: '1.5',
                color: 'rgba(0, 0, 0, 0.45)',
              }}
            >
              lebendige traditionen<br />
              traditions vivantes<br />
              tradizioni viventi<br />
              tradiziuns vivas
            </div>
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <Image
                src="/images/badges/lebendige-traditionen.png"
                alt="Lebendige Traditionen der Schweiz"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
