'use strict';

import {HEADER} from "view/view-descriptor";
import {truncate21, truncate31} from "utils/utils";

/**
 * @param {Array.<Object>} data
 */
export function renderItems(data)
{
	const listElement = createList();
	listElement.appendChild(createListHeader(HEADER));
	listElement.appendChild(createListBody(data));
	return listElement;
}

/**
 * @param {string} message
 * @param {string} className
 */
export function renderMessage(message, className = '')
{
	const divElement = createDivElement(className);
	divElement.appendChild(createSpanElement(message));
	return divElement;
}

/**
 * @returns {HTMLElement}
 */
export function createList()
{
	return document.createElement('ul');
}

/**
 * @param {Object} data
 * @returns {HTMLElement}
 */
export function createListHeader(data)
{
	const listHeaderElement = document.createElement('li');
	listHeaderElement.appendChild(createListHeaderElements(data));
	return listHeaderElement;
}

/**
 * @param {Object} data
 * @returns {DocumentFragment}
 */
export function createListBody(data)
{
	let fragment = document.createDocumentFragment();
	data.forEach(item => fragment.appendChild(createMainListItemElement(item, 'item')));
	return fragment;
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createSpanElement(text, className = '')
{
	const spanElement = document.createElement('span');
	spanElement.innerHTML = text;
	if (className)
	{
		spanElement.classList.add(className);
	}

	return spanElement;
}

/**
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createDivElement(className = '')
{
	const divElement = document.createElement('div');
	if (className)
	{
		divElement.classList.add(className);
	}

	return divElement;
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
 * @param {Function} generator
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createListItemElement(generator, options, className = '')
{
	const liElement = document.createElement('li');
	liElement.innerHTML = generator(options, className);
	return liElement;
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createMainListItemElement(options, className = '')
{
	return createListItemElement(createListItemFromOptions, options, className);
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createFavListItemElement(options, className = '')
{
	return createListItemElement(createFavListItemFromOptions, options, className);
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {string}
 */
function createListItemFromOptions(options, className = '')
{
	return `<span title="${options.trackName}" class="${className}">${truncate31(options.trackName)}</span>
					 <span class="${className}">${truncate31(options.artistName)}</span>
					 <span class="${className}">${truncate31(options.collectionName)}</span>
					 <button id="${options.trackId}">+</button>`;
}

/**
 * @param {HTMLElement} element
 */
export function removeAllChildren(element)
{
	if (element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}
}

/**
 * @param {HTMLElement|Node} element
 * @param {Object} data
 */
export function append(element, child)
{
	if (element && child) {
		element.appendChild(child);
	}
}

/**
 * @param {string} text
 * @param {string} className
 * @returns {string}
 */
function createFavListItemFromOptions(options, className = '')
{
	return `<div class="favourite">
						<img src="${options.artworkUrl30}"/>
				  	<div>
					    <span class="${className}">${truncate21(options.trackName)}</span>
							<span>${truncate21(options.artistName)}</span>					
						</div>
					</div>`;
}
