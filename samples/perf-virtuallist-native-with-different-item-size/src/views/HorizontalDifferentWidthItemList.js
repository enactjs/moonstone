import Item from '@enact/moonstone/Item';
import {VirtualListNative} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

const
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	],
	numOfItems = 100,
	fontSize = ri.scale(20),
	oneLineSize = ri.scale(50),
	lineHeight = `${oneLineSize - 10}px`,
	spacing = 50;

const itemStyleDefault = {
	position: 'absolute',
	height: '100%',
	borderRight: 'solid 10px gray',
	boxSizing: 'border-box',
	fontSize,
	lineHeight,
	whiteSpace: 'pre'
};

const innerItemStyleDefault = {
	height: '100%',
	writingMode: 'vertical-rl'
};

const DifferentWidthItem = ({index, items, style: itemStyleFromList, ...rest}) => {
	const {title: children, width} = items[index];
	const itemStyle = {...itemStyleDefault, ...itemStyleFromList, width: width + 'px'};

	return (
		<Item {...rest} style={itemStyle}>
			<div style={innerItemStyleDefault}>
				{children}
			</div>
		</Item>
	);
};

DifferentWidthItem.propTypes = {
	index: PropTypes.number,
	items: PropTypes.array
};

const HorizontalDifferentWidthItemList = (props) => {
	const [items, setItems] = useState([]);
	const [itemSize, setItemSize] = useState([]);

	useEffect(() => {
		let position = 0, arrayItemSize = [], arrayItems = [];

		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				width = numOfLines * oneLineSize;

			arrayItems.push({
				title: (`${('00' + i).slice(-3)} | ${position}px | ${languages[i % 10]}\n`).repeat(numOfLines),
				width
			});
			arrayItemSize.push(width);
			position += (width + spacing);
		}

		setItems(arrayItems);
		setItemSize(arrayItemSize);
	}, []);

	const renderItem = useCallback((renderProps) => {
		return <DifferentWidthItem {...renderProps} />;
	}, []);

	return (
		<VirtualListNative
			{...props}
			childProps={{
				items: items
			}}
			dataSize={items.length}
			direction="horizontal"
			focusableScrollbar
			itemRenderer={renderItem}
			itemSize={{
				minSize: oneLineSize,
				size: itemSize
			}}
			spacing={spacing}
		/>
	);
};

export default HorizontalDifferentWidthItemList;
