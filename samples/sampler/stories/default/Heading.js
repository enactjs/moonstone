import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiHeading from '@enact/ui/Heading';
import {Fragment} from 'react';

import BodyText from '@enact/moonstone/BodyText';
import Heading, {HeadingBase} from '@enact/moonstone/Heading';

Heading.displayName = 'Heading';
const Config = mergeComponentMetadata('Heading', UiHeading, HeadingBase, Heading);

// Set up some defaults for info and controls
const prop = {
	marqueeOn: ['', 'hover', 'render'],
	size: ['', 'large', 'medium', 'small'],
	spacing: ['', 'auto', 'large', 'medium', 'small', 'none']
};

export default {
	title: 'Moonstone/Heading',
	component: 'Heading'
};

export const _Heading = (args) => (
	<Fragment>
		<Heading
			marqueeOn={args['marqueeOn']}
			showLine={args['showLine']}
			size={args['size']}
			spacing={args['spacing']}
		>
			{args['children']}
		</Heading>
		<BodyText style={{marginTop: 0}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.
		</BodyText>
	</Fragment>
);

boolean('showLine', _Heading, Config);
select('marqueeOn', _Heading, prop.marqueeOn, Config);
select('size', _Heading, prop.size, Config);
select('spacing', _Heading, prop.spacing, Config);
text('children', _Heading, Config, 'Heading text');

_Heading.storyName = 'Heading';
_Heading.parameters = {
	info: {
		text: 'A component for initiating a section of content.'
	}
};
