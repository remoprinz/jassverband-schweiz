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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1B4D3E]">
      {/* Felt Texture Overlay (optional, if we have it) - otherwise just solid color */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: 'url(/images/backgrounds/felt-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />

      {/* Content Container */}
      <div className="container-main relative z-20 pt-32 pb-40 text-center">
        
        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg"
          style={{ fontFamily: 'var(--font-capita), Georgia, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-2xl text-white/90 mb-10 md:mb-14 max-w-3xl mx-auto font-medium drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <Button href="/de/projekte/jugendmeisterschaft" size="lg" className="bg-[#E31E24] hover:bg-[#C91A1F] text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* Left Cards (Schellen König + 7) */}
      <motion.div
        className="absolute bottom-[-5%] left-[5%] w-[25vw] max-w-[300px] min-w-[180px] z-10"
        initial={{ opacity: 0, x: -100, rotate: -20 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
      >
        <Image
          src="/images/cards/cards-left.png"
          alt="Jasskarten Links"
          width={400}
          height={500}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Right Cards (Schilten 10 + Under) */}
      <motion.div
        className="absolute bottom-[-5%] right-[5%] w-[25vw] max-w-[300px] min-w-[180px] z-10"
        initial={{ opacity: 0, x: 100, rotate: 20 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.6, type: "spring" }}
      >
        <Image
          src="/images/cards/cards-right.png"
          alt="Jasskarten Rechts"
          width={400}
          height={500}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
