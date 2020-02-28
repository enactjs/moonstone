'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ActivityPanels Test';
	}

	open (urlExtra) {
		super.open('ActivityPanels-View', urlExtra);
	}

	get item1 () { return $('#item1'); }
	get item2 () { return $('#item2'); }
	get item3 () { return $('#item3'); }
	get item4 () { return $('#item4'); }
	get item5 () { return $('#item5'); }
	get item6 () { return $('#item6'); }
	get item7 () { return $('#item7'); }
	get item8 () { return $('#item8'); }
	get button1 () { return $('#button1'); }
	get button2 () { return $('#button2'); }
	get button3 () { return $('#button3'); }
	get button4 () { return $('#button4'); }
	get breadcrumb () { return $('.Panels_Panels_breadcrumb'); }
	get breadcrumbHeader () { return $('.Panels_Panels_breadcrumbHeader'); }
	get closeButton () { return $('.Panels_ApplicationCloseButton_applicationCloseButton'); }
	get panelTitle () { return $('.Panels_Header_title .enact_ui_Marquee_Marquee_text').getText(); }
	get body () { return $('body'); }
}

module.exports = new SpotlightMultiplePage();
