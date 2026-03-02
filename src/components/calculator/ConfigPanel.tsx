'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  JASS_CARDS,
  VALUE_LABELS,
  type Suit,
  type Value,
  type JassCard,
} from '@/lib/calculator/cards';
import type {
  OpponentType,
  Comparator,
  CalculationConfig,
} from '@/lib/calculator/jassLogic';

interface ConfigPanelProps {
  selectedCards: JassCard[];
  config: Partial<CalculationConfig>;
  onConfigChange: (config: Partial<CalculationConfig>) => void;
}

const SUITS: { id: Suit; image: string; label: string }[] = [
  { id: 'E', image: '/cards/de/EA.webp', label: 'Eichel' },
  { id: 'R', image: '/cards/de/RA.webp', label: 'Rosen' },
  { id: 'S', image: '/cards/de/SA.webp', label: 'Schellen' },
  { id: 'L', image: '/cards/de/LA.webp', label: 'Schilten' },
];

const VALUES: Value[] = ['A', 'K', 'O', 'U', '10', '9', '8', '7', '6'];

const OPPONENT_OPTIONS: { id: OpponentType; label: string }[] = [
  { id: 'partner', label: 'Mein Partner' },
  { id: 'opponents_one', label: 'Einer der Gegner' },
  { id: 'opponents_none', label: 'Keiner der Gegner' },
];

const COMPARATOR_OPTIONS: { id: Comparator; label: string }[] = [
  { id: 'atLeast', label: 'mindestens' },
  { id: 'exact', label: 'genau' },
  { id: 'atMost', label: 'höchstens' },
];

function ToggleButton({
  active,
  onClick,
  disabled = false,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm transition-all border-2
        ${active
          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
          : 'bg-white border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      {children}
    </motion.button>
  );
}

export function ConfigPanel({
  selectedCards,
  config,
  onConfigChange,
}: ConfigPanelProps) {
  const selectedSuit = config.targetCard?.suit;
  const selectedValue = config.targetCard?.value;

  const handleSuitSelect = (suit: Suit) => {
    const card = JASS_CARDS.find(
      (c) => c.suit === suit && c.value === (selectedValue || 'A')
    );
    onConfigChange({ ...config, targetCard: card });
  };

  const handleValueSelect = (value: Value) => {
    if (!selectedSuit) return;
    const card = JASS_CARDS.find(
      (c) => c.suit === selectedSuit && c.value === value
    );
    onConfigChange({ ...config, targetCard: card });
  };

  const handleOpponentSelect = (opponentType: OpponentType) => {
    onConfigChange({ ...config, opponentType });
  };

  const handleComparatorSelect = (comparator: Comparator) => {
    onConfigChange({ ...config, comparator });
  };

  const handleConditionSelect = (condition: number) => {
    onConfigChange({ ...config, condition });
  };

  const maxInSuit = selectedSuit
    ? 9 - selectedCards.filter((c) => c.suit === selectedSuit).length
    : 9;

  const isValueDisabled = (value: Value) => {
    if (!selectedSuit) return true;
    return selectedCards.some(
      (c) => c.suit === selectedSuit && c.value === value
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-[var(--color-foreground)]">
        Wie gross ist die Wahrscheinlichkeit...
      </div>

      {/* Opponent Selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {OPPONENT_OPTIONS.map((option) => (
            <ToggleButton
              key={option.id}
              active={config.opponentType === option.id}
              onClick={() => handleOpponentSelect(option.id)}
            >
              {option.label}
            </ToggleButton>
          ))}
        </div>
      </div>

      {/* Suit Selection */}
      <div className="space-y-2">
        <div className="flex gap-2">
          {SUITS.map((suit) => (
            <motion.button
              key={suit.id}
              type="button"
              onClick={() => handleSuitSelect(suit.id)}
              className={`
                relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all
                ${selectedSuit === suit.id
                  ? 'border-[var(--color-primary)] shadow-lg'
                  : 'border-transparent hover:border-[var(--color-primary)]'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={suit.label}
            >
              <Image
                src={suit.image}
                alt={suit.label}
                fill
                className="object-cover"
                sizes="56px"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Value Selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {VALUES.map((value) => {
            const disabled = isValueDisabled(value);
            return (
              <ToggleButton
                key={value}
                active={selectedValue === value}
                onClick={() => handleValueSelect(value)}
                disabled={disabled || !selectedSuit}
              >
                {VALUE_LABELS[value]}
              </ToggleButton>
            );
          })}
        </div>
      </div>

      {/* Comparator Selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {COMPARATOR_OPTIONS.map((option) => (
            <ToggleButton
              key={option.id}
              active={config.comparator === option.id}
              onClick={() => handleComparatorSelect(option.id)}
            >
              {option.label}
            </ToggleButton>
          ))}
        </div>
      </div>

      {/* Condition Selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <ToggleButton
            active={config.condition === 1}
            onClick={() => handleConditionSelect(1)}
          >
            blutt
          </ToggleButton>
          {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <ToggleButton
              key={num}
              active={config.condition === num}
              onClick={() => handleConditionSelect(num)}
              disabled={num > maxInSuit}
            >
              zu {num}.
            </ToggleButton>
          ))}
        </div>
      </div>
    </div>
  );
}
