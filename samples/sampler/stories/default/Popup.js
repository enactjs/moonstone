import BodyText from '@enact/moonstone/BodyText';
import Popup from '@enact/moonstone/Popup';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

Notification.displayName = 'Popup';
const Config = mergeComponentMetadata(
	'Popup',
	Popup
);

export default {
	title: 'Moonstone/Popup',
	component: 'Popup'
};

export const _Popup = (args) => (
	<div>
		<Popup
			noAnimation={args['noAnimation']}
			noAutoDismiss={args['noAutoDismiss']}
			onClose={action('onClose')}
			onHide={action('onHide')}
			onShow={action('onShow')}
			open={args['open']}
			scrimType={args['scrimType']}
			showCloseButton={args['showCloseButton']}
			spotlightRestrict={args['spotlightRestrict']}
		>
			<div>{args['children']}</div>
		</Popup>
		<BodyText centered>Use KNOBS to interact with Popup.</BodyText>
	</div>
);

boolean('noAnimation', _Popup, Config);
boolean('noAutoDismiss', _Popup, Config);
boolean('open', _Popup, Config);
boolean('showCloseButton', _Popup, Config);
select('scrimType', _Popup, ['none', 'translucent', 'transparent'], Config, 'translucent');
select('spotlightRestrict', _Popup, ['self-first', 'self-only'], Config, 'self-only');
text('children', _Popup, Config, 'Hello Popup');

_Popup.storyName = 'Popup';
_Popup.parameters = {
	info: {
		text: 'Basic usage of Popup'
	}
};
