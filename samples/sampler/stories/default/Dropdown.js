import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {storiesOf} from '@storybook/react';

import Dropdown, {DropdownBase} from '@enact/moonstone/Dropdown';
import Button, {ButtonBase} from '@enact/moonstone/Button';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', UIButtonBase, UIButton, ButtonBase, Button, DropdownBase, Dropdown);

storiesOf('Moonstone', module)
	.add(
		'Dropdown',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

			return (
				<Dropdown
					direction={select('direction', ['up', 'down'], Config)}
					disabled={boolean('disabled', Config)}
					onClose={action('onClose')}
					onOpen={action('onOpen')}
					onSelect={action('onSelect')}
					size={select('size', ['small', 'large'], Config)}
					title={text('title', Config, 'Dropdown')}
					width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
				>
					{items}
				</Dropdown>
			);
		},
		{
			info: {
				text: 'A quick, inline, value-selection component'
			}
		}
	);
