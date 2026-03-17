'use client';

import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PiCalculatorFill } from 'react-icons/pi';
import { Button } from '@/components/ui';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  locale: string;
  altTable?: string;
  altFelt?: string;
  altCard?: string;
  ctaHref?: string;
  preserveTitleLineBreaks?: boolean;
  /** Mobile: Flex-Flow-Layout statt fixer %-Positionen. Aktiviert für Seiten
   *  wo H1-Inhalt variiert (z.B. Plattform) – Home bleibt absolut-positioniert. */
  mobileFlow?: boolean;
  /** Mobile Flow: Überschreibt die Schriftgrösse des H1 (Standard: var(--hero-title-size)).
   *  Nützlich für Seiten mit längeren Titeln, die sonst umbrechen würden. */
  mobileFlowTitleSize?: string;
  /** Überschreibt den Titel nur auf Mobile (md:hidden). Nützlich wenn mobile
   *  andere Zeilenumbrüche braucht als Desktop. */
  mobileTitle?: string;
  /** Dekorativer Eichenlaub-Kranz rund um die Schrift. */
  wreath?: boolean;
  /** Silbentrennung im Mobile-Titel deaktivieren. */
  noHyphens?: boolean;
  /**
   * Überschreibt --hero-title-top nur auf Desktop/Tablet (md+).
   * Nützlich wenn der Titel länger als auf der Homepage ist und
   * mehr Raum braucht, ohne die Subtitle-Position zu ändern.
   */
  heroTitleTopDesktop?: string;
  teaser?: {
    label: string;
    text: string;
    badge?: string;
  };
}

const DE_CARD_SET = [
  'card-01', 'card-02', 'card-03', 'card-04', 'card-05',
  'card-06', 'card-07', 'card-08', 'card-09', 'card-10',
];

const FR_CARD_SET = [
  'card-01', 'card-02', 'card-03', 'card-04', 'card-05',
  'card-06', 'card-07', 'card-08', 'card-09', 'card-10', 'card-11',
];

function pickRandomCards() {
  const allCards = [
    ...DE_CARD_SET.map((c) => `/cards/de/${c}.png`),
    ...FR_CARD_SET.map((c) => `/cards/fr/${c}.png`),
  ];
  const shuffled = allCards.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 8);

  const desktopCards = picked.slice(0, 4);
  const mobileCards = picked.slice(4, 8);

  return { desktopCards, mobileCards };
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
export function Hero({
  title,
  subtitle,
  cta,
  locale,
  altTable,
  altFelt,
  altCard,
  ctaHref,
  preserveTitleLineBreaks = false,
  mobileFlow = false,
  mobileFlowTitleSize,
  mobileTitle,
  wreath = false,
  heroTitleTopDesktop,
  teaser,
  noHyphens = false,
}: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const resolvedCtaHref = ctaHref ?? `/${locale}/mitmachen`;

  useEffect(() => {
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      setIsMounted(true);
      innerFrame = requestAnimationFrame(() => {
        setAnimateCards(true);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      if (innerFrame) {
        cancelAnimationFrame(innerFrame);
      }
    };
  }, []);

  const cardEntries = useMemo(() => {
    if (!isMounted) {
      return null;
    }

    const { desktopCards, mobileCards } = pickRandomCards();
    return {
      leftTop: { ...randomCardEntry('left'), src: desktopCards[0] },
      leftBottom: { ...randomCardEntry('left'), src: desktopCards[1] },
      rightTop: { ...randomCardEntry('right'), src: desktopCards[2] },
      rightBottom: { ...randomCardEntry('right'), src: desktopCards[3] },
      mobileLeft1: { ...randomCardEntry('left'), src: mobileCards[0] },
      mobileLeft2: { ...randomCardEntry('left'), src: mobileCards[1] },
      mobileRight1: { ...randomCardEntry('right'), src: mobileCards[2] },
      mobileRight2: { ...randomCardEntry('right'), src: mobileCards[3] },
    };
  }, [isMounted]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '520px' }}
      suppressHydrationWarning={true}
    >
      {/* HOLZTISCH – full bleed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/holztisch.jpg"
          alt={altTable ?? 'Holztisch'}
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
          alt={altFelt ?? 'Jassteppich'}
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

      {cardEntries && (
        <>
          {/* CARD LINKS OBEN – fliegt von links-oben ein */}
          <motion.div
            className="absolute z-10 hidden lg:block"
            style={{
              left: 'calc(var(--hero-felt-left) + 4.903%)',
              top: '46.304%',
              width: '11.042%',
            }}
            initial={{ opacity: 0, x: cardEntries.leftTop.x, y: cardEntries.leftTop.y, rotate: cardEntries.leftTop.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: 15.8 } : undefined}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.leftTop.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '14px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
              priority
            />
          </motion.div>

          {/* CARD LINKS UNTEN – fliegt von links ein */}
          <motion.div
            className="absolute z-10 hidden lg:block"
            style={{
              left: 'calc(var(--hero-felt-left) + 11.273%)',
              top: '63.370%',
              width: '11.042%',
            }}
            initial={{ opacity: 0, x: cardEntries.leftBottom.x, y: cardEntries.leftBottom.y, rotate: cardEntries.leftBottom.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: -27.35 } : undefined}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.leftBottom.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '14px', filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.45))' }}
              priority
            />
          </motion.div>

          {/* CARD RECHTS OBEN – fliegt von rechts-oben ein */}
          <motion.div
            className="absolute z-10 hidden lg:block"
            style={{
              right: 'calc(100% - (var(--hero-felt-left) + var(--hero-felt-width)) + 4.903%)',
              top: '48.9%',
              width: '11.042%',
            }}
            initial={{ opacity: 0, x: cardEntries.rightTop.x, y: cardEntries.rightTop.y, rotate: cardEntries.rightTop.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: -16.19 } : undefined}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.rightTop.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '14px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
              priority
            />
          </motion.div>

          {/* CARD RECHTS UNTEN – fliegt von rechts ein */}
          <motion.div
            className="absolute z-10 hidden lg:block"
            style={{
              right: 'calc(100% - (var(--hero-felt-left) + var(--hero-felt-width)) + 11.273%)',
              top: '64.987%',
              width: '11.042%',
            }}
            initial={{ opacity: 0, x: cardEntries.rightBottom.x, y: cardEntries.rightBottom.y, rotate: cardEntries.rightBottom.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: 8.34 } : undefined}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.rightBottom.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '14px', filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))' }}
              priority
            />
          </motion.div>

          {/* ── MOBILE KARTEN (nur < md) ─────────────────────────────────── */}

          {/* MOBILE CARD LINKS 1 */}
          <motion.div
            className="absolute z-10 lg:hidden"
            style={{ left: '3%', top: '55%', width: '22%' }}
            initial={{ opacity: 0, x: cardEntries.mobileLeft1.x, y: cardEntries.mobileLeft1.y, rotate: cardEntries.mobileLeft1.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: 12 } : undefined}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.mobileLeft1.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '6px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
            />
          </motion.div>

          {/* MOBILE CARD LINKS 2 */}
          <motion.div
            className="absolute z-10 lg:hidden"
            style={{ left: '18%', top: '62%', width: '22%' }}
            initial={{ opacity: 0, x: cardEntries.mobileLeft2.x, y: cardEntries.mobileLeft2.y, rotate: cardEntries.mobileLeft2.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: -20 } : undefined}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.mobileLeft2.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '6px', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}
            />
          </motion.div>

          {/* MOBILE CARD RECHTS 1 */}
          <motion.div
            className="absolute z-10 lg:hidden"
            style={{ right: '3%', top: '55%', width: '22%' }}
            initial={{ opacity: 0, x: cardEntries.mobileRight1.x, y: cardEntries.mobileRight1.y, rotate: cardEntries.mobileRight1.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: -14 } : undefined}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.mobileRight1.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '6px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
            />
          </motion.div>

          {/* MOBILE CARD RECHTS 2 */}
          <motion.div
            className="absolute z-10 lg:hidden"
            style={{ right: '18%', top: '62%', width: '22%' }}
            initial={{ opacity: 0, x: cardEntries.mobileRight2.x, y: cardEntries.mobileRight2.y, rotate: cardEntries.mobileRight2.rotate }}
            animate={animateCards ? { opacity: 1, x: 0, y: 0, rotate: 8 } : undefined}
            transition={{ duration: 0.75, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={cardEntries.mobileRight2.src}
              alt={altCard ?? 'Jasskarte'}
              width={159}
              height={250}
              className="w-full h-auto"
              style={{ borderRadius: '6px', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}
            />
          </motion.div>
        </>
      )}

      {/* ── KRANZ – dekorativ hinter dem Text ──────────────────────── */}
      {wreath && (
        <motion.div
          className="absolute pointer-events-none w-[78vw] md:w-[54vw] max-w-[744px]"
          style={{
            zIndex: 15,
            left: '50%',
            top: 'var(--kranz-top, calc(43% - 15px))',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 768px) {
                :root {
                  --kranz-top: 43%;
                }
              }
            `
          }} />
          <Image
            src="/images/decorations/kranz.png"
            alt=""
            aria-hidden="true"
            width={636}
            height={600}
            className="w-full h-auto"
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.22,
            }}
            priority
          />
        </motion.div>
      )}

      {/* ── TEXTE – direkt im section als absolute, kein Wrapper ─────── */}

      {/* ── MOBILE FLOW LAYOUT (nur wenn mobileFlow=true, versteckt auf ≥md) ── */}
      {/* Enthält H1 + Subtitle im Flow, damit Subtitle zwischen Titel und Teaser steht */}
      {mobileFlow && (
        <motion.div
          className="absolute z-20 left-0 right-0 md:hidden flex flex-col items-center"
          style={{ top: 'var(--hero-title-top)', gap: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1
            style={{
              textAlign: 'center',
              width: '90%',
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: mobileFlowTitleSize ?? 'var(--hero-title-size)',
              lineHeight: 'var(--hero-title-line-height)',
              letterSpacing: '-0.96px',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {(() => {
              const mobileText = mobileTitle ?? title;
              return preserveTitleLineBreaks && mobileText.includes('\n') ? (
                mobileText.split('\n').map((line, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      overflowWrap: 'break-word',
                      hyphens: noHyphens ? 'none' : 'auto',
                      ...(i > 0 ? { marginTop: '2px' } : {}),
                    }}
                  >
                    {line}
                  </span>
                ))
              ) : (
                <span style={{
                  whiteSpace: preserveTitleLineBreaks ? 'pre-line' : 'normal',
                  overflowWrap: 'break-word',
                  hyphens: noHyphens ? 'none' : 'auto',
                }}>
                  {mobileText}
                </span>
              );
            })()}
          </h1>
          <p
            style={{
              textAlign: 'center',
              width: '85%',
              maxWidth: '300px',
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
      )}

      {/* TEASER – Mobile Flow: absolut, tiefer zwischen den Karten, schmaler Container */}
      {mobileFlow && teaser && (
        <motion.div
          className="absolute z-20 left-0 right-0 md:hidden flex justify-center"
          style={{ top: '53%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col items-center" style={{ gap: '5px', maxWidth: '150px' }}>
            {teaser.badge && (
              <span
                className="inline-flex items-center justify-center rounded-full px-3 py-[3px]"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  lineHeight: 1,
                  color: '#ffffff',
                  backgroundColor: '#ff0000',
                }}
              >
                {teaser.badge}
              </span>
            )}
            <p
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.4,
                textAlign: 'center',
              }}
            >
              {teaser.text}
            </p>
          </div>
        </motion.div>
      )}

      {/* HEADLINE – responsive via CSS vars (Desktop; auf Mobile nur wenn !mobileFlow) */}
      <motion.div
        className={`absolute z-20 left-0 right-0 flex justify-center${mobileFlow ? ' hidden md:flex' : ''}`}
        style={{ top: heroTitleTopDesktop ?? 'var(--hero-title-top)' }}
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
            whiteSpace: preserveTitleLineBreaks ? 'pre-line' : 'normal',
          }}
        >
          {title}
        </h1>
      </motion.div>

      {/* SUBTITLE – absolut positioniert, nur auf Desktop oder wenn nicht mobileFlow */}
      <motion.div
        className={`absolute z-20 left-0 right-0 flex justify-center${mobileFlow ? ' hidden md:flex' : ''}`}
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

      {/* TEASER – Desktop und Tablet (auf Mobile eigene mobileFlow-Variante) */}
      {teaser && (
        <motion.div
          className={`absolute z-20 left-0 right-0 flex justify-center px-4${mobileFlow ? ' hidden md:flex' : ''}`}
          style={{ top: 'var(--hero-teaser-top)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center flex flex-col items-center gap-2">
            <span
              className="inline-flex items-center justify-center rounded-full px-3 py-[3px]"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.1vw, 13px)',
                lineHeight: 1,
                color: '#ffffff',
                backgroundColor: '#ff0000',
              }}
            >
              Neu
            </span>
            <p
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(12px, 1.2vw, 14px)',
                color: 'rgba(255,255,255,0.70)',
                lineHeight: 1.35,
              }}
            >
              {teaser.text}
            </p>
          </div>
        </motion.div>
      )}

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
          href={resolvedCtaHref}
          size="lg"
          className="bg-[#ff0000] hover:bg-[#cc0000] text-white text-[17px] font-bold px-8 py-4 rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all transform hover:-translate-y-1 whitespace-nowrap"
        >
          {teaser && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-5 h-5 shrink-0 rounded-full bg-[#FFFFFF] flex items-center justify-center">
                  <PiCalculatorFill className="w-3 h-3 text-[#ff0000]" style={{ transform: 'scale(1.1)' }} />
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: '17px',
                    lineHeight: '1',
                    transform: 'translateY(1px)',
                    display: 'inline-block',
                  }}
                >
                  {teaser.label}
                </span>
              </span>
            </>
          )}
          {!teaser && cta}
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
        <Image
          src="/images/icons/pfeil_unten_weiss.svg"
          alt=""
          width={24}
          height={28}
          className="opacity-100"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
