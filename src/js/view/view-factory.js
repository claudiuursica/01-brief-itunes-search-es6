'use strict';

import { HEADER } from "view/view-descriptor";

/**
 * @param {Array.<Object>} data
 */
export function renderData(data)
{
	const listElement = createList();
	listElement.appendChild(createListHeader(HEADER));
	listElement.appendChild(createListBody(data));
	return listElement;
}

/**
 * @returns {HTMLElement}
 */
export function createList() {
	return document.createElement('ul');
}

/**
 * @param {Object} data
 * @returns {HTMLElement}
 */
export function createListHeader(data) {
	const listHeaderElement = document.createElement('li');
	listHeaderElement.appendChild(createListHeaderElements(data));
	return listHeaderElement;
}

/**
 * @param {Object} data
 * @returns {DocumentFragment}
 */
export function createListBody(data) {
	let fragment = document.createDocumentFragment();
	data.forEach((item) => fragment.appendChild(createListItemElement(item, 'item')));
	return fragment;
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
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
 * @param {Array.<Object>} config
 * @returns {DocumentFragment}
 */
export function createListHeaderElements(config)
{
	let fragment = document.createDocumentFragment();
	config.forEach((item) => fragment.appendChild(createSpanElement(item.label, item.className)));
	return fragment;
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
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
