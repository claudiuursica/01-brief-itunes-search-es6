import { BASE_API } from 'service/api';
import { MAX_PAGE_SIZE } from 'service/api';

/**
 * @param {string} searchString
 * @returns {string}
 */
export function buildURL(searchString) {
	return searchString && searchString.length ?
	  `${BASE_API}term=${searchString.split(' ').join('+')}&limit=${MAX_PAGE_SIZE}&media=music` : BASE_API;
}
