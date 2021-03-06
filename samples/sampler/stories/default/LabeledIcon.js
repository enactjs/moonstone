import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import {storiesOf} from '@storybook/react';

import LabeledIcon from '@enact/moonstone/LabeledIcon';
import Icon, {IconBase} from '@enact/moonstone/Icon';

import iconNames from './icons';

LabeledIcon.displayName = 'LabeledIcon';
const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

storiesOf('Moonstone', module)
	.add(
		'LabeledIcon',
		() => (
			<LabeledIcon
				disabled={boolean('disabled', Config)}
				icon={select('icon', ['', ...iconNames], Config, 'fullscreen')}
				inline={boolean('inline', Config)}
				labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
				flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('children', Config, 'Hello LabeledIcon')}
			</LabeledIcon>
		),
		{
			info: {
				text: 'Basic usage of LabeledIcon'
			}
		}
	);
