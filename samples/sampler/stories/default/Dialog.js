import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import Dialog from '@enact/moonstone/Dialog';
import Popup from '@enact/moonstone/Popup';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';

const Config = mergeComponentMetadata('Dialog', Popup, Dialog);
Dialog.displayName = 'Dialog';

export default {
	title: 'Moonstone/Dialog',
	component: 'Dialog'
};

export const _Dialog = (args) => (
	<div>
		<Dialog
			// null issue
			noAnimation={args['noAnimation']}
			// null issue
			noAutoDismiss={args['noAutoDismiss']}
			// null issue
			noDivider={args['noDivider']}
			onClose={action('onClose')}
			// null issue
			open={args['open']}
			showCloseButton={args['showCloseButton']}
		>
			<title>{args['title']}</title>
			<titleBelow>{args['titleBelow']}</titleBelow>
			<span>This dialog has content in it and can be very useful for organizing information
				for the user. This dialog has content in it and can be very useful for organizing information
				for the user.</span>
			<buttons>
				<Button>Ok</Button>
				<Button>Nevermind</Button>
			</buttons>
		</Dialog>
		<BodyText centered>Use controls to interact with Dialog.</BodyText>
	</div>
);

boolean('noAnimation', _Dialog, Config);
boolean('noAutoDismiss', _Dialog, Config);
boolean('noDivider', _Dialog, Config);
boolean('open', _Dialog, Config);
boolean('showCloseButton', _Dialog, Config);
text('title', _Dialog, Config, 'Hello Dialog');
text('titleBelow', _Dialog, Config, 'This is an organized dialog');

_Dialog.storyName = 'Dialog';
_Dialog.parameters = {
	info: {
		text: 'Basic usage of Dialog'
	}
};
