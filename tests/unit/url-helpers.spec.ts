import { buildUrlParams, isValidUrl } from '@/helpers/url-helper';

describe('Testing isValid helper function', () => {
  it('should return false if is not a url', () => {
    const value = 'invalid_urll';
    expect(isValidUrl(value)).toBeFalsy();
  });
  it('should return true if is a url', () => {
    const value = 'https://google.com';
    expect(isValidUrl(value)).toBeTruthy();
  });
});


describe('Testing buildUrlParams helper function', () => {
  it('should return a url with no params if no params are given', () => {
    const url = 'https://google.com/';
    expect(buildUrlParams(url)).toBe(url);
  });

  it('should return a url with some params if params are given', () => {
    const url = 'https://google.com/';
    const params = {
      search: 'movies',
    };
    const expectedUrl = 'https://google.com/?search=movies';
    expect(buildUrlParams(url, params)).toBe(expectedUrl);
  });

  it('should return a null if is not a valid url', () => {
    const url = 'google';
    expect(buildUrlParams(url)).toBe(null);
  });

});

