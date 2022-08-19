import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import RadioItem from '@enact/moonstone/RadioItem';
import ToggleItem from '@enact/moonstone/ToggleItem';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';

import {listIcons} from '../helper/icons';

RadioItem.displayName = 'RadioItem';
const Config = mergeComponentMetadata(
	'RadioItem',
	Item,
	ItemBase,
	RadioItem,
	ToggleItem,
	UiToggleItem,
	UiToggleItemBase
);

export default {
	title: 'Moonstone/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = (args) => {
	const icon = args['itemIcon'];
	const iconPosition = args['iconPosition'];
	const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
	const itemIconPosition = args['itemIconPosition'];
	return (
		<RadioItem
			disabled={args['disabled']}
			iconPosition={iconPosition}
			inline={args['inline']}
			itemIcon={itemIcon}
			itemIconPosition={itemIconPosition}
			onToggle={action('onToggle')}
		>
			{args['children']}
		</RadioItem>
	);
};

boolean('disabled', _RadioItem, Config);
boolean('inline', _RadioItem, Config);
select('iconPosition', _RadioItem, ['before', 'after'], Config);
select('itemIcon', _RadioItem, ['', ...listIcons], Config);
select('itemIconPosition', _RadioItem, [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _RadioItem, Config, 'Hello RadioItem');

_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'Basic usage of RadioItem'
	}
};
