import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import IconButton from '@enact/moonstone/IconButton';
import IncrementSlider, {IncrementSliderBase} from '@enact/moonstone/IncrementSlider';

import IncrementSliderDelayValue from './components/IncrementSliderDelayValue';

const ContextualPopupButton = ContextualPopupDecorator(IconButton);
const IncrementSliderConfig = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);

class IncrementSliderView extends Component {

	constructor (props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (ev) => {
		setTimeout(() => {
			this.setState({value: ev.value});
		}, 200);
	};

	render () {
		return (
			<div style={{display: 'flex', marginTop: ri.unit(180, 'rem')}}>
				<div style={{width: '300px'}}>
					<Button>button</Button>
					<Button>button</Button>
				</div>
				<IncrementSlider style={{flex: 1, width: ri.unit(510, 'rem')}} onChange={this.handleChange} value={this.state.value} />
			</div>
		);
	}
}

class IncrementSliderWithContextualPopup extends Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleClick = () => {
		this.setState((prevState) => {
			return {open: !prevState.open};
		});
	};

	renderPopup = () => (
		<div style={{width: 400}}>
			<IncrementSlider
				// active
				tooltip
				min={-9.9}
				max={9.9}
				step={0.1}
			/>
		</div>
	);

	render () {
		return (
			<div>
				<ContextualPopupButton
					direction="down"
					spotlightRestrict="self-only"
					onClick={this.handleClick}
					onClose={this.handleClick}
					open={this.state.open}
					popupComponent={this.renderPopup}
					size="small"
				>
					{'drawer'}
				</ContextualPopupButton>
			</div>
		);
	}
}

class IncrementSliderWithMinValue extends Component {
	static propTypes = {
		value: PropTypes.number
	};

	constructor (props) {
		super(props);
		this.state = {
			propValue: props.value,
			value: 0
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (props.value !== state.propValue) {
			return {
				propValue: props.value,
				value: props.value
			};
		}
		return null;
	}

	handleChange = ({value}) => this.setState({value});

	render () {
		return (
			<div>
				<IncrementSlider
					max={number('max', IncrementSliderConfig)}
					min={number('min', IncrementSliderConfig)}
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</div>
		);
	}
}

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
