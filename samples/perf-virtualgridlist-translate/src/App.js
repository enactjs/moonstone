import GridListImageItem from '@enact/moonstone/GridListImageItem';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {VirtualGridList} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef} from 'react';

const items = [];

for (let i = 0; i < 1000; i++) {
	let color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count,
		url: 'http://via.placeholder.com/193x150/' + color + '/ffffff/png?text=Image ' + i
	});
}

const VirtualGridListSample = () => {
	const scrollTo = useRef();

	const getScrollTo = useCallback((fn) => {
		scrollTo.current = fn;
	}, []);

	const renderItem = useCallback(({index, ...rest}) => {
		return (
			<GridListImageItem
				{...rest}
				caption={items[index].text}
				source={items[index].url}
				subCaption={items[index].subText}
			/>
		);
	}, []);

	useEffect(() => {
		scrollTo.current({index: 0, animate: false, focus: true});
	});

	return (
		<VirtualGridList
			cbScrollTo={getScrollTo}
			dataSize={items.length}
			focusableScrollbar
			itemRenderer={renderItem}
			itemSize={{minWidth: ri.scale(316), minHeight: ri.scale(300)}}
			spacing={ri.scale(67)}
		/>
	);
};

export default MoonstoneDecorator(VirtualGridListSample);
