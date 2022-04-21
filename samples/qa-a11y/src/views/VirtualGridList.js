import {GridListImageItem} from '@enact/moonstone/GridListImageItem';
import Layout, {Cell} from '@enact/ui/Layout';
import Region from '@enact/moonstone/Region';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {VirtualGridList, VirtualGridListNative} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

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
		source = `http://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${i}`;

	items.push({text, subText, source});
}

const VirtualGridListView = () => {
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const [isHorizontalList, setIsHorizontalList] = useState(false);
	const [isNative, setIsNative] = useState(false);

	const onToggleChangeAriaLabelButton = useCallback(() => setCustomAriaLabel((ariaLabel) => setCustomAriaLabel(!ariaLabel)), []);

	const onToggleChangeDirectionButton = useCallback(() => setIsHorizontalList((direction) => setIsHorizontalList(!direction)), []);

	const onToggleChangeJSNativeButton = useCallback(() => setIsNative((native) => setIsNative(!native)), []);

	const List = isNative ? VirtualGridListNative : VirtualGridList;

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<ToggleButton
					onToggle={onToggleChangeAriaLabelButton}
					size="small"
					selected={customAriaLabel}
				>
					Customizable aria-labels on ScrollButtons
				</ToggleButton>
				<ToggleButton
					onToggle={onToggleChangeDirectionButton}
					size="small"
					selected={isHorizontalList}
				>
					Horizontal
				</ToggleButton>
				<ToggleButton
					onToggle={onToggleChangeJSNativeButton}
					size="small"
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
};

export default VirtualGridListView;
