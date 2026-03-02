'use client';

import { motion } from 'framer-motion';

interface ResultDisplayProps {
  probability: number | null;
  isReady: boolean;
}

export function ResultDisplay({ probability, isReady }: ResultDisplayProps) {
  if (!isReady) {
    return (
      <div className="bg-[var(--color-background-alt)] rounded-2xl text-center py-8 px-6">
        <p className="text-[var(--color-foreground-muted)]">
          Wähle 9 Karten und konfiguriere die Berechnung
        </p>
      </div>
    );
  }

  if (probability === null) {
    return (
      <div className="bg-[var(--color-background-alt)] rounded-2xl text-center py-8 px-6">
        <p className="text-[var(--color-foreground-muted)]">
          Vervollständige die Konfiguration
        </p>
      </div>
    );
  }

  const isGood = probability >= 50;
  const bgColor = isGood 
    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
    : 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';

  return (
    <motion.div
      className="rounded-2xl p-8 text-center text-white"
      style={{ background: bgColor }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="text-white/80 text-sm font-medium mb-2">
        Wahrscheinlichkeit
      </div>
      <motion.div
        className="text-6xl md:text-7xl font-bold"
        style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif' }}
        key={probability}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {probability.toFixed(1)}%
      </motion.div>
      <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
