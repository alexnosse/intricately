import data from '@/config/config';

// eslint-disable-next-line max-len
const isValidCard = (card: string): boolean => {
  const suits = data.SUITS.split('');
  const values = data.VALUES.split('');

  const isValidSuit = suits.indexOf(card.substr(card.length - 1)) > -1;
  const isValidValue = values.indexOf(card.substr(0, 1)) > -1;
  return isValidValue && isValidSuit;
};

const parseCardValue = (card: string): string => {
  let cardValue = card;
  if (cardValue.substring(0, 2) === '10') {
    cardValue = `0${cardValue.substring(cardValue.length - 1)}`;
  }
  return cardValue;
};

export { isValidCard, parseCardValue };
