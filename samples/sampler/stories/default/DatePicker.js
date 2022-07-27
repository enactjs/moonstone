import DatePicker, {DatePickerBase} from '@enact/moonstone/DatePicker';
import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order');

DatePicker.displayName = 'DatePicker';

export default {
	title: 'Moonstone/DatePicker',
	component: 'DatePicker'
};

export const _DatePicker = (args) => (
	<DatePicker
		dayAriaLabel={args['dayAriaLabel']}
		dayLabel={args['dayLabel']}
		disabled={args['disabled']}
		monthAriaLabel={args['monthAriaLabel']}
		monthLabel={args['monthLabel']}
		noLabels={args['noLabels']}
		noneText={args['noneText']}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		title={args['title']}
		yearAriaLabel={args['yearAriaLabel']}
		yearLabel={args['yearLabel']}
	/>
);

boolean('disabled', _DatePicker,  Config);
boolean('noLabels', _DatePicker, Config);
text('dayAriaLabel', _DatePicker, Config);
text('dayLabel', _DatePicker, Config);
text('monthAriaLabel', _DatePicker, Config);
text('monthLabel', _DatePicker, Config);
text('noneText', _DatePicker, Config, 'Nothing Selected');
text('title', _DatePicker, Config, 'Date');
text('yearAriaLabel', _DatePicker, Config);
text('yearLabel', _DatePicker, Config);

_DatePicker.storyName = 'DatePicker';
_DatePicker.parameters = {
	info: {
		text: 'The basic DatePicker'
	}
};
