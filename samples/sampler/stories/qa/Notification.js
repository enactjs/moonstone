import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import Popup from '@enact/moonstone/Popup';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('Notification', Notification, Popup);

Notification.displayName = 'Notification';

const StatefulNotification = ({noAutoDismiss, open}) => {
	const messageFiller = '0123456789abcdefghijklmnopqrstuvwxyz';
	const [messageArray, setMessageArray] = useState([messageFiller]);
	const [message, setMessage] = useState(messageFiller);

	const addToMessage = useCallback(() => {
		const newArray = messageArray;
		newArray.push(messageFiller);
		setMessageArray(newArray);
		setMessage(messageArray.join(' '));
	}, [messageArray]);

	const removeFromMessage = useCallback(() => {
		const newArray = messageArray;
		newArray.pop();
		setMessageArray(newArray);
		setMessage(messageArray.join(' '));
	}, [messageArray]);

	return (
		<Notification
			noAutoDismiss={noAutoDismiss}
			onClose={action('onClose')}
			open={open}
		>
			<span>{message}</span>
			<buttons>
				<Button onClick={addToMessage}>Add a Line</Button>
				<Button onClick={removeFromMessage}>Remove a Line</Button>
			</buttons>
		</Notification>
	);
};

StatefulNotification.propTypes = {
	noAutoDismiss: PropTypes.bool,
	open: PropTypes.bool
};

// si-LK - sinhala language
const sinhala = 'සේවය නඩත්තු කිරීම හෝ වැඩි දියුණු කිරීම සඳහා කලා ගැලරිය සේවයට එකතු කිරීම, නවීකරණය කිරීම, පිවිසීම අක්‍රිය කිරීම හෝ අවසන් කිරීම යනාදිය තම පූර්ණ අභිමතය පරිදි සිදු කිරීමට LG Electronics Inc. හට හිමිකම් ඇත.කලා ගැලරිය සේවාව ලද හැකි වන්නේ ඔබ ඉහත නියමයන්ට එකඟ වුවහොත් පමණි.';

const LongButtonsSinhala = () => {
	const [thirdButton, setThirdButton] = useState(false);

	const toggleState = useCallback(() => {
		setThirdButton(!thirdButton);
	}, [thirdButton]);

	return (
		<Notification open>
			<span>{sinhala}</span>
			<buttons>
				<Button onClick={toggleState}>Click here to toggle the third button</Button>
				<Button onClick={toggleState}>Click here to toggle the third button</Button>
				{thirdButton ? <Button onClick={toggleState}>Click here to toggle the third button</Button> : null}
			</buttons>
		</Notification>
	);
};

export default {
	title: 'Moonstone/Notification',
	component: 'Notification'
};

export const WithDynamicContent = (args) => {
	return (
		<StatefulNotification noAutoDismiss={args['noAutoDismiss']} open={args['open']} />
	);
};

boolean('noAutoDismiss', WithDynamicContent, Config);
boolean('open', WithDynamicContent, Config, true);

WithDynamicContent.storyName = 'with dynamic content';

export const WithLongButtonsSinhala = () => {
	return (
		<LongButtonsSinhala />
	);
};

WithLongButtonsSinhala.storyName = 'with long buttons and Sinhala';
WithLongButtonsSinhala.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
