'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader, Button } from '@/components/ui';

export default function KontaktPage() {
  const t = useTranslations('kontakt');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    // In production, connect to email service or API
    setSubmitted(true);
  };

  return (
    <div className="section-spacing">
      <div className="container-main">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Nachricht gesendet!</h3>
                <p className="text-green-700">Wir melden uns so schnell wie möglich bei Ihnen.</p>
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
                <Button type="submit" size="lg" className="w-full">
                  {t('form.submit')}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-[var(--color-background-alt)] rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Jassverband Schweiz</h3>
            
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
                Für Medienanfragen wenden Sie sich bitte an:<br />
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
