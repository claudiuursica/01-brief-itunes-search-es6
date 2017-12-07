'use strict';

import { makeRequest } from 'request/api-xhr-request';
import { makeJSONPRequest } from 'request/api-jsonp-request';
import { buildURL } from 'service/build-url';

/**
 * @param {string} query
 * @return {Promise}
 */
export function search(query) {
  return makeRequest({ url: buildURL(query) })
    .then(data => data = JSON.parse(data));
}

/**
 * @param {string} query
 * @return {Promise}
 */
export function searchJSONP(query) {
  return makeJSONPRequest(buildURL(query))
    .then(response => response.json());
}
