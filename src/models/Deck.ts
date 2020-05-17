import CardModel from './Card';

export default interface DeckModel {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  cards: Array<CardModel>;
  piles: Piles;
}

interface Piles {
  ordered: Pile;
  rotation: Pile;
}

interface Pile {
  cards: Array<CardModel>;
}
