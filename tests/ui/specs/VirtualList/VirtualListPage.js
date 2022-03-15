'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

const scrollableSelector = '.enact_ui_Scrollable_Scrollable_scrollable';
const scrollbarSelector = '.Scrollable_Scrollbar_scrollbar';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';
	}

	async open (urlExtra) {
		await super.open('VirtualList-View', urlExtra);
	}

	get buttonFocusableScrollbar () {
		return element('#focusableScrollbar', browser);
	}
	get buttonHideScrollbar () {
		return element('#hideScrollbar', browser);
	}
	get buttonTop () {
		return element('#top', browser);
	}
	get buttonLeft () {
		return element('#left', browser);
	}
	get buttonRight () {
		return element('#right', browser);
	}
	get buttonBottom () {
		return element('#bottom', browser);
	}
	get buttonScrollUp () {
		return element(`${scrollbarSelector} :nth-child(1)`, browser);
	}
	get buttonScrollDown () {
		return element(`${scrollbarSelector} :nth-child(3)`, browser);
	}
	get buttonWrap () {
		return element('#wrap', browser);
	}
	get scrollBarSize () {
		return $(`${scrollbarSelector}`).getSize();
	}
	get list () {
		return element('#list', browser);
	}
	get listSize () {
		return $(`${scrollableSelector}`).getSize();
	}

	item (id) {
		return element(`#${typeof id === 'number' ? `item${id}` : id}`, browser);
	}

	async topVisibleItemId () {
		return await browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{top, left, width} = scroller.getBoundingClientRect();
			let currentY = top + 1,
				middle = left + Math.floor((left + width) / 2);
			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(middle, currentY + i);
				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, increment y and try again
			}
			return 'unknown';	// we didn't find it?!
		}, scrollableSelector);
	}

	async bottomVisibleItemId () {
		return await browser.execute(function (_scrollableSelector) {
			const scroller = document.querySelector(_scrollableSelector),
				{bottom, left, width} = scroller.getBoundingClientRect();

			let currentY = bottom - 1,
				middle = left + Math.floor((left + width) / 2);

			for (let i = 0; i < 10; i++) {
				let el = document.elementFromPoint(middle, currentY - i);

				// Search parents for the row ID
				while (el && el !== scroller && el !== document.body) {
					if (el.id) {
						return el.id;
					} else {
						el = el.parentNode;
					}
				}
				// else, it's inside the list itself, decrement y and try again
			}
			return 'unknown';	// we didn't find it?!
		}, scrollableSelector);
	}

	async itemOffsetTopById (id) {
		return await browser.execute(function (_element) {
			return _element.getBoundingClientRect().top;
		}, await this.item(id));
	}
}

module.exports = new VirtualListPage();
