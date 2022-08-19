import ExpandableList, {ExpandableListBase} from '@enact/moonstone/ExpandableList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('ExpandableList', ExpandableList, ExpandableListBase);
ExpandableList.displayName = 'ExpandableList';

export default {
	title: 'Moonstone/ExpandableList',
	component: 'ExpandableList'
};

export const _ExpandableList = (args) => (
	<ExpandableList
		closeOnSelect={args['closeOnSelect']}
		disabled={args['disabled']}
		noAutoClose={args['noAutoClose']}
		noLockBottom={args['noLockBottom']}
		noneText={args['noneText']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		select={args['select']}
		title={args['title']}
	>
		{['option1', 'option2', 'option3']}
	</ExpandableList>
);

boolean('closeOnSelect', _ExpandableList, Config);
boolean('disabled', _ExpandableList, Config);
boolean('noAutoClose', _ExpandableList, Config);
boolean('noLockBottom', _ExpandableList, Config);
select('select', _ExpandableList, ['radio', 'multiple', 'single'], Config, 'radio');
text('noneText', _ExpandableList, Config, 'nothing selected');
text('title', _ExpandableList, Config, 'title');

_ExpandableList.storyName = 'ExpandableList';
_ExpandableList.parameters = {
	info: {
		text: 'Basic usage of ExpandableList'
	}
};
