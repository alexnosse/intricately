import CardModel from './Card';

export default class DeckModel {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  cards: Array<CardModel>;

  constructor() {
    this.success = false;
    this.deck_id = '';
    this.remaining = 0;
    this.shuffled = false;
    this.cards = [];
  }
}
