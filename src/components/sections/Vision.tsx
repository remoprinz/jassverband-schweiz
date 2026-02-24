'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface VisionProps {
  title: string;
  text: string;
  cta: string;
  ctaHref: string;
}

const DECO_CARDS = ['/cards/de/card-03.png', '/cards/de/card-08.png'];

/**
 * Vision-Zeile: Kreide-Hintergrund, weisse Typo, CTA zu /leitbild.
 * Visuell an Hero angelehnt (Karten, leichte Animation), aber eigenständig.
 */
export function Vision({ title, text, cta, ctaHref }: VisionProps) {
  const cards = DECO_CARDS;

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(165deg, #1e2d1e 0%, #152015 50%, #0f180f 100%)',
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

      {/* Karten-Deko: weniger und dezenter als Hero */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute hidden md:block"
          style={{ left: '8%', top: '50%', width: 'clamp(60px, 8vw, 90px)' }}
          initial={{ opacity: 0, x: -20, rotate: -12 }}
          whileInView={{ opacity: 0.35, x: 0, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={cards[0]}
            alt=""
            width={90}
            height={141}
            className="w-full h-auto drop-shadow-lg"
            style={{ borderRadius: '10px' }}
          />
        </motion.div>
        <motion.div
          className="absolute hidden md:block"
          style={{ right: '10%', top: '45%', width: 'clamp(50px, 6vw, 75px)' }}
          initial={{ opacity: 0, x: 20, rotate: 10 }}
          whileInView={{ opacity: 0.3, x: 0, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src={cards[1]}
            alt=""
            width={75}
            height={118}
            className="w-full h-auto drop-shadow-lg"
            style={{ borderRadius: '10px' }}
          />
        </motion.div>
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="mb-4 md:mb-6"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 38px)',
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
            className="mb-8 md:mb-10 text-white/95"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {text}
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
