import {BASE_API} from 'service/api';
import {PAGE_SIZE} from 'service/api';

/**
 * @param {string} searchString
 * @returns {string}
 */
export function buildURL(searchString) {
	return searchString && searchString.length ?
	  `${BASE_API}term=${searchString.split(' ').join('+')}&limit=${PAGE_SIZE}` : BASE_API;
}
