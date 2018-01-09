'use strict';

/**
 * @param {string} text
 * @param {string} className
 * @returns {Element}
 */
export function createSpanElement (text, className = '') {
	const spanElement = document.createElement('span');
	spanElement.innerHTML = text;
	if (className) {
		spanElement.classList.add(className);
	}
	
	return spanElement;
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {Element}
 */
export function createListItemElement (options, className = '') {
	const liElement = document.createElement('li');
	
	const content = `<span>${options.index}</span>
										<span class="${className}">${options.trackName}</span>
										<span class="${className}">${options.artistName}</span>
										<span class="${className}">${options.collectionName}</span>`;
	
	liElement.innerHTML = content;
	return liElement;
}
