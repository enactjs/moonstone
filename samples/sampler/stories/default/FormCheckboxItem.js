import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';

import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import ToggleItem from '@enact/moonstone/ToggleItem';
import Item, {ItemBase} from '@enact/moonstone/Item';
import Icon from '@enact/moonstone/Icon';

import {listIcons} from '../util/icons';

FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata('FormCheckboxItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, FormCheckboxItem);

export default {
	title: 'Moonstone/FormCheckboxItem',
	component: 'FormCheckboxItem'
};

export const _FormCheckboxItem = (args) => {
	const iconPosition = args['iconPosition'];
	const icon = args['itemIcon'];
	const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
	const itemIconPosition = args['itemIconPosition'];
	return (
		<FormCheckboxItem
			disabled={boolean('disabled', Config)}
			iconPosition={iconPosition}
			inline={boolean('inline', Config)}
			itemIcon={itemIcon}
			itemIconPosition={itemIconPosition}
			onToggle={action('onToggle')}
		>
			{args['children']}
		</FormCheckboxItem>
	);
};

select('iconPosition', _FormCheckboxItem, ['before', 'after'], Config);
select('itemIcon', _FormCheckboxItem, ['', ...listIcons], Config);
select('itemIconPosition', _FormCheckboxItem, [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
text('children', _FormCheckboxItem, Config, 'A Checkbox for a form');

_FormCheckboxItem.storyName = 'FormCheckboxItem';
_FormCheckboxItem.parameters = {
	info: {
		text: 'Basic usage of FormCheckboxItem'
	}
};
