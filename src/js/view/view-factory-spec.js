'use strict';

import  * as viewFactory from 'view/view-factory';
import { HEADER, BODY } from 'view/view-descriptor';

const SPAN = 'span';
const ITEM = 'item';
const TEXT = 'test';
const UL = 'ul';
const LI = 'li';

/**
 * @param {DocumentFragment} testLIElement
 * @param {Object} config
 */
const runCreateListHeaderElementsAsserts = (testLIElement, config) => {
	// has same number of children
	const children = testLIElement.childNodes;
	expect(children.length).toBe(config.length);

	//data is mapped correctly
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		expect(child.className).toBe(config[i].className);
		expect(child.textContent).toBe(config[i].label);
		expect(child.tagName.toLowerCase()).toBe(SPAN);
	}
};

/**
 * @param {HTMLElement} testLiElement
 */
const runCreateListItemElementAsserts = (testLiElement) => {
	//each child is a LI
	expect(testLiElement.tagName.toLowerCase()).toBe(LI);

	let numSpanChildren = 0;

	//li contains 4 spans
	const liChildren = testLiElement.childNodes;
	for (let j = 0; j < liChildren.length; j++)
	{
		if (liChildren[j].nodeType === 1)
		{
			numSpanChildren++;
		}
	}

	expect(numSpanChildren).toBe(4);
};

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

		//common header asserts
		runCreateListHeaderElementsAsserts(testLI, HEADER);
	});
});

describe('Function: createListBody', () => {
	it('should create a document fragment with content', () => {

		const testBodyElement = viewFactory.createListBody(BODY);

		// has same number of children
		const children = testBodyElement.childNodes;
		expect(children.length).toBe(BODY.length);

		//data is mapped correctly
		for (let i = 0; i < children.length; i++) {
			const liChild = children[i];
			runCreateListItemElementAsserts(liChild);
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

		runCreateListHeaderElementsAsserts(testLI, HEADER);
	});
});

describe('Function: createListItemElement', () => {
	it('should create an LI with content', () => {
		const liChild = viewFactory.createListItemElement(BODY[0]);

		runCreateListItemElementAsserts(liChild);
	});
});
