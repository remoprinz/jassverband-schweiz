'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface EhrenkodexContentProps {
  title: string;
  subtitle: string;
  intro: string;
  fairplayTitle: string;
  fairplayIntro: string;
  fairplay1Title: string;
  fairplay1Text: string;
  fairplay2Title: string;
  fairplay2Text: string;
  fairplay3Title: string;
  fairplay3Text: string;
  konsequenzenTitle: string;
  konsequenzenTransparenz: string;
  konsequenzenIntro: string;
  konsequenzenWarning: string;
  konsequenzenList: string[];
  konsequenzenFooter: string;
  botschafterTitle: string;
  botschafterText1: string;
  botschafterText2: string;
  zielTitle: string;
  zielText: string;
  zielQuote: string;
  cta: string;
  locale: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const capitaFont = 'var(--font-capita), Capita, Georgia, serif';
const interFont = 'var(--font-inter), Inter, system-ui, sans-serif';

const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function EhrenkodexContent({
  title,
  subtitle,
  intro,
  fairplayTitle,
  fairplayIntro,
  fairplay1Title,
  fairplay1Text,
  fairplay2Title,
  fairplay2Text,
  fairplay3Title,
  fairplay3Text,
  konsequenzenTitle,
  konsequenzenTransparenz,
  konsequenzenWarning,
  konsequenzenList,
  konsequenzenFooter,
  botschafterTitle,
  botschafterText1,
  botschafterText2,
  zielTitle,
  zielText,
  zielQuote,
  cta,
  locale,
}: EhrenkodexContentProps) {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          1. HEADER + VERSPRECHEN — Kreidetafel
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/chalkboard.jpg"
            alt=""
            fill
            className="object-cover"
            quality={85}
          />
        </div>
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          aria-hidden
          style={{ backgroundImage: noiseOverlay }}
        />

        <div className="container-main relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-12">
            <ol
              className="flex items-center gap-2 flex-wrap max-w-[768px] mx-auto"
              style={{
                fontFamily: interFont,
                fontSize: 'var(--font-size-14)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <li><Link href={`/${locale}`} className="hover:text-white/80 transition-colors">Home</Link></li>
              <li className="opacity-40">/</li>
              <li><Link href={`/${locale}/verband`} className="hover:text-white/80 transition-colors">Verband</Link></li>
              <li className="opacity-40">/</li>
              <li className="text-white/80">{title}</li>
            </ol>
          </nav>

          <motion.div className="max-w-[768px] mx-auto" {...fadeUp}>
            <h1
              className="mb-10 md:mb-14"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(40px, 6vw, 64px)',
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h1>

            <h2
              className="mb-6 md:mb-8"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(26px, 4vw, 36px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {subtitle}
            </h2>

            <p
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(17px, 2vw, 20px)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. FAIRPLAY — Cream
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <div className="max-w-[768px] mx-auto">
            <motion.h2
              className="mb-4"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 38px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {fairplayTitle}
            </motion.h2>

            <motion.p
              className="mb-10 md:mb-14"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.65,
                color: 'var(--color-foreground-muted)',
              }}
              {...fadeUp}
            >
              {fairplayIntro}
            </motion.p>

            <div className="space-y-8 md:space-y-12">
              {[
                { title: fairplay1Title, text: fairplay1Text },
                { title: fairplay2Title, text: fairplay2Text },
                { title: fairplay3Title, text: fairplay3Text },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: capitaFont,
                      fontWeight: 700,
                      fontSize: 'clamp(20px, 3vw, 26px)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.3px',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: interFont,
                      fontSize: 'clamp(16px, 2vw, 18px)',
                      lineHeight: 1.65,
                      color: 'var(--color-foreground)',
                    }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-[768px] mx-auto mt-16 md:mt-24">
            {/* ── BOTSCHAFTER ── */}
            <motion.h2
              className="mb-6 md:mb-8"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 38px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {botschafterTitle}
            </motion.h2>

            <motion.p
              className="mb-6"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {botschafterText1}
            </motion.p>

            <motion.p
              className="mb-16 md:mb-20"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {botschafterText2}
            </motion.p>

            {/* Ziel */}
            <motion.h2
              className="mb-6 md:mb-8"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 38px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {zielTitle}
            </motion.h2>

            <motion.p
              className="mb-8"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {zielText}
            </motion.p>

            <motion.p
              className="mb-16 md:mb-20"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                lineHeight: 1.3,
                letterSpacing: '-0.5px',
                color: 'var(--color-foreground)',
              }}
              {...fadeUp}
            >
              {zielQuote}
            </motion.p>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. KONSEQUENZEN — Felt (Jasstisch), ganz unten
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt=""
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/0" />
        </div>
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          aria-hidden
          style={{ backgroundImage: noiseOverlay }}
        />

        <div className="container-main relative z-10">
          <div className="max-w-[768px] mx-auto">
            <motion.h2
              className="text-white mb-6"
              style={{
                fontFamily: capitaFont,
                fontWeight: 700,
                fontSize: 'clamp(26px, 4vw, 36px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
              {...fadeUp}
            >
              {konsequenzenTitle}
            </motion.h2>

            <motion.p
              className="mb-6"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(15px, 1.8vw, 17px)',
                lineHeight: 1.55,
                color: 'rgba(255, 255, 255, 0.85)',
              }}
              {...fadeUp}
            >
              {konsequenzenTransparenz}
            </motion.p>

            <motion.p
              className="font-bold mb-6"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(17px, 2.2vw, 21px)',
                lineHeight: 1.55,
                color: 'var(--color-primary)',
              }}
              {...fadeUp}
            >
              {konsequenzenWarning}
            </motion.p>

            <motion.ul
              className="space-y-3 mb-8"
              {...fadeUp}
            >
              {konsequenzenList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/85"
                  style={{
                    fontFamily: interFont,
                    fontSize: 'clamp(15px, 1.8vw, 17px)',
                    lineHeight: 1.55,
                  }}
                >
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/50" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.p
              className="text-white/60"
              style={{
                fontFamily: interFont,
                fontSize: 'clamp(14px, 1.6vw, 16px)',
                lineHeight: 1.6,
              }}
              {...fadeUp}
            >
              {konsequenzenFooter}
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}
