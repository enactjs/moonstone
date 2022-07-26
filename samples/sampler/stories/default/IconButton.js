import Button, {ButtonBase} from '@enact/moonstone/Button';
import IconButton, {IconButtonBase} from '@enact/moonstone/IconButton';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import icons from '../util/icons';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent']
};

IconButton.displayName = 'IconButton';
const Config = mergeComponentMetadata('IconButton', Button, ButtonBase, UIButton, UIButtonBase, IconButtonBase, IconButton);

export default {
	title: 'Moonstone/IconButton',
	component: 'IconButton'
};

export const _IconButton = (args) => {
	const iconType = args['icon type'];
	let children;
	switch (iconType) {
		case 'glyph': children = args['icon']; break;
		case 'url src': children = args['src']; break;
		default: children = args['custom icon'];
	}
	return (
		<IconButton
			backgroundOpacity={args['backgroundOpacity']}
			color={args['color']}
			disabled={args['disabled']}
			flip={args['flip']}
			onClick={action('onClick')}
			selected={args['selected']}
			size={args['size']}
			tooltipText={args['tooltipText']}
		>
			{children}
		</IconButton>
	);
};

boolean('disabled', _IconButton, Config);
boolean('selected', _IconButton, Config);
select('backgroundOpacity', _IconButton, prop.backgroundOpacity, Config, '');
select('color', _IconButton, ['', 'red', 'green', 'yellow', 'blue'], Config, '');
select('flip', _IconButton, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', _IconButton, icons, Config, 'plus');
select('icon type', _IconButton, ['glyph', 'url src', 'custom'], Config, 'glyph');
select('size', _IconButton, ['small', 'large'], Config);
select('src', _IconButton, [docs, factory, logo], Config, logo);
text('custom icon', _IconButton, Config);
text('tooltipText', _IconButton, Config, '');

_IconButton.storyName = 'IconButton';
_IconButton.parameters = {
	info: {
		text: 'The basic IconButton'
	}
};
