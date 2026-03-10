'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SchweizermeisterschaftProps {
  title: string;
  subtitle: string;
  copy: string;
  jugend: string;
  cta: string;
  locale: string;
}

export function Schweizermeisterschaft({
  title,
  subtitle,
  copy,
  jugend,
  cta,
  locale,
}: SchweizermeisterschaftProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/felt-figma.png"
          alt="Grüner Filz Hintergrund"
          fill
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/0" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/decorations/kranz.png"
            alt=""
            aria-hidden
            width={636}
            height={600}
            className="w-[82vw] md:w-[54vw] max-w-[744px] h-auto object-contain -translate-y-[18%] md:translate-y-0"
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.22,
            }}
            quality={90}
          />
        </div>
      </div>

      <div className="container-main relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            Saison 1
          </motion.div>

          <h2
            className="text-white mb-6"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 6vw, 48px)',
              lineHeight: 1.2,
              letterSpacing: '-0.96px',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {locale === 'de' ? (
              <>
                <span className="md:hidden">
                  Die Schweizer-
                  <br />
                  Meisterschaft im
                  <br />
                  Team-Schieber.
                </span>
                <span className="hidden md:inline">{title}</span>
              </>
            ) : (
              title
            )}
          </h2>

          <p
            className="text-white/85 mb-6 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>

          <p
            className="text-white/75 mb-8 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.6,
            }}
          >
            {copy}
          </p>

          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />

          <p
            className="text-white/65 mb-10 max-w-lg mx-auto"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.6,
            }}
          >
            {jugend}
          </p>

          <a
            href={`/${locale}/schweizermeisterschaft`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {cta}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
