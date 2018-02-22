'use strict';

export class ITunesPagedCollection {

	constructor() {
		this.itemsList = [];
		this.pageItemsList = [];
		this.currentPage = 1;
		this.numberOfItemsPerPage = 10;
		this.numberOfPages = 0;
	}

	/**
	 * @param {Array.<Object>} items
	 */
	setItems(items, numberOfItemsPerPage) {

		this.itemsList = items || [];
		this.numberOfItemsPerPage = numberOfItemsPerPage;
		this.numberOfPages = this.getNumberOfPages();
		this.firstPage();
	}

	getNumberOfPages() {
		return Math.ceil(this.itemsList.length / this.numberOfItemsPerPage);
	}

	nextPage() {
		this.currentPage += 1;
		this.loadCurrentPageInPageList();
	}

	previousPage() {
		this.currentPage -= 1;
		this.loadCurrentPageInPageList();
	}

	firstPage() {
		this.currentPage = 1;
		this.loadCurrentPageInPageList();
	}

	lastPage() {
		this.currentPage = this.numberOfPages;
		this.loadCurrentPageInPageList();
	}

	loadCurrentPageInPageList() {
		const begin = ((this.currentPage - 1) * this.numberOfItemsPerPage);
		const end = begin + this.numberOfItemsPerPage;
		this.pageItemsList = this.itemsList.slice(begin, end);
	}

	find(fun) {
		return this.itemsList.find(fun);
	}
}
