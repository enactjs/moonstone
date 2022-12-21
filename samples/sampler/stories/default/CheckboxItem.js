import CheckboxItem from '@enact/moonstone/CheckboxItem';
import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import ToggleItem from '@enact/moonstone/ToggleItem';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/moonstone/ui/ToggleItem';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiItem from '@enact/ui/Item';

import {listIcons} from '../helper/icons';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata('CheckboxItem', UiItem, ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, CheckboxItem);

export default {
	title: 'Moonstone/CheckboxItem',
	component: 'CheckboxItem'
};

export const _CheckboxItem = (args) => {
	const icon = args['itemIcon'];
	const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
	return (
		<CheckboxItem
			// disabled and inline have problems when set to `null` from the internal nullify...
			disabled={args['disabled']}
			iconPosition={args['iconPosition']}
			inline={args['inline']}
			itemIcon={itemIcon}
			itemIconPosition={args['itemIconPosition']}
			onToggle={action('onToggle')}
		>
			{args['children']}
		</CheckboxItem>
	);
};

boolean('disabled', _CheckboxItem, Config);
boolean('inline', _CheckboxItem, Config);
select('iconPosition', _CheckboxItem, ['before', 'after'], Config);
select('itemIcon', _CheckboxItem, ['', ...listIcons], Config);
select('itemIconPosition', _CheckboxItem, [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _CheckboxItem, Config, 'Hello CheckboxItem');

_CheckboxItem.storyName = 'CheckboxItem';
_CheckboxItem.parameters = {
	info: {
		text: 'Basic usage of CheckboxItem'
	}
};
