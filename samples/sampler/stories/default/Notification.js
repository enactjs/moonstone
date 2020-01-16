import React from 'react';
import {storiesOf} from '@storybook/react';

import Notification from '../../../../Notification';
import Popup from '../../../../Popup';
import Button from '../../../../Button';

import {boolean, text} from '../../src/enact-knobs';
import {action, mergeComponentMetadata} from '../../src/utils';

const Config = mergeComponentMetadata('Notification', Notification, Popup);

Notification.displayName = 'Notification';

storiesOf('Moonstone', module)
	.add(
		'Notification',
		() => (
			<Notification
				open={boolean('open', Config, true)}
				noAutoDismiss={boolean('noAutoDismiss', Config)}
				onClose={action('onClose')}
			>
				<span>{text('message', Config, 'Notification has content in it and can be very useful for organizing information for the user.')}</span>
				<buttons>
					<Button>Ok</Button>
					<Button>Nevermind</Button>
				</buttons>
			</Notification>
		),
		{
			info: {
				text: 'Basic usage of Notification'
			}
		}
	);
