export type Suit = 'E' | 'R' | 'S' | 'L';
export type Value = 'A' | 'K' | 'O' | 'U' | '10' | '9' | '8' | '7' | '6';

export interface JassCard {
  id: string;
  suit: Suit;
  value: Value;
  label: string;
  image: string;
}

const SUITS: Suit[] = ['E', 'R', 'S', 'L'];
const VALUES: Value[] = ['A', 'K', 'O', 'U', '10', '9', '8', '7', '6'];

const SUIT_NAMES: Record<Suit, string> = {
  E: 'Eichel',
  R: 'Rosen',
  S: 'Schellen',
  L: 'Schilten',
};

const VALUE_NAMES: Record<Value, string> = {
  A: 'Ass',
  K: 'König',
  O: 'Ober',
  U: 'Under',
  '10': 'Banner',
  '9': 'Nüüni',
  '8': 'Achti',
  '7': 'Sibni',
  '6': 'Sächsi',
};

export const JASS_CARDS: JassCard[] = SUITS.flatMap((suit) =>
  VALUES.map((value) => ({
    id: `${suit}${value}`,
    suit,
    value,
    label: `${SUIT_NAMES[suit]} ${VALUE_NAMES[value]}`,
    image: `/cards/de/${suit}${value}.webp`,
  }))
);

export const CARDS_BY_SUIT = SUITS.map((suit) =>
  JASS_CARDS.filter((card) => card.suit === suit)
);

export const SUIT_LABELS = SUIT_NAMES;
export const VALUE_LABELS = VALUE_NAMES;
