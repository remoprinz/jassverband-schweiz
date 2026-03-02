'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { JassCard as JassCardType } from '@/lib/calculator/cards';

interface JassCardProps {
  card: JassCardType;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export function JassCard({ card, isSelected, isDisabled = false, onClick }: JassCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative w-[52px] h-[78px] md:w-[60px] md:h-[90px] rounded-lg cursor-pointer 
        transition-all duration-200 border-2 bg-white overflow-hidden
        ${isSelected 
          ? 'border-[var(--color-primary)] shadow-[0_0_0_3px_rgba(255,0,0,0.2)] -translate-y-1' 
          : 'border-transparent hover:border-[var(--color-primary)] hover:-translate-y-1'
        }
        ${isDisabled ? 'opacity-30 cursor-not-allowed hover:translate-y-0 hover:border-transparent' : ''}
      `}
      whileHover={!isDisabled ? { scale: 1.05 } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      title={card.label}
    >
      <Image
        src={card.image}
        alt={card.label}
        fill
        className="object-cover"
        draggable={false}
        sizes="60px"
      />
    </motion.button>
  );
}
