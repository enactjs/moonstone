import ExpandableInput from '@enact/moonstone/ExpandableInput';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

import icons from '../helper/icons';

ExpandableInput.displayName = 'ExpandableInput';

const iconNames = ['', ...icons];

const inputData = {
	type: ['text', 'number', 'password']
};

export default {
	title: 'Moonstone/ExpandableInput',
	component: 'ExpandableInput'
};

export const WithLongPlaceholder = (args) => (
	<ExpandableInput
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		noneText={args['noneText']}
		onChange={action('onChange')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		open={args['open']}
		placeholder={args['placeholder']}
		title={args['title']}
		type={args['type']}
	/>
);

boolean('disabled', WithLongPlaceholder, ExpandableInput);
select('iconAfter', WithLongPlaceholder, iconNames, ExpandableInput);
select('iconBefore', WithLongPlaceholder, iconNames, ExpandableInput);
text('noneText', WithLongPlaceholder, ExpandableInput, 'noneText');
boolean('open', WithLongPlaceholder, ExpandableInput, true);
text('title', WithLongPlaceholder, ExpandableInput, 'title');
text('placeholder', WithLongPlaceholder, ExpandableInput, 'Looooooooooooooooooooooong');
select('type', WithLongPlaceholder, inputData.type, ExpandableInput, inputData.type[0]);

WithLongPlaceholder.storyName = 'with 2 options for testing direction';

export const MultipleExpandableInputs = () => (
	<div>
		<ExpandableInput
			placeholder="ExpandableInput 1"
			title="ExpandableInput 1"

		/>
		<ExpandableInput
			placeholder="ExpandableInput 2"
			title="ExpandableInput 2"
		/>
	</div>
);

MultipleExpandableInputs.storyName = 'with multiple ExpandableInputs';
MultipleExpandableInputs.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
