'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface TournamentProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function Tournament({ title, subtitle, cta }: TournamentProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Felt Texture Background - Figma exact */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/felt-figma.png"
          alt="Grüner Filz Hintergrund"
          fill
          className="object-cover"
          quality={85}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
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
              style={{ backgroundColor: '#ff0000' }}
            />
            Jetzt anmelden
          </motion.div>

          {/* Title - Figma: Capita Bold 48px */}
          <h2 
            className="text-white mb-6"
            style={{ 
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 6vw, 48px)',
              lineHeight: '1.2',
              letterSpacing: '-0.96px',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            {title}
          </h2>
          
          {/* Subtitle - Figma: Inter Regular 20px */}
          <p 
            className="text-white/85 mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: '1.6'
            }}
          >
            {subtitle}
          </p>

          {/* CTA Button - Figma: Schweizer Rot, Inter Bold 17px */}
          <Button
            href="https://jassmeister.web.app"
            external
            size="lg"
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.15)] hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
