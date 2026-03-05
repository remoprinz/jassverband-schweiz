'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { StandardSection } from '@/components/layout/StandardSection';
import { Trust } from '@/components/sections';

export default function SchweizermeisterschaftPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt={t('schweizermeisterschaft.altFelt')}
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="container-main relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              {t('schweizermeisterschaft.season')}
            </motion.div>

            <h1
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 6vw, 48px)',
                lineHeight: 1.2,
                letterSpacing: '-0.96px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {t('schweizermeisterschaft.title')}
            </h1>

            <p
              className="text-white/85 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                lineHeight: 1.6,
              }}
            >
              {t('schweizermeisterschaft.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Das Format */}
      <StandardSection
        title={t('schweizermeisterschaft.format.title')}
        background="cream"
        containerSize="full"
        spacing="lg"
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="mb-8"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--color-foreground)',
            }}
          >
            {t('schweizermeisterschaft.format.description')}
          </p>

          <h3
            className="mb-4"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: '20px',
            }}
          >
            {t('schweizermeisterschaft.format.howItWorks')}
          </h3>

          <ul className="space-y-3 mb-8">
            {(t.raw('schweizermeisterschaft.format.steps') as string[]).map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: 'var(--color-primary)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: 'var(--color-foreground-muted)',
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-foreground-muted)',
            }}
          >
            {t('schweizermeisterschaft.format.communityNote')}
          </p>
        </div>
      </StandardSection>

      {/* Jugendwertung */}
      <StandardSection
        title={t('schweizermeisterschaft.youth.title')}
        background="white"
        containerSize="full"
        spacing="lg"
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--color-foreground)',
            }}
          >
            {t('schweizermeisterschaft.youth.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="p-6"
              style={{
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                backgroundColor: '#ffffff',
              }}
            >
              <h4
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: '17px',
                }}
              >
                {t('schweizermeisterschaft.youth.championTitle')}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  color: 'var(--color-foreground-muted)',
                }}
              >
                {t('schweizermeisterschaft.youth.championSubtitle')}
              </p>
            </div>
            <div
              className="p-6"
              style={{
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                backgroundColor: '#ffffff',
              }}
            >
              <h4
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: '17px',
                }}
              >
                {t('schweizermeisterschaft.youth.youthChampionTitle')}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  color: 'var(--color-foreground-muted)',
                }}
              >
                {t('schweizermeisterschaft.youth.youthChampionSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </StandardSection>

      {/* Anmeldung CTA */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/chalkboard.jpg"
            alt={t('schweizermeisterschaft.altChalkboard')}
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-main relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 5vw, 42px)',
                lineHeight: 1.2,
              }}
            >
              {t('schweizermeisterschaft.register.title')}
            </h2>
            <p
              className="text-white/75 mb-8 max-w-lg mx-auto"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontSize: '16px',
                lineHeight: 1.6,
              }}
            >
              {t('schweizermeisterschaft.register.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="https://jassmeister.web.app"
                external
                size="lg"
                className="bg-[var(--color-primary)] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {t('schweizermeisterschaft.register.ctaJassmeister')}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
              <Button
                href={`/${locale}/mitmachen`}
                size="lg"
                className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-4 text-[17px] font-bold rounded-full hover:bg-white/25 transition-all"
              >
                {t('schweizermeisterschaft.register.ctaMember')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <Trust
        badge={t('trust.badge')}
        text={t('trust.text')}
        description={t('trust.description')}
        linkText={t('trust.linkText')}
        altBadge={t('trust.altBadge')}
      />
    </div>
  );
}
