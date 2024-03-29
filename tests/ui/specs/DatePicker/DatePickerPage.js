'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component: 'LabeledItem', child: 'title'});
const getLabeledItemValue = getSubComponent({component: 'LabeledItem', child: 'label'});
const getPickerChild = (child, picker) => getComponent({internal: true, component: 'Picker', child}, picker);

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
	async isOpen () {
		return !(!(await this.self.$('.enact_ui_Transition_Transition_transition').isExisting()) ||
			!(await this.self.$('.enact_ui_Transition_Transition_shown').isExisting()) && await this.self.$('.enact_ui_Transition_Transition_hidden').isExisting());
	}

	get day () {
		return getComponent(
			{internal: true, component: 'Picker'},
			getComponent({component: 'DatePicker', child: 'day'}, this.self)
		);
	}
	get dayLabel () {
		return getComponent({internal: true, component: 'DateComponentPicker', child: 'label'}, getComponent({component: 'DatePicker', child: 'day'}, this.self));
	}
	get month () {
		return getComponent({internal: true, component: 'Picker'}, getComponent({component: 'DatePicker', child: 'month'}, this.self));
	}
	get monthLabel () {
		return getComponent({internal: true, component: 'DateComponentPicker', child: 'label'}, getComponent({component: 'DatePicker', child: 'month'}, this.self));
	}
	get year () {
		return getComponent({internal: true, component: 'Picker'}, getComponent({component: 'DatePicker', child: 'year'}, this.self));
	}
	get yearLabel () {
		return getComponent({internal: true, component: 'DateComponentPicker', child: 'label'}, getComponent({component: 'DatePicker', child: 'year'}, this.self));
	}

	decrementer (picker) {
		return getPickerChild('decrementer', picker);
	}
	incrementer (picker) {
		return getPickerChild('incrementer', picker);
	}
	item (picker) {
		return getPickerChild('item', picker);
	}
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

	async open (urlExtra) {
		await super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();
