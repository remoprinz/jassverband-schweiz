'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui';

export default function KontaktPage() {
  const t = useTranslations('kontakt');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Anfrage fehlgeschlagen');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-spacing">
      <div className="container-main">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{t('success.title')}</h3>
                <p className="text-green-700">{t('success.message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('form.name')}
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
                    {t('form.email')}
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
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                  />
                </div>
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
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
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                >
                  {isLoading ? '...' : t('form.submit')}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-[var(--color-background-alt)] rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">{t('orgName')}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-[var(--color-foreground-muted)] mb-2">
                  {t('info.address')}
                </h4>
                <p>Hirslanderstrasse 34</p>
                <p>8032 Zürich</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[var(--color-foreground-muted)] mb-2">
                  {t('info.email')}
                </h4>
                <a href="mailto:info@jassverband.ch" className="text-[var(--color-primary)] hover:underline">
                  info@jassverband.ch
                </a>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[var(--color-foreground-muted)] mb-2">
                  {t('info.phone')}
                </h4>
                <a href="tel:+41792375208" className="text-[var(--color-primary)] hover:underline">
                  +41 79 237 52 08
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-foreground-muted)]">
                {t('mediaNote')}<br />
                <a href="mailto:remo@jassverband.ch" className="text-[var(--color-primary)] hover:underline">
                  remo@jassverband.ch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
