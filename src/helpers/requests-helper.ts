import DeckModel from '@/models/Deck';

import { buildUrlParams } from '@/helpers/url-helper';
import data from '@/config/config';

const url = 'https://deckofcardsapi.com/api/deck/';

async function customFetch(customUrl: string | null): Promise<DeckModel> {
  if (customUrl) {
    const response: Response = await fetch(customUrl);
    const responseData: DeckModel = await response.json();
    return responseData;
  }
  return new Promise((resolve, reject) => reject);
}

async function drawAllCardsFromDeck(idDeck: string, remaining?: number): Promise<DeckModel> {
  const drawCardFromDeckUrl = buildUrlParams(`${url}${idDeck}/draw/`, { count: remaining || 52 });
  return customFetch(drawCardFromDeckUrl);
}

async function createPile(idDeck: string, pileType: string, cards: string): Promise<DeckModel> {
  const rotationPileUrl = buildUrlParams(`${url}${idDeck}/pile/${pileType}/add/`, { cards });
  return customFetch(rotationPileUrl);
}

async function getCardsOnPile(idDeck: string, pileType: string): Promise<DeckModel> {
  const rotationPileUrl = buildUrlParams(`${url}${idDeck}/pile/${pileType}/list/`);
  return customFetch(rotationPileUrl);
}

async function createNewDeck(validCards: Array<string>, rotation: string): Promise<DeckModel> {
  const allCards = [...validCards, rotation].join(',');
  const newDeckUrl = buildUrlParams(`${url}new/shuffle/`, { cards: allCards });
  const response = await customFetch(newDeckUrl);
  const deckId = response.deck_id;
  const drawnCardsResponse = await drawAllCardsFromDeck(deckId, response.remaining);
  if (drawnCardsResponse.success) {
    const { PileType } = data;

    const orderedPromise = await createPile(deckId, PileType.ORDERED, allCards);
    const rotationPromise = await createPile(deckId, PileType.ROTATION, rotation);

    if (rotationPromise.success && orderedPromise.success) {
      return response;
    }
  }

  return {} as DeckModel;
}


export default {
  createNewDeck,
  createPile,
  drawAllCardsFromDeck,
  getCardsOnPile,
};
