'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Wood - full bleed, edge to edge, top to bottom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt="Holztisch Hintergrund"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Layer 2: Felt - covers center, full height, wood visible ~12% on each side */}
      <div className="absolute inset-y-0 z-[1]" style={{ left: '12%', right: '12%' }}>
        <Image
          src="/images/backgrounds/felt-texture.png"
          alt="Jassteppich"
          fill
          className="object-cover"
          priority
        />
        {/* slight vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
      </div>

      {/* Cards LEFT - paarweise wie in Figma */}
      <div className="absolute z-10 hidden sm:block" style={{ bottom: '12%', left: '4%' }}>
        {/* Back card - slightly behind */}
        <motion.div
          className="absolute"
          style={{ width: 85, bottom: 0, left: 30 }}
          initial={{ opacity: 0, x: -40, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ duration: 0.9, delay: 0.5, type: 'spring' }}
        >
          <Image
            src="/images/cards/card-hero-3.png"
            alt="Jasskarte"
            width={85}
            height={132}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </motion.div>
        {/* Front card - rotated more */}
        <motion.div
          style={{ width: 90, position: 'relative' }}
          initial={{ opacity: 0, y: 40, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -20 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
        >
          <Image
            src="/images/cards/card-hero-1.png"
            alt="Jasskarte"
            width={90}
            height={140}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Cards RIGHT - paarweise wie in Figma */}
      <div className="absolute z-10 hidden sm:block" style={{ bottom: '14%', right: '3%' }}>
        {/* Back card */}
        <motion.div
          className="absolute"
          style={{ width: 80, bottom: 0, right: 25 }}
          initial={{ opacity: 0, x: 40, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 0.9, delay: 0.6, type: 'spring' }}
        >
          <Image
            src="/images/cards/card-hero-4.png"
            alt="Jasskarte"
            width={80}
            height={124}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </motion.div>
        {/* Front card */}
        <motion.div
          style={{ width: 85, position: 'relative' }}
          initial={{ opacity: 0, y: 40, rotate: 25 }}
          animate={{ opacity: 1, y: 0, rotate: 15 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        >
          <Image
            src="/images/cards/card-hero-2.png"
            alt="Jasskarte"
            width={85}
            height={132}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Content - centered */}
      <div className="relative z-20 text-center px-6 max-w-2xl mx-auto">

        {/* Headline */}
        <motion.h1
          className="text-white mb-6 md:mb-8"
          style={{
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 65px)',
            lineHeight: '1.0',
            letterSpacing: '-0.96px',
            textShadow: '0 2px 20px rgba(0,0,0,0.25)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/90 mb-10 md:mb-12 max-w-lg mx-auto"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            lineHeight: '1.4',
            letterSpacing: '-0.3px',
            textShadow: '0 1px 8px rgba(0,0,0,0.2)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Button
            href="/de/projekte/jugendmeisterschaft"
            size="lg"
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-[0px_10px_20px_-3px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-7 h-7 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
