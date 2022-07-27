import Button, {ButtonBase} from '@enact/moonstone/Button';
import {IconButtonBase} from '@enact/moonstone/IconButton';
import LabeledIconButton from '@enact/moonstone/LabeledIconButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';

import iconNames from '../helper/icons';

LabeledIconButton.displayName = 'LabeledIconButton';
const Config = mergeComponentMetadata(
	'LabeledIconButton',
	Button,
	ButtonBase,
	IconButtonBase,
	LabeledIconButton,
	UIButton,
	UIButtonBase,
	UiLabeledIcon,
	UiLabeledIconBase
);

export default {
	title: 'Moonstone/LabeledIconButton',
	component: 'LabeledIconButton'
};

export const _LabeledIconButton = (args) => (
	<LabeledIconButton
		disabled={args['disabled']}
		flip={args['flip']}
		icon={args['icon']}
		inline={args['inline']}
		labelPosition={args['labelPosition']}
		selected={args['selected']}
		size={args['size']}
	>
		{args['children']}
	</LabeledIconButton>
);

boolean('disabled', _LabeledIconButton, Config);
boolean('inline', _LabeledIconButton, Config);
boolean('selected', _LabeledIconButton, Config);
select('flip', _LabeledIconButton, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', _LabeledIconButton, ['', ...iconNames], Config, 'fullscreen');
select('labelPosition', _LabeledIconButton, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', _LabeledIconButton, ['small', 'large'], Config);
text('children', _LabeledIconButton, Config, 'Hello LabeledIconButton');

_LabeledIconButton.storyName = 'LabeledIconButton';
_LabeledIconButton.parameters = {
	info: {
		text: 'Basic usage of LabeledIconButton'
	}
};
