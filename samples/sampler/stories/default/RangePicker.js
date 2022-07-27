import RangePicker, {RangePickerBase} from '@enact/moonstone/RangePicker';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';

import {decrementIcons, incrementIcons} from '../helper/icons';

RangePicker.displayName = 'RangePicker';
const Config = mergeComponentMetadata(
	'RangePicker',
	RangePicker,
	RangePickerBase
);

export default {
	title: 'Moonstone/RangePicker',
	component: 'RangePicker'
};

// Set up some defaults for info and controls
const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large', 1, 2, 3, 4, 5, 6]
};
const parseIntOrNullify = (v) => {
	if (!isNaN(parseInt(v))) {
		return parseInt(v);
	} else {
		return nullify(v);
	}
};

export const _RangePicker = (args) => (
	<RangePicker
		decrementIcon={args['decrementIcon']}
		defaultValue={0}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		max={args['max']}
		min={args['min']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		step={args['step']}
		width={parseIntOrNullify(args['width'])}
		wrap={args['wrap']}
	/>
);

boolean('disabled', _RangePicker, Config);
boolean('joined', _RangePicker, Config);
boolean('noAnimation', _RangePicker, Config);
boolean('wrap', _RangePicker, Config);
number('max', _RangePicker, Config, 100);
number('min', _RangePicker, Config, 0);
number('step', _RangePicker, Config, 5);
select('decrementIcon', _RangePicker, ['', ...decrementIcons], Config);
select('incrementIcon', _RangePicker, ['', ...incrementIcons], Config);
select('orientation', _RangePicker, prop.orientation, Config, 'horizontal');
select('width', _RangePicker, prop.width, Config, 'small');

_RangePicker.storyName = 'RangePicker';
_RangePicker.parameters = {
	info: {
		text: 'Basic usage of RangePicker'
	}
};
