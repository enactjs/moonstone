import Item from '@enact/moonstone/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import {Component} from 'react';
import Region from '@enact/moonstone/Region';
import ri from '@enact/ui/resolution';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {VirtualList, VirtualListNative} from '@enact/moonstone/VirtualList';

import css from './VirtualList.module.less';

const
	horizontalStyle = {
		width: ri.scale(170),
		height: ri.scale(660),
		borderRight: ri.scale(2) + 'px solid #202328',
		boxSizing: 'border-box'
	},
	items = [],
	verticalStyle = {
		borderBottom: ri.scale(2) + 'px solid #202328',
		boxSizing: 'border-box'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (isHorizontalList) => ({index, ...rest}) => {
		const posinset = index + 1;

		return (
			<Item
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				role="listitem"
				style={isHorizontalList ? horizontalStyle : verticalStyle}
			>
				{items[index]}
			</Item>
		);
	};

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class VirtualListView extends Component {
	constructor () {
		super();
		this.state = {
			customAriaLabel: false,
			isHorizontalList: false,
			isNative: false
		};
	}

	onToggleChangeAriaLabelButton = () => this.setState((state) => ({customAriaLabel: !state.customAriaLabel}));

	onToggleChangeDirectionButton = () => this.setState((state) => ({isHorizontalList: !state.isHorizontalList}));

	onToggleChangeJSNativeButton = () => this.setState((state) => ({isNative: !state.isNative}));

	render () {
		const
			{customAriaLabel, isHorizontalList, isNative} = this.state,
			List = isNative ? VirtualListNative : VirtualList;

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<ToggleButton
						size="small"
						onToggle={this.onToggleChangeAriaLabelButton}
						selected={customAriaLabel}
					>
						Customizable aria-labels on ScrollButtons
					</ToggleButton>
					<ToggleButton
						size="small"
						onToggle={this.onToggleChangeDirectionButton}
						selected={isHorizontalList}
					>
						Horizontal
					</ToggleButton>
					<ToggleButton
						size="small"
						onToggle={this.onToggleChangeJSNativeButton}
						selected={isNative}
					>
						Native
					</ToggleButton>
				</Cell>
				<Cell className={css.region} component={Region} title="X of Y feature">
					<List
						dataSize={items.length}
						direction={isHorizontalList ? 'horizontal' : 'vertical'}
						focusableScrollbar
						itemRenderer={renderItem(isHorizontalList)}
						itemSize={ri.scale(isHorizontalList ? 170 : 72)}
						scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
						scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualListView;
