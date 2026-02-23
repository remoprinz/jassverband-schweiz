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

          {/* Figma-Asset: Text + Siegel kombiniert (800×453) */}
          <div className="relative flex-shrink-0" style={{ width: '200px', height: '80px' }}>
            <Image
              src="/images/badges/lebendige-traditionen-figma.png"
              alt="Lebendige Traditionen der Schweiz"
              fill
              className="object-contain object-right"
              sizes="200px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
