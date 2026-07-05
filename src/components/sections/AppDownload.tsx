'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StandardSection } from '@/components/layout/StandardSection';

/**
 * App-Download-Sektion: JassGuru fürs Handy.
 * - Badges linken direkt in die Stores (mobil = ein Tipp).
 * - QR-Code (nur Desktop sichtbar) zeigt auf den ewigen Smart-Link
 *   jassguru.ch/app — derselbe Code wie auf Flyern/Plakaten.
 * - Play-Store-Badge bleibt ausgegraut, bis PLAY_STORE_URL gesetzt ist.
 */

const APP_STORE_URL =
  'https://apps.apple.com/ch/app/jassguru-jassverband-schweiz/id6781383976';
const PLAY_STORE_URL: string | null = null; // sobald live: Play-URL eintragen

interface AppDownloadProps {
  locale: string;
  title: string;
  subtitle: string;
  qrHint: string;
  androidSoon: string;
  altQr: string;
  altAppStore: string;
  altGooglePlay: string;
}

const BADGE_LOCALES = ['de', 'fr', 'it'];

export function AppDownload({
  locale,
  title,
  subtitle,
  qrHint,
  androidSoon,
  altQr,
  altAppStore,
  altGooglePlay,
}: AppDownloadProps) {
  const badgeLocale = BADGE_LOCALES.includes(locale) ? locale : 'de';

  return (
    <StandardSection background="cream" containerSize="wide" spacing="lg" id="app">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-xl text-center md:text-left">
          <h2
            style={{
              fontFamily: 'var(--font-capita), Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              lineHeight: 1.15,
              color: '#111',
            }}
          >
            {title}
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            {subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-4 flex-wrap">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={`/images/app/app-store-badge-${badgeLocale}.svg`}
                alt={altAppStore}
                style={{ height: 52 }}
              />
            </a>
            {PLAY_STORE_URL ? (
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src={`/images/app/google-play-badge-${badgeLocale}.png`}
                  alt={altGooglePlay}
                  style={{ height: 52 }}
                />
              </a>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={`/images/app/google-play-badge-${badgeLocale}.png`}
                  alt={altGooglePlay}
                  className="opacity-40 grayscale"
                  style={{ height: 52 }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.45)',
                    marginTop: 4,
                  }}
                >
                  {androidSoon}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center flex-shrink-0">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ width: 220, height: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <Image src="/images/app/qr-app.svg" alt={altQr} width={220} height={220} />
          </div>
          <p
            className="mt-3 text-center"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 13,
              color: 'rgba(0, 0, 0, 0.5)',
              maxWidth: 220,
            }}
          >
            {qrHint}
          </p>
        </div>
      </motion.div>
    </StandardSection>
  );
}
