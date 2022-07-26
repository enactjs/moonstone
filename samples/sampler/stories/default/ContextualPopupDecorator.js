import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';

import {ContextualPopupDecorator} from '@enact/moonstone/ContextualPopupDecorator';
import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';

const ContextualButton = ContextualPopupDecorator(Button);
ContextualButton.displayName = 'ContextualButton';

const Config = mergeComponentMetadata('ContextualPopupDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'down',
	open: false,
	showCloseButton: false,
	spotlightRestrict: 'self-first'
};


export default {
	title: 'Moonstone/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};

export const _ContextualPopupDecorator = (args) => {
	const renderPopup = () => (
		<div>{args['popup string']}</div>
	);

	return <div style={{textAlign: 'center', marginTop: ri.unit(99, 'rem')}}>
		<ContextualButton
			direction={args['direction']}
			noAutoDismiss={args['noAutoDismiss']}
			onClose={action('onClose')}
			open={args['open']}
			popupComponent={renderPopup} // eslint-disable-line react/jsx-no-bind
			showCloseButton={args['showCloseButton']}
			spotlightRestrict={args['spotlightRestrict']}
		>
			{args['button string']}
		</ContextualButton>
		<BodyText centered>Use CONTROLS to interact with the ContextualPopup.</BodyText>
	</div>;
};

boolean('noAutoDismiss', _ContextualPopupDecorator, Config);
boolean('open', _ContextualPopupDecorator, Config);
boolean('showCloseButton', _ContextualPopupDecorator, Config);
select('direction', _ContextualPopupDecorator, ['up', 'down', 'left', 'right'], Config);
select('spotlightRestrict', _ContextualPopupDecorator, ['none', 'self-first', 'self-only'], Config);
text('button string', _ContextualPopupDecorator, Config, 'Hello Contextual Button');
text('popup string', _ContextualPopupDecorator, {groupId: 'Popup'}, 'Hello Contextual Popup');

_ContextualPopupDecorator.storyName = 'ContextualPopupDecorator';
_ContextualPopupDecorator.parameters = {
	info: {
		text: 'Basic usage of ContextualPopupDecorator'
	}
};
