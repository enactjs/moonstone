import Notification from '../../../../Notification';
import Button from '@enact/moonstone/Button';
import React from 'react';

// si-LK - Sinhala language
const SinhalaString = 'සේවය නඩත්තු කිරීම හෝ වැඩි දියුණු කිරීම සඳහා කලා ගැලරිය සේවයට එකතු කිරීම, නවීකරණය කිරීම, පිවිසීම අක්‍රිය කිරීම හෝ අවසන් කිරීම යනාදිය තම පූර්ණ අභිමතය පරිදි සිදු කිරීමට LG Electronics Inc. හට හිමිකම් ඇත.කලා ගැලරිය සේවාව ලද හැකි වන්නේ ඔබ ඉහත නියමයන්ට එකඟ වුවහොත් පමණි.';

const NotificationTests = [
	// withLongButtonsAndSinhala: Text does not overlap in Notification Popup [GT-27998}
	{
		locale: 'si-LK',
		component: <Notification open><><div>{SinhalaString}</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>
	},
	// end of [GT-27998}

	// Notification Displays Over Background - [GT-21554]
	<Notification open><><div>Notification has content in it and can be very useful for organizing information for the user.</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>,
	// end of [GT-21554]

	// Width Retains in Large Text inside Notifications [GT-24086]
	// Step 4: Text (within the buttons) and buttons size expand. Buttons display aligned with each other.
	{
		textSize: 'large',
		component: <Notification open><><div>Notification has content in it and can be very useful for organizing information for the user.</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>
	},
	// end of [GT-24086]

	// Width adjusts to the width of the Message - [GT-27849]
	<Notification open><><div>Hello</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>,
	// end of [GT-27849]

	{
		wrapper: 'full',
		component: <Notification open scrimType="transparent">-Lorem</Notification>
	},
	{
		wrapper: 'full',
		component: <Notification open scrimType="translucent">-Lorem</Notification>
	},

	<Notification open>-Lorem</Notification>,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// Alignment in RTL [GT-23434]
	// The text is right aligned. Buttons flip position.
	{
		locale: 'ar-SA',
		component:<Notification open><><div>Notification has content in it and can be very useful for organizing information for the user.</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>
	},
	// end of [GT-23434]

	// Width Retains in Large Text inside Notifications [GT-24086]
	// Step 4: Text (within the buttons) and buttons size expand. Buttons display aligned with each other.
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Notification open><><div>Notification has content in it and can be very useful.</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>
	},
	// end of [GT-24086]

	// Width adjusts to the width of the Message - [GT-27849]
	{
		locale: 'ar-SA',
		component: <Notification open><><div>Hello</div><buttons><Button>OK</Button><Button>Nevermind</Button></buttons></></Notification>
	},
	// end of [GT-27849]

	{
		locale: 'ar-SA',
		wrapper: 'full',
		component: <Notification open scrimType="transparent">-Lorem</Notification>
	},
	{
		locale: 'ar-SA',
		wrapper: 'full',
		component: <Notification open scrimType="translucent">-Lorem</Notification>
	},
	{
		locale: 'ar-SA',
		component: <Notification open>-Lorem</Notification>
	}
];
export default NotificationTests;
