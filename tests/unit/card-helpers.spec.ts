import {
  isValidCard,
  parseCardValue,
  getCardValue,
  getCardSuit,
  organizeSuitsOrder,
  organizeValuesOrder,
  flattenCardArray,
  orderCards,
  getTwoOfAKind,
  getThreeOfAKind,
  findFullHouseGroups,
  returnFullHouseCombinations,
} from '@/helpers/card-helper';
import CardModel from '@/models/Card';

describe('Testing isValidCard helper function', () => {
  it('should return true if is a valid value', () => {
    const value = 'JS';
    expect(isValidCard(value)).toBeTruthy();
  });

  it('should return false if is a invalid value', () => {
    const value = 'hello';
    expect(isValidCard(value)).toBeFalsy();
  });
});

describe('Testing parseCardValue helper function', () => {
  it('should return 0 to the value if is sent 10 as value, preserving the suit', () => {
    const value = '10S';
    expect(parseCardValue(value)).toMatch('0S');
  });

  it('should return the same value if is not 10', () => {
    const value = 'JS';
    expect(parseCardValue(value)).toMatch('JS');
  });
});

describe('Testing getCardValue helper function', () => {
  it('should return just the card value', () => {
    const card = {
      code: 'AS',
    } as CardModel;
    expect(getCardValue(card)).toMatch('A');
  });

  it('should return an empty string if is not an object', () => {
    const card = { } as CardModel;
    expect(getCardValue(card)).toMatch('');
  });
});

describe('Testing getCardSuit helper function', () => {
  it('should return just the card suit', () => {
    const card = {
      suit: 'SPADES',
    } as CardModel;
    expect(getCardSuit(card)).toMatch('S');
  });

  it('should return an empty string if is not an object', () => {
    const card = { } as CardModel;
    expect(getCardSuit(card)).toMatch('');
  });
});

describe('Testing organizeSuitsOrder helper function', () => {
  it('should return HDCS if the rotation suit is H', () => {
    expect(organizeSuitsOrder('H').join('')).toMatch('HDCS');
  });
  it('should return CSHD if the rotation suit is C', () => {
    expect(organizeSuitsOrder('C').join('')).toMatch('CSHD');
  });
  it('should return an empty array if the rotation suit is invalid', () => {
    expect(organizeSuitsOrder('').join('')).toMatch('');
  });
});

describe('Testing organizeValuesOrder helper function', () => {
  it('should return 2AKQJ09876543 if the rotation value is 2', () => {
    expect(organizeValuesOrder('2').join('')).toMatch('2AKQJ09876543');
  });
  it('should return 65432AKQJ0987 if the rotation value is 6', () => {
    expect(organizeValuesOrder('6').join('')).toMatch('65432AKQJ0987');
  });
  it('should return an empty array if the rotation value is invalid', () => {
    expect(organizeValuesOrder('').join('')).toMatch('');
  });
});

describe('Testing flattenCardArray helper function', () => {
  it('should return just the array values from an array of cards', () => {
    const cards = [
      { code: 'AS' },
      { code: 'JC' },
      { code: '0H' },
      { code: '3D' },
    ] as CardModel[];
    expect(flattenCardArray(cards).join('')).toMatch('ASJC0H3D');
  });
  it('should return just the array values from an array of cards', () => {
    const cards = [] as CardModel[];
    expect(flattenCardArray(cards).join('')).toMatch('');
  });
});

describe('Testing orderCards helper function', () => {
  it('should return an array of CardModel', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'JC', suit: 'CUBS' },
      { code: '0H', suit: 'HEARTS' },
      { code: '3D', suit: 'DIAMONDS' },
      { code: '7C', suit: 'CUBS' },
      { code: '8H', suit: 'HEARTS' },
      { code: '9D', suit: 'DIAMONDS' },
    ] as CardModel[];
    const rotation = { code: '6C', suit: 'CUBS' } as CardModel;
    // C S H D
    // 65432AKQJ0987
    // JC, 7C, AS, 0H, 8H, 3D, 9D
    expect(flattenCardArray(orderCards(rotation, cards))
      .join(', '))
      .toMatch('JC, 7C, AS, 0H, 8H, 3D, 9D');
  });
});

describe('Testing getTwoOfAKind helper function', () => {
  it('should return an array of CardModel, if there\'s duplicated values', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'AC', suit: 'CUBS' },
      { code: 'AH', suit: 'HEARTS' },
      { code: 'AD', suit: 'DIAMONDS' },
    ] as CardModel[];
    const twoOfAKind = getTwoOfAKind(cards);
    expect(twoOfAKind.length).toBe(6);
    expect(twoOfAKind.join(','))
      .toMatch('AS,AC,AS,AH,AS,AD,AC,AH,AC,AD,AH,AD');
  });

  it('should return an empty array of CardModel, if there aren\'t duplicated values', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'JC', suit: 'CUBS' },
      { code: '4H', suit: 'HEARTS' },
      { code: '5D', suit: 'DIAMONDS' },
    ] as CardModel[];
    const twoOfAKind = getTwoOfAKind(cards);
    expect(twoOfAKind.length).toBe(0);
    expect(twoOfAKind.join(',')).toMatch('');
  });
});

describe('Testing getThreeOfAKind helper function', () => {
  it('should return an array of CardModel, if there\'s three of the same value', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'AC', suit: 'CUBS' },
      { code: 'AH', suit: 'HEARTS' },
      { code: 'AD', suit: 'DIAMONDS' },
    ] as CardModel[];
    const threeOfAKind = getThreeOfAKind(cards);
    expect(threeOfAKind.length).toBe(4);
    expect(threeOfAKind.join(','))
      .toMatch('AS,AC,AH,AS,AC,AD,AS,AH,AD,AC,AH,AD');
  });

  it('should return an empty array of CardModel, if there aren\'t three cards of the same value', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'JC', suit: 'CUBS' },
      { code: '4H', suit: 'HEARTS' },
      { code: '5D', suit: 'DIAMONDS' },
    ] as CardModel[];

    const threeOfAKind = getThreeOfAKind(cards);
    expect(threeOfAKind.length).toBe(0);
    expect(threeOfAKind.join(',')).toMatch('');
  });
});

describe('Testing findFullHouseGroups helper function', () => {
  it('should return an array of CardModel, if there\'s full house combinations', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'AC', suit: 'CUBS' },
      { code: 'AH', suit: 'HEARTS' },
      { code: 'AD', suit: 'DIAMONDS' },
      { code: '2D', suit: 'DIAMONDS' },
      { code: '2H', suit: 'HEARTS' },
    ] as CardModel[];
    let fullHouseGroups = findFullHouseGroups(cards);
    expect(fullHouseGroups.length).toBe(2);
    expect(flattenCardArray(fullHouseGroups.flat()).join(','))
      .toMatch('2H,2D,AD,AH,AC,AS');
  });

  it('should return an empty array of CardModel, if there aren\'t full house combinations', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'JC', suit: 'CUBS' },
      { code: '4H', suit: 'HEARTS' },
      { code: '5D', suit: 'DIAMONDS' },
    ] as CardModel[];

    const fullHouseGroups = findFullHouseGroups(cards);
    expect(fullHouseGroups.length).toBe(0);
    expect(fullHouseGroups.join(',')).toMatch('');
  });
});


describe('Testing returnFullHouseCombinations helper function', () => {
  it('should return an array of full house combinations, if there are full house combinations', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'AC', suit: 'CUBS' },
      { code: 'AH', suit: 'HEARTS' },
      { code: 'AD', suit: 'DIAMONDS' },
      { code: '2D', suit: 'DIAMONDS' },
      { code: '2H', suit: 'HEARTS' },
    ] as CardModel[];
    let fullHouseGroups = returnFullHouseCombinations(cards);
    expect(fullHouseGroups.length).toBe(4);
    expect(fullHouseGroups.join(' - '))
      .toMatch('AD, AH, AC, 2H, 2D - AD, AH, AS, 2H, 2D - AD, AC, AS, 2H, 2D - AH, AC, AS, 2H, 2D');
  });

  it('should return an empty array of CardModel, if there aren\'t full house combinations', () => {
    const cards = [
      { code: 'AS', suit: 'SPADES' },
      { code: 'JC', suit: 'CUBS' },
      { code: '4H', suit: 'HEARTS' },
      { code: '5D', suit: 'DIAMONDS' },
      { code: '6D', suit: 'DIAMONDS' },
      { code: '7C', suit: 'CUBS' },
      { code: '8H', suit: 'HEARTS' },
    ] as CardModel[];

    const fullHouseGroups = returnFullHouseCombinations(cards);
    expect(fullHouseGroups.length).toBe(0);
    expect(fullHouseGroups.join(',')).toMatch('');
  });
});
