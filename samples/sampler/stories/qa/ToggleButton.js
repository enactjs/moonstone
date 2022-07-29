import Button, {ButtonBase} from '@enact/moonstone/Button';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

ToggleButton.displayName = 'ToggleButton';
const Config = mergeComponentMetadata('ToggleButton', UIButtonBase, UiButton, ButtonBase, Button, ToggleButton);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent'],
	tallText:{'ฟิ้ ไั ஒ து': 'ฟิ้ ไั ஒ து', 'ÁÉÍÓÚÑÜ': 'ÁÉÍÓÚÑÜ', 'Bản văn': 'Bản văn'}
};

export default {
	title: 'Moonstone/ToggleButton',
	component: 'ToggleButton'
};

export const WithLongText = (args) => {
	return (
		<ToggleButton
			backgroundOpacity={args['backgroundOpacity']}
			disabled={args['disabled']}
			onClick={action('onClick')}
			onToggle={action('onToggle')}
			size={args['size']}
			toggleOnLabel={args['toggleOnLabel']}
			toggleOffLabel={args['toggleOffLabel']}
		/>
	);
};

select('backgroundOpacity', WithLongText, prop.backgroundOpacity, Config);
boolean('disabled', WithLongText, Config);
select('size', WithLongText, ['small', 'large'], Config);
text('toggleOnLabel', WithLongText, Config, 'I am an extremely and particularly very long button with label On');
text('toggleOffLabel', WithLongText, Config, 'I am an extremely and particularly very long button with label Off');

WithLongText.storyName = 'with long text';

export const WithTallText = (args) => {
	return (
		<ToggleButton
			backgroundOpacity={args['backgroundOpacity']}
			disabled={args['disabled']}
			onClick={action('onClick')}
			onToggle={action('onToggle')}
			size={args['size']}
			toggleOnLabel={args['toggleOnLabel']}
			toggleOffLabel={args['toggleOffLabel']}
		/>
	);
};

select('backgroundOpacity', WithTallText, prop.backgroundOpacity, Config);
boolean('disabled', WithTallText, Config);
select('size', WithTallText, ['small', 'large'], Config);
text('toggleOnLabel', WithTallText, Config, 'ฟิ้ ไั ஒ து');
text('toggleOffLabel', WithTallText, Config, 'ฟิ้ ไั ஒ து');

WithTallText.storyName = 'with tall characters';
