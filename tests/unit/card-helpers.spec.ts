import { isValidCard, parseCardValue } from '@/helpers/card-helper';

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

