'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('moonstone', 'Icon');
const getLabeledItem = getComponent('moonstone', 'LabeledItem');
const getLabeledItemTitle = getSubComponent('moonstone', 'LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('moonstone', 'LabeledItem', 'label');

class ExpandableInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(getIcon(this.self)); }
	get     title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get     value () { return getLabeledItemValue(this.self); }
	get valueText () { return getText(this.value); }
	get    isOpen () {
		return !(!this.self.isExisting('.enact_ui_Transition_Transition_transition') ||
		!this.self.isExisting('.enact_ui_Transition_Transition_shown') && this.self.isExisting('.enact_ui_Transition_Transition_hidden'));
	}

	item (n) { return element(`[role="checkbox"]:nth-of-type(${n + 1})`, this.self); }
}

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableList Test';
		this.components = {};
		// TODO: Put `selectedClass` into constructor
		this.components.radioSelect = new ExpandableInterface('expandable1');
		this.components.radioSelect.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
		this.components.multiSelect = new ExpandableInterface('expandable2');
		this.components.multiSelect.selectedClass = '.enact_moonstone_Checkbox_Checkbox_selected';
		this.components.singleSelect = new ExpandableInterface('expandable3');
		this.components.singleSelect.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
		this.components.noLockBottom = new ExpandableInterface('expandable4');
		this.components.noLockBottom.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
		this.components.noAutoClose = new ExpandableInterface('expandable5');
		this.components.noAutoClose.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
		this.components.defaultOpen = new ExpandableInterface('expandable6');
		this.components.defaultOpen.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
		this.components.disabled = new ExpandableInterface('expandable7');
		this.components.disabled.selectedClass = '.enact_moonstone_RadioItem_RadioItem_selected';
	}

	open (urlExtra) {
		super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new SpotlightMultiplePage();


