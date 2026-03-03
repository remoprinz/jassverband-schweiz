'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { JASS_CARDS, CARDS_BY_SUIT, type JassCard, type CardLocale, type Suit, type Value, getSuitLabel } from '@/lib/calculator/cards';
import { calculateProbability, type CalculationConfig, type OpponentType, type Comparator, getMaxPossibleInSuit } from '@/lib/calculator/jassLogic';

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
    opponentType: 'opponents_none' as OpponentType,
    comparator: 'atLeast' as Comparator,
    condition: 0,
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

  const suitOrder = ['E', 'R', 'S', 'L'] as Suit[];

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#1a472a' }}
    >
      {/* Header - Schwarzer Balken */}
      <header 
        className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundColor: '#000000',
          height: '56px',
          minHeight: '56px',
        }}
      >
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/icons/jasskalkulator-icon.png"
              alt="JassKalkulator"
              width={28}
              height={28}
              className="w-7 h-7 rounded-full"
            />
            <span 
              className="text-white"
              style={{ 
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 400,
                fontSize: '18px',
              }}
            >
              JassKalkulator
            </span>
          </div>
        </div>
        
        {/* DE/FR Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCardLocale('de')}
            className="px-3 py-1.5 rounded transition-all"
            style={{ 
              fontFamily: 'var(--font-inter), Inter, sans-serif', 
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: cardLocale === 'de' ? '#2BB752' : 'transparent',
              color: cardLocale === 'de' ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          >
            DE
          </button>
          <button
            onClick={() => setCardLocale('fr')}
            className="px-3 py-1.5 rounded transition-all"
            style={{ 
              fontFamily: 'var(--font-inter), Inter, sans-serif', 
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: cardLocale === 'fr' ? '#2BB752' : 'transparent',
              color: cardLocale === 'fr' ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          >
            FR
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-8 lg:gap-12">
          
          {/* Left: Card Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span 
                style={{ 
                  fontFamily: 'var(--font-inter), Inter, sans-serif', 
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'white',
                }}
              >
                Ich habe folgende Karten:
              </span>
              <span 
                style={{ 
                  fontFamily: 'var(--font-inter), Inter, sans-serif', 
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'white',
                }}
              >
                {selectedCards.length} | {MAX_CARDS}
              </span>
            </div>

            {/* Card Grid */}
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
                        className="relative rounded-lg overflow-hidden transition-all"
                        style={{
                          width: 'calc((100% - 8 * 6px) / 9)',
                          aspectRatio: '83 / 130',
                          opacity: isDisabled ? 0.35 : 1,
                          filter: isSelected ? 'none' : (isDisabled ? 'grayscale(0.5)' : 'brightness(0.7)'),
                          boxShadow: isSelected 
                            ? '0 0 0 3px #00FF46, 0 0 16px rgba(0, 255, 70, 0.6)'
                            : '2px 3px 8px rgba(0,0,0,0.4)',
                          borderRadius: '8px',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                        }}
                        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
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
          <div className="mt-6 lg:mt-0">
            {/* Überschrift - Capita Regular */}
            <h2 
              style={{ 
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 400,
                fontSize: '20px',
                color: 'white',
                marginBottom: '20px',
                lineHeight: '1.4',
              }}
            >
              Wie gross ist die Wahrscheinlichkeit, dass ...
            </h2>

            {/* Opponent Selection */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'partner', label: 'Mein\nPartner', type: 'partner' as OpponentType },
                { key: 'opponents_one', label: 'Einer der\nGegner', type: 'opponents_one' as OpponentType },
                { key: 'opponents_none', label: 'Keiner der\nGegner', type: 'opponents_none' as OpponentType },
              ].map((opt) => {
                const isActive = config.opponentType === opt.type;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setConfig((prev) => ({ ...prev, opponentType: opt.type }))}
                    className="flex-1 rounded-lg text-center leading-tight transition-all whitespace-pre-line"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '12px 8px',
                      backgroundColor: isActive ? '#2BB752' : 'transparent',
                      color: 'white',
                      border: '1px solid #00FF46',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Suit Selection */}
            <div className="flex gap-2 mb-4">
              {suitOrder.map((suit) => {
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
                    className="flex-1 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      height: '80px',
                      backgroundColor: isSelected ? '#2BB752' : 'transparent',
                      border: isSelected ? '2px solid #00FF46' : '1px solid #00FF46',
                      opacity: (!hasAvailable && selectedCards.length === MAX_CARDS) ? 0.4 : 1,
                      cursor: (!hasAvailable && selectedCards.length === MAX_CARDS) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Image
                      src={SUIT_ICONS[cardLocale][suit]}
                      alt={getSuitLabel(suit, cardLocale)}
                      width={44}
                      height={44}
                      className="object-contain"
                      style={{ width: '44px', height: '44px' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Value Selection - Row 1 */}
            <div className="flex gap-2 mb-2">
              {(['A', 'K', 'O', 'U', '10'] as Value[]).map((value) => {
                const targetSuit = config.targetCard?.suit;
                const card = targetSuit ? JASS_CARDS.find(c => c.suit === targetSuit && c.value === value) : null;
                const isSelected = config.targetCard?.value === value;
                const isAvailable = !card || !selectedCards.some(c => c.id === card.id);
                const labels: Record<string, string> = { A: 'Ass', K: 'König', O: 'Ober', U: 'Under', '10': '10' };
                
                return (
                  <button
                    key={value}
                    onClick={() => {
                      if (card && isAvailable) {
                        setConfig((prev) => ({ ...prev, targetCard: card }));
                      }
                    }}
                    disabled={!isAvailable || !targetSuit}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '10px 4px',
                      backgroundColor: isSelected ? '#2BB752' : 'transparent',
                      color: (isAvailable && targetSuit) ? 'white' : 'rgba(255,255,255,0.4)',
                      border: '1px solid #3d5c45',
                      cursor: (!isAvailable || !targetSuit) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {labels[value]}
                  </button>
                );
              })}
            </div>
            
            {/* Value Selection - Row 2 */}
            <div className="flex gap-2 mb-4">
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
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '10px 4px',
                      backgroundColor: isSelected ? '#2BB752' : 'transparent',
                      color: (isAvailable && targetSuit) ? 'white' : 'rgba(255,255,255,0.4)',
                      border: '1px solid #3d5c45',
                      cursor: (!isAvailable || !targetSuit) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Comparator Selection */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'atLeast', label: 'mindestens' },
                { key: 'exact', label: 'genau' },
                { key: 'atMost', label: 'höchstens' },
              ].map((opt) => {
                const isActive = config.comparator === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setConfig((prev) => ({ ...prev, comparator: opt.key as Comparator }))}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '12px 8px',
                      backgroundColor: isActive ? '#2BB752' : 'transparent',
                      color: 'white',
                      border: '1px solid #00FF46',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Condition Selection - Row 1 */}
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setConfig((prev) => ({ ...prev, condition: 0 }))}
                className="flex-1 rounded-lg transition-all"
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  padding: '10px 4px',
                  backgroundColor: config.condition === 0 ? '#2BB752' : 'transparent',
                  color: 'white',
                  border: '1px solid #3d5c45',
                }}
              >
                blutt
              </button>
              {[2, 3, 4, 5].map((n) => {
                const isActive = config.condition === n;
                const isDisabled = n > maxCondition;
                return (
                  <button
                    key={n}
                    onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                    disabled={isDisabled}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '10px 4px',
                      backgroundColor: isActive ? '#2BB752' : 'transparent',
                      color: isDisabled ? 'rgba(255,255,255,0.4)' : 'white',
                      border: '1px solid #3d5c45',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    zu {n}.
                  </button>
                );
              })}
            </div>
            
            {/* Condition Selection - Row 2 */}
            <div className="flex gap-2 mb-6">
              {[6, 7, 8, 9].map((n) => {
                const isActive = config.condition === n;
                const isDisabled = n > maxCondition;
                return (
                  <button
                    key={n}
                    onClick={() => setConfig((prev) => ({ ...prev, condition: n }))}
                    disabled={isDisabled}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      padding: '10px 4px',
                      backgroundColor: isActive ? '#2BB752' : 'transparent',
                      color: isDisabled ? 'rgba(255,255,255,0.4)' : 'white',
                      border: '1px solid #3d5c45',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    zu {n}.
                  </button>
                );
              })}
            </div>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={probability?.toString() ?? 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid #00FF46',
                  padding: '16px 20px',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-inter), Inter, sans-serif', 
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'white',
                    }}
                  >
                    Wahrscheinlichkeit
                  </span>
                  {probability !== null ? (
                    <span 
                      style={{ 
                        color: probability >= 50 ? '#00FF46' : '#ff4444',
                        fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                        fontWeight: 700,
                        fontSize: '28px',
                      }}
                    >
                      {probability.toFixed(0)}%
                    </span>
                  ) : (
                    <span 
                      style={{ 
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                        fontSize: '24px',
                      }}
                    >
                      —
                    </span>
                  )}
                </div>
                {/* Progress Bar */}
                <div 
                  style={{ 
                    height: '8px', 
                    backgroundColor: '#1a472a', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{ 
                      height: '100%',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #00FF46 0%, #2BB752 100%)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: probability !== null ? `${probability}%` : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Icons */}
        <div className="flex justify-end gap-2 mt-8">
          {suitOrder.map((suit) => (
            <div key={suit} className="w-6 h-6 opacity-50">
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
