'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TrustProps {
  badge: string;
  text: string;
}

export function Trust({ badge, text }: TrustProps) {
  return (
    <section className="py-8 md:py-12 bg-[var(--color-cream)]">
      <div className="container-main">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge Image */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <Image
              src="/images/badges/lebendige-traditionen.png"
              alt="Lebendige Traditionen der Schweiz"
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
          
          <div className="text-center md:text-left">
            <span 
              className="font-semibold text-[var(--color-foreground)] block md:inline"
              style={{ fontFamily: 'var(--font-capita), Georgia, serif' }}
            >
              {badge}
            </span>
            <span className="hidden md:inline text-[var(--color-foreground-muted)] mx-2">—</span>
            <span className="text-[var(--color-foreground-muted)] text-sm md:text-base block md:inline mt-1 md:mt-0">
              {text}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
