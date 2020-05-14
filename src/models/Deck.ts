import CardModel from './Card';

export default class DeckModel {
  id: number;
  cards: Array<CardModel>;

  constructor() {
    this.id = 0;
    this.cards = [];
  }
}
