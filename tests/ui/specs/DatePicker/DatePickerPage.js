'use strict';
const Page = require('enact-ui-tests/test/Page.js');
const {element, getComponent, getSubComponent, getText} = require('enact-ui-tests/test/utils.js');

const getIcon = getComponent('moonstone', 'Icon');
const getLabeledItem = getComponent('moonstone', 'LabeledItem');
const getLabeledItemTitle = getSubComponent('moonstone', 'LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('moonstone', 'LabeledItem', 'label');

class PickerInterface {
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

	get day () { return element('.enact_moonstone_DatePicker_DatePicker_day .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get dayLabel () { return element('.enact_moonstone_DatePicker_DatePicker_day .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get month () { return element('.enact_moonstone_DatePicker_DatePicker_month .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get monthLabel () { return element('.enact_moonstone_DatePicker_DatePicker_month .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get year () { return element('.enact_moonstone_DatePicker_DatePicker_year .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get yearLabel () { return element('.enact_moonstone_DatePicker_DatePicker_year .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }

	decrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_decrementer', picker); }
	incrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_incrementer', picker); }
	item (picker) { return element('.enact_moonstone_internal_Picker_Picker_item', picker); }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePickerDefaultClosedWithoutNoneText = new PickerInterface('datePickerDefaultClosedWithoutNoneText');
		this.components.datePickerDefaultClosedWithNoneText = new PickerInterface('datePickerDefaultClosedWithNoneText');
		this.components.datePickerDefaultOpenWithNoneText = new PickerInterface('datePickerDefaultOpenWithNoneText');
		this.components.datePickerWithDefaultValue = new PickerInterface('datePickerWithDefaultValue');
		this.components.datePickerNoLabels = new PickerInterface('datePickerNoLabels');
		this.components.datePickerDisabledWithNoneText = new PickerInterface('datePickerDisabledWithNoneText');
		this.components.datePickerDisabledOpenWithNoneText = new PickerInterface('datePickerDisabledOpenWithNoneText');
		this.components.datePickerDisabledOpenWithDefaultValue = new PickerInterface('datePickerDisabledOpenWithDefaultValue');
		this.components.datePickerDisabledWithDefaultValue = new PickerInterface('datePickerDisabledWithDefaultValue');
		this.components.datePickerDefaultOpenWithDefaultValue = new PickerInterface('datePickerDefaultOpenWithDefaultValue');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();
