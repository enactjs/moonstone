import {Button} from '../../../../Button';
import ri from '@enact/ui/resolution';
import {Row, Column, Cell} from '@enact/ui/Layout';
import SwitchItem from '../../../../SwitchItem';
import ToggleButton from '../../../../ToggleButton';
import VirtualList from '../../../../VirtualList';
import MoonstoneDecorator from '../../../../MoonstoneDecorator';
import {Component, createRef} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const ListContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';
const fullHeightStyle = {
	height: '100%'
};

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [],
	itemSize = 72,
	itemStyle = {
		borderBottom: ri.unit(3, 'rem') + ' solid #202328',
		boxSizing: 'border-box'
	},
	numItems = 100;

const renderItem = (size) => {
	const Wrapper = ({index, ...rest}) => {
		const style = {height: size + 'px', ...itemStyle};
		return (
			<StatefulSwitchItem index={index} style={style} {...rest} id={`item${index}`}>
				{items[index].item}
			</StatefulSwitchItem>
		);
	};
	Wrapper.displayName = 'SwitchItemWrapper';
	return Wrapper;
};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item :'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

updateDataSize(numItems);

class StatefulSwitchItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			prevIndex: props.index,
			selected: items[props.index].selected
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevIndex !== props.index) {
			return {
				prevIndex: props.index,
				selected: items[props.index].selected
			};
		}

		return null;
	}

	onToggle = () => {
		items[this.props.index].selected = !items[this.props.index].selected;
		this.setState(({selected}) => ({
			selected: !selected
		}));
	};

	render () {
		const props = Object.assign({}, this.props);
		delete props.index;

		return (
			<SwitchItem {...props} onToggle={this.onToggle} selected={this.state.selected}>
				{this.props.children}
			</SwitchItem>
		);
	}
}

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			hideScrollbar: false,
			wrap: false
		};
		this.rootRef = createRef();
		this.scrollingRef = createRef();
	}

	onKeyDown = () => {
		if (this.rootRef.current.dataset.keydownEvents) {
			this.rootRef.current.dataset.keydownEvents = Number(this.rootRef.current.dataset.keydownEvents) + 1;
		} else {
			this.rootRef.current.dataset.keydownEvents = 1;
		}
	};

	onScrollStart = () => {
		this.scrollingRef.current.innerHTML = 'Scrolling';
	};

	onScrollStop = () => {
		this.scrollingRef.current.innerHTML = 'Not Scrolling';
	};

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	render () {
		const {focusableScrollbar, hideScrollbar, wrap} = this.state;
		return (
			<div {...this.props} id="list" style={fullHeightStyle} ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<ToggleButton id="focusableScrollbar" onClick={this.onToggle} selected={focusableScrollbar}>focusableScrollbar</ToggleButton>
						<ToggleButton id="hideScrollbar" onClick={this.onToggle} selected={hideScrollbar}>hide scrollbar</ToggleButton>
						<ToggleButton id="wrap" onClick={this.onToggle} selected={wrap}>wrap</ToggleButton>
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
					</Cell>
					<Cell component={ListContainer}>
						<Row align="center" style={fullHeightStyle}>
							<Cell component={Button} shrink id="left">
								Left
							</Cell>
							<Cell align="stretch">
								<Column align="center" style={fullHeightStyle}>
									<Cell component={Button} shrink id="top">
										Top
									</Cell>
									<Cell>
										<VirtualList
											dataSize={numItems}
											focusableScrollbar={focusableScrollbar}
											itemRenderer={renderItem(itemSize)}
											itemSize={itemSize}
											onKeyDown={this.onKeyDown}
											onScrollStart={this.onScrollStart}
											onScrollStop={this.onScrollStop}
											spacing={0}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
											wrap={wrap}
										/>
									</Cell>
									<Cell component={Button} shrink id="bottom">
										Bottom
									</Cell>
								</Column>
							</Cell>
							<Cell component={Button} shrink id="right">
								Right
							</Cell>
						</Row>
					</Cell>
				</Column>
			</div>
		);
	}
}

export default MoonstoneDecorator(app);
