'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CardGrid, ConfigPanel, ResultDisplay } from '@/components/calculator';
import type { JassCard } from '@/lib/calculator/cards';
import {
  calculateProbability,
  type CalculationConfig,
  type OpponentType,
  type Comparator,
} from '@/lib/calculator/jassLogic';

const MAX_CARDS = 9;

export default function JasskalkulatorPage() {
  const [selectedCards, setSelectedCards] = useState<JassCard[]>([]);
  const [config, setConfig] = useState<Partial<CalculationConfig>>({
    opponentType: 'opponents_one' as OpponentType,
    comparator: 'atLeast' as Comparator,
    condition: 1,
  });

  const handleCardSelect = useCallback((card: JassCard) => {
    setSelectedCards((prev) => {
      const isSelected = prev.some((c) => c.id === card.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== card.id);
      }
      if (prev.length >= MAX_CARDS) {
        return prev;
      }
      return [...prev, card];
    });
  }, []);

  const handleConfigChange = useCallback(
    (newConfig: Partial<CalculationConfig>) => {
      setConfig(newConfig);
    },
    []
  );

  const isComplete = useMemo(() => {
    return (
      selectedCards.length === MAX_CARDS &&
      config.targetCard &&
      config.opponentType &&
      config.comparator &&
      config.condition !== undefined
    );
  }, [selectedCards, config]);

  const probability = useMemo(() => {
    if (!isComplete || !config.targetCard) return null;
    return calculateProbability(selectedCards, config as CalculationConfig);
  }, [selectedCards, config, isComplete]);

  useEffect(() => {
    if (config.targetCard && selectedCards.length === MAX_CARDS) {
      const maxInSuit =
        9 - selectedCards.filter((c) => c.suit === config.targetCard!.suit).length;
      if (config.condition && config.condition > maxInSuit) {
        setConfig((prev) => ({ ...prev, condition: maxInSuit }));
      }
    }
  }, [selectedCards, config.targetCard, config.condition]);

  return (
    <div className="section-spacing bg-[var(--color-cream)]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4" style={{ fontFamily: 'var(--font-capita), Capita, Georgia, serif' }}>
            Jasskalkulator
          </h1>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Berechne die Wahrscheinlichkeit, dass Partner oder Gegner bestimmte Karten halten. Wähle deine 9 Karten und konfiguriere die Abfrage.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Card Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
                Ich habe folgende Karten:
              </h2>
              <div className="text-lg font-medium text-[var(--color-foreground-muted)]">
                <span className={selectedCards.length === MAX_CARDS ? 'text-green-600' : 'text-[var(--color-primary)]'}>
                  {selectedCards.length}
                </span>
                {' / '}
                {MAX_CARDS}
              </div>
            </div>
            <CardGrid
              selectedCards={selectedCards}
              onCardSelect={handleCardSelect}
              maxCards={MAX_CARDS}
            />
          </motion.div>

          {/* Right: Configuration & Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <ConfigPanel
                selectedCards={selectedCards}
                config={config}
                onConfigChange={handleConfigChange}
              />
            </div>

            <ResultDisplay
              probability={probability}
              isReady={selectedCards.length === MAX_CARDS}
            />
          </motion.div>
        </div>

        {/* Source Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm text-[var(--color-foreground-muted)]"
        >
          <p>
            Basierend auf der hypergeometrischen Verteilung.{' '}
            <a
              href="https://jasswiki.ch/wahrscheinlichkeit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              Mehr erfahren auf JassWiki
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
