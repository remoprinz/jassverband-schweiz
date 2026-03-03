'use client';

import { useState } from 'react';
import { StandardSection } from '@/components/layout/StandardSection';
import { FAQCard } from '@/components/ui';

interface HomeFAQProps {
  title: string;
  questions: Array<{
    question: string;
    answer: string;
    linkUrl?: string;
    linkLabel?: string;
  }>;
}

export function HomeFAQ({ title, questions }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <StandardSection
      title={title}
      background="white"
      containerSize="full"
      spacing="lg"
    >
      <div className="space-y-4">
        {questions.map((q, i) => (
          <FAQCard
            key={i}
            question={q.question}
            answer={q.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            linkUrl={q.linkUrl}
            linkLabel={q.linkLabel}
          />
        ))}
      </div>
    </StandardSection>
  );
}
