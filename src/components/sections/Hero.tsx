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

      {/* TEPPICH – top=-4.565%, h=93.478%, overflow-hidden clippt rounded-top → kein Holzstreifen */}
      <div
        className="absolute z-[1] overflow-hidden"
        style={{
          left: '6.597%',
          top: '-4.565%',
          width: '86.806%',
          height: '93.478%',
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
        {/* Sauberer Rand ÜBER der Filz-Textur */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            borderRadius: 'inherit',
            border: '16px solid rgba(0,0,0,0.28)',
          }}
        />
      </div>

      {/* ── KARTEN ─────────────────────────────────────────────────────── */}

      {/* CARD LINKS OBEN – 21:136: x=133, y=1956, rot=+15.8° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '16.18%', top: '46.304%', width: '11.042%' }}
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

      {/* CARD LINKS UNTEN – 21:135: x=196, y=2113, rot=−27.35° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '20.55%', top: '63.370%', width: '11.042%' }}
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

      {/* CARD RECHTS OBEN – 21:140: x=1104, y=1998, rot=−16.19° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '76.667%', top: '50.870%', width: '11.042%' }}
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

      {/* CARD RECHTS UNTEN – 21:144: x=1034, y=2146, rot=+8.34° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ left: '71.806%', top: '66.957%', width: '11.042%' }}
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

      {/* ── TEXTE – direkt im section als absolute, kein Wrapper ─────── */}

      {/* HEADLINE – Figma: y=1804, w=771px → top=29.78%, zentriert */}
      <motion.div
        className="absolute z-20 left-0 right-0 flex justify-center"
        style={{ top: '29.78%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h1
          style={{
            textAlign: 'center',
            maxWidth: '771px',
            width: '90%',
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(24px, 5.208vw, 75px)',
            lineHeight: 1.0,
            letterSpacing: '-0.96px',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h1>
      </motion.div>

      {/* SUBTITLE – Figma: y=1986, w=571px → top=49.57%, zentriert */}
      <motion.div
        className="absolute z-20 left-0 right-0 flex justify-center"
        style={{ top: '49.57%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p
          style={{
            textAlign: 'center',
            maxWidth: '571px',
            width: '80%',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.944vw, 28px)',
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 8px rgba(0,0,0,0.2)',
          }}
        >
          {subtitle}
        </p>
      </motion.div>

      {/* CTA BUTTON – Figma: y=2178, h=60 → top=70.43% */}
      <motion.div
        className="absolute z-20 flex justify-center"
        style={{
          top: '70.43%',
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
