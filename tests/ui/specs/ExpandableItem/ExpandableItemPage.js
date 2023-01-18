'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component:'LabeledItem',  child: 'title'});
const getLabeledItemValue = getSubComponent({component:'LabeledItem',  child: 'label'});

class ExpandableItemInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get      self () {
		return element(`#${this.id}`, browser);
	}
	get   chevron () {
		return getIcon(this.self);
	}
	get     title () {
		return getLabeledItem(this.self);
	}
	get titleText () {
		return getText(getLabeledItemTitle(this.self));
	}
	get     value () {
		return getLabeledItemValue(this.self);
	}
	get valueText () {
		return getText(this.value);
	}

	async isOpen () {
		return !(!(await this.self.$('.enact_ui_Transition_Transition_transition').isExisting()) ||
			!(await this.self.$('.enact_ui_Transition_Transition_shown').isExisting()) && await this.self.$('.enact_ui_Transition_Transition_hidden').isExisting());
	}

	get  hasLabel () {
		return this.self.$('.LabeledItem_LabeledItem_label').isDisplayed();
	}

	get item () {
		return element('.enact_ui_Transition_Transition_transition .Item_Item_item', this.self);
	}
}

class ExpandableItemPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableItem Test';
		this.components = {};
		this.components.expandableItemDefaultClosedWithoutNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithoutNoneText');
		this.components.expandableItemDefaultClosedWithNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithNoneText');
		this.components.expandableItemDefaultOpenWithNoneText = new ExpandableItemInterface('expandableItemDefaultOpenWithNoneText');
		this.components.expandableItemWithAutoClose = new ExpandableItemInterface('expandableItemWithAutoClose');
		this.components.expandableItemWithLockBottom = new ExpandableItemInterface('expandableItemWithLockBottom');
		this.components.expandableItemWithoutChildren = new ExpandableItemInterface('expandableItemWithoutChildren');
		this.components.expandableItemAutoLabel = new ExpandableItemInterface('expandableItemAutoLabel');
		this.components.expandableItemAlwaysLabel = new ExpandableItemInterface('expandableItemAlwaysLabel');
		this.components.expandableItemNeverLabel = new ExpandableItemInterface('expandableItemNeverLabel');
		this.components.expandableItemDisabledWithNoneText = new ExpandableItemInterface('expandableItemDisabledWithNoneText');
	}

	async open (urlExtra) {
		await super.open('ExpandableItem-View', urlExtra);
	}
	async waitForExist (selector, timeout = 5000, timeoutMsg = `timed out waiting for ${selector}`) {
		if (typeof selector !== 'string') {
			selector = `#${selector.id}`;
		}
		const element = await $(selector);

		await element.waitForDisplayed({timeout, timeoutMsg});
	}
}

module.exports = new ExpandableItemPage();
