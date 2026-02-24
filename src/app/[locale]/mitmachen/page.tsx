'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';

const packages = [
  { key: 'pionier' as const, price: 60, highlight: false },
  { key: 'botschafter' as const, price: 90, highlight: false },
  { key: 'patron' as const, price: 350, highlight: false },
];

const faqKeys = ['turniere', 'spende', 'kuendigung', 'jassguru'] as const;

export default function MitmachenPage() {
  const t = useTranslations('mitmachen');
  const [formData, setFormData] = useState({
    name: '', email: '', jassname: '', paket: 'botschafter', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt="Grüner Filz Hintergrund"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container-main relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
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
              {t('hero.title')}
            </h2>

            <p
              className="text-white/85 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                lineHeight: '1.6',
              }}
            >
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      <section id="mitglied-werden" className="py-20 md:py-24" style={{ backgroundColor: '#f0eee7' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 42px)',
                lineHeight: '1.37',
                letterSpacing: '-0.96px',
                color: '#000000',
              }}
              className="mb-4"
            >
              {t('pricing.title')}
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '1.5', color: '#6b6b6b' }}>
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.key}
                className="relative h-full flex flex-col p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderRadius: '12px',
                  boxShadow: pkg.highlight ? '0 8px 30px rgba(0, 0, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  backgroundColor: pkg.highlight ? '#ff0000' : '#ffffff',
                  color: pkg.highlight ? '#ffffff' : '#000000',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                    {t('pricing.recommended')}
                  </div>
                )}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.4px',
                  }}
                >
                  {t(`pricing.${pkg.key}.title`)}
                </h3>
                <div className="mb-6">
                  <span style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '36px' }}>
                    CHF {pkg.price}
                  </span>
                  <span style={{ opacity: 0.7, fontSize: '16px' }}> / {t('pricing.year')}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const feature = t.raw(`pricing.${pkg.key}.feature${i}`);
                    if (!feature) return null;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: pkg.highlight ? '#ffffff' : '#ff0000' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '15px', lineHeight: '1.5', opacity: pkg.highlight ? 0.9 : 0.65 }}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {t.has(`pricing.${pkg.key}.linkUrl`) && t.has(`pricing.${pkg.key}.linkLabel`) && (
                  <a
                    href={t(`pricing.${pkg.key}.linkUrl`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mb-6 text-sm underline"
                    style={{ opacity: pkg.highlight ? 0.95 : 0.8 }}
                  >
                    {t(`pricing.${pkg.key}.linkLabel`)}
                  </a>
                )}
                <button
                  onClick={() => {
                    setFormData({ ...formData, paket: pkg.key });
                    document.getElementById('anmeldung')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-auto font-bold transition-all transform hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: '17px',
                    lineHeight: '28px',
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    backgroundColor: pkg.highlight ? '#ffffff' : '#ff0000',
                    color: pkg.highlight ? '#ff0000' : '#ffffff',
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                  }}
                >
                  {t('pricing.select')}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: '#6b6b6b' }}>
            {t('pricing.groupNote')}
          </p>
        </div>
      </section>
      {/* ════════════════════ GOENNER ════════════════════ */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 42px)',
                lineHeight: '1.37',
                letterSpacing: '-0.96px',
                color: '#000000',
              }}
            >
              {t('goenner.title')}
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#1f1f1f',
              }}
            >
              {t('goenner.lead')}
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#6b6b6b',
              }}
            >
              {t('goenner.description')}
            </p>
            <Button
              href="#anmeldung"
              size="lg"
              className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-4 text-[17px] font-bold rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.15)] hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={() => setFormData({ ...formData, paket: 'goenner' })}
            >
              {t('goenner.cta')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ ANMELDUNG ════════════════════ */}
      <section id="anmeldung" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/chalkboard.jpg"
            alt="Kreidetafel Hintergrund"
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2
                className="text-white mb-4"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 5vw, 42px)',
                  lineHeight: '1.37',
                  letterSpacing: '-0.96px',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                {t('form.title')}
              </h2>
              <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '16px', lineHeight: '1.5', color: 'rgba(255,255,255,0.75)' }}>
                {t('form.intro')}
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 lg:p-10 text-center"
                style={{ borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,0,0,0.08)' }}>
                  <svg className="w-8 h-8" style={{ color: '#ff0000' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '28px', color: '#000000' }} className="mb-2">
                  {t('form.success.title')}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '16px', lineHeight: '1.5', color: '#6b6b6b' }}>
                  {t('form.success.message')}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 space-y-6"
                style={{ borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 outline-none transition-all"
                      style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 outline-none transition-all"
                      style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jassname" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                    {t('form.jassname')}
                  </label>
                  <input
                    type="text"
                    id="jassname"
                    value={formData.jassname}
                    onChange={(e) => setFormData({ ...formData, jassname: e.target.value })}
                    placeholder={t('form.jassnamePlaceholder')}
                    className="w-full px-4 py-3 outline-none transition-all"
                    style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                    {t('form.paket')} *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, paket: pkg.key })}
                        className="py-3 px-4 transition-all"
                        style={{
                          borderRadius: '12px',
                          border: formData.paket === pkg.key ? '2px solid #ff0000' : '2px solid #e5e5e5',
                          backgroundColor: formData.paket === pkg.key ? 'rgba(255,0,0,0.04)' : '#ffffff',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '15px' }}>
                          {t(`pricing.${pkg.key}.title`)}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b6b6b' }}>CHF {pkg.price}</div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paket: 'goenner' })}
                      className="py-3 px-4 transition-all"
                      style={{
                        borderRadius: '12px',
                        border: formData.paket === 'goenner' ? '2px solid #ff0000' : '2px solid #e5e5e5',
                        backgroundColor: formData.paket === 'goenner' ? 'rgba(255,0,0,0.04)' : '#ffffff',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '15px' }}>
                        {t('goenner.title')}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b6b6b' }}>{t('goenner.optionPrice')}</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-3 outline-none transition-all resize-none"
                    style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                  />
                </div>

                <div className="p-4" style={{ borderRadius: '12px', backgroundColor: '#f0eee7', fontSize: '14px', color: '#6b6b6b' }}>
                  <strong style={{ color: '#000000' }}>{t('form.notice.title')}</strong> {t('form.notice.message')}
                </div>

                <button
                  type="submit"
                  className="w-full font-bold transition-all transform hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: '17px',
                    lineHeight: '28px',
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                  }}
                >
                  {t('form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="py-20 md:py-24" style={{ backgroundColor: '#f0eee7' }}>
        <div className="container-main">
          <motion.h2
            className="text-center mb-12 md:mb-16"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 42px)',
              lineHeight: '1.37',
              letterSpacing: '-0.96px',
              color: '#000000',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('faq.title')}
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqKeys.map((key) => (
              <motion.div
                key={key}
                className="overflow-hidden transition-all duration-300"
                style={{ borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === key ? null : key)}
                  className="w-full px-8 py-5 text-left flex items-center justify-between"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#000000',
                  }}
                >
                  {t(`faq.${key}.question`)}
                  <svg
                    className="w-5 h-5 shrink-0 ml-4 transition-transform duration-300"
                    style={{ transform: openFaq === key ? 'rotate(180deg)' : 'rotate(0deg)', color: '#ff0000' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === key && (
                  <div className="px-8 pb-5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '16px', lineHeight: '1.5', color: '#6b6b6b' }}>
                    {t(`faq.${key}.answer`)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TRUST ════════════════════ */}
      <section className="py-8 md:py-10" style={{ backgroundColor: '#e8e4dc' }}>
        <div className="container-main">
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="max-w-md"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: '1.6',
                color: 'rgba(0, 0, 0, 0.55)',
              }}
            >
              {t('trust.text')}
            </p>
            <div className="relative flex-shrink-0 self-end sm:self-auto" style={{ width: 'clamp(160px, 20vw, 280px)', aspectRatio: '800 / 453' }}>
              <Image
                src="/images/badges/lebendige-traditionen-figma.png"
                alt="Lebendige Traditionen der Schweiz"
                fill
                className="object-contain object-right"
                sizes="(max-width: 768px) 160px, 280px"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
