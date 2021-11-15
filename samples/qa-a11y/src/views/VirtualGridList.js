import {GridListImageItem} from '@enact/moonstone/GridListImageItem';
import Layout, {Cell} from '@enact/ui/Layout';
import {Component} from 'react';
import Region from '@enact/moonstone/Region';
import ri from '@enact/ui/resolution';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {VirtualGridList, VirtualGridListNative} from '@enact/moonstone/VirtualList';

import css from './VirtualGridList.module.less';

const
	items = [],
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const
			{text, subText, source} = items[index],
			posinset = index + 1;

		return (
			<GridListImageItem
				{...rest}
				aria-posinset={posinset}
				aria-setsize={items.length}
				caption={text}
				role="listitem"
				source={source}
				subCaption={subText}
			/>
		);
	};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		text = `Item ${count}`,
		subText = `SubItem ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

	items.push({text, subText, source});
}

class VirtualGridListView extends Component {
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
			List = isNative ? VirtualGridListNative : VirtualGridList;

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
						itemRenderer={renderItem}
						itemSize={{
							minWidth: ri.scale(200),
							minHeight: ri.scale(200)
						}}
						scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
						scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
					/>
				</Cell>
			</Layout>
		);
	}
}

export default VirtualGridListView;
