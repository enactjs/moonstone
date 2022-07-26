import ExpandableItem, {Expandable, ExpandableItemBase} from '@enact/moonstone/ExpandableItem';
import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';

const Config = mergeComponentMetadata('ExpandableItem', Expandable, ExpandableItem, ExpandableItemBase);
ExpandableItem.displayName = 'ExpandableItem';
Icon.displayName = 'Icon';
Item.displayName = 'Item';

export default {
	title: 'Moonstone/ExpandableItem',
	component: 'ExpandableItem'
};

export const _ExpandableItem = (args) => (
	<ExpandableItem
		autoClose={args['autoClose']}
		disabled={args['disabled']}
		label={args['label']}
		lockBottom={args['lockBottom']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		showLabel={args['showLabel']}
		title={args['title']}
	>
		<Item>
			This can be any type of content you might want to
			render inside a labeled expandable container
		</Item>
		<Item>
			<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
		</Item>
	</ExpandableItem>
);

boolean('autoClose', _ExpandableItem, Config);
boolean('disabled', _ExpandableItem, Config);
boolean('lockBottom', _ExpandableItem, Config);
select('showLabel', _ExpandableItem, ['always', 'never', 'auto'], Config);
text('label', _ExpandableItem, Config, 'label');
text('title', _ExpandableItem, Config, 'title');

_ExpandableItem.storyName = 'ExpandableItem';
_ExpandableItem.parameters = {
	info: {
		text: 'Basic usage of ExpandableItem'
	}
};
