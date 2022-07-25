import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, select, text } from '@enact/storybook-utils/addons/controls';
import { mergeComponentMetadata } from '@enact/storybook-utils';

import ExpandableInput, { ExpandableInputBase } from '@enact/moonstone/ExpandableInput';

import icons from '../util/icons';

const iconNames = ['', ...icons];

const Config = mergeComponentMetadata('ExpandableInput', ExpandableInputBase, ExpandableInput);
ExpandableInput.displayName = 'ExpandableInput';

// Set up some defaults for info and controls
const prop = {
	type: ['text', 'number', 'password']
};

export default {
	title: 'Moonstone/ExpandableInput',
	component: 'ExpandableInput'
};

export const _ExpandableInput = (args) => (
	<ExpandableInput
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		noneText={args['noneText']}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		title={args['title']}
		placeholder={args['placeholder']}
		type={args['type']}
	/>
);

boolean('disabled',_ExpandableInput,  Config);
select('iconAfter', _ExpandableInput, iconNames, Config);
select('iconBefore', _ExpandableInput, iconNames, Config);
select('type', _ExpandableInput, prop.type, Config, prop.type[0]);
text('noneText',_ExpandableInput,  Config, 'noneText');
text('placeholder', _ExpandableInput, Config, 'placeholder');
text('title', _ExpandableInput, Config, 'title');

_ExpandableInput.storyName = 'ExpandableInput';
_ExpandableInput.parameters = {
	info: {
		text: 'Basic usage of ExpandableInput'
	}
};
