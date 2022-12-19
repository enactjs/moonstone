import CheckboxItem from '@enact/moonstone/CheckboxItem';
import Icon from '@enact/moonstone/Icon';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/moonstone/internal/ToggleItem';
import Item, {ItemBase} from '@enact/moonstone/Item';
import ToggleItem from '@enact/moonstone/ToggleItem';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiItem from '@enact/ui/Item';

import {listIcons} from '../helper/icons';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata('CheckboxItem', UiItem, ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, CheckboxItem);

export default {
	title: 'Moonstone/Checkbox',
	component: 'Checkbox'
};

export const _Checkbox = (args) => {
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

boolean('disabled', _Checkbox, Config);
boolean('inline', _Checkbox, Config);
select('iconPosition', _Checkbox, ['before', 'after'], Config);
select('itemIcon', _Checkbox, ['', ...listIcons], Config);
select('itemIconPosition', _Checkbox, [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _Checkbox, Config, 'Hello CheckboxItem');

_Checkbox.storyName = 'Checkbox';
_Checkbox.parameters = {
	info: {
		text: 'Basic usage of CheckboxItem'
	}
};
