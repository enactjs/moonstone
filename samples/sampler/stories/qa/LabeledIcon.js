import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import {storiesOf} from '@storybook/react';
import Scroller from '@enact/ui/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';

import Icon, {IconBase} from '@enact/moonstone/Icon';
import LabeledIcon from '@enact/moonstone/LabeledIcon';

import iconNames from '../default/icons';

LabeledIcon.displayName = 'LabeledIcon';
const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

storiesOf('LabeledIcon', module)
	.add(
		'aligned grid',
		() => {
			const disabled = boolean('disabled', Config);
			const labelPosition = select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config);
			return (
				<Scroller>
					<Layout wrap align="center space-between">
						{iconNames.map((icon) =>
							<Cell size={200} key={'icon' + icon}>
								<LabeledIcon
									style={{marginLeft: 0, marginRight: 0}}
									icon={icon}
									disabled={disabled}
									flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
									labelPosition={labelPosition}
									size={select('size', ['small', 'large'], Config)}
								>{icon}</LabeledIcon>
							</Cell>
						)}
					</Layout>
				</Scroller>
			);
		}
	)
	.add(
		'inline',
		() => {
			const disabled = boolean('disabled', Config);
			const labelPosition = select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config);
			return (
				<Scroller>
					{iconNames.map((icon) =>
						<LabeledIcon
							key={'icon' + icon}
							icon={icon}
							inline
							disabled={disabled}
							flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
							labelPosition={labelPosition}
							size={select('size', ['small', 'large'], Config)}
						>{icon}</LabeledIcon>
					)}
				</Scroller>
			);
		}
	)
	.add(
		'with tall characters',
		() => {
			const disabled = boolean('disabled', Config);
			const labelPosition = select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config);
			return (
				<LabeledIcon
					icon={select('icon', ['', ...iconNames], Config, 'fullscreen')}
					inline
					disabled={disabled}
					flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
					labelPosition={labelPosition}
					size={select('size', ['small', 'large'], Config)}
				>{text('children', Config, 'ฟิ้  ไั  ஒ  து')}
				</LabeledIcon>
			);
		}
	);
