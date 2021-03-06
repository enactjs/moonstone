import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import ExpandableInput from '@enact/moonstone/ExpandableInput';

import icons from '../default/icons';

ExpandableInput.displayName = 'ExpandableInput';

const iconNames = ['', ...icons];

storiesOf('ExpandableInput', module)
	.add(
		'Long Placeholder',
		() => (
			<ExpandableInput
				disabled={boolean('disabled', ExpandableInput)}
				iconAfter={select('iconAfter', iconNames,  ExpandableInput)}
				iconBefore={select('iconBefore', iconNames,  ExpandableInput)}
				noneText={text('noneText', ExpandableInput, 'noneText')}
				onChange={action('onChange')}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				open={boolean('open', ExpandableInput, true)}
				title={text('title', ExpandableInput, 'title')}
				placeholder={text('placeholder', ExpandableInput, 'Looooooooooooooooooooooong')}
				type={text('type', ExpandableInput, 'text')}
			/>
		)
	)
	.add(
		'Multiple ExpandableInputs',
		() => (
			<div>
				<ExpandableInput
					title="ExpandableInput 1"
					placeholder="ExpandableInput 1"
				/>
				<ExpandableInput
					title="ExpandableInput 2"
					placeholder="ExpandableInput 2"
				/>
			</div>
		)
	);
