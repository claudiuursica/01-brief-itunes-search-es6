import search from "./itunes-service";
import * as request from "./api-xhr-request";
import {URLBuilder} from "./url-builder";

const url = 'testUrl';
const query = 'searchQuery';

let makeRequest;

describe('Function: search', () => {

  beforeEach(() => {
    makeRequest = spyOn(request, 'default').and.returnValue(Promise.resolve({}));

    spyOn(URLBuilder, 'buildURL').and.returnValue(url);
  });

  it('should call some functions', () => {

    search(query);

    expect(URLBuilder.buildURL).toHaveBeenCalledWith(query);
    expect(makeRequest).toHaveBeenCalledWith({
      url: url
    });
  });

  afterEach(() => makeRequest = null);
});
