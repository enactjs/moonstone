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
	fontSize = ri.scale(31),
	oneLineSize = ri.scale(50),
	lineHeight = `${oneLineSize}px`,
	spacing = 40;

const itemStyleDefault = {
	position: 'absolute',
	width: '100%',
	borderBottom: 'solid 10px gray',
	boxSizing: 'border-box',
	fontSize,
	lineHeight,
	whiteSpace: 'pre'
};

const DifferentHeightItem = ({index, items, style: itemStyleFromList, ...rest}) => {
	const {title: children, height} = items[index];
	const itemStyle = {...itemStyleDefault, ...itemStyleFromList};

	return (
		<Item {...rest} style={itemStyle}>
			<div style={{height}}>
				{children}
			</div>
		</Item>
	);
};

DifferentHeightItem.propTypes = {
	index: PropTypes.number,
	items: PropTypes.array
};

const VerticalDifferentHeightItemList = (props) => {
	const [items, setItems] = useState([]);
	const [itemSize, setItemSize] = useState([]);

	useEffect(() => {
		let position = 0, arrayItemSize = [], arrayItems = [];

		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				height = numOfLines * oneLineSize;

			arrayItems.push({
				title: (`${('00' + i).slice(-3)} - ${position}px - ${languages[i % 10]}\n`).repeat(numOfLines),
				height
			});
			arrayItemSize.push(height);
			position += (height + spacing);
		}

		setItems(arrayItems);
		setItemSize(arrayItemSize);
	}, []);

	const renderItem = useCallback((renderProps) => {
		return <DifferentHeightItem {...renderProps} />;
	}, []);

	return (
		<VirtualListNative
			{...props}
			childProps={{
				items: items
			}}
			dataSize={items.length}
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

export default VerticalDifferentHeightItemList;
