import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import {useCallback, useState} from 'react';

const NotificationView = () => {
	const [openSmall, setOpenSmall] = useState(false);
	const [openLarge, setOpenLarge] = useState(false);

	const handleCloseLarge = useCallback(() => {
		setOpenLarge(false);
	}, []);

	const handleCloseSmall = useCallback(() => {
		setOpenSmall(false);
	}, []);

	const handleOpenLarge = useCallback(() => {
		setOpenLarge(true);
	}, []);

	const handleOpenSmall = useCallback(() => {
		setOpenSmall(true);
	}, []);


	return (
		<div>
			<Button onClick={handleOpenSmall} size="small">Small Notification</Button>
			<Button onClick={handleOpenLarge} size="small">Large Notification</Button>

			<Notification
				open={openSmall}
				onClose={handleCloseSmall}
			>
				<span>Hello</span>
				<buttons>
					<Button onClick={handleCloseSmall} size="small">Howdy</Button>
				</buttons>
			</Notification>

			<Notification
				onClose={handleCloseLarge}
				open={openLarge}
			>
				<span>{`Not to worry, this message isn't going to be very long.
				It just has to be long enough to show what a long message looks like.
				That's all; have a nice day.`}</span>
				<buttons>
					<Button onClick={handleCloseLarge} size="small">First Button!</Button>
					<Button onClick={handleCloseLarge} size="small">Oh My Yes, Kitten</Button>
					<Button onClick={handleCloseLarge} size="large">Hide And Show</Button>
					<Button onClick={handleCloseLarge} size="small">Close</Button>
				</buttons>
			</Notification>
		</div>
	);
};

export default NotificationView;
