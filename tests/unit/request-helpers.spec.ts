import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import { GlobalWithFetchMock } from "jest-fetch-mock";

import requestsHelper from '@/helpers/requests-helper';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

describe('Testing createNewDeck helper function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })
  it ('Shouls create a new deck', async () => {

    const obj = {
      "success": true,
      "deck_id": "8z90da3wfqcg",
      "remaining": 12,
      "shuffled": true
    };

    fetchMock.mockResponseOnce(JSON.stringify(obj));

    const onResponse = jest.fn();
    const onError = jest.fn();

    requestsHelper.createNewDeck('AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expect(onResponse.mock.calls[0][0]).toEqual(obj);
      });
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS%2C2S%2CKS%2CAD%2C2D%2CKD%2CAC%2C2C%2CKC%2CAH%2C2H%2CKH');
  });
});

