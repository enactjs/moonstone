import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import SwitchItem from '@enact/moonstone/SwitchItem';
import ToggleItem from '@enact/moonstone/ToggleItem';

import {listIcons} from './icons';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata('SwitchItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, SwitchItem);

storiesOf('Moonstone', module)
	.add(
		'SwitchItem',
		() => {
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', ['', 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (
				<SwitchItem
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SwitchItem')}
				</SwitchItem>
			);
		},
		{
			info: {
				text: 'Basic usage of SwitchItem'
			}
		}
	);
