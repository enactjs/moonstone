'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});
class ToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}`));
	}

	get self () {
		return $(`#${this.id}`);
	}
	get valueText () {
		return getText(getMarqueeText(this.self));
	}
	get isSelected () {
		return browser.$(`#${this.id}.ToggleButton_ToggleButton_selected`).isExisting();
	}
	get isSmall () {
		return browser.$(`#${this.id}.ToggleButton_ToggleButton_small`).isExisting();
	}
}

class ToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleButton Test';
		const toggleDefault = new ToggleButtonInterface('toggleButton1');
		const toggleWithLabels = new ToggleButtonInterface('toggleButton2');
		const toggleWithOnlyOnLabel = new ToggleButtonInterface('toggleButton3');
		const toggleWithOnlyOffLabel = new ToggleButtonInterface('toggleButton4');
		const toggleDefaultSelected = new ToggleButtonInterface('toggleButton5');
		const toggleDisabled = new ToggleButtonInterface('toggleButton6');
		const toggleSmall = new ToggleButtonInterface('toggleButton7');
		const toggleCasePreserve = new ToggleButtonInterface('toggleButton8');
		const toggleCaseSentence = new ToggleButtonInterface('toggleButton9');
		const toggleCaseWord = new ToggleButtonInterface('toggleButton10');
		const toggleCaseUpper = new ToggleButtonInterface('toggleButton11');

		this.components = {toggleDefault, toggleWithLabels, toggleWithOnlyOnLabel, toggleWithOnlyOffLabel, toggleDefaultSelected, toggleDisabled, toggleSmall, toggleCasePreserve, toggleCaseSentence, toggleCaseWord, toggleCaseUpper};
	}

	async open (urlExtra) {
		await super.open('ToggleButton-View', urlExtra);
	}
}

module.exports = new ToggleButtonPage();
