import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import Popup from '@enact/moonstone/Popup';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Toggleable from '@enact/ui/Toggleable';
import {useCallback, useState} from 'react';

Popup.displayName = 'Popup';

const Container = SpotlightContainerDecorator('div');

const PopupFromSelfOnlyContainer = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div>
			<Container spotlightId="selfOnlyContainer" spotlightRestrict="self-only">
				<Button onClick={onToggle}>button</Button>
			</Container>
			<Notification open={open}>
				<span>popup</span>
				<buttons>
					<Button onClick={onToggle}>button</Button>
				</buttons>
			</Notification>
		</div>
	)
);

const PopupResumeFocusAfterOpenState = () => {
	const [isPopup, setIsPopup] = useState(false);

	const handlePopup = useCallback(() => {
		setIsPopup(true);

		setTimeout(() => {
			setIsPopup(false);
		}, 200);
	}, []);

	return (
		<div>
			<div>Popup will open and dismiss immediately, ensure spotlight still functional.</div>
			<Button onClick={handlePopup}>Open popup</Button>
			<Popup open={isPopup}>
				<Button>close</Button>
			</Popup>
		</div>
	);
};

export default {
	title: 'Moonstone/Popup',
	component: 'Popup'
};

export const WithSpotlightRestrict = (args) => {
	return (
		<div>
			<p>
				The contents of the popup below should contain the only controls that can be
				navigated to using 5-way. This is because the popup is using a `spotlightRestrict`
				value of `self-only`. If the value changes to `self-first`, the other panel controls
				can receive focus, but priority will be given to controls within the popup first.
			</p>
			<Button>Button</Button>
			<Popup
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onClose={action('onClose')}
				open={args['open']}
				showCloseButton={args['showCloseButton']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				<div>{text('children', Popup, 'Hello Popup')}</div>
				<br />
				<Container>
					<Button>Button</Button>
					<Button>Button</Button>
					<Button>Button</Button>
				</Container>
			</Popup>
		</div>
	);
};

boolean('noAnimation', WithSpotlightRestrict, Popup, false);
boolean('noAutoDismiss', WithSpotlightRestrict, Popup, false);
boolean('open', WithSpotlightRestrict, Popup, true);
boolean('showCloseButton', WithSpotlightRestrict, Popup, true);
select('spotlightRestrict', WithSpotlightRestrict, ['self-first', 'self-only'], Popup, 'self-only');

WithSpotlightRestrict.storyName = 'using spotlightRestrict';

export const FromSelfOnlyContainer = () => {
	return (
		<PopupFromSelfOnlyContainer />
	);
};

FromSelfOnlyContainer.storyName = 'from self-only container';
FromSelfOnlyContainer.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const ResumeFocusAfterOpenState = () => {
	return (
		<PopupResumeFocusAfterOpenState />
	);
};

ResumeFocusAfterOpenState.storyName = 'resume focus after open state';
ResumeFocusAfterOpenState.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
