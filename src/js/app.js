'use strict';

import {debounce, doWhen} from "utils/utils";
import {searchJSONP} from 'service/itunes-service';
import {ITunesPagedCollection} from "domain/itunes-paged-collection";

import {
	renderItems,
	removeAllChildren,
	append,
	createListBody,
	createFavListItemElement,
	renderMessage
} from "view/view-factory";


const ELEMENT_DISPLAYED = '';
const ELEMENT_NOT_DISPLAYED = 'none';

const searchInputElement = document.getElementById('searchInput');
const searchResultElement = document.getElementById('searchResults');
const searchButtonElement = document.getElementById('searchButton');

const favouritesContainerElement = document.getElementById('favourites');
const favouritesNoItemsElement = favouritesContainerElement.querySelector('h2');
const favouritesListElement = favouritesContainerElement.querySelector('ul');

const itemsCollection = new ITunesPagedCollection();
const favouritesCollection = [];

searchButtonElement.addEventListener('click', () =>
{
	doWhen(hasSearchValue(searchInputElement), () => doSearch(searchInputElement.value));
});

window.addEventListener("scroll", (event) =>
{
	debounce(doWhen(shouldFetchNextResults(event.currentTarget), () =>
	{
		itemsCollection.nextPage();

		const ul = createListBody(itemsCollection.pageItemsList);
		addFavouritesEventListeners(ul);
		append(searchResultElement.firstChild, ul);
	}));
});

/**
 * @param {HTMLElement|Node} element
 */
const addFavouritesEventListeners = (element) =>
{
	const items = element.querySelectorAll('button');
	Array.from(items).forEach(item => item.addEventListener('click', favouritesClickHandler));
};

/**
 * @param {HTMLElement|Node} element
 */
const removeFavouritesEventListeners = (element) =>
{
	const items = element.querySelectorAll('button');
	Array.from(items).forEach(item => item.removeEventListener('click', favouritesClickHandler));
};

/**
 * @param {Event} event
 */
const favouritesClickHandler = event =>
{
	const track = item => item.trackId.toString() === event.currentTarget.id;
	const item = itemsCollection.find(track);
	const favoriteItem = favouritesCollection.find(track);
	if (!favoriteItem)
	{
		favouritesCollection.push(item);
		favouritesListElement.appendChild(createFavListItemElement(item, 'song'));
		showHideFavouritesNoItemsElement();
	}
};

/**
 * @param searchInputElement
 * @returns {boolean}
 */
const hasSearchValue = searchInputElement => searchInputElement.value.trim().length > 0;

const showHideFavouritesNoItemsElement = () =>
{
	favouritesNoItemsElement.style.display = favouritesCollection.length > 0 ?
		ELEMENT_NOT_DISPLAYED : ELEMENT_DISPLAYED;
};

/**
 * @returns {number}
 */
const calculateNumItemsPerPage = () =>
{
	const searchInputHeight = searchInputElement.parentNode.clientHeight;
	const pageHeight = window.innerHeight;
	const estimatedItemSpace = 15;
	return Math.ceil((pageHeight - searchInputHeight) / estimatedItemSpace);
};

/**
 * @param {Window} window
 * @returns {boolean}
 */
const shouldFetchNextResults = window => window.scrollY >= window.document.body.clientHeight - window.innerHeight;

/**
 * @param {string} query
 */
const doSearch = query => searchJSONP(query).then(processResponse).catch(processError);

/**
 * @param {Object} response
 */
const processResponse = response =>
{
	if (response && response.results)
	{
		itemsCollection.setItems(response.results, calculateNumItemsPerPage());

		removeFavouritesEventListeners(searchResultElement);
		removeAllChildren(searchResultElement);

		const ul = renderItems(itemsCollection.pageItemsList);
		addFavouritesEventListeners(ul);
		append(searchResultElement, ul);
	}
};

/**
 * @param {string} error
 */
const processError = error => {
	append(searchResultElement, renderMessage(error, 'error'));
};
