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
    <section className="relative py-24 md:py-32 bg-[var(--color-background-dark)] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent-jassmeister)] to-transparent" />
      </div>

      {/* Animated Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 border-2 border-[var(--color-accent-jassmeister)] rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full opacity-10"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-main relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-jassmeister)]/20 text-[var(--color-accent-jassmeister)] text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[var(--color-accent-jassmeister)] rounded-full animate-pulse" />
            2026
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-white/70 mb-10">
            {subtitle}
          </p>

          <Button
            href="https://jassmeister.web.app"
            external
            size="lg"
            className="bg-[var(--color-accent-jassmeister)] hover:bg-[#E5551B]"
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
