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
			<Button size="small" onClick={handleOpenSmall}>Small Notification</Button>
			<Button size="small" onClick={handleOpenLarge}>Large Notification</Button>

			<Notification
				open={openSmall}
				onClose={handleCloseSmall}
			>
				<span>Hello</span>
				<buttons>
					<Button size="small" onClick={handleCloseSmall}>Howdy</Button>
				</buttons>
			</Notification>

			<Notification
				open={openLarge}
				onClose={handleCloseLarge}
			>
				<span>{`Not to worry, this message isn't going to be very long.
				It just has to be long enough to show what a long message looks like.
				That's all; have a nice day.`}</span>
				<buttons>
					<Button size="small" onClick={handleCloseLarge}>First Button!</Button>
					<Button size="small" onClick={handleCloseLarge}>Oh My Yes, Kitten</Button>
					<Button size="small" onClick={handleCloseLarge}>Hide And Show</Button>
					<Button size="small" onClick={handleCloseLarge}>Close</Button>
				</buttons>
			</Notification>
		</div>
	);
};

export default NotificationView;
