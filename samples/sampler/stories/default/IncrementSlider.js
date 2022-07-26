import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, range, select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';

import IncrementSlider, {IncrementSliderBase, IncrementSliderTooltip} from '@enact/moonstone/IncrementSlider';

import {decrementIcons, incrementIcons} from '../util/icons';

const IncrementSliderConfig = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);
const IncrementSliderTooltipConfig = mergeComponentMetadata('IncrementSliderTooltip', IncrementSliderTooltip);

IncrementSlider.displayName = 'IncrementSlider';

export default {
	title: 'Moonstone/IncrementSlider',
	component: 'IncrementSlider'
};

export const _IncrementSlider = (args) => {
	const side = args['side (Deprecated)'];
	const tooltip = args['tooltip'];
	const percent = args['percent'];

	return (
		<IncrementSlider
			backgroundProgress={args['backgroundProgress']}
			decrementIcon={args['decrementIcon']}
			disabled={args['disabled']}
			incrementIcon={args['incrementIcon']}
			knobStep={args['knobStep']}
			max={args['max']}
			min={args['min']}
			noFill={args['noFill']}
			onChange={action('onChange')}
			orientation={args['orientation']}
			step={args['step']} // def: 1
			style={{marginLeft: ri.scaleToRem(72), marginRight: ri.scaleToRem(72)}}
		>
			{tooltip ? (
				<IncrementSliderTooltip
					percent={percent}
					side={side}
				/>
			) : null}
		</IncrementSlider>
	);
};

boolean('disabled', _IncrementSlider, IncrementSliderConfig);
boolean('noFill', _IncrementSlider, IncrementSliderConfig);
boolean('percent', _IncrementSlider, IncrementSliderTooltipConfig);
boolean('tooltip', _IncrementSlider, IncrementSliderTooltipConfig);
range('backgroundProgress', _IncrementSlider, IncrementSliderConfig, {range: true, min: 0, max: 1, step: 0.1}, 0);
select('decrementIcon', _IncrementSlider, ['', ...decrementIcons], IncrementSliderConfig);
select('incrementIcon', _IncrementSlider, ['', ...incrementIcons], IncrementSliderConfig);
select('orientation', _IncrementSlider, ['horizontal', 'vertical'], IncrementSliderConfig);
select('side (Deprecated)', _IncrementSlider, ['after', 'before', 'left', 'right'], IncrementSliderTooltipConfig, 'after');
number('knobStep', _IncrementSlider, IncrementSliderConfig);
number('max', _IncrementSlider, IncrementSliderConfig);
number('min', _IncrementSlider, IncrementSliderConfig);
number('step', _IncrementSlider, IncrementSliderConfig);

_IncrementSlider.storyName = 'IncrementSlider';
_IncrementSlider.parameters = {
	info: {
		text: 'Basic usage of IncrementSlider'
	}
};
