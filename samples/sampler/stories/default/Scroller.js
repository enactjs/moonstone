import {ScrollableBase} from '@enact/moonstone/Scrollable';
import Scroller from '@enact/moonstone/Scroller';
import {ScrollableBase as UiScrollableBase} from '@enact/moonstone/UiScrollable';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

const
	prop = {
		direction: ['both', 'horizontal', 'vertical'],
		scrollbarOption: ['auto', 'hidden', 'visible']
	};

Scroller.displayName = 'Scroller';
const ScrollerConfig = mergeComponentMetadata(
	'Scroller',
	Scroller,
	ScrollableBase,
	UiScrollableBase
);

export default {
	title: 'Moonstone/Scroller',
	component: 'Scroller'
};

export const _Scroller = (args) => (
	<Scroller
		direction={args['direction']}
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<div
			style={{
				height: ri.unit(1002, 'rem'),
				width: ri.unit(2001, 'rem')
			}}
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
			Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			<div
				style={{
					marginTop: ri.unit(801, 'rem')
				}}
			>
				Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
			</div>
		</div>
	</Scroller>
);

boolean('focusableScrollbar', _Scroller, ScrollerConfig);
boolean('noScrollByWheel', _Scroller, ScrollerConfig);
boolean('spotlightDisabled', _Scroller, ScrollerConfig, false);
select('direction', _Scroller, prop.direction, ScrollerConfig);
select('horizontalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);
select('verticalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);

_Scroller.storyName = 'Scroller';
_Scroller.parameters = {
	info: {
		text: 'Basic usage of Scroller'
	}
};



