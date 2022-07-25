import Icon, {IconBase} from '@enact/moonstone/Icon';
import LabeledIcon from '@enact/moonstone/LabeledIcon';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiIcon from '@enact/ui/Icon';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';

import iconNames from '../util/icons';

LabeledIcon.displayName = 'LabeledIcon';
const Config = mergeComponentMetadata(
	'LabeledIcon',
	Icon,
	IconBase,
	LabeledIcon,
	UiIcon,
	UiLabeledIcon,
	UiLabeledIconBase
);

export default {
	title: 'Moonstone/LabeledIcon',
	component: 'LabeledIcon'
};

export const _LabeledIcon = (args) => (
	<LabeledIcon
		disabled={args['disabled']}
		flip={args['flip']}
		icon={args['icon']}
		inline={args['inline']}
		labelPosition={args['labelPosition']}
		size={args['size']}
	>
		{args['children']}
	</LabeledIcon>
);

boolean('disabled', _LabeledIcon, Config);
boolean('inline', _LabeledIcon, Config);
select('flip', _LabeledIcon, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', _LabeledIcon, ['', ...iconNames], Config, 'fullscreen');
select('labelPosition', _LabeledIcon, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', _LabeledIcon, ['small', 'large'], Config);
text('children', _LabeledIcon, Config, 'Hello LabeledIcon');

_LabeledIcon.storyName = 'LabeledIcon';
_LabeledIcon.parameters = {
	info: {
		text: 'Basic usage of LabeledIcon'
	}
};
