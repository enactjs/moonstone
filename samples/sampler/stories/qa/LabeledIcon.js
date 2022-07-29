import Icon, {IconBase} from '@enact/moonstone/Icon';
import LabeledIcon from '@enact/moonstone/LabeledIcon';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import Layout, {Cell} from '@enact/ui/Layout';
import Scroller from '@enact/ui/Scroller';

import iconNames from '../helper/icons';

LabeledIcon.displayName = 'LabeledIcon';
const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

export default {
	title: 'Moonstone/LabeledIcon',
	component: 'LabeledIcon'
};

export const AlignedGrid = (args) => {
	const disabled = args['disabled'];
	const labelPosition = args['labelPosition'];

	return (
		<Scroller>
			<Layout align="center space-between" wrap>
				{iconNames.map((icon) =>
					<Cell size={200} key={'icon' + icon}>
						<LabeledIcon
							disabled={disabled}
							flip={args['flip']}
							icon={icon}
							labelPosition={labelPosition}
							size={args['size']}
							style={{marginLeft: 0, marginRight: 0}}
						>{icon}</LabeledIcon>
					</Cell>
				)}
			</Layout>
		</Scroller>
	);
};

boolean('disabled', AlignedGrid, Config);
select('flip', AlignedGrid, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('labelPosition', AlignedGrid, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', AlignedGrid, ['small', 'large'], Config);

AlignedGrid.storyName = 'aligned grid';

export const Inline = (args) => {
	const disabled = args['disabled'];
	const labelPosition = args['labelPosition'];

	return (
		<Scroller>
			{iconNames.map((icon) =>
				<LabeledIcon
					disabled={disabled}
					flip={args['flip']}
					icon={icon}
					inline
					key={'icon' + icon}
					labelPosition={labelPosition}
					size={args['size']}
				>{icon}</LabeledIcon>
			)}
		</Scroller>
	);
};

boolean('disabled', Inline, Config);
select('flip', Inline, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('labelPosition', Inline, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', Inline, ['small', 'large'], Config);

Inline.storyName = 'inline';

export const WithTallCharacters = (args) => {
	const disabled = args['disabled'];
	const labelPosition = args['labelPosition'];

	return (
		<LabeledIcon
			disabled={disabled}
			flip={args['flip']}
			icon={args['icon']}
			inline
			labelPosition={labelPosition}
			size={args['size']}
		>{args['children']}</LabeledIcon>
	);
};

text('children', WithTallCharacters, Config, 'ฟิ้  ไั  ஒ  து');
boolean('disabled', WithTallCharacters, Config);
select('flip', WithTallCharacters, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', WithTallCharacters, ['', ...iconNames], Config, 'fullscreen');
select('labelPosition', WithTallCharacters, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', WithTallCharacters, ['small', 'large'], Config);

WithTallCharacters.storyName = 'with tall characters';
