import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledIcon from '../../../../LabeledIcon';
import Icon, {IconBase} from '../../../../Icon';

import iconNames from './icons';

import {mergeComponentMetadata} from '../../src/utils';
import {boolean, select, text} from '../../src/enact-knobs';

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
