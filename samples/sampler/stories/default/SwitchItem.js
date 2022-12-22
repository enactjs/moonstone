import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import SwitchItem from '@enact/moonstone/SwitchItem';
import ToggleItem from '@enact/moonstone/ToggleItem';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/moonstone/UiToggleItem';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';

import {listIcons} from '../helper/icons';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata(
	'SwitchItem',
	Item,
	ItemBase,
	ToggleItem,
	SwitchItem,
	UiToggleItem,
	UiToggleItemBase
);

export default {
	title: 'Moonstone/SwitchItem',
	component: 'SwitchItem'
};

export const _SwitchItem = (args) => {
	const icon = args['itemIcon'];
	const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
	const itemIconPosition = args['itemIconPosition'];
	return (
		<SwitchItem
			disabled={args['disabled']}
			inline={args['inline']}
			itemIcon={itemIcon}
			itemIconPosition={itemIconPosition}
			onToggle={action('onToggle')}
		>
			{args['children']}
		</SwitchItem>
	);
};

boolean('disabled', _SwitchItem, Config);
boolean('inline', _SwitchItem, Config);
select('itemIcon', _SwitchItem, ['', ...listIcons], Config);
select('itemIconPosition', _SwitchItem, ['', 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _SwitchItem, Config, 'Hello SwitchItem');

_SwitchItem.storyName = 'SwitchItem';
_SwitchItem.parameters = {
	info: {
		text: 'Basic usage of SwitchItem'
	}
};
