'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('moonstone', 'Icon');
const getLabeledItem = getComponent('moonstone', 'LabeledItem');
const getLabeledItemTitle = getSubComponent('moonstone', 'LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('moonstone', 'LabeledItem', 'label');

class ExpandableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getIcon(this.self); }
	get     title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get     value () { return getLabeledItemValue(this.self); }
	get valueText () { return getText(this.value); }
	get    isOpen () {
		return !(!this.self.isExisting('.enact_ui_Transition_Transition_transition') ||
		!this.self.isExisting('.enact_ui_Transition_Transition_shown') && this.self.isExisting('.enact_ui_Transition_Transition_hidden'));
	}
	get  hasLabel () { return this.self.isVisible('.enact_moonstone_LabeledItem_LabeledItem_label'); }

	get item () { return element('.enact_ui_Transition_Transition_transition .enact_moonstone_Item_Item_item', this.self); }
}

class ExpandableItemPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableItem Test';
		this.components = {};
		this.components.expandableItemDefaultClosedWithoutNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithoutNoneText');
		this.components.expandableItemDefaultClosedWithNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithNoneText');
		this.components.expandableItemDefaultOpenWithNoneText = new ExpandableItemInterface('expandableItemDefaultOpenWithNoneText');
		this.components.expandableItemWithAutoClose= new ExpandableItemInterface('expandableItemWithAutoClose');
		this.components.expandableItemWithLockBottom= new ExpandableItemInterface('expandableItemWithLockBottom');
		this.components.expandableItemWithoutChildren = new ExpandableItemInterface('expandableItemWithoutChildren');
		this.components.expandableItemAutoLabel = new ExpandableItemInterface('expandableItemAutoLabel');
		this.components.expandableItemAlwaysLabel = new ExpandableItemInterface('expandableItemAlwaysLabel');
		this.components.expandableItemNeverLabel = new ExpandableItemInterface('expandableItemNeverLabel');
		this.components.expandableItemDisabledWithNoneText = new ExpandableItemInterface('expandableItemDisabledWithNoneText');
	}

	open (urlExtra) {
		super.open('ExpandableItem-View', urlExtra);
	}
}

module.exports = new ExpandableItemPage();
