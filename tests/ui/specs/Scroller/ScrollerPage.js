'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Test';
	}

	async open (urlExtra) {
		await super.open('Scroller-View', urlExtra);
	}

	get button1 () {
		return element('#Page_1_Button', browser);
	}
	get button2 () {
		return element('#Page_2_Button', browser);
	}
	get button3 () {
		return element('#Page_3_Button', browser);
	}

}

module.exports = new ScrollerPage();
