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
    <section className="relative w-full overflow-hidden" style={{ height: '920px' }}>
      {/* Figma: holztisch h-[944px] top-[-24px] - full bleed */}
      <div 
        className="absolute left-0 right-0 z-0"
        style={{ top: '-24px', height: '944px' }}
      >
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt="Holztisch Hintergrund"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Figma: Teppich 475x475px, left-[95px], top-[-42px], rounded-[44.6px] */}
      <div 
        className="absolute z-[1]"
        style={{ 
          left: '95px', 
          top: '-42px', 
          width: '475px', 
          height: '475px',
        }}
      >
        <Image
          src="/images/backgrounds/felt-texture.png"
          alt="Jassteppich"
          fill
          className="object-cover"
          style={{ borderRadius: '44.6px' }}
          priority
        />
        {/* Figma: inner shadow */}
        <div 
          className="absolute inset-0"
          style={{ 
            borderRadius: '44.6px',
            boxShadow: 'inset -4px -4px 4px 1px rgba(0,0,0,0.25), inset 0px 4px 4px 0px rgba(0,0,0,0.25), inset 6px 6px 8px 0px rgba(0,0,0,0.15)'
          }}
        />
      </div>

      {/* Figma gradient overlay on left side */}
      <div 
        className="absolute z-[2] mix-blend-multiply"
        style={{ left: '95px', top: '0', width: '1250px', height: '753px' }}
      >
        <div 
          className="w-full h-full opacity-40"
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,1) 4.1%, rgba(255,255,255,0) 60%)',
            transform: 'scaleY(-1)'
          }}
        />
      </div>

      {/* Figma: Card links unten - 306x478px, rotate-[-27.35deg], left-[196px], top-[583px] */}
      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ left: '196px', top: '583px', width: '306px', height: '478px' }}
        initial={{ opacity: 0, x: -80, rotate: -35 }}
        animate={{ opacity: 1, x: 0, rotate: -27.35 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring' }}
      >
        <Image
          src="/images/cards/card-hero-1.png"
          alt="Jasskarte"
          fill
          className="object-contain drop-shadow-2xl"
          style={{ borderRadius: '24px' }}
          priority
        />
      </motion.div>

      {/* Figma: Card links oben - 245x382px, rotate-[15.8deg], left-[133px], top-[426px] */}
      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ left: '133px', top: '426px', width: '245px', height: '382px' }}
        initial={{ opacity: 0, y: -50, rotate: 25 }}
        animate={{ opacity: 1, y: 0, rotate: 15.8 }}
        transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
      >
        <Image
          src="/images/cards/card-hero-3.png"
          alt="Jasskarte"
          fill
          className="object-contain drop-shadow-2xl"
          style={{ borderRadius: '24px' }}
          priority
        />
      </motion.div>

      {/* Figma: Card rechts oben - 245x382px, rotate-[-16.19deg] */}
      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ right: '100px', top: '468px', width: '245px', height: '382px' }}
        initial={{ opacity: 0, y: -50, rotate: -25 }}
        animate={{ opacity: 1, y: 0, rotate: -16.19 }}
        transition={{ duration: 0.8, delay: 0.35, type: 'spring' }}
      >
        <Image
          src="/images/cards/card-hero-2.png"
          alt="Jasskarte"
          fill
          className="object-contain drop-shadow-2xl"
          style={{ borderRadius: '24px' }}
          priority
        />
      </motion.div>

      {/* Figma: Card rechts unten - 159x250px, rotate-[8.34deg] */}
      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ right: '180px', top: '616px', width: '159px', height: '250px' }}
        initial={{ opacity: 0, x: 50, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 8.34 }}
        transition={{ duration: 0.9, delay: 0.5, type: 'spring' }}
      >
        <Image
          src="/images/cards/card-hero-4.png"
          alt="Jasskarte"
          fill
          className="object-contain drop-shadow-xl"
          style={{ borderRadius: '12px' }}
          priority
        />
      </motion.div>

      {/* Content - Figma: centered, title at top-[344px], subtitle at top-[487px], CTA at top-[648px] */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        
        {/* Figma: Headline - 75px, Capita Bold, centered around top-[344px] */}
        <motion.h1
          className="text-white text-center max-w-[800px]"
          style={{
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5.2vw, 75px)',
            lineHeight: '70px',
            textShadow: '0 2px 20px rgba(0,0,0,0.25)',
            marginTop: '180px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Figma: Subtitle - 28px Inter Regular, top-[487px] */}
        <motion.p
          className="text-white text-center max-w-[571px] mt-8"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(18px, 2vw, 28px)',
            lineHeight: '36px',
            textShadow: '0 1px 10px rgba(0,0,0,0.2)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* Figma: CTA Button - rounded-full, red, Inter Bold 17px */}
        <motion.div
          className="mt-10"
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
      </div>

      {/* Figma: Scroll indicator at top-[865px] */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer z-20"
        style={{ top: '865px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      {/* Responsive: Simplified mobile version */}
      <style jsx>{`
        @media (max-width: 1023px) {
          section {
            height: 100vh !important;
            min-height: 600px;
          }
        }
      `}</style>
    </section>
  );
}
