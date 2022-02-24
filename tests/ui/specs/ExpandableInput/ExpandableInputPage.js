'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element, getComponent, getSubComponent, getText} = require('@enact/ui-test-utils/utils');

const getIcon = getComponent({component: 'Icon'});
const getInput = getComponent({component: 'Input'});
const getLabeledItem = getComponent({component: 'LabeledItem'});
const getLabeledItemTitle = getSubComponent({component: 'LabeledItem', child: 'title'});
const getLabeledItemValue = getSubComponent({component: 'LabeledItem', child: 'label'});
const getLabeledItemIcon = getSubComponent({component: 'LabeledItem', child: 'icon'});

class ExpandableInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return await browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get self () {
		return element(`#${this.id}`, browser);
	}
	get input () {
		return getInput(this.self);
	}
	get chevron () {
		return getText(getIcon(this.self));
	}
	get title () {
		return getLabeledItem(this.self);
	}
	get titleText () {
		return getText(getLabeledItemTitle(this.self));
	}
	get titleTextMarquee () {
		return getLabeledItemTitle(this.self).$('.enact_ui_Marquee_Marquee_text');
	}
	get titleIcon () {
		return getLabeledItemIcon(this.self);
	}
	get label () {
		return getLabeledItemValue(this.self);
	}
	get labelText () {
		return getText(this.label);
	}
	get isLabelExists () {
		return this.self.$('.LabeledItem_LabeledItem_label').isDisplayed();
	}
	async isOpen () {
		return !(!(await this.self.$('.enact_ui_Transition_Transition_transition').isExisting()) ||
		!(await this.self.$('.enact_ui_Transition_Transition_shown').isExisting()) && await this.self.$('.enact_ui_Transition_Transition_hidden').isExisting());
	}
	get iconBefore () {
		return element('.Input_Input_iconBefore', this.self);
	}
	get iconBeforeSymbol () {
		return getText(this.iconBefore);
	}
	get iconAfter () {
		return element('.Input_Input_iconAfter', this.self);
	}
	get iconAfterSymbol () {
		return getText(this.iconAfter);
	}
	get isIconBefore () {
		return this.self.$('.Input_Input_iconBefore').isExisting();
	}
	get isIconAfter () {
		return this.self.$('.Input_Input_iconAfter').isExisting();
	}
	get placeHolder () {
		return this.self.$('.Input_Input_input').getAttribute('placeholder');
	}

}

class ExpandableInputPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableInput Test';
		this.components = {};
		this.components.default = new ExpandableInterface('expandable1');
		this.components.defaultValue = new ExpandableInterface('expandable2');
		this.components.defaultOpen = new ExpandableInterface('expandable3');
		this.components.password = new ExpandableInterface('expandable4');
		this.components.placeholder = new ExpandableInterface('expandable5');
		this.components.iconBefore = new ExpandableInterface('expandable6');
		this.components.iconAfter = new ExpandableInterface('expandable7');
		this.components.iconBeforeAfter = new ExpandableInterface('expandable8');
		this.components.disabled = new ExpandableInterface('expandable9');
	}

	async open (urlExtra) {
		await super.open('ExpandableInput-View', urlExtra);
	}

	async escape () {
		await super.keyDelay('Escape');
	}

	async hover () {
		await $('#expandable2').moveTo();
	}

}

module.exports = new ExpandableInputPage();
