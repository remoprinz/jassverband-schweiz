'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface VisionProps {
  title: string;
  subtitle: string;
  copy: string;
  cta: string;
  ctaHref: string;
}

/**
 * Vision-Zeile: Kreide-Hintergrund, weisse Typo, CTA zu /leitbild.
 * Visuell an Hero angelehnt (Karten, leichte Animation), aber eigenständig.
 */
export function Vision({ title, subtitle, copy, cta, ctaHref }: VisionProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: 'url(/images/backgrounds/chalkboard.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
      }}
    >
      {/* Dezente Kreide-Textur via Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="mb-4 md:mb-6"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(34px, 5vw, 52px)',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mb-3 text-white/95"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
          <motion.p
            className="mb-8 md:mb-10 text-white/85"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.55,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {copy}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#1e2d1e] font-bold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-200"
            >
              {cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
