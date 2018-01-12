'use strict';

import  * as viewFactory from 'view/view-factory';
import { HEADER } from 'view/view-descriptor';

const SPAN = 'span';
const ITEM = 'item';
const TEXT = 'test';
const UL = 'ul';
const LI = 'li';

describe('Function: createList', () => {
	it('should create an UL', () => {
		const testUL = viewFactory.createList();
		expect(testUL.tagName.toLowerCase()).toBe(UL);
	});
});

describe('Function: createListHeader', () => {
	it('should create an LI with content', () => {
		const testLI = viewFactory.createListHeader(HEADER);
		
		//is LI
		expect(testLI.tagName.toLowerCase()).toBe(LI);
		
		// has same number of children
		const children = testLI.childNodes;
		expect(children.length).toBe(HEADER.length);
		
		//data is mapped correctly
		for (var i = 0; i < children.length; i++) {
			const child = children[i];
			expect(child.className).toBe(HEADER[i].className);
			expect(child.textContent).toBe(HEADER[i].label);
			expect(child.tagName.toLowerCase()).toBe(SPAN);
		}
	});
});

describe('Function: createListBody', () => {
	it('should create a document fragment with content', () => {
		
		const testData = [
			{
				index         : 1,
				trackName     : 'trackName1',
				artistName    : 'artistName1',
				collectionName: 'collectionName1'
			},
			{
				index         : 2,
				trackName     : 'trackName2',
				artistName    : 'artistName2',
				collectionName: 'collectionName2'
			},
			{
				index         : 3,
				trackName     : 'trackName3',
				artistName    : 'artistName3',
				collectionName: 'collectionName3'
			},
			{
				index         : 4,
				trackName     : 'trackName4',
				artistName    : 'artistName4',
				collectionName: 'collectionName4'
			},
			{
				index         : 5,
				trackName     : 'trackName5',
				artistName    : 'artistName5',
				collectionName: 'collectionName5'
			}
		];
		
		const testBodyElement = viewFactory.createListBody(testData);
		
		// has same number of children
		const children = testBodyElement.childNodes;
		expect(children.length).toBe(testData.length);
		
		//data is mapped correctly
		for (var i = 0; i < children.length; i++) {
			const liChild = children[i];
			
			//each child is a LI
			expect(liChild.tagName.toLowerCase()).toBe(LI);
			
			//li contains 4 spans
			const liChildren = liChild.childNodes;
			let numSpanChildren = 0;
			for (var j = 0; j < liChildren.length; j++)
			{
				if (liChildren[j].nodeType === 1)
				{
					numSpanChildren++;
				}
			}
			expect(numSpanChildren).toBe(4);
		}
	});
});

describe('Function: createSpanElement', () => {
	it('should create a span element with the given name and no class ', () => {
		const testSpanElement = viewFactory.createSpanElement(TEXT);
		expect(testSpanElement.className).toBe('');
		expect(testSpanElement.tagName.toLowerCase()).toBe(SPAN);
	});
	
	it('should create a span element with the given name and class', () => {
		const testSpanElement = viewFactory.createSpanElement(TEXT, ITEM);
		expect(testSpanElement.className).toBe(ITEM);
		expect(testSpanElement.tagName.toLowerCase()).toBe(SPAN);
	});
});

describe('Function: createListHeaderElements', () => {
	it('should create an LI with content', () => {
		const testLI = viewFactory.createListHeaderElements(HEADER);
		
		// has same number of children
		const children = testLI.childNodes;
		expect(children.length).toBe(HEADER.length);
		
		//data is mapped correctly
		for (var i = 0; i < children.length; i++) {
			const child = children[i];
			expect(child.className).toBe(HEADER[i].className);
			expect(child.textContent).toBe(HEADER[i].label);
			expect(child.tagName.toLowerCase()).toBe(SPAN);
		}
	});
});
