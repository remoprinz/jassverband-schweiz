'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

interface TournamentProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function Tournament({ title, subtitle, cta }: TournamentProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Felt Green Background */}
      <div 
        className="absolute inset-0 bg-felt-fallback"
        style={{
          backgroundImage: 'url(/images/backgrounds/felt-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--color-felt-green)',
        }}
      />
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Decorative Card Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-8 left-8 md:left-16 text-white/5 text-6xl md:text-8xl"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ♠
        </motion.div>
        <motion.div 
          className="absolute bottom-8 right-8 md:right-16 text-white/5 text-6xl md:text-8xl"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          ♥
        </motion.div>
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
            2026
          </motion.div>

          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-capita), Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          >
            {title}
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-xl mx-auto">
            {subtitle}
          </p>

          <Button
            href="https://jassmeister.web.app"
            external
            size="lg"
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
