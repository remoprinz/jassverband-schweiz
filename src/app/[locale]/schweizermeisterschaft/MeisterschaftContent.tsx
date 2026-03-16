'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RiTeamFill } from 'react-icons/ri';
import { TbTournament } from 'react-icons/tb';
import { FaTrophy } from 'react-icons/fa6';

interface HowStep {
  title: string;
  description: string;
}

interface MeisterschaftContentProps {
  teamTitle: string;
  teamCopy1: string;
  teamCopy2: string;
  teamCopy3: string;
  jassguruTitle: string;
  jassguruCopy: string;
  jassguruCta: string;
  jassguruTafelLabel: string;
  jassguruTafelLink: string;
  jassguruGroupLabel: string;
  jassguruGroupLink: string;
  jassguruProfileLabel: string;
  jassguruProfileLink: string;
  jassguruAltScreenshot: string;
  jassguruAltGroup: string;
  jassguruAltProfile: string;
  howTitle: string;
  howIntro: string;
  howSteps: HowStep[];
  howFootnote: string;
  homeTitle: string;
  homeCopy: string;
  homeStrichIntro: string;
  homeStrich1Title: string;
  homeStrich1Desc: string;
  homeStrich2Title: string;
  homeStrich2Desc: string;
  homeStrichConclusion: string;
  profileTitle: string;
  profileCopy: string;
  titlesTitle: string;
  titlesIntro: string;
  titlesOpen: string;
  titlesOpenSub: string;
  titlesYouth: string;
  titlesYouthSub: string;
  memberTitle: string;
  memberCopy: string;
  ctaMember: string;
  locale: string;
  altFelt: string;
  altChalkboard: string;
}

const howIcons: { el: React.ReactNode; bg: boolean }[] = [
  { el: <RiTeamFill key="team" className="w-7 h-7" />, bg: true },
  { el: <TbTournament key="tournament" className="w-7 h-7" />, bg: true },
  { el: <FaTrophy key="trophy" className="w-7 h-7" />, bg: true },
];

const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* Reusable phone frame component */
function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[min(42vw,240px)] ${className}`}
      style={{
        aspectRatio: '390 / 844',
        borderRadius: 'clamp(16px, 4vw, 32px)',
        border: 'clamp(3px, 0.6vw, 5px) solid #2a2a2a',
        backgroundColor: '#111',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export function MeisterschaftContent({
  teamTitle,
  teamCopy1,
  teamCopy2,
  teamCopy3,
  jassguruTitle,
  jassguruCopy,
  jassguruCta,
  jassguruTafelLabel,
  jassguruTafelLink,
  jassguruGroupLabel,
  jassguruGroupLink,
  jassguruProfileLabel,
  jassguruProfileLink,
  jassguruAltScreenshot,
  jassguruAltGroup,
  jassguruAltProfile,
  howTitle,
  howIntro,
  howSteps,
  howFootnote,
  homeTitle,
  homeCopy,
  homeStrichIntro,
  homeStrich1Title,
  homeStrich1Desc,
  homeStrich2Title,
  homeStrich2Desc,
  homeStrichConclusion,
  profileTitle,
  profileCopy,
  titlesTitle,
  titlesIntro,
  titlesOpen,
  titlesOpenSub,
  titlesYouth,
  titlesYouthSub,
  memberTitle,
  memberCopy,
  ctaMember,
  locale,
  altFelt,
  altChalkboard,
}: MeisterschaftContentProps) {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          1. ALS TEAM ZUM TITEL — Chalkboard (dunkel, dramatisch)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/chalkboard.jpg"
            alt={altChalkboard}
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
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-white mb-8"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 1.2,
                letterSpacing: '-0.96px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {teamTitle}
            </h2>

            <p
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'clamp(24px, 3.4vw, 34px)',
                fontWeight: 500,
                lineHeight: 1.35,
              }}
            >
              {teamCopy1}
            </p>

            <p
              className="text-white/85 mb-6"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'clamp(16px, 2vw, 19px)',
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              {teamCopy2}
            </p>

            <p
              className="text-white/70"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'clamp(15px, 1.8vw, 17px)',
                fontWeight: 500,
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {teamCopy3}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. JASSGURU IN AKTION — Dunkel/Schwarz, 3 Phone Mockups
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container-main relative z-10">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-white mb-4 text-center"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                lineHeight: 1.2,
                letterSpacing: '-0.8px',
              }}
            >
              {jassguruTitle}
            </h2>

            <p
              className="text-white/75 text-center mb-14 max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.65,
              }}
            >
              {jassguruCopy}
            </p>

            {/* 2 Phones nebeneinander — Mobile und Desktop */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 max-w-2xl mx-auto mb-10">
              {/* Phone 1: Kreidetafel */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <PhoneFrame>
                  <Image
                    src="/images/screenshots/jassguru-kreidetafel.jpg"
                    alt={jassguruAltScreenshot}
                    fill
                    className="object-cover object-center"
                    quality={90}
                  />
                </PhoneFrame>
                <p className="text-white/60 text-sm mt-3 sm:mt-4 mb-1 sm:mb-2 text-center">{jassguruTafelLabel}</p>
                <a
                  href="https://jassguru.ch/onboarding_tutorial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-xs sm:text-sm hover:text-white/70 transition-colors underline underline-offset-2"
                >
                  {jassguruTafelLink} →
                </a>
              </motion.div>

              {/* Phone 2: Gruppenansicht */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <PhoneFrame>
                  <Image
                    src="/images/screenshots/jassguru-gruppe.jpg"
                    alt={jassguruAltGroup}
                    fill
                    className="object-cover object-top"
                    quality={90}
                  />
                </PhoneFrame>
                <p className="text-white/60 text-sm mt-3 sm:mt-4 mb-1 sm:mb-2 text-center">{jassguruGroupLabel}</p>
                <a
                  href="https://jassguru.ch/view/group/Tz0wgIHMTlhvTtFastiJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-xs sm:text-sm hover:text-white/70 transition-colors underline underline-offset-2"
                >
                  {jassguruGroupLink} →
                </a>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://jassguru.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: 'var(--font-size-17)',
                }}
              >
                {jassguruCta}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. SO QUALIFIZIERT IHR EUCH — Cream, 3 Levels
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                lineHeight: 1.2,
                letterSpacing: '-0.8px',
                color: 'var(--color-foreground)',
              }}
            >
              {howTitle}
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 1.65,
                color: 'var(--color-foreground-muted)',
              }}
            >
              {howIntro}
            </p>
          </motion.div>

          <div className="flex flex-col gap-5 lg:gap-6 max-w-3xl mx-auto mb-10">
            {howSteps.map((step, index) => (
              <motion.article
                key={index}
                className="bg-white p-6 lg:p-7 flex flex-col"
                style={{
                  borderRadius: 'var(--radius-card-lg)',
                  boxShadow: 'var(--shadow-card)',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ boxShadow: 'var(--shadow-card-hover)', y: -2 }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-foreground)' }}
                  >
                    {howIcons[index]?.el}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3
                      style={{
                        fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                        fontWeight: 700,
                        fontSize: 'var(--font-size-20)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.3px',
                        color: 'var(--color-foreground)',
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 1.65,
                    color: 'var(--color-foreground-muted)',
                  }}
                >
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Fussnote */}
          <p
            className="max-w-3xl mx-auto text-center"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 'var(--font-size-13)',
              lineHeight: 1.55,
              color: 'var(--color-foreground-muted)',
              opacity: 0.7,
            }}
            dangerouslySetInnerHTML={{
              __html: howFootnote.replace(
                /<ehrenkodex>(.*?)<\/ehrenkodex>/,
                '<a href="/de/verband#ehrenkodex" style="text-decoration:underline;text-underline-offset:2px">$1</a>'
              )
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. HEIMRECHT + TEAM SCHREIBT GESCHICHTE — Felt (Jasstisch)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt={altFelt}
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/0" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-white mb-5"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 4.5vw, 40px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.7px',
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                {homeTitle}
              </h2>

              <p
                className="text-white/80 mb-8"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: 1.7,
                }}
              >
                {homeCopy}
              </p>

              <p
                className="text-white/70 mb-5"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: 'var(--font-size-16)',
                  lineHeight: 1.6,
                }}
              >
                {homeStrichIntro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-5" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-card)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '15px', color: '#fff' }}>
                    {homeStrich1Title}
                  </div>
                  <ul className="text-white/80 space-y-1 list-disc list-inside" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-15)', lineHeight: 1.55 }}>
                    {homeStrich1Desc.split('\n').map((item, i) => (<li key={i}>{item}</li>))}
                  </ul>
                </div>

                <div className="p-5" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-card)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '15px', color: '#fff' }}>
                    {homeStrich2Title}
                  </div>
                  <ul className="text-white/80 space-y-1 list-disc list-inside" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-15)', lineHeight: 1.55 }}>
                    {homeStrich2Desc.split('\n').map((item, i) => (<li key={i}>{item}</li>))}
                  </ul>
                </div>
              </div>

              <p className="text-white/60 mb-14" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-15)', lineHeight: 1.65, fontStyle: 'italic' }}>
                {homeStrichConclusion}
              </p>
            </motion.div>

            <div className="w-full h-px mb-14" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white mb-4" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: 'clamp(22px, 3.5vw, 32px)', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
                {profileTitle}
              </h3>
              <p className="text-white/75" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.7 }}>
                {profileCopy}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. ZWEI TITEL + CTA — Chalkboard
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/backgrounds/chalkboard.jpg" alt={altChalkboard} fill className="object-cover" quality={85} />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" aria-hidden style={{ backgroundImage: noiseOverlay }} />

        <div className="container-main relative z-10">
          <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-white mb-3 text-center" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.2, letterSpacing: '-0.8px', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
              {titlesTitle}
            </h2>
            <p className="text-white/70 text-center mb-8" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-17)', lineHeight: 1.55 }}>
              {titlesIntro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="p-6 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-card-lg)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: 'var(--font-size-20)', lineHeight: 1.25 }}>{titlesOpen}</h3>
                <p className="text-white/60" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-15)' }}>{titlesOpenSub}</p>
              </div>
              <div className="p-6 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-card-lg)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: 'var(--font-size-20)', lineHeight: 1.25 }}>{titlesYouth}</h3>
                <p className="text-white/60" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-15)' }}>{titlesYouthSub}</p>
              </div>
            </div>

            <div className="w-full h-px mb-10" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />

            <div className="text-center mb-10">
              <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', lineHeight: 1.25 }}>{memberTitle}</h3>
              <p className="text-white/70 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-16)', lineHeight: 1.65 }}>{memberCopy}</p>
            </div>

            <div className="flex justify-center">
              <a href={`/${locale}/mitmachen`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 'var(--font-size-17)' }}>
                {ctaMember}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
