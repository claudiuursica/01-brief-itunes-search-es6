import { search, searchJSONP } from 'service/itunes-service';

import * as xhrRequest from 'request/api-xhr-request';
import * as jsonpRequest from 'request/api-jsonp-request';
import * as buildURL from 'service/build-url';

const url = 'testUrl';
const query = 'searchQuery';

let makeRequest, buildUrl;

beforeEach(() => {
	buildUrl = spyOn(buildURL, 'buildURL').and.returnValue(url);
});

describe('Function: search', () => {

  beforeEach(() => {
    makeRequest = spyOn(xhrRequest, 'makeRequest').and.returnValue(Promise.resolve({}));
  });

  it('should call some functions', () => {

    search(query);

    expect(buildUrl).toHaveBeenCalledWith(query);
    expect(makeRequest).toHaveBeenCalledWith({
      url: url
    });
  });
});

describe('Function: searchJSONP', () => {
	
	beforeEach(() => {
		makeRequest = spyOn(jsonpRequest, 'makeJSONPRequest').and.returnValue(Promise.resolve({}));
	});
	
	it('should call some functions', () => {
		
		searchJSONP(query);
		
		expect(buildUrl).toHaveBeenCalledWith(query);
		expect(makeRequest).toHaveBeenCalledWith(url);
	});
});

afterEach(() => {
	makeRequest = null;
	buildUrl = null;
});
