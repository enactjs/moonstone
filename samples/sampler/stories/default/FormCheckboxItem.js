import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import FormCheckboxItem from '../../../../FormCheckboxItem';
import ToggleItem from '../../../../ToggleItem';
import Item, {ItemBase} from '../../../../Item';
import Icon from '../../../../Icon';

import {listIcons} from './icons';

import {boolean, select, text} from '../../src/enact-knobs';
import {action, mergeComponentMetadata, nullify} from '../../src/utils';

FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata('FormCheckboxItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, FormCheckboxItem);

storiesOf('Moonstone', module)
	.add(
		'FormCheckboxItem',
		() => {
			const iconPosition = select('iconPosition', ['before', 'after'], Config);
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (
				<FormCheckboxItem
					disabled={boolean('disabled', Config)}
					iconPosition={iconPosition}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'A Checkbox for a form')}
				</FormCheckboxItem>
			);
		},
		{
			info: {
				text: 'Basic usage of FormCheckboxItem'
			}
		}
	);
