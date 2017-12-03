'use strict';

import search from './service/itunes-service';

const searchInputElement = document.getElementById('searchInput');
const searchResultElement = document.getElementById('searchResults');

const searchButtonElement = document.getElementById('searchButton');
searchButtonElement.addEventListener('click', () => {
  const searchText = searchInputElement.value;
  if (searchText) {
    doSearch(searchText);
  }
});


/**
 *
 * @param query
 */
const doSearch = (query) => {

  search(query).then((data) => {
    console.log("data = ", data);

    if (data && data.results) {
      const results = data.results;

      //check for length and show no results message
      if (results) {
        const ulElement = document.createElement('ul');

        results.forEach((item) => {
          const liElement = document.createElement('li');
          liElement.textContent = `Artist: ${item.artistName}, trackName: ${item.trackName}, album: ${item.collectionName}`;
          ulElement.appendChild(liElement);
        });

        searchResultElement.appendChild(ulElement);
      }
    }
  }).catch(error => {
    //todo show no results message
    console.log("error ", error);
  });
};
