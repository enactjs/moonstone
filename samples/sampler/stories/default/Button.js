import Button, {ButtonBase} from '@enact/moonstone/Button';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import iconNames from '../util/icons';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean control and return `void 0` when `true`.
Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UIButtonBase, UIButton, ButtonBase, Button);

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent'],
	icons: ['', ...iconNames]
};

export default {
	title: 'Moonstone/Button',
	component: 'Button'
};

export const _Button = (args) => (
	<Button
		backgroundOpacity={args['backgroundOpacity']}
		color={args['color']}
		disabled={args['disabled']}
		icon={args['icon']}
		iconPosition={args['iconPosition']}
		minWidth={args['minWidth'] ? void 0 : false}
		onClick={action('onClick')}
		selected={args['selected']}
		size={args['size']}
	>
		{args['children']}
	</Button>
);

boolean('disabled', _Button, Config);
boolean('minWidth', _Button, Config);
boolean('selected', _Button, Config);
select('backgroundOpacity', _Button, prop.backgroundOpacity, Config);
select('color', _Button, ['', 'red', 'green', 'yellow', 'blue'], Config, '');
select('icon', _Button, prop.icons, Config);
select('iconPosition', _Button, ['', 'before', 'after'], Config, '');
select('size', _Button, ['', 'small', 'large'], Config);
text('children', _Button, Config, 'click me');

_Button.storyName = 'Button';
_Button.parameters = {
	info: {
		text: 'The basic Button'
	}
};
