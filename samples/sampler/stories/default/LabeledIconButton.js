import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import {storiesOf} from '@storybook/react';

import LabeledIconButton from '@enact/moonstone/LabeledIconButton';
import {IconButtonBase} from '@enact/moonstone/IconButton';
import Button, {ButtonBase} from '@enact/moonstone/Button';

import iconNames from './icons';

LabeledIconButton.displayName = 'LabeledIconButton';
const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, Button, ButtonBase, UIButton, UIButtonBase, IconButtonBase, LabeledIconButton);

storiesOf('Moonstone', module)
	.add(
		'LabeledIconButton',
		() => (
			<LabeledIconButton
				disabled={boolean('disabled', Config)}
				flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
				icon={select('icon', ['', ...iconNames], Config, 'fullscreen')}
				inline={boolean('inline', Config)}
				labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
				selected={boolean('selected', Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('children', Config, 'Hello LabeledIconButton')}
			</LabeledIconButton>
		),
		{
			info: {
				text: 'Basic usage of LabeledIconButton'
			}
		}
	);
