import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import IconButton from '@enact/moonstone/IconButton';
import IncrementSlider, {IncrementSliderBase} from '@enact/moonstone/IncrementSlider';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import IncrementSliderDelayValue from './components/IncrementSliderDelayValue';

const ContextualPopupButton = ContextualPopupDecorator(IconButton);
const IncrementSliderConfig = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);

const IncrementSliderView = () => {
	const [value, setValue] = useState(0);

	const handleChange = useCallback((ev) => {
		setTimeout(() => {
			setValue(ev.value);
		}, 200);
	}, []);

	return (
		<div style={{display: 'flex', marginTop: ri.unit(180, 'rem')}}>
			<div style={{width: '300px'}}>
				<Button>button</Button>
				<Button>button</Button>
			</div>
			<IncrementSlider style={{flex: 1, width: ri.unit(510, 'rem')}} onChange={handleChange} value={value} />
		</div>
	);
};

const IncrementSliderWithContextualPopup = () => {
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const renderPopup = useCallback(() => (
		<div style={{width: 400}}>
			<IncrementSlider
				// active
				tooltip
				min={-9.9}
				max={9.9}
				step={0.1}
			/>
		</div>
	), []);

	return (
		<div>
			<ContextualPopupButton
				direction="down"
				onClick={handleClick}
				onClose={handleClick}
				open={open}
				popupComponent={renderPopup}
				size="small"
				spotlightRestrict="self-only"
			>
				{'drawer'}
			</ContextualPopupButton>
		</div>
	);
};

const IncrementSliderWithMinValue = ({max, min, value: propValue}) => {
	const [value, setValue] = useState(propValue);

	useEffect(() => {
		setValue(propValue);
	}, [propValue]);

	const handleChange = useCallback(({value: newValue}) => setValue(newValue), []);

	return (
		<div>
			<IncrementSlider
				max={max}
				min={min}
				onChange={handleChange}
				value={value}
			/>
		</div>
	);
};

IncrementSliderWithMinValue.propTypes = {
	max: PropTypes.number,
	min: PropTypes.number,
	value: PropTypes.number
};

export default {
	title: 'Moonstone/IncrementSlider',
	component: 'IncrementSlider'
};

export const WithDelayedValue = () => {
	return (
		<div>
			Focus on one of the IncrementSlider buttons. Every 5 seconds, the value will toggle between 0 and 100. Ensure that focus does not leave the IncrementSlider when this happens.
			<IncrementSliderDelayValue />
		</div>
	);
};

WithDelayedValue.storyName = 'PLAT-28221';
WithDelayedValue.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const SpotlightDragging = () => {
	return (
		<div>
			While holding down the knob (dragging), move the cursor quickly between knob and SliderButtons. Ensure the buttons do not receive spotlight.
			<IncrementSliderView />
		</div>
	);
};

SpotlightDragging.storyName = 'spotlight behavior while dragging';
SpotlightDragging.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithContextualPopup = () => {
	return (
		<div>
			Slider knob changes value with 5-way Interaction between ContextualPopup and Slider.
			<IncrementSliderWithContextualPopup />
		</div>
	);
};

WithContextualPopup.storyName = 'with ContextualPopup';
WithContextualPopup.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithMinMaxValue = (args) => {
	return (
		<div>
			Test the IncrementSlider by changing the values of max, min, and value knobs.
			<IncrementSliderWithMinValue
				max={args['max']}
				min={args['min']}
				value={args['value']}
			/>
		</div>
	);
};

number('max', WithMinMaxValue, IncrementSliderConfig);
number('min', WithMinMaxValue, IncrementSliderConfig);
number('value', WithMinMaxValue, IncrementSliderConfig, 0);

WithMinMaxValue.storyName = 'with max, min, and value';
