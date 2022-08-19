import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import Popup from '@enact/moonstone/Popup';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';

Notification.displayName = 'Notification';
const Config = mergeComponentMetadata(
	'Notification',
	Notification,
	Popup
);

export default {
	title: 'Moonstone/Notification',
	component: 'Notification'
};

export const _Notification = (args) => (
	<Notification
		noAutoDismiss={args['noAutoDismiss']}
		onClose={action('onClose')}
		open={args['open']}
	>
		<span>{args['message']}</span>
		<buttons>
			<Button>Ok</Button>
			<Button>Nevermind</Button>
		</buttons>
	</Notification>
);

boolean('noAutoDismiss', _Notification, Config);
boolean('open', _Notification, Config, true);
text('message', _Notification, Config, 'Notification has content in it and can be very useful for organizing information for the user.');

_Notification.storyName = 'Notification';
_Notification.parameters = {
	info: {
		text: 'Basic usage of Notification'
	}
};
