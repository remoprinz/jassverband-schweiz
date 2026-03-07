'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface VisionData {
  title: string;
  subtitle: string;
  copy: string;
}

interface MissionData {
  title: string;
  mission: string;
  kernidee: string;
}

interface PraesidiumMember {
  name: string;
  role: string;
  location: string;
  image: string;
  imageOffsetY: number;
  imageScale: number;
  quote: string;
  description: string;
}

interface VerbandContentProps {
  praesidiumTitle: string;
  praesidiumSubtitle: string;
  statutenTitle: string;
  statutenDownload: string;
  statutenDescription: string;
  vision: VisionData;
  missionsTitle: string;
  missions: MissionData[];
  praesidium: PraesidiumMember[];
}

const missionIcons = [
  <svg key="trophy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M8 21h8m-4-4v4m-4.5-8a7.5 7.5 0 1115 0H7.5z" /><path d="M5 3h14l-1.5 8.5a5.5 5.5 0 01-11 0L5 3z" /></svg>,
  <svg key="network" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="youth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0124 21H0a12.083 12.083 0 015.84-10.422L12 14z" /><path d="M12 14v7" /></svg>,
  <svg key="access" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="digital" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="culture" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
];

export function VerbandContent({
  praesidiumTitle,
  praesidiumSubtitle,
  statutenTitle,
  statutenDownload,
  statutenDescription,
  vision,
  missionsTitle,
  missions,
  praesidium,
}: VerbandContentProps) {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          1. VISION — Chalkboard (Kreidetafel), wie auf der Home
          ═══════════════════════════════════════════════════════════════ */}
      <section id="vision" className="relative py-20 md:py-28 overflow-hidden">
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
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            className="max-w-[680px] mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 1.2,
                letterSpacing: '-0.96px',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {vision.title}
            </h2>

            <p
              className="text-white/95 mb-6"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(20px, 3vw, 30px)',
                lineHeight: 1.35,
              }}
            >
              {vision.subtitle}
            </p>

            <p
              className="text-white/80"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(16px, 2vw, 19px)',
                lineHeight: 1.65,
              }}
            >
              {vision.copy}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. MISSIONEN — Cream-Hintergrund, 2er-Grid
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <motion.h2
            className="text-center mb-14 md:mb-20"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 42px)',
              lineHeight: 1.2,
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {missions.map((item, index) => (
              <motion.article
                key={index}
                id={`mission-${index + 1}`}
                className="bg-white p-6 lg:p-8 flex flex-col"
                style={{
                  borderRadius: 'var(--radius-card-lg)',
                  boxShadow: 'var(--shadow-card)',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ boxShadow: 'var(--shadow-card-hover)', y: -2 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-foreground)' }}
                  >
                    {missionIcons[index]}
                  </div>
                  <h3
                    className="pt-2"
                    style={{
                      fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                      fontWeight: 700,
                      fontSize: 'var(--font-size-20)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.4px',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className="mb-3 font-medium"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-16)',
                    lineHeight: 1.55,
                    color: 'var(--color-foreground)',
                  }}
                >
                  {item.mission}
                </p>

                <p
                  className="text-[var(--color-foreground-muted)] mt-auto"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.kernidee}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. PRÄSIDIUM — Weiss
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 42px)',
                lineHeight: 1.2,
                letterSpacing: '-0.96px',
                color: 'var(--color-foreground)',
              }}
            >
              {praesidiumTitle}
            </h2>
            <p
              className="mt-3 text-[var(--color-foreground-muted)]"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'var(--font-size-17)',
                lineHeight: 1.5,
              }}
            >
              {praesidiumSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {praesidium.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--color-cream)' }}
                >
                  <Image
                    src={member.image}
                    alt={`Portrait von ${member.name}`}
                    fill
                    sizes="160px"
                    className="object-contain p-1"
                    style={{
                      transform: `translateY(${member.imageOffsetY}px) scale(${member.imageScale})`,
                    }}
                  />
                </div>

                <h3
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-20)',
                    lineHeight: 1.25,
                    color: 'var(--color-foreground)',
                  }}
                >
                  {member.name}
                </h3>

                <p
                  className="font-medium mb-5"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-15)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {member.role}, {member.location}
                </p>

                <p
                  className="text-[var(--color-foreground-muted)] mb-4 max-w-[280px] mx-auto"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 1.6,
                  }}
                >
                  {member.description}
                </p>

                <blockquote
                  className="italic max-w-[260px] mx-auto"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 1.5,
                    color: 'var(--color-foreground)',
                  }}
                >
                  &bdquo;{member.quote}&ldquo;
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. STATUTEN — Chalkboard-Akzent, minimalistisch
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
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
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(26px, 4vw, 36px)',
                lineHeight: 1.25,
                letterSpacing: '-0.5px',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {statutenTitle}
            </h2>

            <p
              className="text-white/70 mb-8"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'var(--font-size-16)',
                lineHeight: 1.6,
              }}
            >
              {statutenDescription}
            </p>

            <a
              href="/documents/statuten-jvs.pdf"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#1e2d1e] rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {statutenDownload}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
