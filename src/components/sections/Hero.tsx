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
 * Figma canvas: 1440px × 920px
 * All positions converted to % of canvas:
 *   x% = pixel / 1440 * 100
 *   y% = pixel / 920 * 100
 * Section uses aspect-ratio: 1440/920 so % values always match Figma exactly.
 */
export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '1440 / 920', minHeight: '560px' }}
    >
      {/* ── HOLZTISCH ─────────────────────────────────────────────────────
          Figma: top-[-24px] h-[944px] → top: -24/920 = -2.6%, h: 944/920 = 102.6%
          Extends slightly above the section so it bleeds behind the transparent header. */}
      <div
        className="absolute left-0 right-0 z-0"
        style={{ top: '-2.609%', height: '102.609%' }}
      >
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt="Holztisch"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* ── TEPPICH (Grüner Filz) ──────────────────────────────────────────
          Figma exact structure:
          Outer:  size-[475px] left-[95px] top-[-42px]  → 6.597% / -4.565% / w:32.986% / aspect-ratio:1
          Inner:  border-[8.646px] border-rgba(0,0,0,0.2) rounded-[44.611px]
                  with felt texture + inner shadows
          Outer shadow: inset 6px 6px 8px rgba(0,0,0,0.15) + inset 6px 6px 6px rgba(0,0,0,0.25) */}
      <div
        className="absolute z-[1]"
        style={{
          left: '6.597%',
          top: '-4.565%',
          width: '32.986%',
          aspectRatio: '1',
          borderRadius: '3.097vw',
          boxShadow: 'inset 6px 6px 8px 0px rgba(0,0,0,0.15), inset 6px 6px 6px 0px rgba(0,0,0,0.25)',
        }}
      >
        {/* Inner bordered frame with texture */}
        <div
          className="absolute overflow-hidden"
          style={{
            inset: 0,
            border: '0.6vw solid rgba(0,0,0,0.2)',
            borderRadius: '3.097vw',
          }}
        >
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt="Jassteppich"
            fill
            className="object-cover"
            priority
          />
          {/* Figma inner shadow on texture */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                'inset -4px -4px 4px 1px rgba(0,0,0,0.25), inset 0px 4px 4px 0px rgba(0,0,0,0.25)',
            }}
          />
        </div>
      </div>

      {/* ── KARTE LINKS OBEN ──────────────────────────────────────────────
          Figma node 21:136 → container left-[132.95px] top-[426px]
          Card: 245×382px, rotate 15.8°
          x: 132.95/1440 = 9.232%
          y: 426/920    = 46.304% */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '9.232%', top: '46.304%', width: '17.014%' }}
        initial={{ opacity: 0, y: -40, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 15.8 }}
        transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-left-top.png"
          alt="Jasskarte"
          width={245}
          height={382}
          className="w-full h-auto"
          style={{
            borderRadius: '1.67vw',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))',
          }}
          priority
        />
      </motion.div>

      {/* ── KARTE LINKS UNTEN (gross) ─────────────────────────────────────
          Figma node 21:135 → container left-[196px] top-[583.49px]
          Card: 306×478px, rotate -27.35°
          x: 196/1440   = 13.611%
          y: 583/920    = 63.370% */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '13.611%', top: '63.370%', width: '21.250%' }}
        initial={{ opacity: 0, x: -60, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: -27.35 }}
        transition={{ duration: 0.9, delay: 0.45, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-left-bottom.png"
          alt="Jasskarte"
          width={306}
          height={478}
          className="w-full h-auto"
          style={{
            borderRadius: '1.67vw',
            filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
          }}
          priority
        />
      </motion.div>

      {/* ── KARTE RECHTS OBEN ────────────────────────────────────────────
          Figma node 21:140 → container left-[calc(83.33%-96px)] = 1104px, top-[467.68px]
          Card: 245×382px, rotate -16.19°
          x: 1104/1440  = 76.667%
          y: 467.68/920 = 50.835% */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '76.667%', top: '50.835%', width: '17.014%' }}
        initial={{ opacity: 0, y: -40, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -16.19 }}
        transition={{ duration: 0.9, delay: 0.35, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-right-top.png"
          alt="Jasskarte"
          width={245}
          height={382}
          className="w-full h-auto"
          style={{
            borderRadius: '1.67vw',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))',
          }}
          priority
        />
      </motion.div>

      {/* ── KARTE RECHTS UNTEN (klein) ───────────────────────────────────
          Figma node 21:144 → container left-[calc(75%-46.27px)] = 1033.73px, top-[616px]
          Card: 159×250px, rotate 8.34°
          x: 1033.73/1440 = 71.787%
          y: 616/920      = 66.957% */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '71.787%', top: '66.957%', width: '11.042%' }}
        initial={{ opacity: 0, x: 40, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 8.34 }}
        transition={{ duration: 0.9, delay: 0.5, type: 'spring', stiffness: 80 }}
      >
        <Image
          src="/images/cards/figma-card-right-bottom.png"
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{
            borderRadius: '0.83vw',
            filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.35))',
          }}
          priority
        />
      </motion.div>

      {/* ── TEXT CONTENT ─────────────────────────────────────────────────
          Figma:
            Title CENTER:    x=720px (50%), y=344px → top of title = (344-70)/920 = 29.78%
            Subtitle CENTER: y=487px → below title, gap title-bottom→subtitle-top = 37px
            CTA top:         y=648px → gap subtitle-bottom→CTA = 125px

          Font sizes as vw (scale with viewport width = scale with section width):
            75px / 1440 * 100 = 5.208vw
            28px / 1440 * 100 = 1.944vw */}
      <div
        className="absolute z-20 inset-x-0 flex flex-col items-center text-center"
        style={{ top: '29.78%' }}
      >
        {/* TITEL: Capita Bold 75px / line-height 70px */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 5.208vw, 75px)',
            lineHeight: 'clamp(32px, 4.861vw, 70px)',
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

        {/* UNTERTITEL: Inter Regular 28px / line-height 36px
            Gap to title bottom: 37px = 37/1440*100 = 2.569vw */}
        <motion.p
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.944vw, 28px)',
            lineHeight: 'clamp(22px, 2.5vw, 36px)',
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 8px rgba(0,0,0,0.2)',
            marginTop: 'clamp(16px, 2.569vw, 37px)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA BUTTON
            Gap subtitle bottom → button top: 125px = 125/1440*100 = 8.681vw */}
        <motion.div
          style={{ marginTop: 'clamp(32px, 8.681vw, 125px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Button
            href="/de/projekte/jugendmeisterschaft"
            size="lg"
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white text-[17px] font-bold px-8 py-4 rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {cta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* ── SCROLL INDIKATOR ──────────────────────────────────────────────
          Figma: top-[865px] → 865/920 = 94% → bottom: 6% */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ bottom: '6%' }}
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
