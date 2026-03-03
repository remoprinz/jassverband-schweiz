'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { JASS_CARDS, CARDS_BY_SUIT, type JassCard, type CardLocale, type Suit, type Value, getSuitLabel, getValueLabel } from '@/lib/calculator/cards';
import { calculateProbability, type CalculationConfig, type OpponentType, type Comparator, getAvailableCards, getMaxPossibleInSuit } from '@/lib/calculator/jassLogic';

const MAX_CARDS = 9;

const SUIT_ICONS: Record<CardLocale, Record<Suit, string>> = {
  de: {
    E: '/cards/icons/eichel.svg',
    R: '/cards/icons/rosen.svg', 
    S: '/cards/icons/schellen.svg',
    L: '/cards/icons/schilten.svg',
  },
  fr: {
    E: '/cards/icons/schaufel.svg',
    R: '/cards/icons/kreuz.svg',
    S: '/cards/icons/herz.svg',
    L: '/cards/icons/ecke.svg',
  }
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
  const valueLabels: Record<CardLocale, Record<Value, string>> = {
    de: { A: 'Ass', K: 'König', O: 'Ober', U: 'Under', '10': 'Banner', '9': '9', '8': '8', '7': '7', '6': '6' },
    fr: { A: 'As', K: 'Roi', O: 'Dame', U: 'Valet', '10': 'Dix', '9': '9', '8': '8', '7': '7', '6': '6' }
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{ 
        backgroundColor: '#1a472a',
        fontFamily: 'var(--font-family-sans)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/"
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 
              className="text-white text-lg sm:text-xl flex items-center gap-2"
              style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 700 }}
            >
              <span className="text-xl sm:text-2xl">🎴</span>
              JassSimulator
            </h1>
          </div>
          
          {/* DE/FR Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCardLocale('de')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm transition-all ${
                cardLocale === 'de'
                  ? 'bg-[#2BB752] text-white font-semibold'
                  : 'bg-[#1a1a1a] text-white/60 border border-[#333] hover:text-white hover:border-[#00FF46]'
              }`}
              style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
            >
              DE
            </button>
            <button
              onClick={() => setCardLocale('fr')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm transition-all ${
                cardLocale === 'fr'
                  ? 'bg-[#2BB752] text-white font-semibold'
                  : 'bg-[#1a1a1a] text-white/60 border border-[#333] hover:text-white hover:border-[#00FF46]'
              }`}
              style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
            >
              FR
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-4 sm:gap-6">
          {/* Left: Card Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span 
                className="text-white text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
              >
                Ich habe folgende Karten:
              </span>
              <span 
                className="text-white text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
              >
                {selectedCards.length} | {MAX_CARDS}
              </span>
            </div>

            {/* Card Grid - 4 rows (suits) x 9 columns (values) */}
            <div className="space-y-1.5 sm:space-y-2">
              {CARDS_BY_SUIT.map((suitCards, suitIndex) => (
                <div key={suitIndex} className="flex gap-1 sm:gap-1.5">
                  {suitCards.map((card) => {
                    const isSelected = selectedCards.some((c) => c.id === card.id);
                    const isDisabled = !isSelected && selectedCards.length >= MAX_CARDS;
                    
                    return (
                      <motion.button
                        key={card.id}
                        onClick={() => !isDisabled && handleCardSelect(card)}
                        disabled={isDisabled}
                        className={`relative aspect-[83/130] rounded overflow-hidden transition-all ${
                          isSelected 
                            ? 'ring-2 ring-[#00FF46] z-10 brightness-100' 
                            : isDisabled 
                              ? 'opacity-30 cursor-not-allowed brightness-50'
                              : 'brightness-[0.6] hover:brightness-90 cursor-pointer'
                        }`}
                        style={{
                          width: 'calc((100% - 8 * 4px) / 9)',
                          boxShadow: isSelected 
                            ? '3px 4px 4px rgba(0,0,0,0.25)'
                            : '2px 3px 3px rgba(0,0,0,0.15)',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        }}
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
          <div className="space-y-3 sm:space-y-4 mt-4 lg:mt-0">
            <span 
              className="text-white text-sm sm:text-base block"
              style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 600 }}
            >
              Wie gross ist die Wahrscheinlichkeit...
            </span>

            {/* Opponent Selection */}
            <div className="flex gap-1.5 sm:gap-2">
              {[
                { key: 'partner', label: 'Mein\nPartner', type: 'partner' as OpponentType },
                { key: 'opponents_one', label: 'Einer der\nGegner', type: 'opponents_one' as OpponentType },
                { key: 'opponents_none', label: 'Keiner der\nGegner', type: 'opponents_none' as OpponentType },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setConfig((prev) => ({ ...prev, opponentType: opt.type }))}
                  className={`flex-1 py-2 px-2 rounded text-[10px] sm:text-xs whitespace-pre-line text-center leading-tight transition-all ${
                    config.opponentType === opt.type
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                  }`}
                  style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Suit Selection - with real SVG icons */}
            <div className="flex gap-1.5 sm:gap-2">
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
                    className={`flex-1 h-12 sm:h-14 rounded flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] border-2 border-[#00FF46]'
                        : hasAvailable || selectedCards.length < MAX_CARDS
                          ? 'bg-[#1a1a1a] border border-[#333] hover:border-[#00FF46]'
                          : 'bg-[#1a1a1a] border border-[#333] opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <Image
                      src={SUIT_ICONS[cardLocale][suit]}
                      alt={getSuitLabel(suit, cardLocale)}
                      width={28}
                      height={28}
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Value Selection - Row 1: Ass, König, Ober, Under, Banner */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {(['A', 'K', 'O', 'U', '10'] as Value[]).map((value) => {
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
                    className={`py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                        : isAvailable && targetSuit
                          ? 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                          : 'bg-[#1a1a1a] text-white/40 border border-[#333] cursor-not-allowed'
                    }`}
                    style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                  >
                    {valueLabels[cardLocale][value]}
                  </button>
                );
              })}
            </div>
            
            {/* Value Selection - Row 2: 9, 8, 7, 6 */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {(['9', '8', '7', '6'] as Value[]).map((value) => {
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
                    className={`py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                        : isAvailable && targetSuit
                          ? 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                          : 'bg-[#1a1a1a] text-white/40 border border-[#333] cursor-not-allowed'
                    }`}
                    style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                  >
                    {valueLabels[cardLocale][value]}
                  </button>
                );
              })}
            </div>

            {/* Comparator Selection */}
            <div className="flex gap-1.5 sm:gap-2">
              {[
                { key: 'atLeast', label: 'mindestens' },
                { key: 'exact', label: 'genau' },
                { key: 'atMost', label: 'höchstens' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setConfig((prev) => ({ ...prev, comparator: opt.key as Comparator }))}
                  className={`flex-1 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                    config.comparator === opt.key
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                  }`}
                  style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Condition Selection - Row 1 */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              <button
                onClick={() => setConfig((prev) => ({ ...prev, condition: 0 }))}
                className={`py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                  config.condition === 0
                    ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                    : 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                }`}
                style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
              >
                blutt
              </button>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                  disabled={n > maxCondition}
                  className={`py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                    config.condition === n
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : n <= maxCondition
                        ? 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                        : 'bg-[#1a1a1a] text-white/40 border border-[#333] cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                >
                  zu {n}.
                </button>
              ))}
            </div>
            
            {/* Condition Selection - Row 2 */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {[6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                  disabled={n > maxCondition}
                  className={`py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all ${
                    config.condition === n
                      ? 'bg-[#2BB752] text-white border border-[#00FF46]'
                      : n <= maxCondition
                        ? 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00FF46]'
                        : 'bg-[#1a1a1a] text-white/40 border border-[#333] cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
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
                className="rounded-xl p-3 sm:p-4 flex items-center justify-between"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  border: '0.5px solid #00FF46',
                  borderRadius: '12px',
                }}
              >
                <span 
                  className="text-white text-sm sm:text-base"
                  style={{ fontFamily: 'var(--font-family-sans)', fontWeight: 500 }}
                >
                  Wahrscheinlichkeit
                </span>
                {probability !== null ? (
                  <span 
                    className="text-xl sm:text-2xl"
                    style={{ 
                      color: probability >= 50 ? '#2BB752' : '#ff4444',
                      fontFamily: 'var(--font-family-serif)',
                      fontWeight: 700,
                    }}
                  >
                    {probability.toFixed(0)}%
                  </span>
                ) : (
                  <span 
                    className="text-white/40 text-base sm:text-lg"
                    style={{ fontFamily: 'var(--font-family-serif)' }}
                  >
                    —
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Icons */}
        <div className="flex justify-end gap-2 mt-4">
          {suitIcons.map((suit) => (
            <div key={suit} className="w-5 h-5 sm:w-6 sm:h-6 opacity-60">
              <Image
                src={SUIT_ICONS[cardLocale][suit]}
                alt={getSuitLabel(suit, cardLocale)}
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
