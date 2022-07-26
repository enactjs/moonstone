import Button from '@enact/moonstone/Button';
import {Header, HeaderBase} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import Input from '@enact/moonstone/Input';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {Fragment} from 'react';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

// Set up some defaults for info and controls
const prop = {
	children: {
		'no buttons': null,
		'1 button': <IconButton>gear</IconButton>,
		'2 buttons': <Fragment>
			<Button>A Button</Button>
			<IconButton>gear</IconButton>
		</Fragment>
	},
	controls: {
		'no buttons': null,
		'1 button': <IconButton>gear</IconButton>,
		'2 buttons': <Fragment>
			<IconButton>star</IconButton>
			<IconButton>gear</IconButton>
		</Fragment>
	},
	marqueeOn: ['', 'hover', 'render'],
	type: ['compact', 'dense', 'standard']
};

export default {
	title: 'Moonstone/Header',
	component: 'Header'
};

export const _Header = (args, context) => {
	context.noHeader = true;

	const headerInput = args['headerInput'] ? <Input placeholder="placeholder text" /> : null;
	const childrenSelection = args['children'];
	const children = prop.children[childrenSelection];

	const story = (
		<Header
			title={args['title']}
			titleBelow={args['titleBelow']}
			subTitleBelow={args['subTitleBelow']}
			type={args['type']}
			centered={args['centered']}
			fullBleed={args['fullBleed']}
			headerInput={headerInput}
			hideLine={args['hideLine']}
			marqueeOn={args['marqueeOn']}
		>
			{children}
		</Header>
	);

	context.panelsProps = {
		controls: prop.controls[args['controls']],
		noCloseButton: args['noCloseButton'] || false
	};

	return story;
};

boolean('centered', _Header, Config);
boolean('fullBleed', _Header, Config);
boolean('headerInput', _Header, Config);
boolean('hideLine', _Header, Config);
boolean('noCloseButton', _Header, {displayName: 'Panels'});
select('children', _Header, ['no buttons', '1 button', '2 buttons'], Config);
select('controls', _Header, ['no buttons', '1 button', '2 buttons'], {displayName: 'Panels'});
select('marqueeOn', _Header, prop.marqueeOn, Config);
select('type', _Header, prop.type, Config);
text('subTitleBelow', _Header, Config, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.');
text('title', _Header, Config, 'The Matrix');
text('titleBelow', _Header, Config, 'Free your mind');

_Header.storyName = 'Header';
_Header.parameters = {
	info: {
		text: 'A block to use as a screen\'s title and description. Supports additional buttons and up to two subtitles.'
	}
};
