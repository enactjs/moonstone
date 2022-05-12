import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import IconButton from '@enact/moonstone/IconButton';
import IncrementSlider, {IncrementSliderBase} from '@enact/moonstone/IncrementSlider';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';
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

const IncrementSliderWithMinValue = ({value: propValue}) => {
	const [value, setValue] = useState(propValue);

	useEffect(() => {
		setValue(propValue);
	}, [propValue]);

	const handleChange = useCallback(({value: newValue}) => setValue(newValue), []);

	return (
		<div>
			<IncrementSlider
				max={number('max', IncrementSliderConfig)}
				min={number('min', IncrementSliderConfig)}
				onChange={handleChange}
				value={value}
			/>
		</div>
	);
};

IncrementSliderWithMinValue.propTypes = {
	value: PropTypes.number
};

storiesOf('IncrementSlider', module)
	.add(
		'PLAT-28221',
		() => (
			<div>
				Focus on one of the IncrementSlider buttons. Every 5 seconds, the value will toggle between 0 and 100. Ensure that focus does not leave the IncrementSlider when this happens.
				<IncrementSliderDelayValue />
			</div>
		)
	)
	.add(
		'spotlight behavior while dragging',
		() => (
			<div>
				While holding down the knob (dragging), move the cursor quickly between knob and SliderButtons. Ensure the buttons do not receive spotlight.
				<IncrementSliderView />
			</div>
		)
	)
	.add(
		'with ContextualPopup',
		() => (
			<div>
				Slider knob changes value with 5-way Interaction between ContextualPopup and Slider.
				<IncrementSliderWithContextualPopup />
			</div>
		)
	)
	.add(
		'with max, min, and value',
		() => (
			<div>
				Test the IncrementSlider by changing the values of max, min, and value knobs.
				<IncrementSliderWithMinValue value={number('value', IncrementSliderConfig, 0)} />
			</div>
		)
	);
