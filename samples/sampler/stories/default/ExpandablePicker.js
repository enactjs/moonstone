import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';

import ExpandablePicker, {ExpandablePickerBase} from '@enact/moonstone/ExpandablePicker';

const Config = mergeComponentMetadata('ExpandablePicker', ExpandablePicker, ExpandablePickerBase);
ExpandablePicker.displayName = 'ExpandablePicker';

const emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'];

export default {
	title: 'Moonstone/ExpandablePicker',
	component: 'ExpandablePicker'
};

export const _ExpandablePicker = (args) => (
	<ExpandablePicker
		checkButtonAriaLabel={args['checkButtonAriaLabel']}
		disabled={args['disabled']}
		decrementAriaLabel={args['decrementAriaLabel']}
		incrementAriaLabel={args['incrementAriaLabel']}
		joined={args['joined']}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		pickerAriaLabel={args['pickerAriaLabel']}
		title={args['title']}
		width={args['width']}
	>
		{emoticons}
	</ExpandablePicker>
);

boolean('disabled', _ExpandablePicker, Config);
boolean('joined', _ExpandablePicker, Config);
select('width', _ExpandablePicker, ['small', 'medium', 'large'], Config);
text('checkButtonAriaLabel', _ExpandablePicker, Config, '');
text('decrementAriaLabel', _ExpandablePicker, Config, '');
text('incrementAriaLabel', _ExpandablePicker, Config, '');
text('pickerAriaLabel', _ExpandablePicker, Config, '');
text('title', _ExpandablePicker, Config, 'Favorite Emoji');

_ExpandablePicker.storyName = 'ExpandablePicker';
_ExpandablePicker.parameters = {
	info: {
		text: 'Basic usage of ExpandablePicker'
	}
};
