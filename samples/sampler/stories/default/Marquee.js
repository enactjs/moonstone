import Marquee from '@enact/moonstone/Marquee';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';

Marquee.displayName = 'Marquee';

export default {
	title: 'Moonstone/Marquee',
	component: 'Marquee'
};

export const _Marquee = (args) => {
	// fn to parse the padding value which is invoked later to keep the control ordered
	const spacing = () => {
		const value = args['marqueeSpacing'];
		if (value && value.indexOf('%') > 0) {
			return value;
		}

		return Number.parseInt(value);
	};

	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				alignment={args['alignment']}
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={1000}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpacing={spacing()}
				marqueeSpeed={args['marqueeSpeed']}
				style={{width: '400px'}}
			>
				{args['children']}
			</Marquee>
			{disabled ? <p style={{fontSize: '70%', fontStyle: 'italic'}}><sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.</p> : <p />}
		</section>
	);
};

boolean('marqueeDisabled', _Marquee, Marquee);
number('marqueeDelay', _Marquee, Marquee, 1000);
number('marqueeResetDelay', _Marquee, Marquee, 1000);
number('marqueeSpeed', _Marquee, Marquee, 60);
select('alignment', _Marquee, [null, 'left', 'right', 'center'], Marquee);
select('forceDirection', _Marquee, [null, 'rtl', 'ltr'], Marquee);
select('marqueeOn', _Marquee, ['hover', 'render'], Marquee, 'render');
text('children', _Marquee, Marquee, 'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.');
text('marqueeSpacing', _Marquee, Marquee, '50%');

_Marquee.storyName = 'Marquee';
_Marquee.parameters = {
	info: {
		text: 'The basic MarqueeText'
	}
};
