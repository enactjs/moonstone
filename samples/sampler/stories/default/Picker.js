import Picker from '@enact/moonstone/Picker';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

import {decrementIcons, incrementIcons} from '../helper/icons';

// Set up some defaults for info and controls
const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large']
};

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

Picker.displayName = 'Picker';

export default {
	title: 'Moonstone/Picker',
	component: 'Picker'
};

export const _Picker = (args) => (
	<Picker
		aria-label={args['aria-label']}
		decrementAriaLabel={args['decrementAriaLabel']}
		decrementIcon={args['decrementIcon']}
		disabled={args['disabled']}
		incrementAriaLabel={args['incrementAriaLabel']}
		incrementIcon={args['incrementIcon']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		width={args['width']}
		wrap={args['wrap']}
	>
		{airports}
	</Picker>
);

boolean('disabled', _Picker, Picker);
boolean('joined', _Picker, Picker);
boolean('noAnimation', _Picker, Picker);
boolean('wrap', _Picker, Picker);
select('decrementIcon', _Picker, ['', ...decrementIcons], Picker);
select('incrementIcon', _Picker, ['', ...incrementIcons], Picker);
select('orientation', _Picker, prop.orientation, Picker, prop.orientation[0]);
select('width', _Picker, prop.width, Picker, prop.width[3]);
text('aria-label', _Picker, Picker, '');
text('decrementAriaLabel', _Picker, Picker, '');
text('incrementAriaLabel', _Picker, Picker, '');

_Picker.storyName = 'Picker';
_Picker.parameters = {
	info: {
		text: 'Basic usage of Picker'
	}
};
