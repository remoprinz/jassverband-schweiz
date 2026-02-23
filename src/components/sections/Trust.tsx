'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TrustProps {
  badge: string;
  text: string;
}

export function Trust({}: TrustProps) {
  return (
    <section
      className="py-8 md:py-10"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <div className="container-main">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="max-w-md"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              lineHeight: '1.6',
              color: 'rgba(0, 0, 0, 0.55)',
            }}
          >
            JVS repräsentiert Jassen als vom Bundesamt für Kultur anerkannte{' '}
            <a
              href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black transition-colors"
              style={{ color: 'rgba(0, 0, 0, 0.75)' }}
            >
              lebendige Tradition
            </a>
            .
          </p>

          {/* Figma-Asset: Text + Siegel kombiniert */}
          <div className="relative flex-shrink-0" style={{ width: 'clamp(160px, 20vw, 280px)', aspectRatio: '800 / 453' }}>
            <Image
              src="/images/badges/lebendige-traditionen-figma.png"
              alt="Lebendige Traditionen der Schweiz"
              fill
              className="object-contain object-right"
              sizes="(max-width: 768px) 160px, 280px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
