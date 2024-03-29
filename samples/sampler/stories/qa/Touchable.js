import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, range} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import {Fragment} from 'react';

const TouchableDiv = Touchable('div');

const onInteractionEnd = () => {
	const el = document.getElementById('touchRadius');
	el.style.display = 'none';
};

const onHoldEnd = (ev) => {
	onInteractionEnd(ev);
	return action('onHoldEnd')(ev);
};

const TouchArea = kind({
	name: 'TouchArea',

	propTypes: {
		moveTolerance: PropTypes.number
	},

	handlers: {
		onInteractionStart: (ev, {moveTolerance}) => {
			const el = document.getElementById('touchRadius');
			const x = ev.clientX || ev.touches && ev.touches[0].clientX;
			const y = ev.clientY || ev.touches && ev.touches[0].clientY;

			el.style.display = 'block';
			el.style.left = `${x - moveTolerance}px`;
			el.style.top = `${y - moveTolerance}px`;
			return false;
		}
	},

	render: ({children, moveTolerance, onInteractionStart, ...rest}) => (<Fragment>
		<TouchableDiv
			{...rest}
			onHoldEnd={onHoldEnd}
			onMouseDown={onInteractionStart}
			onMouseUp={onInteractionEnd}
			onTouchEnd={onInteractionEnd}
			onTouchStart={onInteractionStart}
		>
			{children}
		</TouchableDiv>
		<div
			id="touchRadius"
			style={{
				display: 'none',
				position: 'fixed',
				height: (moveTolerance * 2) + 'px',
				width: (moveTolerance * 2) + 'px',
				borderRadius: '999px',
				border: '1px solid orange',
				backgroundColor: 'rgba(255, 180, 0, 0.3)',
				pointerEvents: 'none',
				touchAction: 'none'
			}}
		/>
	</Fragment>)
});

export default {
	title: 'Moonstone/Touchable',
	component: 'Touchable'
};

export const WithDefaultHoldEvents = (args) => (
	<Button
		disabled={args['disabled']}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
	>
		Touchable
	</Button>
);

boolean('disabled', WithDefaultHoldEvents, Button);

WithDefaultHoldEvents.storyName = 'with default hold events';

export const WithACustomLongpressEventAnd1SecondFrequency = (args) => (
	<Button
		disabled={args['disabled']}
		holdConfig={{
			events: [
				{name: 'hold', time: 1000},
				{name: 'longpress', time: 2000}
			],
			frequency: 1000
		}}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
	>
		LongPress
	</Button>
);

boolean('disabled', WithACustomLongpressEventAnd1SecondFrequency, Button);

WithACustomLongpressEventAnd1SecondFrequency.storyName = 'with a custom longpress event and 1 second frequency';

export const ThatPausesTheHoldWhenMovingBeyondTolerance16Px = (args) => {
	const moveTolerance = args['holdConfig moveTolerance'];
	const cancelOnMove = args['holdConfig cancelOnMove'] || false;
	return (
		<TouchArea
			disabled={args['disabled']}
			holdConfig={{
				moveTolerance,
				cancelOnMove
			}}
			moveTolerance={moveTolerance}
			noResume={args['noResume']}
			onHold={action('onHold', {depth: 0})}
			onHoldEnd={action('onHoldEnd')}
			onHoldStart={action('onHoldStart')}
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'center',
				border: '2px dashed #888',
				width: ri.unit(ri.scale(240), 'rem'),
				height: ri.unit(ri.scale(240), 'rem')
			}}
		>
			Resumable
		</TouchArea>
	);
};

range('holdConfig moveTolerance', ThatPausesTheHoldWhenMovingBeyondTolerance16Px, Button, 16, {min: 8, max: 160, step: 8});
boolean('holdConfig cancelOnMove', ThatPausesTheHoldWhenMovingBeyondTolerance16Px, Button, true);
boolean('noResume', ThatPausesTheHoldWhenMovingBeyondTolerance16Px, TouchArea, false);
boolean('disabled', ThatPausesTheHoldWhenMovingBeyondTolerance16Px, TouchArea);

ThatPausesTheHoldWhenMovingBeyondTolerance16Px.storyName = 'that pauses the hold when moving beyond tolerance (16px)';

export const ThatDoesNotResumeWhenReEnteringComponent = (args) => (
	<Button
		disabled={args['disabled']}
		noResume={args['noResume']}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
	>
		Not Resumable
	</Button>
);

boolean('noResume', ThatDoesNotResumeWhenReEnteringComponent, Button, true);
boolean('disabled', ThatDoesNotResumeWhenReEnteringComponent, Button);

ThatDoesNotResumeWhenReEnteringComponent.storyName = 'that does not resume when re-entering component';

export const WithOnFlickHandler = (args) => (
	<TouchableDiv
		disabled={args['disabled']}
		onFlick={action('onFlick')}
		style={{
			border: '2px dashed #888',
			width: ri.unit(ri.scale(500), 'rem'),
			height: ri.unit(ri.scale(500), 'rem')
		}}
	>
		Flick within this component
	</TouchableDiv>
);

boolean('disabled', WithOnFlickHandler, TouchableDiv);

WithOnFlickHandler.storyName = 'with onFlick handler';

export const WithDragHandlers = (args) => (
	<TouchableDiv
		disabled={args['disabled']}
		dragConfig={{
			global: args['dragConfig global'] || false,
			moveTolerance: args['dragConfig moveTolerance']
		}}
		noResume={args['noResume']}
		onDrag={action('onDrag')}
		onDragEnd={action('onDragEnd')}
		onDragStart={action('onDragStart')}
		style={{
			border: '2px dashed #888',
			width: ri.unit(ri.scale(500), 'rem'),
			height: ri.unit(ri.scale(500), 'rem')
		}}
	>
		Drag within this component. Setting <code>noResume</code> to <code>false</code> should prevent
		drag from resuming when re-entering this component after leaving.
	</TouchableDiv>
);

boolean('dragConfig global', WithDragHandlers, TouchableDiv, false);
number('dragConfig moveTolerance', WithDragHandlers, TouchableDiv, 16);
boolean('noResume', WithDragHandlers, TouchableDiv, false);
boolean('disabled', WithDragHandlers, TouchableDiv);

WithDragHandlers.storyName = 'with drag handlers';

export const OnTapWhenClicked = (args) => (
	<TouchableDiv
		disabled={args['disabled']}
		noResume={args['noResume']}
		onClick={action('onClick')}
		onDown={action('onDown')}
		onMouseDown={action('onMouseDown')}
		onMouseUp={action('onMouseUp')}
		onTap={action('onTap')}
		onTouchEnd={action('onTouchEnd')}
		onTouchStart={action('onTouchStart')}
		onUp={action('onUp')}
		style={{border: '2px dashed #888', textAlign: 'center'}}
	>
		Click here
	</TouchableDiv>
);

boolean('disabled', OnTapWhenClicked, TouchableDiv);
boolean('noResume', OnTapWhenClicked, TouchableDiv, false);

OnTapWhenClicked.storyName = 'onTap when clicked';
