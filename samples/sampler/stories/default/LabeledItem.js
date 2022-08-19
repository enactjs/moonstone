import LabeledItem from '@enact/moonstone/LabeledItem';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

LabeledItem.displayName = 'LabeledItem';

export default {
	title: 'Moonstone/LabeledItem',
	component: 'LabeledItem'
};

export const _LabeledItem = (args) => (
	<LabeledItem
		disabled={args['disabled']}
		label={args['label']}
		marqueeOn={args['marqueeOn']}
	>
		{args['children']}
	</LabeledItem>
);

boolean('disabled', _LabeledItem, LabeledItem);
select('marqueeOn', _LabeledItem, ['focus', 'hover', 'render'], LabeledItem, 'focus');
text('children', _LabeledItem, LabeledItem, 'Hello LabeledItem');
text('label', _LabeledItem, LabeledItem, 'Label');

_LabeledItem.storyName = 'LabeledItem';
_LabeledItem.parameters = {
	info: {
		text: 'Basic usage of LabeledItem'
	}
};
