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
      {/* Layer 1: Wood Table Background - visible at edges */}
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

      {/* Layer 2: Green Felt Overlay - centered, with wood showing at edges */}
      <div 
        className="absolute z-[1]"
        style={{
          top: '5%',
          left: '8%',
          right: '8%',
          bottom: '8%',
          borderRadius: '20px',
        }}
      >
        <Image
          src="/images/backgrounds/felt-texture.png"
          alt="Jassteppich"
          fill
          className="object-cover rounded-[20px]"
          priority
        />
        {/* Subtle vignette on felt */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 rounded-[20px]" />
      </div>

      {/* Cards - smaller, positioned at edges of felt */}
      {/* Card 1 - Left side, Swiss German (Schilten 10) */}
      <motion.div
        className="absolute z-10 w-[100px] sm:w-[120px] lg:w-[140px]"
        style={{ top: '20%', left: '12%' }}
        initial={{ opacity: 0, y: -30, rotate: -25 }}
        animate={{ opacity: 1, y: 0, rotate: -12 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-1.png"
          alt="Jasskarte Deutsch"
          width={140}
          height={217}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 2 - Left side bottom, Swiss German (Rosen König) */}
      <motion.div
        className="absolute z-10 w-[90px] sm:w-[110px] lg:w-[130px]"
        style={{ bottom: '18%', left: '10%' }}
        initial={{ opacity: 0, x: -50, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: -5 }}
        transition={{ duration: 0.9, delay: 0.5, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-3.png"
          alt="Jasskarte Deutsch"
          width={130}
          height={202}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 3 - Right side top, French style */}
      <motion.div
        className="absolute z-10 w-[100px] sm:w-[120px] lg:w-[140px]"
        style={{ top: '18%', right: '12%' }}
        initial={{ opacity: 0, y: -30, rotate: 25 }}
        animate={{ opacity: 1, y: 0, rotate: 15 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-2.png"
          alt="Jasskarte Französisch"
          width={140}
          height={217}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Card 4 - Right side bottom, French style */}
      <motion.div
        className="absolute z-10 w-[95px] sm:w-[115px] lg:w-[135px]"
        style={{ bottom: '20%', right: '10%' }}
        initial={{ opacity: 0, x: 50, rotate: 20 }}
        animate={{ opacity: 1, x: 0, rotate: 8 }}
        transition={{ duration: 0.9, delay: 0.6, type: "spring" }}
      >
        <Image
          src="/images/cards/card-hero-4.png"
          alt="Jasskarte Französisch"
          width={135}
          height={210}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Content Container - centered on felt */}
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        
        {/* Headline - Figma: Capita Bold 75px */}
        <motion.h1
          className="text-white mb-6 md:mb-8 drop-shadow-lg"
          style={{ 
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 7vw, 65px)',
            lineHeight: '1.0',
            letterSpacing: '-0.96px',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle - Figma: Inter Regular 28px */}
        <motion.p
          className="text-white/90 mb-10 md:mb-12 max-w-xl mx-auto drop-shadow-md"
          style={{ 
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            lineHeight: '1.4',
            letterSpacing: '-0.3px',
            textShadow: '0 1px 10px rgba(0,0,0,0.2)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Button 
            href="/de/projekte/jugendmeisterschaft" 
            size="lg" 
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.15)] hover:shadow-xl transition-all transform hover:-translate-y-1"
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

      {/* Mobile: Hide cards on very small screens to prevent overlap */}
      <style jsx>{`
        @media (max-width: 480px) {
          .absolute.z-10 {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
