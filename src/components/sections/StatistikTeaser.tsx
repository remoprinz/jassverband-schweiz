'use client';

import { StandardSection } from '@/components/layout/StandardSection';
import { SafeAnimateOnScroll } from '@/components/ui';
import Link from 'next/link';

interface StatistikTeaserProps {
  title: string;
  subtitle: string;
  intro: string;
  copy: string;
  cta1: string;
  cta1Link: string;
  cta2: string;
  cta2Link: string;
  pdfTitle: string;
  pdfLink1Label: string;
  pdfLink1Url: string;
  pdfLink2Label: string;
  pdfLink2Url: string;
}

export function StatistikTeaser({
  title,
  subtitle,
  intro,
  copy,
  cta1,
  cta1Link,
  cta2,
  cta2Link,
  pdfTitle,
  pdfLink1Label,
  pdfLink1Url,
  pdfLink2Label,
  pdfLink2Url
}: StatistikTeaserProps) {
  return (
    <StandardSection
      title={title}
      subtitle={subtitle}
      containerSize="narrow"
      background="chalk"
      spacing="lg"
    >
      <SafeAnimateOnScroll className="space-y-12">
        {/* Intro Questions */}
        <div className="text-center">
          <p 
            className="text-xl md:text-2xl font-semibold leading-relaxed"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              color: 'var(--color-text-primary, #1a1a1a)'
            }}
          >
            {intro}
          </p>
        </div>

        {/* Copy Text */}
        <div className="max-w-2xl mx-auto">
          <p 
            className="text-lg leading-relaxed"
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
            href={cta1Link}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto min-w-[280px]"
            style={{
              backgroundColor: 'var(--color-primary, #ff0000)',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
            }}
          >
            {cta1}
          </Link>
          <Link
            href={cta2Link}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 rounded-lg border-2 hover:scale-105 w-full sm:w-auto min-w-[280px]"
            style={{
              color: 'var(--color-primary, #ff0000)',
              borderColor: 'var(--color-primary, #ff0000)',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
            }}
          >
            {cta2}
          </Link>
        </div>

        {/* PDF Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 
            className="text-center text-lg font-semibold mb-4"
            style={{
              fontFamily: 'var(--font-capita), Capita, Georgia, serif',
              color: 'var(--color-text-primary, #1a1a1a)'
            }}
          >
            {pdfTitle}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={pdfLink1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-100"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                color: 'var(--color-text-primary, #1a1a1a)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              {pdfLink1Label}
            </a>
            <a
              href={pdfLink2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-100"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                color: 'var(--color-text-primary, #1a1a1a)'
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              {pdfLink2Label}
            </a>
          </div>
        </div>
      </SafeAnimateOnScroll>
    </StandardSection>
  );
}
