'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class MoonstonePage extends Page {
	constructor () {
		super();
		this.title = 'Moonstone Test';
	}

	open (urlExtra) {
		super.open('Moonstone-View', urlExtra);
	}

	get component () { return $('[data-ui-test-id="test"]'); }
}

module.exports = new MoonstonePage();
