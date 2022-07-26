import Button, {ButtonBase} from '@enact/moonstone/Button';
import Dropdown, {DropdownBase} from '@enact/moonstone/Dropdown';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', UIButtonBase, UIButton, ButtonBase, Button, DropdownBase, Dropdown);

export default {
	title: 'Moonstone/Dropdown',
	component: 'Dropdown'
};

export const _Dropdown = (args) => {
	const itemCount = args['items'];
	const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
	return (
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			size={args['size']}
			title={args['title']}
			width={args['width']}
		>
			{items}
		</Dropdown>
	);
};

boolean('disabled', _Dropdown, Config);
range('items', _Dropdown, Config, {min: 0, max: 50}, 5);
select('direction', _Dropdown, ['up', 'down'], Config);
select('size', _Dropdown, ['small', 'large'], Config);
select('width', _Dropdown, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);
text('title', _Dropdown, Config, 'Dropdown');

_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
	info: {
		text: 'A quick, inline, value-selection component'
	}
};
