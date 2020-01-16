import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '../../../../Icon';
import Item, {ItemBase} from '../../../../Item';
import SelectableItem from '../../../../SelectableItem';
import ToggleItem from '../../../../ToggleItem';

import {listIcons} from './icons';

import {boolean, select, text} from '../../src/enact-knobs';
import {action, mergeComponentMetadata, nullify} from '../../src/utils';

SelectableItem.displayName = 'SelectableItem';
const Config = mergeComponentMetadata('SelectableItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, SelectableItem);

storiesOf('Moonstone', module)
	.add(
		'SelectableItem',
		() => {
			const iconPosition = select('iconPosition', ['before', 'after'], Config);
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (
				<SelectableItem
					disabled={boolean('disabled', Config)}
					iconPosition={iconPosition}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SelectableItem')}
				</SelectableItem>
			);
		},
		{
			info: {
				text: 'Basic usage of SelectableItem'
			}
		}
	);
