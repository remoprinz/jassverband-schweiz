'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

const ALL_CARDS = [
  'E6','E7','E8','E9','E10','EU','EO','EK','EA',
  'L6','L7','L8','L9','L10','LU','LO','LK','LA',
  'R6','R7','R8','R9','R10','RU','RO','RK','RA',
  'S6','S7','S8','S9','S10','SU','SO','SK','SA',
];

function pickRandomCards(count: number): string[] {
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(c => `/cards/de/${c}.webp`);
}

function randomCardEntry(side: 'left' | 'right') {
  const angle = Math.random() * 360;
  const rad = (angle * Math.PI) / 180;
  const dist = 70 + Math.random() * 30;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist;
  const rot = (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 300);
  return {
    x: `${side === 'left' ? -Math.abs(x) : Math.abs(x)}vw`,
    y: `${y}vh`,
    rotate: rot,
  };
}

/**
 * FIGMA API – KORREKTER REFERENZRAHMEN (Home-Frame = y=1530, h≈920):
 *
 * Home-Frame (2:441):  x=0, y=1530, w=1440 → unser Section-Koordinatensystem
 * Section-Höhe (sichtbar): 1506+944 - 1530 = 920px → aspectRatio: 1440/920
 *
 * Teppich (36:52):   y=1488 → top=(1488-1530)/920 = -4.565%
 *                    w=1250, h=860 → w=86.806%, h=860/920=93.478%
 *
 * Headline (3:148):  y=1804, w=771  → top=(1804-1530)/920=29.78%, maxW=771/1440=53.54%
 * Subtitle (3:150):  y=1986, w=571  → top=(1986-1530)/920=49.57%, maxW=571/1440=39.65%
 * CTA (3:152):       y=2178, h=60   → top=(2178-1530)/920=70.43%
 *
 * Karten (bounding-box top-left x/y, intrinsic 159×250px):
 *   21:136 (links-oben):   x=133, y=1956 → L=9.24%,  T=(1956-1530)/920=46.30%  rot=+15.8°
 *   21:135 (links-unten):  x=196, y=2113 → L=13.61%, T=(2113-1530)/920=63.37%  rot=−27.35°
 *   21:140 (rechts-oben):  x=1104,y=1998 → L=76.67%, T=(1998-1530)/920=50.87%  rot=−16.19°
 *   21:144 (rechts-unten): x=1034,y=2146 → L=71.81%, T=(2146-1530)/920=66.96%  rot=+8.34°
 */
export function Hero({ title, subtitle, cta }: HeroProps) {
  const cardEntries = useMemo(() => {
    const cards = pickRandomCards(8);
    return {
      leftTop: { ...randomCardEntry('left'), src: cards[0] },
      leftBottom: { ...randomCardEntry('left'), src: cards[1] },
      rightTop: { ...randomCardEntry('right'), src: cards[2] },
      rightBottom: { ...randomCardEntry('right'), src: cards[3] },
      mobileLeft1: { ...randomCardEntry('left'), src: cards[4] },
      mobileLeft2: { ...randomCardEntry('left'), src: cards[5] },
      mobileRight1: { ...randomCardEntry('right'), src: cards[6] },
      mobileRight2: { ...randomCardEntry('right'), src: cards[7] },
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', maxHeight: '920px', minHeight: '520px' }}
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

      {/* TEPPICH – responsive via CSS vars */}
      <div
        className="absolute z-[1] overflow-hidden"
        style={{
          left: 'var(--hero-felt-left)',
          top: 'var(--hero-felt-top)',
          width: 'var(--hero-felt-width)',
          height: 'var(--hero-felt-height)',
          borderRadius: 'var(--hero-felt-radius)',
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
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            borderRadius: 'inherit',
            border: 'var(--hero-felt-border) solid rgba(0,0,0,0.28)',
          }}
        />
      </div>

      {/* ── KARTEN ─────────────────────────────────────────────────────── */}

      {/* CARD LINKS OBEN – fliegt von links-oben ein */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '12.18%', top: '46.304%', width: '11.042%' }}
        initial={{ opacity: 0, x: cardEntries.leftTop.x, y: cardEntries.leftTop.y, rotate: cardEntries.leftTop.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 15.8 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.leftTop.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
          priority
        />
      </motion.div>

      {/* CARD LINKS UNTEN – fliegt von links ein */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '20.55%', top: '63.370%', width: '11.042%' }}
        initial={{ opacity: 0, x: cardEntries.leftBottom.x, y: cardEntries.leftBottom.y, rotate: cardEntries.leftBottom.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -27.35 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.leftBottom.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.45))' }}
          priority
        />
      </motion.div>

      {/* CARD RECHTS OBEN – fliegt von rechts-oben ein */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '76.667%', top: '50.870%', width: '11.042%' }}
        initial={{ opacity: 0, x: cardEntries.rightTop.x, y: cardEntries.rightTop.y, rotate: cardEntries.rightTop.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -16.19 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.rightTop.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
          priority
        />
      </motion.div>

      {/* CARD RECHTS UNTEN – fliegt von rechts ein */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '71.806%', top: '66.957%', width: '11.042%' }}
        initial={{ opacity: 0, x: cardEntries.rightBottom.x, y: cardEntries.rightBottom.y, rotate: cardEntries.rightBottom.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 8.34 }}
        transition={{ duration: 0.75, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.rightBottom.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '1.2vw', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))' }}
          priority
        />
      </motion.div>

      {/* ── MOBILE KARTEN (nur < md) ─────────────────────────────────── */}

      {/* MOBILE CARD LINKS 1 */}
      <motion.div
        className="absolute z-10 md:hidden"
        style={{ left: '3%', top: '55%', width: '22%' }}
        initial={{ opacity: 0, x: cardEntries.mobileLeft1.x, y: cardEntries.mobileLeft1.y, rotate: cardEntries.mobileLeft1.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.mobileLeft1.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '8px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
        />
      </motion.div>

      {/* MOBILE CARD LINKS 2 */}
      <motion.div
        className="absolute z-10 md:hidden"
        style={{ left: '18%', top: '62%', width: '22%' }}
        initial={{ opacity: 0, x: cardEntries.mobileLeft2.x, y: cardEntries.mobileLeft2.y, rotate: cardEntries.mobileLeft2.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -20 }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.mobileLeft2.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '8px', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}
        />
      </motion.div>

      {/* MOBILE CARD RECHTS 1 */}
      <motion.div
        className="absolute z-10 md:hidden"
        style={{ right: '3%', top: '55%', width: '22%' }}
        initial={{ opacity: 0, x: cardEntries.mobileRight1.x, y: cardEntries.mobileRight1.y, rotate: cardEntries.mobileRight1.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -14 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.mobileRight1.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '8px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
        />
      </motion.div>

      {/* MOBILE CARD RECHTS 2 */}
      <motion.div
        className="absolute z-10 md:hidden"
        style={{ right: '18%', top: '62%', width: '22%' }}
        initial={{ opacity: 0, x: cardEntries.mobileRight2.x, y: cardEntries.mobileRight2.y, rotate: cardEntries.mobileRight2.rotate }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
        transition={{ duration: 0.75, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={cardEntries.mobileRight2.src}
          alt="Jasskarte"
          width={159}
          height={250}
          className="w-full h-auto"
          style={{ borderRadius: '8px', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}
        />
      </motion.div>

      {/* ── TEXTE – direkt im section als absolute, kein Wrapper ─────── */}

      {/* HEADLINE – responsive via CSS vars */}
      <motion.div
        className="absolute z-20 left-0 right-0 flex justify-center"
        style={{ top: 'var(--hero-title-top)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h1
          style={{
            textAlign: 'center',
            maxWidth: 'var(--hero-title-max-width)',
            width: '90%',
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'var(--hero-title-size)',
            lineHeight: 'var(--hero-title-line-height)',
            letterSpacing: '-0.96px',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h1>
      </motion.div>

      {/* SUBTITLE – responsive via CSS vars */}
      <motion.div
        className="absolute z-20 left-0 right-0 flex justify-center"
        style={{ top: 'var(--hero-subtitle-top)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p
          style={{
            textAlign: 'center',
            maxWidth: 'var(--hero-subtitle-max-width)',
            width: 'var(--hero-subtitle-width)',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'var(--hero-subtitle-size)',
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 8px rgba(0,0,0,0.2)',
          }}
        >
          {subtitle}
        </p>
      </motion.div>

      {/* CTA BUTTON – responsive via CSS vars */}
      <motion.div
        className="absolute z-20 flex justify-center"
        style={{
          top: 'var(--hero-cta-top)',
          left: 0,
          right: 0,
        }}
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
