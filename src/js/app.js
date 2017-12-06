'use strict';

import { searchJSONP } from './service/itunes-service';

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
 * @param {string} query
 */
const doSearch = (query) => {
  searchJSONP(query).then((data) => {
    console.log("data = ", data);

    if (data && data.results) {
      const results = data.results;

      //check for length and show no results message
      if (results) {
        //list
      	const ulElement = document.createElement('ul');
        
        //header
	      const liHeaderElement = document.createElement('li');
	
	      const indexHeaderElement = document.createElement('span');
	      liHeaderElement.appendChild(indexHeaderElement);
	
	      const songHeaderElement = document.createElement('span');
	      songHeaderElement.innerHTML = 'SONG';
	      songHeaderElement.classList.add('item');
	      liHeaderElement.appendChild(songHeaderElement);
	
	      const artistHeaderElement = document.createElement('span');
	      artistHeaderElement.innerHTML = 'ARTIST';
	      artistHeaderElement.classList.add('item');
	      liHeaderElement.appendChild(artistHeaderElement);
	
	      const albumHeaderElement = document.createElement('span');
	      albumHeaderElement.innerHTML = 'ALBUM';
	      albumHeaderElement.classList.add('item');
	      liHeaderElement.appendChild(albumHeaderElement);
	
	      ulElement.appendChild(liHeaderElement);

        results.forEach((item, index) => {
          const liElement = document.createElement('li');
	
	        const indexElement = document.createElement('span');
	        indexElement.innerHTML = index + 1;
	        liElement.appendChild(indexElement);
	
	        const songElement = document.createElement('span');
	        songElement.innerHTML = item.trackName;
	        songElement.classList.add('item');
	        liElement.appendChild(songElement);
	
	        const artistElement = document.createElement('span');
	        artistElement.innerHTML = item.artistName;
	        artistElement.classList.add('item');
	        liElement.appendChild(artistElement);
	
	        const albumElement = document.createElement('span');
	        albumElement.innerHTML = item.collectionName;
	        artistElement.classList.add('item');
	        liElement.appendChild(albumElement);
	
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
