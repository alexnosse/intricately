import data from '@/config/config';
import CardModel from '@/models/Card';

/**
 * Checks if the card has a valid suit code and a valid value
 * @param card
 */
const isValidCard = (card: string): boolean => {
  const { cardsConfig } = data;
  const suits = cardsConfig.SUITS.split('');
  const values = cardsConfig.VALUES.split('');

  const isValidSuit = suits.indexOf(card.substr(card.length - 1)) > -1;
  const isValidValue = values.indexOf(card.substr(0, 1)) > -1;
  return isValidValue && isValidSuit;
};

/**
 * Parses the card value to be sent to the API
 * as we have an exception just for the 10 value
 * @param card: string
 */
const parseCardValue = (card: string): string => {
  let cardValue = card;
  if (cardValue.substring(0, 2) === '10') {
    cardValue = `0${cardValue.substring(cardValue.length - 1)}`;
  }
  return cardValue;
};

/**
 * Given a card, extracts the value from it
 * @param card: CardModel
 */
const getCardValue = (card: CardModel): string => {
  if (card && card.code) {
    return card.code.substring(0, 1);
  }
  return '';
};

/**
 * Given an card, extracts the value from it
 * @param card: CardModel
 */
const getCardSuit = (card: CardModel): string => {
  if (card && card.suit) {
    return card.suit.substring(0, 1);
  }
  return '';
};

/**
 * Based on the SUITS constant and the suit of rotation card, returns the new order for values
 * @param rotationSuit: string
 */
const organizeSuitsOrder = (rotationSuit: string): Array<string> => {
  if (rotationSuit) {
    const { cardsConfig } = data;
    const [secondSuitsGroup, firstSuitsGroup] = cardsConfig.SUITS.split(rotationSuit);
    return [rotationSuit, ...firstSuitsGroup.split(''), ...secondSuitsGroup.split('')];
  }
  return [];
};

/**
 * Based on the VALUES constant and the value of rotation card, returns the new order for values
 * @param rotationValue: Array<CardModel>
 */
const organizeValuesOrder = (rotationValue: string): Array<string> => {
  if (rotationValue) {
    const { cardsConfig } = data;
    const [secondValuesGroup, firstValuesGroup] = cardsConfig.VALUES.split(rotationValue);
    return [rotationValue, ...firstValuesGroup.split(''), ...secondValuesGroup.split('')];
  }
  return [];
};

/**
 * Order the cards, using the rotation card as sort order
 * @param rotation: CardModel
 * @param cards: Array<CardModel>
 */
const orderCards = (rotation: CardModel, cards: Array<CardModel>): Array<CardModel> => {
  let orderedCards: Array<Array<CardModel>> = [];
  if (rotation && cards.length) {
    const [rotationValue, rotationSuit] = rotation.code.split('');
    const orderedSuits = organizeSuitsOrder(rotationSuit);
    const orderedValues = organizeValuesOrder(rotationValue);
    const suitGroups: CardModel[][] = [];
    orderedSuits.forEach((suit: string) => suitGroups.push(
      cards.filter((card) => getCardSuit(card) === suit),
    ));

    orderedCards = suitGroups.map((suitGroup: Array<CardModel>) => {
      const innerCards: Array<CardModel> = [];
      orderedValues.forEach((value: string) => {
        // TODO: improve this
        const cardArray = suitGroup
          .filter((card: CardModel) => getCardValue(card) === value);
        if (cardArray.length > 0) {
          innerCards.push(cardArray[0]);
        }
      });

      return innerCards;
    });
  }
  return orderedCards.flat();
};

/**
 * Given an group of cards, extract all pair combinations on that group
 * @param arrayCards: Array<CardModel>
 * @return an array of groups of possible combinations
 */
const getTwoOfAKind = (arrayCards: Array<CardModel>): Array<Array<string>> => {
  const result: Array<Array<string>> = [];
  for (let i = 0; i < arrayCards.length - 1; i += 1) {
    for (let j = i + 1; j < arrayCards.length; j += 1) {
      if (getCardValue(arrayCards[i]) === getCardValue(arrayCards[j])) {
        result.push([arrayCards[i].code, arrayCards[j].code]);
      }
    }
  }
  return result;
};

/**
 * Given an group of cards, extract all three of a kind combinations on that group
 * @param arrayCards
 * @return an array of groups of possible combinations
 */
const getThreeOfAKind = (arrayCards: Array<CardModel>): Array<Array<string>> => {
  let slicedArray = [...arrayCards].splice(1, arrayCards.length);
  const result: Array<Array<string>> = [];
  for (let i = 0; i < arrayCards.length - 2; i += 1) {
    const temp = getTwoOfAKind(slicedArray);
    temp.map((group) => result.push([arrayCards[i].code, ...group.flat()]));
    slicedArray = slicedArray.splice(1, slicedArray.length);
  }
  return result;
};

/**
 * Get all cards order them by value, then extracts cards grouped by their value
 * @param orderedCards: Array<CardModel>
 */
const findFullHouseGroups = (orderedCards: Array<CardModel>): Array<Array<CardModel>> => {
  let currentCard: CardModel;
  let oldCard: CardModel;

  return orderedCards
    .sort((a, b) => (getCardValue(a) > getCardValue(b) ? 1 : -1))
    .map((card: CardModel) => {
      currentCard = card;
      if (getCardValue(currentCard) !== getCardValue(oldCard)) {
        oldCard = currentCard;
        return [...orderedCards
          .filter((filterCard) => getCardValue(filterCard) === getCardValue(currentCard))];
      }
      return [];
    })
    .filter((groups) => groups && groups.length >= 2);
};

/**
 * Given an array of CardModel, then it will return an array of combination of
 * cards that are fullhouse;
 *
 * @param orderedCards
 */
const returnFullHouseCombinations = (orderedCards: Array<CardModel>): Array<string> => {
  const fullHouseCombinations: Array<string> = [];
  const groups = findFullHouseGroups(orderedCards);
  let three = [];
  let two = [];
  for (let i = 0; i < groups.length; i += 1) {
    three.push(getThreeOfAKind(groups[i]));
    two.push(getTwoOfAKind(groups[i]));
  }

  three = three.flat();
  two = two.flat();

  for (let i = 0; i < three.length; i += 1) {
    for (let j = 0; j < two.length; j += 1) {
      if (three[i][0].substring(0, 1) !== two[j][0].substring(0, 1)) {
        fullHouseCombinations.push([...three[i], ...two[j]].flat().join(', '));
      }
    }
  }
  return fullHouseCombinations;
};


const flattenCardArray = (cards: Array<CardModel>): Array<string> => {
  if (cards && cards.length > 0) {
    return cards.map((card) => card.code);
  }
  return [];
};

export {
  isValidCard,
  parseCardValue,
  orderCards,
  returnFullHouseCombinations,
  getCardValue,
  getCardSuit,
  organizeSuitsOrder,
  organizeValuesOrder,
  flattenCardArray,
  getTwoOfAKind,
  getThreeOfAKind,
  findFullHouseGroups,
};
