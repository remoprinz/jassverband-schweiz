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
      {/* Wood Table Background - Figma exact */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt="Holztisch Hintergrund"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Subtle dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Cards on table - exact Figma positioning */}
      {/* Card 1 - Top left, rotated */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-[180px] lg:w-[220px] z-10"
        initial={{ opacity: 0, y: -50, rotate: -30 }}
        animate={{ opacity: 1, y: 0, rotate: -15 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-1.png"
          alt="Jasskarte"
          width={220}
          height={340}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 2 - Top right, rotated opposite */}
      <motion.div
        className="absolute top-[12%] right-[10%] w-[170px] lg:w-[200px] z-10"
        initial={{ opacity: 0, y: -50, rotate: 30 }}
        animate={{ opacity: 1, y: 0, rotate: 12 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-2.png"
          alt="Jasskarte"
          width={200}
          height={310}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 3 - Bottom left */}
      <motion.div
        className="absolute bottom-[15%] left-[12%] w-[160px] lg:w-[190px] z-10"
        initial={{ opacity: 0, x: -80, rotate: -20 }}
        animate={{ opacity: 1, x: 0, rotate: -8 }}
        transition={{ duration: 0.9, delay: 0.5, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-3.png"
          alt="Jasskarte"
          width={190}
          height={295}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 4 - Bottom right */}
      <motion.div
        className="absolute bottom-[18%] right-[8%] w-[175px] lg:w-[210px] z-10"
        initial={{ opacity: 0, x: 80, rotate: 25 }}
        animate={{ opacity: 1, x: 0, rotate: 10 }}
        transition={{ duration: 0.9, delay: 0.6, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-4.png"
          alt="Jasskarte"
          width={210}
          height={325}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Content Container - Figma: centered, exact typography */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        
        {/* Headline - Figma: Capita Bold 75px, line-height 70px */}
        <motion.h1
          className="text-white mb-6 md:mb-8 drop-shadow-lg"
          style={{ 
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(42px, 8vw, 75px)',
            lineHeight: '0.93',
            letterSpacing: '-0.96px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle - Figma: Inter Regular 28px, line-height 36px */}
        <motion.p
          className="text-white/95 mb-10 md:mb-12 max-w-2xl mx-auto drop-shadow-md"
          style={{ 
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(18px, 3vw, 28px)',
            lineHeight: '1.29',
            letterSpacing: '-0.4px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button - Figma: Schweizer Rot #ff0000, Inter Bold 17px, rounded-full */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Button 
            href="/de/projekte/jugendmeisterschaft" 
            size="lg" 
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>

        {/* Badge "Lebendige Traditionen" - positioned below CTA */}
        <motion.div
          className="mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Image
            src="/images/badges/lebendige-traditionen.png"
            alt="Lebendige Traditionen der Schweiz"
            width={120}
            height={120}
            className="w-20 md:w-28 h-auto opacity-90 drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
