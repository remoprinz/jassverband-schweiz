'use client';

import { useState } from 'react';
import { StandardSection } from '@/components/layout/StandardSection';
import { SafeAnimateOnScroll } from '@/components/ui';

interface FaqLink {
  text: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
  links?: FaqLink[];
}

interface HomeFaqProps {
  title: string;
  items: FaqItem[];
}

export function HomeFaq({ title, items }: HomeFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAnswer = (answer: string, links?: FaqLink[]) => {
    const paragraphs = answer.split('\n\n');
    
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, pIndex) => {
          // Check if paragraph starts with emoji or **bold**
          if (paragraph.match(/^[🏆📊📚🤝🎴]/)) {
            // Emoji bullet point
            return (
              <p key={pIndex} className="text-gray-700">
                {paragraph}
              </p>
            );
          } else if (paragraph.startsWith('**') && paragraph.includes('**')) {
            // Bold headline
            const parts = paragraph.split('**');
            return (
              <p key={pIndex} className="text-gray-700">
                <strong className="font-semibold text-gray-900">{parts[1]}</strong>
                {parts[2]}
              </p>
            );
          } else {
            // Regular paragraph
            return (
              <p key={pIndex} className="text-gray-700">
                {paragraph}
              </p>
            );
          }
        })}
        
        {/* Render links if available */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
            {links.map((link, lIndex) => (
              <a
                key={lIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-100"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  color: 'var(--color-primary, #ff0000)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <StandardSection
      title={title}
      containerSize="narrow"
      background="chalk"
      spacing="lg"
    >
      <SafeAnimateOnScroll className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md bg-white"
          >
            {/* Question */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 transition-colors duration-200 hover:bg-gray-50"
              aria-expanded={openIndex === index}
            >
              <span
                className="text-lg font-semibold"
                style={{
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  color: 'var(--color-text-primary, #1a1a1a)'
                }}
              >
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--color-primary, #ff0000)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div
                className="px-6 pb-6 pt-2"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif'
                }}
              >
                {renderAnswer(item.answer, item.links)}
              </div>
            </div>
          </div>
        ))}
      </SafeAnimateOnScroll>
    </StandardSection>
  );
}
