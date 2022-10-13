'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component: 'LabeledItem', child: 'title'});
const getLabeledItemValue = getSubComponent({component: 'LabeledItem', child: 'label'});

class ExpandableInterface {
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
		return getText(getIcon(this.self));
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

	item (n) {
		return element(`[role="checkbox"]:nth-of-type(${n + 1})`, this.self);
	}
}

class ExpandableListPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableList Test';
		this.components = {};
		// TODO: Put `selectedClass` into constructor
		this.components.radioSelect = new ExpandableInterface('expandable1');
		this.components.radioSelect.selectedClass = '.RadioItem_RadioItem_selected';
		this.components.multiSelect = new ExpandableInterface('expandable2');
		this.components.multiSelect.selectedClass = '.Checkbox_Checkbox_selected';
		this.components.singleSelect = new ExpandableInterface('expandable3');
		this.components.singleSelect.selectedClass = '.RadioItem_RadioItem_selected';
		this.components.noLockBottom = new ExpandableInterface('expandable4');
		this.components.noLockBottom.selectedClass = '.RadioItem_RadioItem_selected';
		this.components.noAutoClose = new ExpandableInterface('expandable5');
		this.components.noAutoClose.selectedClass = '.RadioItem_RadioItem_selected';
		this.components.defaultOpen = new ExpandableInterface('expandable6');
		this.components.defaultOpen.selectedClass = '.RadioItem_RadioItem_selected';
		this.components.disabled = new ExpandableInterface('expandable7');
		this.components.disabled.selectedClass = '.RadioItem_RadioItem_selected';
	}

	async open (urlExtra) {
		await super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new ExpandableListPage();
