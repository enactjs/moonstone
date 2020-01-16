import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '../../../../Icon';
import Item, {ItemBase} from '../../../../Item';
import SwitchItem from '../../../../SwitchItem';
import ToggleItem from '../../../../ToggleItem';

import {listIcons} from './icons';

import {boolean, text, select} from '../../src/enact-knobs';
import {action, mergeComponentMetadata, nullify} from '../../src/utils';

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
