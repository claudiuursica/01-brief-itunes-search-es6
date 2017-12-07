'use strict';

import { searchJSONP } from 'service/itunes-service';

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
	
	      const createSpanElement = (text, className = '') => {
		      const spanElement = document.createElement('span');
		      spanElement.innerHTML = text;
		      if (className) {
			      spanElement.classList.add(className);
		      }
		      
		      return spanElement;
	      };
	      
				
	      const songHeaderElement = createSpanElement('SONG', 'item');
	      liHeaderElement.appendChild(songHeaderElement);
	
	      const artistHeaderElement = createSpanElement('ARTIST', 'item');
	      liHeaderElement.appendChild(artistHeaderElement);
	
	      const albumHeaderElement = createSpanElement('ALBUM', 'item');
	      liHeaderElement.appendChild(albumHeaderElement);
	
	      ulElement.appendChild(liHeaderElement);

        results.forEach((item, index) => {
          const liElement = document.createElement('li');
	
	        const indexElement = createSpanElement(index + 1);
	        liElement.appendChild(indexElement);
	
	        const songElement = createSpanElement(item.trackName, 'item');
	        liElement.appendChild(songElement);
	
	        const artistElement = createSpanElement(item.artistName, 'item');
	        liElement.appendChild(artistElement);
	
	        const albumElement = createSpanElement(item.collectionName, 'item');
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
