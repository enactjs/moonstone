import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import {IncrementSlider} from '@enact/moonstone/IncrementSlider';

const IncrementSliderDelayValue = ({value: initialValue}) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const changeValue = () => {
			if (value === 100) {
				setValue(0);
			} else {
				setValue(100);
			}
		};
		const intervalId = setInterval(changeValue, 5000);
		return () => clearInterval(intervalId);
	}, [value]);

	return <IncrementSlider value={value} />;
};

IncrementSliderDelayValue.propTypes = {
	backgroundPercent: PropTypes.number,
	decrementIcon: PropTypes.string,
	disabled: PropTypes.bool,
	incrementIcon: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number,
	value: PropTypes.number
};

IncrementSliderDelayValue.defaultProps = {
	backgroundPercent: 0,
	max: 100,
	min: 0,
	step: 1,
	value: 0
};

export default IncrementSliderDelayValue;
