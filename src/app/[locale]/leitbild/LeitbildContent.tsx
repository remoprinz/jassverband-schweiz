'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface VisionData {
  title: string;
  text: string;
}

interface MissionData {
  title: string;
  mission: string;
  kernidee: string;
}

interface LeitbildContentProps {
  vision: VisionData;
  missionsTitle: string;
  missions: MissionData[];
}

const CARD_SET = ['card-01', 'card-02', 'card-03', 'card-04', 'card-05'];
const DECO_CARDS = CARD_SET.slice(0, 2).map((c) => `/cards/de/${c}.png`);

export function LeitbildContent({ vision, missionsTitle, missions }: LeitbildContentProps) {
  const cards = DECO_CARDS;

  return (
    <div className="container-main">
      {/* Vision-Block: an Hero angelehnt, eigenständig */}
      <motion.section
        className="relative overflow-hidden rounded-2xl mb-16 md:mb-24"
        style={{
          background: 'linear-gradient(165deg, #1e2d1e 0%, #152015 50%, #0f180f 100%)',
          color: '#ffffff',
          minHeight: '280px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 z-0 opacity-[0.04]" aria-hidden>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Dezente Karten-Deko */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block w-20 opacity-30">
          <Image
            src={cards[0]}
            alt=""
            width={80}
            height={125}
            className="drop-shadow-lg"
            style={{ borderRadius: '10px' }}
          />
        </div>

        <div className="relative z-10 px-6 py-12 md:px-16 md:py-16 max-w-3xl">
          <motion.h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {vision.title}
          </motion.h2>
          <motion.p
            className="text-white/92 text-lg md:text-xl leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {vision.text}
          </motion.p>
        </div>
      </motion.section>

      {/* Missionen */}
      <motion.h2
        className="text-center mb-12 md:mb-16"
        style={{
          fontFamily: 'var(--font-capita), Capita, Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 42px)',
          lineHeight: '1.37',
          letterSpacing: '-0.96px',
          color: 'var(--color-foreground)',
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {missionsTitle}
      </motion.h2>

      <div className="space-y-10 md:space-y-14">
        {missions.map((item, index) => (
          <motion.article
            key={index}
            className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
            style={{ borderRadius: 'var(--radius-card-lg)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <h3
              className="mb-2"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'var(--font-size-20)',
                lineHeight: '1.25',
                letterSpacing: '-0.4px',
                color: 'var(--color-foreground)',
              }}
            >
              {item.title}
            </h3>
            <p
              className="mb-4 font-medium text-[var(--color-foreground)]"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'var(--font-size-16)',
                lineHeight: '1.5',
              }}
            >
              {item.mission}
            </p>
            <p
              className="text-[var(--color-foreground-muted)]"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'var(--font-size-16)',
                lineHeight: '1.6',
              }}
            >
              {item.kernidee}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
