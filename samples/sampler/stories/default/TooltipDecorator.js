import Button from '@enact/moonstone/Button';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/moonstone/TooltipDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, object, select, text} from '@enact/storybook-utils/addons/controls';

TooltipDecorator.displayName = 'TooltipDecorator';
const Config = mergeComponentMetadata(
	'TooltipDecorator',
	Tooltip,
	TooltipBase,
	TooltipDecorator
);

export default {
	title: 'Moonstone/TooltipDecorator',
	component: 'TooltipDecorator'
};

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const prop = {
	tooltipPosition: {
		'above': 'above',
		'above center': 'above center',
		'above left': 'above left',
		'above right': 'above right',
		'below': 'below',
		'below center': 'below center',
		'below left': 'below left',
		'below right': 'below right',
		'left bottom': 'left bottom',
		'left middle': 'left middle',
		'left top': 'left top',
		'right bottom': 'right bottom',
		'right middle': 'right middle',
		'right top': 'right top'
	},
	ariaObject: {
		'aria-hidden': false,
		'aria-label': 'Tooltip Label',
		'role': 'alert'
	}
};

export const _TooltipDecorator = (args) => (
	<div style={{textAlign: 'center'}}>
		<TooltipButton
			tooltipDelay={args['tooltipDelay']}
			tooltipPosition={args['tooltipPosition']}
			tooltipProps={args['tooltipProps']}
			tooltipRelative={args['tooltipRelative']}
			tooltipText={args['tooltipText']}
			tooltipWidth={args['tooltipWidth']}
		>
			hello
		</TooltipButton>
	</div>
);

boolean('tooltipRelative', _TooltipDecorator, Config);
number('tooltipDelay', _TooltipDecorator, Config, 500);
number('tooltipWidth', _TooltipDecorator, Config);
object('tooltipProps', _TooltipDecorator, Config, prop.ariaObject);
select('tooltipPosition', _TooltipDecorator, prop.tooltipPosition, Config, 'above');
text('tooltipText', _TooltipDecorator, Config, 'tooltip!');

_TooltipDecorator.storyName = 'TooltipDecorator';
_TooltipDecorator.parameters = {
	info: {
		text: 'The basic TooltipDecorator'
	}
};

