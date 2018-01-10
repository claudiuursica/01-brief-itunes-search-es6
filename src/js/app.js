'use strict';

import {searchJSONP} from 'service/itunes-service';

import {renderData} from "view/view-factory";
import {ITunesPagedCollection} from "domain/itunes-paged-collection";

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
		
		//todo clean table
		if (data && data.results)
		{
			
			const results = data.results.map((item, index) =>
			{
				return {
					index         : index + 1,
					trackName     : item.trackName,
					artistName    : item.artistName,
					collectionName: item.collectionName
				}
			});
			
			//todo check for length and show no results message
			if (results)
			{
				itemsCollection.setItems(results);
				console.log("itemsCollection = ", itemsCollection.pageItemsList);
				
				searchResultElement.appendChild(renderData(results));
			}
		}
	}).catch(error =>
	{
		//todo show no results message
		console.log("error ", error);
	});
};
