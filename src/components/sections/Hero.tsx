'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-[var(--color-foreground)] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-[var(--color-foreground)] rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-[var(--color-foreground)] rounded-full" />
      </div>

      {/* Animated Jass Symbols */}
      <motion.div
        className="absolute top-20 left-10 text-[var(--color-primary)] opacity-10 text-9xl font-bold select-none"
        animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ♦
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-[var(--color-primary)] opacity-10 text-8xl font-bold select-none"
        animate={{ rotate: [0, -5, 5, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        ♣
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 text-[var(--color-foreground)] opacity-5 text-7xl font-bold select-none"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        ♠
      </motion.div>

      {/* Content */}
      <div className="container-main text-center relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-foreground)] mb-6 leading-tight">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-[var(--color-foreground-muted)] mb-12 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button href="https://jassmeister.web.app" external size="lg">
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-[var(--color-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
