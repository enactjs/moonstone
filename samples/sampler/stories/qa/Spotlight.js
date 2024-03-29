import Button from '@enact/moonstone/Button';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import DatePicker from '@enact/moonstone/DatePicker';
import DayPicker from '@enact/moonstone/DayPicker';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import ExpandableList from '@enact/moonstone/ExpandableList';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import Heading from '@enact/moonstone/Heading';
import Icon from '@enact/moonstone/Icon';
import IconButton from '@enact/moonstone/IconButton';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import Input from '@enact/moonstone/Input';
import Item from '@enact/moonstone/Item';
import LabeledItem from '@enact/moonstone/LabeledItem';
import Pause from '@enact/spotlight/Pause';
import Picker from '@enact/moonstone/Picker';
import Popup from '@enact/moonstone/Popup';
import RadioItem from '@enact/moonstone/RadioItem';
import Scroller from '@enact/moonstone/Scroller';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Slider from '@enact/moonstone/Slider';
import Spotlight from '@enact/spotlight';
import SwitchItem from '@enact/moonstone/SwitchItem';
import TimePicker from '@enact/moonstone/TimePicker';
import ToggleButton from '@enact/moonstone/ToggleButton';
import ToggleItem from '@enact/moonstone/ToggleItem';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {cloneElement, useState, useEffect, useCallback} from 'react';

import docs from '../../images/icon-enact-docs.png';

const Container = SpotlightContainerDecorator(
	{enterTo: 'last-focused'},
	'div'
);

const style = {
	container: () => ({
		width: ri.unit(300, 'rem'),
		border: '1px dashed red',
		margin: '0 ' + ri.unit(12, 'rem'),
		padding: ri.unit(12, 'rem')
	}),
	fittedContainer: () => ({
		border: '1px dashed blue',
		margin: '0 ' + ri.unit(12, 'rem'),
		padding: ri.unit(12, 'rem')
	})
};

const Items = ['First', 'Second', 'Third'];

const DisappearTest = () => {
	const [showButton, setShowButton] = useState(true);
	const [timer, setTimer] = useState(0);

	const removeButton = useCallback(() => {
		setShowButton(false);
	}, []);

	const restoreButton = useCallback(() => {
		setShowButton(true);
	}, []);

	const resetFocus = useCallback(() => {
		Spotlight.focus('restoreButton');
	}, []);

	const startTimer = useCallback(() => {
		setTimer(window.setTimeout(removeButton, 4000));
	}, [removeButton]);

	const stopTimer = useCallback(() => {
		if (timer) {
			window.clearTimeout(timer);
		}
	}, [timer]);

	useEffect(() => {
		return stopTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			5-way select to set focus to the Focus Me button and wait until 4s has elapsed, and observe the focused
			button is removed and the remaining button gains focus.
			{showButton ? (
				<Button
					onFocus={startTimer}
					onSpotlightDisappear={resetFocus}
				>
					Focus me
				</Button>
			) : null}
			<Button
				onClick={restoreButton}
				spotlightId="restoreButton"
			>
				Restore Button
			</Button>
		</div>
	);
};

const DisableOnClick = () => {
	const [disabled, setDisabled] = useState(false);

	const handleButtonDisable = useCallback(() => {
		setDisabled(true);
	}, []);

	const handleButtonEnable = useCallback(() => {
		setDisabled(false);
	}, []);

	return (
		<div>
			<p>Pressing the marqueeable button will disable it. The marquee should continue and restart while the button is focused and disabled.</p>
			<Button disabled={disabled} onClick={handleButtonDisable}>
				A very super ultra massive extensively long marquee Button
			</Button>
			<Button onClick={handleButtonEnable}>
				Enable
			</Button>
		</div>
	);
};

const DisableTest = () => {
	const [disabled, setDisabled] = useState(false);
	const [id, setId] = useState(0);
	const paused = new Pause('Pause Test');

	useEffect(() => {
		Spotlight.resume();
		setId(setInterval(() => setDisabled(state => setDisabled(!state)), 5000));

		return () => {
			clearInterval(id);
			paused.resume();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleToggle = useCallback(() => {
		if (paused.isPaused()) {
			paused.resume();
		} else {
			paused.pause();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<p>Timed Button is alternately enabled and disabled every 5 seconds. Pressing the Active/Paused button will resume and pause Spotlight, respectively.</p>
			<Button disabled={disabled}>
				Timed Button
			</Button>
			<ToggleButton
				defaultSelected
				onToggle={handleToggle}
				toggleOnLabel="Active"
				toggleOffLabel="Paused"
			/>
		</div>
	);
};

const PopupFocusTest = ({noAnimation, noAutoDismiss, scrimType, showCloseButton, spotlightRestrict}) => {
	const [popupOpen, setPopupOpen] = useState(false);

	const handleClosePopup = useCallback(() => {
		setPopupOpen(false);
	}, []);

	const handleOpenPopup = useCallback(() => {
		setPopupOpen(true);
	}, []);

	return (
		<div>
			<p>
				Open the popup by using 5-way selection on the &quot;Open Popup&quot; buttons.
				When the popup is visible, select the popup&apos;s close button to close the popup.
				Focus should return to the button used to originally open the popup. Verify this
				behavior for each of the buttons.
			</p>
			<p>
				Use the knobs to verify 5-way behavior under different Popup configurations.
			</p>
			<Button onClick={handleOpenPopup}>Open Popup</Button>
			<Button onClick={handleOpenPopup}>Open Popup</Button>
			<Popup
				noAnimation={noAnimation}
				noAutoDismiss={noAutoDismiss}
				onClose={handleClosePopup}
				open={popupOpen}
				scrimType={scrimType}
				showCloseButton={showCloseButton}
				spotlightRestrict={spotlightRestrict}
			>
				<div>This is a Popup</div>
			</Popup>
		</div>
	);
};

PopupFocusTest.propTypes = {
	noAnimation: PropTypes.bool,
	noAutoDismiss: PropTypes.bool,
	scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),
	showCloseButton: PropTypes.bool,
	spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
};

PopupFocusTest.defaultProps = {
	noAnimation: false,
	noAutoDismiss: false,
	scrimType: 'translucent',
	showCloseButton: false,
	spotlightRestrict: 'self-only'
};

const FocusedAndDisabled = () => {
	const [fixedIndex, setFixedIndex] = useState(-1);

	const tests = [
		<Button icon="star">Button</Button>,
		<IconButton>star</IconButton>,
		<Button icon={docs}>Button</Button>,
		<IconButton>{docs}</IconButton>
	];

	const handleClear = useCallback(() => setFixedIndex(-1), []);

	const selectButton = useCallback((index) => {
		Spotlight.setPointerMode(false);
		Spotlight.focus(`component-${index}`);
		setFixedIndex(index);
	}, []);

	return (
		<Scroller>
			<p>Click or 5-way select the icon buttons to:</p>
			<ol>
				<li>Disable pointer mode</li>
				<li>Set focus on the component next to the button</li>
				<li>Disable the newly focused component</li>
			</ol>
			<Button onClick={handleClear}>Enable All</Button>
			{tests.map((comp, index) => (
				<div key={`row-${index}`}>
					{/* eslint-disable-next-line react/jsx-no-bind */}
					<IconButton onTap={() => selectButton(index)}>
						arrowlargeright
					</IconButton>
					{cloneElement(comp, {
						disabled: index === fixedIndex,
						spotlightId: `component-${index}`
					})}
				</div>
			))}
		</Scroller>
	);
};

export default {
	title: 'Moonstone/Spotlight',
	component: 'Spotlight'
};

export const MultipleButtons = () => (
	<Row align="center space-evenly">
		<Cell shrink>
			<Button onClick={action('onClick')}>
				One
			</Button>
		</Cell>
		<Cell shrink>
			<Button onClick={action('onClick')}>
				Two
			</Button>
		</Cell>
		<Cell shrink>
			<Button onClick={action('onClick')}>
				Three
			</Button>
		</Cell>
	</Row>
);

MultipleButtons.storyName = 'Multiple Buttons';
MultipleButtons.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const MultipleContainers = () => (
	<Scroller>
		<p>
			The containers below will spot the last-focused element. Keep track of the
			last-focused element in the container when testing and ensure that the correct
			element is spotted when re-entering the container with 5-way. If the pointer is
			inside a container and a 5-way directional key is pressed, the nearest element
			to the pointer (in the direction specified by the key) will be spotted.
		</p>
		<Row>
			<Cell component={Container} shrink style={style.container()}>
				<Item>1</Item>
				<Item>2</Item>
				<Item>3</Item>
				<div>Non-spottable content 1</div>
				<div>Non-spottable content 2</div>
				<div>Non-spottable content 3</div>
			</Cell>
			<Cell component={Container} shrink style={style.container()}>
				<div>Non-spottable content A</div>
				<div>Non-spottable content B</div>
				<div>Non-spottable content C</div>
				<Item>A</Item>
				<Item>B</Item>
				<Item>C</Item>
			</Cell>
		</Row>
	</Scroller>
);

MultipleContainers.storyName = 'Multiple Containers';
MultipleContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const NestedContainers = () => (
	<div>
		<p>
			The nested containers below both use a enterTo: &apos;last-focused&apos; configuration.
			You should be able to naturally 5-way navigate between the items in the containers. Also,
			attempting to 5-way navigate (left or down) from the application close button should
			result in the last-focused item being spotted.
		</p>
		<Row>
			<Cell component={Container} shrink style={style.fittedContainer()} >
				<Item>Item in a container</Item>
				<Container style={style.fittedContainer()} >
					<Item>Item in a nested container</Item>
				</Container>
			</Cell>
		</Row>
	</div>
);

NestedContainers.storyName = 'Nested Containers';
NestedContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DirectionalEvents = () => (
	<div>
		<p>
			The item below will emit onSpotlight[Direction] events when attempting
			to 5-way navigate from the item. Highlight the item below and press any of
			the 5-way directional keys to verify a matching directional event in the
			action logger.
		</p>
		<Item
			onSpotlightDown={action('onSpotlightDown')}
			onSpotlightLeft={action('onSpotlightLeft')}
			onSpotlightRight={action('onSpotlightRight')}
			onSpotlightUp={action('onSpotlightUp')}
		>
			Item
		</Item>
	</div>
);

DirectionalEvents.storyName = 'Directional Events';
DirectionalEvents.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DisappearingSpottable = () => (
	<DisappearTest />
);

DisappearingSpottable.storyName = 'Disappearing Spottable';
DisappearingSpottable.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DisabledOnClick = () => (
	<DisableOnClick />
);

DisabledOnClick.storyName = 'Disabled on Click';
DisabledOnClick.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DisabledWithPause = () => (
	<DisableTest />
);

DisabledWithPause.storyName = 'Disabled with Pause';
DisabledWithPause.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const PopupNavigation = (args) => (
	<PopupFocusTest
		noAnimation={args['noAnimation']}
		noAutoDismiss={args['noAutoDismiss']}
		scrimType={args['scrimType']}
		showCloseButton={args['showCloseButton']}
		spotlightRestrict={args['spotlightRestrict']}
	/>
);

boolean('noAnimation', PopupNavigation, Popup, false);
boolean('noAutoDismiss', PopupNavigation, Popup, false);
boolean('showCloseButton', PopupNavigation, Popup, true);
select('scrimType', PopupNavigation, ['none', 'transparent', 'translucent'], PopupNavigation, Popup, 'translucent');
select('spotlightRestrict', PopupNavigation, ['self-first', 'self-only'], PopupNavigation, Popup, 'self-only');

PopupNavigation.storyName = 'Popup Navigation';

export const _FocusedAndDisabled = () => (
	<FocusedAndDisabled />
);

_FocusedAndDisabled.storyName = 'Focused and Disabled';
_FocusedAndDisabled.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const NavigatingIntoOverflowContainers = () => (
	<div>
		<Item>Before last-focused Container + Scroller</Item>
		<Container style={{outline: '1px dotted #ffffff80'}}>
			<Scroller>
				<ExpandableItem disabled title="Expandable Item">
					<Button>Hiding!</Button>
				</ExpandableItem>
				<Item>Item A</Item>
				<Item disabled>Item B</Item>
				<Item>Item C</Item>
				<ExpandableItem disabled title="Expandable Item">
					<Button>Hiding!</Button>
				</ExpandableItem>
			</Scroller>
		</Container>
		<Item>After last-focused Container + Scroller</Item>
	</div>
);

NavigatingIntoOverflowContainers.storyName = 'Navigating into overflow containers';
NavigatingIntoOverflowContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const KitchenSink = (args) => (
	<Column>
		<Cell component="p" shrink>
			Use the knobs to test the available behaviors for the spottable components
			below.
		</Cell>
		<Cell component={Container} spotlightMuted={args['spotlightMuted']} spotlightDisabled={args['Container spotlightDisabled']}>
			<Row style={{height: '100%'}}>
				<Cell>
					<Column>
						<Cell component={Heading} showLine shrink>
							Misc Components
						</Cell>
						<Cell component={Scroller}>
							<div>
								<Button
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									Button
								</Button>
								<Button
									backgroundOpacity="translucent"
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									Translucent
								</Button>
							</div>
							<div>
								<Button
									backgroundOpacity="transparent"
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									Transparent
								</Button>
								<ToggleButton
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									ToggleButton
								</ToggleButton>
							</div>
							<div>
								<IconButton
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									plus
								</IconButton>
								<Input
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								/>
							</div>
							<div>
								<Picker
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									{Items}
								</Picker>
								<Picker
									joined
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									{Items}
								</Picker>
							</div>
							<IncrementSlider
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							/>
							<Slider
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							/>
							<Item
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								Item
							</Item>
							<LabeledItem
								label="Label"
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								LabeledItem
							</LabeledItem>
						</Cell>
					</Column>
				</Cell>
				<Cell>
					<Column>
						<Cell component={Heading} showLine shrink>
							Expandables
						</Cell>
						<Cell component={Scroller}>
							<ExpandableItem
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="Various Items in an ExpandableItem"
							>
								<CheckboxItem
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									CheckboxItem
								</CheckboxItem>
								<FormCheckboxItem
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									FormCheckboxItem
								</FormCheckboxItem>
								<RadioItem
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									RadioItem
								</RadioItem>
								<SelectableItem
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									SelectableItem
								</SelectableItem>
								<SwitchItem
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									SwitchItem
								</SwitchItem>
								<ToggleItem
									icon="plus"
									iconComponent={Icon}
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									ToggleItem
								</ToggleItem>
							</ExpandableItem>
							<ExpandableList
								noLockBottom
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="ExpandableList"
							>
								{Items}
							</ExpandableList>
							<ExpandableInput
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="ExpandableInput"
							/>
							<ExpandablePicker
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="ExpandablePicker"
							>
								{Items}
							</ExpandablePicker>
							<DatePicker
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="DatePicker"
							/>
							<DayPicker
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="DayPicker"
							/>
							<TimePicker
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="TimePicker"
							/>
						</Cell>
					</Column>
				</Cell>
			</Row>
		</Cell>
	</Column>
);

boolean('Container spotlightDisabled', KitchenSink, Container, false);
boolean('spotlightMuted', KitchenSink, Container, false);
boolean('Spottable spotlightDisabled', KitchenSink, Container, false);

KitchenSink.storyName = 'Kitchen Sink';
