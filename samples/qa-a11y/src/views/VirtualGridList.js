import {GridListImageItem} from '@enact/moonstone/GridListImageItem';
import Layout, {Cell} from '@enact/ui/Layout';
import Region from '@enact/moonstone/Region';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {VirtualGridList, VirtualGridListNative} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import css from './VirtualGridList.module.less';

const
	items = [];

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
	),
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
		source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

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
					selected={customAriaLabel}
					size="small"
				>
					Customizable aria-labels on ScrollButtons
				</ToggleButton>
				<ToggleButton
					onToggle={onToggleChangeDirectionButton}
					selected={isHorizontalList}
					size="small"
				>
					Horizontal
				</ToggleButton>
				<ToggleButton
					onToggle={onToggleChangeJSNativeButton}
					selected={isNative}
					size="small"
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
