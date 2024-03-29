'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component: 'LabeledItem', child: 'title'});
const getLabeledItemValue = getSubComponent({component: 'LabeledItem', child: 'label'});

class PickerInterface {
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
	// get    isOpen () { return this.self.$('.enact_ui_Transition_Transition_shown').isExisting(); }
	async isOpen () {
		return !(!(await this.self.$('.enact_ui_Transition_Transition_transition').isExisting()) ||
			!(await this.self.$('.enact_ui_Transition_Transition_shown').isExisting()) && await this.self.$('.enact_ui_Transition_Transition_hidden').isExisting());
	}

	get hour () {
		return element('.TimePicker_TimePicker_hourComponents .internal_Picker_Picker_picker', this.self);
	}
	get hourLabel () {
		return element('.TimePicker_TimePicker_hourComponents .internal_DateComponentPicker_DateComponentPicker_label', this.self);
	}
	get meridiem () {
		return element('.TimePicker_TimePicker_meridiemComponent .internal_Picker_Picker_picker', this.self);
	}
	get meridiemLabel () {
		return element('.TimePicker_TimePicker_meridiemComponents .internal_DateComponentPicker_DateComponentPicker_label', this.self);
	}
	get minute () {
		return element('.TimePicker_TimePicker_minutesComponents .internal_Picker_Picker_picker', this.self);
	}
	get minuteLabel () {
		return element('.TimePicker_TimePicker_minuteComponents .internal_DateComponentPicker_DateComponentPicker_label', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_decrementer', picker);
	}
	incrementer (picker) {
		return element('.internal_Picker_Picker_incrementer', picker);
	}
	item (picker) {
		return element('.internal_Picker_Picker_item', picker);
	}
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefaultClosedWithoutNoneText = new PickerInterface('timePickerDefaultClosedWithoutNoneText');
		this.components.timePickerDefaultClosedWithNoneText = new PickerInterface('timePickerDefaultClosedWithNoneText');
		this.components.timePickerDefaultOpenWithNoneText = new PickerInterface('timePickerDefaultOpenWithNoneText');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		this.components.timePickerNoLabels = new PickerInterface('timePickerNoLabels');
		this.components.timePickerDisabledWithNoneText = new PickerInterface('timePickerDisabledWithNoneText');
		this.components.timePickerDisabledOpenWithNoneText = new PickerInterface('timePickerDisabledOpenWithNoneText');
		this.components.timePickerDisabledOpenWithDefaultValue = new PickerInterface('timePickerDisabledOpenWithDefaultValue');
		this.components.timePickerDisabledWithDefaultValue = new PickerInterface('timePickerDisabledWithDefaultValue');
		this.components.timePickerDefaultOpenWithDefaultValue = new PickerInterface('timePickerDefaultOpenWithDefaultValue');
	}

	async open (urlExtra) {
		await super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();
