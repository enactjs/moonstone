import Slider, {SliderTooltip} from '@enact/moonstone/Slider';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

Slider.displayName = 'Slider';
const SliderConfig = mergeComponentMetadata(
	'Slider',
	Slider
);

SliderTooltip.displayName = 'SliderTooltip';
const SliderTooltipConfig = mergeComponentMetadata(
	'SliderTooltip',
	SliderTooltip
);

export default {
	title: 'Moonstone/Slider',
	component: 'Slider'
};

export const _Slider = (args) => {
	// added here to force Storybook to put the Slider tab first
	const disabled = args['disabled'];

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const percent = args['percent'];
	const position = args['position'];
	const tooltip = args['tooltip'];

	return (
		<Slider
			activateOnFocus={args['activateOnFocus']}
			backgroundProgress={args['backgroundProgress']}
			disabled={disabled}
			knobStep={args['knobStep']}
			max={args['max']}
			min={args['min']}
			noFill={args['noFill']}
			onActivate={action('onActivate')}
			onChange={action('onChange')}
			orientation={args['orientation']}
			step={args['step']}
			style={{marginLeft: ri.scaleToRem(72), marginRight: ri.scaleToRem(72)}}
		>
			{tooltip ? (
				<SliderTooltip
					percent={percent}
					position={position}
				/>
			) : null}
		</Slider>
	);
};

boolean('activateOnFocus', _Slider, SliderConfig);
boolean('disabled', _Slider, SliderConfig);
boolean('noFill', _Slider, SliderConfig);
boolean('percent', _Slider, SliderTooltipConfig);
boolean('tooltip', _Slider, SliderTooltipConfig);
number('backgroundProgress', _Slider, SliderConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.5);
number('knobStep', _Slider, SliderConfig);
number('max', _Slider, SliderConfig, 10);
number('min', _Slider, SliderConfig, 0);
number('step', _Slider, SliderConfig, 1);
select('orientation', _Slider, ['horizontal', 'vertical'], SliderConfig, 'horizontal');
select('position', _Slider, ['', 'above', 'above left', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below right', 'below before', 'below after'], SliderTooltipConfig, '');

_Slider.storyName = 'Slider';
_Slider.parameters = {
	info: {
		text: 'Basic usage of Slider'
	}
};
