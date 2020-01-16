import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledIconButton from '../../../../LabeledIconButton';
import {IconButtonBase} from '../../../../IconButton';
import Button, {ButtonBase} from '../../../../Button';

import iconNames from './icons';
import {mergeComponentMetadata} from '../../src/utils';
import {boolean, select, text} from '../../src/enact-knobs';

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
