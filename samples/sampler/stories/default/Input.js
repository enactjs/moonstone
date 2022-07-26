import Input, {InputBase} from '@enact/moonstone/Input';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';

import icons from '../util/icons';

const iconNames = ['', ...icons];

const Config = mergeComponentMetadata('Input', InputBase, Input);
Input.displayName = 'Input';

// Set up some defaults for info and kncontrolsobs
const prop = {
	type: ['text', 'number', 'password']
};

export default {
	title: 'Moonstone/Input',
	component: 'Input'
};

export const _Input = (args) => (
	<Input
		autoFocus={args['autoFocus']}
		onChange={action('onChange')}
		disabled={args['disabled']}
		dismissOnEnter={args['dismissOnEnter']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
	/>
);

boolean('autoFocus', _Input, Config);
boolean('disabled', _Input, Config);
boolean('dismissOnEnter', _Input, Config);
boolean('invalid', _Input, Config);
select('iconAfter', _Input, iconNames, Config);
select('iconBefore', _Input, iconNames, Config);
select('size', _Input, ['small', 'large'], Config);
select('type', _Input, prop.type, Config, prop.type[0]);
text('invalidMessage', _Input, Config);
text('placeholder', _Input, Config);

_Input.storyName = 'Input';
_Input.parameters = {
	info: {
		text: 'The basic Input'
	}
};
