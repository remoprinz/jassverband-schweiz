'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { StandardSection } from '@/components/layout/StandardSection';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

const AUTO_ADVANCE_MS = 5000;

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const totalDots = Math.max(1, testimonials.length - visibleCount + 1);

  const updateVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) setVisibleCount(3);
    else if (window.innerWidth >= 768) setVisibleCount(2);
    else setVisibleCount(1);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const card = container.children[index] as HTMLElement | undefined;
      if (!card) return;
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    },
    [],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      const ratio = scrollLeft / maxScroll;
      setActiveIndex(Math.round(ratio * (totalDots - 1)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalDots]);

  useEffect(() => {
    if (testimonials.length <= visibleCount) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= totalDots ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [testimonials.length, visibleCount, totalDots, scrollToIndex]);

  if (testimonials.length === 0) return null;

  return (
    <StandardSection
      title={title}
      background="cream"
      containerSize="full"
      spacing="lg"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`
            .testimonials-slider::-webkit-scrollbar { display: none; }
          `}</style>

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonials-slider snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div
                className="h-full flex flex-col p-6 md:p-8 bg-white"
                style={{
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Decorative quote mark */}
                <span
                  className="block select-none leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                    fontSize: '48px',
                    color: 'var(--color-primary)',
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <p
                  className="flex-1 italic"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontSize: 'var(--font-size-16)',
                    color: 'var(--color-foreground)',
                    lineHeight: 1.7,
                  }}
                >
                  {t.quote}
                </p>

                <div className="mt-6 pt-4 border-t border-black/10">
                  <p
                    className="font-bold"
                    style={{
                      fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                      fontSize: 'var(--font-size-17)',
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontSize: 'var(--font-size-15)',
                      color: 'var(--color-foreground-muted)',
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        {totalDots > 1 && (
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  scrollToIndex(i);
                }}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Testimonial ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  backgroundColor: i === activeIndex
                    ? 'var(--color-primary)'
                    : 'var(--color-foreground-muted)',
                  opacity: i === activeIndex ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </StandardSection>
  );
}
