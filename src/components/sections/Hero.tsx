'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

interface CardData {
  id: number;
  src: string;
  symbol: string;
  color: string;
  value: string;
  rotate: number;
  x: number;
}

function FallbackCard({ symbol, color, value }: { symbol: string; color: string; value: string }) {
  return (
    <div className="w-full h-full bg-white rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center p-2">
      <span className={`text-2xl md:text-3xl ${color}`}>{value}</span>
      <span className={`text-4xl md:text-5xl ${color}`}>{symbol}</span>
    </div>
  );
}

function JassCardImage({ card }: { card: CardData }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackCard symbol={card.symbol} color={card.color} value={card.value} />;
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
      <Image
        src={card.src}
        alt="Jasskarte"
        fill
        className="object-contain p-1"
        sizes="(max-width: 768px) 100px, 140px"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function JassCards() {
  const cards: CardData[] = [
    { id: 1, src: '/images/cards/schilten-under.png', symbol: '🛡️', color: 'text-yellow-600', value: 'U', rotate: -15, x: -100 },
    { id: 2, src: '/images/cards/schilten-10.png', symbol: '🛡️', color: 'text-yellow-600', value: '10', rotate: -5, x: -35 },
    { id: 3, src: '/images/cards/rosen-ass.png', symbol: '🌹', color: 'text-red-500', value: 'A', rotate: 8, x: 35 },
    { id: 4, src: '/images/cards/eichel-under.png', symbol: '🌰', color: 'text-amber-700', value: 'U', rotate: 18, x: 100 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[240px] md:h-[320px]">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute left-1/2 top-1/2 w-[100px] md:w-[140px] h-[150px] md:h-[210px] cursor-pointer"
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: card.rotate,
            x: card.x,
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5 + index * 0.12,
            ease: "easeOut"
          }}
          whileHover={{ 
            y: -15, 
            rotate: 0,
            scale: 1.08,
            zIndex: 10,
            transition: { duration: 0.25 }
          }}
          style={{ 
            marginLeft: '-50px',
            marginTop: '-75px',
            transformOrigin: 'center bottom',
            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.35))',
          }}
        >
          <JassCardImage card={card} />
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Wood Background */}
      <div 
        className="absolute inset-0 bg-wood-fallback"
        style={{
          backgroundImage: 'url(/images/backgrounds/wood-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Content */}
      <div className="container-main relative z-10 pt-24 pb-16">
        <div className="text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12 md:mb-16"
          >
            <Button href="/de/projekte/jugendmeisterschaft" size="lg">
              {cta}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </motion.div>

          {/* Jass Cards Animation */}
          <JassCards />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
