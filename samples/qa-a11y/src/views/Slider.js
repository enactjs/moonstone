import Heading from '@enact/moonstone/Heading';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import Slider from '@enact/moonstone/Slider';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

const CustomIncrementSlider = ({customText}) => {
	const [value, setValue] = useState(0);

	const handleChange = useCallback((ev) => setValue(ev.value), []);

	const valueText = `${customText} ${value}`;

	return (
		<IncrementSlider aria-valuetext={valueText} onChange={handleChange} value={value} />
	);
};

CustomIncrementSlider.propTypes = {
	customText: PropTypes.string
};

const SliderView = () => (
	<div>
		<Heading showLine>Default</Heading>
		<Slider />
		<Heading showLine>IncrementSlider</Heading>
		<IncrementSlider />
		<Heading showLine>IncrementSlider with customizable aria-labels</Heading>
		<IncrementSlider decrementAriaLabel="Decrement" incrementAriaLabel="Increment" />
		<Heading showLine>IncrementSlider using ValueText</Heading>
		<CustomIncrementSlider customText="Volume" />
	</div>
);

export default SliderView;
