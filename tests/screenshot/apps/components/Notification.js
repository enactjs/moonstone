import Notification from '../../../../Notification';
import Button from '@enact/moonstone/Button';
import React from 'react';

const NotificationTests = [
	// Notification Displays Over Background - [GT-21554]
	<Notification open>Notification has content in it and can be very useful for organizing information for the user.</Notification>,
	// end of [GT-21554]
	<Notification open>-Lorem</Notification>,
	{
		textSize: 'large',
		component: <Notification open>-Lorem</Notification>
	},
	{
		wrapper: 'full',
		component: <Notification open scrimType="transparent">-Lorem</Notification>
	},
	{
		wrapper: 'full',
		component: <Notification open scrimType="translucent">-Lorem</Notification>
	},
	<Notification open><buttons><Button>Hello</Button></buttons></Notification>,
	<Notification open><>Hello<buttons><Button>Hello</Button></buttons></></Notification>,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <Notification open>Notification has content in it and can be very useful for organizing information for the user.</Notification>
	},
	{
		locale: 'ar-SA',
		component: <Notification open>-Lorem</Notification>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Notification open>-Lorem</Notification>
	}

];
export default NotificationTests;
