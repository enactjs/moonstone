import TimePicker from '@enact/moonstone/TimePicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';

TimePicker.displayName = 'TimePicker';
const Config = mergeComponentMetadata(
	'TimePicker',
	TimePicker
);

export default {
	title: 'Moonstone/TimePicker',
	component: 'TimePicker'
};

export const _TimePicker = (args) => (
	<TimePicker
		disabled={args['disabled']}
		hourAriaLabel={args['hourAriaLabel']}
		hourLabel={args['hourLabel']}
		meridiemAriaLabel={args['meridiemAriaLabel']}
		meridiemLabel={args['meridiemLabel']}
		minuteAriaLabel={args['minuteAriaLabel']}
		minuteLabel={args['minuteLabel']}
		noLabels={args['noLabels']}
		noneText={args['noneText']}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		title={args['title']}
	/>
);

boolean('disabled', _TimePicker, Config);
boolean('noLabels', _TimePicker, Config);
text('hourAriaLabel', _TimePicker, Config, '');
text('hourLabel', _TimePicker, Config, '');
text('meridiemAriaLabel', _TimePicker, Config, '');
text('meridiemLabel', _TimePicker, Config, '');
text('minuteAriaLabel', _TimePicker, Config, '');
text('minuteLabel', _TimePicker, Config, '');
text('noneText', _TimePicker, Config, 'Nothing Selected');
text('title', _TimePicker, Config, 'Time');

_TimePicker.storyName = 'TimePicker';
_TimePicker.parameters = {
	info: {
		text: 'The basic TimePicker'
	}
};
