'use strict';

import {searchJSONP} from 'service/itunes-service';

import {createSpanElement, createListItemElement} from "app/view/view-factory";
import {ITunesPagedCollection} from "domain/ITunesPagedCollection";

const searchInputElement = document.getElementById('searchInput');
const searchResultElement = document.getElementById('searchResults');

const searchButtonElement = document.getElementById('searchButton');
searchButtonElement.addEventListener('click', () =>
{
	const searchText = searchInputElement.value;
	if (searchText)
	{
		doSearch(searchText);
	}
});

const itemsCollection = new ITunesPagedCollection();

/**
 *
 * @param {string} query
 */
const doSearch = (query) =>
{
	searchJSONP(query).then((data) =>
	{
		console.log("data = ", data);
		
		function createListHeader(parentElement)
		{
			const headerConfig = [
				{
					label    : '',
					className: ''
				},
				{
					label    : 'SONG',
					className: 'item'
				},
				{
					label    : 'ARTIST',
					className: 'item'
				},
				{
					label    : 'ALBUM',
					className: 'item'
				}
			];
			
			headerConfig.forEach((headerItemConfig) => {
				const headerElement = createSpanElement(headerItemConfig.label, headerItemConfig.className);
				parentElement.appendChild(headerElement);
			});
			
			// const indexHeaderElement = createSpanElement('', '');
			// parentElement.appendChild(indexHeaderElement);
			//
			// const songHeaderElement = createSpanElement('SONG', 'item');
			// parentElement.appendChild(songHeaderElement);
			//
			// const artistHeaderElement = createSpanElement('ARTIST', 'item');
			// parentElement.appendChild(artistHeaderElement);
			//
			// const albumHeaderElement = createSpanElement('ALBUM', 'item');
			// parentElement.appendChild(albumHeaderElement);
		}

		//todo clean table
		if (data && data.results)
		{
			
			const results = data.results;
			
			//check for length and show no results message
			if (results)
			{
				//list
				const ulElement = document.createElement('ul');
				
				//header
				const liHeaderElement = document.createElement('li');
				createListHeader(liHeaderElement);
				ulElement.appendChild(liHeaderElement);
				
				itemsCollection.setItems(results);
				console.log("itemsCollection = ", itemsCollection.pageItemsList);
				
				
				results.forEach((item, index) =>
				{
					const liElement = createListItemElement(item, 'item');
					ulElement.appendChild(liElement);
				});
				
				searchResultElement.appendChild(ulElement);
			}
		}
	}).catch(error =>
	{
		//todo show no results message
		console.log("error ", error);
	});
};
