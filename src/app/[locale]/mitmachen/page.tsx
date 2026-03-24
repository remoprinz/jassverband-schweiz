'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, FAQCard, PricingCard } from '@/components/ui';
import { StandardSection } from '@/components/layout/StandardSection';
import { Hero } from '@/components/sections';

const packages = [
  { key: 'pionier' as const, price: 60, highlight: false },
  { key: 'botschafter' as const, price: 90, highlight: false },
  { key: 'patron' as const, price: 350, highlight: false },
];

const faqKeys = [
  'meisterschaft',
  'ablauf',
  'modus',
  'stehtFest',
  'zuWenigAnmeldungen',
  'lizenzGueltigkeit',
  'jassguruPro',
  'jassguruNutzung',
  'zuKompliziert',
  'captain',
  'weitereTurniere',
  'eloSystem',
  'spielregeln',
] as const;

export default function MitmachenPage() {
  const t = useTranslations('mitmachen');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', jassname: '', paket: 'botschafter', message: '', amount: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Stripe Checkout Session erstellen
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paket: formData.paket,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          jassname: formData.jassname,
          message: formData.message,
          amount: formData.paket === 'goenner' ? formData.amount : undefined,
          locale: locale,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || t('checkout.error'));
      }
      
      // Redirect zu Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : t('checkout.genericError'));
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* ════════════════════ HERO ════════════════════ */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        cta={t('hero.cta')}
        locale={locale}
        ctaHref="#mitglied-werden"
        preserveTitleLineBreaks
        mobileFlow
        noHyphens
      />

      {/* ════════════════════ PRICING ════════════════════ */}
      <StandardSection
        id="mitglied-werden"
        title={t('pricing.title')}
        subtitle={t('pricing.subtitle')}
        background="cream"
        containerSize="full"
        spacing="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.key}
              title={t(`pricing.${pkg.key}.title`)}
              price={pkg.price}
              period={t('pricing.year')}
              features={[1, 2, 3, 4, 5].map(i => t.raw(`pricing.${pkg.key}.feature${i}`))}
              isHighlighted={pkg.highlight}
              isSelected={formData.paket === pkg.key}
              onSelect={() => {
                setFormData({ ...formData, paket: pkg.key });
                document.getElementById('anmeldung')?.scrollIntoView({ behavior: 'smooth' });
              }}
              ctaText={t('pricing.select')}
              badge={pkg.highlight ? t('pricing.recommended') : undefined}
            />
          ))}
        </div>
        <p 
          className="text-center mt-8 text-sm"
          style={{ color: 'var(--color-foreground-muted)' }}
        >
          {t('pricing.groupNote')}
        </p>
      </StandardSection>
      {/* ════════════════════ GOENNER ════════════════════ */}
      <StandardSection
        title={t('goenner.title')}
        background="white"
        containerSize="full"
        spacing="lg"
      >
        <div className="text-center">
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
              color: 'var(--color-foreground-muted)',
            }}
          >
            {t('goenner.description')}
          </p>
          <Button
            href="#anmeldung"
            size="lg"
            onClick={() => setFormData({ ...formData, paket: 'goenner' })}
          >
            {t('goenner.cta')}
          </Button>
        </div>
      </StandardSection>

      {/* ════════════════════ JUGENDLIZENZ ════════════════════ */}
      <StandardSection
        title={t('youth.title')}
        background="cream"
        containerSize="full"
        spacing="lg"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#1f1f1f',
            }}
          >
            {t('youth.description')}
          </p>
          <div className="mb-6">
            <span
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 700,
                fontSize: '36px',
              }}
            >
              {t('youth.price')}
            </span>
            <span style={{ opacity: 0.7, fontSize: '16px' }}>{t('youth.period')}</span>
          </div>
          <Button
            href="#anmeldung"
            size="lg"
            onClick={() => setFormData({ ...formData, paket: 'jugend' })}
          >
            {t('youth.cta')}
          </Button>
        </div>
      </StandardSection>

      {/* ════════════════════ ANMELDUNG ════════════════════ */}
      <section id="anmeldung" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/chalkboard.webp"
            alt={t('altChalkboard')}
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container-main relative z-10">
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

            <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 space-y-6"
                style={{ borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      {t('form.firstName')} *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 outline-none transition-all"
                      style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      {t('form.lastName')} *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 outline-none transition-all"
                      style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                    />
                  </div>
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
                  <p className="mt-1.5 text-xs" style={{ color: '#9ca3af' }}>
                    {t('form.emailHint')}
                  </p>
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
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                      onClick={() => setFormData({ ...formData, paket: 'jugend' })}
                      className="py-3 px-4 transition-all"
                      style={{
                        borderRadius: '12px',
                        border: formData.paket === 'jugend' ? '2px solid #ff0000' : '2px solid #e5e5e5',
                        backgroundColor: formData.paket === 'jugend' ? 'rgba(255,0,0,0.04)' : '#ffffff',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif', fontWeight: 700, fontSize: '15px' }}>
                        {t('youth.title')}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b6b6b' }}>CHF 20</div>
                    </button>
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

                {formData.paket === 'goenner' && (
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                      {t('form.goennerAmount')} *
                    </label>
                    <input
                      type="number"
                      id="amount"
                      min="1"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder={t('form.goennerAmountPlaceholder')}
                      className="w-full px-4 py-3 outline-none transition-all"
                      style={{ borderRadius: '12px', border: '1px solid #e5e5e5', fontSize: '16px' }}
                    />
                  </div>
                )}

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

                {error && (
                  <div className="p-4" style={{ borderRadius: '12px', backgroundColor: '#fef2f2', fontSize: '14px', color: '#dc2626', border: '1px solid #fecaca' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full font-bold transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t('checkout.loading')}
                    </span>
                  ) : (
                    t('form.submit')
                  )}
                </button>

                {/* Stripe Badge */}
                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#9ca3af' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  {t('checkout.stripeNote')}
                </div>
              </form>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <StandardSection
        title={t('faq.title')}
        background="cream"
        containerSize="full"  // ✅ FIXED: Same width as Homepage tiles
        spacing="lg"
      >
        <div className="space-y-4">
          {faqKeys.map((key) => (
            <FAQCard
              key={key}
              question={t(`faq.${key}.question`)}
              answer={t(`faq.${key}.answer`)}
              isOpen={openFaq === key}
              onToggle={() => setOpenFaq(openFaq === key ? null : key)}
              linkUrl={t.has(`faq.${key}.linkUrl`) ? t(`faq.${key}.linkUrl`) : undefined}
              linkLabel={t.has(`faq.${key}.linkLabel`) ? t(`faq.${key}.linkLabel`) : undefined}
            />
          ))}
        </div>
      </StandardSection>

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
                alt={t('altTrust')}
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
