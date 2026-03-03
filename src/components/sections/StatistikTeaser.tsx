'use client';

import { StandardSection } from '@/components/layout/StandardSection';
import { SafeAnimateOnScroll } from '@/components/ui';
import Link from 'next/link';

interface StatistikTeaserProps {
  title: string;
  subtitle: string;
  copy: string;
  cta1: string;
  cta2: string;
}

export function StatistikTeaser({
  title,
  subtitle,
  copy,
  cta1,
  cta2
}: StatistikTeaserProps) {
  return (
    <StandardSection
      title={title}
      subtitle={subtitle}
      containerSize="full"
      background="cream"
      spacing="lg"
    >
      <SafeAnimateOnScroll className="space-y-8">
        {/* Copy Text */}
        <div className="max-w-3xl mx-auto text-center">
          <p 
            className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              color: 'var(--color-text-primary, #1a1a1a)'
            }}
          >
            {copy}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/de/statistiken"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary, #ff0000)',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
            }}
          >
            {cta1}
          </Link>
          <Link
            href="/de/mitmachen"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 rounded-lg border-2 hover:scale-105"
            style={{
              color: 'var(--color-primary, #ff0000)',
              borderColor: 'var(--color-primary, #ff0000)',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
            }}
          >
            {cta2}
          </Link>
        </div>

        {/* Ranking Symbols Teaser */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-3xl md:text-4xl opacity-60">
            <span title="Egg">🥚</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Gurke">🥒</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Chäs">🧀</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Jassstudent">🎓</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Goldjasser">🥇</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Jasskönig">👑</span>
            <span className="text-xl text-gray-400">→</span>
            <span title="Göpf">👼</span>
          </div>
          <p 
            className="text-center text-sm text-gray-600 mt-4"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
            }}
          >
            Vom Egg bis zum Göpf — der Weg ist messbar
          </p>
        </div>
      </SafeAnimateOnScroll>
    </StandardSection>
  );
}
