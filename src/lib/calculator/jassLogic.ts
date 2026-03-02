import { JassCard, JASS_CARDS } from './cards';

export type OpponentType = 'partner' | 'opponents_one' | 'opponents_none';
export type Comparator = 'atLeast' | 'exact' | 'atMost';

export interface CalculationConfig {
  targetCard: JassCard;
  opponentType: OpponentType;
  comparator: Comparator;
  condition: number;
}

function combination(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - k + i)) / i;
  }
  return result;
}

function hypergeometricTail(N: number, K: number, n: number, m: number): number {
  if (m <= 0) return 1;
  const maxJ = Math.min(n, K);
  if (m > maxJ) return 0;
  const denom = combination(N, n);
  let sum = 0;
  for (let j = m; j <= maxJ; j++) {
    sum += combination(K, j) * combination(N - K, n - j);
  }
  return sum / denom;
}

function hypergeometricPoint(N: number, K: number, n: number, j: number): number {
  if (j < 0 || j > n || j > K) return 0;
  const denom = combination(N, n);
  return (combination(K, j) * combination(N - K, n - j)) / denom;
}

export function calculateProbability(
  playerHand: JassCard[],
  config: CalculationConfig
): number {
  const { targetCard, opponentType, comparator, condition } = config;

  const h = playerHand.filter((c) => c.suit === targetCard.suit).length;
  const S = 9 - h;
  if (S <= 0) return 0;

  const m = Math.max(0, condition - 1);
  const N = 26;
  const K = Math.max(0, S - 1);
  const n = 8;

  const pAtLeast = hypergeometricTail(N, K, n, m);
  const pAtMost = 1 - hypergeometricTail(N, K, n, m + 1);
  const pExact = hypergeometricPoint(N, K, n, m);

  let pMeet: number;
  if (comparator === 'atMost') {
    pMeet = pAtMost;
  } else if (comparator === 'exact') {
    pMeet = pExact;
  } else {
    pMeet = pAtLeast;
  }

  let probability: number;
  if (opponentType === 'opponents_one') {
    probability = (2 / 3) * pMeet * 100;
  } else if (opponentType === 'opponents_none') {
    probability = (1 - (2 / 3) * pMeet) * 100;
  } else if (opponentType === 'partner') {
    probability = (1 / 3) * pMeet * 100;
  } else {
    probability = 0;
  }

  return Math.round(probability * 10) / 10;
}

export function getAvailableCards(playerHand: JassCard[]): JassCard[] {
  return JASS_CARDS.filter(
    (card) => !playerHand.some((handCard) => handCard.id === card.id)
  );
}

export function getMaxPossibleInSuit(
  playerHand: JassCard[],
  suit: string
): number {
  return 9 - playerHand.filter((c) => c.suit === suit).length;
}
