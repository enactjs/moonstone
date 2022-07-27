import Item, {ItemBase} from '@enact/moonstone/Item';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

export default {
	title: 'Moonstone/Item',
	component: 'Item'
};

export const _Item = (args) => (
	<Item
		disabled={args['disabled']}
		inline={args['inline']}
	>
		{args['children']}
	</Item>
);

boolean('disabled', _Item, Config);
boolean('inline', _Item, Config);
text('children', _Item, Config, 'Hello Item');

_Item.storyName = 'Item';
_Item.parameters = {
	info: {
		text: 'Basic usage of Item'
	}
};
