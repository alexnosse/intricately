import DeckModel from '@/models/Deck';

import { buildUrlParams } from '@/helpers/url-helper';

const url = 'https://deckofcardsapi.com/api/deck/';

async function createNewDeck(cards: string): Promise<DeckModel> {
  const newDeckUrl = buildUrlParams(`${url}new/shuffle/`, { cards });
  if (newDeckUrl) {
    const response: Response = await fetch(newDeckUrl);
    const data: DeckModel = await response.json();
    return data;
  }

  return new Promise((resolve, reject) => reject);
}

export default { createNewDeck };
