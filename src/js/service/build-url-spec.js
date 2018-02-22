import { BASE_API } from 'service/api';
import { buildURL } from 'service/build-url';

describe('Function: buildURL', () => {

  it('should return base urls when arguments are invalid', () => {
    expect(buildURL()).toBe(BASE_API);
  });

  it('should return the search urls when arguments are valid', () => {

    const searchOptions = 'jack johnson';
    const expectedResult = 'https://itunes.apple.com/search?term=jack+johnson&limit=200&media=music';

    expect(buildURL(searchOptions)).toBe(expectedResult);
  });
});
