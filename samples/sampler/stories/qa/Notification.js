import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import Popup from '@enact/moonstone/Popup';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {storiesOf} from '@storybook/react';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('Notification', Notification, Popup);

Notification.displayName = 'Notification';

const StatefulNotification = () => {
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
			noAutoDismiss={boolean('noAutoDismiss', Config)}
			onClose={action('onClose')}
			open={boolean('open', Config, true)}
		>
			<span>{message}</span>
			<buttons>
				<Button onClick={addToMessage}>Add a Line</Button>
				<Button onClick={removeFromMessage}>Remove a Line</Button>
			</buttons>
		</Notification>
	);
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


storiesOf('Notification', module)
	.add(
		'with dynamic content',
		() => (
			<StatefulNotification />
		)
	)
	.add(
		'with long buttons and Sinhala',
		() => (
			<LongButtonsSinhala />
		)
	);
