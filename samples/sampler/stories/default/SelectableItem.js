import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import SelectableItem from '@enact/moonstone/SelectableItem';
import ToggleItem from '@enact/moonstone/ToggleItem';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';

import {listIcons} from '../helper/icons';

SelectableItem.displayName = 'SelectableItem';
const Config = mergeComponentMetadata(
	'SelectableItem',
	Item,
	ItemBase,
	SelectableItem,
	ToggleItem,
	UiToggleItem,
	UiToggleItemBase,
);

export default {
	title: 'Moonstone/SelectableItem',
	component: 'SelectableItem'
};

export const _SelectableItem = (args) => {
	const icon = args['itemIcon'];
	const iconPosition = args['iconPosition'];
	const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
	const itemIconPosition = args['itemIconPosition'];
	return (
		<SelectableItem
			disabled={args['disabled']}
			iconPosition={iconPosition}
			inline={args['inline']}
			itemIcon={itemIcon}
			itemIconPosition={itemIconPosition}
			onToggle={action('onToggle')}
		>
			{args['children']}
		</SelectableItem>
	);
};

boolean('disabled', _SelectableItem, Config);
boolean('inline', _SelectableItem, Config);
select('iconPosition', _SelectableItem, ['before', 'after'], Config);
select('itemIcon', _SelectableItem, ['', ...listIcons], Config);
select('itemIconPosition', _SelectableItem, [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _SelectableItem, Config, 'Hello SelectableItem');

_SelectableItem.storyName = 'SelectableItem';
_SelectableItem.parameters = {
	info: {
		text: 'Basic usage of SelectableItem'
	}
};
