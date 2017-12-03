'use strict';

import makeRequest from './api-xhr-request';
import {URLBuilder} from "./url-builder";

/**
 * @param {string} query
 * @return {Promise}
 */
export default function search (query) {
  const url = URLBuilder.buildURL(query);

  return makeRequest({ url: url })
    .then(data => data = JSON.parse(data))
}