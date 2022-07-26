import DayPicker from '@enact/moonstone/DayPicker';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

DayPicker.displayName = 'DayPicker';

export default {
	title: 'Moonstone/DayPicker',
	component: 'DayPicker'
};

export const _DayPicker = (args) => (
	<DayPicker
		aria-label={args['aria-label']}
		dayNameLength={args['dayNameLength']}
		disabled={args['disabled']}
		everyDayText={args['everyDayText']}
		everyWeekdayText={args['everyWeekdayText']}
		everyWeekendText={args['everyWeekendText']}
		noneText={args['noneText']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		title={args['title']}
	/>
);

boolean('disabled', _DayPicker, DayPicker);
select('dayNameLength', _DayPicker, ['short', 'medium', 'long', 'full'], DayPicker, 'long');
text('aria-label', _DayPicker, DayPicker);
text('everyDayText', _DayPicker, DayPicker);
text('everyWeekdayText', _DayPicker, DayPicker);
text('everyWeekendText', _DayPicker, DayPicker);
text('noneText', _DayPicker, DayPicker, 'none');
text('title', _DayPicker, DayPicker, 'Day Picker');

_DayPicker.storyName = 'DayPicker';
_DayPicker.parameters = {
	info: {
		text: 'The basic DayPicker'
	}
};
