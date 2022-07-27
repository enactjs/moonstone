import ProgressBar, {ProgressBarTooltip} from '@enact/moonstone/ProgressBar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

ProgressBar.displayName = 'ProgressBar';
const ProgressBarConfig = mergeComponentMetadata(
	'ProgressBar',
	ProgressBar
);

ProgressBarTooltip.displayName = 'ProgressBarTooltip';
const ProgressBarTooltipConfig = mergeComponentMetadata(
	'ProgressBarTooltip',
	ProgressBarTooltip
);

export default {
	title: 'Moonstone/ProgressBar',
	component: 'ProgressBar'
};

export const _ProgressBar = (args) => {
	// added here to force Storybook to put the ProgressBar tab first
	const disabled = args['disabled'];

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = args['tooltip'];
	const position = args['position'];

	return (
		<ProgressBar
			backgroundProgress={args['backgroundProgress']}
			disabled={disabled}
			highlighted={args['highlighted']}
			orientation={args['orientation']}
			progress={args['progress']}
			style={{marginLeft: ri.scaleToRem(72), marginRight: ri.scaleToRem(72)}}
		>
			{tooltip ? (
				<ProgressBarTooltip
					position={position}
				/>
			) : null}
		</ProgressBar>
	);
};

boolean('disabled', _ProgressBar, ProgressBarConfig);
boolean('highlighted', _ProgressBar, ProgressBarConfig);
boolean('tooltip', _ProgressBar, ProgressBarTooltipConfig);
range('backgroundProgress', _ProgressBar, ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.5);
range('progress', _ProgressBar, ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.4);
select('orientation', _ProgressBar, ['horizontal', 'vertical'], ProgressBarConfig, 'horizontal');
select('position', _ProgressBar, ['', 'above', 'above left', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below right', 'below before', 'below after'], ProgressBarTooltipConfig, '');

_ProgressBar.storyName = 'ProgressBar';
_ProgressBar.parameters = {
	info: {
		text: 'The basic ProgressBar'
	}
};
