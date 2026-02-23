'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Card } from '@/components/ui';

const icons = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
};

const packages = [
  {
    key: 'pionier',
    price: 60,
    highlight: false,
  },
  {
    key: 'botschafter',
    price: 90,
    highlight: true,
  },
  {
    key: 'patron',
    price: 180,
    highlight: false,
  },
];

const faqKeys = ['turniere', 'spende', 'kuendigung', 'jassguru'];

export default function MitmachenPage() {
  const t = useTranslations('mitmachen');
  const locale = useLocale();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    jassname: '',
    phone: '',
    paket: 'pionier',
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#0d2818] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/backgrounds/felt-figma.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-capita)' }}>
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="#mitglied-werden"
                size="lg"
                className="bg-[#ff0000] hover:bg-[#cc0000] text-white"
              >
                {t('hero.cta')}
              </Button>
              <a
                href={`/${locale}/kontakt`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WARUM WIR SIE BRAUCHEN */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('warum.title')}</h2>
            <p className="text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
              {t('warum.intro')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(['wissen', 'modern', 'foerderung', 'vertretung'] as const).map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex items-start gap-4 h-full">
                  <div className="text-[var(--color-primary)] shrink-0">
                    {key === 'wissen' && icons.book}
                    {key === 'modern' && icons.target}
                    {key === 'foerderung' && icons.graduation}
                    {key === 'vertretung' && icons.megaphone}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t(`warum.${key}.title`)}</h3>
                    <p className="text-sm text-[var(--color-foreground-muted)]">
                      {t(`warum.${key}.description`)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PIONIER-STATUS */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {t('pionier.badge')}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('pionier.title')}</h2>
            <p className="text-[var(--color-foreground-muted)] mb-8">
              {t('pionier.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {(['register', 'kartenset', 'feedback'] as const).map((key) => (
                <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">{t(`pionier.${key}.title`)}</h3>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {t(`pionier.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="mitglied-werden" className="section-spacing bg-white">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-[var(--color-foreground-muted)]">
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.highlight 
                    ? 'bg-[var(--color-primary)] text-white shadow-xl scale-105' 
                    : 'bg-white border border-[var(--color-border)]'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    {t('pricing.recommended')}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{t(`pricing.${pkg.key}.title`)}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">CHF {pkg.price}</span>
                  <span className={pkg.highlight ? 'text-white/70' : 'text-[var(--color-foreground-muted)]'}> / {t('pricing.year')}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {(['feature1', 'feature2', 'feature3'] as const).map((featureKey) => (
                    <li key={featureKey} className="flex items-start gap-2">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.highlight ? 'text-white' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${pkg.highlight ? 'text-white/90' : 'text-[var(--color-foreground-muted)]'}`}>
                        {t(`pricing.${pkg.key}.${featureKey}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setFormData({ ...formData, paket: pkg.key });
                    document.getElementById('anmeldung')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-full font-medium transition-colors ${
                    pkg.highlight
                      ? 'bg-white text-[var(--color-primary)] hover:bg-white/90'
                      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90'
                  }`}
                >
                  {t('pricing.select')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 bg-[var(--color-background-alt)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('impact.title')}</h2>
            <p className="text-[var(--color-foreground-muted)] mb-8">
              {t('impact.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {(['jasswiki', 'lehrmaterial', 'infrastruktur'] as const).map((key) => (
                <div key={key} className="bg-white rounded-xl p-6">
                  <h3 className="font-bold mb-2">{t(`impact.${key}.title`)}</h3>
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {t(`impact.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ANMELDUNG */}
      <section id="anmeldung" className="section-spacing bg-white">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('form.title')}</h2>
              <p className="text-[var(--color-foreground-muted)]">
                {t('form.intro')}
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{t('form.success.title')}</h3>
                <p className="text-green-700">{t('form.success.message')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="jassname" className="block text-sm font-medium mb-2">
                      {t('form.jassname')}
                    </label>
                    <input
                      type="text"
                      id="jassname"
                      value={formData.jassname}
                      onChange={(e) => setFormData({ ...formData, jassname: e.target.value })}
                      placeholder={t('form.jassnamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('form.paket')} *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, paket: pkg.key })}
                        className={`py-3 px-4 rounded-xl border-2 transition-all ${
                          formData.paket === pkg.key
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                        }`}
                      >
                        <div className="font-medium">{t(`pricing.${pkg.key}.title`)}</div>
                        <div className="text-sm text-[var(--color-foreground-muted)]">CHF {pkg.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <strong>{t('form.notice.title')}</strong> {t('form.notice.message')}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t('form.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-background-alt)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">{t('faq.title')}</h2>
            <div className="space-y-4">
              {faqKeys.map((key) => (
                <div key={key} className="bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === key ? null : key)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-medium"
                  >
                    {t(`faq.${key}.question`)}
                    <svg
                      className={`w-5 h-5 transition-transform ${openFaq === key ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-4 text-[var(--color-foreground-muted)]"
                    >
                      {t(`faq.${key}.answer`)}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGE */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <Image
              src="/images/badges/lebendige-traditionen-figma.png"
              alt="Lebendige Traditionen der Schweiz"
              width={80}
              height={80}
              className="opacity-70"
            />
            <p className="text-sm text-[var(--color-foreground-muted)] max-w-md">
              {t('trust.text')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
