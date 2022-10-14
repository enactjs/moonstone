import Picker from '@enact/moonstone/Picker';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

import PickerAddRemove from './components/PickerAddRemove';
import PickerRTL from './components/PickerRTL';

import iconNames from '../helper/icons';

Picker.displayName = 'Picker';

const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large']
};

const pickerList = {
	tall: [
		'नरेंद्र मोदी',
		' ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	],
	long: [
		'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text1',
		'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text2',
		'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text3',
		'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text4',
		'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text5'
	],
	vegetables: [
		'Celery',
		'Carrot',
		'Tomato',
		'Onion',
		'Broccoli',
		'Spinach'
	],
	oneAirport: [
		'San Francisco Airport Terminal Gate 1'
	],
	emptyList: [],
	orderedList: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F'
	]
};

export default {
	title: 'Moonstone/Picker',
	component: 'Picker'
};

export const WithLongText = (args) => (
	<Picker
		decrementIcon={args['decrementIcon']}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.long}
	</Picker>
);

boolean('disabled', WithLongText, Picker);
boolean('joined', WithLongText, Picker);
select('decrementIcon', WithLongText, iconNames, Picker);
select('incrementIcon', WithLongText, iconNames, Picker);
boolean('noAnimation', WithLongText, Picker);
select('orientation', WithLongText, prop.orientation, Picker, 'horizontal');
select('width', WithLongText, prop.width, Picker, 'large');
boolean('wrap', WithLongText, Picker);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<Picker
		decrementIcon={args['decrementIcon']}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.tall}
	</Picker>
);

boolean('disabled', WithTallCharacters, Picker);
boolean('joined', WithTallCharacters, Picker);
select('decrementIcon', WithTallCharacters, iconNames, Picker);
select('incrementIcon', WithTallCharacters, iconNames, Picker);
boolean('noAnimation', WithTallCharacters, Picker);
select('orientation', WithTallCharacters, prop.orientation, Picker, 'horizontal');
select('width', WithTallCharacters, prop.width, Picker, 'large');
boolean('wrap', WithTallCharacters, Picker);

WithTallCharacters.storyName = 'with tall characters';

export const WithDefaultValue = (args) => (
	<Picker
		decrementIcon={args['decrementIcon']}
		defaultValue={2}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.vegetables}
	</Picker>
);

boolean('disabled', WithDefaultValue, Picker);
boolean('joined', WithDefaultValue, Picker);
select('decrementIcon', WithDefaultValue, iconNames, Picker);
select('incrementIcon', WithDefaultValue, iconNames, Picker);
boolean('noAnimation', WithDefaultValue, Picker);
select('orientation', WithDefaultValue, prop.orientation, Picker, 'horizontal');
select('width', WithDefaultValue, prop.width, Picker, 'large');
boolean('wrap', WithDefaultValue, Picker);

WithDefaultValue.storyName = 'with a default value';

export const WithNoItems = (args) => (
	<Picker
		decrementIcon={args['decrementIcon']}
		defaultValue={2}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{[]}
	</Picker>
);

boolean('disabled', WithNoItems, Picker);
boolean('joined', WithNoItems, Picker);
select('decrementIcon', WithNoItems, iconNames, Picker);
select('incrementIcon', WithNoItems, iconNames, Picker);
boolean('noAnimation', WithNoItems, Picker);
select('orientation', WithNoItems, prop.orientation, Picker, 'horizontal');
select('width', WithNoItems, prop.width, Picker, 'large');
boolean('wrap', WithNoItems, Picker);

WithNoItems.storyName = 'with no items (PLAT-30963)';

export const WithOneItem = (args) => (
	<Picker
		decrementIcon={args['decrementIcon']}
		defaultValue={2}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.oneAirport}
	</Picker>
);

boolean('disabled', WithOneItem, Picker);
boolean('joined', WithOneItem, Picker);
select('decrementIcon', WithOneItem, iconNames, Picker);
select('incrementIcon', WithOneItem, iconNames, Picker);
boolean('noAnimation', WithOneItem, Picker);
select('orientation', WithOneItem, prop.orientation, Picker, 'horizontal');
select('width', WithOneItem, prop.width, Picker, 'large');
boolean('wrap', WithOneItem, Picker);

WithOneItem.storyName = 'with one item';

export const WithItemAddRemove = (args) => (
	<PickerAddRemove
		disabled={args['disabled']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.emptyList}
	</PickerAddRemove>
);

boolean('disabled', WithItemAddRemove, Picker);
boolean('joined', WithItemAddRemove, Picker);
boolean('noAnimation', WithItemAddRemove, Picker);
select('orientation', WithItemAddRemove, prop.orientation, Picker, 'horizontal');
select('width', WithItemAddRemove, prop.width, Picker, 'medium');
boolean('wrap', WithItemAddRemove, Picker);

WithItemAddRemove.storyName = 'with item add/remove (ENYO-2448)';

export const WithRTLLayout = (args) => (
	<PickerRTL
		disabled={args['disabled']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{pickerList.orderedList}
	</PickerRTL>
);

boolean('disabled', WithRTLLayout, Picker);
boolean('joined', WithRTLLayout, Picker);
boolean('noAnimation', WithRTLLayout, Picker);
select('width', WithRTLLayout, prop.width, Picker, 'medium');
boolean('wrap', WithRTLLayout, Picker);

WithRTLLayout.storyName = 'RTL Layout (PLAT-28123)';
