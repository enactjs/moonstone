import Button, {ButtonBase} from '@enact/moonstone/Button';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent']
};

ToggleButton.displayName = 'ToggleButton';
const Config = mergeComponentMetadata(
	'ToggleButton',
	Button,
	ButtonBase,
	ToggleButton,
	UiButton,
	UIButtonBase
);

export default {
	title: 'Moonstone/ToggleButton',
	component: 'ToggleButton'
};

export const _ToggleButton = (args) => (
	<ToggleButton
		aria-label="toggle button"
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		onToggle={action('onToggle')}
		size={args['size']}
		toggleOffLabel={args['toggleOffLabel']}
		toggleOnLabel={args['toggleOnLabel']}
	>
		Missing Toggle Label
	</ToggleButton>
);

boolean('disabled', _ToggleButton, Config);
select('backgroundOpacity', _ToggleButton, prop.backgroundOpacity, Config);
select('size', _ToggleButton, ['small', 'large'], Config);
text('toggleOffLabel', _ToggleButton, Config, 'Off');
text('toggleOnLabel', _ToggleButton, Config, 'On');

_ToggleButton.storyName = 'ToggleButton';
_ToggleButton.parameters = {
	info: {
		text: 'The basic ToggleButton'
	}
};
