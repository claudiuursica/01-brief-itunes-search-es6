'use strict';

import makeRequest from './api-xhr-request';
import {URLBuilder} from "./url-builder";
import fetchJSONP from './api-jsonp-request';

/**
 * @param {string} query
 * @return {Promise}
 */
export function search(query) {
	const url = URLBuilder.buildURL(query);
	
	return makeRequest({url: url})
		.then(data => data = JSON.parse(data));
}

/**
 * @param {string} query
 * @return {Promise}
 */
export function searchJSONP(query) {
	const url = URLBuilder.buildURL(query);
	
	return fetchJSONP(url).then(response => response.json());
}
