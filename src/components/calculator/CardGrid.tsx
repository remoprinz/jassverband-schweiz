'use client';

import { motion } from 'framer-motion';
import { JassCard } from './JassCard';
import { CARDS_BY_SUIT, SUIT_LABELS, type Suit, type JassCard as JassCardType } from '@/lib/calculator/cards';

interface CardGridProps {
  selectedCards: JassCardType[];
  onCardSelect: (card: JassCardType) => void;
  maxCards: number;
}

export function CardGrid({ selectedCards, onCardSelect, maxCards }: CardGridProps) {
  const isCardSelected = (card: JassCardType) =>
    selectedCards.some((c) => c.id === card.id);

  const canSelectMore = selectedCards.length < maxCards;

  return (
    <div className="space-y-4">
      {CARDS_BY_SUIT.map((suitCards, suitIndex) => (
        <motion.div
          key={suitCards[0].suit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: suitIndex * 0.1 }}
          className="space-y-2"
        >
          <div className="text-sm font-medium text-[var(--color-foreground-muted)]">
            {SUIT_LABELS[suitCards[0].suit as Suit]}
          </div>
          <div className="flex flex-wrap gap-2">
            {suitCards.map((card) => {
              const isSelected = isCardSelected(card);
              const isDisabled = !isSelected && !canSelectMore;
              
              return (
                <JassCard
                  key={card.id}
                  card={card}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onClick={() => onCardSelect(card)}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
