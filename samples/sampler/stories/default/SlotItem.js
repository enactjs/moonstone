import Icon from '@enact/moonstone/Icon';
import SlotItem from '@enact/moonstone/SlotItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

SlotItem.displayName = 'SlotItem';
const Config = mergeComponentMetadata(
	'SlotItem',
	SlotItem
);

export default {
	title: 'Moonstone/SlotItem',
	component: 'SlotItem'
};

const prop = {
	autoHide: [null, 'after', 'before', 'both']
};

export const _SlotItem = (args) => (
	<SlotItem
		autoHide={args['autoHide']}
		disabled={args['disabled']}
	>
		<Icon slot="slotBefore">star</Icon>
		{args['children']}
		<slotAfter>
			<Icon>lock</Icon>
			<Icon>flag</Icon>
		</slotAfter>
	</SlotItem>
);

boolean('disabled', _SlotItem, Config);
select('autoHide', _SlotItem, prop.autoHide, Config, 'after');
text('children', _SlotItem, Config, 'Hello Item');

_SlotItem.storyName = 'SlotItem';
_SlotItem.parameters = {
	info: {
		text: 'Basic usage of SlotItem'
	}
};
