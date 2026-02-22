'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

/**
 * FIGMA API – verifizierte Werte (Token-Abruf 2026-02-22):
 *
 * Canvas (holztisch 21:207): x=0, y=1506, w=1440, h=944
 *
 * Teppich (21:125):  x=95,  y=1488 → top=(1488-1506)/944=−1.9%
 *                    w=1250, h=860  → w=86.8%, h=91.1%
 *
 * Headline (3:148):  y=1804 → top=(1804−1506)/944=31.57%  cx=335+771/2=720.5 → 50%
 * Subtitle (3:150):  y=1986 → top=(1986−1506)/944=50.85%
 * CTA (3:152):       y=2178 → top=(2178−1506)/944=71.19%
 *
 * Karten (Intrinsic 159×250, Bounding-Box-Position):
 *   21:136 (left-top):    x=133,  y=1956 → L=9.24%,  T=47.67%  rot=+15.8°
 *   21:135 (left-bottom): x=196,  y=2113 → L=13.61%, T=64.30%  rot=−27.35°
 *   21:140 (right-top):   x=1104, y=1998 → L=76.67%, T=52.12%  rot=−16.19°
 *   21:144 (right-bottom):x=1034, y=2146 → L=71.81%, T=67.80%  rot=+8.34°
 */
export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '1440 / 944', minHeight: '520px' }}
    >
      {/* HOLZTISCH – full bleed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt="Holztisch"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* TEPPICH – Figma: top=−1.9%, w=86.8%, h=91.1% */}
      <div
        className="absolute z-[1] overflow-hidden"
        style={{
          left: '6.597%',
          top: '-1.907%',
          width: '86.806%',
          height: '91.102%',
          borderRadius: '3.097vw',
          border: '0.6vw solid rgba(0,0,0,0.2)',
          boxShadow:
            'inset 6px 6px 8px rgba(0,0,0,0.15), inset 6px 6px 6px rgba(0,0,0,0.25)',
        }}
      >
        <Image
          src="/images/backgrounds/felt-figma.png"
          alt="Jassteppich"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              'inset -4px -4px 4px 1px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(0,0,0,0.25)',
          }}
        />
      </div>

      {/* ── KARTEN ────────────────────────────────────────────── */}

      {/* CARD LEFT TOP – 21:136: x=133, y=1956, rot=+15.8° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '9.236%', top: '47.669%', width: '11.042%' }}
        initial={{ opacity: 0, y: -30, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 15.8 }}
        transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-left-top.png"
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
          priority
        />
      </motion.div>

      {/* CARD LEFT BOTTOM – 21:135: x=196, y=2113, rot=−27.35° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '13.611%', top: '64.301%', width: '11.042%' }}
        initial={{ opacity: 0, x: -40, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: -27.35 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-left-bottom.png"
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.45))' }}
          priority
        />
      </motion.div>

      {/* CARD RIGHT TOP – 21:140: x=1104, y=1998, rot=−16.19° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '76.667%', top: '52.119%', width: '11.042%' }}
        initial={{ opacity: 0, y: -30, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -16.19 }}
        transition={{ duration: 0.8, delay: 0.35, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-right-top.png"
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
          priority
        />
      </motion.div>

      {/* CARD RIGHT BOTTOM – 21:144: x=1034, y=2146, rot=+8.34° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '71.806%', top: '67.797%', width: '11.042%' }}
        initial={{ opacity: 0, x: 30, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 8.34 }}
        transition={{ duration: 0.9, delay: 0.45, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-right-bottom.png"
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))' }}
          priority
        />
      </motion.div>

      {/* ── TEXTE – direkt im section, kein Wrapper-Div ─────── */}

      {/* HEADLINE – Figma: y=1804 → top=31.57% */}
      <motion.h1
        className="absolute z-20 w-full text-center px-8"
        style={{
          top: '31.57%',
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5.208vw, 75px)',
          lineHeight: 1.0,
          letterSpacing: '-0.96px',
          color: '#ffffff',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {/* SUBTITLE – Figma: y=1986 → top=50.85% */}
      <motion.p
        className="absolute z-20 w-full text-center px-8"
        style={{
          top: '50.85%',
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(16px, 1.944vw, 28px)',
          lineHeight: 1.35,
          color: 'rgba(255,255,255,0.92)',
          textShadow: '0 1px 8px rgba(0,0,0,0.2)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>

      {/* CTA BUTTON – Figma: y=2178 → top=71.19% */}
      <motion.div
        className="absolute z-20 w-full flex justify-center"
        style={{ top: '71.19%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <Button
          href="/de/projekte/jugendmeisterschaft"
          size="lg"
          className="bg-[#ff0000] hover:bg-[#cc0000] text-white text-[17px] font-bold px-8 py-4 rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all transform hover:-translate-y-1 whitespace-nowrap"
        >
          {cta}
          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ bottom: '4%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
