import { BASE_API } from "./api";
import { URLBuilder } from "./url-builder";

describe('Function: buildURL', () => {

  it('should return base urls when arguments are invalid', () => {

    spyOn(URLBuilder, 'validateOptions').and.callThrough();

    expect(URLBuilder.buildURL()).toBe(BASE_API);

    expect(URLBuilder.validateOptions).not.toHaveBeenCalled();
  });

  it('should return the search urls when arguments are valid', () => {

    const searchOptions = 'jack johnson';
    const expectedResult = 'https://itunes.apple.com/search?term=jack+johnson&limit=10';

    spyOn(URLBuilder, 'validateOptions').and.callThrough();

    expect(URLBuilder.buildURL(searchOptions)).toBe(expectedResult);
    expect(URLBuilder.validateOptions).toHaveBeenCalledWith(searchOptions);
  });

});
