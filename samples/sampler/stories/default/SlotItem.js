import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/moonstone/Icon';
import SlotItem from '@enact/moonstone/SlotItem';

const Config = mergeComponentMetadata('SlotItem', SlotItem);

const prop = {
	autoHide: [null, 'after', 'before', 'both']
};

SlotItem.displayName = 'SlotItem';

storiesOf('Moonstone', module)
	.add(
		'SlotItem',
		() => (
			<SlotItem
				autoHide={select('autoHide', prop.autoHide, Config, 'after')}
				disabled={boolean('disabled', Config)}
			>
				<Icon slot="slotBefore">star</Icon>
				{text('children', Config, 'Hello Item')}
				<slotAfter>
					<Icon>lock</Icon>
					<Icon>flag</Icon>
				</slotAfter>
			</SlotItem>
		),
		{
			info: {
				text: 'Basic usage of SlotItem'
			}
		}
	);
