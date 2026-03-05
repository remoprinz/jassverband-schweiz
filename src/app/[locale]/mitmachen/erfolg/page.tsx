'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ErfolgPage() {
  const t = useTranslations('mitmachen');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kurze Verzögerung für Animation
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero mit Erfolgs-Animation */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt={t('altFelt')}
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container-main relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Erfolgs-Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <h1
                  className="text-white mb-6"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: 'clamp(32px, 6vw, 48px)',
                    lineHeight: '1.2',
                    letterSpacing: '-0.96px',
                    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  {t('erfolg.title')}
                </h1>

                <p
                  className="text-white/90 mb-8"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    lineHeight: '1.6',
                  }}
                >
                  {t('erfolg.description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center font-bold transition-all transform hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontSize: '17px',
                      padding: '16px 32px',
                      borderRadius: '9999px',
                      backgroundColor: '#ff0000',
                      color: '#ffffff',
                      boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.2)',
                    }}
                  >
                    {t('erfolg.ctaHome')}
                  </Link>
                  
                  <a
                    href="https://jasstafel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center font-bold transition-all transform hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontSize: '17px',
                      padding: '16px 32px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    {t('erfolg.ctaPlay')}
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Nächste Schritte */}
      <section className="py-20 md:py-24" style={{ backgroundColor: '#f0eee7' }}>
        <div className="container-main">
          <div>
            <h2
              className="text-center mb-12"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 36px)',
                lineHeight: '1.3',
                color: '#000000',
              }}
            >
              {t('erfolg.nextSteps')}
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: t('erfolg.step1Title'),
                  description: t('erfolg.step1Description'),
                },
                {
                  step: '2',
                  title: t('erfolg.step2Title'),
                  description: t('erfolg.step2Description'),
                },
                {
                  step: '3',
                  title: t('erfolg.step3Title'),
                  description: t('erfolg.step3Description'),
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex gap-6 p-6"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#ff0000', color: '#ffffff' }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.step}</span>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#000000',
                        marginBottom: '4px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#6b6b6b',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
