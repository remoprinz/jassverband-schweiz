'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { PiCalculatorFill } from 'react-icons/pi';
import { JASS_CARDS, type JassCard, type CardLocale, type Suit, type Value, getSuitLabel } from '@/lib/calculator/cards';
import { calculateProbability, type CalculationConfig, type OpponentType, type Comparator, getMaxPossibleInSuit } from '@/lib/calculator/jassLogic';

const MAX_CARDS = 9;
const CARD_VALUE_DISPLAY_ORDER: Value[] = ['6', '7', '8', '9', '10', 'U', 'O', 'K', 'A'];
const CARD_VALUE_ORDER_INDEX = new Map<Value, number>(
  CARD_VALUE_DISPLAY_ORDER.map((value, index) => [value, index])
);
const OPTION_BUTTON_ACTIVE_BG = '#2BB752';
const OPTION_BUTTON_ACTIVE_BORDER = '#00FF46';
const OPTION_BUTTON_INACTIVE_BG = '#020902';
const OPTION_BUTTON_INACTIVE_BORDER = '#020902';
const PROBABILITY_LOW_COLOR = '#FF2D2D';
const PROBABILITY_MID_COLOR = '#FFC83D';
const PROBABILITY_HIGH_COLOR = '#00FF46';
const SUIT_ICON_DIMENSIONS: Record<CardLocale, Record<Suit, { width: number; height: number }>> = {
  de: {
    E: { width: 27, height: 49 },
    R: { width: 42, height: 44 },
    S: { width: 44, height: 44 },
    L: { width: 30, height: 43 },
  },
  fr: {
    E: { width: 58, height: 58 },
    R: { width: 44, height: 44 },
    S: { width: 58, height: 58 },
    L: { width: 56, height: 56 },
  },
};

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

const FR_SUIT_ICON_SCALE: Partial<Record<Suit, number>> = {
  E: 1.07, // Schaufel
  R: 1.1025, // Kreuz (nochmals +5%)
  S: 1.15, // Herz
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function mixHex(a: string, b: string, t: number): string {
  const tClamped = clamp(t, 0, 1);
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  return rgbToHex(
    c1.r + (c2.r - c1.r) * tClamped,
    c1.g + (c2.g - c1.g) * tClamped,
    c1.b + (c2.b - c1.b) * tClamped
  );
}

function getProbabilityColor(value: number): string {
  const p = clamp(value, 0, 100);
  if (p < 33) return PROBABILITY_LOW_COLOR;
  if (p < 66) return PROBABILITY_MID_COLOR;
  return PROBABILITY_HIGH_COLOR;
}

export default function JasskalkulatorPage() {
  const t = useTranslations('jasskalkulator');
  const locale = useLocale();
  const [selectedCards, setSelectedCards] = useState<JassCard[]>([]);
  const [cardLocale, setCardLocale] = useState<CardLocale>('de');
  const [showCardSelectionPopup, setShowCardSelectionPopup] = useState(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [config, setConfig] = useState<Partial<CalculationConfig>>({});
  const cardsReady = selectedCards.length === MAX_CARDS;

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

  const guardConfigInteraction = useCallback((action: () => void) => {
    if (!cardsReady) {
      setShowCardSelectionPopup(true);
      return;
    }
    action();
  }, [cardsReady]);

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

  const displayProbability = probability ?? 0;
  const probabilityValueColor = probability === null ? '#FFFFFF' : getProbabilityColor(displayProbability);
  const probabilityAccentColor = probability === null ? '#00FF46' : probabilityValueColor;
  const probabilityCardBackground = probability === null
    ? 'rgba(0, 0, 0, 0.5)'
    : hexToRgba(probabilityAccentColor, 0.12);
  const probabilityFillColor = probability === null ? '#00FF46' : probabilityAccentColor;
  const resetButtonIsActive = probability !== null;

  useEffect(() => {
    if (config.targetCard && selectedCards.length === MAX_CARDS) {
      const max = getMaxPossibleInSuit(selectedCards, config.targetCard.suit);
      if (config.condition && config.condition > max) {
        setConfig((prev) => ({ ...prev, condition: max }));
      }
    }
  }, [selectedCards, config.targetCard, config.condition]);

  useEffect(() => {
    const updateMobilePortraitState = () => {
      if (typeof window === 'undefined') return;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setIsMobilePortrait(window.innerWidth < 768 && isPortrait);
    };

    updateMobilePortraitState();
    window.addEventListener('resize', updateMobilePortraitState);
    return () => {
      window.removeEventListener('resize', updateMobilePortraitState);
    };
  }, []);

  const suitOrder = ['E', 'R', 'S', 'L'] as Suit[];
  const getSuitCardsInDisplayOrder = (suit: Suit) => {
    return JASS_CARDS
      .filter((card) => card.suit === suit)
      .sort((a, b) => (CARD_VALUE_ORDER_INDEX.get(a.value) ?? 0) - (CARD_VALUE_ORDER_INDEX.get(b.value) ?? 0));
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#1a472a' }}
    >
      {/* Header - Schwarzer Balken */}
      <header 
        className="w-full"
        style={{ 
          backgroundColor: '#000000',
          height: '76px',
          minHeight: '76px',
        }}
      >
        <div className="max-w-[1400px] mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href={`/${locale}`}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="inline-flex items-center gap-1.5 h-8 lg:scale-[1.2] lg:origin-left">
              <span className="w-7 h-7 shrink-0 rounded-full bg-[#FFFFFF] flex items-center justify-center">
                <PiCalculatorFill className="w-4 h-4 text-black" style={{ transform: 'scale(1.15)' }} />
              </span>
              <span 
                className="inline-flex items-center h-7 text-white text-[24px] sm:text-[28px]"
                style={{ 
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 700,
                  lineHeight: '1',
                  transform: 'translateY(3px)',
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
                fontSize: '15px',
                backgroundColor: cardLocale === 'de' ? '#FF0000' : '#020902',
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
                fontSize: '15px',
                backgroundColor: cardLocale === 'fr' ? '#FF0000' : '#020902',
                color: cardLocale === 'fr' ? 'white' : 'rgba(255,255,255,0.6)',
              }}
            >
              FR
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6"
        style={{ paddingBottom: isMobilePortrait ? '56px' : undefined }}
      >
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_396px] gap-8 lg:gap-12">
          
          {/* Left: Card Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span 
                style={{ 
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'white',
                  marginLeft: isMobilePortrait ? '8px' : '0px',
                }}
              >
                {t('myCards')}
              </span>
              <span 
                style={{ 
                  fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'white',
                  marginRight: '10px',
                }}
              >
                {selectedCards.length} | {MAX_CARDS}
              </span>
            </div>

            {/* Card Grid - Desktop/Tablet (eine Reihe pro Farbe) */}
            <div className="hidden md:block space-y-4 lg:mt-5">
              {suitOrder.map((suit) => {
                const suitCards = getSuitCardsInDisplayOrder(suit);
                return (
                  <div key={suit} className="flex gap-1.5">
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
                              ? '0 0 0 2px #00FF46'
                              : '2px 3px 8px rgba(0,0,0,0.4)',
                            borderRadius: '5.2px',
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
                );
              })}
            </div>

            {/* Card Grid - Mobile */}
            <div className="md:hidden">
              {isMobilePortrait ? (
                <div className="space-y-1">
                  {[...CARD_VALUE_DISPLAY_ORDER].reverse().map((value) => (
                    <div key={`portrait-row-${value}`} className="grid grid-cols-4 gap-x-0.5 gap-y-1.5">
                      {suitOrder.map((suit) => {
                        const card = JASS_CARDS.find((c) => c.suit === suit && c.value === value);
                        if (!card) {
                          return <div key={`missing-${suit}-${value}`} />;
                        }
                        const isSelected = selectedCards.some((c) => c.id === card.id);
                        const isDisabled = !isSelected && selectedCards.length >= MAX_CARDS;

                        return (
                          <motion.button
                            key={card.id}
                            onClick={() => !isDisabled && handleCardSelect(card)}
                            disabled={isDisabled}
                            className="relative rounded-lg overflow-hidden transition-all w-[88%] mx-auto"
                            style={{
                              aspectRatio: '83 / 130',
                              opacity: isDisabled ? 0.35 : 1,
                              filter: isSelected ? 'none' : (isDisabled ? 'grayscale(0.5)' : 'brightness(0.7)'),
                              boxShadow: isSelected 
                                ? '0 0 0 2px #00FF46'
                                : '2px 3px 8px rgba(0,0,0,0.4)',
                              borderRadius: '5.2px',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                            }}
                            whileTap={!isDisabled ? { scale: 0.97 } : undefined}
                          >
                            <Image
                              src={card.getImage(cardLocale)}
                              alt={card.label}
                              fill
                              className="object-cover"
                              sizes="(max-width: 767px) 22vw, 80px"
                              draggable={false}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Mobile Landscape: 3x3 pro Farbe */}
                  {suitOrder.map((suit, suitIndex) => {
                    const suitCards = getSuitCardsInDisplayOrder(suit);
                    return (
                      <div key={suit}>
                        <div className="space-y-1.5">
                          {[0, 3, 6].map((startIndex) => (
                            <div key={`${suit}-${startIndex}`} className="grid grid-cols-3 gap-1.5">
                              {suitCards.slice(startIndex, startIndex + 3).map((card) => {
                                const isSelected = selectedCards.some((c) => c.id === card.id);
                                const isDisabled = !isSelected && selectedCards.length >= MAX_CARDS;

                                return (
                                  <motion.button
                                    key={card.id}
                                    onClick={() => !isDisabled && handleCardSelect(card)}
                                    disabled={isDisabled}
                                    className="relative rounded-lg overflow-hidden transition-all w-full"
                                    style={{
                                      aspectRatio: '83 / 130',
                                      opacity: isDisabled ? 0.35 : 1,
                                      filter: isSelected ? 'none' : (isDisabled ? 'grayscale(0.5)' : 'brightness(0.7)'),
                                      boxShadow: isSelected 
                                        ? '0 0 0 2px #00FF46'
                                        : '2px 3px 8px rgba(0,0,0,0.4)',
                                      borderRadius: '5.2px',
                                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                                    }}
                                    whileTap={!isDisabled ? { scale: 0.97 } : undefined}
                                  >
                                    <Image
                                      src={card.getImage(cardLocale)}
                                      alt={card.label}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 767px) 28vw, 80px"
                                      draggable={false}
                                    />
                                  </motion.button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                        {suitIndex < suitOrder.length - 1 && (
                          <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '12px 0' }} />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Right: Config Panel */}
          <div className={`${isMobilePortrait ? 'mt-3' : 'mt-6'} lg:mt-0`}>
            {/* Überschrift - Capita Regular */}
            <h2 
              style={{ 
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'white',
                marginBottom: '20px',
              }}
            >
              {t('probability')}
            </h2>

            {/* Opponent Selection */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'partner', label: t('opponent.partner'), type: 'partner' as OpponentType },
                { key: 'opponents_one', label: t('opponent.opponentsOne'), type: 'opponents_one' as OpponentType },
                { key: 'opponents_none', label: t('opponent.opponentsNone'), type: 'opponents_none' as OpponentType },
              ].map((opt) => {
                const isActive = config.opponentType === opt.type;
                const showActive = cardsReady && isActive;
                return (
                  <button
                    key={opt.key}
                    onClick={() => guardConfigInteraction(() => setConfig((prev) => ({ ...prev, opponentType: opt.type })))}
                    className="flex-1 rounded-lg text-center leading-tight transition-all whitespace-pre-line"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '12px 8px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: 'white',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: cardsReady ? 'pointer' : 'not-allowed',
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
                const showActive = cardsReady && isSelected;
                const suitCards = selectedCards.length === MAX_CARDS 
                  ? JASS_CARDS.filter(c => c.suit === suit && !selectedCards.some(sc => sc.id === c.id))
                  : JASS_CARDS.filter(c => c.suit === suit);
                const hasAvailable = suitCards.length > 0;
                const iconDimensions = SUIT_ICON_DIMENSIONS[cardLocale][suit];
                const shouldForceWhiteFrIcon = cardLocale === 'fr' && !isSelected && (suit === 'E' || suit === 'R');
                const frIconScale = cardLocale === 'fr' ? (FR_SUIT_ICON_SCALE[suit] ?? 1) : 1;
                
                return (
                  <button
                    key={suit}
                    onClick={() => {
                      guardConfigInteraction(() => {
                        if (hasAvailable && suitCards[0]) {
                          setConfig((prev) => ({ ...prev, targetCard: suitCards[0] }));
                        }
                      });
                    }}
                    disabled={cardsReady && !hasAvailable && selectedCards.length === MAX_CARDS}
                    className="w-[90px] md:w-auto md:flex-1 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      height: '55px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      opacity: (!hasAvailable && selectedCards.length === MAX_CARDS) ? 0.4 : 1,
                      cursor: !cardsReady
                        ? 'not-allowed'
                        : ((!hasAvailable && selectedCards.length === MAX_CARDS) ? 'not-allowed' : 'pointer'),
                    }}
                  >
                    <Image
                      src={SUIT_ICONS[cardLocale][suit]}
                      alt={getSuitLabel(suit, cardLocale)}
                      width={iconDimensions.width}
                      height={iconDimensions.height}
                      className="object-contain"
                      style={{
                        width: `${iconDimensions.width}px`,
                        height: `${iconDimensions.height}px`,
                        filter: shouldForceWhiteFrIcon ? 'brightness(0) invert(0.85)' : 'none',
                        transform: `scale(${frIconScale})`,
                        transformOrigin: 'center',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Value Selection - Row 1 */}
            <div className="flex gap-2 mb-2">
              {(['6', '7', '8', '9', '10'] as Value[]).map((value) => {
                const targetSuit = config.targetCard?.suit;
                const card = targetSuit ? JASS_CARDS.find(c => c.suit === targetSuit && c.value === value) : null;
                const isSelected = config.targetCard?.value === value;
                const showActive = cardsReady && isSelected;
                const isAvailable = !card || !selectedCards.some(c => c.id === card.id);
                
                return (
                  <button
                    key={value}
                    onClick={() => {
                      guardConfigInteraction(() => {
                        if (card && isAvailable) {
                          setConfig((prev) => ({ ...prev, targetCard: card }));
                        }
                      });
                    }}
                    disabled={cardsReady && (!isAvailable || !targetSuit)}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '10px 4px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: (isAvailable && targetSuit) ? 'white' : 'rgba(255,255,255,0.4)',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: !cardsReady ? 'not-allowed' : ((!isAvailable || !targetSuit) ? 'not-allowed' : 'pointer'),
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            
            {/* Value Selection - Row 2 */}
            <div className="flex gap-2 mb-4">
              {(['U', 'O', 'K', 'A'] as Value[]).map((value) => {
                const targetSuit = config.targetCard?.suit;
                const card = targetSuit ? JASS_CARDS.find(c => c.suit === targetSuit && c.value === value) : null;
                const isSelected = config.targetCard?.value === value;
                const showActive = cardsReady && isSelected;
                const isAvailable = !card || !selectedCards.some(c => c.id === card.id);
                const labels: Record<Value, string> = {
                  A: t('cardLabels.ass'),
                  K: t('cardLabels.koenig'),
                  O: locale === 'de' && cardLocale === 'fr' ? 'Dame' : t('cardLabels.dame'),
                  U: t('cardLabels.unter'),
                  '10': '10',
                  '9': '9',
                  '8': '8',
                  '7': '7',
                  '6': '6',
                };
                
                return (
                  <button
                    key={value}
                    onClick={() => {
                      guardConfigInteraction(() => {
                        if (card && isAvailable) {
                          setConfig((prev) => ({ ...prev, targetCard: card }));
                        }
                      });
                    }}
                    disabled={cardsReady && (!isAvailable || !targetSuit)}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '10px 4px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: (isAvailable && targetSuit) ? 'white' : 'rgba(255,255,255,0.4)',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: !cardsReady ? 'not-allowed' : ((!isAvailable || !targetSuit) ? 'not-allowed' : 'pointer'),
                    }}
                  >
                    {labels[value]}
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Comparator Selection */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'atLeast', label: t('comparator.atLeast') },
                { key: 'exact', label: t('comparator.exact') },
                { key: 'atMost', label: t('comparator.atMost') },
              ].map((opt) => {
                const isActive = config.comparator === opt.key;
                const showActive = cardsReady && isActive;
                return (
                  <button
                    key={opt.key}
                    onClick={() => guardConfigInteraction(() => setConfig((prev) => ({ ...prev, comparator: opt.key as Comparator })))}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '12px 8px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: 'white',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: cardsReady ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Divider Line - GRÜN */}
            <div style={{ height: '1px', backgroundColor: '#00FF46', margin: '16px 0' }} />

            {/* Condition Selection - Row 1 */}
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => guardConfigInteraction(() => setConfig((prev) => ({ ...prev, condition: 0 })))}
                className="flex-1 rounded-lg transition-all"
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  padding: '10px 4px',
                  backgroundColor: cardsReady && config.condition === 0 ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                  color: 'white',
                  border: `1px solid ${cardsReady && config.condition === 0 ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                  cursor: cardsReady ? 'pointer' : 'not-allowed',
                }}
              >
                {t('condition.blutt')}
              </button>
              {[2, 3, 4, 5].map((n) => {
                const isActive = config.condition === n;
                const showActive = cardsReady && isActive;
                const isDisabled = n > maxCondition;
                return (
                  <button
                    key={n}
                    onClick={() => guardConfigInteraction(() => setConfig((prev) => ({ ...prev, condition: n })))}
                    disabled={cardsReady && isDisabled}
                    className="flex-1 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '10px 4px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: isDisabled ? 'rgba(255,255,255,0.4)' : 'white',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: !cardsReady ? 'not-allowed' : (isDisabled ? 'not-allowed' : 'pointer'),
                    }}
                  >
                    {t('condition.atN', { n })}
                  </button>
                );
              })}
            </div>
            
            {/* Condition Selection - Row 2 */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[6, 7, 8, 9].map((n) => {
                const isActive = config.condition === n;
                const showActive = cardsReady && isActive;
                const isDisabled = n > maxCondition;
                return (
                  <button
                    key={n}
                    onClick={() => guardConfigInteraction(() => setConfig((prev) => ({ ...prev, condition: n })))}
                    disabled={cardsReady && isDisabled}
                    className="rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      padding: '10px 4px',
                      backgroundColor: showActive ? OPTION_BUTTON_ACTIVE_BG : OPTION_BUTTON_INACTIVE_BG,
                      color: isDisabled ? 'rgba(255,255,255,0.4)' : 'white',
                      border: `1px solid ${showActive ? OPTION_BUTTON_ACTIVE_BORDER : OPTION_BUTTON_INACTIVE_BORDER}`,
                      cursor: !cardsReady ? 'not-allowed' : (isDisabled ? 'not-allowed' : 'pointer'),
                    }}
                  >
                    {t('condition.atN', { n })}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setSelectedCards([]);
                  setConfig({});
                  setShowCardSelectionPopup(false);
                }}
                className="rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: resetButtonIsActive ? '#FF0000' : OPTION_BUTTON_INACTIVE_BG,
                  border: `1px solid ${resetButtonIsActive ? '#FF0000' : OPTION_BUTTON_INACTIVE_BORDER}`,
                  cursor: 'pointer',
                }}
                aria-label="Reset"
                title="Reset"
              >
                <Image
                  src="/cards/icons/back_icon.svg"
                  alt="Reset"
                  width={24}
                  height={24}
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </button>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-capita), Capita, Georgia, serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'white',
                marginLeft: '20px',
                marginBottom: '8px',
              }}
            >
              {t('resultSuffix')}
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
                  backgroundColor: probabilityCardBackground,
                  border: `1px solid ${probabilityAccentColor}`,
                  borderRadius: '24px',
                  padding: '20px',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-inter), Inter, sans-serif', 
                      fontWeight: 500,
                      fontSize: '15px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'white',
                    }}
                  >
                    {t('result')}
                  </span>
                  <span 
                    style={{ 
                      color: probabilityValueColor,
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: '34px',
                      fontWeight: 700,
                      lineHeight: '100%',
                      letterSpacing: '0%',
                    }}
                  >
                    {displayProbability.toFixed(0)}%
                  </span>
                </div>
                {/* Progress Bar */}
                <div 
                  style={{ 
                    height: '8px', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${probabilityAccentColor}`,
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{ 
                      height: '100%',
                      borderRadius: '9999px',
                      backgroundColor: probabilityFillColor,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: probability !== null ? `${displayProbability}%` : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCardSelectionPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
            onClick={() => setShowCardSelectionPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full max-w-[360px] rounded-2xl"
              style={{
                backgroundColor: '#020902',
                border: '1px solid #00FF46',
                padding: '18px 16px 14px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  lineHeight: '140%',
                  color: '#FFFFFF',
                  marginBottom: '14px',
                }}
              >
                {t('selectCards')}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCardSelectionPopup(false)}
                  className="rounded-lg"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    backgroundColor: '#2BB752',
                    border: '1px solid #00FF46',
                    padding: '7px 12px',
                  }}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
