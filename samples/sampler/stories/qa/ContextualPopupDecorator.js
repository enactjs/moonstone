import Button from '@enact/moonstone/Button';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import {ContextualPopupDecorator} from '@enact/moonstone/ContextualPopupDecorator';
import Heading from '@enact/moonstone/Heading';
import {IconButton} from '@enact/moonstone/IconButton';
import {IncrementSlider} from '@enact/moonstone/IncrementSlider';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select} from '@enact/storybook-utils/addons/controls';
import {Group} from '@enact/ui/Group';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef, useState} from 'react';

const ContextualButton = ContextualPopupDecorator(Button);
const Config = mergeComponentMetadata('ContextualButton', ContextualButton);
ContextualButton.displayName = 'ContextualButton';
const ContextualPopup = ContextualPopupDecorator(IconButton);

const buttonMargin = () => ({margin: ri.unit(12, 'rem')});

const renderPopup = () => (
	<div style={{width: ri.unit(600, 'rem')}}>
		<Button style={buttonMargin()}>First Button</Button>
		<Button style={buttonMargin()}>Hello Spottable Button</Button>
	</div>
);

const renderWidePopup = () => (
	<div style={{width: ri.unit(501, 'rem')}}>
		This is a wide popup
	</div>
);

const renderTallPopup = () => (
	<div style={{height: ri.unit(201, 'rem')}}>
		This is a tall popup
	</div>
);

const renderSuperTallPopup = () => (
	<div style={{height: ri.unit(570, 'rem')}}>
		This is a super tall popup.
		Note: this popup does not overflow in full screen mode.
	</div>
);

const renderSliderPopup = () => (
	<IncrementSlider
		style={{width: ri.scaleToRem(500)}}
	/>
);

const ContextualPopupWithActivator = ({...props}) => {
	const [open, setOpen] = useState(false);

	const handleOpenToggle = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<ContextualButton
			{...props}
			onClick={handleOpenToggle}
			onClose={handleOpenToggle}
			open={open}
			showCloseButton
		/>
	);
};

// PLAT-77119
const ContextualPopupWithArrowFunction = ({...rest}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [twoGroup, setTwoGroup] = useState(false);
	const ref = useRef();

	useEffect(() => {
		ref.current.positionContextualPopup();
	}, [twoGroup]);

	const handleOnClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleItemClick = useCallback(() => {
		setTwoGroup(!twoGroup);
	}, [twoGroup]);

	const setRef = (node) => {
		ref.current = node;
	};

	const popupComponent = useCallback(() => {
		return (
			<div style={{display: 'flex'}}>
				<div style={{display: 'flex'}}>
					<Group
						childComponent={CheckboxItem}
						onClick={handleItemClick}
						select="multiple"
						selectedProp="selected"
					>
						{['click to change layout']}
					</Group>
				</div>
				{twoGroup ?
					<div style={{display: 'flex'}}>
						<Group
							childComponent={CheckboxItem}
							select="multiple"
							selectedProp="selected"
						>
							{['dummy item']}
						</Group>
					</div> : null
				}
			</div>
		);
	}, [handleItemClick, twoGroup]);

	return (
		<div {...rest} style={{display: 'flex', justifyContent: 'flex-end'}}>
			<ContextualPopup
				onClick={handleOnClick}
				open={isOpen}
				popupComponent={popupComponent}
				ref={setRef}
			/>
		</div>
	);
};

export default {
	title: 'Moonstone/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};

export const With5WaySelectableActivator = (args) => (
	<div style={{textAlign: 'center', marginTop: ri.unit(180, 'rem')}}>
		<ContextualPopupWithActivator
			direction={args['direction']}
			popupComponent={renderPopup}
			spotlightRestrict={args['spotlightRestrict']}
		>
			Hello Contextual Button
		</ContextualPopupWithActivator>
	</div>
);

select('direction',With5WaySelectableActivator, ['up', 'down', 'left', 'right'], Config, 'down');
select('spotlightRestrict', With5WaySelectableActivator, ['none', 'self-first', 'self-only'], Config, 'self-only');

With5WaySelectableActivator.storyName = 'with 5-way selectable activator';

export const WithOverflows = () => (
	<div style={{position: 'relative', width: '100%', height: '100%'}}>
		<Heading showLine>direction Up</Heading>
		<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: ri.unit(12, 'rem')}}>
			<ContextualPopupWithActivator
				direction="up"
				popupComponent={renderWidePopup}
			>
				Overflows Left
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator
				direction="up"
				popupComponent={renderTallPopup}
			>
				Overflows Top
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator
				direction="up"
				popupComponent={renderWidePopup}
			>
				Overflows Right
			</ContextualPopupWithActivator>
		</div>
		<div style={{display: 'flex'}}>
			<Heading showLine style={{flexGrow: '1'}}>direction left </Heading>
			<Heading showLine style={{flexGrow: '1'}}>direction right</Heading>
		</div>
		<div style={{display: 'flex', marginBottom: ri.unit(24, 'rem')}}>
			<div style={{flexGrow: '1', display: 'flex', justifyContent: 'space-between'}}>
				<ContextualPopupWithActivator
					direction="left"
					popupComponent={renderWidePopup}
				>
					Overflows Left
				</ContextualPopupWithActivator>
				<ContextualPopupWithActivator
					direction="left"
					popupComponent={renderSuperTallPopup}
				>
					Overflows Top
				</ContextualPopupWithActivator>
			</div>
			<div style={{flexGrow: '1', display: 'flex', justifyContent: 'space-between'}}>
				<ContextualPopupWithActivator
					direction="right"
					popupComponent={renderSuperTallPopup}
				>
					Overflows Top
				</ContextualPopupWithActivator>
				<ContextualPopupWithActivator
					direction="right"
					popupComponent={renderWidePopup}
				>
					Overflows Right
				</ContextualPopupWithActivator>
			</div>
		</div>
		<div style={{display: 'flex', justifyContent: 'center', marginBottom: ri.unit(24, 'rem')}}>
			<ContextualPopupWithActivator
				direction="left"
				popupComponent={renderSuperTallPopup}
			>
				Overflows Bottom
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator
				direction="right"
				popupComponent={renderSuperTallPopup}
			>
				Overflows Bottom
			</ContextualPopupWithActivator>
		</div>
		<Heading showLine>direction down</Heading>
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<ContextualPopupWithActivator
				direction="down"
				popupComponent={renderWidePopup}
			>
				Overflows Left
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator
				direction="down"
				popupComponent={renderTallPopup}
			>
				Overflows Bottom
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator
				direction="down"
				popupComponent={renderWidePopup}
			>
				Overflows Right
			</ContextualPopupWithActivator>
		</div>
	</div>
);

WithOverflows.storyName = 'with overflows';
WithOverflows.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithArrowFunction = () => (
	<ContextualPopupWithArrowFunction />
);

WithArrowFunction.storyName = 'with arrow function';
WithArrowFunction.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithIncrementSlider = (args) => (
	<div style={{textAlign: 'center', marginTop: ri.unit(180, 'rem')}}>
		<ContextualPopupWithActivator
			direction={args['direction']}
			popupComponent={renderSliderPopup}
			spotlightRestrict={args['spotlightRestrict']}
		>
			Contextual Button
		</ContextualPopupWithActivator>
	</div>
);

WithIncrementSlider.storyName = 'with incrementSlider';
WithIncrementSlider.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

select('direction',	WithIncrementSlider, ['up', 'down', 'left', 'right'], Config, 'down');
select('spotlightRestrict', WithIncrementSlider, ['none', 'self-first', 'self-only'], Config, 'self-only');

WithIncrementSlider.storyName = 'with incrementSlider';
