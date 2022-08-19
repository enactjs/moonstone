import Button, {ButtonBase} from '@enact/moonstone/Button';
import {IconButtonBase} from '@enact/moonstone/IconButton';
import LabeledIconButton from '@enact/moonstone/LabeledIconButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import Layout, {Cell} from '@enact/ui/Layout';
import Scroller from '@enact/ui/Scroller';

import iconNames from '../helper/icons';

LabeledIconButton.displayName = 'LabeledIconButton';
const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, Button, ButtonBase, UIButton, UIButtonBase, IconButtonBase, LabeledIconButton);

export default {
	title: 'Moonstone/LabeledIconButton',
	component: 'LabeledIconButton'
};

export const AlignedGrid = (args) => {
	const disabled = args['disabled'];
	const labelPosition = args['labelPosition'];

	return (
		<Scroller>
			<Layout align="center space-between" wrap>
				{iconNames.map((icon) =>
					<Cell key={'icon' + icon} size={200}>
						<LabeledIconButton
							disabled={disabled}
							flip={args['flip']}
							icon={icon}
							labelPosition={labelPosition}
							size={args['size']}
							style={{marginLeft: 0, marginRight: 0}}
						>{icon}</LabeledIconButton>
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
				<LabeledIconButton
					disabled={disabled}
					flip={args['flip']}
					icon={icon}
					inline
					key={'icon' + icon}
					labelPosition={labelPosition}
					size={args['size']}
				>{icon}</LabeledIconButton>
			)}
		</Scroller>
	);
};

boolean('disabled', Inline, Config);
select('flip', Inline, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('labelPosition', Inline, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', Inline, ['small', 'large'], Config);

Inline.storyName = 'inline';
