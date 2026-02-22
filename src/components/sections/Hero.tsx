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
 * FIGMA API EXACT VALUES (2026-02-22, Token-verified):
 * 
 * Canvas (holztisch): x=0, y=1506, w=1440, h=944
 * → aspectRatio: 1440/944
 * 
 * Teppich (21:125): x=95, y=1488, w=1250, h=860
 *   Relative to canvas (y=1506):
 *   → left: 95/1440 = 6.597%
 *   → top: (1488-1506)/944 = -1.907%
 *   → width: 1250/1440 = 86.806%
 *   → height: 860/944 = 91.102%
 * 
 * Headline (3:148): x=335, y=1804, w=771, h=140
 *   → top: (1804-1506)/944 = 31.568%
 *   → centered horizontally
 * 
 * Subtitle (3:150): x=435, y=1986, w=571, h=62
 *   → top: (1986-1506)/944 = 50.847%
 * 
 * CTA Button (3:152): x=567, y=2178, w=307, h=60
 *   → top: (2178-1506)/944 = 71.186%
 * 
 * Cards (intrinsic 159×250, rotated bounding boxes):
 *   21:136: x=133, y=1956, rot=+15.8°  → left: 9.236%, top: 47.669%
 *   21:135: x=196, y=2113, rot=-27.35° → left: 13.611%, top: 64.301%
 *   21:140: x=1104, y=1998, rot=-16.19° → left: 76.667%, top: 52.119%
 *   21:144: x=1034, y=2146, rot=+8.34° → left: 71.806%, top: 67.797%
 */
export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '1440 / 944', minHeight: '560px' }}
    >
      {/* HOLZTISCH - full bleed */}
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

      {/* TEPPICH - Figma: x=95, y=1488 (top=-1.9%), w=1250, h=860 */}
      <div
        className="absolute z-[1] overflow-hidden"
        style={{
          left: '6.597%',
          top: '-1.907%',
          width: '86.806%',
          height: '91.102%',
          borderRadius: '3.097vw',
          border: '0.6vw solid rgba(0,0,0,0.2)',
          boxShadow: 'inset 6px 6px 8px 0px rgba(0,0,0,0.15), inset 6px 6px 6px 0px rgba(0,0,0,0.25)',
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
            boxShadow: 'inset -4px -4px 4px 1px rgba(0,0,0,0.25), inset 0px 4px 4px 0px rgba(0,0,0,0.25)',
          }}
        />
      </div>

      {/* CARD LEFT TOP - 21:136: x=133, y=1956, rotate +15.8° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{
          left: '9.236%',
          top: '47.669%',
          width: '11.042%',
        }}
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
          style={{
            borderRadius: '1.2vw',
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          }}
          priority
        />
      </motion.div>

      {/* CARD LEFT BOTTOM - 21:135: x=196, y=2113, rotate -27.35° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{
          left: '13.611%',
          top: '64.301%',
          width: '11.042%',
        }}
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
          style={{
            borderRadius: '1.2vw',
            filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.45))',
          }}
          priority
        />
      </motion.div>

      {/* CARD RIGHT TOP - 21:140: x=1104, y=1998, rotate -16.19° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{
          left: '76.667%',
          top: '52.119%',
          width: '11.042%',
        }}
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
          style={{
            borderRadius: '1.2vw',
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          }}
          priority
        />
      </motion.div>

      {/* CARD RIGHT BOTTOM - 21:144: x=1034, y=2146, rotate +8.34° */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{
          left: '71.806%',
          top: '67.797%',
          width: '11.042%',
        }}
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
          style={{
            borderRadius: '1.2vw',
            filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))',
          }}
          priority
        />
      </motion.div>

      {/* TEXT CONTENT - positioned exactly as in Figma */}
      <div className="absolute z-20 inset-x-0 flex flex-col items-center text-center">
        {/* HEADLINE - Figma: top: 31.568% */}
        <motion.h1
          style={{
            position: 'absolute',
            top: '31.568%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-capita), Capita, Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 5.208vw, 75px)',
            lineHeight: 'clamp(32px, 4.861vw, 70px)',
            letterSpacing: '-0.96px',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* SUBTITLE - Figma: top: 50.847% */}
        <motion.p
          style={{
            position: 'absolute',
            top: '50.847%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.944vw, 28px)',
            lineHeight: 'clamp(22px, 2.5vw, 36px)',
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 8px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA BUTTON - Figma: top: 71.186% */}
        <motion.div
          style={{
            position: 'absolute',
            top: '71.186%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2"
        style={{ bottom: '4%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 text-white/70 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
