'use strict';

import { createSpanElement } from "view/view-factory";

const SPAN = 'span';
const ITEM = 'item';
const TEXT = 'test';

describe('Function: createSpanElement', () => {
	it('should create a span element with the given name and no class ', () => {
		const testSpanElement = createSpanElement(TEXT);
		expect(testSpanElement.className).toBe('');
		expect(testSpanElement.tagName.toLowerCase()).toBe(SPAN);
	});
	
	it('should create a span element with the given name and class', () => {
		const testSpanElement = createSpanElement(TEXT, ITEM);
		expect(testSpanElement.className).toBe(ITEM);
		expect(testSpanElement.tagName.toLowerCase()).toBe(SPAN);
	});
});
