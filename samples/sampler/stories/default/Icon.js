import Heading from '@enact/moonstone/Heading';
import Icon, {IconBase} from '@enact/moonstone/Icon';
import Scroller from '@enact/moonstone/Scroller';
import {select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiIcon from '@enact/ui/Icon';

import iconNames from '../util/icons';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

Icon.displayName = 'Icon';
const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

export default {
	title: 'Moonstone/Icon',
	component: 'Icon'
};

export const _Icon = (args) => {
	const flip = args['flip'];
	const size = args['size'];
	const iconType = args['icon type'];
	let children;
	switch (iconType) {
		case 'glyph': children = args['icon']; break;
		case 'url src': children = args['src']; break;
		default: children = args['custom icon'];
	}
	return (
		<Scroller style={{height: '100%'}}>
			<Icon flip={flip} size={size}>
				{children}
			</Icon>
			<br />
			<br />
			<Heading showLine>All Icons</Heading>
			{iconNames.map((icon, index) => <Icon key={index} flip={flip} size={size} title={icon}>{icon}</Icon>)}
		</Scroller>
	);
};

select('flip', _Icon, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', ['', ...iconNames], Config, 'plus');
select('icon type', _Icon, ['glyph', 'url src', 'custom'], Config, 'glyph');
select('size', _Icon, ['small', 'large'], Config, 'large');
select('src', _Icon, [docs, factory, logo], Config, logo);
text('custom icon', _Icon, Config);

_Icon.storyName = 'Icon';
_Icon.parameters = {
	info: {
		text: 'Basic usage of Icon'
	}
};
