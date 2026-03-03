'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { JASS_CARDS, CARDS_BY_SUIT, type JassCard, type CardLocale, type Suit, type Value, getSuitLabel, getValueLabel } from '@/lib/calculator/cards';
import { calculateProbability, type CalculationConfig, type OpponentType, type Comparator, getAvailableCards, getMaxPossibleInSuit } from '@/lib/calculator/jassLogic';

const MAX_CARDS = 9;

const SUIT_ICONS: Record<Suit, string> = {
  E: '/cards/icons/eichel.svg',
  R: '/cards/icons/rosen.svg', 
  S: '/cards/icons/schellen.svg',
  L: '/cards/icons/schilten.svg',
};

export default function JasskalkulatorPage() {
  const [selectedCards, setSelectedCards] = useState<JassCard[]>([]);
  const [cardLocale, setCardLocale] = useState<CardLocale>('de');
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

  const availableSuits = useMemo(() => {
    if (selectedCards.length < MAX_CARDS) return [];
    return getAvailableCards(selectedCards);
  }, [selectedCards]);

  const maxCondition = useMemo(() => {
    if (!config.targetCard || selectedCards.length < MAX_CARDS) return 9;
    return getMaxPossibleInSuit(selectedCards, config.targetCard.suit);
  }, [selectedCards, config.targetCard]);

  useEffect(() => {
    if (config.targetCard && selectedCards.length === MAX_CARDS) {
      const max = getMaxPossibleInSuit(selectedCards, config.targetCard.suit);
      if (config.condition && config.condition > max) {
        setConfig((prev) => ({ ...prev, condition: max }));
      }
    }
  }, [selectedCards, config.targetCard, config.condition]);

  const suitIcons = ['E', 'R', 'S', 'L'] as Suit[];
  const values = ['A', 'K', 'O', 'U', '10', '9', '8', '7', '6'] as Value[];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a472a' }}>
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-white text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🎴</span>
              JassSimulator
            </h1>
          </div>
          
          {/* DE/FR Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCardLocale('de')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                cardLocale === 'de'
                  ? 'bg-[#2BB752] text-white'
                  : 'bg-[#020905] text-white/60 border border-[#020902] hover:text-white'
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setCardLocale('fr')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                cardLocale === 'fr'
                  ? 'bg-[#2BB752] text-white'
                  : 'bg-[#020905] text-white/60 border border-[#020902] hover:text-white'
              }`}
            >
              FR
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left: Card Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-base font-bold">Ich habe folgende Karten:</span>
              <span className="text-white text-base font-bold">
                {selectedCards.length} | {MAX_CARDS}
              </span>
            </div>

            {/* Card Grid - 4 rows (suits) x 9 columns (values) */}
            <div className="space-y-2">
              {CARDS_BY_SUIT.map((suitCards, suitIndex) => (
                <div key={suitIndex} className="flex gap-1.5">
                  {suitCards.map((card) => {
                    const isSelected = selectedCards.some((c) => c.id === card.id);
                    const isDisabled = !isSelected && selectedCards.length >= MAX_CARDS;
                    
                    return (
                      <motion.button
                        key={card.id}
                        onClick={() => !isDisabled && handleCardSelect(card)}
                        disabled={isDisabled}
                        className={`relative aspect-[83/130] rounded-md overflow-hidden transition-all ${
                          isSelected 
                            ? 'ring-2 ring-[#00FF46] scale-105 z-10' 
                            : isDisabled 
                              ? 'opacity-40 cursor-not-allowed grayscale'
                              : 'hover:scale-102 cursor-pointer'
                        }`}
                        style={{
                          width: 'calc((100% - 8 * 6px) / 9)',
                          boxShadow: isSelected 
                            ? '3px 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.25)'
                            : '2px 3px 3px rgba(0,0,0,0.15)',
                        }}
                        whileHover={!isDisabled ? { scale: 1.03 } : undefined}
                        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                      >
                        <Image
                          src={card.getImage(cardLocale)}
                          alt={card.label}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 10vw, 80px"
                          draggable={false}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Config Panel */}
          <div className="space-y-4">
            <span className="text-white text-base font-bold block">Wie gross ist die Wahrscheinlichkeit...</span>

            {/* Opponent Selection */}
            <div className="flex gap-2">
              {[
                { key: 'partner', label: 'Mein\nPartner', type: 'partner' as OpponentType },
                { key: 'opponents_one', label: 'Einer der\nGegner', type: 'opponents_one' as OpponentType },
                { key: 'opponents_none', label: 'Keiner der\nGegner', type: 'opponents_none' as OpponentType },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setConfig((prev) => ({ ...prev, opponentType: opt.type }))}
                  className={`flex-1 py-2 px-3 rounded text-xs font-medium whitespace-pre-line text-center transition-all ${
                    config.opponentType === opt.type
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Suit Selection */}
            <div className="flex gap-2">
              {suitIcons.map((suit) => {
                const isSelected = config.targetCard?.suit === suit;
                const suitCards = selectedCards.length === MAX_CARDS 
                  ? JASS_CARDS.filter(c => c.suit === suit && !selectedCards.some(sc => sc.id === c.id))
                  : JASS_CARDS.filter(c => c.suit === suit);
                const hasAvailable = suitCards.length > 0;
                
                return (
                  <button
                    key={suit}
                    onClick={() => {
                      if (hasAvailable && suitCards[0]) {
                        setConfig((prev) => ({ ...prev, targetCard: suitCards[0] }));
                      }
                    }}
                    disabled={!hasAvailable && selectedCards.length === MAX_CARDS}
                    className={`flex-1 aspect-square rounded flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] border border-[#00FF46]'
                        : hasAvailable || selectedCards.length < MAX_CARDS
                          ? 'bg-[#020905] border border-[#020902] hover:border-[#00FF46]'
                          : 'bg-[#020905] border border-[#020902] opacity-40 cursor-not-allowed'
                    }`}
                    style={{ maxWidth: '90px', maxHeight: '55px' }}
                  >
                    <Image
                      src={`/cards/de/${suit}A.png`}
                      alt={getSuitLabel(suit, cardLocale)}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Value Selection */}
            <div className="grid grid-cols-5 gap-2">
              {values.slice(0, 5).map((value) => {
                const targetSuit = config.targetCard?.suit;
                const card = targetSuit ? JASS_CARDS.find(c => c.suit === targetSuit && c.value === value) : null;
                const isSelected = config.targetCard?.value === value;
                const isAvailable = !card || !selectedCards.some(c => c.id === card.id);
                
                return (
                  <button
                    key={value}
                    onClick={() => {
                      if (card && isAvailable) {
                        setConfig((prev) => ({ ...prev, targetCard: card }));
                      }
                    }}
                    disabled={!isAvailable || !targetSuit}
                    className={`py-2 rounded text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                        : isAvailable && targetSuit
                          ? 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                          : 'bg-[#020905] text-white/40 border border-[#020902] cursor-not-allowed'
                    }`}
                  >
                    {getValueLabel(value, cardLocale)}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {values.slice(5).map((value) => {
                const targetSuit = config.targetCard?.suit;
                const card = targetSuit ? JASS_CARDS.find(c => c.suit === targetSuit && c.value === value) : null;
                const isSelected = config.targetCard?.value === value;
                const isAvailable = !card || !selectedCards.some(c => c.id === card.id);
                
                return (
                  <button
                    key={value}
                    onClick={() => {
                      if (card && isAvailable) {
                        setConfig((prev) => ({ ...prev, targetCard: card }));
                      }
                    }}
                    disabled={!isAvailable || !targetSuit}
                    className={`py-2 rounded text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                        : isAvailable && targetSuit
                          ? 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                          : 'bg-[#020905] text-white/40 border border-[#020902] cursor-not-allowed'
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            {/* Comparator Selection */}
            <div className="flex gap-2">
              {[
                { key: 'atLeast', label: 'mindestens' },
                { key: 'exact', label: 'genau' },
                { key: 'atMost', label: 'höchstens' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setConfig((prev) => ({ ...prev, comparator: opt.key as Comparator }))}
                  className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                    config.comparator === opt.key
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Condition Selection */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setConfig((prev) => ({ ...prev, condition: 0 }))}
                className={`py-2 rounded text-sm font-medium transition-all ${
                  config.condition === 0
                    ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                    : 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                }`}
              >
                blutt
              </button>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                  disabled={n > maxCondition}
                  className={`py-2 rounded text-sm font-medium transition-all ${
                    config.condition === n
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : n <= maxCondition
                        ? 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                        : 'bg-[#020905] text-white/40 border border-[#020902] cursor-not-allowed'
                  }`}
                >
                  zu {n}.
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                  disabled={n > maxCondition}
                  className={`py-2 rounded text-sm font-medium transition-all ${
                    config.condition === n
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : n <= maxCondition
                        ? 'bg-[#020905] text-white border border-[#020902] hover:border-[#00FF46]'
                        : 'bg-[#020905] text-white/40 border border-[#020902] cursor-not-allowed'
                  }`}
                >
                  zu {n}.
                </button>
              ))}
            </div>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={probability?.toString() ?? 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  border: '0.5px solid #00FF46',
                  borderRadius: '12px',
                }}
              >
                <span className="text-white text-base">Wahrscheinlichkeit</span>
                {probability !== null ? (
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: probability >= 50 ? '#2BB752' : '#ff4444' }}
                  >
                    {probability.toFixed(0)}%
                  </span>
                ) : (
                  <span className="text-white/40 text-lg">—</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Icons */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="w-6 h-6 text-yellow-400 hover:scale-110 transition-transform">💡</button>
          <button className="w-6 h-6 text-red-500 hover:scale-110 transition-transform">❓</button>
          <button className="w-6 h-6 text-orange-400 hover:scale-110 transition-transform">⚙️</button>
        </div>
      </div>
    </div>
  );
}
