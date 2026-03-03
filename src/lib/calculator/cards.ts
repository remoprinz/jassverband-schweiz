export type Suit = 'E' | 'R' | 'S' | 'L';
export type Value = 'A' | 'K' | 'O' | 'U' | '10' | '9' | '8' | '7' | '6';
export type CardLocale = 'de' | 'fr';

export interface JassCard {
  id: string;
  suit: Suit;
  value: Value;
  label: string;
  getImage: (locale: CardLocale) => string;
}

const SUITS: Suit[] = ['E', 'R', 'S', 'L'];
const VALUES: Value[] = ['A', 'K', 'O', 'U', '10', '9', '8', '7', '6'];

const SUIT_NAMES: Record<CardLocale, Record<Suit, string>> = {
  de: {
    E: 'Eichel',
    R: 'Rosen',
    S: 'Schellen',
    L: 'Schilten',
  },
  fr: {
    E: 'Pique',
    R: 'Trèfle',
    S: 'Cœur',
    L: 'Carreau',
  },
};

const VALUE_NAMES: Record<CardLocale, Record<Value, string>> = {
  de: {
    A: 'Ass',
    K: 'König',
    O: 'Ober',
    U: 'Under',
    '10': 'Banner',
    '9': 'Nüüni',
    '8': 'Achti',
    '7': 'Sibni',
    '6': 'Sächsi',
  },
  fr: {
    A: 'As',
    K: 'Roi',
    O: 'Dame',
    U: 'Valet',
    '10': 'Dix',
    '9': 'Neuf',
    '8': 'Huit',
    '7': 'Sept',
    '6': 'Six',
  },
};

export function getCardLabel(suit: Suit, value: Value, locale: CardLocale): string {
  return `${SUIT_NAMES[locale][suit]} ${VALUE_NAMES[locale][value]}`;
}

export function getCardImage(suit: Suit, value: Value, locale: CardLocale): string {
  return `/cards/${locale}/${suit}${value}.png`;
}

export const JASS_CARDS: JassCard[] = SUITS.flatMap((suit) =>
  VALUES.map((value) => ({
    id: `${suit}${value}`,
    suit,
    value,
    label: `${SUIT_NAMES.de[suit]} ${VALUE_NAMES.de[value]}`,
    getImage: (locale: CardLocale) => `/cards/${locale}/${suit}${value}.png`,
  }))
);

export const CARDS_BY_SUIT = SUITS.map((suit) =>
  JASS_CARDS.filter((card) => card.suit === suit)
);

export const getSuitLabel = (suit: Suit, locale: CardLocale) => SUIT_NAMES[locale][suit];
export const getValueLabel = (value: Value, locale: CardLocale) => VALUE_NAMES[locale][value];
export const SUIT_LABELS = SUIT_NAMES.de;
export const VALUE_LABELS = VALUE_NAMES.de;
