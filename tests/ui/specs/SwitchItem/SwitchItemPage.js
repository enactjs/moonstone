'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getMarqueeText = getSubComponent({lib: 'ui', component:'Marquee', child:'text'});


class SwitchItemInterface {
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
	async isSelected () {
		return !!await element('.Switch_Switch_selected', this.self).isExisting();
	}
	get isInline () {
		return browser.$(`#${this.id}.Item_Item_inline`).isExisting();
	}
}

class SwitchItemPage extends Page {
	constructor () {
		super();
		this.title = 'SwitchItem Test';
		const switchDefault = new SwitchItemInterface('switchItem1');
		const switchDefaultSelected = new SwitchItemInterface('switchItem2');
		const switchInline = new SwitchItemInterface('switchItem3');
		const switchDisabled = new SwitchItemInterface('switchItem4');
		const switchInlineDisabled = new SwitchItemInterface('switchItem5');

		this.components = {switchDefault, switchDefaultSelected, switchInline, switchDisabled, switchInlineDisabled};
	}

	async open (urlExtra) {
		await super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();
