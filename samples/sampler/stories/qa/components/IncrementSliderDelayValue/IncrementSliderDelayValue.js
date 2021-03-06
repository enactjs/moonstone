import {Component} from 'react';
import PropTypes from 'prop-types';

import {IncrementSlider} from '@enact/moonstone/IncrementSlider';

class IncrementSliderDelayValue extends Component {
	static displayName = 'IncrementSliderDelayValue';

	static propTypes = {
		backgroundPercent: PropTypes.number,
		decrementIcon: PropTypes.string,
		disabled: PropTypes.bool,
		incrementIcon: PropTypes.string,
		max: PropTypes.number,
		min: PropTypes.number,
		step: PropTypes.number,
		value: PropTypes.number
	};

	static defaultProps = {
		backgroundPercent: 0,
		max: 100,
		min: 0,
		step: 1,
		value: 0
	};

	constructor (props) {
		super(props);
		this.state = {
			value: props.value
		};
	}

	componentDidMount () {
		this.intervalId = setInterval(this.changeValue, 5000);
	}

	componentWillUnmount () {
		clearInterval(this.intervalId);
	}

	changeValue = () => {
		if (this.state.value === 100) {
			this.setState({value: 0});
		} else {
			this.setState({value: 100});
		}
	};

	render () {
		return <IncrementSlider value={this.state.value} />;
	}
}

export default IncrementSliderDelayValue;
