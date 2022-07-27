import EditableIntegerPicker, {EditableIntegerPickerBase} from '@enact/moonstone/EditableIntegerPicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';

import {decrementIcons, incrementIcons} from '../helper/icons';

const Config = mergeComponentMetadata('EditableIntegerPicker', EditableIntegerPickerBase, EditableIntegerPicker);
EditableIntegerPicker.displayName = 'EditableIntegerPicker';

// Set up some defaults for info and controls
const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large']
};

export default {
	title: 'Moonstone/EditableIntegerPicker',
	component: 'EditableIntegerPicker'
};

export const _EditableIntegerPicker = (args) => (
	<EditableIntegerPicker
		decrementIcon={args['decrementIcon']}
		defaultValue={20}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		max={args['max']}
		min={args['min']}
		noAnimation={args['noAnimation']}
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		onKeyDown={action('onKeyDown')}
		orientation={args['orientation']}
		step={args['step']}
		unit={args['unit']}
		width={args['width']}
		wrap={args['wrap']}
	/>
);

_EditableIntegerPicker.storyName = 'EditableIntegerPicker';
_EditableIntegerPicker.parameters = {
	info: {
		text: 'Basic usage of EditableIntegerPicker'
	}
};
boolean('disabled', _EditableIntegerPicker, Config);
boolean('noAnimation', _EditableIntegerPicker, Config);
boolean('wrap', _EditableIntegerPicker, Config);
number('max', _EditableIntegerPicker, Config, 100);
number('min', _EditableIntegerPicker, Config, 0);
number('step', _EditableIntegerPicker, Config);
select('decrementIcon', _EditableIntegerPicker, ['', ...decrementIcons], Config);
select('incrementIcon', _EditableIntegerPicker, ['', ...incrementIcons], Config);
select('orientation', _EditableIntegerPicker, prop.orientation, Config);
select('width', _EditableIntegerPicker, prop.width, Config);
text('unit', _EditableIntegerPicker, Config);
